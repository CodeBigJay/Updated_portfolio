export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p><h2>{title.split('\n').map((line, index) => <span key={index}>{line}{index < title.split('\n').length - 1 ? <br /> : null}</span>)}</h2></div>;
}
