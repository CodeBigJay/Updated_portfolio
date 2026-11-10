import SectionHeading from '../components/SectionHeading';

export default function About({ content }: { content: { lead: string; paragraphs: string[] } }) {
  return (
    <section id="about" className="section section-about">
      <div className="container about-grid">
        <SectionHeading eyebrow="About me" title={`A technical foundation.\nA practical mindset.`} />
        <div className="about-copy">
          <p className="lead-copy">{content.lead}</p>
          {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <a className="inline-link" href="https://github.com/CodeBigJay" target="_blank" rel="noreferrer">Explore my GitHub <span>↗</span></a>
        </div>
      </div>
      <div className="container values-row"><div><strong>01</strong><span>Analytical problem solving</span></div><div><strong>02</strong><span>Continuous learning</span></div><div><strong>03</strong><span>Clear communication</span></div></div>
    </section>
  );
}
