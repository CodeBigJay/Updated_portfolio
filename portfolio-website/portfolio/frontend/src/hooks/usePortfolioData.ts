import { useEffect, useState } from 'react';
import { fallbackExperience, fallbackProjects, fallbackSkills } from '../data/fallback';
import type { Experience, Project, Skill } from '../types';

export type Education = { id: number; qualification: string; institution: string; description: string; startDate: string; endDate: string | null };
export type SiteContent = {
  about: { lead: string; paragraphs: string[] };
  contact: { intro: string; links: { label: string; url: string }[] };
  skills: Skill[];
  experience: Experience[];
  education: Education[];
};
const fallbackContent: SiteContent = {
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
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mogomotsi-sebogo' },
      { label: 'GitHub', url: 'https://github.com/CodeBigJay' },
      { label: 'Portfolio source', url: 'https://github.com/CodeBigJay/Updated_portfolio' },
    ],
  },
  skills: fallbackSkills,
  experience: fallbackExperience.filter(item => item.title !== 'BSc Computer Science and Electronics'),
  education: [{ id: 1, qualification: 'BSc Computer Science and Electronics', institution: 'North-West University', description: 'Completed a degree combining software, computing fundamentals and electronics.', startDate: '2021-01-01', endDate: '2024-12-31' }],
};

export function usePortfolioData() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/projects').then(response => {
      if (!response.ok) throw new Error('Projects unavailable');
      return response.json() as Promise<Project[]>;
    }).then(data => { if (!cancelled && Array.isArray(data)) setProjects(data); }).catch(() => undefined);
    fetch('/api/content').then(response => {
      if (!response.ok) throw new Error('Content unavailable');
      return response.json() as Promise<SiteContent>;
    }).then(data => { if (!cancelled && data) setContent({ ...fallbackContent, ...data }); }).catch(() => undefined);
    return () => { cancelled = true; };
  }, []);
  return { projects, ...content };
}
