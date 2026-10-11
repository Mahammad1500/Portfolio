"use client";

import { motion } from "framer-motion";
import { Trophy, Cpu, Code, Flame, ExternalLink } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/data";

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  "The Polaris Fellowship 2026": <Trophy className="w-6 h-6 text-amber-400" />,
  "Amazon ML Summer School 2024": <Cpu className="w-6 h-6 text-sky-400" />,
  "Microsoft Campus Connect Program 2024": <Trophy className="w-6 h-6 text-indigo-400" />,
  "Hacktoberfest 2023": <Flame className="w-6 h-6 text-rose-400" />,
  "LeetCode 500+ Problems": <Code className="w-6 h-6 text-emerald-400" />,
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16">
      {/* Anime Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold">
          名誉の証 • 05. Milestones & Recognition
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white mb-6">
        Secret Gadget <span className="text-amber-400">Honors</span> & Badges
      </h2>

      <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
        Key competitive recognitions, national fellowships, and rigorous problem-solving milestones achieved throughout my engineering journey.
      </p>

      {/* Grid: Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ACHIEVEMENTS.map((ach, idx) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 hover:border-amber-400/60 relative overflow-hidden group shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 via-sky-500/5 to-transparent blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            {/* Icon Disc */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-amber-400/50 group-hover:bg-amber-400/5 transition-all shrink-0">
              {ACHIEVEMENT_ICONS[ach.title] || <Trophy className="w-6 h-6 text-amber-400" />}
            </div>

            {/* Body */}
            <div className="flex-grow">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">
                  {ach.issuer}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-bold text-amber-300 font-mono">
                  {ach.date}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-title text-white mb-2 group-hover:text-amber-300 transition-colors">
                {ach.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {ach.description}
              </p>

              {ach.link && (
                <a
                  href={ach.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transition-transform"
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
