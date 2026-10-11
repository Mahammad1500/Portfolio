"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sounds } from "@/lib/sound";
import confetti from "canvas-confetti";

interface CompanionProps {
  onInteract?: () => void;
}

export default function Hero3DCompanion({ onInteract }: CompanionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbleText, setBubbleText] = useState("Konnichiwa! I'm Mahammad's 22nd-Century Assistant 🚁");
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 420;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    fillLight.position.set(-5, 0, 4);
    scene.add(fillLight);

    const bottomGlow = new THREE.PointLight(0xfef08a, 1.2, 8);
    bottomGlow.position.set(0, -2, 3);
    scene.add(bottomGlow);

    // Root Companion Group
    const companionGroup = new THREE.Group();
    companionGroup.position.y = -0.1;
    scene.add(companionGroup);

    // Materials
    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vibrant Doraemon Anime Blue
      roughness: 0.25,
      metalness: 0.08,
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.05,
    });

    const redMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Doraemon Red
      roughness: 0.2,
      metalness: 0.1,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24, // Bell Gold
      roughness: 0.15,
      metalness: 0.75,
    });

    const darkMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

    // 1. HEAD (Blue Sphere)
    const headGeom = new THREE.SphereGeometry(1.4, 36, 36);
    const head = new THREE.Mesh(headGeom, blueMat);
    head.position.y = 0.7;
    head.castShadow = true;
    companionGroup.add(head);

    // 2. FACE (White Ellipsoid Disc)
    const faceGeom = new THREE.SphereGeometry(1.25, 32, 32);
    const face = new THREE.Mesh(faceGeom, whiteMat);
    face.scale.set(0.98, 0.92, 0.45);
    face.position.set(0, 0.58, 0.85);
    companionGroup.add(face);

    // 3. EYES (White ovals)
    const eyeGeom = new THREE.SphereGeometry(0.32, 24, 24);
    
    // Left Eye
    const leftEye = new THREE.Mesh(eyeGeom, whiteMat);
    leftEye.scale.set(0.7, 1.05, 0.3);
    leftEye.position.set(-0.25, 0.95, 1.25);
    companionGroup.add(leftEye);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeGeom, whiteMat);
    rightEye.scale.set(0.7, 1.05, 0.3);
    rightEye.position.set(0.25, 0.95, 1.25);
    companionGroup.add(rightEye);

    // Pupils
    const pupilGeom = new THREE.SphereGeometry(0.09, 16, 16);
    const leftPupil = new THREE.Mesh(pupilGeom, darkMat);
    leftPupil.position.set(-0.22, 0.95, 1.35);
    companionGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeom, darkMat);
    rightPupil.position.set(0.22, 0.95, 1.35);
    companionGroup.add(rightPupil);

    // Pupil Glints
    const glintGeom = new THREE.SphereGeometry(0.03, 8, 8);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftGlint = new THREE.Mesh(glintGeom, glintMat);
    leftGlint.position.set(-0.2, 0.98, 1.42);
    companionGroup.add(leftGlint);

    const rightGlint = new THREE.Mesh(glintGeom, glintMat);
    rightGlint.position.set(0.24, 0.98, 1.42);
    companionGroup.add(rightGlint);

    // 4. NOSE (Red Sphere)
    const noseGeom = new THREE.SphereGeometry(0.18, 20, 20);
    const nose = new THREE.Mesh(noseGeom, redMat);
    nose.position.set(0, 0.65, 1.34);
    companionGroup.add(nose);

    // Nose Highlight
    const noseHighlight = new THREE.Mesh(glintGeom, glintMat);
    noseHighlight.position.set(0.04, 0.72, 1.48);
    companionGroup.add(noseHighlight);

    // 5. COLLAR (Red Ring)
    const collarGeom = new THREE.TorusGeometry(1.08, 0.12, 16, 40);
    const collar = new THREE.Mesh(collarGeom, redMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, -0.22, 0.15);
    companionGroup.add(collar);

    // 6. BELL (Golden Sphere with detailing)
    const bellGeom = new THREE.SphereGeometry(0.25, 24, 24);
    const bell = new THREE.Mesh(bellGeom, goldMat);
    bell.position.set(0, -0.32, 1.15);
    companionGroup.add(bell);

    // Bell band
    const bellBandGeom = new THREE.TorusGeometry(0.252, 0.025, 12, 24);
    const bellBandMat = new THREE.MeshBasicMaterial({ color: 0x92400e });
    const bellBand = new THREE.Mesh(bellBandGeom, bellBandMat);
    bellBand.rotation.x = Math.PI / 2;
    bellBand.position.set(0, -0.32, 1.15);
    companionGroup.add(bellBand);

    // Bell eyelet hole
    const bellHoleGeom = new THREE.SphereGeometry(0.05, 12, 12);
    const bellHole = new THREE.Mesh(bellHoleGeom, darkMat);
    bellHole.position.set(0, -0.37, 1.36);
    companionGroup.add(bellHole);

    // 7. BODY (Blue sphere)
    const bodyGeom = new THREE.SphereGeometry(1.22, 32, 32);
    const body = new THREE.Mesh(bodyGeom, blueMat);
    body.position.set(0, -0.95, 0.05);
    body.scale.set(1.08, 0.95, 0.95);
    companionGroup.add(body);

    // 8. BELLY (White disc)
    const bellyGeom = new THREE.SphereGeometry(0.95, 28, 28);
    const belly = new THREE.Mesh(bellyGeom, whiteMat);
    belly.scale.set(0.85, 0.85, 0.35);
    belly.position.set(0, -0.92, 0.85);
    companionGroup.add(belly);

    // 9. 4D POCKET (White pouch with curved outline)
    const pocketPouchGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32, 1, false, 0, Math.PI);
    const pocketMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
    });
    const pocket = new THREE.Mesh(pocketPouchGeom, pocketMat);
    pocket.rotation.x = Math.PI / 2;
    pocket.rotation.z = Math.PI;
    pocket.position.set(0, -1.02, 1.15);
    companionGroup.add(pocket);

    // 10. TAKE-COPTER (Mounted on head!)
    const copterGroup = new THREE.Group();
    copterGroup.position.set(0, 2.1, 0);
    companionGroup.add(copterGroup);

    // Suction Base
    const suctionGeom = new THREE.CylinderGeometry(0.18, 0.28, 0.15, 20);
    const suction = new THREE.Mesh(suctionGeom, goldMat);
    copterGroup.add(suction);

    // Shaft
    const shaftGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    const shaft = new THREE.Mesh(shaftGeom, shaftMat);
    shaft.position.y = 0.3;
    copterGroup.add(shaft);

    // Blades (Yellow Propeller)
    const bladeGroup = new THREE.Group();
    bladeGroup.position.y = 0.52;
    copterGroup.add(bladeGroup);

    const bladeCenterGeom = new THREE.SphereGeometry(0.09, 12, 12);
    const bladeCenter = new THREE.Mesh(bladeCenterGeom, goldMat);
    bladeGroup.add(bladeCenter);

    const bladeGeom = new THREE.BoxGeometry(1.6, 0.03, 0.18);
    const blade = new THREE.Mesh(bladeGeom, goldMat);
    bladeGroup.add(blade);

    // 11. FLOATING HANDS (White spheres)
    const handGeom = new THREE.SphereGeometry(0.3, 20, 20);
    const leftHand = new THREE.Mesh(handGeom, whiteMat);
    leftHand.position.set(-1.45, -0.85, 0.35);
    companionGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeom, whiteMat);
    rightHand.position.set(1.45, -0.85, 0.35);
    companionGroup.add(rightHand);

    // Mouse coordinates tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.targetX = (x - 0.5) * 2;
      mouse.targetY = -(y - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Blink timer
    let blinkTime = 0;
    let nextBlink = 3 + Math.random() * 2;

    // Propeller speed multiplier
    let bladeSpeed = 0.08;

    // Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (!prefersReducedMotion) {
        // Idle bobbing
        companionGroup.position.y = -0.1 + Math.sin(elapsed * 2.2) * 0.12;

        // Head and body orientation follows mouse
        companionGroup.rotation.y = mouse.x * 0.45;
        companionGroup.rotation.x = -mouse.y * 0.25;

        // Pupils track mouse with precision
        leftPupil.position.x = -0.22 + mouse.x * 0.06;
        leftPupil.position.y = 0.95 + mouse.y * 0.05;
        rightPupil.position.x = 0.22 + mouse.x * 0.06;
        rightPupil.position.y = 0.95 + mouse.y * 0.05;

        // Floating hands bob gently
        leftHand.position.y = -0.85 + Math.sin(elapsed * 2.5 + 0.5) * 0.08;
        rightHand.position.y = -0.85 + Math.cos(elapsed * 2.5) * 0.08;

        // Spin take-copter blades
        bladeGroup.rotation.y += bladeSpeed;
        if (bladeSpeed > 0.08) {
          bladeSpeed = Math.max(0.08, bladeSpeed - delta * 0.6);
        }

        // Blinking logic
        blinkTime += delta;
        if (blinkTime >= nextBlink) {
          leftEye.scale.y = 0.1;
          rightEye.scale.y = 0.1;
          if (blinkTime >= nextBlink + 0.15) {
            leftEye.scale.y = 1.05;
            rightEye.scale.y = 1.05;
            blinkTime = 0;
            nextBlink = 2.5 + Math.random() * 3;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Save blade speed trigger to container DOM for interactive clicks
    (container as unknown as { boostPropeller: () => void }).boostPropeller = () => {
      bladeSpeed = 0.45;
    };

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const phrases = [
    "Konnichiwa! I'm Mahammad's 22nd-Century Assistant 🚁",
    "Go & TypeScript systems at CoinDCX ready! ⚡",
    "ML models at Flipkart trained with 2.8Cr+ rows! 📊",
    "4D Pocket unlocked: check out Mahammad's gadgets below! 🎒",
    "Dokodemo Door is open! Where would you like to travel? 🚪",
    "Take-copter at maximum altitude! 500+ LeetCode solved! 🌟",
  ];

  const handleCompanionClick = () => {
    setIsInteracting(true);
    sounds.playChime();

    // Trigger propeller boost
    if (containerRef.current) {
      const el = containerRef.current as unknown as { boostPropeller?: () => void };
      if (el.boostPropeller) el.boostPropeller();
    }

    // Pick random phrase
    const nextPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setBubbleText(nextPhrase);

    // Confetti pop!
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.45 },
      colors: ["#0284C7", "#EF4444", "#FBBF24", "#38BDF8", "#FFFFFF"],
    });

    if (onInteract) onInteract();

    setTimeout(() => {
      setIsInteracting(false);
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Speech / Status Bubble */}
      <div
        onClick={handleCompanionClick}
        className={`cursor-pointer transition-all duration-300 transform mb-2 px-5 py-2.5 rounded-2xl bg-white/95 text-slate-900 border-2 border-sky-400 shadow-xl shadow-sky-500/15 max-w-xs text-xs md:text-sm font-bold flex items-center gap-2 select-none z-20 ${
          isInteracting ? "scale-105 border-amber-400" : "hover:scale-102 hover:border-sky-500"
        }`}
      >
        <span className="text-base animate-bounce">🔔</span>
        <span className="leading-snug">{bubbleText}</span>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        onClick={handleCompanionClick}
        className="w-[300px] h-[340px] sm:w-[360px] sm:h-[400px] md:w-[420px] md:h-[440px] cursor-pointer touch-none relative z-10 transition-transform hover:scale-[1.02]"
        title="Click me to interact with Mahammad's 3D companion!"
      />

      {/* Floating Interaction Hint */}
      <button
        onClick={handleCompanionClick}
        className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[11px] font-semibold tracking-wide hover:bg-sky-500/25 transition-all cursor-pointer z-20"
      >
        <span>✨ Click robot to spin Take-copter</span>
      </button>
    </div>
  );
}
