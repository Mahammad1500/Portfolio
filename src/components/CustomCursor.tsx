"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Motion values for smooth cursor trailing
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("clickable")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Only apply on non-touch desktop screens
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) {
      document.body.classList.add("custom-cursor-active");
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);
    } else {
      setHidden(true);
    }

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!mounted || hidden) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/60 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.8 : 1,
          backgroundColor: hovered ? "rgba(6, 182, 212, 0.15)" : "rgba(6, 182, 212, 0)",
          borderColor: hovered ? "rgba(6, 182, 212, 0.9)" : "rgba(6, 182, 212, 0.6)",
          boxShadow: hovered ? "0 0 15px rgba(6, 182, 212, 0.4)" : "none",
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          scale: hovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
