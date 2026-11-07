const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-ink hover:text-trace transition-colors">
          <span className="text-trace">~/</span>mogomotsi-sebogo
        </a>
        <ul className="hidden gap-6 sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-sm text-muted hover:text-trace transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded border border-amber/40 px-3 py-1.5 font-mono text-xs text-amber hover:bg-amber/10 transition-colors"
        >
          get in touch
        </a>
      </nav>
    </header>
  );
}
