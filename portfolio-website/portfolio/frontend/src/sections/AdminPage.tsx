import { useEffect, useState, type FormEvent } from 'react';
import type { Project } from '../types';
import SiteContentEditor from './SiteContentEditor';

type Asset = { url: string; name: string; contentType: string };
type Draft = {
  id?: string;
  title: string;
  description: string;
  category: string;
  repoUrl: string;
  liveUrl: string;
  techStack: string;
  featured: boolean;
  published: boolean;
  imageUrl: string;
  documents: { name: string; url: string }[];
};
const emptyDraft: Draft = { title: '', description: '', category: 'Web development', repoUrl: '', liveUrl: '', techStack: '', featured: false, published: true, imageUrl: '', documents: [] };

async function readJson<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || body.message || 'Something went wrong.');
  return body as T;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [files, setFiles] = useState<FileList | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadProjects() {
    const response = await fetch('/api/projects?all=1');
    const data = await readJson<Project[]>(response);
    setProjects(data);
  }

  useEffect(() => {
    fetch('/api/auth/me').then((response) => response.json()).then((data: { authenticated: boolean }) => {
      setAuthenticated(data.authenticated);
      if (data.authenticated) return loadProjects();
    }).catch(() => undefined).finally(() => setChecking(false));
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      await readJson(await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }));
      setAuthenticated(true); setPassword(''); await loadProjects();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to sign in.'); }
    finally { setBusy(false); }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthenticated(false); setProjects([]); setDraft(emptyDraft);
  }

  async function uploadFiles() {
    if (!files?.length) return [] as Asset[];
    const form = new FormData();
    Array.from(files).forEach((file) => form.append('files', file));
    const uploaded = await readJson<{ files: Asset[] }>(await fetch('/api/uploads', { method: 'POST', body: form }));
    setAssets((current) => [...current, ...uploaded.files]);
    return uploaded.files;
  }

  async function saveProject(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const uploaded = await uploadFiles();
      const images = uploaded.filter((file) => file.contentType.startsWith('image/'));
      const docs = uploaded.filter((file) => file.contentType === 'application/pdf').map((file) => ({ name: file.name, url: file.url }));
      const payload = {
        title: draft.title.trim(), description: draft.description.trim(), category: draft.category.trim(),
        repoUrl: draft.repoUrl.trim(), liveUrl: draft.liveUrl.trim(),
        techStack: draft.techStack.split(',').map((item) => item.trim()).filter(Boolean),
        featured: draft.featured, published: draft.published,
        imageUrl: images[0]?.url || draft.imageUrl,
        gallery: images.slice(1).map((file) => file.url),
        documents: [...draft.documents, ...docs],
      };
      const endpoint = draft.id ? `/api/projects/${draft.id}` : '/api/projects';
      const response = await fetch(endpoint, { method: draft.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      await readJson(response);
      await loadProjects(); setDraft(emptyDraft); setFiles(null); setAssets([]);
      setMessage(draft.id ? 'Project updated successfully.' : 'Project published to your portfolio.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save project.'); }
    finally { setBusy(false); }
  }

  function editProject(project: Project) {
    setDraft({ id: project.id, title: project.title, description: project.description, category: project.category || '', repoUrl: project.repoUrl || '', liveUrl: project.liveUrl || '', techStack: project.techStack.join(', '), featured: project.featured, published: project.published, imageUrl: project.imageUrl || '', documents: project.documents || [] });
    setFiles(null); setAssets([]); setMessage('Editing selected project.'); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteProject(id: string) {
    if (!window.confirm('Delete this project from your portfolio?')) return;
    setError(''); setMessage('');
    try { await readJson(await fetch(`/api/projects/${id}`, { method: 'DELETE' })); await loadProjects(); setMessage('Project deleted.'); if (draft.id === id) setDraft(emptyDraft); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to delete project.'); }
  }

  if (checking) return <div className="admin-shell"><div className="admin-wrap admin-muted">Preparing your workspace…</div></div>;
  if (!authenticated) return <div className="admin-shell"><div className="admin-wrap"><div className="admin-login admin-card"><a className="admin-back" href="/">← Back to portfolio</a><p className="eyebrow" style={{ marginTop: 35 }}>Private workspace</p><h1>Welcome back.</h1><p className="admin-muted">Sign in to manage projects, skills, experience, education, your About section and contact links.</p><form className="admin-form" onSubmit={login}><div className="admin-field"><label htmlFor="admin-password">Admin password</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <div className="admin-alert error" role="alert">{error}</div>}<button className="admin-button" disabled={busy}>{busy ? 'Signing in…' : 'Sign in to dashboard'}</button></form></div></div></div>;

  return <div className="admin-shell"><div className="admin-wrap"><div className="admin-top"><div className="admin-brand">Mogomotsi Sebogo<span>Portfolio management</span></div><div className="admin-actions"><a className="admin-button secondary" href="/">View website ↗</a><button className="admin-button secondary" onClick={logout}>Sign out</button></div></div>
    <div className="admin-card"><div className="admin-heading-row"><div><p className="eyebrow">Content studio</p><h1>{draft.id ? 'Edit project' : 'Add a project'}</h1><p className="admin-muted">Create a project entry, attach visuals or PDFs, and publish it to your public portfolio.</p></div><span className="featured-label">{projects.length} {projects.length === 1 ? 'project' : 'projects'} total</span></div>
      {message && <div className="admin-alert" style={{ marginTop: 20 }} role="status">{message}</div>}{error && <div className="admin-alert error" style={{ marginTop: 20 }} role="alert">{error}</div>}
      <form className="admin-form" onSubmit={saveProject}>
        <div className="admin-row"><div className="admin-field"><label htmlFor="project-title">Project title *</label><input id="project-title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required maxLength={100} placeholder="e.g. SkillSwap" /></div><div className="admin-field"><label htmlFor="project-category">Category</label><input id="project-category" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} placeholder="Web development" /></div></div>
        <div className="admin-field"><label htmlFor="project-description">Description *</label><textarea id="project-description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} required maxLength={1200} placeholder="What does it do? What problem does it solve? What did you build?" /></div>
        <div className="admin-field"><label htmlFor="project-tech">Technologies</label><input id="project-tech" value={draft.techStack} onChange={(event) => setDraft({ ...draft, techStack: event.target.value })} placeholder="Java, Spring Boot, MySQL (separate with commas)" /></div>
        <div className="admin-row"><div className="admin-field"><label htmlFor="project-repo">GitHub / source link</label><input id="project-repo" type="url" value={draft.repoUrl} onChange={(event) => setDraft({ ...draft, repoUrl: event.target.value })} placeholder="https://github.com/…" /></div><div className="admin-field"><label htmlFor="project-live">Live demo link</label><input id="project-live" type="url" value={draft.liveUrl} onChange={(event) => setDraft({ ...draft, liveUrl: event.target.value })} placeholder="https://…" /></div></div>
        <div className="admin-field"><label htmlFor="project-files">Project images and PDF documents</label><input id="project-files" type="file" accept="image/png,image/jpeg,image/webp,image/gif,application/pdf" multiple onChange={(event) => setFiles(event.target.files)} /><span className="admin-file-note">Up to 6 files per save, 10 MB each. The first image becomes the project cover. PDF files appear as project links.</span>{assets.length > 0 && <div className="admin-file-list">{assets.map((asset) => <span key={asset.url}>{asset.name}</span>)}</div>}</div>
        <div className="admin-actions"><label className="admin-check"><input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} /> Feature this project</label><label className="admin-check"><input type="checkbox" checked={draft.published} onChange={(event) => setDraft({ ...draft, published: event.target.checked })} /> Visible on website</label></div>
        <div className="admin-actions"><button className="admin-button" disabled={busy}>{busy ? 'Saving…' : draft.id ? 'Save changes' : 'Publish project'}</button>{draft.id && <button type="button" className="admin-button secondary" onClick={() => { setDraft(emptyDraft); setFiles(null); setAssets([]); }}>Cancel edit</button>}</div>
      </form>
    </div>
    <section className="admin-section admin-card"><div className="admin-heading-row"><div><p className="eyebrow">Your library</p><h2>Manage projects</h2></div></div><div className="admin-project-list">{projects.length ? projects.map((project) => <article className="admin-project" key={project.id}><div><h3>{project.title}</h3><p>{project.published ? 'Published' : 'Draft'} · {project.category || 'Uncategorised'} · {(project.techStack || []).join(', ')}</p></div><div className="admin-actions"><button className="admin-button secondary" onClick={() => editProject(project)}>Edit</button><button className="admin-button danger" onClick={() => deleteProject(project.id)}>Delete</button></div></article>) : <p className="admin-muted">No projects yet. Add your first project above.</p>}</div></section>
    <SiteContentEditor />
    <p className="admin-muted" style={{ textAlign: 'center', marginTop: 25 }}>Project details and website content are stored in Cloudflare D1. Uploaded files are stored in your private GitHub repository and served publicly by your portfolio.</p>
  </div></div>;
}
