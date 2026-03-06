"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { personalInfo } from "@/data/content";

const slides = [
  { src: "/myself-data.png", label: "Data Scientist" },
  { src: "/myself-digital.png", label: "Digital Expert" },
  { src: "/myself-web.png", label: "Web Developer" },
];

const roles = ["Full-Stack Developer", "Data Scientist", "Multimedia Technologist"];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "white",
      }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Soft glow blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gray-200/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gray-300/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">

          {/* LEFT — Roles text */}
          <div className="flex flex-col justify-center">
            {/* Greeting chip */}
            <motion.div
              className="inline-flex items-center gap-2 mb-10 w-fit"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-xs font-mono text-black/70 tracking-[0.25em] uppercase border border-black/20 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                Hello, I'm Prashant
              </span>
            </motion.div>

            {/* Stacked roles — big display text */}
            <div className="space-y-1 mb-12">
              {roles.map((role, i) => (
                <motion.h1
                  key={role}
                  className="text-4xl sm:text-5xl md:text-[52px] xl:text-6xl font-black leading-[1.05] tracking-tight text-black"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {role}
                </motion.h1>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href={personalInfo.resumeUrl}
                download
                className="group flex items-center gap-3 bg-black text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-black/20"
              >
                Download CV
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-sm font-semibold text-black/70 hover:text-black transition-colors border border-black/20 px-7 py-3.5 rounded-full hover:border-black/40 hover:bg-black/5 backdrop-blur-sm"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-start justify-end h-[600px] lg:h-[700px] xl:h-[800px] max-h-[90vh] pt-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Slider container — full portrait height */}
            <div className="relative w-[1000px] h-[1500px] max-w-full max-h-full overflow-hidden rounded-3xl shadow-2xl shadow-black/40 border border-black/10">
              <AnimatePresence mode="wait" custom={direction}>
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
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full"
                >
                  <img
                    src={slides[current].src}
                    alt={slides[current].label}
                    className="h-full w-full object-cover object-top"
                    width="1000"
                    height="1500"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slide label overlay - moved and restyled */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 text-left">
                <p className="text-black text-[11px] font-mono uppercase tracking-widest">Myself as</p>
                <p className="text-black font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {slides[current].label}
                </p>
              </div>
            </div>

            {/* Slider controls at extreme right — vertical */}
            <div className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
              <button
                onClick={() => go(-1)}
                className="w-9 h-9 rounded-full bg-black/10 border border-black/20 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black/20 transition-all"
              >
                <ChevronLeft size={15} />
              </button>

              {/* Dot indicators */}
              <div className="flex flex-col gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${i === current ? "w-1.5 h-4 bg-black" : "w-1.5 h-1.5 bg-black/30"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                className="w-9 h-9 rounded-full bg-black/10 border border-black/20 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black/20 transition-all"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
