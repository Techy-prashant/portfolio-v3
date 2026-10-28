"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Play,
  X,
  ExternalLink,
  Github,
  Sparkles,
  Clapperboard,
  Layers,
  Terminal,
  Smartphone,
} from "lucide-react";
import { projectsData } from "@/data/content";

type Tab = "systems" | "motion" | "visuals";

type VideoProject = {
  id: string;
  title: string;
  role: string;
  impact: string;
  description: string;
  videoUrl: string;
  embedUrl: string;
  thumbnail: string;
  tags: string[];
  platform?: "vimeo" | "instagram";
  aspectRatio?: "16/9" | "9/16";
  localVideoUrl?: string;
};

const videoProjects: VideoProject[] = [
  {
    id: "v1",
    title: "Paradox Saavan: Fest Promo",
    role: "Director & Motion Designer",
    impact: "1M+ Net Reach",
    description: "Cinematic promotional campaign produced for IIT Madras Paradox fest, driving digital engagement across platforms.",
    videoUrl: "https://vimeo.com/1178362573?fl=pl&fe=cm",
    embedUrl: "https://player.vimeo.com/video/1178362573?autoplay=1&badge=0&autopause=0",
    thumbnail: "https://i.vimeocdn.com/video/2139931499-d9b2f0563e53f9d1fb2688783f0319c9a428b3266ff135bf57a1c7535f1b84e6-d_960x540",
    tags: ["Premiere Pro", "Blender", "Motion Design"],
    platform: "vimeo",
    aspectRatio: "16/9",
  },
  {
    id: "v2",
    title: "Shiv-Ratri: Cinematic Highlights",
    role: "Lead Editor & Colorist",
    impact: "150K+ Views",
    description: "High-energy festival film and motion graphics capturing the live celebration at scale.",
    videoUrl: "https://vimeo.com/1178364534?fl=pl&fe=cm",
    embedUrl: "https://player.vimeo.com/video/1178364534?autoplay=1&badge=0&autopause=0",
    thumbnail: "https://i.vimeocdn.com/video/2139933227-d4de25dd3ed546e8fdb42a5524f299fa5f2eea8a3bbb2f290ef561eab1816317-d_960x540",
    tags: ["DaVinci Resolve", "After Effects", "Color Grade"],
    platform: "vimeo",
    aspectRatio: "16/9",
  },
  {
    id: "v3",
    title: "Namdapha House: Platform Launch Film",
    role: "Creative Lead",
    impact: "Official Launch",
    description: "End-to-end launch video for Namdapha House platform, scripting, sound design, and color grading.",
    videoUrl: "https://vimeo.com/1178364640?fl=pl&fe=cm",
    embedUrl: "https://player.vimeo.com/video/1178364640?autoplay=1&badge=0&autopause=0",
    thumbnail: "https://i.vimeocdn.com/video/2139933585-3f870afae0f016f3428b846a49f4ee6c23464288201d0d8e0cf00f4276208fc9-d_960x540",
    tags: ["Sound Design", "Brand Identity", "Motion Cut"],
    platform: "vimeo",
    aspectRatio: "16/9",
  },
  {
    id: "v4",
    title: "Paradox '24: Final Cut Teaser",
    role: "Director & Lead Editor",
    impact: "Festival Showcase",
    description: "High-tempo fest promotional campaign designed with rhythmic audio synchronization, retro motion graphics, and fast-cut visual storytelling.",
    videoUrl: "https://vimeo.com/1239771845?share=copy&fl=sv&fe=ci",
    embedUrl: "https://player.vimeo.com/video/1239771845?autoplay=1&badge=0&autopause=0",
    thumbnail: "https://i.vimeocdn.com/video/2217399883-ce16f28834c283fd29935a3e3fcc3403b3e7c7e28ed59a0f4640322ee3971190-d_960x540",
    tags: ["Premiere Pro", "Motion Graphics", "Sound Cut"],
    platform: "vimeo",
    aspectRatio: "16/9",
  },
];

const reelProjects: VideoProject[] = [
  {
    id: "r1",
    title: "The Dial: Cinematic Noir Sequence",
    role: "Cinematographer & Colorist",
    impact: "Narrative Short",
    description: "Atmospheric 9:16 cinematic visual cut exploring warm vintage lighting, analog props, and tactile sound design.",
    videoUrl: "https://vimeo.com/1239767684?share=copy&fl=sv&fe=ci",
    embedUrl: "https://player.vimeo.com/video/1239767684?autoplay=1&badge=0&autopause=0",
    thumbnail: "/projects/vimeo_1239767684.jpg",
    tags: ["Cinematography", "DaVinci Resolve", "Sound Cut"],
    platform: "vimeo",
    aspectRatio: "9/16",
  },
  {
    id: "r2",
    title: "AgriJoy: Pest Identification Campaign",
    role: "Motion Designer & Animator",
    impact: "Brand Campaign",
    description: "Tactile paper-craft 2D animation breaking down crop pest taxonomy with clear, accessible educational visual hierarchy.",
    videoUrl: "https://www.instagram.com/reel/DbTOIM_TnuE/",
    embedUrl: "https://www.instagram.com/reel/DbTOIM_TnuE/embed/",
    localVideoUrl: "/projects/reel_DbTOIM_TnuE.mp4",
    thumbnail: "/projects/reel_DbTOIM_TnuE.jpg",
    tags: ["After Effects", "Papercraft", "2D Motion"],
    platform: "instagram",
    aspectRatio: "9/16",
  },
  {
    id: "r3",
    title: "Ganesh Chaturthi: Cultural Spotlight",
    role: "Lead Editor & Storyteller",
    impact: "Creator Short",
    description: "High-tempo talking-head festival short featuring custom kinetic typography popups, punchy pacing, and dynamic visual hooks.",
    videoUrl: "https://www.instagram.com/reel/Ddug4EQz_Pn/",
    embedUrl: "https://www.instagram.com/reel/Ddug4EQz_Pn/embed/",
    localVideoUrl: "/projects/reel_Ddug4EQz_Pn.mp4",
    thumbnail: "/projects/reel_Ddug4EQz_Pn.jpg",
    tags: ["Premiere Pro", "Kinetic Typography", "Creator Cut"],
    platform: "instagram",
    aspectRatio: "9/16",
  },
];

const visualFrames = [
  { id: "p1", title: "Vasta", src: "https://socialportfolio-rho.vercel.app/assets/images/poster1.png" },
  { id: "p2", title: "Bhasma", src: "https://socialportfolio-rho.vercel.app/assets/images/poster2.png" },
  { id: "p3", title: "Dancing Angel", src: "https://socialportfolio-rho.vercel.app/assets/images/poster5.png" },
  { id: "p4", title: "Margazhi'26", src: "https://socialportfolio-rho.vercel.app/assets/images/poster6.png" },
  { id: "p5", title: "BMW Concept", src: "https://socialportfolio-rho.vercel.app/assets/images/poster3.png" },
  { id: "p6", title: "Betal", src: "https://socialportfolio-rho.vercel.app/assets/images/poster4.png" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("systems");
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [activeVisual, setActiveVisual] = useState<string | null>(null);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-28 px-4 sm:px-8 lg:pl-28 lg:pr-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Progressive Divider */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10 lg:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-electric">
            04 / SELECTED WORKS
          </span>
          <div className="flex-1 section-divider" />
        </div>

        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-14">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-theme-primary tracking-tight leading-[1.1] mb-2 sm:mb-4"
            >
              Crafted systems & cinematic media.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-theme-muted text-xs sm:text-base max-w-xl leading-relaxed"
            >
              Production web applications, systems contributions, and high-reach media campaigns designed with meticulous attention to detail.
            </motion.p>
          </div>

          {/* Filter Tabs (All Works removed, starts with Systems & Web) */}
          <div className="flex items-center gap-1 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-theme-pill border border-theme shadow-apple-dark backdrop-blur-md overflow-x-auto no-scrollbar">
            {(
              [
                { id: "systems", label: "Systems & Web" },
                { id: "motion", label: "Films & Motion" },
                { id: "visuals", label: "Visual Identity" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "theme-tab-active border font-bold"
                    : "text-theme-muted hover:text-theme-primary hover:bg-theme-pill"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SYSTEMS & WEB PROJECTS (ALL EQUAL SIZED CARDS)            */}
        {/* ========================================================= */}
        {activeTab === "systems" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
            {projectsData.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-stone-900 border border-theme">
                    <Image
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Status Ribbon/Tag (Completed or On-going) */}
                    <div className="absolute top-3 left-3 z-10">
                      {proj.status === "Completed" ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono font-semibold tracking-wide shadow-md border backdrop-blur-md bg-stone-950/85 text-emerald-400 border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono font-semibold tracking-wide shadow-md border backdrop-blur-md bg-stone-950/85 text-amber-300 border-amber-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                          <span>On-going</span>
                        </div>
                      )}
                    </div>

                    {/* Top Action Icons (GitHub + Optional Deployed Live Link) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-8 h-8 rounded-xl backdrop-blur-md flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 active:scale-95 ${
                            proj.imageTheme === "light"
                              ? "bg-stone-900/90 text-stone-100 border border-stone-700/80 hover:bg-black hover:text-white hover:border-stone-600 shadow-stone-950/40"
                              : "bg-white/95 text-stone-900 border border-white/80 hover:bg-white hover:text-black shadow-black/30"
                          }`}
                          aria-label={`GitHub repo for ${proj.title}`}
                          title="View Source on GitHub"
                        >
                          <Github size={14} className="stroke-[2.2]" />
                        </a>
                      )}
                      {proj.externalLink && !proj.externalLink.includes("github.com") && (
                        <a
                          href={proj.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-8 h-8 rounded-xl backdrop-blur-md flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 active:scale-95 ${
                            proj.imageTheme === "light"
                              ? "bg-stone-900/90 text-stone-100 border border-stone-700/80 hover:bg-black hover:text-white hover:border-stone-600 shadow-stone-950/40"
                              : "bg-white/95 text-stone-900 border border-white/80 hover:bg-white hover:text-black shadow-black/30"
                          }`}
                          aria-label={`Open ${proj.title}`}
                          title="Open Live Platform"
                        >
                          <ArrowUpRight size={15} className="stroke-[2.5]" />
                        </a>
                      )}
                    </div>
                    {/* Optional Badge on image bottom */}
                    {proj.badge && (
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/75 text-white backdrop-blur-md border border-white/10 font-medium">
                          {proj.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-theme-accent font-bold">
                    {proj.role}
                  </span>
                  <h4 className="text-xl font-bold text-theme-primary leading-snug mt-1 mb-2 group-hover:text-theme-accent transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-theme-muted leading-relaxed mb-6 font-normal">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-theme">
                  {proj.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-theme-pill text-theme-secondary font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. CINEMATIC FILMS & MOTION CAMPAIGNS                     */}
        {/* ========================================================= */}
        {activeTab === "motion" && (
          <div className="mb-16">
            {/* Landscape Films Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
              <div className="flex items-center gap-3">
                <Clapperboard size={18} className="text-theme-accent" />
                <h3 className="text-xl font-bold text-theme-primary">
                  Directed Films & Motion Design
                </h3>
              </div>
              <span className="text-xs font-mono text-theme-muted">
                16:9 Landscape Video
              </span>
            </div>

            {/* 16:9 Landscape Video Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
              {videoProjects.map((vid, idx) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-surface rounded-3xl p-5 sm:p-6 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setActiveVideo(vid)}
                >
                  <div>
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-stone-900 border border-theme">
                      <Image
                        src={vid.thumbnail}
                        alt={vid.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-obsidian shadow-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <Play size={18} className="ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/80 text-white backdrop-blur-sm border border-white/10">
                        {vid.impact}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-theme-accent font-bold">
                      {vid.role}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-theme-primary leading-snug mt-0.5 mb-1 group-hover:text-theme-accent transition-colors">
                      {vid.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-theme-muted leading-relaxed line-clamp-2 mb-4 font-normal">
                      {vid.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-theme">
                    {vid.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-theme-pill text-theme-secondary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ========================================================= */}
            {/* VERTICAL REELS & SHORT-FORM SHOWCASE (9:16)               */}
            {/* ========================================================= */}
            <div className="pt-10 border-t border-theme">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-theme-accent" />
                  <div>
                    <h3 className="text-xl font-bold text-theme-primary">
                      Vertical Reels & Narrative Shorts
                    </h3>
                    <p className="text-xs sm:text-sm text-theme-muted mt-0.5 font-normal">
                      High-impact 9:16 motion cuts, campaign animations, and mobile-first visual storytelling.
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-xs font-mono px-2.5 py-1 rounded-lg bg-theme-pill text-theme-muted border border-theme">
                  9:16 Reel Ratio
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {reelProjects.map((reel, idx) => (
                  <motion.div
                    key={reel.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-surface rounded-3xl p-5 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                    onClick={() => setActiveVideo(reel)}
                  >
                    <div>
                      {/* 9:16 Video Preview Frame */}
                      <div className="relative aspect-[9/14] sm:aspect-[9/14] rounded-2xl overflow-hidden mb-4 bg-stone-900 border border-theme">
                        <Image
                          src={reel.thumbnail}
                          alt={reel.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-obsidian shadow-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <Play size={18} className="ml-0.5" />
                          </div>
                        </div>

                        {/* Top Badge: Reel Format */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/80 text-white backdrop-blur-sm border border-white/10 font-medium">
                            Reel · 9:16
                          </span>
                        </div>

                        {/* Bottom Badge: Impact */}
                        <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/80 text-white backdrop-blur-sm border border-white/10">
                          {reel.impact}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-wider text-theme-accent font-bold">
                        {reel.role}
                      </span>
                      <h4 className="text-base font-bold text-theme-primary leading-snug mt-0.5 mb-1 group-hover:text-theme-accent transition-colors">
                        {reel.title}
                      </h4>
                      <p className="text-xs text-theme-muted leading-relaxed line-clamp-2 mb-4 font-normal">
                        {reel.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-theme">
                      {reel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-theme-pill text-theme-secondary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. VISUAL IDENTITY & CULTURAL POSTERS GALLERY             */}
        {/* ========================================================= */}
        {activeTab === "visuals" && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Layers size={18} className="text-theme-accent" />
              <h3 className="text-xl font-bold text-theme-primary">
                Visual Art & Editorial Posters
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {visualFrames.map((frame, idx) => (
                <motion.div
                  key={frame.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  onClick={() => setActiveVisual(frame.src)}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-surface border border-theme p-1.5 group cursor-pointer"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone-900 border border-theme">
                    <Image
                      src={frame.src}
                      alt={frame.title}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[11px] font-mono text-white font-bold">
                        {frame.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* VIDEO MODAL VIEWER                                        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              className={`relative w-full ${
                activeVideo.aspectRatio === "9/16"
                  ? "max-w-[400px] max-h-[92vh]"
                  : "max-w-4xl"
              } bg-obsidian-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 shrink-0">
                <div className="min-w-0 pr-4">
                  <h4 className="text-sm font-bold text-white truncate">
                    {activeVideo.title}
                  </h4>
                  <span className="text-xs font-mono text-ice-200/70 truncate block">
                    {activeVideo.role} · {activeVideo.impact}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Open original video"
                    title="Open original video in new tab"
                  >
                    <ArrowUpRight size={17} />
                  </a>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="p-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Close video"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div
                className={`relative w-full bg-black flex items-center justify-center overflow-hidden ${
                  activeVideo.aspectRatio === "9/16"
                    ? "aspect-[9/16] max-h-[74vh]"
                    : "aspect-video"
                }`}
              >
                {activeVideo.localVideoUrl ? (
                  <video
                    key={activeVideo.localVideoUrl}
                    src={activeVideo.localVideoUrl}
                    poster={activeVideo.thumbnail}
                    controls
                    autoPlay
                    playsInline
                    loop
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <iframe
                    src={activeVideo.embedUrl}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                    scrolling={activeVideo.platform === "instagram" ? "no" : "auto"}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* VISUAL LIGHTBOX MODAL                                     */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeVisual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-xl"
            onClick={() => setActiveVisual(null)}
          >
            <div className="relative max-w-lg max-h-[85vh] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/15">
              <Image
                src={activeVisual}
                alt="Enlarged visual"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setActiveVisual(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-white backdrop-blur-md"
                aria-label="Close image"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
