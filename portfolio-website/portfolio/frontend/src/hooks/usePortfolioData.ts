import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { fallbackExperience, fallbackProjects, fallbackSkills } from '../data/fallback';
import type { Experience, Project, Skill } from '../types';

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  loading: boolean;
  apiConnected: boolean;
}

export function usePortfolioData(): PortfolioData {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([api.getProjects(), api.getSkills(), api.getExperience()])
      .then(([projectsRes, skillsRes, experienceRes]) => {
        if (cancelled) return;
        setProjects(projectsRes);
        setSkills(skillsRes);
        setExperience(experienceRes);
        setApiConnected(true);
      })
      .catch(() => {
        // Backend not reachable — fallback data (already in state) is used instead.
        if (!cancelled) setApiConnected(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, skills, experience, loading, apiConnected };
}
