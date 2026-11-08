export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Computer Science &amp; Electronics Graduate · Pretoria, SA</p>
          <h1>Building thoughtful digital experiences <em>with purpose.</em></h1>
          <p className="hero-lede">I’m Mogomotsi — a developer interested in creating useful software, solving practical problems and turning ideas into well-crafted digital products.</p>
          <div className="hero-actions"><a className="button button-dark" href="#projects">Explore my work <span>↗</span></a><a className="text-link" href="#about">A little about me <span>↓</span></a></div>
          <div className="hero-note"><span className="availability-dot" /> Open to opportunities, internships and collaboration</div>
        </div>
        <div className="hero-art" aria-label="Abstract geometric artwork">
          <div className="art-card art-card-back"><span className="art-label">Curiosity</span><div className="art-lines"><i /><i /><i /><i /></div></div>
          <div className="art-card art-card-front"><div className="art-sun" /><div className="art-hill art-hill-one" /><div className="art-hill art-hill-two" /><span className="art-caption">Ideas into impact.</span></div>
          <div className="art-stamp">MS<br /><small>PORTFOLIO</small></div>
          <div className="art-index">01 / 04</div>
        </div>
      </div>
      <div className="hero-bottom"><span>Scroll to explore</span><span className="scroll-line" /><span>01 — Introduction</span></div>
    </section>
  );
}
