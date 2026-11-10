import SectionHeading from '../components/SectionHeading';
import type { Project } from '../types';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section section-tint">
      <div className="container"><div className="section-intro projects-intro"><SectionHeading eyebrow="Selected work" title={`Things I’ve been\nbuilding.`} /><p className="section-description">A selection of experiments, practical builds and ideas brought to life. More work will find its way here as it grows.</p></div>
        <div className="project-grid">{projects.filter((project) => project.published !== false).map((project, index) => <article className={`project-card ${project.featured ? 'project-featured' : ''}`} key={project.id}><div className="project-visual">{project.imageUrl ? <img src={project.imageUrl} alt={`${project.title} preview`} /> : <div className={`project-placeholder placeholder-${index % 3}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{project.category || 'Selected project'}</strong><i>✳</i></div>}<span className="project-index">PROJECT / {String(index + 1).padStart(2, '0')}</span></div><div className="project-content"><div className="project-title-row"><div><p className="project-category">{project.category || 'Development'}</p><h3>{project.title}</h3></div>{project.featured && <span className="featured-label">Featured</span>}</div><p className="project-description">{project.description}</p><div className="project-tags">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.gallery?.length ? <div className="project-gallery">{project.gallery.map((image) => <a key={image} href={image} target="_blank" rel="noreferrer"><img src={image} alt={`${project.title} additional preview`} loading="lazy" /></a>)}</div> : null}<div className="project-links">{project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">Source code ↗</a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">View project ↗</a>}{project.documents?.map((doc) => <a key={doc.url} href={doc.url} target="_blank" rel="noreferrer">{doc.name} ↗</a>)}</div></div></article>)}</div>
        {projects.length === 0 && <p className="empty-projects">New projects are on the way. Check back soon.</p>}
      </div>
    </section>
  );
}
