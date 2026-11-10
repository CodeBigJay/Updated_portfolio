import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-layout">
        <div>
          <SectionHeading eyebrow="Contact" title={`Let’s build\nsomething useful.`} />
          <p className="contact-copy">I’m interested in graduate programmes, internships and junior software development opportunities. If you’re hiring or would like to discuss a project, I’d welcome the conversation.</p>
        </div>
        <div className="contact-panel">
          <p className="contact-panel-label">Connect with me</p>
          <a href="https://www.linkedin.com/in/mogomotsi-sebogo" target="_blank" rel="noreferrer"><span>LinkedIn</span><b>↗</b></a>
          <a href="https://github.com/CodeBigJay" target="_blank" rel="noreferrer"><span>GitHub</span><b>↗</b></a>
          <a href="https://github.com/CodeBigJay/Updated_portfolio" target="_blank" rel="noreferrer"><span>Portfolio source</span><b>↗</b></a>
        </div>
      </div>
    </section>
  );
}
