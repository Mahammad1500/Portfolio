"use client";

import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Database, Brain, Wrench } from "lucide-react";
import { SKILLS } from "@/lib/data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Programming Languages": <Code className="w-5 h-5 text-cyan-400" />,
  "Frameworks & Backend": <Cpu className="w-5 h-5 text-blue-500" />,
  "Databases & ORMs": <Database className="w-5 h-5 text-purple-400" />,
  "Machine Learning & AI": <Brain className="w-5 h-5 text-emerald-400" />,
  "Developer Tools & Cloud": <Wrench className="w-5 h-5 text-amber-500" />,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-12">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
          04. Skills
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight mb-16">
        Technical <span className="text-cyan-400 font-extrabold">Arsenal</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="p-6 rounded-2xl glass-panel relative overflow-hidden border border-slate-800/80 hover:border-cyan-500/10 group transition-all duration-300"
          >
            {/* Corner reflection light */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/5 to-transparent blur-lg pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div className="flex items-center gap-3 mb-6 border-b border-slate-800/60 pb-4">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all">
                {CATEGORY_ICONS[cat.title] || <Code className="w-5 h-5" />}
              </div>
              <h3 className="font-extrabold font-title text-base md:text-lg text-white group-hover:text-cyan-400 transition-colors">
                {cat.title}
              </h3>
            </div>

            <div className="space-y-5">
              {cat.items.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    <span>{skill.name}</span>
                    <span className="text-cyan-400 font-normal">{skill.level}%</span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
