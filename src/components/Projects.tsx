"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, X, CheckCircle, Flame, Target, Trophy, Sparkles, Maximize2 } from "lucide-react";
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
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-pink-300 text-pink-800 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Anywhere Door Portals • Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-slate-900">
            Featured <span className="text-sky-600">Software</span> Projects
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mt-3 leading-relaxed">
            Full-stack platforms and tools designed to solve real operational bottlenecks with scalable data architecture and polished user interfaces.
          </p>
        </div>

        {/* 3D Anywhere Door Badge Banner */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shrink-0 border-2 border-pink-300 shadow-md hidden sm:block">
          <Image
            src="/images/anywhere_door.jpg"
            alt="3D Anywhere Door Dokodemo Door"
            fill
            sizes="128px"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-2">
            <span className="text-[10px] font-bold text-pink-300 uppercase tracking-widest">
              Anywhere Door
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                filter === cat
                  ? "bg-sky-600 text-white shadow-sky-500/20"
                  : "bg-white border border-sky-200 text-slate-700 hover:text-sky-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-sky-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Clean Projects Grid */}
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
              className="group rounded-3xl bg-white border border-sky-200 hover:border-sky-400 overflow-hidden flex flex-col h-full cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => handleOpenModal(project)}
            >
              {/* Card Header Bar */}
              <div className="p-6 sm:p-8 border-b border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50/40 flex items-start justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white border border-sky-300 text-sky-700 text-xs font-bold uppercase tracking-wider inline-block mb-3 shadow-sm">
                    🚪 {project.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-title text-slate-900 group-hover:text-sky-600 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="p-2.5 rounded-2xl bg-white border-2 border-sky-200 text-sky-500 group-hover:text-sky-600 group-hover:border-sky-400 transition-all shadow-sm shrink-0">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                  {project.shortDesc}
                </p>

                {/* Impact Highlight */}
                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-800 mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-semibold">
                    {project.id === "intervuex"
                      ? "Cuts manual interview coordination by ~60%"
                      : "Reduces manual feedback processing by ~80%"}
                  </span>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center flex-wrap gap-2 pt-4 border-t border-slate-100">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 text-slate-600 hover:text-sky-600 transition-all"
                    title="GitHub Repository"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                  {project.liveUrl && project.liveUrl !== project.githubUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live App</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-1.5 rounded-xl bg-pink-50 border border-pink-200 hover:bg-pink-100 text-pink-700 text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <span>🚪</span>
                      <span>UI Demo</span>
                    </a>
                  )}

                  <span className="text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 ml-auto">
                    <span>Details</span>
                    <span>→</span>
                  </span>
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
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white border border-sky-300 p-6 sm:p-10 relative scrollbar-none shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Badge */}
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-title text-slate-900">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Grid: Overview & Meta */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Project Overview
                  </h4>
                  <p className="text-slate-700 text-base leading-relaxed mb-6">
                    {selectedProject.longDesc}
                  </p>

                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Core Capabilities
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base">
                        <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-1" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar details */}
                <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-100 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-white border border-sky-200 text-xs font-medium text-slate-700 shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white border border-slate-300 hover:border-sky-500 font-bold text-xs uppercase tracking-wider text-slate-800 transition-all shadow-sm"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>View GitHub Code</span>
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md shadow-sky-500/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch Live App</span>
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-400 font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md shadow-pink-400/20"
                      >
                        <span>🚪</span>
                        <span>UI Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Challenges, Business Impact, Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2 font-title">
                    <Flame className="w-4 h-4" />
                    <span>Challenges</span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider mb-2 font-title">
                    <Target className="w-4 h-4" />
                    <span>Business Impact</span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2 font-title">
                    <Trophy className="w-4 h-4" />
                    <span>Lessons Learned</span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
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
