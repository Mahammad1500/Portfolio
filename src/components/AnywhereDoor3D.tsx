"use client";

import { useState } from "react";
import { sounds } from "@/lib/sound";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

interface AnywhereDoorProps {
  onTravelProjects?: () => void;
}

export default function AnywhereDoor3D({ onTravelProjects }: AnywhereDoorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDoor = () => {
    sounds.playDoorSwoosh();
    setIsOpen(!isOpen);
  };

  const handleTravel = (target: "projects" | "resume") => {
    sounds.playChime();
    if (target === "projects") {
      if (onTravelProjects) {
        onTravelProjects();
      } else {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (target === "resume") {
      window.open(PERSONAL_INFO.resumeLink, "_blank");
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Anime Title Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        <span>どこでもドア • Anywhere Door</span>
      </div>

      {/* 3D Door Construction Container */}
      <div
        className="relative w-[220px] h-[340px] sm:w-[260px] sm:h-[390px] cursor-pointer select-none"
        onClick={toggleDoor}
        title="Click anywhere on the door to open the warp portal!"
      >
        {/* Outer Frame (Dokodemo Door Magenta Arch) */}
        <div className="absolute inset-0 rounded-t-2xl border-[10px] sm:border-[12px] border-[#f43f5e] bg-slate-950 shadow-[0_0_35px_rgba(244,63,94,0.35)] overflow-hidden">
          {/* Inside Portal (Cosmic space warp visible when door opens) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#0b192f] to-[#0284c7] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
            {/* Swirling starry warp particles */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/20 via-pink-500/15 to-transparent animate-pulse" />
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white animate-ping" />
            <div className="absolute bottom-10 right-6 w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping delay-300" />
            <div className="absolute top-1/2 left-3 w-1.5 h-1.5 rounded-full bg-pink-300 animate-ping delay-700" />

            {/* Portal destination message */}
            <div className="relative z-10 space-y-3">
              <span className="text-3xl">🌌</span>
              <p className="text-xs font-bold text-white tracking-wider uppercase">
                Portal Connected!
              </p>
              <p className="text-[11px] text-pink-200/90 leading-tight">
                Where will you explore next?
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTravel("projects");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Teleport to Projects</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTravel("resume");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open Resume 📄</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Door Leaf (Swings open on Y-axis with 3D perspective) */}
          <div
            className={`absolute inset-0 origin-left bg-gradient-to-tr from-[#e11d48] via-[#f43f5e] to-[#fb7185] border-r-2 border-[#be123c] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isOpen ? "[transform:perspective(1200px)_rotateY(-110deg)]" : "[transform:perspective(1200px)_rotateY(0deg)]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Door Panel Bevel Detailing */}
            <div className="absolute inset-4 sm:inset-5 border-2 border-pink-300/40 rounded-t-lg flex flex-col justify-between p-3">
              {/* Upper inset square */}
              <div className="h-1/3 border border-pink-400/50 rounded-sm bg-pink-600/20 shadow-inner" />
              {/* Lower inset square */}
              <div className="h-1/2 border border-pink-400/50 rounded-sm bg-pink-600/20 shadow-inner" />
            </div>

            {/* Golden Brass Door Knob */}
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-yellow-100 shadow-md border border-amber-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-800/60" />
              </div>
            </div>

            {/* Japanese Text on Door */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-pink-200/80 uppercase">
                どこでもドア
              </span>
            </div>
          </div>
        </div>

        {/* Door Ground Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-pink-500/20 blur-md rounded-full pointer-events-none" />
      </div>

      {/* Interactive Helper Button */}
      <button
        onClick={toggleDoor}
        className="mt-5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-semibold hover:bg-pink-500/25 transition-all cursor-pointer"
      >
        <span>{isOpen ? "🚪 Click to Close Door" : "🚪 Click to Open Anywhere Door"}</span>
      </button>
    </div>
  );
}
