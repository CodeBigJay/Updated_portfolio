import { json, requireAdmin, sameOrigin, type Context } from '../_shared';

const ALLOWED = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
  ['application/pdf', 'pdf'],
]);
const OWNER = 'CodeBigJay';
const REPOSITORY = 'Updated_portfolio';
const DEFAULT_BRANCH = 'main';
const UPLOAD_DIRECTORY = 'portfolio-website/portfolio/frontend/public/uploads';

function toBase64(bytes: Uint8Array) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

export const onRequestPost = async ({ request, env }: Context) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  if (!env.GITHUB_TOKEN) return json({ error: 'File uploads are not configured yet. Please contact the portfolio administrator.' }, 503);

  const form = await request.formData().catch(() => null);
  if (!form) return json({ error: 'Choose files to upload.' }, 400);
  const files = form.getAll('files').filter((value): value is File => value instanceof File);
  if (!files.length || files.length > 6) return json({ error: 'Choose between 1 and 6 files.' }, 400);

  const uploaded: { url: string; name: string; contentType: string }[] = [];
  for (const file of files) {
    const extension = ALLOWED.get(file.type);
    if (!extension) return json({ error: 'Only JPG, PNG, WEBP, GIF and PDF files are accepted.' }, 415);
    if (file.size === 0) return json({ error: 'Empty files cannot be uploaded.' }, 400);
    if (file.size > 10 * 1024 * 1024) return json({ error: 'Each file must be 10 MB or smaller.' }, 413);

    const key = `${crypto.randomUUID()}.${extension}`;
    const path = `${UPLOAD_DIRECTORY}/${key}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    let response: Response;
    try {
      response = await fetch(`https://api.github.com/repos/${OWNER}/${REPOSITORY}/contents/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'MogomotsiPortfolio/1.0',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add portfolio asset ${key}`,
          content: toBase64(bytes),
          branch: env.GITHUB_BRANCH || DEFAULT_BRANCH,
        }),
      });
    } catch {
      return json({ error: 'Could not connect to GitHub. Please retry.' }, 502);
    }

    if (!response.ok) {
      const responseText = await response.text().catch(() => '');
      let githubMessage = responseText;
      try {
        const parsed = JSON.parse(responseText) as { message?: string };
        githubMessage = parsed.message || responseText;
      } catch {
        // Keep the response text when GitHub did not return JSON.
      }
      const message = response.status === 401 || response.status === 403
        ? 'GitHub rejected the upload credential or its permissions.'
        : response.status === 404
          ? 'GitHub could not find the repository or target branch.'
          : response.status === 409
            ? 'GitHub reported a file conflict. Please retry the upload.'
            : 'GitHub could not store the file. Please try again.';
      return json({
        error: message,
        githubStatus: response.status,
        detail: githubMessage.slice(0, 500) || 'GitHub returned an empty error response.',
      }, 502);
    }

    uploaded.push({ url: `/uploads/${key}`, name: file.name.slice(0, 150), contentType: file.type });
  }
  return json({ files: uploaded }, 201);
};
