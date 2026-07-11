"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Track active section on scroll using Intersection Observer
    const observers = NAV_ITEMS.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px", // triggers when section is in the middle of viewport
        }
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
            ? "glass-nav py-4 shadow-lg shadow-black/10"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="text-xl font-bold font-title tracking-wider text-gradient flex items-center gap-2"
          >
            <span>H</span>
            <span className="text-cyan-400 font-normal">.</span>
            <span>H</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                  activeSection === item.id ? "text-cyan-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Resume Download CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="relative group px-5 py-2.5 rounded-full overflow-hidden border border-cyan-500/30 hover:border-cyan-400 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-white flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-cyan-500/10"
            >
              <span className="relative z-10">Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#020617] z-30 pt-28 px-8 flex flex-col justify-start gap-8"
          >
            {/* Background overlay lights for drawer */}
            <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

            <nav className="flex flex-col gap-6 text-2xl font-bold tracking-wide">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-between border-b border-slate-800/50 pb-4 ${
                    activeSection === item.id ? "text-cyan-400" : "text-slate-300"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-500 font-normal">
                    0{NAV_ITEMS.indexOf(item) + 1}
                  </span>
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="mt-4 w-full py-4 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold tracking-wider text-sm uppercase transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
