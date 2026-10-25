"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-300 text-sky-800 text-xs font-semibold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Academic Foundations • Education</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-slate-900">
          Academic <span className="text-sky-600">Background</span>
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-xl mt-3 leading-relaxed">
          Computer Science foundations rooted in algorithms, distributed systems, operating systems, and software engineering.
        </p>
      </div>

      {/* Timeline track */}
      <div className="relative border-l-2 border-sky-300 ml-4 md:ml-8 pl-6 md:pl-12 space-y-10">
        {EDUCATION.map((edu, idx) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Cap Icon */}
            <span className="absolute -left-[35px] md:-left-[59px] top-1.5 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-sky-500 shadow-md z-10">
              <GraduationCap className="w-4 h-4 text-sky-600" />
            </span>

            {/* Card Content */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white/85 border border-sky-200 hover:border-sky-400 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-title text-slate-900">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <p className="text-sky-700 font-semibold text-sm sm:text-base">
                      {edu.degree}
                    </p>
                    {edu.courseStructureLink && (
                      <a
                        href={edu.courseStructureLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 transition-colors"
                      >
                        <span>Course Structure</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{edu.grade}</span>
                  </div>
                </div>
              </div>

              {/* Coursework list for IIIT Lucknow */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    <span>Core Curricula:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-900 font-medium"
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
