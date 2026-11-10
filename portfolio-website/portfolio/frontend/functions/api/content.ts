import { json, requireAdmin, sameOrigin, type Context } from '../_shared';

const CONTENT_ID = '__portfolio_site_content__';
const DEFAULT_CONTENT = {
  about: {
    lead: 'I’m a Computer Science and Electronics graduate from North-West University, interested in building technology that makes everyday work simpler and more effective.',
    paragraphs: [
      'My studies gave me a foundation in programming, databases, software engineering and electronics. Alongside my technical projects, my experience in tutoring and classroom supervision has strengthened my communication, organisation and ability to explain ideas clearly.',
      'I’m looking for opportunities to contribute, keep learning and grow as a software developer.',
    ],
  },
  contact: {
    intro: 'I’m interested in graduate programmes, internships and junior software development opportunities. If you’re hiring or would like to discuss a project, I’d welcome the conversation.',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
      { label: 'GitHub', url: 'https://github.com/CodeBigJay' },
      { label: 'Portfolio source', url: 'https://github.com/CodeBigJay/Updated_portfolio' },
    ],
  },
  skills: [
    { id: 1, name: 'Java', category: 'Programming', proficiency: 4, displayOrder: 1 },
    { id: 2, name: 'Python', category: 'Programming', proficiency: 4, displayOrder: 2 },
    { id: 3, name: 'C++', category: 'Programming', proficiency: 3, displayOrder: 3 },
    { id: 4, name: 'SQL', category: 'Data', proficiency: 4, displayOrder: 4 },
    { id: 5, name: 'PostgreSQL', category: 'Data', proficiency: 3, displayOrder: 5 },
    { id: 6, name: 'HTML & CSS', category: 'Web', proficiency: 4, displayOrder: 6 },
    { id: 7, name: 'Git', category: 'Tools', proficiency: 3, displayOrder: 7 },
  ],
  experience: [
    { id: 1, title: 'Class Supervisor', organization: "King's Way Christian School", description: 'Supported classroom coordination and helped maintain an organised learning environment.', startDate: '2025-01-01', endDate: null, displayOrder: 1 },
    { id: 2, title: 'Mathematics Tutor', organization: "King's Way Christian School", description: 'Tutored mathematics and developed an interest in explaining technical concepts clearly.', startDate: '2024-01-01', endDate: '2024-12-31', displayOrder: 2 },
  ],
  education: [
    { id: 1, qualification: 'BSc Computer Science and Electronics', institution: 'North-West University', description: 'Completed a degree combining software, computing fundamentals and electronics.', startDate: '2021-01-01', endDate: '2024-12-31' },
  ],
};

export const onRequestGet = async ({ env }: Context) => {
  const row = await env.DB.prepare('SELECT description FROM projects WHERE id = ?').bind(CONTENT_ID).all<{ description: string }>();
  if (!row.results?.length) return json(DEFAULT_CONTENT);
  try { return json({ ...DEFAULT_CONTENT, ...JSON.parse(row.results[0].description) }); }
  catch { return json(DEFAULT_CONTENT); }
};

export const onRequestPut = async ({ request, env }: Context) => {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return json({ error: 'Invalid content.' }, 400);
  const safe = {
    about: {
      lead: String(body.about?.lead || '').slice(0, 1000),
      paragraphs: Array.isArray(body.about?.paragraphs) ? body.about.paragraphs.slice(0, 8).map((v: unknown) => String(v).slice(0, 1500)) : [],
    },
    contact: {
      intro: String(body.contact?.intro || '').slice(0, 1000),
      links: Array.isArray(body.contact?.links) ? body.contact.links.slice(0, 10).map((v: any) => ({
        label: String(v?.label || '').slice(0, 80),
        url: String(v?.url || '').slice(0, 500),
      })).filter((v: { label: string; url: string }) => v.label && /^https?:\/\//i.test(v.url)) : [],
    },
    skills: Array.isArray(body.skills) ? body.skills.slice(0, 100).map((v: any, i: number) => ({
      id: Number(v?.id) || i + 1, name: String(v?.name || '').slice(0, 80),
      category: String(v?.category || 'Other').slice(0, 80),
      proficiency: Math.min(5, Math.max(1, Number(v?.proficiency) || 3)), displayOrder: i + 1,
    })).filter((v: { name: string }) => v.name) : [],
    experience: Array.isArray(body.experience) ? body.experience.slice(0, 40).map((v: any, i: number) => ({
      id: Number(v?.id) || i + 1, title: String(v?.title || '').slice(0, 120),
      organization: String(v?.organization || '').slice(0, 120), description: String(v?.description || '').slice(0, 1500),
      startDate: String(v?.startDate || '').slice(0, 10), endDate: v?.endDate ? String(v.endDate).slice(0, 10) : null, displayOrder: i + 1,
    })).filter((v: { title: string; organization: string }) => v.title && v.organization) : [],
    education: Array.isArray(body.education) ? body.education.slice(0, 20).map((v: any, i: number) => ({
      id: Number(v?.id) || i + 1, qualification: String(v?.qualification || '').slice(0, 160),
      institution: String(v?.institution || '').slice(0, 160), description: String(v?.description || '').slice(0, 1500),
      startDate: String(v?.startDate || '').slice(0, 10), endDate: v?.endDate ? String(v.endDate).slice(0, 10) : null,
    })).filter((v: { qualification: string; institution: string }) => v.qualification && v.institution) : [],
  };
  await env.DB.prepare(`INSERT INTO projects (id,title,description,category,repo_url,live_url,image_url,gallery,documents,tech_stack,featured,published)
    VALUES (?, ?, ?, ?, '', '', '', '[]', '[]', '[]', 0, 0)
    ON CONFLICT(id) DO UPDATE SET description = excluded.description, updated_at = CURRENT_TIMESTAMP`)
    .bind(CONTENT_ID, 'Portfolio site content', JSON.stringify(safe), '_site_content').run();
  return json({ saved: true });
};
