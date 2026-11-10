import { useState } from 'react';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Technical skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a href="#top" className="brand"><span className="brand-mark">MS</span><span>Mogomotsi Sebogo</span></a>
        <button className="menu-toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Contact me <span>↗</span></a>
        </div>
      </nav>
    </header>
  );
}
