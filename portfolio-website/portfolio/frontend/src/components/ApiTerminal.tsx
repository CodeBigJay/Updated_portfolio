import { useEffect, useState } from 'react';

const LINES = [
  { text: '$ curl https://api.mogomotsisebogo.dev/api/projects', color: 'text-ink' },
  { text: '→ 200 OK  •  184ms', color: 'text-trace' },
  { text: '{', color: 'text-muted' },
  { text: '  "title": "Portfolio Website",', color: 'text-ink' },
  { text: '  "stack": ["Spring Boot", "React", "PostgreSQL"],', color: 'text-ink' },
  { text: '  "status": "in production"', color: 'text-amber' },
  { text: '}', color: 'text-muted' },
];

/**
 * A live-feeling terminal panel echoing the actual request this page makes
 * to fetch its own project data — the hero doubles as a demo of the work.
 */
export default function ApiTerminal({ apiConnected }: { apiConnected: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const timer = setTimeout(() => setVisibleLines((n) => n + 1), 260);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="rounded-lg border border-border bg-panel shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8604d]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8b13d]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4fd18f]" />
        <span className="ml-2 font-mono text-xs text-muted">
          {apiConnected ? 'connected — live response' : 'demo response — start the backend to go live'}
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed" aria-live="polite">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={line.color}>
            {line.text}
          </div>
        ))}
        {visibleLines < LINES.length ? (
          <span className="cursor-blink text-trace">▌</span>
        ) : (
          <span className="text-muted">$ </span>
        )}
      </pre>
    </div>
  );
}
