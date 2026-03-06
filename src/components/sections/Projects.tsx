"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { projectsData } from "@/data/content";
import ProjectCard from "@/components/ui/ProjectCard";
import { ExternalLink, Play } from "lucide-react";

const tabs = ["Tech Projects", "Content Projects", "Creative Frames"] as const;
type Tab = (typeof tabs)[number];

const contentProjects = [
  { id: "c1", title: "Paradox IIT Madras — Event Highlights", description: "Full event coverage reel for Paradox, IIT Madras's annual techno-management fest. Over 60K views.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", tags: ["DaVinci Resolve", "After Effects", "Event"] },
  { id: "c2", title: "Namdapha House — Cultural Fest Promo", description: "Cinematic promo produced for the annual cultural festival. Reached 1M+ users across platforms.", videoUrl: "https://www.w3schools.com/html/movie.mp4", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80", tags: ["Premiere Pro", "Blender", "Motion Graphics"] },
  { id: "c3", title: "Adniko — Brand Campaign", description: "Startup brand launch campaign video for Adniko. End-to-end production from script to colour grade.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80", tags: ["Waveform 13", "Canva Pro", "Brand"] },
];

const creativeFrames = [
  { id: "f1", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Architecture" },
  { id: "f2", src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", alt: "City Lights" },
  { id: "f3", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", alt: "Mountains" },
  { id: "f4", src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80", alt: "Nature" },
  { id: "f5", src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80", alt: "Urban" },
  { id: "f6", src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80", alt: "Landscape" },
];

function VideoCard({ project }: { project: typeof contentProjects[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const handleHover = (enter: boolean) => {
    if (!videoRef.current) return;
    if (enter) { videoRef.current.play().catch(() => {}); setPlaying(true); }
    else { videoRef.current.pause(); videoRef.current.currentTime = 0; setPlaying(false); }
  };
  return (
    <motion.div className="group glass-card rounded-2xl overflow-hidden shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} whileHover={{ y: -4 }} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img src={project.thumbnail} alt={project.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`} />
        <video ref={videoRef} src={project.videoUrl} className="w-full h-full object-cover" muted loop playsInline />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Play size={18} className="text-stone-800 ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}
        <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest bg-white/90 text-stone-700 font-bold px-2 py-1 rounded-full border border-stone-200">Video</span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(t => <span key={t} className="text-[10px] font-mono bg-stone-100 text-stone-700 font-semibold border border-stone-200 px-2 py-0.5 rounded-md">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("Tech Projects");
  return (
    <section id="projects" className="py-28 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Projects</span>
          <span className="flex-1 h-px bg-stone-900/20" />
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase">04</span>
        </motion.div>

        <motion.h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "'Syne', sans-serif" }}>
          Things I've built.
        </motion.h2>

        {/* Tabs */}
        <motion.div className="flex gap-1 glass-card rounded-2xl p-1.5 w-fit mb-12 shadow-lg shadow-black/15" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${activeTab === tab ? "text-stone-900" : "text-stone-500 hover:text-stone-800"}`}>
              {activeTab === tab && <motion.span layoutId="tab-bg" className="absolute inset-0 bg-white rounded-xl shadow-md shadow-black/10 border border-stone-200/60" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            {activeTab === "Tech Projects" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </div>
            )}
            {activeTab === "Content Projects" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentProjects.map((p) => <VideoCard key={p.id} project={p} />)}
              </div>
            )}
            {activeTab === "Creative Frames" && (
              <div>
                <p className="text-sm text-stone-600 mb-8 max-w-md">A curated selection of frames — captured with intention, composed with precision.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {creativeFrames.map((frame, i) => (
                    <motion.div key={frame.id} className="group relative overflow-hidden rounded-2xl shadow-xl shadow-black/20" style={{ aspectRatio: "4/3" }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.07 }} whileHover={{ scale: 1.02 }}>
                      <img src={frame.src} alt={frame.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-3 left-3 text-[10px] font-mono text-black/90 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{frame.alt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
