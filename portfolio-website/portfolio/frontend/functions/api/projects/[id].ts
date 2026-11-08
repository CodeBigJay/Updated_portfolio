import { json, requireAdmin, sameOrigin, type Context } from '../../_shared';
const safeExternalUrl = (value: unknown) => { try { const url = new URL(String(value || '')); return ['https:', 'http:'].includes(url.protocol) ? url.toString() : ''; } catch { return ''; } };
const safeAssetUrl = (value: unknown) => { const text = String(value || ''); return /^\/api\/files\/[a-f0-9-]{36}\.(jpg|png|webp|gif|pdf)$/.test(text) || safeExternalUrl(text) ? text : ''; };
export const onRequestPut = async ({ request, env, params }: Context) => {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== 'string' || !body.title.trim() || typeof body.description !== 'string' || !body.description.trim()) return json({ error: 'A title and description are required.' }, 400);
  const result = await env.DB.prepare('UPDATE projects SET title=?,description=?,category=?,repo_url=?,live_url=?,image_url=?,gallery=?,documents=?,tech_stack=?,featured=?,published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(
    body.title.trim().slice(0,100), body.description.trim().slice(0,1200), String(body.category || '').slice(0,80), safeExternalUrl(body.repoUrl).slice(0,500), safeExternalUrl(body.liveUrl).slice(0,500), safeAssetUrl(body.imageUrl).slice(0,500), JSON.stringify(Array.isArray(body.gallery) ? body.gallery.slice(0,5).map(safeAssetUrl).filter(Boolean) : []), JSON.stringify(Array.isArray(body.documents) ? body.documents.slice(0,6).map((doc: { name?: unknown; url?: unknown }) => ({ name: String(doc?.name || 'Project document').slice(0,150), url: safeAssetUrl(doc?.url) })).filter((doc: { url: string }) => doc.url) : []), JSON.stringify(Array.isArray(body.techStack) ? body.techStack.slice(0,15) : []), body.featured ? 1 : 0, body.published === false ? 0 : 1, params.id).run();
  if (!result.meta.changes) return json({ error: 'Project not found.' }, 404);
  return json({ updated: true });
};
export const onRequestDelete = async ({ request, env, params }: Context) => {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const existing = await env.DB.prepare('SELECT image_url,gallery,documents FROM projects WHERE id=?').bind(params.id).all<Record<string, unknown>>();
  if (!existing.results.length) return json({ error: 'Project not found.' }, 404);
  const row = existing.results[0];
  const urls = [String(row.image_url || ''), ...JSON.parse(String(row.gallery || '[]')), ...JSON.parse(String(row.documents || '[]')).map((doc: { url?: string }) => doc.url || '')];
  const keys = urls.map((url) => String(url).match(/^\/api\/files\/([a-f0-9-]{36}\.(?:jpg|png|webp|gif|pdf))$/)?.[1]).filter((key): key is string => Boolean(key));
  await Promise.all(keys.map((key) => env.PROJECT_FILES.delete(key)));
  await env.DB.prepare('DELETE FROM projects WHERE id=?').bind(params.id).run();
  return json({ deleted: true });
};
