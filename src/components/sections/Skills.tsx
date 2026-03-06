"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/content";
import ProgressBar from "@/components/ui/ProgressBar";

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Skills</span>
          <span className="flex-1 h-px bg-stone-900/20" />
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">03</span>
        </motion.div>
        <motion.h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "'Syne', sans-serif" }}>
          The toolkit.
        </motion.h2>
        <motion.p className="text-stone-600 text-sm mb-14 max-w-md" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
          Technologies and tools I work with daily — from code to canvas.
        </motion.p>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {skillsData.map((category, i) => (
            <motion.div key={category.category} className="glass-card rounded-2xl p-6 shadow-xl shadow-black/20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <h3 className="text-xs font-mono text-stone-800 font-bold uppercase tracking-widest mb-6 pb-3 border-b border-stone-900/10">{category.category}</h3>
              {category.skills.map((skill) => (
                <ProgressBar key={skill.name} name={skill.name} percentage={skill.percentage} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
