import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="section section-contact"><div className="container contact-layout"><div><SectionHeading eyebrow="Start a conversation" title="Have something\nin mind?" /><p className="contact-copy">I’m open to opportunities, thoughtful collaborations and conversations about technology. I’d be glad to hear from you.</p></div><div className="contact-panel"><p className="contact-panel-label">Find me around the web</p><a href="https://www.linkedin.com/in/mogomotsi-sebogo" target="_blank" rel="noreferrer"><span>LinkedIn</span><b>↗</b></a><a href="https://github.com/CodeBigJay" target="_blank" rel="noreferrer"><span>GitHub</span><b>↗</b></a><a href="https://github.com/CodeBigJay/Updated_portfolio" target="_blank" rel="noreferrer"><span>Portfolio source</span><b>↗</b></a></div></div></section>
  );
}
