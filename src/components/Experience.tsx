"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Sparkles, CheckCircle } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Time Machine Career Journey • Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-white">
            Industry <span className="text-sky-400">Experience</span> & Impact
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mt-3 leading-relaxed">
            Hands-on software development engineering spanning high-scale machine learning at Flipkart and backend platform services at CoinDCX.
          </p>
        </div>

        {/* 3D Vintage Time Machine Badge Banner */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shrink-0 border-2 border-amber-400/30 shadow-xl shadow-amber-500/10 hidden sm:block">
          <Image
            src="/images/time_machine.jpg"
            alt="3D Doraemon Time Machine"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
              Time Machine
            </span>
          </div>
        </div>
      </div>

      {/* Clean Timeline */}
      <div className="relative border-l-2 border-sky-500/30 ml-4 md:ml-8 pl-6 md:pl-12 space-y-12">
        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.company + exp.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Node Icon */}
            <span className="absolute -left-[35px] md:-left-[59px] top-1.5 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-950 border-2 border-sky-400 shadow-md shadow-sky-500/20 z-10">
              <span className="text-xs md:text-sm">{index === 0 ? "⚡" : "🤖"}</span>
            </span>

            {/* Experience Card */}
            <div className="p-7 sm:p-9 rounded-3xl bg-slate-900/85 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 shadow-lg">
              {/* Header: Role & Organization */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="px-3 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-xs font-semibold inline-block mb-2">
                    {index === 0 ? "Current Role" : "Completed Internship"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-title text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sky-400 font-bold mt-1 text-base">
                    <span>{exp.company}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 text-xs sm:text-sm font-normal">{exp.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{exp.location}</span>
                  </div>
                  {exp.certificateLink && (
                    <a
                      href={exp.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:bg-amber-500/25 transition-all font-semibold"
                    >
                      <span>Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Achievements Bullet List */}
              <ul className="space-y-3 mb-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                {exp.achievements.map((ach, achIndex) => (
                  <li key={achIndex} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Badges */}
              <div className="pt-5 border-t border-slate-800/80">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2.5">
                  Technologies Applied:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300"
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
