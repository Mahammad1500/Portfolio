"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";
import { Sparkles } from "lucide-react";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  japaneseLabel: string;
}

const JAPANESE_STAT_LABELS: Record<string, string> = {
  "Problems Solved": "問題解決数",
  "Projects Built": "開発プロジェクト",
  "Internships": "企業インターン",
  "CGPA": "学業成績評価",
  "Experience": "実務経験期間",
};

function StatCounter({ value, suffix, label, japaneseLabel }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1600;
    const end = value;
    const isFloat = !Number.isInteger(end);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentVal = easeProgress * end;

      if (isFloat) {
        setCount(parseFloat(currentVal.toFixed(2)));
      } else {
        setCount(Math.floor(currentVal));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center p-6 text-center group">
      {/* Anime Japanese Micro-tag */}
      <span className="text-[10px] font-bold tracking-widest text-sky-400/80 uppercase mb-1">
        {japaneseLabel}
      </span>

      {/* Main Counter */}
      <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black font-title tracking-tight mb-1 flex items-center justify-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-amber-300 font-extrabold group-hover:scale-105 transition-transform duration-300">
          {count}
        </span>
        <span className="text-amber-400 font-bold ml-0.5 text-2xl sm:text-4xl">{suffix}</span>
      </h3>

      {/* Label */}
      <p className="text-slate-300 text-xs sm:text-sm font-bold tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 px-6 md:px-12 bg-slate-900/60 border-y border-sky-500/20 overflow-hidden backdrop-blur-md">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[11px] font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>22nd-Century Verification Metrics</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={index === 4 && STATS.length % 2 !== 0 ? "col-span-2 md:col-span-1" : ""}
            >
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                japaneseLabel={JAPANESE_STAT_LABELS[stat.label] || "統計値"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
