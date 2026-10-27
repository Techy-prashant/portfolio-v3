"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  UserRound,
  BriefcaseBusiness,
  Layers,
  FolderKanban,
  Mail,
  Pin,
  PinOff,
  Menu,
  X,
  FileText,
  Bell,
  Github,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import { personalInfo } from "@/data/content";
import NotifyModal from "@/components/ui/NotifyModal";

type NavItem = {
  id: string;
  label: string;
  icon: typeof UserRound;
  href: string;
};

const navItems: NavItem[] = [
  { id: "about", label: "About", icon: UserRound, href: "#about" },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness, href: "#experience" },
  { id: "skills", label: "Skills", icon: Layers, href: "#skills" },
  { id: "projects", label: "Projects", icon: FolderKanban, href: "#projects" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  // Restore pin state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pt_nav_pinned");
      if (stored === "true") {
        setIsPinned(true);
      }
    } catch {
      // ignore in incognito or SSR
    }
  }, []);

  const togglePin = () => {
    setIsPinned((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("pt_nav_pinned", String(next));
      } catch {}
      return next;
    });
  };

  // Track active section via IntersectionObserver & scroll fallback
  useEffect(() => {
    const sectionIds = ["hero", "about", "experience", "skills", "projects", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const isExpanded = isHovered || isPinned;

  return (
    <>
      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />

      {/* ========================================================= */}
      {/* 1. DESKTOP FLOATING NAVIGATION RAIL                      */}
      {/* ========================================================= */}
      <motion.aside
        ref={railRef}
        aria-label="Main Navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ x: -80, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: isExpanded ? 210 : 60,
        }}
        transition={{
          width: { type: "spring", stiffness: 320, damping: 30 },
          x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.4 },
        }}
        className="fixed left-5 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center py-4 px-2.5 rounded-3xl glass-surface border border-theme shadow-apple-md transition-colors duration-300"
      >
        {/* Rail Header / Brand & Pin Button */}
        <div className="w-full flex items-center justify-between mb-5 px-1 relative">
          <button
            onClick={() => scrollTo("#hero")}
            aria-label="Scroll to top"
            className="group flex items-center gap-2.5 rounded-xl transition-all"
          >
            <div className="relative w-9 h-9 rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-md group-hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0">
              {personalInfo.avatarUrl ? (
                <Image
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full text-white font-sans font-extrabold text-sm">
                  PT
                </span>
              )}
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col text-left overflow-hidden whitespace-nowrap"
                >
                  <span className="text-xs font-bold text-theme-primary tracking-tight leading-tight">
                    Prashant T.
                  </span>
                  <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                    IIT Madras
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Pin Control */}
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={togglePin}
                title={isPinned ? "Unpin navigation (auto-collapse)" : "Pin navigation (keep open)"}
                aria-label={isPinned ? "Unpin navigation" : "Pin navigation"}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  isPinned
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-theme-muted hover:text-theme-primary hover:bg-theme-pill"
                }`}
              >
                {isPinned ? <Pin size={13} className="rotate-45" /> : <PinOff size={13} />}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Section Navigation Items */}
        <nav className="w-full flex flex-col gap-1.5" aria-label="Section links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                title={!isExpanded ? item.label : undefined}
                className={`group relative flex items-center w-full h-10 px-2.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500/15 text-theme-accent font-bold"
                    : "text-theme-muted hover:text-theme-primary hover:bg-theme-pill"
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeRailIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                  <Icon
                    size={17}
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-theme-accent" : "text-theme-muted group-hover:text-theme-primary"
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 text-xs tracking-wide whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        {/* Rail Footer: Quick Actions */}
        <div className="w-full mt-auto pt-4 border-t border-theme flex flex-col gap-1.5 items-center">
          {/* Resume link */}
          <a
            href={personalInfo.resumeUrl}
            download
            title={!isExpanded ? "Download Resume" : undefined}
            className="group flex items-center w-full h-9 px-2.5 rounded-2xl text-theme-muted hover:text-theme-primary hover:bg-theme-pill transition-colors"
          >
            <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
              <FileText size={16} className="group-hover:scale-110 transition-transform" />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-xs tracking-wide whitespace-nowrap overflow-hidden flex items-center gap-1 font-semibold"
                >
                  <span>Resume</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </motion.span>
              )}
            </AnimatePresence>
          </a>

          {/* Notify button */}
          <button
            onClick={() => setNotifyOpen(true)}
            title={!isExpanded ? "Notify Updates" : undefined}
            className="group flex items-center w-full h-9 px-2.5 rounded-2xl text-theme-muted hover:text-theme-accent hover:bg-blue-500/10 transition-colors"
          >
            <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
              <Bell size={16} className="group-hover:scale-110 transition-transform" />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-xs tracking-wide whitespace-nowrap overflow-hidden font-semibold"
                >
                  Notify Me
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ========================================================= */}
      {/* 2. MOBILE TOP FLOATING HEADER                             */}
      {/* ========================================================= */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-3 left-3 right-3 h-14 z-[110] lg:hidden flex items-center justify-between px-4 rounded-2xl glass-surface border border-theme shadow-apple-md"
      >
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2.5"
          aria-label="Home"
        >
          <div className="relative w-8 h-8 rounded-xl overflow-hidden ring-1 ring-white/20 shadow-sm bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0">
            {personalInfo.avatarUrl ? (
              <Image
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-white font-sans font-bold text-xs">
                PT
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-theme-primary tracking-tight">
            Prashant Tiwari
          </span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={personalInfo.resumeUrl}
            download
            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-theme-invert bg-theme-primary px-2.5 py-1.5 rounded-xl shadow-xs"
          >
            <FileText size={12} />
            <span>CV</span>
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-xl bg-theme-pill border border-theme flex items-center justify-center text-theme-primary"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-20 z-[109] lg:hidden rounded-3xl glass-surface border border-theme shadow-2xl p-6 flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-theme-secondary hover:text-theme-primary hover:bg-theme-pill"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-theme flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setNotifyOpen(true);
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-theme-muted hover:text-theme-primary"
              >
                <Bell size={14} />
                <span>Get Updates</span>
              </button>

              <div className="flex items-center gap-3 text-theme-muted">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:text-theme-primary"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:text-theme-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-1.5 hover:text-theme-primary"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
