import { json, type Context } from '../../_shared';
export const onRequestGet = async ({ env, params }: Context) => {
  if (!/^[a-f0-9-]{36}\.(jpg|png|webp|gif|pdf)$/.test(params.key)) return json({ error: 'File not found.' }, 404);
  const object = await env.PROJECT_FILES.get(params.key);
  if (!object) return json({ error: 'File not found.' }, 404);
  const headers = new Headers(); object.writeHttpMetadata(headers);
  headers.set('ETag', object.httpEtag); headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return new Response(object.body, { headers });
};
