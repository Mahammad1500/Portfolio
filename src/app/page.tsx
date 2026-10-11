import AnimeSkyEnvironment from "@/components/AnimeSkyEnvironment";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 22nd-Century Anime Sky & Floating Gadgets Environment */}
      <AnimeSkyEnvironment />

      {/* Sticky Golden Bell Navigation */}
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-1 flex flex-col relative">
        <Hero />
        <About />
        <Stats />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />
    </>
  );
}
