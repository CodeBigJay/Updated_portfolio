import SectionHeading from '../components/SectionHeading';

export default function About() {
  return (
    <section id="about" className="section section-about">
      <div className="container about-grid">
        <SectionHeading eyebrow="A little context" title="Curious by nature.\nPractical by design." />
        <div className="about-copy">
          <p className="lead-copy">I enjoy understanding how things work — from the logic behind an application to the experience someone has while using it.</p>
          <p>My background in Computer Science and Electronics has given me a foundation across programming, databases, software engineering and systems. I’m continuing to grow through hands-on projects and learning by building.</p>
          <a className="inline-link" href="https://github.com/CodeBigJay" target="_blank" rel="noreferrer">Explore my GitHub <span>↗</span></a>
        </div>
      </div>
      <div className="container values-row"><div><strong>01</strong><span>Problem solving</span></div><div><strong>02</strong><span>Continuous learning</span></div><div><strong>03</strong><span>Clear communication</span></div></div>
    </section>
  );
}
