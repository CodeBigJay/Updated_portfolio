interface SectionHeadingProps {
  route: string;
  title: string;
}

/**
 * Each section eyebrow is styled as the actual API route the section's data
 * comes from — e.g. Skills renders "GET /api/skills" because that's literally
 * true of this codebase, not a decorative label.
 */
export default function SectionHeading({ route, title }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="route-label">{route}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
    </div>
  );
}
