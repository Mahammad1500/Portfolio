"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Sparkles, Clock, CheckCircle } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-16">
      {/* Anime Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold">
          タイムマシン • 02. Time Machine Chrono-line
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white mb-6">
        Traversing the <span className="text-sky-400">Space-Time</span> Career Vortex
      </h2>

      <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
        Stepping into Doraemon&apos;s Time Machine to trace my real-world industry impact—from building large-scale machine learning systems at Flipkart to architecting backend services at CoinDCX.
      </p>

      {/* Time Machine Timeline Vortex Track */}
      <div className="relative border-l-2 border-sky-500/40 ml-4 md:ml-10 pl-8 md:pl-14 space-y-14">
        {/* Swirling Time Warp Ambient Light */}
        <div className="absolute top-0 bottom-0 -left-[1px] w-0.5 bg-gradient-to-b from-sky-400 via-amber-400 to-pink-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.company + exp.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            {/* Time Machine Node Sphere (Space-Time Clock Portal) */}
            <span className="absolute -left-[49px] md:-left-[73px] top-1.5 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-950 border-2 border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.6)] z-10 group">
              <span className="text-base md:text-lg animate-pulse">
                {index === 0 ? "⚡" : "🤖"}
              </span>
            </span>

            {/* Chrono-Card Container */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 hover:border-amber-400/50 transition-all duration-300 relative overflow-hidden shadow-xl group">
              {/* Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sky-500/10 via-amber-400/5 to-transparent blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              {/* Header: Role & Organization */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[11px] font-bold uppercase tracking-wider">
                      {index === 0 ? "Current Deployment" : "Completed Internship"}
                    </span>
                    <span className="text-xs text-amber-400/80 font-bold font-mono">
                      {index === 0 ? "Go & TypeScript" : "Python & XGBoost"}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-title text-white">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-sky-400 font-bold mt-1 text-lg">
                    <span>{exp.company}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 text-sm font-normal">{exp.location}</span>
                  </div>
                </div>

                {/* Duration & Location Badges */}
                <div className="flex flex-wrap gap-2.5 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{exp.location}</span>
                  </div>
                  {exp.certificateLink && (
                    <a
                      href={exp.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 hover:bg-amber-500/25 transition-all"
                    >
                      <span>📜 Verified Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Achievements Bullet List */}
              <ul className="space-y-4 mb-8 text-slate-300 text-sm sm:text-base leading-relaxed">
                {exp.achievements.map((ach, achIndex) => (
                  <motion.li
                    key={achIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: achIndex * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                    <span>{ach}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Technologies Badges */}
              <div className="pt-6 border-t border-slate-800">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-extrabold mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>22nd-Century Tech Arsenal:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-sky-400/50 hover:bg-sky-500/10 transition-all cursor-default"
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
