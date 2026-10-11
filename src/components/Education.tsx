"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-16">
      {/* Anime Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-400/40 flex items-center justify-center">
          <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
        </div>
        <span className="text-xs uppercase tracking-widest text-sky-400 font-extrabold">
          学問の軌跡 • 06. Academic Foundations
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white mb-6">
        Academic <span className="text-sky-400">Background</span> & Rigor
      </h2>

      <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
        Solid engineering foundations rooted in computer science theory, systems architecture, and mathematical discipline.
      </p>

      {/* Timeline track */}
      <div className="relative border-l-2 border-sky-500/40 ml-4 md:ml-10 pl-8 md:pl-14 space-y-12">
        {EDUCATION.map((edu, idx) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Cap Icon */}
            <span className="absolute -left-[49px] md:-left-[73px] top-1.5 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-950 border-2 border-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.5)] z-10">
              <GraduationCap className="w-5 h-5 text-sky-400" />
            </span>

            {/* Card Content */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 hover:border-sky-400/60 transition-all duration-300 relative overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-title text-white">
                    {edu.institution}
                  </h3>
                  <p className="text-sky-400 font-bold mt-1 text-base">
                    {edu.degree}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{edu.grade}</span>
                  </div>
                </div>
              </div>

              {/* Coursework list for IIIT Lucknow */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    <span>Core Computer Science Curricula:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-medium"
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
