import { json, makeSession, sameOrigin, sessionCookie, type Context } from '../../_shared';
export const onRequestPost = async ({ request, env }: Context) => {
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) return json({ error: 'Admin login is not configured yet.' }, 503);
  const body = await request.json().catch(() => ({})) as { password?: string };
  const supplied = new TextEncoder().encode(body.password || '');
  const expected = new TextEncoder().encode(env.ADMIN_PASSWORD);
  const suppliedHash = await crypto.subtle.digest('SHA-256', supplied);
  const expectedHash = await crypto.subtle.digest('SHA-256', expected);
  // Compare fixed-length SHA-256 digests without an early exit.
  const a = new Uint8Array(suppliedHash); const b = new Uint8Array(expectedHash);
  let diff = 0; for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  if (diff !== 0 || supplied.length === 0) return json({ error: 'Incorrect password.' }, 401);
  const token = await makeSession(env.SESSION_SECRET);
  return new Response(JSON.stringify({ authenticated: true }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Set-Cookie': sessionCookie(token) } });
};
