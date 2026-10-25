"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ArrowRight, X, ExternalLink, CheckCircle2 } from "lucide-react";
import { sounds } from "@/lib/sound";
import confetti from "canvas-confetti";

interface GadgetItem {
  id: string;
  name: string;
  japanese: string;
  category: string;
  color: string;
  borderColor: string;
  accentBg: string;
  description: string;
  engineeringLore: string;
  techStack: string[];
  specs: { label: string; value: string }[];
  iconSvg: React.ReactNode;
}

const GADGETS_DATA: GadgetItem[] = [
  {
    id: "takecopter",
    name: "Take-Copter",
    japanese: "竹コプター (Take-Koputā)",
    category: "Distributed Scaling & Concurrency",
    color: "#0284c7",
    borderColor: "border-sky-300",
    accentBg: "bg-sky-50",
    description: "The quintessential aerial navigation gadget. Attach to any node to grant effortless flight across network boundaries.",
    engineeringLore: "Represents high-throughput concurrent goroutines in Go, non-blocking asynchronous event loops, and effortless horizontal auto-scaling without resource contention.",
    techStack: ["Go (Goroutines)", "TypeScript", "Concurrency", "High Throughput"],
    specs: [
      { label: "Max Speed", value: "80 km/h (100k RPS)" },
      { label: "Energy Source", value: "Sub-atomic Battery" },
      { label: "Engineering Role", value: "Backend Microservices" },
    ],
    iconSvg: (
      <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 drop-shadow-md">
        <ellipse cx="40" cy="72" rx="14" ry="5" fill="#f59e0b" opacity="0.9" />
        <rect x="37" y="38" width="6" height="34" rx="3" fill="#94a3b8" />
        <circle cx="40" cy="36" r="8" fill="#f59e0b" />
        <ellipse cx="40" cy="34" rx="38" ry="7" fill="#38bdf8" opacity="0.85" />
        <ellipse cx="40" cy="34" rx="7" ry="38" fill="#38bdf8" opacity="0.65" />
        <circle cx="40" cy="34" r="4" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    id: "anywheredoor",
    name: "Anywhere Door",
    japanese: "どこでもドア (Dokodemo Doa)",
    category: "Zero-Latency Routing & Gateway",
    color: "#db2777",
    borderColor: "border-pink-300",
    accentBg: "bg-pink-50",
    description: "Step through the pink doorway to instantaneously travel anywhere up to 10 light-years in the universe.",
    engineeringLore: "Represents ultra-low-latency API gateways, modern edge routing, and clean GraphQL/REST reverse proxy routing delivering instantaneous payloads anywhere globally.",
    techStack: ["REST APIs", "Reverse Proxies", "Next.js Routing", "Edge Computing"],
    specs: [
      { label: "Range", value: "10 Light Years" },
      { label: "Routing Latency", value: "< 2 ms" },
      { label: "Engineering Role", value: "API Architecture" },
    ],
    iconSvg: (
      <svg viewBox="0 0 64 88" fill="none" className="w-14 h-20 drop-shadow-md">
        <rect x="2" y="2" width="60" height="84" rx="7" fill="#ec4899" stroke="#be185d" strokeWidth="3" />
        <rect x="8" y="8" width="48" height="72" rx="5" fill="#f472b6" />
        <circle cx="50" cy="44" r="5" fill="#f59e0b" />
        <circle cx="49" cy="43" r="2" fill="white" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "memorybread",
    name: "Memory Bread",
    japanese: "アンキパン (Anki-pan)",
    category: "Algorithmic Retention & Data Structures",
    color: "#d97706",
    borderColor: "border-amber-300",
    accentBg: "bg-amber-50",
    description: "Press bread onto textbook pages or code, eat the slice, and memorize every theorem, data structure, and system call permanently.",
    engineeringLore: "Represents deep foundational mastery of Data Structures & Algorithms (500+ LeetCode problems solved), operating systems, and permanent retention of system design principles.",
    techStack: ["Algorithms & DSA", "System Design", "Operating Systems", "Memory Retention"],
    specs: [
      { label: "Storage", value: "Infinite Context Window" },
      { label: "Retention", value: "100% Deterministic" },
      { label: "Engineering Role", value: "Problem Solving" },
    ],
    iconSvg: (
      <svg viewBox="0 0 72 72" fill="none" className="w-16 h-16 drop-shadow-md">
        <rect x="8" y="10" width="56" height="52" rx="10" fill="#d97706" stroke="#b45309" strokeWidth="2.5" />
        <rect x="13" y="15" width="46" height="42" rx="7" fill="#fef3c7" />
        <text x="18" y="32" fontSize="10" fontWeight="bold" fill="#92400e" fontFamily="monospace">O(1)</text>
        <text x="18" y="48" fontSize="9" fontWeight="bold" fill="#b45309" fontFamily="monospace">Tree/Graph</text>
      </svg>
    ),
  },
  {
    id: "aircannon",
    name: "Air Cannon",
    japanese: "空気砲 (Kūkihō)",
    category: "High-Velocity Packet Transmission",
    color: "#475569",
    borderColor: "border-slate-300",
    accentBg: "bg-slate-50",
    description: "Slip over hand and shout 'BANG!' to unleash a blast of compressed air powerful enough to blast obstacles away.",
    engineeringLore: "Represents high-velocity streaming architectures, low-latency WebSocket / gRPC communication pipelines, and rapid real-time data ingestion.",
    techStack: ["WebSockets", "gRPC", "Event Streaming", "Low Latency"],
    specs: [
      { label: "Payload Velocity", value: "Mach 3 Blast" },
      { label: "Trigger Mechanism", value: "Vocal Acoustic Trigger" },
      { label: "Engineering Role", value: "Event Pipelines" },
    ],
    iconSvg: (
      <svg viewBox="0 0 72 60" fill="none" className="w-16 h-14 drop-shadow-md">
        <ellipse cx="56" cy="30" rx="11" ry="22" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
        <path d="M16 12 L56 8 L56 52 L16 48 Z" fill="#475569" stroke="#334155" strokeWidth="2" />
        <ellipse cx="16" cy="30" rx="8" ry="18" fill="#ef4444" />
        <ellipse cx="16" cy="30" rx="4.5" ry="10" fill="#7f1d1d" />
        <rect x="32" y="5" width="8" height="5" rx="1.5" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    id: "timemachine",
    name: "Time Machine",
    japanese: "タイムマシン (Taimu Mashin)",
    category: "Deterministic State & Temporal Debugging",
    color: "#7c3aed",
    borderColor: "border-purple-300",
    accentBg: "bg-purple-50",
    description: "Located inside the desk drawer of Nobita's room. Navigates the fourth-dimensional space-time continuum forward and backward.",
    engineeringLore: "Represents distributed event-sourcing, immutable Git audit trails, deterministic replay testing, and time-travel debugging across production pipelines.",
    techStack: ["Event Sourcing", "Git Architecture", "Audit Logs", "Deterministic State"],
    specs: [
      { label: "Temporal Span", value: "Any Era in Time" },
      { label: "Entrance", value: "Study Desk Drawer" },
      { label: "Engineering Role", value: "System Traceability" },
    ],
    iconSvg: (
      <svg viewBox="0 0 72 60" fill="none" className="w-16 h-14 drop-shadow-md">
        <ellipse cx="36" cy="46" rx="32" ry="10" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2" />
        <rect x="18" y="22" width="36" height="20" rx="4" fill="#c4b5fd" />
        <line x1="24" y1="22" x2="20" y2="10" stroke="#6d28d9" strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="10" r="3" fill="#f59e0b" />
        <line x1="48" y1="22" x2="52" y2="10" stroke="#6d28d9" strokeWidth="3" strokeLinecap="round" />
        <circle cx="52" cy="10" r="3" fill="#ef4444" />
      </svg>
    ),
  },
  {
    id: "smalllight",
    name: "Small Light / Big Light",
    japanese: "スモールライト (Sumōru Raito)",
    category: "Memory Footprint & Binary Optimization",
    color: "#e11d48",
    borderColor: "border-rose-300",
    accentBg: "bg-rose-50",
    description: "A handheld ray gun that shrinks or enlarges objects instantly without altering their internal structural integrity.",
    engineeringLore: "Represents binary payload compression, Protobuf serialization, optimized database indexing, and scaling throughput while minimizing memory footprints.",
    techStack: ["Protobuf", "Database Indexing", "Memory Optimization", "Cache Tuning"],
    specs: [
      { label: "Scale Factor", value: "1:1000 Scaling" },
      { label: "Invert Function", value: "Big Light Reverse Beam" },
      { label: "Engineering Role", value: "Performance Tuning" },
    ],
    iconSvg: (
      <svg viewBox="0 0 72 60" fill="none" className="w-16 h-14 drop-shadow-md">
        <ellipse cx="52" cy="30" rx="6" ry="16" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <path d="M22 18 L52 14 L52 46 L22 42 Z" fill="#ef4444" />
        <rect x="8" y="24" width="14" height="12" rx="2" fill="#38bdf8" />
        <polygon points="52,18 68,8 68,52 52,42" fill="#fde68a" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "konjac",
    name: "Translation Konjac",
    japanese: "ほんやくコンニャク (Honyaku Konnyaku)",
    category: "Polyglot Systems & Multi-Language Mastery",
    color: "#059669",
    borderColor: "border-emerald-300",
    accentBg: "bg-emerald-50",
    description: "Eat a piece of this translucent jelly cake to speak and understand any language across galaxies, written or spoken.",
    engineeringLore: "Represents polyglot software engineering: fluently writing production services across Go, TypeScript, Python, Ruby on Rails, C++, and SQL without language friction.",
    techStack: ["Go", "TypeScript", "Python", "Ruby on Rails", "C++", "SQL"],
    specs: [
      { label: "Languages", value: "100% Universal" },
      { label: "Form", value: "Edible Konjac Jelly" },
      { label: "Engineering Role", value: "Polyglot Development" },
    ],
    iconSvg: (
      <svg viewBox="0 0 72 60" fill="none" className="w-16 h-14 drop-shadow-md">
        <rect x="12" y="12" width="48" height="36" rx="8" fill="#a7f3d0" stroke="#059669" strokeWidth="2.5" />
        <rect x="18" y="18" width="36" height="24" rx="5" fill="#6ee7b7" opacity="0.7" />
        <circle cx="26" cy="26" r="2" fill="#047857" opacity="0.4" />
        <circle cx="44" cy="34" r="2.5" fill="#047857" opacity="0.4" />
        <circle cx="34" cy="30" r="1.5" fill="#047857" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "passloop",
    name: "Pass Loop",
    japanese: "通りぬけフープ (Tōrinuke Hūpu)",
    category: "Microservice Decoupling & Architecture",
    color: "#ea580c",
    borderColor: "border-orange-300",
    accentBg: "bg-orange-50",
    description: "Stick this thin hoop against any wall or solid obstacle to open an immediate hole that lets you pass straight through.",
    engineeringLore: "Represents cleanly decoupling rigid monolithic architectures, bypassing cumbersome dependencies, and creating seamless bridges between isolated services.",
    techStack: ["Microservices", "Decoupling", "Clean Architecture", "API Bridges"],
    specs: [
      { label: "Thickness", value: "Zero Dimensional" },
      { label: "Permeability", value: "Any Solid Structure" },
      { label: "Engineering Role", value: "Modular Architecture" },
    ],
    iconSvg: (
      <svg viewBox="0 0 72 64" fill="none" className="w-16 h-14 drop-shadow-md">
        <ellipse cx="36" cy="32" rx="30" ry="24" fill="#fed7aa" stroke="#ea580c" strokeWidth="5" />
        <ellipse cx="36" cy="32" rx="22" ry="17" fill="#0284c7" opacity="0.8" />
        <ellipse cx="36" cy="32" rx="16" ry="12" fill="#0369a1" opacity="0.9" />
      </svg>
    ),
  },
];

export default function Gadgets() {
  const [selectedGadget, setSelectedGadget] = useState<GadgetItem | null>(null);

  const handleActivate = (gadget: GadgetItem) => {
    sounds.playGadgetPop();
    setSelectedGadget(gadget);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#0284c7", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6"],
    });
  };

  return (
    <section id="gadgets" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-300 text-sky-800 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Secret 4D Arsenal • Top Doraemon Gadgets</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-slate-900">
            Legendary Gadgets of the <span className="text-sky-600">22nd Century</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
            Inspired by Doraemon&apos;s four-dimensional pocket — each secret gadget mapped to real-world software engineering depth, distributed systems, and low-latency microservices.
          </p>
        </div>

        {/* 3D Doraemon Gadgets Showcase Visual */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shrink-0 border-2 border-sky-300 shadow-md hidden sm:block bg-sky-100">
          <Image
            src="/images/doraemon_gadgets.jpg"
            alt="Doraemon Secret Gadget Museum"
            fill
            sizes="128px"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-2">
            <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest">
              Gadget Museum
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 8 Iconic Gadgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {GADGETS_DATA.map((gadget, index) => (
          <motion.div
            key={gadget.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => handleActivate(gadget)}
            className="group cursor-pointer p-6 rounded-3xl bg-white/85 border border-sky-200 hover:border-sky-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-sky-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

            <div>
              {/* Gadget Graphic Display */}
              <div className="w-full h-28 flex items-center justify-center rounded-2xl bg-gradient-to-b from-sky-50/50 to-white border border-sky-100 mb-4 group-hover:scale-105 transition-transform duration-300">
                {gadget.iconSvg}
              </div>

              {/* Japanese & English Name */}
              <div className="mb-2">
                <span className="text-[11px] font-bold text-sky-600 font-mono block">
                  {gadget.japanese}
                </span>
                <h3 className="text-lg font-bold font-title text-slate-900 group-hover:text-sky-700 transition-colors">
                  {gadget.name}
                </h3>
              </div>

              {/* Category Pill */}
              <div className="mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                  {gadget.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {gadget.description}
              </p>
            </div>

            {/* Bottom Action Row */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-sky-600 transition-colors flex items-center gap-1">
                <span>Inspect Specs</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-sm">
                <Zap className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gadget Detail Modal */}
      <AnimatePresence>
        {selectedGadget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-sky-300 shadow-2xl max-w-lg w-full p-7 sm:p-8 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedGadget(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 shadow-sm shrink-0">
                  {selectedGadget.iconSvg}
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-600 font-mono block">
                    {selectedGadget.japanese}
                  </span>
                  <h3 className="text-2xl font-black font-title text-slate-900">
                    {selectedGadget.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {selectedGadget.category}
                  </span>
                </div>
              </div>

              {/* Lore & Engineering Role */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Gadget Function:
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedGadget.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Software Engineering Analog:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {selectedGadget.engineeringLore}
                  </p>
                </div>

                {/* Specs Table */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {selectedGadget.specs.map((spec) => (
                    <div key={spec.label} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">
                        {spec.label}
                      </span>
                      <span className="text-xs font-bold text-slate-900 mt-0.5 block truncate">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Applied Technologies */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Associated Engineering Tools:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedGadget.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-sky-100/70 border border-sky-200 text-xs font-semibold text-sky-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Action */}
              <button
                onClick={() => setSelectedGadget(null)}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-500/20 cursor-pointer"
              >
                Close Gadget Transmission
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
