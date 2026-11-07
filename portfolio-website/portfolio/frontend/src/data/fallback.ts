import type { Experience, Project, Skill } from '../types';

// Used only if the backend API can't be reached (e.g. viewing the built
// frontend without the Spring Boot service running). Once your API is live
// these are ignored in favor of real data.

export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description:
      'This site — a full-stack portfolio with a Spring Boot API and a React/TypeScript frontend, deployed via Docker.',
    repoUrl: 'https://github.com/CodeBigJay/portfolio',
    techStack: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    featured: true,
  },
  {
    id: 2,
    title: 'Sample Backend API',
    description:
      'Replace this with a real project: a REST API you built, the problem it solved, and what you learned.',
    repoUrl: 'https://github.com/CodeBigJay',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL'],
    featured: true,
  },
  {
    id: 3,
    title: 'Sample Data Project',
    description:
      'Replace this with another project — a database-driven app, a tool, or a script that solved a real problem.',
    repoUrl: 'https://github.com/CodeBigJay',
    techStack: ['Python', 'SQL'],
    featured: false,
  },
];

export const fallbackSkills: Skill[] = [
  { id: 1, name: 'Java', category: 'Backend', proficiency: 4, displayOrder: 1 },
  { id: 2, name: 'Spring Boot', category: 'Backend', proficiency: 4, displayOrder: 2 },
  { id: 3, name: 'Python', category: 'Backend', proficiency: 4, displayOrder: 3 },
  { id: 4, name: 'PostgreSQL', category: 'Database', proficiency: 4, displayOrder: 4 },
  { id: 5, name: 'SQL', category: 'Database', proficiency: 4, displayOrder: 5 },
  { id: 6, name: 'React', category: 'Frontend', proficiency: 3, displayOrder: 6 },
  { id: 7, name: 'TypeScript', category: 'Frontend', proficiency: 3, displayOrder: 7 },
  { id: 8, name: 'Docker', category: 'Tools', proficiency: 3, displayOrder: 8 },
  { id: 9, name: 'Git', category: 'Tools', proficiency: 4, displayOrder: 9 },
];

export const fallbackExperience: Experience[] = [
  {
    id: 1,
    title: 'Part-Time Mathematics Tutor',
    organization: "King's Way Christian School",
    description:
      'Tutored students in mathematics, breaking down problems and building confidence in problem-solving.',
    startDate: '2023-01-01',
    endDate: '2024-12-31',
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Class Monitor',
    organization: "King's Way Christian School",
    description: 'Supported day-to-day classroom coordination and helped fellow students stay on track.',
    startDate: '2023-01-01',
    endDate: '2024-12-31',
    displayOrder: 2,
  },
  {
    id: 3,
    title: 'BSc Computer Science and Electronics',
    organization: 'North West University, Mahikeng',
    description:
      'Studied computer science and electronics, with a focus on backend development and databases.',
    startDate: '2021-01-01',
    endDate: '2024-12-31',
    displayOrder: 3,
  },
];
