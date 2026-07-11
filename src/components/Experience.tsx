"use client";

import { motion } from "framer-motion";
import { Terminal, Calendar, MapPin, Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-12">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
          02. Experience
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight mb-16">
        Professional <span className="text-cyan-400 font-extrabold">Timeline</span>
      </h2>

      <div className="relative border-l border-slate-800 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12">
        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.company + exp.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Timeline node icon */}
            <span className="absolute -left-[53px] md:-left-[85px] top-1.5 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 border-2 border-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.3)] z-10">
              <Briefcase className="w-5 h-5 text-cyan-400" />
            </span>

            {/* Experience card */}
            <div className="p-8 rounded-2xl glass-panel relative border border-slate-800 hover:border-cyan-500/20 transition-all duration-300">
              {/* Corner decoration glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent blur-xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold font-title text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold mt-1">
                    <span className="text-lg">{exp.company}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span className="text-slate-400 text-sm font-normal">{exp.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Achievements Bullet List */}
              <ul className="space-y-4 mb-8 text-slate-300 text-base leading-relaxed">
                {exp.achievements.map((ach, achIndex) => (
                  <motion.li
                    key={achIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: achIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{ach}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Technologies Badges */}
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
                  Key Technologies Deployed:
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
