"use client";

import { motion } from "framer-motion";
import { Terminal, Globe, Cpu, Clapperboard, Check } from "lucide-react";

type SkillGroup = {
  title: string;
  category: string;
  icon: typeof Terminal;
  description: string;
  skills: { name: string; tag: string }[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Systems & Core Languages",
    category: "ENGINEERING",
    icon: Terminal,
    description: "Low-level foundations and versatile programming languages for scalable logic.",
    skills: [
      { name: "Python", tag: "Data / Backend" },
      { name: "C / C++", tag: "Systems / Algorithms" },
      { name: "TypeScript", tag: "Strict Types" },
      { name: "JavaScript (ES6+)", tag: "Runtime Core" },
      { name: "Linux / POSIX", tag: "CLI / Bash" },
    ],
  },
  {
    title: "Full-Stack Web Platforms",
    category: "ARCHITECTURE",
    icon: Globe,
    description: "Modern, reactive web applications with production-grade performance.",
    skills: [
      { name: "Next.js / React", tag: "SSR / App Router" },
      { name: "Node.js / Express", tag: "REST APIs" },
      { name: "Tailwind CSS", tag: "Design Systems" },
      { name: "MongoDB", tag: "Document Store" },
      { name: "Vercel / Netlify", tag: "Deployment / CI" },
    ],
  },
  {
    title: "Data Science & Applications",
    category: "ANALYTICS & ML",
    icon: Cpu,
    description: "Rigorous coursework and algorithmic analysis at IIT Madras.",
    skills: [
      { name: "Machine Learning Workflows", tag: "Applied Models" },
      { name: "Data Structures & Algorithms", tag: "Optimization" },
      { name: "Statistical Inference", tag: "Analysis" },
      { name: "Data Processing Pipelines", tag: "ETL" },
    ],
  },
  {
    title: "Multimedia & Visual Direction",
    category: "CREATIVE SUITE",
    icon: Clapperboard,
    description: "End-to-end creative production from script to final color grade and motion design.",
    skills: [
      { name: "DaVinci Resolve Studio", tag: "Color / Edit" },
      { name: "Adobe Premiere Pro", tag: "Narrative Cut" },
      { name: "Adobe After Effects", tag: "Motion Design" },
      { name: "Figma", tag: "UI / Prototypes" },
      { name: "Blender 3D", tag: "Spatial Assets" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 sm:px-10 lg:pl-28 lg:pr-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Progressive Divider */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-electric">
            03 / CAPABILITIES
          </span>
          <div className="flex-1 section-divider" />
        </div>

        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-theme-primary tracking-tight leading-[1.1] mb-4"
          >
            The technical & creative toolkit.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-theme-muted text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            A curated stack built around systems programming, modern web frameworks, data analysis at IIT Madras, and high-impact digital media production.
          </motion.p>
        </div>

        {/* 4 Categorical Quadrants */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-surface rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-theme">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-theme-accent flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-theme-muted">
                      {group.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-theme-primary leading-snug mb-2">
                    {group.title}
                  </h3>
                  <p className="text-xs text-theme-muted leading-relaxed mb-6">
                    {group.description}
                  </p>

                  {/* Skills List without arbitrary percentages */}
                  <ul className="space-y-2.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-theme-pill border border-theme hover:border-theme-accent transition-colors"
                      >
                        <span className="font-semibold text-theme-primary">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono text-theme-muted">
                          {skill.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
