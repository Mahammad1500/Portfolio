"use client";

import { ArrowUp, Mail, Clock } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import { sounds } from "@/lib/sound";

export default function Footer() {
  const handleScrollToTop = () => {
    sounds.playChime();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-sky-300/40 bg-white/60 backdrop-blur-sm px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Branding & Info */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <span className="text-sm">🔔</span>
            <span className="font-bold font-title text-slate-900 text-sm">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs text-sky-600 font-mono">
              • Doraemon Edition
            </span>
          </div>
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with Doraemon-inspired engineering.
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-sky-200 text-slate-500 hover:text-slate-800 hover:border-sky-400 transition-all shadow-sm"
            aria-label="GitHub profile"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-sky-200 text-slate-500 hover:text-sky-600 hover:border-sky-400 transition-all shadow-sm"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-xl bg-white border border-sky-200 text-slate-500 hover:text-amber-500 hover:border-amber-300 transition-all shadow-sm"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={handleScrollToTop}
          className="px-4 py-2.5 rounded-2xl bg-white hover:bg-sky-50 border border-sky-200 hover:border-sky-400 text-slate-700 hover:text-sky-700 transition-all cursor-pointer flex items-center gap-2 group text-xs font-bold uppercase tracking-wider shadow-sm"
          aria-label="Scroll to top"
        >
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Rewind Time to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
