"use client";

import { motion } from "framer-motion";
import { experienceData, achievementsData } from "@/data/content";
import { Trophy, Award, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-28 px-4 sm:px-8 lg:pl-28 lg:pr-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Progressive Divider */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10 lg:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-electric">
            02 / TRACK RECORD
          </span>
          <div className="flex-1 section-divider" />
        </div>

        {/* ========================================================= */}
        {/* MOBILE LAYOUT: COMPACT VERTICAL TIMELINE & RÉSUMÉ PREVIEW */}
        {/* ========================================================= */}
        <div className="lg:hidden flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-display font-extrabold text-theme-primary tracking-tight leading-snug mb-5"
          >
            Where leadership meets execution.
          </motion.h2>

          <div className="relative pl-5 border-l border-theme space-y-4">
            {experienceData.map((exp, idx) => {
              const isPresent = exp.duration.toLowerCase().includes("present");

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="relative"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[25px] top-1.5 z-10 flex items-center justify-center">
                    {isPresent ? (
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute w-3 h-3 rounded-full bg-blue-500 opacity-75" />
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-theme" />
                      </div>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-theme-muted border-2 border-theme" />
                    )}
                  </div>

                  {/* Compact Card */}
                  <div className="glass-surface rounded-2xl p-3.5 sm:p-4 border border-theme">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-theme-accent px-2 py-0.5 rounded-md bg-blue-500/10">
                        {exp.type}
                      </span>
                      <span className="text-[10px] font-mono text-theme-muted">
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-theme-primary leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-semibold text-theme-muted mt-0.5">
                      {exp.company}
                    </p>

                    <ul className="space-y-1.5 mt-2.5 pt-2.5 border-t border-theme text-xs text-theme-secondary leading-relaxed">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <span className="text-theme-accent flex-shrink-0 text-[10px] mt-0.5">▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Compact Verified Recognitions Footer Card */}
          <div className="mt-5 glass-surface rounded-2xl p-3.5 sm:p-4 border border-theme">
            <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-theme">
              <Trophy size={14} className="text-theme-accent" />
              <h4 className="text-xs font-bold text-theme-primary">Key Honors & Recognitions</h4>
            </div>
            <div className="space-y-1.5">
              {achievementsData.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-theme-secondary leading-snug">
                  <CheckCircle2 size={13} className="text-theme-accent shrink-0 mt-0.5" />
                  <span className="text-theme-primary font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP LAYOUT: 100% UNCHANGED COMPLETE TIMELINE          */}
        {/* ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: EDITORIAL TIMELINE */}
          <div className="lg:col-span-8 flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-theme-primary tracking-tight leading-[1.1] mb-12"
            >
              Where leadership meets execution.
            </motion.h2>

            <div className="relative pl-6 sm:pl-8 border-l border-theme space-y-12">
              {experienceData.map((exp, idx) => {
                const isPresent = exp.duration.toLowerCase().includes("present");

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 z-10 flex items-center justify-center">
                      {isPresent ? (
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute w-4 h-4 rounded-full bg-blue-500 opacity-75" />
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-theme shadow-sm" />
                        </div>
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full bg-theme-muted border-2 border-theme group-hover:bg-theme-accent transition-colors" />
                      )}
                    </div>

                    {/* Timeline Card */}
                    <div className="glass-surface rounded-3xl p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-theme-accent px-2.5 py-0.5 rounded-md bg-blue-500/10 mb-2">
                            {exp.type}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-theme-primary leading-snug">
                            {exp.role}
                          </h3>
                          <p className="text-sm font-semibold text-theme-muted mt-0.5">
                            {exp.company}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-theme-primary px-3 py-1 rounded-full bg-theme-pill border border-theme">
                          <Calendar size={12} className="text-theme-accent" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 mt-4 pt-4 border-t border-theme text-sm text-theme-secondary leading-relaxed">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="text-theme-accent mt-1 flex-shrink-0 text-xs">▹</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: VERIFIED HONORS & RECOGNITIONS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-surface rounded-3xl p-7"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme">
                <div className="w-10 h-10 rounded-2xl bg-theme-pill border border-theme text-theme-primary flex items-center justify-center shadow-md">
                  <Trophy size={18} className="text-theme-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-theme-primary">Recognitions</h4>
                  <p className="text-[11px] font-mono text-theme-muted">
                    Verified Highlights
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {achievementsData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-theme-secondary leading-relaxed"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-theme-accent flex-shrink-0 mt-0.5"
                    />
                    <span className="text-theme-primary font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
