"use client";

import { motion } from "framer-motion";

export default function AnimeSkyEnvironment() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
      {/* 1. Deep Anime Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070f2b] via-[#0b192f] to-[#040817]" />

      {/* 2. Ethereal atmospheric anime glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-500/10 via-blue-600/5 to-transparent blur-[140px]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-pink-500/8 via-purple-600/5 to-transparent blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-amber-400/5 via-sky-500/5 to-transparent blur-[120px]" />

      {/* 3. Subtle Anime Grid / Blueprint Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />

      {/* 4. Layered Anime Cloud Formations */}
      {/* Cloud 1 (High sky, drifting right) */}
      <motion.div
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-10 opacity-30 blur-[1px]"
      >
        <svg width="280" height="110" viewBox="0 0 280 110" fill="none">
          <path
            d="M50 85 C30 85 10 70 10 50 C10 30 35 25 50 35 C65 10 110 5 130 30 C150 15 190 20 200 45 C225 35 255 55 250 80 C270 85 270 100 250 100 L50 100 Z"
            fill="url(#cloudGrad1)"
          />
          <defs>
            <linearGradient id="cloudGrad1" x1="0" y1="0" x2="280" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="1" stopColor="#818cf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cloud 2 (Mid sky, drifting left) */}
      <motion.div
        animate={{ x: [80, -80, 80] }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-8 opacity-25"
      >
        <svg width="340" height="130" viewBox="0 0 340 130" fill="none">
          <path
            d="M60 100 C30 100 15 80 20 60 C25 40 55 35 70 50 C90 20 150 15 175 45 C200 25 250 30 265 60 C295 50 330 75 320 105 L60 105 Z"
            fill="url(#cloudGrad2)"
          />
          <defs>
            <linearGradient id="cloudGrad2" x1="0" y1="0" x2="340" y2="130" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" stopOpacity="0.25" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 5. Floating Doraemon Gadgets in Atmosphere */}
      {/* Floating Gadget: Memory Bread (Anki-pan) with code formulas */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 6, -4, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-8 sm:left-16 hidden md:flex flex-col items-center p-3 rounded-2xl bg-amber-100/10 border border-amber-300/30 backdrop-blur-md shadow-lg shadow-amber-500/10"
      >
        <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-amber-200/90 to-amber-400/90 border-2 border-amber-600/80 p-2 flex flex-col justify-between shadow-inner">
          <div className="text-[9px] font-black text-amber-950 font-mono tracking-tighter">
            f(n) = O(1)
          </div>
          <div className="text-[8px] font-black text-amber-900 font-mono">
            ∇L(θ) = 0
          </div>
          <div className="text-[8px] font-extrabold text-amber-950 font-mono">
            Go func()
          </div>
        </div>
        <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest mt-1.5">
          暗記パン • Memory Bread
        </span>
      </motion.div>

      {/* Floating Gadget: Take-copter Mini Propeller */}
      <motion.div
        animate={{
          y: [0, 22, -10, 0],
          x: [0, -15, 10, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-16 sm:right-28 hidden lg:flex flex-col items-center p-2.5 rounded-2xl bg-sky-500/10 border border-sky-400/30 backdrop-blur-md shadow-lg shadow-sky-500/10"
      >
        <div className="relative w-14 h-12 flex flex-col items-center justify-center">
          {/* Spinning Propeller blades */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-1.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 rounded-full shadow-md"
          />
          {/* Shaft */}
          <div className="w-1 h-4 bg-slate-300 mt-0.5 rounded-sm" />
          {/* Suction cup */}
          <div className="w-4 h-2 bg-amber-500 rounded-t-full" />
        </div>
        <span className="text-[9px] font-bold text-sky-300 uppercase tracking-widest mt-1">
          タケコプター
        </span>
      </motion.div>

      {/* Floating Gadget: Pass Loop (Tōrinuke Hūpu) */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [15, 25, 15],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-12 hidden md:flex flex-col items-center p-2 rounded-2xl bg-pink-500/10 border border-pink-400/30 backdrop-blur-md"
      >
        <div className="w-14 h-14 rounded-full border-4 border-pink-500/90 shadow-[0_0_15px_rgba(236,72,153,0.5)] flex items-center justify-center bg-slate-950/70">
          <div className="w-8 h-8 rounded-full border border-pink-300/40 border-dashed animate-spin" />
        </div>
        <span className="text-[9px] font-bold text-pink-300 uppercase tracking-widest mt-1">
          通りぬけフープ
        </span>
      </motion.div>

      {/* 6. Twinkling anime stars across atmosphere */}
      <div className="absolute top-1/6 left-1/3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping opacity-60" />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-sky-200 rounded-full animate-pulse opacity-70" />
      <div className="absolute bottom-1/5 left-1/5 w-1.5 h-1.5 bg-pink-200 rounded-full animate-ping delay-500 opacity-60" />
    </div>
  );
}
