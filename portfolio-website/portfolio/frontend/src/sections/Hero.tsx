export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Computer Science &amp; Electronics Graduate · South Africa</p>
          <h1>Turning ideas into <em>useful software.</em></h1>
          <p className="hero-lede">I’m Mogomotsi Sebogo, a Computer Science and Electronics graduate who enjoys solving practical problems through software, technology and continuous learning.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">View selected work <span>↗</span></a>
            <a className="text-link" href="#contact">Get in touch <span>↗</span></a>
          </div>
          <div className="hero-note"><span className="availability-dot" /> Open to graduate opportunities, internships and junior roles</div>
        </div>
        <div className="hero-art" aria-label="Developer workspace illustration">
          <div className="code-window">
            <div className="code-window-bar"><span /><span /><span /><small>mogomotsi.dev</small></div>
            <div className="code-window-body">
              <p><span className="code-muted">01</span> <span className="code-purple">const</span> <span className="code-cyan">developer</span> = {'{'}</p>
              <p><span className="code-muted">02</span> &nbsp; name: <span className="code-green">'Mogomotsi'</span>,</p>
              <p><span className="code-muted">03</span> &nbsp; background: <span className="code-green">'CS + Electronics'</span>,</p>
              <p><span className="code-muted">04</span> &nbsp; interests: [</p>
              <p><span className="code-muted">05</span> &nbsp;&nbsp; <span className="code-green">'Software development'</span>,</p>
              <p><span className="code-muted">06</span> &nbsp;&nbsp; <span className="code-green">'Problem solving'</span></p>
              <p><span className="code-muted">07</span> &nbsp; ]</p>
              <p><span className="code-muted">08</span> {'}'};</p>
              <div className="code-cursor" />
            </div>
            <div className="code-window-footer"><span>JAVA</span><span>PYTHON</span><span>SQL</span><span>REACT</span></div>
          </div>
          <div className="hero-art-badge"><strong>01</strong><span>Build<br />with purpose</span></div>
          <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
        </div>
      </div>
      <div className="hero-bottom container"><span>Scroll to explore</span><span className="scroll-line" /><span>Portfolio · 2026</span></div>
    </section>
  );
}
