"use client";

import { motion } from "framer-motion";

// CSS 3D floating Doraemon gadgets for background
const floatingItems = [
  // Take-copter (bamboo-dragonfly)
  {
    id: "takecopter",
    style: { top: "8%", left: "5%", width: 64, height: 64 },
    delay: 0,
    duration: 7,
    rotate: [-8, 8],
    element: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Suction cup base */}
        <ellipse cx="32" cy="58" rx="10" ry="4" fill="#f59e0b" opacity="0.9"/>
        {/* Shaft */}
        <rect x="30" y="30" width="4" height="28" rx="2" fill="#94a3b8"/>
        {/* Blade hub */}
        <circle cx="32" cy="28" r="5" fill="#f59e0b"/>
        {/* Blades */}
        <ellipse cx="32" cy="28" rx="28" ry="5" fill="#38bdf8" opacity="0.75"/>
        <ellipse cx="32" cy="28" rx="5" ry="28" fill="#38bdf8" opacity="0.6"/>
      </svg>
    ),
  },
  // Small bell
  {
    id: "bell",
    style: { top: "15%", right: "8%", width: 48, height: 48 },
    delay: 1.2,
    duration: 5.5,
    rotate: [-12, 12],
    element: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="34" rx="18" ry="10" fill="#f59e0b"/>
        <ellipse cx="24" cy="20" rx="14" ry="18" fill="#fbbf24"/>
        <circle cx="24" cy="6" r="5" fill="#d97706"/>
        <ellipse cx="24" cy="38" rx="5" ry="3" fill="#d97706"/>
        {/* Line across bell */}
        <ellipse cx="24" cy="28" rx="14" ry="2.5" fill="#92400e" opacity="0.4"/>
        {/* Glint */}
        <ellipse cx="17" cy="16" rx="3" ry="4" fill="white" opacity="0.4"/>
      </svg>
    ),
  },
  // Anywhere Door (mini)
  {
    id: "door",
    style: { bottom: "25%", left: "3%", width: 52, height: 80 },
    delay: 2,
    duration: 8,
    rotate: [-4, 4],
    element: (
      <svg viewBox="0 0 52 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Frame */}
        <rect x="2" y="2" width="48" height="76" rx="6" fill="#ec4899" stroke="#be185d" strokeWidth="3"/>
        {/* Door surface */}
        <rect x="7" y="7" width="38" height="66" rx="4" fill="url(#doorGrad)"/>
        {/* Knob */}
        <circle cx="38" cy="40" r="4" fill="#f59e0b"/>
        <circle cx="37.5" cy="39.5" r="1.5" fill="white" opacity="0.6"/>
        <defs>
          <linearGradient id="doorGrad" x1="7" y1="7" x2="45" y2="73">
            <stop stopColor="#f472b6" stopOpacity="0.9"/>
            <stop offset="1" stopColor="#a21caf" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  // Small Doraemon paw / hand
  {
    id: "paw",
    style: { top: "45%", right: "4%", width: 44, height: 44 },
    delay: 0.8,
    duration: 6,
    rotate: [-15, 15],
    element: (
      <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="20" fill="white" stroke="rgba(14,165,233,0.3)" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="14" fill="#f0fafa"/>
        {/* fingers */}
        <circle cx="12" cy="10" r="5" fill="white" stroke="rgba(14,165,233,0.2)" strokeWidth="1"/>
        <circle cx="22" cy="7" r="5" fill="white" stroke="rgba(14,165,233,0.2)" strokeWidth="1"/>
        <circle cx="32" cy="10" r="5" fill="white" stroke="rgba(14,165,233,0.2)" strokeWidth="1"/>
      </svg>
    ),
  },
  // Mini bamboo dragonfly 2
  {
    id: "star",
    style: { top: "65%", left: "8%", width: 40, height: 40 },
    delay: 3,
    duration: 9,
    rotate: [0, 360],
    element: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,2 24,14 38,14 27,22 31,36 20,28 9,36 13,22 2,14 16,14" fill="#fbbf24" opacity="0.9"/>
      </svg>
    ),
  },
  // 4D Pocket (rounded square)
  {
    id: "pocket",
    style: { bottom: "15%", right: "6%", width: 54, height: 40 },
    delay: 1.5,
    duration: 7.5,
    rotate: [-6, 6],
    element: (
      <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="8" width="50" height="30" rx="8" fill="white" stroke="rgba(14,165,233,0.35)" strokeWidth="2"/>
        {/* Pocket opening arc */}
        <path d="M8 8 Q27 -2 46 8" stroke="rgba(14,165,233,0.4)" strokeWidth="2" fill="none"/>
        <path d="M10 12 Q27 4 44 12" stroke="rgba(14,165,233,0.25)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  // Cloud 1
  {
    id: "cloud1",
    style: { top: "30%", left: "12%", width: 120, height: 55, opacity: 0.55 },
    delay: 0,
    duration: 18,
    translateX: [-40, 40],
    element: (
      <svg viewBox="0 0 120 55" fill="none">
        <path d="M25 42 C12 42 4 34 4 24 C4 14 16 12 24 18 C30 5 55 3 65 16 C75 8 98 12 100 26 C112 22 120 34 116 44 C120 46 118 52 110 52 L25 52 Z" fill="white" opacity="0.85"/>
      </svg>
    ),
  },
  // Cloud 2
  {
    id: "cloud2",
    style: { top: "8%", right: "18%", width: 160, height: 65, opacity: 0.45 },
    delay: 2,
    duration: 24,
    translateX: [30, -30],
    element: (
      <svg viewBox="0 0 160 65" fill="none">
        <path d="M30 52 C14 52 4 40 6 28 C8 16 24 14 36 24 C46 6 82 4 96 22 C110 10 144 16 148 36 C160 30 164 50 154 58 L30 58 Z" fill="white" opacity="0.8"/>
      </svg>
    ),
  },
  // Cloud 3
  {
    id: "cloud3",
    style: { bottom: "8%", left: "25%", width: 140, height: 58, opacity: 0.4 },
    delay: 5,
    duration: 22,
    translateX: [-25, 25],
    element: (
      <svg viewBox="0 0 140 58" fill="none">
        <path d="M22 46 C10 46 4 36 5 26 C6 16 20 14 30 20 C38 5 68 3 80 18 C92 8 120 13 124 30 C136 25 140 40 132 48 L22 48 Z" fill="white" opacity="0.85"/>
      </svg>
    ),
  },
];

export default function AnimeSkyEnvironment() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
      {/* 1. Doraemon Sky Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a8e0f5] via-[#c8edf9] to-[#d8f3fc]" />

      {/* 2. Sun glow top right */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-yellow-200/50 via-amber-100/30 to-transparent blur-[100px]" />

      {/* 3. Doraemon blue ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-400/15 via-blue-300/10 to-transparent blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-cyan-300/20 via-sky-200/10 to-transparent blur-[100px]" />

      {/* 4. Subtle light grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.04)_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      {/* 5. Floating Doraemon gadgets & clouds */}
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={item.style as React.CSSProperties}
          animate={
            item.translateX
              ? { x: item.translateX, y: [0, -12, 0] }
              : item.rotate && typeof item.rotate[0] === "number" && item.rotate[1] === 360
              ? { rotate: [0, 360], y: [0, -10, 0] }
              : { rotate: item.rotate, y: [0, -10, 0] }
          }
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {item.element}
        </motion.div>
      ))}

      {/* 6. Sparkle / star twinkles */}
      {[
        { top: "18%", left: "20%", size: 6, color: "#fbbf24", delay: 0 },
        { top: "50%", right: "15%", size: 5, color: "#38bdf8", delay: 1.5 },
        { top: "75%", left: "40%", size: 4, color: "#f472b6", delay: 3 },
        { top: "35%", right: "30%", size: 5, color: "#fbbf24", delay: 0.8 },
        { top: "12%", left: "55%", size: 4, color: "#a78bfa", delay: 2 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            background: s.color,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
