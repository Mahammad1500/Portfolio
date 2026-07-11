"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowDown, FileText, Briefcase } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import confetti from "canvas-confetti";

export default function Hero() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom typing animation hook logic
  useEffect(() => {
    const currentFullRole = PERSONAL_INFO.roles[roleIndex];
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        setTypedRole(currentFullRole.substring(0, typedRole.length + 1));
        if (typedRole === currentFullRole) {
          // Pause at end
          timer = setTimeout(() => setIsDeleting(true), 2000);
        } else {
          timer = setTimeout(handleTyping, 100);
        }
      } else {
        setTypedRole(currentFullRole.substring(0, typedRole.length - 1));
        if (typedRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        } else {
          timer = setTimeout(handleTyping, 50);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex]);

  const handleResumeDownload = () => {
    // Show confetti on resume download
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563EB", "#06B6D4", "#ffffff"],
    });

    // Mock download action
    alert("Resume download triggered! (Mahammad_Hussain_Resume.pdf)");
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light text-cyan-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Available for Roles</span>
        </motion.div>

        {/* Hello Greeting */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-lg md:text-2xl font-medium mb-3"
        >
          Hello 👋, I'm
        </motion.h3>

        {/* Name Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black font-title tracking-tight text-gradient mb-4 selection:bg-cyan-500/20"
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        {/* Typing Roles Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-10 md:h-14 mb-8 flex items-center justify-center"
        >
          <span className="text-xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 font-title tracking-wide">
            {typedRole}
          </span>
          <span className="w-1 h-6 md:h-10 bg-cyan-400 ml-1 animate-pulse" />
        </motion.div>

        {/* Summary Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          {PERSONAL_INFO.bio}
        </motion.p>

        {/* Buttons / CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12"
        >
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>View Projects</span>
          </button>
          <button
            onClick={handleResumeDownload}
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-slate-800/80 text-white font-bold text-sm tracking-wider uppercase transition-all border border-slate-700 hover:border-slate-500 cursor-pointer flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-6"
        >
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-panel-light text-slate-400 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-panel-light text-slate-400 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-3 rounded-full glass-panel-light text-slate-400 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="p-3 rounded-full glass-panel-light text-slate-400 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300"
            aria-label="Phone"
          >
            <Phone className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
