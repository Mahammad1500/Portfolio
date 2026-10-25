"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Briefcase, ExternalLink, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import { sounds } from "@/lib/sound";
import HeroGadgetUniverse3D from "@/components/HeroGadgetUniverse3D";

// Floating top Doraemon gadget SVGs
const GadgetTakeCopter = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full drop-shadow-lg">
    <ellipse cx="40" cy="72" rx="14" ry="5" fill="#f59e0b" opacity="0.9"/>
    <rect x="37" y="38" width="6" height="34" rx="3" fill="#94a3b8"/>
    <circle cx="40" cy="36" r="8" fill="#f59e0b"/>
    <ellipse cx="40" cy="34" rx="38" ry="7" fill="#38bdf8" opacity="0.8"/>
    <ellipse cx="40" cy="34" rx="7" ry="38" fill="#38bdf8" opacity="0.65"/>
    <circle cx="40" cy="34" r="4" fill="#fbbf24"/>
  </svg>
);

const GadgetAirCannon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-lg">
    <ellipse cx="48" cy="32" rx="10" ry="18" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2.5"/>
    <path d="M14 16 L48 14 L48 50 L14 48 Z" fill="#475569"/>
    <ellipse cx="14" cy="32" rx="7" ry="16" fill="#ef4444"/>
    <ellipse cx="14" cy="32" rx="4" ry="9" fill="#7f1d1d"/>
    <rect x="28" y="10" width="8" height="5" rx="1.5" fill="#f59e0b"/>
  </svg>
);

const GadgetMemoryBread = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
    <rect x="8" y="10" width="48" height="46" rx="8" fill="#d97706" stroke="#b45309" strokeWidth="2"/>
    <rect x="12" y="14" width="40" height="38" rx="6" fill="#fef3c7"/>
    <text x="18" y="28" fontSize="9" fontWeight="bold" fill="#92400e" fontFamily="monospace">O(1)</text>
    <text x="18" y="42" fontSize="8" fontWeight="bold" fill="#b45309" fontFamily="monospace">E=mc²</text>
  </svg>
);

const GadgetDoor = () => (
  <svg viewBox="0 0 56 88" fill="none" className="w-full h-full drop-shadow-lg">
    <rect x="2" y="2" width="52" height="84" rx="7" fill="#ec4899" stroke="#be185d" strokeWidth="3"/>
    <rect x="8" y="8" width="40" height="72" rx="5" fill="#f472b6"/>
    <circle cx="42" cy="44" r="5" fill="#f59e0b"/>
    <circle cx="41" cy="43" r="2" fill="white" opacity="0.55"/>
  </svg>
);

const GadgetSmallLight = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-md">
    <ellipse cx="48" cy="32" rx="5" ry="14" fill="#fbbf24"/>
    <path d="M20 22 L48 18 L48 46 L20 42 Z" fill="#ef4444"/>
    <rect x="8" y="26" width="12" height="12" rx="2" fill="#38bdf8"/>
    <polygon points="48,22 62,12 62,52 48,42" fill="#fde68a" opacity="0.5"/>
  </svg>
);

const floatingGadgets = [
  { id: "copter", top: "2%", right: "6%", w: 68, h: 68, delay: 0, duration: 6, el: <GadgetTakeCopter /> },
  { id: "aircannon", top: "10%", left: "4%", w: 58, h: 58, delay: 1, duration: 5.5, el: <GadgetAirCannon /> },
  { id: "door", bottom: "16%", right: "4%", w: 46, h: 72, delay: 0.5, duration: 7, el: <GadgetDoor /> },
  { id: "bread", bottom: "24%", left: "6%", w: 52, h: 52, delay: 1.8, duration: 6.5, el: <GadgetMemoryBread /> },
  { id: "smalllight", top: "34%", right: "1%", w: 48, h: 48, delay: 2.2, duration: 5, el: <GadgetSmallLight /> },
];

export default function Hero() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [heroView, setHeroView] = useState<"doraemon" | "gadgets">("doraemon");

  useEffect(() => {
    const currentFullRole = PERSONAL_INFO.roles[roleIndex];
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        setTypedRole(currentFullRole.substring(0, typedRole.length + 1));
        if (typedRole === currentFullRole) {
          timer = setTimeout(() => setIsDeleting(true), 2400);
        } else {
          timer = setTimeout(handleTyping, 75);
        }
      } else {
        setTypedRole(currentFullRole.substring(0, typedRole.length - 1));
        if (typedRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        } else {
          timer = setTimeout(handleTyping, 35);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 35 : 110);
    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex]);

  const handleResumeClick = () => {
    sounds.playChime();
    window.open(PERSONAL_INFO.resumeLink, "_blank");
  };

  const handleScrollTo = (id: string) => {
    sounds.playChime();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* LEFT: Bio & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Doraemon Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-300 text-sky-800 text-xs font-bold mb-4 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Software Development Engineer</span>
            <span className="text-slate-300">•</span>
            <span className="text-sky-700">IIIT Lucknow CSE</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-title tracking-tight text-slate-900 mb-2"
          >
            Hi, I&apos;m{" "}
            <span className="shimmer-text">{PERSONAL_INFO.name}</span>
          </motion.h1>

          {/* Role Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center mb-4"
          >
            <span className="text-xl sm:text-3xl font-extrabold text-amber-500 font-title tracking-wide">
              {typedRole}
            </span>
            <span className="w-1 h-6 sm:h-8 bg-sky-500 ml-1.5 animate-pulse rounded-full" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mb-6"
          >
            Computer Science graduate from{" "}
            <strong className="text-slate-900 font-bold">IIIT Lucknow</strong>{" "}
            building reliable backend distributed systems and high-throughput microservices in{" "}
            <strong className="text-sky-700 font-bold">Go & TypeScript</strong> at{" "}
            <strong className="text-slate-900 font-bold">CoinDCX</strong>, plus production full-stack platforms.
          </motion.p>

          {/* Experience Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2.5 mb-8"
          >
            {/* CoinDCX */}
            <div className="px-3.5 py-2 rounded-2xl bg-white border-2 border-sky-200 text-slate-800 text-xs font-semibold flex items-center gap-2.5 shadow-sm hover:shadow-md hover:border-sky-400 transition-all">
              <div className="relative h-4.5 w-20 shrink-0">
                <Image
                  src="/images/coindcx-wordmark.png"
                  alt="CoinDCX"
                  fill
                  sizes="80px"
                  className="object-contain object-left"
                />
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">SDE Intern (Go · TS · Rails)</span>
            </div>
            {/* Flipkart */}
            <div className="px-3.5 py-2 rounded-2xl bg-white border-2 border-amber-200 text-slate-800 text-xs font-semibold flex items-center gap-2.5 shadow-sm hover:shadow-md hover:border-amber-400 transition-all">
              <div className="relative w-5 h-5 rounded-md overflow-hidden shrink-0 shadow-xs">
                <Image
                  src="/images/flipkart-icon.png"
                  alt="Flipkart"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-amber-600 font-bold">Flipkart</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">SDE Intern (2.8Cr+ Records)</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-8"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-400/30 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResumeClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-sky-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all border-2 border-slate-200 hover:border-sky-400 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>View Resume</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-sky-200 text-slate-600 hover:text-slate-900 hover:border-sky-400 transition-all shadow-sm"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-sky-200 text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-all shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4 text-sky-600" />
            </a>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Bengaluru, India</span>
            </span>
          </motion.div>
        </div>

        {/* RIGHT: Doraemon Character Visual & 3D Movie Gadget Universe Switcher */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 mb-4 bg-white/90 p-1.5 rounded-2xl border border-sky-200 shadow-sm backdrop-blur-sm z-20">
            <button
              onClick={() => setHeroView("doraemon")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                heroView === "doraemon"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
              }`}
            >
              <span>🤖 Doraemon 3D</span>
            </button>
            <button
              onClick={() => setHeroView("gadgets")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                heroView === "gadgets"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
              }`}
            >
              <span>🌀 3D Movie Gadgets</span>
            </button>
          </div>

          {heroView === "gadgets" ? (
            <HeroGadgetUniverse3D />
          ) : (
            <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Floating anime gadgets */}
              {floatingGadgets.map((g) => (
                <motion.div
                  key={g.id}
                  className="absolute pointer-events-none z-10"
                  style={{
                    top: g.top,
                    bottom: g.bottom,
                    left: g.left,
                    right: g.right,
                    width: g.w,
                    height: g.h,
                  } as React.CSSProperties}
                  animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }}
                  transition={{ duration: g.duration, repeat: Infinity, ease: "easeInOut", delay: g.delay }}
                >
                  {g.el}
                </motion.div>
              ))}

              {/* Main Doraemon 3D Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center"
              >
                {/* Glow base shadow */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[220px] h-[32px] bg-sky-400/25 blur-2xl rounded-full" />

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[270px] h-[340px] sm:w-[350px] sm:h-[430px] select-none"
                >
                  <Image
                    src="/images/doraemon_hero_3d.jpg"
                    alt="Doraemon 3D"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 640px) 270px, 350px"
                  />
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
