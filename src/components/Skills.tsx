"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Database, Brain, Wrench, Sparkles } from "lucide-react";
import { SKILLS } from "@/lib/data";
import { sounds } from "@/lib/sound";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Programming Languages": <Code className="w-5 h-5 text-sky-400" />,
  "Frameworks & Libraries": <Cpu className="w-5 h-5 text-indigo-400" />,
  "Databases": <Database className="w-5 h-5 text-amber-400" />,
  "Machine Learning & GenAI": <Brain className="w-5 h-5 text-rose-400" />,
  "Tools & Platforms": <Wrench className="w-5 h-5 text-emerald-400" />,
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
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Technical Arsenal • Skills</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-white">
          Skills & <span className="text-sky-400">Core Proficiencies</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
          Comprehensive technical stack developed across production internships, academic coursework at IIIT Lucknow, and competitive problem-solving.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategoryClick("All")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeCategory === "All"
              ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          All Skills
        </button>
        {SKILLS.map((cat) => (
          <button
            key={cat.title}
            onClick={() => handleCategoryClick(cat.title)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.title
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedCategories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-6 sm:p-7 rounded-3xl bg-slate-900/85 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-400">
                {CATEGORY_ICONS[cat.title] || <Code className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-bold font-title text-white">
                {cat.title}
              </h3>
            </div>

            {/* Skills with Power Progress Bars */}
            <div className="space-y-4">
              {cat.items.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5 text-xs sm:text-sm font-semibold text-slate-200">
                    <span className="flex items-center gap-2">
                      <span className="text-base">{SKILL_SYMBOLS[skill.name] || "•"}</span>
                      <span>{skill.name}</span>
                    </span>
                    <span className="text-xs font-mono text-sky-400 font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-amber-300"
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
