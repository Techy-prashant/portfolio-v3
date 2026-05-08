"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { heroContent, personalInfo } from "@/data/content";

const slides = [
  { src: "/myself-data.png", label: "Data Scientist" },
  { src: "/myself-digital.png", label: "Digital Expert" },
  { src: "/myself-web.png", label: "Web Developer" },
];

const roles = personalInfo.roles.slice(0, 3);
const metrics = ["1M+ Reach", "150K+ Views", "3 Domains"];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    slides.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(p => (p + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(p => (p + dir + slides.length) % slides.length);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-transparent"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[#0047AB]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-black/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-14 sm:pb-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-8 items-center min-h-[calc(100vh-96px)]">
          <motion.div
            className="order-1 lg:order-1"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2.5 rounded-full border border-[#0047AB]/30 bg-white/80 px-4 py-2 mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sparkles size={14} className="text-[#0047AB]" />
              <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#0047AB] font-semibold">
                {heroContent.greeting} {personalInfo.name}
              </span>
            </motion.div>

            <div className="mb-5 space-y-2">
              {heroContent.headline.split("\n").map((line, index) => (
                <motion.h1
                  key={line}
                  className="text-[2.35rem] sm:text-5xl md:text-6xl xl:text-[4.3rem] leading-[0.94] tracking-tight text-[#111111] font-black"
                  style={{ fontFamily: "var(--font-syne)" }}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.h1>
              ))}
            </div>

            <motion.p
              className="text-base sm:text-lg text-stone-700 max-w-xl leading-relaxed mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
              {heroContent.subheadline}
            </motion.p>
            <motion.p
              className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0 }}
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2.5 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              {roles.map((role) => (
                <span
                  key={role}
                  className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] rounded-full border border-black/20 bg-white/80 text-stone-700 px-3.5 py-1.5"
                >
                  {role}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
            >
              <a
                href={personalInfo.resumeUrl}
                download
                className="group inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
              >
                Download Resume
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#0047AB]/40 bg-white/75 px-6 py-3 text-sm font-semibold text-[#0047AB] transition-all duration-300 hover:border-[#0047AB] hover:bg-white"
              >
                See Projects
              </a>
            </motion.div>

            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.68 }}
            >
              {metrics.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-xs sm:text-sm font-semibold text-stone-700"
                >
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.button
              onClick={() => scrollToSection("about")}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] text-stone-700 hover:bg-white transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              Scroll to explore
              <ArrowDown size={14} />
            </motion.button>
          </motion.div>

          <motion.div
            className="order-2 lg:order-2 relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 42 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute -top-4 left-2 sm:left-6 rounded-2xl border border-[#0047AB]/30 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-sm z-10"
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#0047AB]">Current Mode</p>
              <p className="text-sm font-semibold text-stone-800">{slides[current].label}</p>
            </motion.div>

            <div className="relative w-full max-w-[440px]">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#0047AB]/25 bg-white/55 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-[1.4rem] aspect-[4/5] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.75),rgba(238,243,250,0.98))]">
                  <AnimatePresence mode="sync" custom={direction} initial={false}>
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full"
                    >
                      <img
                        src={slides[current].src}
                        alt={slides[current].label}
                        className="h-full w-full object-cover object-top"
                        loading="eager"
                        decoding="async"
                        width="1000"
                        height="1500"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2.5">
                <button
                  onClick={() => go(-1)}
                  className="h-9 w-9 rounded-full border border-[#0047AB]/35 bg-white/75 text-[#111111] flex items-center justify-center transition-all hover:bg-white"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > current ? 1 : -1);
                        setCurrent(i);
                      }}
                      className={`rounded-full border transition-all duration-300 ${
                        i === current
                          ? "w-6 h-2 bg-[#0047AB] border-[#0047AB]"
                          : "w-2 h-2 bg-transparent border-[#0047AB]/45 hover:border-[#0047AB]/70"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => go(1)}
                  className="h-9 w-9 rounded-full border border-[#0047AB]/35 bg-white/75 text-[#111111] flex items-center justify-center transition-all hover:bg-white"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
