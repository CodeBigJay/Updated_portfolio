export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  gallery: string[];
  documents: { name: string; url: string }[];
  techStack: string[];
  featured: boolean;
  published: boolean;
  createdAt?: string;
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
