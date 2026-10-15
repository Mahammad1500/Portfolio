"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";

export default function Doraemon3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 8.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ──── LIGHTING ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xdaf3fc, 1.6));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    fillLight.position.set(-6, 2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfef9c3, 0.6);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    const bottomBounce = new THREE.PointLight(0xdbeafe, 0.8, 18);
    bottomBounce.position.set(0, -3.5, 4);
    scene.add(bottomBounce);

    // ──── MATERIALS ───────────────────────────────────────────────
    // Doraemon's iconic cyan-blue
    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x19a5d6,   // exact Doraemon anime blue
      roughness: 0.28,
      metalness: 0.04,
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.0,
    });

    const redMat = new THREE.MeshStandardMaterial({
      color: 0xe93535,
      roughness: 0.22,
      metalness: 0.05,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5a623,
      roughness: 0.15,
      metalness: 0.75,
    });

    const darkMat = new THREE.MeshBasicMaterial({ color: 0x0d1117 });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const darkBlueMat = new THREE.MeshBasicMaterial({ color: 0x0c3d5e });

    // ──── ROOT GROUP ──────────────────────────────────────────────
    const root = new THREE.Group();
    scene.add(root);

    // ──── HEAD ────────────────────────────────────────────────────
    // Large round head (Doraemon's head is very round)
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(1.45, 48, 48), blueMat);
    headMesh.position.y = 0.9;
    headMesh.castShadow = true;
    root.add(headMesh);

    // White face oval — big, covers ~60% of front face
    const faceMesh = new THREE.Mesh(new THREE.SphereGeometry(1.35, 40, 40), whiteMat);
    faceMesh.scale.set(0.92, 0.86, 0.40);
    faceMesh.position.set(0, 0.8, 1.02);
    root.add(faceMesh);

    // ──── EYES — large anime ovals (key Doraemon feature) ─────────
    // White eye base — wide oval, sits proud of the face
    const eyeWhiteGeom = new THREE.SphereGeometry(0.48, 36, 36);

    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeom, whiteMat);
    leftEyeWhite.scale.set(0.78, 1.18, 0.30);  // wide & tall oval, flat
    leftEyeWhite.position.set(-0.35, 1.18, 1.32);
    root.add(leftEyeWhite);

    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeom, whiteMat);
    rightEyeWhite.scale.set(0.78, 1.18, 0.30);
    rightEyeWhite.position.set(0.35, 1.18, 1.32);
    root.add(rightEyeWhite);

    // Black pupils — large, centered in the white
    const pupilGeom = new THREE.SphereGeometry(0.19, 20, 20);
    const leftPupil = new THREE.Mesh(pupilGeom, darkBlueMat);
    leftPupil.position.set(-0.33, 1.17, 1.44);
    root.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeom, darkBlueMat);
    rightPupil.position.set(0.33, 1.17, 1.44);
    root.add(rightPupil);

    // White glint highlights in each eye
    const glintGeom = new THREE.SphereGeometry(0.06, 10, 10);
    const lg1 = new THREE.Mesh(glintGeom, glintMat);
    lg1.position.set(-0.25, 1.25, 1.54);
    root.add(lg1);
    const lg2 = new THREE.Mesh(glintGeom, glintMat);
    lg2.position.set(0.41, 1.25, 1.54);
    root.add(lg2);

    // ──── NOSE ────────────────────────────────────────────────────
    const noseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.21, 28, 28), redMat);
    noseMesh.position.set(0, 0.80, 1.44);
    root.add(noseMesh);
    // Nose glint
    const noseGlint = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), glintMat);
    noseGlint.position.set(0.06, 0.87, 1.59);
    root.add(noseGlint);

    // ──── WHISKERS — 6 lines on white face ───────────────────────
    const whiskerMat = new THREE.MeshBasicMaterial({ color: 0x0c3d5e });
    // Each whisker is a thin cylinder laid horizontally
    const makeWhisker = (px: number, py: number, tiltX: number) => {
      const wg = new THREE.CylinderGeometry(0.016, 0.016, 0.80, 8);
      const w = new THREE.Mesh(wg, whiskerMat);
      w.rotation.z = Math.PI / 2;          // lay flat (horizontal)
      w.rotation.y = tiltX;                // slight angle
      w.position.set(px, py, 1.38);        // sit on face surface
      root.add(w);
      return w;
    };
    // Left side — 3 whiskers
    makeWhisker(-0.60, 0.66, -0.10);
    makeWhisker(-0.60, 0.52, 0);
    makeWhisker(-0.60, 0.38, 0.10);
    // Right side — 3 whiskers
    makeWhisker(0.60, 0.66, 0.10);
    makeWhisker(0.60, 0.52, 0);
    makeWhisker(0.60, 0.38, -0.10);
    const whiskers: THREE.Mesh[] = [];

    // ──── MOUTH ───────────────────────────────────────────────────
    // Curved smile using CatmullRomCurve3
    const smilePoints = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const x = -0.55 + t * 1.1;
      const y = 0.32 - Math.sin(t * Math.PI) * 0.22;
      smilePoints.push(new THREE.Vector3(x, y, 1.33));
    }
    const smileCurve = new THREE.CatmullRomCurve3(smilePoints);
    const smileGeom = new THREE.TubeGeometry(smileCurve, 24, 0.025, 8, false);
    const mouthMesh = new THREE.Mesh(smileGeom, darkMat);
    root.add(mouthMesh);

    // ──── COLLAR ──────────────────────────────────────────────────
    const collarMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.08, 0.14, 18, 48),
      redMat
    );
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.set(0, -0.05, 0.08);
    root.add(collarMesh);

    // ──── GOLDEN BELL ─────────────────────────────────────────────
    const bellGroup = new THREE.Group();
    bellGroup.position.set(0, -0.22, 1.18);
    root.add(bellGroup);

    const bellMesh = new THREE.Mesh(new THREE.SphereGeometry(0.27, 28, 28), goldMat);
    bellGroup.add(bellMesh);

    // Bell equator line
    const bellLineMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.272, 0.022, 10, 28),
      new THREE.MeshBasicMaterial({ color: 0x7c4b00 })
    );
    bellLineMesh.rotation.x = Math.PI / 2;
    bellGroup.add(bellLineMesh);

    // Bell hole (bottom)
    const bellHoleMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x3d2000 })
    );
    bellHoleMesh.position.set(0, -0.22, 0.25);
    bellGroup.add(bellHoleMesh);

    // Bell glint
    const bellGlint = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), glintMat);
    bellGlint.position.set(-0.1, 0.12, 0.24);
    bellGroup.add(bellGlint);

    // ──── BODY ────────────────────────────────────────────────────
    const bodyMesh = new THREE.Mesh(new THREE.SphereGeometry(1.28, 44, 44), blueMat);
    bodyMesh.position.set(0, -1.0, 0);
    bodyMesh.scale.set(1.06, 0.95, 0.90);
    bodyMesh.castShadow = true;
    root.add(bodyMesh);

    // White belly (large oval)
    const bellyMesh = new THREE.Mesh(new THREE.SphereGeometry(1.0, 36, 36), whiteMat);
    bellyMesh.scale.set(0.88, 0.88, 0.33);
    bellyMesh.position.set(0, -0.98, 0.88);
    root.add(bellyMesh);

    // 4D Pocket outline (half-circle pouch on belly)
    const pocketMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.58, 0.58, 0.07, 36, 1, false, 0, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0xf0f8ff, roughness: 0.35, metalness: 0 })
    );
    pocketMesh.rotation.x = Math.PI / 2;
    pocketMesh.rotation.z = Math.PI;
    pocketMesh.position.set(0, -1.08, 1.16);
    root.add(pocketMesh);

    // Pocket border ring
    const pocketBorderGeom = new THREE.TorusGeometry(0.58, 0.025, 10, 36, Math.PI);
    const pocketBorderMesh = new THREE.Mesh(pocketBorderGeom, new THREE.MeshBasicMaterial({ color: 0xc0d8e8 }));
    pocketBorderMesh.rotation.x = Math.PI / 2;
    pocketBorderMesh.position.set(0, -1.08, 1.18);
    root.add(pocketBorderMesh);

    // ──── HANDS (white round paws) ────────────────────────────────
    const handGeom = new THREE.SphereGeometry(0.30, 22, 22);

    const leftHand = new THREE.Mesh(handGeom, whiteMat);
    leftHand.position.set(-1.52, -0.9, 0.28);
    root.add(leftHand);

    const rightHand = new THREE.Mesh(handGeom, whiteMat);
    rightHand.position.set(1.52, -0.9, 0.28);
    root.add(rightHand);

    // Small arm connector (blue cylinder)
    const armGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.58, 16);
    const leftArm = new THREE.Mesh(armGeom, blueMat);
    leftArm.rotation.z = Math.PI / 2.4;
    leftArm.position.set(-1.18, -0.82, 0.12);
    root.add(leftArm);

    const rightArm = new THREE.Mesh(armGeom, blueMat);
    rightArm.rotation.z = -Math.PI / 2.4;
    rightArm.position.set(1.18, -0.82, 0.12);
    root.add(rightArm);

    // ──── FEET ────────────────────────────────────────────────────
    const footGeom = new THREE.SphereGeometry(0.42, 24, 24);

    const leftFoot = new THREE.Mesh(footGeom, whiteMat);
    leftFoot.scale.set(1.05, 0.52, 1.5);
    leftFoot.position.set(-0.58, -1.92, 0.22);
    root.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeom, whiteMat);
    rightFoot.scale.set(1.05, 0.52, 1.5);
    rightFoot.position.set(0.58, -1.92, 0.22);
    root.add(rightFoot);

    // ──── TAKE-COPTER ON HEAD ─────────────────────────────────────
    const copterGroup = new THREE.Group();
    copterGroup.position.set(0, 2.38, 0);
    root.add(copterGroup);

    // Suction cup
    const suctionMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.20, 0.30, 0.15, 22),
      goldMat
    );
    copterGroup.add(suctionMesh);

    // Shaft
    const shaftMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.50, 12),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.15 })
    );
    shaftMesh.position.y = 0.33;
    copterGroup.add(shaftMesh);

    // Blade group (spins)
    const bladeGroup = new THREE.Group();
    bladeGroup.position.y = 0.58;
    copterGroup.add(bladeGroup);

    const bladeCenterMesh = new THREE.Mesh(new THREE.SphereGeometry(0.10, 14, 14), goldMat);
    bladeGroup.add(bladeCenterMesh);

    // Two blades crossing — bright sky blue
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.88 });
    const blade1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.22), bladeMat);
    bladeGroup.add(blade1);
    const blade2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.22), bladeMat);
    blade2.rotation.y = Math.PI / 2;
    bladeGroup.add(blade2);

    // ──── FLOATING 3D OBJECTS (orbit Doraemon) ────────────────────

    // Mini Anywhere Door (pink rectangle floating to the right)
    const doorGroup = new THREE.Group();
    doorGroup.position.set(2.8, 0.2, 0.5);
    root.add(doorGroup);

    const doorFrameMat = new THREE.MeshStandardMaterial({ color: 0xe91e8c, roughness: 0.3, metalness: 0.1 });
    const doorSurfMat = new THREE.MeshStandardMaterial({ color: 0xf06292, roughness: 0.2, metalness: 0.05, transparent: true, opacity: 0.85 });
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 0.08), doorFrameMat);
    doorGroup.add(doorFrame);
    const doorSurf = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.94, 0.04), doorSurfMat);
    doorSurf.position.z = 0.065;
    doorGroup.add(doorSurf);
    // Knob
    const doorKnob = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), goldMat);
    doorKnob.position.set(0.24, 0, 0.12);
    doorGroup.add(doorKnob);

    // Mini Small Light (flashlight gadget) floating on the left
    const smallLightGroup = new THREE.Group();
    smallLightGroup.position.set(-2.8, 0.5, 0.3);
    root.add(smallLightGroup);

    const lightBodyMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, metalness: 0.2 });
    const lightBody = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.85, 18), lightBodyMat);
    lightBody.rotation.x = Math.PI / 2;
    smallLightGroup.add(lightBody);
    const lightHead = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.18, 0.2, 18), new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.1, metalness: 0.8 }));
    lightHead.rotation.x = Math.PI / 2;
    lightHead.position.z = 0.52;
    smallLightGroup.add(lightHead);
    // Glow
    const lightGlow = new THREE.PointLight(0xfef3c7, 0.6, 3);
    lightGlow.position.z = 0.8;
    smallLightGroup.add(lightGlow);

    // Mini Star (above) — yellow spinning star made of a cone
    const starGroup = new THREE.Group();
    starGroup.position.set(0, 3.2, 1.0);
    root.add(starGroup);

    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.36, 6),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2, metalness: 0.3 })
      );
      spike.rotation.z = (i / 5) * Math.PI * 2;
      spike.position.set(
        Math.sin((i / 5) * Math.PI * 2) * 0.22,
        Math.cos((i / 5) * Math.PI * 2) * 0.22,
        0
      );
      starGroup.add(spike);
    }
    const starCenter = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 14), new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.1, metalness: 0.5 }));
    starGroup.add(starCenter);

    // ──── MOUSE TRACKING ──────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ──── BLINK STATE ─────────────────────────────────────────────
    let blinkTimer = 0;
    let nextBlink = 2.5 + Math.random() * 3;
    let isBlinking = false;
    let blinkPhase = 0;

    // ──── BLADE SPEED ─────────────────────────────────────────────
    let bladeSpeed = 0.10;
    (container as unknown as { boostPropeller: () => void }).boostPropeller = () => {
      bladeSpeed = 0.55;
    };

    // ──── ANIMATION LOOP ──────────────────────────────────────────
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      // Smooth mouse tracking
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;

      // Doraemon body: gentle floating + mouse rotation
      root.position.y = Math.sin(t * 1.8) * 0.12;
      root.rotation.y = mouse.x * 0.38;
      root.rotation.x = -mouse.y * 0.18;

      // Eyes follow cursor
      leftPupil.position.x = -0.33 + mouse.x * 0.07;
      leftPupil.position.y = 1.17 + mouse.y * 0.06;
      rightPupil.position.x = 0.33 + mouse.x * 0.07;
      rightPupil.position.y = 1.17 + mouse.y * 0.06;
      // Glints follow too
      lg1.position.x = -0.25 + mouse.x * 0.07;
      lg1.position.y = 1.25 + mouse.y * 0.06;
      lg2.position.x = 0.41 + mouse.x * 0.07;
      lg2.position.y = 1.25 + mouse.y * 0.06;

      // Hands sway
      leftHand.position.y = -0.9 + Math.sin(t * 2.2 + 0.5) * 0.09;
      rightHand.position.y = -0.9 + Math.cos(t * 2.2) * 0.09;

      // Bell slight sway
      bellGroup.rotation.z = Math.sin(t * 2.5) * 0.05;

      // Propeller spin
      bladeGroup.rotation.y += bladeSpeed;
      if (bladeSpeed > 0.10) {
        bladeSpeed = Math.max(0.10, bladeSpeed - delta * 0.8);
      }

      // Blink logic
      blinkTimer += delta;
      if (!isBlinking && blinkTimer >= nextBlink) {
        isBlinking = true;
        blinkPhase = 0;
      }
      if (isBlinking) {
        blinkPhase += delta;
        const closeRatio = blinkPhase < 0.07 ? blinkPhase / 0.07 : Math.max(0, 1 - (blinkPhase - 0.07) / 0.10);
        const scaleY = 1.18 - closeRatio * 1.08;
        leftEyeWhite.scale.y = scaleY;
        rightEyeWhite.scale.y = scaleY;
        if (blinkPhase >= 0.17) {
          isBlinking = false;
          blinkTimer = 0;
          nextBlink = 2.5 + Math.random() * 3.5;
          leftEyeWhite.scale.y = 1.18;
          rightEyeWhite.scale.y = 1.18;
        }
      }

      // Floating orbit objects
      doorGroup.position.x = 2.8 + Math.sin(t * 0.7) * 0.15;
      doorGroup.position.y = 0.2 + Math.cos(t * 0.9) * 0.18;
      doorGroup.rotation.y = Math.sin(t * 0.5) * 0.18;

      smallLightGroup.position.x = -2.8 + Math.cos(t * 0.8) * 0.15;
      smallLightGroup.position.y = 0.5 + Math.sin(t * 1.1) * 0.18;
      smallLightGroup.rotation.z = Math.sin(t * 0.6) * 0.2;

      starGroup.rotation.z = t * 1.2;
      starGroup.position.y = 3.2 + Math.sin(t * 2) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleClick = () => {
    if (containerRef.current) {
      const el = containerRef.current as unknown as { boostPropeller?: () => void };
      if (el.boostPropeller) el.boostPropeller();
    }
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#19a5d6", "#ef4444", "#f5a623", "#38bdf8", "#ffffff", "#e91e8c"],
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        onClick={handleClick}
        className="w-[300px] h-[340px] sm:w-[380px] sm:h-[420px] cursor-pointer touch-none relative z-10"
      />
      {/* Hint badge */}
      <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-sky-300/50 text-sky-700 text-xs font-semibold shadow-sm backdrop-blur-sm">
        <span className="animate-pulse text-amber-500">🔔</span>
        <span>Move cursor to guide eyes · Click to spin Take-copter!</span>
      </div>
    </div>
  );
}
