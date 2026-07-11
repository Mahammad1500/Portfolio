"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
}

function StatCounter({ value, suffix, label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    // Calculate speed based on the size of the number
    const duration = 1500; // 1.5s animation duration
    const end = value;
    const isFloat = !Number.isInteger(end);
    
    // For smaller integers like 1, we want fewer steps, for larger like 400 we want more
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentVal = start + easeProgress * (end - start);

      if (isFloat) {
        setCount(parseFloat(currentVal.toFixed(1)));
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
    <div ref={containerRef} className="flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-4xl md:text-6xl font-black font-title text-white tracking-tight mb-2 flex items-center justify-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-extrabold">
          {count}
        </span>
        <span className="text-cyan-400 font-medium ml-0.5">{suffix}</span>
      </h3>
      <p className="text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 px-6 md:px-12 bg-slate-950/40 border-y border-slate-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-between pointer-events-none opacity-20">
        <div className="w-[1px] h-full bg-gradient-to-b from-slate-800 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-slate-800 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-slate-800 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-slate-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-slate-900">
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
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
