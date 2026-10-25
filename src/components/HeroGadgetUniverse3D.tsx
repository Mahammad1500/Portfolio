"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";

interface MovieGadgetMeta {
  name: string;
  japanese: string;
  movie: string;
  role: string;
}

const GADGET_METAS: Record<string, MovieGadgetMeta> = {
  door: {
    name: "Anywhere Door",
    japanese: "どこでもドア",
    movie: "Stand by Me • The Secret Gadget Museum",
    role: "Zero-latency routing & API gateways",
  },
  copter: {
    name: "Take-Copter",
    japanese: "竹コプター",
    movie: "Stand by Me • All 42 Movies",
    role: "Zero-gravity horizontal scaling & goroutines",
  },
  timemachine: {
    name: "Time Machine",
    japanese: "タイムマシン",
    movie: "Nobita's Dinosaur • Stand by Me",
    role: "Deterministic temporal state & event sourcing",
  },
  bread: {
    name: "Memory Bread",
    japanese: "アンキパン",
    movie: "The Secret Gadget Museum • Classic Era",
    role: "Algorithmic retention & DSA mastery",
  },
  cannon: {
    name: "Air Cannon",
    japanese: "空気砲",
    movie: "Nobita and the Steel Troops",
    role: "High-velocity streaming & low-latency messaging",
  },
  light: {
    name: "Small Light",
    japanese: "スモールライト",
    movie: "Nobita's Little Star Wars",
    role: "Memory footprint miniaturization & Protobuf",
  },
  loop: {
    name: "Pass Loop",
    japanese: "通りぬけフープ",
    movie: "Nobita's Great Adventure into the Underworld",
    role: "Monolith decoupling & modular microservices",
  },
  konjac: {
    name: "Translation Konjac",
    japanese: "ほんやくコンニャク",
    movie: "Nobita and the Birth of Japan",
    role: "Polyglot engineering: Go, TS, Python, Ruby, C++",
  },
};

export default function HeroGadgetUniverse3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeGadget, setActiveGadget] = useState<MovieGadgetMeta>(GADGET_METAS.copter);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 460;

    // ──── SCENE, CAMERA, RENDERER ────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ──── LIGHTING ────
    scene.add(new THREE.AmbientLight(0xe0f2fe, 1.8));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const coreLight = new THREE.PointLight(0x0284c7, 2.0, 12);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // ──── MATERIALS ────
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
    });
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.5,
      roughness: 0.2,
    });
    const pinkMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.25,
      roughness: 0.25,
    });
    const doorInsideMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      metalness: 0.1,
      roughness: 0.3,
    });
    const breadCrustMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
    });
    const breadInsideMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      roughness: 0.3,
    });
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.8,
      roughness: 0.25,
    });
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.3,
      roughness: 0.2,
    });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });
    const jellyMat = new THREE.MeshPhysicalMaterial({
      color: 0x6ee7b7,
      transmission: 0.7,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.4,
    });

    // ──── CENTRAL 4D CORE (The Secret Gadget Museum Nexus) ────
    const root = new THREE.Group();
    scene.add(root);

    // Holographic core ring
    const coreRingGeom = new THREE.TorusGeometry(1.05, 0.04, 16, 64);
    const coreRing = new THREE.Mesh(coreRingGeom, glowMat);
    coreRing.rotation.x = Math.PI / 2.3;
    root.add(coreRing);

    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.03, 16, 48), goldMat);
    innerRing.rotation.x = Math.PI / 1.7;
    root.add(innerRing);

    // Core 4D Gem
    const gemGeom = new THREE.IcosahedronGeometry(0.42, 1);
    const gemMesh = new THREE.Mesh(gemGeom, cyanMat);
    root.add(gemMesh);

    // ──── 3D MOVIE GADGETS ────
    const gadgetNodes: { group: THREE.Group; id: string; baseAngle: number; radius: number; speed: number; rotSpeed: { x: number; y: number; z: number } }[] = [];

    // Helper: Build Anywhere Door
    const create3DDoor = () => {
      const g = new THREE.Group();
      // Outer frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.05, 0.08), pinkMat);
      g.add(frame);
      // Door surface
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.92, 0.04), doorInsideMat);
      door.position.z = 0.04;
      g.add(door);
      // Knob
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), goldMat);
      knob.position.set(0.2, 0, 0.09);
      g.add(knob);
      return g;
    };

    // Helper: Build Take-Copter
    let bladeSpinGroup: THREE.Group;
    const create3DCopter = () => {
      const g = new THREE.Group();
      // Suction base
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 0.14, 18), goldMat);
      g.add(base);
      // Shaft
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.55, 12), metalMat);
      shaft.position.y = 0.32;
      g.add(shaft);
      // Blades group (spins fast)
      bladeSpinGroup = new THREE.Group();
      bladeSpinGroup.position.y = 0.6;
      g.add(bladeSpinGroup);
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), goldMat);
      bladeSpinGroup.add(hub);
      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.03, 0.18), cyanMat);
      bladeSpinGroup.add(blade1);
      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.03, 0.18), cyanMat);
      blade2.rotation.y = Math.PI / 2;
      bladeSpinGroup.add(blade2);
      return g;
    };

    // Helper: Build Memory Bread
    const create3DBread = () => {
      const g = new THREE.Group();
      // Crust
      const crust = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.85, 0.14), breadCrustMat);
      g.add(crust);
      // Bread face
      const face = new THREE.Mesh(new THREE.BoxGeometry(0.63, 0.73, 0.06), breadInsideMat);
      face.position.z = 0.06;
      g.add(face);
      return g;
    };

    // Helper: Build Air Cannon
    const create3DCannon = () => {
      const g = new THREE.Group();
      // Barrel
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.8, 20), metalMat);
      barrel.rotation.z = Math.PI / 2;
      g.add(barrel);
      // Red nozzle ring
      const nozzle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 12, 24), redMat);
      nozzle.rotation.y = Math.PI / 2;
      nozzle.position.x = 0.4;
      g.add(nozzle);
      // Trigger sight
      const sight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), goldMat);
      sight.position.set(0, 0.22, 0);
      g.add(sight);
      return g;
    };

    // Helper: Build Time Machine
    const create3DTimeMachine = () => {
      const g = new THREE.Group();
      // Platform base
      const plat = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.65), cyanMat);
      g.add(plat);
      // Control pillar
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.45, 12), metalMat);
      pillar.position.set(-0.25, 0.25, 0);
      g.add(pillar);
      // Levers
      const lever = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), redMat);
      lever.position.set(-0.25, 0.5, 0);
      g.add(lever);
      // Rear glowing antenna
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 10), goldMat);
      ant.position.set(0.3, 0.3, 0.2);
      g.add(ant);
      const antLight = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), glowMat);
      antLight.position.set(0.3, 0.56, 0.2);
      g.add(antLight);
      return g;
    };

    // Helper: Build Small Light
    const create3DLight = () => {
      const g = new THREE.Group();
      // Flashlight body
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.6, 16), redMat);
      body.rotation.z = Math.PI / 2;
      g.add(body);
      // Flashlight head
      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.14, 0.22, 18), goldMat);
      head.rotation.z = Math.PI / 2;
      head.position.x = 0.38;
      g.add(head);
      // Light beam cone (translucent)
      const beamMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.35 });
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 18, 1, true), beamMat);
      cone.rotation.z = -Math.PI / 2;
      cone.position.x = 0.95;
      g.add(cone);
      return g;
    };

    // Helper: Build Pass Loop
    const create3DLoop = () => {
      const g = new THREE.Group();
      const loop = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.08, 16, 40), goldMat);
      g.add(loop);
      const voidSurf = new THREE.Mesh(new THREE.CircleGeometry(0.46, 32), glowMat);
      g.add(voidSurf);
      return g;
    };

    // Helper: Build Translation Konjac
    const create3DKonjac = () => {
      const g = new THREE.Group();
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), jellyMat);
      g.add(cube);
      const wire = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.62, 0.62), new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }));
      g.add(wire);
      return g;
    };

    // Instantiate and place gadgets on orbital coordinates
    const gadgetsList = [
      { id: "door", create: create3DDoor, radius: 2.3, angle: 0, speed: 0.35, rot: { x: 0.01, y: 0.015, z: 0 } },
      { id: "copter", create: create3DCopter, radius: 2.4, angle: (Math.PI / 4) * 1, speed: 0.4, rot: { x: 0.005, y: 0.02, z: 0 } },
      { id: "bread", create: create3DBread, radius: 2.2, angle: (Math.PI / 4) * 2, speed: 0.3, rot: { x: 0.01, y: 0.01, z: 0.005 } },
      { id: "cannon", create: create3DCannon, radius: 2.5, angle: (Math.PI / 4) * 3, speed: 0.38, rot: { x: 0.012, y: 0.015, z: 0 } },
      { id: "timemachine", create: create3DTimeMachine, radius: 2.3, angle: (Math.PI / 4) * 4, speed: 0.32, rot: { x: 0.008, y: 0.012, z: 0 } },
      { id: "light", create: create3DLight, radius: 2.4, angle: (Math.PI / 4) * 5, speed: 0.36, rot: { x: 0.01, y: 0.02, z: 0 } },
      { id: "loop", create: create3DLoop, radius: 2.2, angle: (Math.PI / 4) * 6, speed: 0.34, rot: { x: 0.015, y: 0.01, z: 0 } },
      { id: "konjac", create: create3DKonjac, radius: 2.3, angle: (Math.PI / 4) * 7, speed: 0.37, rot: { x: 0.01, y: 0.015, z: 0.01 } },
    ];

    gadgetsList.forEach((item) => {
      const g = item.create();
      root.add(g);
      gadgetNodes.push({
        group: g,
        id: item.id,
        baseAngle: item.angle,
        radius: item.radius,
        speed: item.speed,
        rotSpeed: item.rot,
      });
    });

    // ──── MOUSE & DRAG INTERACTION ────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let manualRotY = 0;
    let manualRotX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (isDragging) {
        const dx = e.clientX - prevPointerX;
        const dy = e.clientY - prevPointerY;
        manualRotY += dx * 0.01;
        manualRotX += dy * 0.01;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // ──── RAYCASTER FOR GADGET SELECTION ────
    const raycaster = new THREE.Raycaster();
    const pointerCoord = new THREE.Vector2();

    const onContainerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointerCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerCoord, camera);
      const intersects = raycaster.intersectObjects(root.children, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && obj.parent !== root) {
          obj = obj.parent;
        }
        if (obj) {
          const matched = gadgetNodes.find((n) => n.group === obj);
          if (matched && GADGET_METAS[matched.id]) {
            setActiveGadget(GADGET_METAS[matched.id]);
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.5 },
              colors: ["#0284c7", "#f59e0b", "#ec4899", "#10b981"],
            });
          }
        }
      }
    };

    container.addEventListener("click", onContainerClick);

    // ──── ANIMATION LOOP ────
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // Rotate root universe
      root.rotation.y = manualRotY + t * 0.12 + mouse.x * 0.25;
      root.rotation.x = manualRotX + Math.sin(t * 0.5) * 0.08 - mouse.y * 0.15;

      // Spin central rings & 4D core
      coreRing.rotation.z = t * 0.6;
      innerRing.rotation.z = -t * 0.8;
      gemMesh.rotation.y = t * 0.9;
      gemMesh.rotation.x = t * 0.4;

      // Spin copter propeller blades fast
      if (bladeSpinGroup) {
        bladeSpinGroup.rotation.y += 0.35;
      }

      // Orbit gadgets in 3D circle with subtle bobbing
      gadgetNodes.forEach((node) => {
        const curAngle = node.baseAngle + t * (node.speed * 0.6);
        const yBob = Math.sin(t * 1.5 + node.baseAngle) * 0.28;
        node.group.position.set(
          Math.cos(curAngle) * node.radius,
          yBob,
          Math.sin(curAngle) * node.radius
        );
        node.group.rotation.x += node.rotSpeed.x;
        node.group.rotation.y += node.rotSpeed.y;
        node.group.rotation.z += node.rotSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ──── RESIZE ────
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
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("click", onContainerClick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* 3D WebGL Canvas for Gadget Universe */}
      <div
        ref={containerRef}
        className="w-[320px] h-[360px] sm:w-[440px] sm:h-[460px] cursor-grab active:cursor-grabbing touch-none relative z-10"
        title="3D Doraemon Movie Gadget Universe — Drag to rotate 360° · Click any gadget to inspect!"
      />

      {/* Selected Gadget Movie Lore Card */}
      <div className="mt-3 w-full max-w-md p-4 rounded-2xl bg-white/90 border border-sky-200/80 shadow-md backdrop-blur-md transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-sky-600 font-mono">
            {activeGadget.japanese}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[10px] font-bold text-sky-800 border border-sky-200">
            {activeGadget.movie}
          </span>
        </div>
        <h4 className="text-base font-black font-title text-slate-900">
          {activeGadget.name}
        </h4>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          <strong className="text-slate-800">Engineering Role:</strong> {activeGadget.role}
        </p>
        <span className="text-[10px] text-slate-600 font-semibold mt-2 block">
          👆 Click any floating 3D gadget to focus · Drag canvas to rotate 360°
        </span>
      </div>
    </div>
  );
}
