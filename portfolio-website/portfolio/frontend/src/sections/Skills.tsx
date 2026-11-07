import SectionHeading from '../components/SectionHeading';
import type { Skill } from '../types';

function groupByCategory(skills: Skill[]) {
  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }
  return groups;
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = groupByCategory(skills);

  return (
    <section id="skills" className="border-t border-border bg-panel/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading route="GET /api/skills" title="Skills" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-amber">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((skill) => (
                  <li key={skill.id} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-ink">{skill.name}</span>
                    <span className="flex gap-1" aria-label={`proficiency ${skill.proficiency} of 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            i < skill.proficiency ? 'bg-trace' : 'bg-border'
                          }`}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
