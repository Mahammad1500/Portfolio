"use client";

import { motion } from "framer-motion";
import { Terminal, Trophy, Cpu, Code, Flame } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/data";

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  "Amazon ML Summer School Scholar": <Cpu className="w-6 h-6 text-amber-500" />,
  "Microsoft Campus Connect Facilitator": <Trophy className="w-6 h-6 text-blue-500" />,
  "Competitive Programming Excellence": <Code className="w-6 h-6 text-cyan-400" />,
  "Hacktoberfest Contributor": <Flame className="w-6 h-6 text-red-500" />,
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-12">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
          05. Achievements
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight mb-16">
        Milestones & <span className="text-cyan-400 font-extrabold">Recognition</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ACHIEVEMENTS.map((ach, idx) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="p-6 md:p-8 rounded-2xl glass-panel relative overflow-hidden group border border-slate-800/85 hover:border-cyan-500/25 transition-all duration-300 flex gap-4 md:gap-6 items-start"
          >
            {/* Ambient card background glow */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500/5 to-transparent blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all shrink-0">
              {ACHIEVEMENT_ICONS[ach.title] || <Trophy className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-lg md:text-xl font-bold font-title text-white group-hover:text-cyan-400 transition-colors">
                  {ach.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                  {ach.date}
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest text-cyan-400/80 font-bold mb-3">
                {ach.issuer}
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                {ach.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
