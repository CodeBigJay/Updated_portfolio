import SectionHeading from '../components/SectionHeading';
import type { Experience as ExperienceItem } from '../types';

function formatDate(value: string | null) {
  if (!value) return 'Present';
  const date = new Date(`${value.slice(0, 7)}-01T00:00:00`);
  return date.toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' });
}

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="section">
      <div className="container experience-layout"><SectionHeading eyebrow="The journey so far" title="Learning through\nevery chapter." /><div className="timeline">{experience.map((item) => <article className="timeline-item" key={item.id}><div className="timeline-date">{formatDate(item.startDate)} — {formatDate(item.endDate)}</div><div><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><p className="timeline-description">{item.description}</p></div></article>)}</div></div>
    </section>
  );
}
