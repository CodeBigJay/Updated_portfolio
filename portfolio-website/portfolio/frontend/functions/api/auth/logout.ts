import { json, sameOrigin, sessionCookie, type Context } from '../../_shared';
export const onRequestPost = async ({ request }: Context) => {
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  return new Response(JSON.stringify({ authenticated: false }), { headers: { 'Content-Type': 'application/json', 'Set-Cookie': sessionCookie('', 0), 'Cache-Control': 'no-store' } });
};
