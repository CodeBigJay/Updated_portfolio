import { json, requireAdmin, sameOrigin, type Context } from '../_shared';
const ALLOWED = new Map([['image/jpeg','jpg'],['image/png','png'],['image/webp','webp'],['image/gif','gif'],['application/pdf','pdf']]);
export const onRequestPost = async ({ request, env }: Context) => {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const form = await request.formData().catch(() => null);
  if (!form) return json({ error: 'Choose files to upload.' }, 400);
  const files = form.getAll('files').filter((value): value is File => value instanceof File);
  if (!files.length || files.length > 6) return json({ error: 'Choose between 1 and 6 files.' }, 400);
  const uploaded = [];
  for (const file of files) {
    const extension = ALLOWED.get(file.type);
    if (!extension) return json({ error: 'Only JPG, PNG, WEBP, GIF and PDF files are accepted.' }, 415);
    if (file.size > 10 * 1024 * 1024) return json({ error: 'Each file must be 10 MB or smaller.' }, 413);
    const key = `${crypto.randomUUID()}.${extension}`;
    await env.PROJECT_FILES.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' }, customMetadata: { originalName: file.name.slice(0, 150) } });
    uploaded.push({ url: `/api/files/${key}`, name: file.name, contentType: file.type });
  }
  return json({ files: uploaded }, 201);
};
