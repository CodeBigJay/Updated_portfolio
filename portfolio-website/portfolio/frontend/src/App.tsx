import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { usePortfolioData } from './hooks/usePortfolioData';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import AdminPage from './sections/AdminPage';

export default function App() {
  const { projects, skills, experience } = usePortfolioData();
  if (window.location.pathname.startsWith('/admin')) return <AdminPage />;

  return (
    <div className="site-shell">
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
