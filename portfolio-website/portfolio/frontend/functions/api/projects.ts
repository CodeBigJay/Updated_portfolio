import { json, requireAdmin, sameOrigin, type Context } from '../_shared';
const mapRow = (row: Record<string, unknown>) => ({
  id: row.id, title: row.title, description: row.description, category: row.category,
  repoUrl: row.repo_url || '', liveUrl: row.live_url || '', imageUrl: row.image_url || '',
  gallery: JSON.parse(String(row.gallery || '[]')), documents: JSON.parse(String(row.documents || '[]')),
  techStack: JSON.parse(String(row.tech_stack || '[]')), featured: Boolean(row.featured),
  published: Boolean(row.published), createdAt: row.created_at,
});
export const onRequestGet = async ({ request, env }: Context) => {
  const all = new URL(request.url).searchParams.get('all') === '1';
  if (all) { const denied = await requireAdmin(request, env); if (denied) return denied; }
  const result = all
    ? await env.DB.prepare('SELECT * FROM projects ORDER BY featured DESC, created_at DESC').all<Record<string, unknown>>()
    : await env.DB.prepare('SELECT * FROM projects WHERE published = 1 ORDER BY featured DESC, created_at DESC').all<Record<string, unknown>>();
  return json((result.results || []).map(mapRow));
};
const safeExternalUrl = (value: unknown) => { try { const url = new URL(String(value || '')); return ['https:', 'http:'].includes(url.protocol) ? url.toString() : ''; } catch { return ''; } };
const safeAssetUrl = (value: unknown) => { const text = String(value || ''); return /^\/api\/files\/[a-f0-9-]{36}\.(jpg|png|webp|gif|pdf)$/.test(text) || safeExternalUrl(text) ? text : ''; };
export const onRequestPost = async ({ request, env }: Context) => {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== 'string' || !body.title.trim() || typeof body.description !== 'string' || !body.description.trim()) return json({ error: 'A title and description are required.' }, 400);
  const id = crypto.randomUUID();
  const values = [id, body.title.trim().slice(0, 100), body.description.trim().slice(0, 1200), String(body.category || '').slice(0, 80), safeExternalUrl(body.repoUrl).slice(0, 500), safeExternalUrl(body.liveUrl).slice(0, 500), safeAssetUrl(body.imageUrl).slice(0, 500), JSON.stringify(Array.isArray(body.gallery) ? body.gallery.slice(0, 5).map(safeAssetUrl).filter(Boolean) : []), JSON.stringify(Array.isArray(body.documents) ? body.documents.slice(0, 6).map((doc: { name?: unknown; url?: unknown }) => ({ name: String(doc?.name || 'Project document').slice(0, 150), url: safeAssetUrl(doc?.url) })).filter((doc: { url: string }) => doc.url) : []), JSON.stringify(Array.isArray(body.techStack) ? body.techStack.slice(0, 15) : []), body.featured ? 1 : 0, body.published === false ? 0 : 1];
  await env.DB.prepare('INSERT INTO projects (id,title,description,category,repo_url,live_url,image_url,gallery,documents,tech_stack,featured,published) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(...values).run();
  return json({ id, created: true }, 201);
};
