import SectionHeading from '../components/SectionHeading';

export default function About() {
  return (
    <section id="about" className="section section-about">
      <div className="container about-grid">
        <SectionHeading eyebrow="About me" title="A technical foundation.\nA practical mindset." />
        <div className="about-copy">
          <p className="lead-copy">I’m a Computer Science and Electronics graduate from North-West University, interested in building technology that makes everyday work simpler and more effective.</p>
          <p>My studies gave me a foundation in programming, databases, software engineering and electronics. Alongside my technical projects, my experience in tutoring and classroom supervision has strengthened my communication, organisation and ability to explain ideas clearly.</p>
          <p>I’m looking for opportunities to contribute, keep learning and grow as a software developer.</p>
          <a className="inline-link" href="https://github.com/CodeBigJay" target="_blank" rel="noreferrer">Explore my GitHub <span>↗</span></a>
        </div>
      </div>
      <div className="container values-row"><div><strong>01</strong><span>Analytical problem solving</span></div><div><strong>02</strong><span>Continuous learning</span></div><div><strong>03</strong><span>Clear communication</span></div></div>
    </section>
  );
}
