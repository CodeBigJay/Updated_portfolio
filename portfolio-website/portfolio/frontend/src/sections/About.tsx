import SectionHeading from '../components/SectionHeading';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading route="GET /api/about" title="About" />
      <div className="grid gap-10 sm:grid-cols-[2fr_1fr]">
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          I'm a backend-leaning developer with a Computer Science and Electronics
          background — that mix shows up in how I think about software: as systems
          with real constraints, not just code. I care most about the layer most
          people never see: clean data models, dependable APIs, and infrastructure
          that holds up under real use. This site is itself an example of that —
          a Spring Boot API serving a React frontend, containerized and ready to
          deploy.
        </p>
        <dl className="space-y-4 border-l border-border pl-6 font-mono text-sm">
          <div>
            <dt className="text-muted">education</dt>
            <dd className="text-ink">BSc Computer Science &amp; Electronics</dd>
            <dd className="text-muted">North West University, Mahikeng</dd>
          </div>
          <div>
            <dt className="text-muted">based_in</dt>
            <dd className="text-ink">Pretoria, South Africa</dd>
          </div>
          <div>
            <dt className="text-muted">focus</dt>
            <dd className="text-ink">Backend, databases, APIs</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
