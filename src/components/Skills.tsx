"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Database, Brain, Wrench, Zap, BatteryCharging } from "lucide-react";
import { SKILLS } from "@/lib/data";
import { sounds } from "@/lib/sound";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Programming Languages": <Code className="w-5 h-5 text-sky-400" />,
  "Frameworks & Libraries": <Cpu className="w-5 h-5 text-indigo-400" />,
  "Databases": <Database className="w-5 h-5 text-amber-400" />,
  "Machine Learning & GenAI": <Brain className="w-5 h-5 text-rose-400" />,
  "Tools & Platforms": <Wrench className="w-5 h-5 text-emerald-400" />,
};

const CATEGORY_JAPANESE: Record<string, string> = {
  "Programming Languages": "計算動力源 • 言語",
  "Frameworks & Libraries": "空間構築 • ライブラリ",
  "Databases": "記憶素子 • データベース",
  "Machine Learning & GenAI": "予測知能 • 機械学習",
  "Tools & Platforms": "未来道具 • 開発環境",
};

const SKILL_SYMBOLS: Record<string, string> = {
  "C++": "⚡",
  "Go": "🐹",
  "Java": "☕",
  "Python": "🐍",
  "JavaScript": "📜",
  "TypeScript": "📘",
  "SQL": "🔍",
  "React.js": "⚛️",
  "Next.js": "▲",
  "Redux": "🔄",
  "Node.js": "🟢",
  "Express.js": "🚀",
  "Tailwind CSS": "🎨",
  "MongoDB": "🍃",
  "MySQL": "🗄️",
  "Firebase": "🔥",
  "XGBoost": "🌳",
  "Logistic Regression": "📊",
  "Feature Engineering": "🔧",
  "Causal Modeling": "🔗",
  "GenAI": "🤖",
  "LLM-based Summarization": "📝",
  "Git": "🎯",
  "GitHub": "🐙",
  "Linux": "🐧",
  "VS Code": "💻",
  "GitHub Copilot": "✨",
  "Cursor": "🎯",
  "Windsurf": "🌊",
  "Claude Code": "🤖",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const displayedCategories =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((cat) => cat.title === activeCategory);

  const handleCategoryClick = (title: string) => {
    sounds.playGadgetPop();
    setActiveCategory(title);
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16">
      {/* Anime Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-400/40 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span className="text-xs uppercase tracking-widest text-sky-400 font-extrabold">
          ひみつ道具カタログ • 04. Secret Gadget Arsenal
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white mb-6">
        Technical <span className="text-sky-400">Powercells</span> & Competencies
      </h2>

      <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
        Just as Doraemon organizes his secret gadgets inside the 4D pocket, here is the technical inventory I draw upon to construct robust backends, intelligent machine learning models, and production platforms.
      </p>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategoryClick("All")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeCategory === "All"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          All Gadgets
        </button>
        {SKILLS.map((cat) => (
          <button
            key={cat.title}
            onClick={() => handleCategoryClick(cat.title)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.title
                ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Gadget Arsenal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCategories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 hover:border-sky-400/60 relative overflow-hidden group shadow-xl transition-all duration-300"
          >
            {/* Blueprint Grid Watermark */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

            {/* Header: Japanese Micro-tag & Category */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-sky-400/90 tracking-widest uppercase">
                {CATEGORY_JAPANESE[cat.title] || "秘密道具"}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                <BatteryCharging className="w-3.5 h-3.5" />
                <span>ONLINE</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 group-hover:scale-110 transition-transform">
                {CATEGORY_ICONS[cat.title] || <Code className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-bold font-title text-white">
                {cat.title}
              </h3>
            </div>

            {/* Skills with Power Gauge Level Meters */}
            <div className="space-y-4">
              {cat.items.map((skill) => (
                <div key={skill.name} className="group/item">
                  <div className="flex items-center justify-between mb-1 text-sm font-semibold text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="text-base">{SKILL_SYMBOLS[skill.name] || "•"}</span>
                      <span>{skill.name}</span>
                    </span>
                    <span className="text-xs font-mono text-sky-400 font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Power Level Bar (Doraemon cyan & amber battery gauge) */}
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-amber-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
