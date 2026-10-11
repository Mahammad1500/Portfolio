"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Database, Sparkles, CheckCircle2, ChevronRight, Bell } from "lucide-react";
import { sounds } from "@/lib/sound";

export default function About() {
  const [activeTab, setActiveTab] = useState(0);

  const pocketGadgets = [
    {
      id: "backend",
      icon: <Database className="w-6 h-6 text-sky-400" />,
      gadgetJapanese: "高スケーラビリティ・コア",
      gadgetTitle: "High-Throughput Backend Reactor",
      techBadge: "Go • TypeScript • REST APIs • Financial Systems",
      highlight: "CoinDCX FRP Engineering (07/2026 — Present)",
      desc: "Working with the Finance, Risk & Portfolio (FRP) engineering team to build mission-critical backend services in Go and TypeScript. Architecting resilient REST APIs and core business logic for financial workflows where scalability, fault tolerance, and deterministic performance are paramount.",
      features: [
        "Concurrent backend services engineered in Go and TypeScript.",
        "Deterministic financial and crypto transaction platform logic.",
        "Production-grade API contracts, error boundaries, and reliability.",
      ],
    },
    {
      id: "ml",
      icon: <Brain className="w-6 h-6 text-amber-400" />,
      gadgetJapanese: "予測機械学習エンジン",
      gadgetTitle: "Predictive ML Escalation Engine",
      techBadge: "Python • XGBoost • Large-Scale Datasets • Causal Inference",
      highlight: "Flipkart SDE Intern '26 (01/2026 — 06/2026)",
      desc: "Engineered two production-grade XGBoost ML models to forecast customer escalations before and after agent intervention. Handled severe dataset imbalance across 2.8Cr+ conversation records and 70K+ escalations, deploying real-time risk alerts to customer care interfaces.",
      features: [
        "Trained models across 2.8Cr+ conversation rows with custom threshold tuning.",
        "Implemented causal modeling revealing 350+ bps controllable optimization.",
        "End-to-end pipeline: feature engineering, imbalance handling, real-time inference.",
      ],
    },
    {
      id: "fullstack",
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      gadgetJapanese: "フルスタック・ポータル",
      gadgetTitle: "Interactive Full-Stack Architecture",
      techBadge: "React • Next.js • Express • MongoDB • TypeScript",
      highlight: "Production Web Applications & Systems",
      desc: "Bridging complex system backends with intuitive, responsive interfaces. Passionate about modular software design, type safety, accessible design systems, and crafting memorable digital experiences that solve real user pain points.",
      features: [
        "Built Intervuex with role-based workspaces cutting coordination effort by 60%.",
        "Developed privacy-preserving feedback portals reducing manual paperwork by 80%.",
        "Commitment to clean architecture, fast load times, and intuitive interactions.",
      ],
    },
  ];

  const handleTabChange = (index: number) => {
    sounds.playGadgetPop();
    setActiveTab(index);
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16">
      {/* Anime Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-400/40 flex items-center justify-center">
          <Bell className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span className="text-xs uppercase tracking-widest text-sky-400 font-extrabold">
          四次元ポケット • 01. 4D Pocket Laboratory
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white mb-6">
        Inside the <span className="text-sky-400">4D Pocket</span>: Engineering Depth
      </h2>

      <p className="text-slate-400 text-base md:text-lg max-w-3xl mb-12 leading-relaxed">
        Just like Doraemon pulls extraordinary inventions from his 4D pocket to solve impossible problems, I leverage computer science fundamentals, backend distributed systems, and machine learning models to build reliable products.
      </p>

      {/* Grid: 4D Pocket Interactive Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Pocket Selector (Visual 4D Pocket Pouch) */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Semicircular 4D Pocket Pouch Graphic Container */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 relative overflow-hidden shadow-2xl shadow-sky-500/10 mb-6">
            {/* Pocket Top White Lip */}
            <div className="w-full h-8 bg-white/95 rounded-t-xl border border-sky-200 flex items-center justify-center shadow-md mb-4">
              <span className="text-[11px] font-black text-sky-950 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>四次元ポケット • Secret Gadget Selector</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-6 font-medium">
              Select a gadget chamber to inspect architectural details, production metrics, and domain experience:
            </p>

            {/* Gadget Chamber Selector Buttons */}
            <div className="space-y-3">
              {pocketGadgets.map((gadget, idx) => (
                <button
                  key={gadget.id}
                  onClick={() => handleTabChange(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer border ${
                    activeTab === idx
                      ? "bg-sky-500/15 border-sky-400 text-white shadow-lg shadow-sky-500/10 scale-[1.02]"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors ${
                        activeTab === idx
                          ? "bg-sky-500/20 border-sky-400 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-white"
                      }`}
                    >
                      {gadget.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400/80 block">
                        {gadget.gadgetJapanese}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-sky-300 transition-colors">
                        {gadget.gadgetTitle}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeTab === idx ? "translate-x-1 text-sky-400" : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Pocket Bell Badge Accent */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span>🔔</span> Golden Collar Bell Active
              </span>
              <span>IIIT Lucknow CSE &apos;26</span>
            </div>
          </div>
        </div>

        {/* Right Column: Revealed Gadget Blueprint & Case Study */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 relative overflow-hidden shadow-xl"
            >
              {/* Background blueprint grid watermark */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

              {/* Tag & Title */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                  {pocketGadgets[activeTab].highlight}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {pocketGadgets[activeTab].techBadge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-title text-white mb-4">
                {pocketGadgets[activeTab].gadgetTitle}
              </h3>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                {pocketGadgets[activeTab].desc}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3.5 mb-8">
                <h5 className="text-xs uppercase tracking-widest font-extrabold text-sky-400">
                  Verified Engineering Highlights:
                </h5>
                {pocketGadgets[activeTab].features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Footer narrative */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <strong className="text-white">Philosophy:</strong> Writing clean, maintainable, and battle-tested code is like inventing a gadget that works flawlessly every single time—no magical malfunctions.
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
