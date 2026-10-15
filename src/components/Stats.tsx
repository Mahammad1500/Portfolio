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
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
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
    <div ref={containerRef} className="flex flex-col items-center justify-center p-5 text-center">
      <h3 className="text-3xl sm:text-5xl font-black font-title tracking-tight mb-1 flex items-center justify-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300 font-extrabold">
          {count}
        </span>
        <span className="text-amber-400 font-bold ml-0.5 text-2xl sm:text-3xl">{suffix}</span>
      </h3>

      <p className="text-slate-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-12 px-6 md:px-12 bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
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
