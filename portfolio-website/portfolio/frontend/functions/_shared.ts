export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  run(): Promise<{ meta: { changes: number } }>;
}
export interface D1Database { prepare(query: string): D1Statement; }
export interface R2ObjectBody {
  body: ReadableStream;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
}
export interface R2Bucket {
  put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string; cacheControl?: string }; customMetadata?: Record<string, string> }): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
  delete(key: string): Promise<void>;
}
export interface Env {
  DB: D1Database;
  PROJECT_FILES: R2Bucket;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}
export interface Context { request: Request; env: Env; params: Record<string, string>; }
export const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
const COOKIE = 'portfolio_admin';
const encoder = new TextEncoder();
function toBase64Url(bytes: Uint8Array) { let binary = ''; bytes.forEach((byte) => binary += String.fromCharCode(byte)); return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, ''); }
function fromBase64Url(value: string) { const base = value.replace(/-/g, '+').replace(/_/g, '/'); const binary = atob(base); return Uint8Array.from(binary, (char) => char.charCodeAt(0)); }
async function hmac(secret: string, value: string) { const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']); return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value))); }
export async function makeSession(secret: string) { const issued = String(Date.now()); const signature = await hmac(secret, issued); return `${toBase64Url(encoder.encode(issued))}.${toBase64Url(signature)}`; }
export async function isAdmin(request: Request, env: Env) {
  const cookie = request.headers.get('Cookie') || '';
  const token = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!token || !env.SESSION_SECRET) return false;
  const [issuedPart, signaturePart] = token.split('.');
  if (!issuedPart || !signaturePart) return false;
  try {
    const issued = new TextDecoder().decode(fromBase64Url(issuedPart));
    const timestamp = Number(issued);
    if (!Number.isFinite(timestamp) || Date.now() - timestamp > 8 * 60 * 60 * 1000 || timestamp > Date.now() + 60_000) return false;
    const key = await crypto.subtle.importKey('raw', encoder.encode(env.SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    return crypto.subtle.verify('HMAC', key, fromBase64Url(signaturePart), encoder.encode(issued));
  } catch { return false; }
}
export async function requireAdmin(request: Request, env: Env) { return await isAdmin(request, env) ? null : json({ error: 'Please sign in to continue.' }, 401); }
export function sameOrigin(request: Request) { const origin = request.headers.get('Origin'); return origin === new URL(request.url).origin; }
export function sessionCookie(value: string, maxAge = 8 * 60 * 60) { return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`; }
