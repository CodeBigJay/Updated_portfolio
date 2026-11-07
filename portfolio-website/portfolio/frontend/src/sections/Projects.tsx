import SectionHeading from '../components/SectionHeading';
import type { Project } from '../types';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="border-t border-border bg-panel/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading route="GET /api/projects" title="Projects" />
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-lg border border-border bg-bg p-6 transition-colors hover:border-trace/60"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
                {project.featured && (
                  <span className="rounded-full border border-amber/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber">
                    featured
                  </span>
                )}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-trace"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4 font-mono text-sm">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink underline decoration-border underline-offset-4 hover:text-trace hover:decoration-trace"
                  >
                    repo →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink underline decoration-border underline-offset-4 hover:text-trace hover:decoration-trace"
                  >
                    live →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
