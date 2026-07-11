"use client";

import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950/30 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: copyright */}
        <p className="text-slate-500 text-xs md:text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Handcrafted in India.
        </p>

        {/* Middle: Quick social links */}
        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="GitHub profile"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Email Address"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={handleScrollToTop}
          className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-2 group text-xs font-bold uppercase tracking-wider"
          aria-label="Scroll to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
