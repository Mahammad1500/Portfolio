"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, Sparkles, MapPin, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import confetti from "canvas-confetti";
import Hero3DCompanion from "./Hero3DCompanion";
import AnywhereDoor3D from "./AnywhereDoor3D";
import { sounds } from "@/lib/sound";

export default function Hero() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = PERSONAL_INFO.roles[roleIndex];
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        setTypedRole(currentFullRole.substring(0, typedRole.length + 1));
        if (typedRole === currentFullRole) {
          timer = setTimeout(() => setIsDeleting(true), 2200);
        } else {
          timer = setTimeout(handleTyping, 80);
        }
      } else {
        setTypedRole(currentFullRole.substring(0, typedRole.length - 1));
        if (typedRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        } else {
          timer = setTimeout(handleTyping, 40);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 40 : 120);
    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex]);

  const handleResumeClick = () => {
    sounds.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0284C7", "#EF4444", "#FBBF24", "#38BDF8", "#FFFFFF"],
    });
    window.open(PERSONAL_INFO.resumeLink, "_blank");
  };

  const handleScrollTo = (id: string) => {
    sounds.playChime();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Engineer Introduction & Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Japanese Anime Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>未来の世界へ • Welcome to the 22nd Century</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </motion.div>

          {/* Subtitle intro */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 text-slate-400 text-sm md:text-base font-semibold tracking-wide mb-2"
          >
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>{PERSONAL_INFO.location} • IIIT Lucknow CS Graduate</span>
          </motion.div>

          {/* Hero Name with Doraemon signature anime styling */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-title tracking-tight text-white mb-3"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          {/* Dynamic Role Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-10 sm:h-12 flex items-center mb-6"
          >
            <span className="text-xl sm:text-3xl font-extrabold text-amber-300 font-title tracking-wide">
              {typedRole}
            </span>
            <span className="w-1 h-6 sm:h-8 bg-sky-400 ml-1.5 animate-pulse rounded-full" />
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8"
          >
            Building high-throughput backend services in <strong className="text-white">Go</strong> and <strong className="text-white">TypeScript</strong> at <span className="text-sky-300 font-bold">CoinDCX FRP</span>, and trained end-to-end predictive machine learning pipelines at <span className="text-amber-300 font-bold">Flipkart</span> on 2.8Cr+ customer escalation datasets.
          </motion.p>

          {/* Highlight Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-2.5 mb-8"
          >
            <span className="px-3 py-1 rounded-xl bg-sky-950/70 border border-sky-500/30 text-sky-300 text-xs font-semibold flex items-center gap-1.5">
              <span>⚡</span> CoinDCX SDE Intern (Backend)
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
              <span>🤖</span> ex-Flipkart SDE Intern (ML)
            </span>
            <span className="px-3 py-1 rounded-xl bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5">
              <span>🎓</span> IIIT Lucknow (8.35 CGPA)
            </span>
            <span className="px-3 py-1 rounded-xl bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5">
              <span>🌟</span> Top 1% Polaris Fellow
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-500/25 hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Gadget Projects 🚀</span>
            </button>

            <button
              onClick={handleResumeClick}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all border border-slate-700 hover:border-amber-400 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <FileText className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>View Resume 📄</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </button>
          </motion.div>

          {/* Social Icons Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-400 hover:scale-105 transition-all shadow-md"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-400 hover:scale-105 transition-all shadow-md"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5 text-sky-400" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-400 transition-all text-xs font-semibold flex items-center gap-2"
            >
              <span>📧</span>
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Companion Centerpiece & Anywhere Door Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Glowing Aura Ring */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-sky-500/20 via-pink-500/10 to-amber-400/10 blur-3xl pointer-events-none" />

          {/* 3D Doraemon-Inspired Robotic Companion */}
          <Hero3DCompanion onInteract={() => {}} />

          {/* Mini Anywhere Door Drawer Hint */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => handleScrollTo("about")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-400/60 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <span>🎒 Open 4D Pocket Laboratory</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Anywhere Door Mini Feature Section */}
      <div className="max-w-5xl mx-auto w-full mt-16 pt-12 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        <div className="max-w-md text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
            どこでもドア • Instant Portal
          </span>
          <h3 className="text-2xl font-black font-title text-white mt-1 mb-2">
            Step through the <span className="text-pink-400">Anywhere Door</span>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Click the door handle to open a cosmic portal into my verified engineering projects or pull out my 22nd-century resume.
          </p>
        </div>

        <AnywhereDoor3D onTravelProjects={() => handleScrollTo("projects")} />
      </div>
    </section>
  );
}
