"use client";

import { motion } from "framer-motion";
import { Terminal, GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-12">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
          06. Education
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight mb-16">
        Academic <span className="text-cyan-400 font-extrabold">Background</span>
      </h2>

      <div className="relative border-l border-slate-800 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12">
        {EDUCATION.map((edu, idx) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Timeline Cap Icon */}
            <span className="absolute -left-[53px] md:-left-[85px] top-1.5 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 border-2 border-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.3)] z-10">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
            </span>

            {/* Card Content */}
            <div className="p-8 rounded-2xl glass-panel relative border border-slate-800 hover:border-cyan-500/10 transition-all duration-300">
              {/* Glow background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent blur-xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold font-title text-white">
                    {edu.institution}
                  </h3>
                  <p className="text-cyan-400 font-semibold mt-1">
                    {edu.degree}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-white">{edu.grade}</span>
                  </div>
                </div>
              </div>

              {/* Coursework list for IIIT Lucknow */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="pt-4 border-t border-slate-800/60">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Relevant Coursework:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 rounded bg-slate-900 border border-slate-850 text-xs text-slate-300 font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
