"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Terminal,
  Cpu,
  Clapperboard,
  Compass,
} from "lucide-react";
import dynamic from "next/dynamic";
import { heroContent, personalInfo } from "@/data/content";

const CircadianClock = dynamic(() => import("@/components/ui/CircadianClock"), {
  ssr: false,
});

const personas = [
  {
    id: "data",
    role: "Data Scientist",
    tagline: "Algorithms & Machine Learning",
    image:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/data%20science.png",
    icon: Cpu,
    stat: "IIT Madras DS",
  },
  {
    id: "web",
    role: "Full-Stack Engineer",
    tagline: "High-Performance Systems",
    image:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/full%20stack.png",
    icon: Terminal,
    stat: "ProjectOS Contributor",
  },
  {
    id: "digital",
    role: "Multimedia Lead",
    tagline: "Visual Storytelling at Scale",
    image:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/creative%20design.png",
    icon: Clapperboard,
    stat: "1M+ Net Reach",
  },
];

const highlights = [
  { value: "1M+", label: "Audience Reach", detail: "Campaigns Directed" },
  { value: "150K+", label: "Video Views", detail: "Fest Media" },
  { value: "IIT Madras", label: "B.S. Data Science", detail: "Class of '28" },
  { value: "Rank 72", label: "National Coding", detail: "HackerRank Global" },
];

export default function Hero() {
  const [activePersona, setActivePersona] = useState(0);
  const [prevPersona, setPrevPersona] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  // Preload all 3 persona images in the browser for instant, flicker-free switching
  useEffect(() => {
    if (typeof window !== "undefined") {
      personas.forEach((p) => {
        const img = new window.Image();
        img.src = p.image;
      });
    }
  }, []);

  // Safe persona selection with two-layer crossfade coordination
  const handleSelectPersona = (index: number) => {
    if (index === activePersona) return;
    setPrevPersona(activePersona);
    setActivePersona(index);
  };

  // Clear previous persona after transition completes to reset background layer
  useEffect(() => {
    if (prevPersona !== null) {
      const timer = window.setTimeout(() => {
        setPrevPersona(null);
      }, 380);
      return () => window.clearTimeout(timer);
    }
  }, [activePersona, prevPersona]);

  // Subtle desktop pointer responsiveness
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const current = personas[activePersona];
  const Icon = current.icon;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[auto] lg:min-h-screen flex flex-col justify-center pt-24 pb-8 sm:pt-28 lg:py-0 px-4 sm:px-8 lg:pl-28 lg:pr-12"
    >
      {/* Dynamic Ambient Spotlights that dynamically adapt to circadian theme */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-theme-accent/12 blur-[140px] -z-10 transition-transform duration-700 ease-out hidden sm:block"
        style={{
          transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px, 0)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-theme-accent/8 blur-[150px] -z-10 transition-transform duration-700 ease-out hidden sm:block"
        style={{
          transform: `translate3d(${-mousePos.x * 1.2}px, ${-mousePos.y * 1.2}px, 0)`,
        }}
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col">
        {/* Top Header Row with Interactive Orbital Local Clock - Visible on Desktop only */}
        <div className="hidden lg:flex w-full justify-end items-center mb-6 lg:mb-8 pt-2">
          <CircadianClock className="lg:fixed lg:top-7 lg:right-10 lg:z-[90]" />
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & INTRO                 */}
          {/* ========================================================= */}
          <div className="flex flex-col items-start z-10 w-full">
            {/* Eyebrow Label with Technical Badge (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:flex items-center gap-2.5 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-pill border border-theme shadow-apple-sm text-xs font-mono font-bold text-theme-accent tracking-wide">
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
                PRASHANT TIWARI
              </span>
              <span className="text-xs font-mono text-theme-muted hidden sm:inline-block">
                · IIT MADRAS DATA SCIENCE
              </span>
            </motion.div>

            {/* Redesigned Hero Headline: Soria Bold attention-seeker + Calligraphy Italic with minimal line gap */}
            <div className="mt-2 sm:mt-0 mb-5 sm:mb-6 select-none overflow-visible w-full">
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="tracking-tight"
              >
                {/* First Line: Soria Display Serif - for "Where logic" */}
                <span
                  className="block font-soria font-medium tracking-tight text-theme-primary text-[2.95rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] leading-[0.88] lg:leading-[0.82]"
                  style={{ fontFamily: "'Soria', serif", fontWeight: 900 }}
                >
                  Where logic
                </span>

                {/* Second Line: Playfair Display Serif - Italic for "meets canvas." */}
                <span
                  className="block font-playfair italic font-medium text-theme-primary text-[3.45rem] sm:text-7xl md:text-8xl xl:text-[6.4rem] leading-[0.9] lg:leading-[0.85] -mt-2 sm:-mt-5 md:-mt-7 lg:-mt-8"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 1200,
                  }}
                >
                  meets <span className="text-theme-accent">canvas.</span>
                </span>
              </motion.h1>
            </div>

            {/* Story Subheadline & Core Description (Desktop only) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="hidden lg:block text-lg sm:text-xl text-theme-secondary font-medium max-w-xl leading-snug mb-3"
            >
              {heroContent.subheadline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="hidden lg:block text-sm sm:text-base text-theme-muted max-w-xl leading-relaxed mb-8 font-normal"
            >
              Data Science student at IIT Madras bridging engineering precision with high-impact creative media direction. Building full-stack architectures, OS initiatives, and campaigns reaching millions.
            </motion.p>

            {/* Primary Action Buttons - Side-by-side on mobile and desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-6 lg:mb-10 w-full sm:w-auto max-w-md"
            >
              {/* Download Resume (Primary Tactile Button) */}
              <a
                href={personalInfo.resumeUrl}
                download
                className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 py-3 sm:px-7 sm:py-3.5 rounded-xl sm:rounded-2xl bg-theme-primary text-theme-invert font-semibold text-xs sm:text-sm shadow-apple-md hover:bg-theme-accent hover:text-white transition-all duration-300 hover:-translate-y-0.5 text-center truncate"
              >
                <span className="truncate">Download Resume</span>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Explore Projects (Frosted Glass Outline) */}
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl glass-surface hover:border-theme-accent text-theme-primary font-semibold text-xs sm:text-sm border border-theme shadow-apple-sm transition-all duration-300 hover:-translate-y-0.5 text-center truncate"
              >
                <Compass size={14} className="shrink-0 text-theme-accent" />
                <span className="truncate">Explore Projects</span>
              </button>
            </motion.div>

            {/* Key Metrics / Editorial Highlights - Compact 2x2 grid on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-xl"
            >
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-surface border border-theme shadow-apple-sm flex flex-col justify-center"
                >
                  <span className="font-sans font-extrabold text-sm sm:text-lg text-theme-primary tracking-tight leading-tight">
                    {h.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-theme-muted mt-0.5 truncate">
                    {h.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: LAYERED EDITORIAL PORTRAIT COMPOSITION      */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px] mx-auto mt-6 lg:mt-0"
          >
            {/* Frosted Layered Frame */}
            <div className="relative w-full aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] p-2.5 sm:p-3 glass-surface border border-theme shadow-2xl transition-transform duration-500 ease-out hover:border-theme-accent">
              {/* Top Frame Status Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 mb-2 border-b border-theme">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" />
                  <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-theme-muted font-bold">
                    Gallery
                  </span>
                </div>
                <span className="text-[11px] sm:text-[13px] font-mono text-theme-muted">
                  Roll No. 24F2001089
                </span>
              </div>

              {/* Inner Image Canvas - Persistent Layered Cross-fading (Zero Jitter/Flicker) */}
              <div
                className="relative w-full h-[calc(100%-68px)] sm:h-[calc(100%-72px)] rounded-[1.5rem] sm:rounded-[1.8rem] overflow-hidden isolate bg-gradient-to-b from-black/80 via-black/50 to-black"
                style={{
                  transform: "translateZ(0)",
                }}
              >
                {personas.map((p, idx) => {
                  const isActive = activePersona === idx;
                  const isPrev = prevPersona === idx;

                  // Active image is always on top (z-20) fading in
                  // Previous image stays solid underneath (z-10) during transition to prevent dark flash
                  // Inactive images are z-0 and opacity 0
                  const zIndex = isActive ? 20 : isPrev ? 10 : 0;
                  const targetOpacity = isActive || isPrev ? 1 : 0;

                  return (
                    <motion.div
                      key={p.id}
                      initial={false}
                      animate={{
                        opacity: targetOpacity,
                      }}
                      transition={{
                        opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      }}
                      className={`absolute inset-0 w-full h-full rounded-[1.5rem] sm:rounded-[1.8rem] overflow-hidden select-none ${
                        isActive ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                      style={{
                        zIndex,
                        transform: "translateZ(0)",
                        willChange: "opacity",
                      }}
                    >
                      <Image
                        src={p.image}
                        alt={`${personalInfo.name} - ${p.role}`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-cover object-top filter contrast-[1.04] pointer-events-none select-none"
                      />
                      {/* Atmospheric lighting gradient on image bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  );
                })}

                {/* Floating Lens Info Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-30 flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl glass-surface border border-theme shadow-apple-sm">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-theme-pill text-theme-accent flex items-center justify-center shrink-0">
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={current.id}
                          initial={{ opacity: 0, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-[11px] sm:text-xs font-bold text-theme-primary leading-tight truncate">
                            {current.role}
                          </p>
                          <p className="text-[9px] sm:text-[10px] font-mono text-theme-muted truncate">
                            {current.tagline}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="text-[9px] sm:text-[10px] font-mono font-bold text-theme-accent px-1.5 sm:px-2 py-0.5 rounded-md bg-theme-pill border border-theme shrink-0 ml-2"
                    >
                      {current.stat}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Persona Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 mt-2 px-0.5">
                {personas.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPersona(idx)}
                    className={`py-1.5 px-1.5 sm:px-2 rounded-xl text-[10px] sm:text-[11px] font-mono font-semibold transition-all duration-200 text-center truncate border ${
                      activePersona === idx
                        ? "theme-tab-active font-bold border-theme-accent/50"
                        : "bg-theme-pill border-transparent text-theme-muted hover:text-theme-primary"
                    }`}
                  >
                    {p.role.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator (Desktop only) */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-label="Scroll to about section"
        className="mt-8 mx-auto hidden lg:inline-flex items-center gap-2 text-xs font-mono text-theme-muted hover:text-theme-primary tracking-widest uppercase transition-colors"
      >
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={14} className="animate-bounce text-theme-accent" />
      </motion.button>
    </section>
  );
}
