import type { ContactPayload, Experience, Project, Skill } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  getProjects: () => request<Project[]>('/projects'),
  getFeaturedProjects: () => request<Project[]>('/projects?featured=true'),
  getSkills: () => request<Skill[]>('/skills'),
  getExperience: () => request<Experience[]>('/experience'),
  submitContact: (payload: ContactPayload) =>
    request<{ status: string; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
