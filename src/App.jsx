import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import WorkProcess from "./sections/WorkProcess";
import Projects from "./sections/Projects";
import LatestProjects from "./sections/LatestProjects";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="work">
        <WorkProcess />
        <Projects />
        <LatestProjects />
      </section>

      <Marquee />

      <Testimonials />

      <CTA />

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
