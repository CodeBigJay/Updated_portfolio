import ApiTerminal from '../components/ApiTerminal';

export default function Hero({ apiConnected }: { apiConnected: boolean }) {
  return (
    <section id="top" className="blueprint-bg border-b border-border">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="route-label">boot sequence</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Mogomotsi Sebogo
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted">
            Backend developer building APIs, schemas, and the systems underneath them.
            BSc Computer Science &amp; Electronics graduate based in Pretoria, South Africa.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded bg-amber px-5 py-2.5 font-mono text-sm font-medium text-bg hover:bg-amber/90 transition-colors"
            >
              view projects
            </a>
            <a
              href="#contact"
              className="rounded border border-border px-5 py-2.5 font-mono text-sm text-ink hover:border-trace hover:text-trace transition-colors"
            >
              send a message
            </a>
          </div>
        </div>
        <ApiTerminal apiConnected={apiConnected} />
      </div>
    </section>
  );
}
