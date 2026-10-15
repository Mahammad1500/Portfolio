"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, ExternalLink, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import { sounds } from "@/lib/sound";
import Doraemon3D from "./Doraemon3D";

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
          timer = setTimeout(() => setIsDeleting(true), 2400);
        } else {
          timer = setTimeout(handleTyping, 75);
        }
      } else {
        setTypedRole(currentFullRole.substring(0, typedRole.length - 1));
        if (typedRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        } else {
          timer = setTimeout(handleTyping, 35);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 35 : 110);
    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex]);

  const handleResumeClick = () => {
    sounds.playChime();
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
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Engineer Bio & Call-to-actions */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Doraemon Accent Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-300 text-sky-800 text-xs font-bold mb-4 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Software Development Engineer</span>
            <span className="text-slate-300">•</span>
            <span className="text-sky-700">IIIT Lucknow CSE</span>
          </motion.div>

          {/* Name Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-title tracking-tight text-slate-900 mb-2"
          >
            Hi, I&apos;m{" "}
            <span className="shimmer-text">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          {/* Role Ticker (Focused on SDE) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center mb-4"
          >
            <span className="text-xl sm:text-3xl font-extrabold text-amber-500 font-title tracking-wide">
              {typedRole}
            </span>
            <span className="w-1 h-6 sm:h-8 bg-sky-500 ml-1.5 animate-pulse rounded-full" />
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mb-7"
          >
            Computer Science graduate from <strong className="text-slate-900 font-bold">IIIT Lucknow</strong> building reliable backend distributed systems, high-throughput microservices in <strong className="text-sky-700 font-bold">Go & TypeScript</strong> at <strong className="text-slate-900 font-bold">CoinDCX</strong>, and production full-stack platforms.
          </motion.p>

          {/* Key Experience Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2.5 mb-8"
          >
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-sky-200 text-slate-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <span className="text-sky-600 font-bold">CoinDCX</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">SDE Intern (Backend in Go & TS)</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-200 text-slate-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <span className="text-amber-500 font-bold">Flipkart</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">SDE Intern (2.8Cr+ Records ML Pipeline)</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-8"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-500/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResumeClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-sky-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all border border-slate-300 hover:border-sky-400 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>View Resume</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </motion.div>

          {/* Social Profiles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-sky-200 text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-all shadow-sm"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-sky-200 text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-all shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4 text-sky-600" />
            </a>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Bengaluru, India</span>
            </span>
          </motion.div>
        </div>

        {/* Right Column: Real Interactive 3D Doraemon in Three.js */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <Doraemon3D />
        </div>
      </div>
    </section>
  );
}
