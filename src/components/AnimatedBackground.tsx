"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020617] pointer-events-none select-none">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.3]" />

      {/* Floating lights/blobs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-600/10 to-cyan-500/10 blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-600/10 to-purple-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 30, -50, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-2/3 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-600/5 to-blue-500/5 blur-[80px]"
      />

      {/* Dark radial overlay to vignette the viewport edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_90%)]" />
    </div>
  );
}
