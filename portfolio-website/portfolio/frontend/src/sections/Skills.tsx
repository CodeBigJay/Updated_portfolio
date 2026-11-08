import SectionHeading from '../components/SectionHeading';
import type { Skill } from '../types';

export default function Skills({ skills }: { skills: Skill[] }) {
  const groups = [...new Set(skills.map((skill) => skill.category))];
  return (
    <section id="skills" className="section section-tint">
      <div className="container"><div className="section-intro"><SectionHeading eyebrow="What I work with" title="A growing toolkit." /><p className="section-description">A mix of languages, tools and foundations I use to explore ideas and build solutions.</p></div>
        <div className="skill-groups">{groups.map((group, index) => <article className="skill-group" key={group}><span className="skill-number">0{index + 1}</span><h3>{group}</h3><div className="skill-pills">{skills.filter((skill) => skill.category === group).map((skill) => <span key={skill.id}>{skill.name}</span>)}</div></article>)}</div>
      </div>
    </section>
  );
}
