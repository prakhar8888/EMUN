"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf = null;
    const handleMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
        raf = null;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const spotlightX = useTransform(smoothX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(smoothY, (v) => `${v * 100}%`);

  const meshParallaxX = useTransform(smoothX, [0, 1], [10, -10]);
  const meshParallaxY = useTransform(smoothY, [0, 1], [6, -6]);

  // ======================================
  // PARTICLE FIELDS — sparse and restrained,
  // a diplomatic night sky, not a starfield
  // ======================================
  const dustParticles = useMemo(() => {
    if (!mounted) return [];
    return [...Array(14)].map((_, i) => ({
      id: `dust-${i}`,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 1.2,
      duration: 24 + Math.random() * 20,
      delay: Math.random() * 14,
      driftX: (Math.random() - 0.5) * 60,
      opacity: 0.12 + Math.random() * 0.15,
    }));
  }, [mounted]);

  const twinkles = useMemo(() => {
    if (!mounted) return [];
    return [...Array(9)].map((_, i) => ({
      id: `twinkle-${i}`,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1.2 + Math.random() * 1,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 8,
      isGold: i % 4 === 0,
    }));
  }, [mounted]);

  // Diplomatic network arcs - the MUN-relevant motif
  const arcs = useMemo(() => {
    return [
      { id: "arc-1", d: "M 5,70 Q 30,10 55,45 T 95,25", delay: 0 },
      { id: "arc-2", d: "M 10,20 Q 45,55 60,15 T 90,60", delay: 3 },
      { id: "arc-3", d: "M 0,45 Q 35,80 65,50 T 100,80", delay: 6 },
    ];
  }, []);

  const nodes = useMemo(() => {
    return [
      { x: 5, y: 70 }, { x: 55, y: 45 }, { x: 95, y: 25 },
      { x: 10, y: 20 }, { x: 60, y: 15 }, { x: 90, y: 60 },
      { x: 0, y: 45 }, { x: 65, y: 50 }, { x: 100, y: 80 },
    ];
  }, []);

  const animationsEnabled = !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >

      {/* LAYER 1 — Deep base: near-black navy easing into a rich, dark purple */}
      <motion.div
        animate={animationsEnabled ? { opacity: [0.85, 1, 0.85] } : undefined}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#05070F] via-[#0D0E1F] to-[#1A1030]"
      />

      {/* LAYER 2 — Dark purple bloom, restrained and deep, not glowing */}
      <motion.div
        style={animationsEnabled ? { x: meshParallaxX, y: meshParallaxY } : undefined}
        animate={
          animationsEnabled
            ? {
                background: [
                  "radial-gradient(ellipse 90% 70% at 75% 85%, rgba(46,20,90,0.55) 0%, transparent 60%)",
                  "radial-gradient(ellipse 100% 80% at 70% 90%, rgba(46,20,90,0.65) 0%, transparent 65%)",
                  "radial-gradient(ellipse 90% 70% at 75% 85%, rgba(46,20,90,0.55) 0%, transparent 60%)",
                ],
              }
            : undefined
        }
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />
      <motion.div
        animate={animationsEnabled ? { opacity: [0.4, 0.55, 0.4] } : undefined}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_10%,rgba(15,10,30,0.6)_0%,transparent_55%)]"
      />
      <motion.div
        animate={animationsEnabled ? { opacity: [0.015, 0.03, 0.015] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_50%_50%,rgba(212,175,55,0.03)_0%,transparent_60%)]"
      />

      {/* LAYER 3 — Diplomatic network: the MUN motif, quiet and precise */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.045]" viewBox="0 0 100 100" preserveAspectRatio="none">
        {arcs.map((arc) => (
          <motion.path
            key={arc.id}
            d={arc.d}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.12"
            strokeDasharray="1 1.5"
            animate={animationsEnabled ? { pathLength: [0, 1], opacity: [0, 0.6, 0.6, 0] } : { pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: arc.delay }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r="0.35"
            fill="#F8F6F0"
            animate={animationsEnabled ? { opacity: [0.15, 0.5, 0.15] } : undefined}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </svg>

      {/* LAYER 4 — Two orbital rings, quiet gold + quiet purple */}
      <motion.div
        animate={animationsEnabled ? { rotate: 360, opacity: [0.025, 0.04, 0.025] } : { rotate: 0 }}
        transition={{ rotate: { duration: 90, repeat: Infinity, ease: "linear" }, opacity: { duration: 14, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
      >
        <div className="w-full h-full rounded-full border border-[#D4AF37]" />
      </motion.div>
      <motion.div
        animate={animationsEnabled ? { rotate: -360, opacity: [0.03, 0.05, 0.03] } : { rotate: 0 }}
        transition={{ rotate: { duration: 110, repeat: Infinity, ease: "linear" }, opacity: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px]"
      >
        <div className="w-full h-full rounded-full border border-[#6D28D9]" />
      </motion.div>

      {/* LAYER 5 — Sparse floating dust, quiet */}
      {mounted && dustParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ y: [0, -80], x: [0, p.driftX], opacity: [0, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full bg-[#C8CDD5]"
          style={{ top: `${p.top}%`, left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px` }}
        />
      ))}

      {/* LAYER 6 — Sparse twinkles, dim */}
      {mounted && twinkles.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.08, t.isGold ? 0.45 : 0.28, 0.08], scale: [0.85, 1.15, 0.85] }}
          transition={{ duration: t.duration, delay: t.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            top: `${t.top}%`,
            left: `${t.left}%`,
            width: `${t.size}px`,
            height: `${t.size}px`,
            backgroundColor: t.isGold ? "#B8860B" : "#8A93A6",
            boxShadow: t.isGold ? "0 0 4px 1px rgba(184,134,11,0.3)" : "none",
          }}
        />
      ))}

      {/* LAYER 7 — Cursor spotlight, muted purple only */}
      {mounted && animationsEnabled && (
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{
            left: spotlightX,
            top: spotlightY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(46,20,90,0.10) 0%, transparent 65%)",
          }}
        />
      )}

      {/* LAYER 8 — Grain + vignette */}
      <div className="royal-grain" />
      <div className="royal-vignette" />
    </div>
  );
}
