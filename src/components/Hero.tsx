"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FileText, Briefcase, ExternalLink, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import confetti from "canvas-confetti";
import { sounds } from "@/lib/sound";

export default function Hero() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speechText, setSpeechText] = useState("Hi! Welcome to my 22nd-century portfolio 🚁");

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 200 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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

  const phrases = [
    "Spinning Take-copter into high gear! 🚁",
    "Go & TypeScript backend services online at CoinDCX! ⚡",
    "Flipkart ML pipelines trained on 2.8Cr+ rows! 📊",
    "Anywhere Door ready: teleport to any project! 🚪",
    "500+ LeetCode problems mastered! 🌟",
    "Check out my 4D Pocket gadgets below! 🎒",
  ];

  const handleCharacterClick = () => {
    sounds.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ["#0284C7", "#EF4444", "#FBBF24", "#38BDF8", "#FFFFFF"],
    });
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setSpeechText(randomPhrase);
  };

  const handleResumeClick = () => {
    sounds.playChime();
    window.open(PERSONAL_INFO.resumeLink, "_blank");
  };

  const handleScrollTo = (id: string) => {
    sounds.playChime();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Engineer Bio & Call-to-actions */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Subtle Accent Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-xs font-semibold mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Futuristic Software Engineering</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">IIIT Lucknow CSE</span>
          </motion.div>

          {/* Name Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-title tracking-tight text-white mb-3"
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-amber-300">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          {/* Role Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center mb-5"
          >
            <span className="text-xl sm:text-3xl font-extrabold text-amber-300 font-title tracking-wide">
              {typedRole}
            </span>
            <span className="w-1 h-6 sm:h-8 bg-sky-400 ml-1.5 animate-pulse rounded-full" />
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* Clean Key Experience Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2.5 mb-8"
          >
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-sky-500/20 text-slate-200 text-xs font-medium flex items-center gap-2">
              <span className="text-sky-400 font-bold">CoinDCX</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">SDE Intern (Backend in Go & TS)</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-amber-500/20 text-slate-200 text-xs font-medium flex items-center gap-2">
              <span className="text-amber-400 font-bold">Flipkart</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">ML Intern (2.8Cr+ Records, XGBoost)</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-500/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResumeClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all border border-slate-700 hover:border-amber-400 cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>View Resume</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </motion.div>

          {/* Social Profiles & Direct Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-3.5"
          >
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-400 transition-all"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-400 transition-all"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Bengaluru, India</span>
            </span>
          </motion.div>
        </div>

        {/* Right Column: 3D Vintage Doraemon Visual Centerpiece with Interactive Tilt */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          {/* Interactive Speech Bubble */}
          <motion.div
            onClick={handleCharacterClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            className="mb-4 cursor-pointer px-4 py-2 rounded-2xl bg-white/95 text-slate-900 border-2 border-sky-400 shadow-lg text-xs font-bold flex items-center gap-2 select-none"
          >
            <span className="text-sm animate-bounce">🔔</span>
            <span>{speechText}</span>
          </motion.div>

          {/* 3D Floating Character Stage with Perspective Tilt */}
          <div style={{ perspective: 1000 }} className="relative flex items-center justify-center">
            {/* Ambient Sky Glow */}
            <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-sky-500/25 via-blue-600/20 to-amber-300/15 blur-3xl pointer-events-none" />

            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={handleCharacterClick}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-3xl overflow-hidden border-2 border-sky-400/40 shadow-2xl shadow-sky-500/15 cursor-pointer group bg-gradient-to-b from-sky-900/40 to-slate-950/80 backdrop-blur-sm"
              title="Click Doraemon to trigger sound and spin the Take-copter!"
            >
              {/* High-Fidelity 3D Vintage Doraemon Hero Image */}
              <Image
                src="/images/doraemon_hero.jpg"
                alt="3D Doraemon flying with Take-copter in the sky"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Interactive Hover Overlay Label */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-sky-400/30 flex items-center justify-between text-[11px] text-sky-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interactive 3D Companion</span>
                </span>
                <span className="text-amber-400 font-bold">Tap me! 🔔</span>
              </div>
            </motion.div>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Move mouse over Doraemon for 3D tilt • Click for Take-copter chime
          </p>
        </div>
      </div>
    </section>
  );
}
