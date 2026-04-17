"use client";

import { motion } from "framer-motion";
import { experienceData, achievementsData } from "@/data/content";
import { Trophy } from "lucide-react";

const typeColors: Record<string, string> = {
  Leadership: "text-stone-800 bg-stone-100 border-stone-300",
  Entrepreneurship: "text-stone-800 bg-stone-100 border-stone-300",
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Experience</span>
          <span className="flex-1 h-px bg-stone-900/20" />
          <span className="text-sm font-mono font-bold text-stone-700 tracking-widest uppercase">02</span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "'Syne', sans-serif" }}>
              Where I've been.
            </motion.h2>

            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-stone-900/15" />
              <div className="space-y-10">
                {experienceData.map((exp, i) => (
                  <motion.div key={i} className="relative pl-12" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                    <div className="absolute left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-stone-700 shadow-sm" />
                    <div className="glass-card rounded-2xl p-5 shadow-xl shadow-black/20">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-base font-bold text-stone-900 leading-snug">{exp.role}</h3>
                          <p className="text-sm text-stone-700 mt-0.5">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-xs font-mono font-bold text-stone-700">{exp.duration}</span>
                          <span className={`text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[exp.type] ?? "text-stone-700 bg-stone-100 border-stone-300"}`}>{exp.type}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((d, j) => (
                          <li key={j} className="flex gap-2.5 text-sm text-stone-700 leading-relaxed">
                            <span className="text-stone-700 mt-1.5 flex-shrink-0 text-xs">▹</span>{d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} style={{ fontFamily: "'Syne', sans-serif" }}>
              Milestones.
            </motion.h2>
            <div className="space-y-3">
              {achievementsData.map((ach, i) => (
                <motion.div key={i} className="glass-card flex gap-3 items-start rounded-xl p-4 shadow-lg shadow-black/15" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <Trophy size={13} className="text-stone-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-700 leading-relaxed">{ach}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
