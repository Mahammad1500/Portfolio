"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { sounds } from "@/lib/sound";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    const observers = NAV_ITEMS.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    sounds.enabled = newState;
    if (newState) sounds.playChime();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sounds.playChime();
    const el = document.getElementById(id);
    if (el) {
      setMobileMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md py-3.5 border-b border-sky-200/80 shadow-md shadow-sky-100/40"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with Golden Bell Icon */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-200 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
              <span className="text-xs">🔔</span>
            </div>
            <span className="text-sm sm:text-base font-extrabold font-title tracking-tight text-sky-900 group-hover:text-sky-600 transition-colors">
              {PERSONAL_INFO.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 border border-sky-200/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-3.5 py-1 text-xs font-semibold tracking-wide transition-all rounded-full ${
                  activeSection === item.id
                    ? "text-sky-700 bg-sky-100 border border-sky-300"
                    : "text-slate-600 hover:text-sky-700 hover:bg-sky-50"
                }`}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Controls: Audio Toggle & Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                audioEnabled
                  ? "bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100"
                  : "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
              }`}
              title={audioEnabled ? "Sound Effects On (Click to Mute)" : "Sound Effects Muted (Click to Enable)"}
              aria-label="Toggle sound effects"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <a
              href={PERSONAL_INFO.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playChime()}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-sky-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-sky-400/25 cursor-pointer"
            >
              <span>Connect</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 transition-colors shadow-sm"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white/95 z-30 pt-28 px-8 flex flex-col justify-start gap-5 backdrop-blur-xl overflow-y-auto"
          >
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-between border-b border-sky-100 pb-3 text-base font-semibold ${
                    activeSection === item.id ? "text-sky-600" : "text-slate-700"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-400 font-mono">
                    0{NAV_ITEMS.indexOf(item) + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={toggleAudio}
                className="flex-1 py-3 rounded-xl bg-white border border-sky-200 text-xs font-bold text-slate-600 flex items-center justify-center gap-2"
              >
                {audioEnabled ? <Volume2 className="w-4 h-4 text-amber-500" /> : <VolumeX className="w-4 h-4" />}
                <span>{audioEnabled ? "Sound On" : "Sound Off"}</span>
              </button>
              <a
                href={PERSONAL_INFO.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center rounded-xl bg-white border border-sky-200 text-xs font-bold text-sky-700"
              >
                Resume
              </a>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-sky-400/25"
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
