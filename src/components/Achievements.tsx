"use client";

import { motion } from "framer-motion";
import { Trophy, Cpu, Code, Flame, ExternalLink, Sparkles } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/data";

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  "The Polaris Fellowship 2026": <Trophy className="w-5 h-5 text-amber-500" />,
  "Amazon ML Summer School 2024": <Cpu className="w-5 h-5 text-sky-600" />,
  "Microsoft Campus Connect Program 2024": <Trophy className="w-5 h-5 text-indigo-600" />,
  "Hacktoberfest 2023": <Flame className="w-5 h-5 text-rose-500" />,
  "LeetCode 500+ Problems": <Code className="w-5 h-5 text-emerald-600" />,
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-300 text-amber-800 text-xs font-semibold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Featured Milestones • Honors & Achievements</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-slate-900">
          Honors & <span className="text-amber-500">Achievements</span>
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
          National fellowships, technical summer schools, and competitive programming milestones achieved throughout my engineering journey.
        </p>
      </div>

      {/* Grid: Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {ACHIEVEMENTS.map((ach, idx) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-6 sm:p-7 rounded-3xl bg-white/85 border border-sky-200 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col sm:flex-row gap-5 items-start backdrop-blur-sm"
          >
            {/* Icon Disc */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
              {ACHIEVEMENT_ICONS[ach.title] || <Trophy className="w-5 h-5 text-amber-500" />}
            </div>

            {/* Body */}
            <div className="flex-grow">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-wider text-sky-700 font-bold">
                  {ach.issuer}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800 font-mono">
                  {ach.date}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-title text-slate-900 mb-2">
                {ach.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {ach.description}
              </p>

              {ach.link && (
                <a
                  href={ach.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1 rounded-xl border border-sky-200 transition-all"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
