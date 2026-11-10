import SectionHeading from '../components/SectionHeading';
import type { Experience as ExperienceItem } from '../types';
import type { Education } from '../hooks/usePortfolioData';

function formatDate(value: string | null) {
  if (!value) return 'Present';
  const date = new Date(`${value.slice(0, 7)}-01T00:00:00`);
  return date.toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' });
}

export default function Experience({ experience, education }: { experience: ExperienceItem[]; education: Education[] }) {
  return (
    <section id="experience" className="section">
      <div className="container experience-layout">
        <SectionHeading eyebrow="Experience & education" title={`Learning by doing.\nGrowing with purpose.`} />
        <div>
          <div className="timeline">
            <h3 className="timeline-group-title">Experience</h3>
            {experience.map(item => (
              <article className="timeline-item" key={`job-${item.id}`}>
                <div className="timeline-date">{formatDate(item.startDate)} — {formatDate(item.endDate)}</div>
                <div><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><p className="timeline-description">{item.description}</p></div>
              </article>
            ))}
          </div>
          <div className="timeline education-timeline">
            <h3 className="timeline-group-title">Education</h3>
            {education.map(item => (
              <article className="timeline-item" key={`edu-${item.id}`}>
                <div className="timeline-date">{formatDate(item.startDate)} — {formatDate(item.endDate)}</div>
                <div><h3>{item.qualification}</h3><p className="timeline-org">{item.institution}</p><p className="timeline-description">{item.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
