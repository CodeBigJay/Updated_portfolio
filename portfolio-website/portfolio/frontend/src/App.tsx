import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { usePortfolioData } from './hooks/usePortfolioData';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';

export default function App() {
  const { projects, skills, experience, apiConnected } = usePortfolioData();

  return (
    <div className="min-h-screen bg-bg">
      <NavBar />
      <main>
        <Hero apiConnected={apiConnected} />
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
