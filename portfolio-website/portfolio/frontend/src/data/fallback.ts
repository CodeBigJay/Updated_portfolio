import type { Experience, Project, Skill } from '../types';

// Public content remains available even before the Cloudflare database is connected.
export const fallbackProjects: Project[] = [
  {
    id: 'portfolio-site',
    title: 'Personal Portfolio',
    description:
      'A responsive portfolio built with React and TypeScript, designed to present selected work, technical skills and experience in one place.',
    category: 'Web development',
    repoUrl: 'https://github.com/CodeBigJay/Updated_portfolio',
    techStack: ['React', 'TypeScript', 'Vite', 'Cloudflare'],
    gallery: [],
    documents: [],
    featured: true,
    published: true,
  },
];

export const fallbackSkills: Skill[] = [
  { id: 1, name: 'Java', category: 'Programming', proficiency: 4, displayOrder: 1 },
  { id: 2, name: 'Python', category: 'Programming', proficiency: 4, displayOrder: 2 },
  { id: 3, name: 'C++', category: 'Programming', proficiency: 3, displayOrder: 3 },
  { id: 4, name: 'SQL', category: 'Data', proficiency: 4, displayOrder: 4 },
  { id: 5, name: 'PostgreSQL', category: 'Data', proficiency: 3, displayOrder: 5 },
  { id: 6, name: 'React', category: 'Web', proficiency: 3, displayOrder: 6 },
  { id: 7, name: 'TypeScript', category: 'Web', proficiency: 3, displayOrder: 7 },
  { id: 8, name: 'HTML & CSS', category: 'Web', proficiency: 4, displayOrder: 8 },
  { id: 9, name: 'Git', category: 'Tools', proficiency: 3, displayOrder: 9 },
];

export const fallbackExperience: Experience[] = [
  {
    id: 1,
    title: 'Class Supervisor',
    organization: "King's Way Christian School",
    description:
      'Supported classroom coordination and helped maintain an organised learning environment.',
    startDate: '2025-01-01',
    endDate: null,
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Mathematics Tutor',
    organization: "King's Way Christian School",
    description:
      'Tutored mathematics and developed an interest in explaining technical concepts clearly.',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    displayOrder: 2,
  },
  {
    id: 3,
    title: 'BSc Computer Science and Electronics',
    organization: 'North-West University',
    description:
      'Completed a degree combining software, computing fundamentals and electronics.',
    startDate: '2021-01-01',
    endDate: '2024-12-31',
    displayOrder: 3,
  },
];
