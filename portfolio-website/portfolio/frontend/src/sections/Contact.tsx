import SectionHeading from '../components/SectionHeading';

export default function Contact({ content }: { content: { intro: string; links: { label: string; url: string }[] } }) {
  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-layout">
        <div>
          <SectionHeading eyebrow="Contact" title={`Let’s build\nsomething useful.`} />
          <p className="contact-copy">{content.intro}</p>
        </div>
        <div className="contact-panel">
          <p className="contact-panel-label">Connect with me</p>
          {content.links.map((link, index) => <a key={index} href={link.url} target="_blank" rel="noreferrer"><span>{link.label}</span><b>↗</b></a>)}
        </div>
      </div>
    </section>
  );
}
