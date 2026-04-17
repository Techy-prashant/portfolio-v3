"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { personalInfo } from "@/data/content";
import NotifyModal from "@/components/ui/NotifyModal";

const slides = [
  {
    src: "/myself-data.png",
    label: "Academic",
    persona: "Data Scientist",
    blurb: "Research-first workflows, systems thinking, and measurable outcomes.",
  },
  {
    src: "/myself-digital.png",
    label: "Formal",
    persona: "Digital Expert",
    blurb: "Professional execution with strategic clarity for product and brand goals.",
  },
  {
    src: "/myself-web.png",
    label: "Casual",
    persona: "Web Developer",
    blurb: "Rapid prototyping and clean, human-centered interface decisions.",
  },
];

const roles = ["Full-Stack Developer", "Data Scientist", "Multimedia Technologist"];
const COBALT = "#174EA6";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const previous = (current - 1 + slides.length) % slides.length;
  const next = (current + 1) % slides.length;

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(p => (p + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(p => (p + dir + slides.length) % slides.length);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Monochrome atmosphere layers */}
      <div className="absolute top-0 left-0 w-[560px] h-[560px] bg-black/[0.04] rounded-full blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] bg-black/[0.03] rounded-full blur-[110px] pointer-events-none" />

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
              <span className="text-sm font-mono font-bold text-black tracking-[0.22em] uppercase border border-black/45 bg-white px-3.5 py-2 rounded-full">
                Hello, I'm Prashant
              </span>
            </motion.div>

            {/* Stacked roles — big display text */}
            <div className="space-y-1 mb-12">
              {roles.map((role, i) => (
                <motion.h1
                  key={role}
                  className="text-4xl sm:text-5xl md:text-[52px] xl:text-6xl font-black leading-[1.05] tracking-tight"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: i === roles.length - 1 ? "transparent" : "#000",
                    WebkitTextStroke: i === roles.length - 1 ? `1.1px ${COBALT}` : "0px",
                  }}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {role}
                </motion.h1>
              ))}
            </div>

            <motion.div
              className="mb-10 rounded-2xl border border-black/15 bg-white p-5 shadow-lg shadow-black/10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.45 }}
            >
              <h3 className="text-lg font-bold text-black mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                Portfolio Vision & Self-Critique
              </h3>
              <ul className="space-y-2 text-[15px] leading-relaxed text-stone-800">
                <li>Monochromatic black-and-white system with restrained deep cobalt accents for key interactions.</li>
                <li>Explicit persona switcher with image thumbnails to replace ambiguous card indicators.</li>
                <li>Clear CTA hierarchy: primary Download CV, secondary outlined contact, tertiary lightweight Notify Me.</li>
                <li>Planned contrast audit pass to ensure all helper labels and muted text meet WCAG minimums.</li>
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href={personalInfo.resumeUrl}
                download
                className="group flex items-center gap-3 bg-black text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-stone-800 transition-all duration-300 shadow-lg shadow-black/25"
              >
                Download CV
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-sm font-semibold text-black transition-colors border border-black/65 px-7 py-3.5 rounded-full hover:border-black hover:bg-black/5"
              >
                Get in touch
              </a>
              <button
                onClick={() => setNotifyOpen(true)}
                className="text-sm font-medium text-stone-700 underline underline-offset-4 hover:text-black transition-colors"
                style={{ textDecorationColor: COBALT }}
              >
                Notify Me
              </button>
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-start justify-end h-[600px] lg:h-[700px] xl:h-[800px] max-h-[90vh] pt-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Layered monochrome portrait card */}
            <div className="relative w-[1000px] h-[1500px] max-w-full max-h-full rounded-3xl">
              <div className="absolute inset-0 translate-x-6 -translate-y-4 rounded-3xl border border-black/15 bg-white overflow-hidden">
                <img
                  src={slides[next].src}
                  alt={`${slides[next].label} layer`}
                  className="h-full w-full object-cover object-top grayscale opacity-35"
                  width="1000"
                  height="1500"
                />
              </div>
              <div className="absolute inset-0 translate-x-3 -translate-y-2 rounded-3xl border border-black/20 bg-white overflow-hidden">
                <img
                  src={slides[previous].src}
                  alt={`${slides[previous].label} layer`}
                  className="h-full w-full object-cover object-top grayscale opacity-55"
                  width="1000"
                  height="1500"
                />
              </div>

              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/35 border border-black/30">
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
                    alt={`${slides[current].label} persona portrait`}
                    className="h-full w-full object-cover object-top grayscale"
                    width="1000"
                    height="1500"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Legible card heading with solid backing */}
                <div className="absolute top-4 left-4 right-4 rounded-xl border border-black/20 bg-white/95 p-4 shadow-lg shadow-black/15 text-left">
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-stone-700">Persona</p>
                  <p className="text-black font-bold text-2xl leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {slides[current].label}
                  </p>
                  <p className="text-sm text-stone-800 mt-1.5">{slides[current].blurb}</p>
                </div>

                {/* Explicit thumbnail switcher */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-black/15 bg-white/95 p-3 shadow-lg shadow-black/15">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-stone-700 mb-2">Switch persona</p>
                  <div className="flex items-center gap-2.5">
                    {slides.map((slide, i) => {
                      const active = i === current;
                      return (
                        <button
                          key={slide.label}
                          onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                          className="flex-1"
                          aria-label={`Show ${slide.label} persona`}
                        >
                          <div
                            className="rounded-lg border p-1.5 transition-all duration-300"
                            style={{
                              borderColor: active ? COBALT : "rgba(0,0,0,0.25)",
                              boxShadow: active ? `0 0 0 2px ${COBALT}22` : "none",
                            }}
                          >
                            <img
                              src={slide.src}
                              alt={`${slide.label} thumbnail`}
                              className={`w-full h-16 object-cover rounded-md ${active ? "grayscale-0" : "grayscale"}`}
                            />
                            <p className="text-[11px] font-semibold mt-1 text-center" style={{ color: active ? COBALT : "#1f2937" }}>
                              {slide.label}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider controls at extreme right — vertical */}
            <div className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
              <button
                onClick={() => go(-1)}
                className="w-9 h-9 rounded-full bg-white border border-black/30 flex items-center justify-center text-black hover:bg-black/5 transition-all"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                onClick={() => go(1)}
                className="w-9 h-9 rounded-full bg-white border border-black/30 flex items-center justify-center text-black hover:bg-black/5 transition-all"
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
