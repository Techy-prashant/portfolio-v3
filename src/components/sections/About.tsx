"use client";

import { motion } from "framer-motion";
import { aboutContent, personalInfo } from "@/data/content";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }),
};

export default function About() {
  return (
    <section id="about" className="py-28 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-16" variants={fadeUp} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>About</span>
          <span className="flex-1 h-px bg-stone-900/20" />
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">01</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <motion.h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-8 leading-tight" variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ fontFamily: "'Syne', sans-serif" }}>
              Turning complex systems into elegant solutions.
            </motion.h2>
            {aboutContent.paragraphs.map((para, i) => (
              <motion.p key={i} className="text-stone-700 leading-relaxed mb-5 text-[15px]" variants={fadeUp} custom={i + 2} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {para}
              </motion.p>
            ))}
          </div>

          <motion.div className="space-y-4" variants={fadeUp} custom={3} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="glass-card rounded-2xl p-6 shadow-lg shadow-black/15">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 w-10 h-10 rounded-xl bg-stone-900/5 border border-stone-900/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-stone-700" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">Education</p>
                  <p className="text-stone-900 font-semibold">Indian Institute of Technology Madras</p>
                  <p className="text-sm text-stone-600 mt-1">B.S. in Data Science & Applications</p>
                  <p className="text-xs font-mono text-stone-700 font-bold mt-1.5">2nd Year · 2024 – 2028</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 shadow-lg shadow-black/15">
              <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-4">Contact</p>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: Phone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                  { icon: MapPin, label: personalInfo.location, href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 text-stone-600 hover:text-stone-900 transition-colors group">
                    <Icon size={14} className="text-stone-400 group-hover:text-stone-700 flex-shrink-0" />
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "1M+", label: "Users Reached" },
                { value: "150K+", label: "Campaign Views" },
                { value: "#72", label: "HackerRank Global" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center shadow-lg shadow-black/15">
                  <div className="text-xl font-black text-stone-900 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{stat.value}</div>
                  <div className="text-[10px] text-stone-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
