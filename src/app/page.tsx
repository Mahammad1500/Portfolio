import AnimeSkyEnvironment from "@/components/AnimeSkyEnvironment";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Gadgets from "@/components/Gadgets";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DoraemonAudio from "@/components/DoraemonAudio";

export default function Home() {
  return (
    <>
      {/* Doraemon Light Sky Environment with floating gadgets */}
      <AnimeSkyEnvironment />

      {/* BGM — auto-plays Doraemon theme on first interaction */}
      <DoraemonAudio />

      {/* Navigation */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="flex-1 flex flex-col relative">
        <Hero />
        <About />
        <Stats />
        <Gadgets />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
