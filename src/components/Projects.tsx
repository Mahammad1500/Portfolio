"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, X, CheckCircle, Flame, Target, Trophy, Sparkles, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { sounds } from "@/lib/sound";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Full Stack"];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = filter === "All" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (project: ProjectItem) => {
    sounds.playGadgetPop();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16">
      {/* Anime Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-full bg-pink-500/10 border border-pink-400/40 flex items-center justify-center">
              <span className="text-xs">🚪</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-pink-400 font-extrabold">
              どこでもドア • 03. Anywhere Door Portals
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white">
            Selected <span className="text-sky-400">Engineering</span> Creations
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            Each project is built like a secret gadget—engineered to solve complex coordination, scheduling, and privacy challenges with high reliability.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-sky-500/30 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-sky-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              filter === cat
                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20 scale-105"
                : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-400/40"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid: Anywhere Door Portal Themed Showcases */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 hover:border-pink-500/60 overflow-hidden flex flex-col h-full cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
              onClick={() => handleOpenModal(project)}
            >
              {/* Project Visual Portal Header */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950 flex flex-col justify-between p-6 border-b border-slate-800">
                {/* Dokodemo Door Pink Arch Frame Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-rose-400 to-sky-400" />
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-15 group-hover:scale-105 transition-transform duration-700" />

                {/* Glowing portal aura */}
                <div
                  className={`absolute w-52 h-52 rounded-full blur-[70px] opacity-35 group-hover:opacity-50 transition-all duration-500 ${
                    project.id === "intervuex"
                      ? "bg-gradient-to-tr from-sky-500 to-pink-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      : "bg-gradient-to-tr from-amber-400 to-indigo-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  }`}
                />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-pink-400/40 text-pink-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span>🚪</span>
                    <span>Anywhere Portal</span>
                  </span>
                  <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {project.category}
                  </span>
                </div>

                {/* Center Title & Mockup Graphic */}
                <div className="relative z-10 my-auto text-center">
                  <h4 className="text-3xl sm:text-4xl font-black font-title text-white tracking-wide group-hover:text-sky-300 transition-colors uppercase">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-sm mx-auto font-mono">
                    {project.id === "intervuex"
                      ? "Admin & HR Workspaces • Panel Scheduling"
                      : "Multi-Role Feedback • 80% Workload Reduction"}
                  </p>
                </div>

                {/* Bottom Impact Indicator */}
                <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <span className="text-sky-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{project.id === "intervuex" ? "60% Effort Cut" : "80% Workload Saved"}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-pink-300 transition-colors flex items-center gap-1">
                    <span>Inspect Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold font-title text-white mb-2 group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                  {project.shortDesc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-400 text-slate-300 hover:text-white transition-all"
                      title="View GitHub Repository"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                    {project.liveUrl && project.liveUrl !== project.githubUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-2 rounded-xl bg-sky-500/15 border border-sky-400/40 hover:bg-sky-500/25 text-sky-300 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Full Blueprint</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Details Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070f2b]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-slate-900 border-2 border-pink-500/50 p-6 sm:p-10 relative scrollbar-none shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Badge */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-sky-400">
                    どこでもドア • Verified Project Blueprint
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black font-title text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Grid: Overview & Meta */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-extrabold mb-3">
                    Architecture & Problem Statement
                  </h4>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                    {selectedProject.longDesc}
                  </p>

                  {/* Key Features */}
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-extrabold mb-3">
                    Core Functional Capabilities
                  </h4>
                  <ul className="space-y-2.5 mb-6">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm sm:text-base">
                        <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar details */}
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-400 font-extrabold mb-4">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400 font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>View GitHub Code</span>
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Engineering Triad: Challenges, Business Impact, Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider mb-2 font-title">
                    <Flame className="w-4 h-4" />
                    <span>Technical Challenges</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider mb-2 font-title">
                    <Target className="w-4 h-4" />
                    <span>Documented Impact</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2 font-title">
                    <Trophy className="w-4 h-4" />
                    <span>Lessons Learned</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
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
