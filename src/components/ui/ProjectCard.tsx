"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/content";

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative glass-card rounded-2xl overflow-hidden shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 5, delay: index * 0, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <motion.img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-mono uppercase tracking-widest bg-white/95 text-stone-800 font-bold border border-stone-300 px-2 py-1 rounded-full">{project.category}</span>
        </div>
        <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 border border-stone-300 rounded-full p-2 text-stone-800 hover:text-black">
          <ExternalLink size={13} />
        </a>
      </div>
      <div className="p-5">
        <div className="mb-1"><span className="text-xs font-mono text-stone-700 uppercase tracking-widest font-bold">{project.role}</span></div>
        <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-stone-700 leading-relaxed mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs font-mono bg-stone-100 text-stone-800 font-semibold border border-stone-300 px-2 py-0.5 rounded-md">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
