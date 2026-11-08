import { useEffect, useState } from 'react';
import { fallbackExperience, fallbackProjects, fallbackSkills } from '../data/fallback';
import type { Experience, Project, Skill } from '../types';

export function usePortfolioData() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [skills] = useState<Skill[]>(fallbackSkills);
  const [experience] = useState<Experience[]>(fallbackExperience);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/projects')
      .then((response) => {
        if (!response.ok) throw new Error('Projects are not available yet');
        return response.json() as Promise<Project[]>;
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setProjects(data);
      })
      .catch(() => {
        // Keep the bundled public projects visible if the database is not configured yet.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, skills, experience };
}
