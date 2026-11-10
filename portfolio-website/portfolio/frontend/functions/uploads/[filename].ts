import { json, type Context } from '../_shared';

const OWNER = 'CodeBigJay';
const REPOSITORY = 'Updated_portfolio';
const UPLOAD_DIRECTORY = 'portfolio-website/portfolio/frontend/public/uploads';

const CONTENT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  pdf: 'application/pdf',
};

export const onRequestGet = async ({ params, env }: Context) => {
  const filename = String(params.filename || '');

  // Only serve the UUID-named files created by the admin upload endpoint.
  if (!/^[a-f0-9-]{36}\.(jpg|png|webp|gif|pdf)$/.test(filename)) {
    return json({ error: 'File not found.' }, 404);
  }

  if (!env.GITHUB_TOKEN) {
    return json({ error: 'File storage is not configured.' }, 503);
  }

  const branch = env.GITHUB_BRANCH || 'main';
  const path = `${UPLOAD_DIRECTORY}/${filename}`;
  let upstream: Response;

  try {
    upstream = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPOSITORY}/contents/${path}?ref=${encodeURIComponent(branch)}`,
      {
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.raw+json',
          'User-Agent': 'MogomotsiPortfolio/1.0',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
  } catch {
    return json({ error: 'Could not retrieve the uploaded file.' }, 502);
  }

  if (upstream.status === 404) return json({ error: 'File not found.' }, 404);
  if (!upstream.ok || !upstream.body) {
    return json({ error: 'Could not retrieve the uploaded file.' }, 502);
  }

  const extension = filename.split('.').pop() || '';
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': CONTENT_TYPES[extension],
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': 'inline',
    },
  });
};
