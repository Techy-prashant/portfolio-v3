"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Film, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { personalInfo } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-28 px-6 sm:px-10 lg:pl-28 lg:pr-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Progressive Divider */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-electric">
            01 / BACKGROUND
          </span>
          <div className="flex-1 section-divider" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: EDITORIAL NARRATIVE & MANIFESTO              */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-theme-primary tracking-tight leading-[1.1] mb-8"
            >
              Turning algorithmic precision into human resonance.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5 text-theme-secondary text-base sm:text-lg leading-relaxed font-normal"
            >
              <p>
                I'm a 2nd-year B.S. student in Data Science and Applications at the{" "}
                <span className="text-theme-primary font-semibold">Indian Institute of Technology Madras</span>.
                My coursework and research center on machine learning, algorithmic efficiency, and scalable systems, which I continuously translate into production software.
              </p>
              <p>
                Beyond code, I direct cross-functional creative teams, spearhead content strategy reaching millions of viewers, and co-founded an agency from the ground up. Whether architecting an operating system interface or directing a festival campaign, I treat design and engineering as two facets of the same discipline.
              </p>
            </motion.div>

            {/* Editorial Quote / Signature Accent with Unique Editorial Font & No Long Dashes */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 p-7 sm:p-8 rounded-3xl glass-surface border border-theme relative overflow-hidden shadow-apple-dark"
            >
              <p
                className="font-libre italic font-medium text-xl sm:text-2xl md:text-[1.65rem] text-theme-primary leading-relaxed tracking-normal"
                style={{
                  fontFamily: "var(--font-libre), 'Libre Baskerville', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                “Great systems and great stories are engineered the exact same way, with relentless attention to craft.”
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-theme-muted">
                <span className="font-bold tracking-wider text-theme-primary">Prashant Tiwari</span>
                <span className="flex items-center gap-1.5 text-theme-accent font-semibold">
                  <MapPin size={13} /> Chennai, India
                </span>
              </div>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: INSTITUTIONAL CREDENTIAL & DUAL PILLARS     */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* IIT Madras Degree Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-surface rounded-3xl p-7 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-theme-pill border border-theme text-theme-primary flex items-center justify-center flex-shrink-0 shadow-md">
                  <GraduationCap size={22} className="text-theme-accent" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-theme-accent">
                    Academic Degree
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-theme-primary leading-snug mt-0.5">
                    IIT Madras
                  </h3>
                  <p className="text-xs text-theme-muted">
                    Indian Institute of Technology Madras
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-theme">
                <div className="flex items-center justify-between text-xs font-semibold text-theme-primary">
                  <span>B.S. in Data Science & Applications</span>
                  <span className="font-mono text-theme-accent">2024 - 2028</span>
                </div>
                <p className="text-xs text-theme-muted">
                  Focus: Machine Learning, Statistical Inference, System Architectures.
                </p>
              </div>
            </motion.div>

            {/* The Dual Pillars: Logic & Canvas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
            >
              {/* Pillar 1: The Logic */}
              <div className="glass-surface rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-theme-accent flex items-center justify-center">
                    <Code2 size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-theme-primary">The Logic</h4>
                </div>
                <p className="text-xs text-theme-muted leading-relaxed">
                  Full-stack engineering, algorithms, C/C++ systems design, data pipelines, and responsive web platforms.
                </p>
              </div>

              {/* Pillar 2: The Canvas */}
              <div className="glass-surface rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-theme-pill border border-theme text-theme-primary flex items-center justify-center">
                    <Film size={16} className="text-theme-accent" />
                  </div>
                  <h4 className="text-sm font-bold text-theme-primary">The Canvas</h4>
                </div>
                <p className="text-xs text-theme-muted leading-relaxed">
                  Creative direction, cinematic video editing, brand campaigns with 1M+ reach, and visual storytelling.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
