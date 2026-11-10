import { useEffect, useState } from 'react';
import type { Experience, Skill } from '../types';

type Education = { id: number; qualification: string; institution: string; description: string; startDate: string; endDate: string | null };
type SiteContent = {
  about: { lead: string; paragraphs: string[] };
  contact: { intro: string; links: { label: string; url: string }[] };
  skills: Skill[];
  experience: Experience[];
  education: Education[];
};
const blank: SiteContent = {
  about: { lead: '', paragraphs: [] }, contact: { intro: '', links: [] },
  skills: [], experience: [], education: [],
};
async function readJson<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Unable to load or save content.');
  return data as T;
}
export default function SiteContentEditor() {
  const [content, setContent] = useState<SiteContent>(blank);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    fetch('/api/content').then(readJson<SiteContent>).then(setContent)
      .catch((e) => setError(e instanceof Error ? e.message : 'Unable to load content.'))
      .finally(() => setLoading(false));
  }, []);
  const update = (section: 'about' | 'contact', key: string, value: unknown) =>
    setContent((old) => ({ ...old, [section]: { ...old[section], [key]: value } }));
  const updateRow = (key: 'skills' | 'experience' | 'education', index: number, field: string, value: unknown) =>
    setContent((old) => ({ ...old, [key]: old[key].map((row: any, i) => i === index ? { ...row, [field]: value } : row) }));
  const addRow = (key: 'skills' | 'experience' | 'education') => {
    setContent((old) => {
      const id = Math.max(0, ...old[key].map((row: any) => Number(row.id) || 0)) + 1;
      const row = key === 'skills'
        ? { id, name: '', category: 'Programming', proficiency: 3, displayOrder: old.skills.length + 1 }
        : key === 'experience'
          ? { id, title: '', organization: '', description: '', startDate: '', endDate: null, displayOrder: old.experience.length + 1 }
          : { id, qualification: '', institution: '', description: '', startDate: '', endDate: null };
      return { ...old, [key]: [...old[key], row] } as SiteContent;
    });
  };
  const removeRow = (key: 'skills' | 'experience' | 'education', index: number) =>
    setContent((old) => ({ ...old, [key]: old[key].filter((_, i) => i !== index) }));
  async function save() {
    setSaving(true); setError(''); setMessage('');
    try {
      await readJson(await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) }));
      setMessage('Website content saved. Your public portfolio will show the changes after refreshing.');
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to save content.'); }
    finally { setSaving(false); }
  }
  if (loading) return <section className="admin-card admin-section"><p className="admin-muted">Loading website content…</p></section>;
  return <section className="admin-card admin-section">
    <div className="admin-heading-row"><div><p className="eyebrow">Website content</p><h2>Edit the rest of your portfolio</h2><p className="admin-muted">Changes are saved to your website database, not to source code.</p></div></div>
    {message && <div className="admin-alert" role="status" style={{ marginTop: 18 }}>{message}</div>}
    {error && <div className="admin-alert error" role="alert" style={{ marginTop: 18 }}>{error}</div>}
    <div className="admin-content-block">
      <h3>About</h3>
      <div className="admin-field"><label>Opening summary</label><textarea value={content.about.lead} onChange={e => update('about','lead',e.target.value)} maxLength={1000} /></div>
      <div className="admin-field"><label>Additional paragraphs (one paragraph per line)</label><textarea value={content.about.paragraphs.join('\n\n')} onChange={e => update('about','paragraphs',e.target.value.split(/\n\s*\n/).map(v => v.trim()).filter(Boolean))} /></div>
    </div>
    <div className="admin-content-block">
      <h3>Skills</h3>
      <p className="admin-muted">Add skills and group them under categories such as Programming, Web, Data or Tools.</p>
      {content.skills.map((skill,i) => <div className="admin-entry" key={skill.id}>
        <div className="admin-row"><div className="admin-field"><label>Skill name</label><input value={skill.name} onChange={e=>updateRow('skills',i,'name',e.target.value)} /></div><div className="admin-field"><label>Category</label><input value={skill.category} onChange={e=>updateRow('skills',i,'category',e.target.value)} /></div></div>
        <div className="admin-actions"><button type="button" className="admin-button danger" onClick={()=>removeRow('skills',i)}>Remove skill</button></div>
      </div>)}
      <button type="button" className="admin-button secondary" onClick={()=>addRow('skills')}>+ Add skill</button>
    </div>
    <div className="admin-content-block">
      <h3>Experience</h3>
      {content.experience.map((item,i)=><div className="admin-entry" key={item.id}>
        <div className="admin-row"><div className="admin-field"><label>Role / position</label><input value={item.title} onChange={e=>updateRow('experience',i,'title',e.target.value)} /></div><div className="admin-field"><label>Organisation</label><input value={item.organization} onChange={e=>updateRow('experience',i,'organization',e.target.value)} /></div></div>
        <div className="admin-field"><label>Description</label><textarea value={item.description} onChange={e=>updateRow('experience',i,'description',e.target.value)} /></div>
        <div className="admin-row"><div className="admin-field"><label>Start date</label><input type="date" value={item.startDate || ''} onChange={e=>updateRow('experience',i,'startDate',e.target.value)} /></div><div className="admin-field"><label>End date (leave blank if current)</label><input type="date" value={item.endDate || ''} onChange={e=>updateRow('experience',i,'endDate',e.target.value || null)} /></div></div>
        <button type="button" className="admin-button danger" onClick={()=>removeRow('experience',i)}>Remove experience</button>
      </div>)}
      <button type="button" className="admin-button secondary" onClick={()=>addRow('experience')}>+ Add experience</button>
    </div>
    <div className="admin-content-block">
      <h3>Education</h3>
      {content.education.map((item,i)=><div className="admin-entry" key={item.id}>
        <div className="admin-row"><div className="admin-field"><label>Qualification</label><input value={item.qualification} onChange={e=>updateRow('education',i,'qualification',e.target.value)} /></div><div className="admin-field"><label>Institution</label><input value={item.institution} onChange={e=>updateRow('education',i,'institution',e.target.value)} /></div></div>
        <div className="admin-field"><label>Description</label><textarea value={item.description} onChange={e=>updateRow('education',i,'description',e.target.value)} /></div>
        <div className="admin-row"><div className="admin-field"><label>Start date</label><input type="date" value={item.startDate || ''} onChange={e=>updateRow('education',i,'startDate',e.target.value)} /></div><div className="admin-field"><label>End date</label><input type="date" value={item.endDate || ''} onChange={e=>updateRow('education',i,'endDate',e.target.value || null)} /></div></div>
        <button type="button" className="admin-button danger" onClick={()=>removeRow('education',i)}>Remove education</button>
      </div>)}
      <button type="button" className="admin-button secondary" onClick={()=>addRow('education')}>+ Add education</button>
    </div>
    <div className="admin-content-block">
      <h3>Contact</h3>
      <div className="admin-field"><label>Contact message</label><textarea value={content.contact.intro} onChange={e=>update('contact','intro',e.target.value)} /></div>
      {content.contact.links.map((link,i)=><div className="admin-row admin-entry" key={i}><div className="admin-field"><label>Link label</label><input value={link.label} onChange={e=>setContent(old=>({...old,contact:{...old.contact,links:old.contact.links.map((v,j)=>j===i?{...v,label:e.target.value}:v)}}))} /></div><div className="admin-field"><label>URL</label><input value={link.url} onChange={e=>setContent(old=>({...old,contact:{...old.contact,links:old.contact.links.map((v,j)=>j===i?{...v,url:e.target.value}:v)}}))} /></div><button type="button" className="admin-button danger" onClick={()=>update('contact','links',content.contact.links.filter((_,j)=>j!==i))}>Remove link</button></div>)}
      <button type="button" className="admin-button secondary" onClick={()=>update('contact','links',[...content.contact.links,{label:'New link',url:'https://'}])}>+ Add contact link</button>
    </div>
    <div className="admin-actions admin-save-row"><button type="button" className="admin-button" disabled={saving} onClick={save}>{saving ? 'Saving website content…' : 'Save all website content'}</button></div>
  </section>;
}
