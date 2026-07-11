"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Search, ExternalLink, X, CheckCircle, Flame, Target, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS, ProjectItem } from "@/lib/data";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Full Stack", "AI & Analytics"];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = filter === "All" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-12">
      <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              03. Projects
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white">
            Selected <span className="text-cyan-400 font-extrabold">Creations</span>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-slate-950/80 border border-slate-800 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filter === cat
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                : "glass-panel text-slate-400 hover:text-white hover:border-slate-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group gradient-border-card overflow-hidden flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Premium abstract graphic header instead of plain placeholder */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-900">
                {/* Custom glowing design grids */}
                <div className="absolute inset-0 grid-bg opacity-20 group-hover:scale-110 transition-transform duration-500" />
                <div className={`absolute w-36 h-36 rounded-full blur-[60px] opacity-35 group-hover:scale-150 transition-transform duration-500 ${
                  project.id === "intervuex" 
                    ? "bg-gradient-to-tr from-cyan-500 to-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                    : "bg-gradient-to-tr from-purple-500 to-indigo-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                }`} />

                <div className="z-10 text-center">
                  <h4 className="text-3xl font-black font-title tracking-widest text-slate-700/50 select-none group-hover:text-cyan-400/35 transition-colors uppercase">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold group-hover:text-cyan-300/40 transition-colors">
                    {project.category}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-title text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                  {project.shortDesc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-auto mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  <span>Explore Architecture →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#020617]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 md:p-10 border border-slate-800 relative scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Meta */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-black font-title text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
                    Project Overview
                  </h4>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
                    {selectedProject.longDesc}
                  </p>

                  {/* Features list */}
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar details */}
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-900 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 font-bold text-xs uppercase tracking-wider text-white transition-all"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>Codebase</span>
                    </a>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-cyan-500/10 font-bold text-xs uppercase tracking-wider text-white transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Extra premium details: Challenges, Impact, Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-900">
                <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-900/80">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider mb-2 font-title">
                    <Flame className="w-4 h-4" />
                    <span>Challenges</span>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-900/80">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2 font-title">
                    <Target className="w-4 h-4" />
                    <span>Business Impact</span>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-900/80">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2 font-title">
                    <Trophy className="w-4 h-4" />
                    <span>Lessons Learned</span>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {selectedProject.lessons}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
