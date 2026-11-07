export interface Project {
  id: number;
  title: string;
  description: string;
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  techStack: string[];
  featured: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  displayOrder: number;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string | null;
  displayOrder: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
