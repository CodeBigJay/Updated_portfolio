import SectionHeading from '../components/SectionHeading';
import type { Experience as ExperienceType } from '../types';

function formatRange(start: string, end: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' });
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`;
}

export default function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading route="GET /api/experience" title="Experience" />
      <ol className="relative space-y-10 border-l border-border pl-8">
        {experience.map((item) => (
          <li key={item.id} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-trace bg-bg" />
            <p className="font-mono text-xs text-muted">{formatRange(item.startDate, item.endDate)}</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-ink">{item.title}</h3>
            <p className="font-mono text-sm text-amber">{item.organization}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
