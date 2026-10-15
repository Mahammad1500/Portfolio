"use client";

import { motion } from "framer-motion";

export default function AnimeSkyEnvironment() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
      {/* 1. Deep Anime Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070f2b] via-[#09153a] to-[#040817]" />

      {/* 2. Ethereal atmospheric anime glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-500/10 via-blue-600/5 to-transparent blur-[140px]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-pink-500/8 via-purple-600/5 to-transparent blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-amber-400/5 via-sky-500/5 to-transparent blur-[120px]" />

      {/* 3. Subtle Anime Grid / Blueprint Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />

      {/* 4. Layered Anime Cloud Formations */}
      {/* Cloud 1 */}
      <motion.div
        animate={{ x: [-80, 80, -80] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-8 opacity-20 blur-[1px]"
      >
        <svg width="280" height="110" viewBox="0 0 280 110" fill="none">
          <path
            d="M50 85 C30 85 10 70 10 50 C10 30 35 25 50 35 C65 10 110 5 130 30 C150 15 190 20 200 45 C225 35 255 55 250 80 C270 85 270 100 250 100 L50 100 Z"
            fill="url(#cloudGrad1)"
          />
          <defs>
            <linearGradient id="cloudGrad1" x1="0" y1="0" x2="280" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="1" stopColor="#818cf8" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cloud 2 */}
      <motion.div
        animate={{ x: [60, -60, 60] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-8 opacity-15"
      >
        <svg width="340" height="130" viewBox="0 0 340 130" fill="none">
          <path
            d="M60 100 C30 100 15 80 20 60 C25 40 55 35 70 50 C90 20 150 15 175 45 C200 25 250 30 265 60 C295 50 330 75 320 105 L60 105 Z"
            fill="url(#cloudGrad2)"
          />
          <defs>
            <linearGradient id="cloudGrad2" x1="0" y1="0" x2="340" y2="130" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" stopOpacity="0.2" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 5. Subtle Twinkling Anime Stars */}
      <div className="absolute top-1/6 left-1/3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping opacity-40" />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-sky-200 rounded-full animate-pulse opacity-50" />
      <div className="absolute bottom-1/5 left-1/5 w-1.5 h-1.5 bg-pink-200 rounded-full animate-ping delay-500 opacity-40" />
    </div>
  );
}
