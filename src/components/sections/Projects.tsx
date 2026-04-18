"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { projectsData } from "@/data/content";
import ProjectCard from "@/components/ui/ProjectCard";
import { ExternalLink, Play } from "lucide-react";

const tabs = ["Tech Projects", "Content Projects", "Creative Frames"] as const;
type Tab = (typeof tabs)[number];
const COBALT = "#174EA6";

type ContentProject = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  tags: string[];
  embedUrl?: string;
};

const contentProjects: ContentProject[] = [
  { id: "c1", title: "Shiv-Ratri — Highlights", description: "For Engagement purposes.", videoUrl: "https://vimeo.com/1178364534?fl=pl&fe=cm", embedUrl: "https://player.vimeo.com/video/1178364534?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1", thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", tags: ["DaVinci Resolve", "After Effects", "Cultural Festival"]},
  { id: "c2", title: "Paradox Saavan — Fest Promo", description: "Cinematic promo produced for the annual cultural festival. Reached 1M+ users across platforms by many of these videos.", videoUrl: "https://vimeo.com/1178362573?fl=pl&fe=cm", embedUrl: "https://player.vimeo.com/video/1178362573?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80", tags: ["Premiere Pro", "Blender", "Motion Graphics"] },
  { id: "c3", title: "Namdapha House — Website Campaign", description: "Website launch campaign video for Namdapha House. End-to-end production from script to colour grade.", videoUrl: "https://vimeo.com/1178364640?fl=pl&fe=cm", embedUrl: "https://player.vimeo.com/video/1178364640?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80", tags:
    ["Waveform 13", "Canva Pro", "Brand"] },
];

const creativeFrames = [
  { id: "f1", src: "https://socialportfolio-rho.vercel.app/assets/images/poster1.png", alt: "Vasta" },
  { id: "f2", src: "https://socialportfolio-rho.vercel.app/assets/images/poster2.png", alt: "Bhasma" },
  { id: "f3", src: "https://socialportfolio-rho.vercel.app/assets/images/poster5.png", alt: "Dancing Angel" },
  { id: "f4", src: "https://socialportfolio-rho.vercel.app/assets/images/poster6.png", alt: "Margazhi'26" },
  { id: "f5", src: "https://socialportfolio-rho.vercel.app/assets/images/poster3.png", alt: "BMW" },
  { id: "f6", src: "https://socialportfolio-rho.vercel.app/assets/images/poster4.png", alt: "Betal" },
];

const creativeFramePlaceholders = [
  {
    id: "placeholder-1",
    label: "Bhole ghat",
    alt: "Bhole ghat",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/folders/Bhole%20ghat.png",
  },
  {
    id: "placeholder-2",
    label: "Bihari ji",
    alt: "Bihari ji",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/folders/Bihari%20ji.png",
  },
  {
    id: "placeholder-3",
    label: "Duck",
    alt: "Duck",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/folders/Duck.png",
  },
  {
    id: "placeholder-4",
    label: "Flower",
    alt: "Flower",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/folders/Flower%20%F0%9F%8C%B8.png",
  },
  {
    id: "placeholder-5",
    label: "Besties on Streets",
    alt: "Besties on Streets",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/folders/besties%20on%20Streets.png",
  },
  {
    id: "placeholder-6",
    label: "RadhaRaman Mandir",
    alt: "RadhaRaman Mandir",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/RadhaRaman%20Mandir.png",
  },
  {
    id: "placeholder-7",
    label: "Self Cleaning",
    alt: "Self Cleaning",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/Self%20Cleaning.png",
  },
  {
    id: "placeholder-8",
    label: "Ancient Architecture",
    alt: "Ancient Architecture",
    src: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/Random.png",
  },
];

function VideoCard({ project }: { project: ContentProject }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [embedPlaying, setEmbedPlaying] = useState(false);

  const buildVimeoEmbedUrl = (baseUrl: string, autoplay: boolean) => {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set("autoplay", autoplay ? "1" : "0");
      url.searchParams.set("muted", "1");
      url.searchParams.set("loop", "1");
      return url.toString();
    } catch {
      return baseUrl;
    }
  };

  const handleHover = (enter: boolean) => {
    if (project.embedUrl) {
      setEmbedPlaying(enter);
      return;
    }
    if (!videoRef.current) return;
    if (enter) { videoRef.current.play().catch(() => {}); setPlaying(true); }
    else { videoRef.current.pause(); videoRef.current.currentTime = 0; setPlaying(false); }
  };
  return (
    <motion.div className="group glass-card rounded-2xl overflow-hidden shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} whileHover={{ y: -4 }} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {project.embedUrl ? (
          <iframe
            src={buildVimeoEmbedUrl(project.embedUrl, embedPlaying)}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title={project.title}
          />
        ) : (
          <>
            <img src={project.thumbnail} alt={project.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`} />
            <video ref={videoRef} src={project.videoUrl} className="w-full h-full object-cover" muted loop playsInline />
          </>
        )}
        {!playing && !project.embedUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Play size={18} className="text-stone-800 ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}
        <span className="absolute top-3 left-3 text-xs font-mono uppercase tracking-widest bg-white/90 text-stone-800 font-bold px-2 py-1 rounded-full border border-stone-300">Video</span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-stone-700 leading-relaxed mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(t => <span key={t} className="text-xs font-mono bg-stone-100 text-stone-800 font-semibold border border-stone-300 px-2 py-0.5 rounded-md">{t}</span>)}
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
          <span className="text-sm font-mono font-bold text-stone-700 tracking-widest uppercase">04</span>
        </motion.div>

        <motion.h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "'Syne', sans-serif" }}>
          Things I've built.
        </motion.h2>

        {/* Tabs */}
        <motion.div className="flex gap-1 glass-card rounded-2xl p-1.5 w-fit mb-12 shadow-lg shadow-black/15" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${activeTab === tab ? "text-black" : "text-stone-700 hover:text-black"}`}>
              {activeTab === tab && <motion.span layoutId="tab-bg" className="absolute inset-0 bg-white rounded-xl shadow-md shadow-black/10 border" style={{ borderColor: COBALT }} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
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
              <div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contentProjects.map((p) => <VideoCard key={p.id} project={p} />)}
                </div>
                <div className="mt-10">
                  <p className="text-sm text-stone-700 mb-6 max-w-xl">Creative Content, These are some of my favorite creations, These are mainly focused on showcasing my skills in multimedia production.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {creativeFrames.map((frame, i) => (
                      <motion.div key={frame.id} className="group relative overflow-hidden rounded-2xl shadow-xl shadow-black/20" style={{ aspectRatio: "4/5" }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ scale: 1.02 }}>
                        <img src={frame.src} alt={frame.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute bottom-3 left-3 text-[10px] font-mono text-black/90 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{frame.alt}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Creative Frames" && (
              <div>
                <p className="text-sm text-stone-700 mb-8 max-w-md">These photos are taken from VIVO T1 5G/Huawei Matepad pro, Photography is 1 or my many hobbies. I like to capture moments that tell a story. With each of my frames i carry a piece of my soul, that i cherish with all my heart.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {creativeFramePlaceholders.map((frame, i) => (
                    <motion.div key={frame.id} className="group relative overflow-hidden rounded-2xl shadow-xl shadow-black/20" style={{ aspectRatio: "4/5" }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.07 }} whileHover={{ scale: 1.02 }}>
                      <img
                        src={frame.src}
                        alt={frame.alt}
                        className="w-full h-full object-cover transition-transform duration-700 scale-125 group-hover:scale-[1.12]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-3 left-3 text-[10px] font-mono text-black/90 font-bold uppercase tracking-widest">{frame.label}</span>
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
