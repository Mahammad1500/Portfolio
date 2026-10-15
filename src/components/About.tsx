"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Brain, Cpu, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { sounds } from "@/lib/sound";

export default function About() {
  const [activeTab, setActiveTab] = useState(0);

  const pocketGadgets = [
    {
      id: "backend",
      icon: <Database className="w-5 h-5 text-sky-400" />,
      title: "Backend & Distributed Systems",
      badge: "CoinDCX FRP Engineering (Go • TypeScript)",
      desc: "Working with the Finance, Risk & Portfolio (FRP) engineering team at CoinDCX to build backend platform services in Go and TypeScript. Architecting resilient REST APIs and platform business logic for core crypto workflows where scalability, fault tolerance, and deterministic performance are paramount.",
      points: [
        "Concurrent, low-latency microservices engineered in Go and TypeScript.",
        "Deterministic financial and crypto transaction platform logic.",
        "Production-grade API contracts, error boundaries, and high reliability.",
      ],
    },
    {
      id: "ml",
      icon: <Brain className="w-5 h-5 text-amber-400" />,
      title: "Machine Learning & Causal Inference",
      badge: "Flipkart SDE Intern '26 (Python • XGBoost)",
      desc: "Engineered two end-to-end production XGBoost ML models at Flipkart to forecast customer social media escalations before and after customer care agent intervention, enabling proactive support action.",
      points: [
        "Trained models across 2.8Cr+ conversation rows with custom threshold tuning.",
        "Implemented causal modeling revealing 350+ bps controllable improvement opportunity.",
        "End-to-end pipeline: feature engineering, imbalance handling, and real-time agent alerting.",
      ],
    },
    {
      id: "fullstack",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      title: "Full-Stack System Engineering",
      badge: "Production Web Applications & Platforms",
      desc: "Bridging dependable system backends with intuitive, accessible, and responsive user interfaces. Passionate about modular software design, type safety, and crafting digital tools that eliminate real-world workflow bottlenecks.",
      points: [
        "Architected Intervuex cutting manual panel scheduling coordination by 60%.",
        "Built privacy-focused student feedback platform reducing manual paperwork by 80%.",
        "Commitment to clean code, fast load times, and reliable data modeling.",
      ],
    },
  ];

  const handleTabChange = (index: number) => {
    sounds.playGadgetPop();
    setActiveTab(index);
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>4D Pocket Laboratory • About Me</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-title text-white tracking-tight">
          Engineering Depth & <span className="text-sky-400">Core Pillars</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
          Just like pulling specialized tools from Doraemon&apos;s 4D pocket, I combine backend engineering, machine learning pipelines, and full-stack software development to build dependable products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: 4D Pocket Selector Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            {pocketGadgets.map((gadget, idx) => (
              <button
                key={gadget.id}
                onClick={() => handleTabChange(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer border ${
                  activeTab === idx
                    ? "bg-sky-500/15 border-sky-400/60 text-white shadow-md shadow-sky-500/10"
                    : "bg-slate-950/60 border-transparent text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      activeTab === idx
                        ? "bg-sky-500/20 border-sky-400 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {gadget.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {gadget.title}
                    </h3>
                    <p className="text-xs text-sky-300/80 font-medium">
                      {idx === 0 ? "CoinDCX FRP" : idx === 1 ? "Flipkart ML" : "Web Architecture"}
                    </p>
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

          {/* 3D Memory Bread Feature Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-950 border border-amber-400/25 flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-amber-400/30 shadow-md">
              <Image
                src="/images/memory_bread.jpg"
                alt="3D Memory Bread Anki-pan"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                Secret Gadget: Memory Bread
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Absorbing algorithms, distributed consensus, and machine learning architectures with permanent retention.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Active Pocket Compartment Detail */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-sky-500/25 shadow-xl relative overflow-hidden"
            >
              {/* Top Badge */}
              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                  {pocketGadgets[activeTab].badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-title text-white mb-4">
                {pocketGadgets[activeTab].title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-8">
                {pocketGadgets[activeTab].desc}
              </p>

              {/* Point Checklist */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs uppercase tracking-wider font-bold text-sky-400">
                  Key Technical Achievements:
                </h4>
                {pocketGadgets[activeTab].points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Quote / Philosophy */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white">Engineering Principle:</strong> High reliability isn&apos;t magic—it comes from rigorous edge-case testing, clear API boundaries, and intentional data modeling.
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
