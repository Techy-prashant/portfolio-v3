"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCircadianTheme } from "@/context/CircadianThemeContext";

export interface LoaderMediaItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  badge?: string;
  fit?: "cover" | "contain";
}

/**
 * Random Loader Image Collection
 * Derived from user-provided Pinterest pins:
 * 1. https://pin.it/3r4xVWVlz -> Tony Stark outstretched arms
 * 2. https://pin.it/1YHFRmZU1 -> Tony Stark rolling eyes
 * 3. https://pin.it/58qode3Cu -> The Rock as Dora the Explorer
 * 4. https://pin.it/7C2VHSYS0 -> Alakh Pandey (Physics Wallah)
 */
export const LOADER_IMAGES: LoaderMediaItem[] = [
  {
    id: "stark-welcome",
    url: "/loaders/pin-1.png",
    alt: "Tony Stark Welcome",
    caption: "Jarvis, create this portfolio...",
    badge: "Iron Man Mode",
    fit: "contain",
  },
  {
    id: "stark-eyeroll",
    url: "/loaders/pin-2.png",
    alt: "Tony Stark Eye Roll",
    caption: "Waiting for the website to load...",
    badge: "Irritation Mode",
    fit: "cover",
  },
  {
    id: "rock-dora",
    url: "/loaders/pin-3.jpg",
    alt: "The Rock Dora",
    caption: "Exploring the portfolio...",
    badge: "Explorer Mode",
    fit: "cover",
  },
  {
    id: "physics-wallah",
    url: "/loaders/pin-4.jpg",
    alt: "Alakh Pandey Sir",
    caption: "Sir, ap bhi app banao na!",
    badge: "Physics Wallah",
    fit: "cover",
  },
  {
    id: "polite-cat",
    url: "/loaders/pin-5.jpg",
    alt: "Polite Smiling Cat",
    caption: "When the code works on the first try and you act normal.",
    badge: "Polite Mode",
    fit: "cover",
  },
  {
    id: "warrior-kitten",
    url: "/loaders/pin-6.jpg",
    alt: "Knight Armor Warrior Kitten",
    caption: "Junior dev ready to deploy to production on a Friday.",
    badge: "Tiny Warrior",
    fit: "cover",
  },
];

/**
 * Fair non-repeating sequence generator (shuffled deck):
 * Ensures all memes are shown across successive refreshes without repeats.
 */
function getNextLoaderMedia(items: LoaderMediaItem[]): LoaderMediaItem {
  if (typeof window === "undefined" || items.length === 0) return items[0];
  try {
    const storageKey = "prashant_portfolio_loader_deck";
    let pool: number[] = [];
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        pool = JSON.parse(stored);
      } catch {}
    }

    if (!Array.isArray(pool) || pool.length === 0) {
      // Build a full permutation of indices [0, ..., n-1]
      pool = Array.from({ length: items.length }, (_, i) => i);
      // Fisher-Yates shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }

    const nextIdx = pool.shift() ?? 0;
    localStorage.setItem(storageKey, JSON.stringify(pool));
    return items[nextIdx] ?? items[0];
  } catch {
    return items[Math.floor(Math.random() * items.length)];
  }
}

interface LoaderProps {
  onUnlock?: () => void;
}

export const CuteRunnerLoader: React.FC<LoaderProps> = ({ onUnlock }) => {
  const { phase } = useCircadianTheme();
  const [mode, setMode] = useState<"full" | "quick" | "none" | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<LoaderMediaItem>(LOADER_IMAGES[0]);
  const failSafeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check visitor status on mount & pick next non-repeating meme
  useEffect(() => {
    setSelectedMedia(getNextLoaderMedia(LOADER_IMAGES));

    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setMode("none");
      setIsUnlocked(true);
      onUnlock?.();
      return;
    }

    // URL override check (?intro=full or ?intro=quick or ?intro=none)
    const urlParams = new URLSearchParams(window.location.search);
    const paramIntro = urlParams.get("intro");
    if (paramIntro === "full") {
      setMode("full");
      return;
    }
    if (paramIntro === "quick") {
      setMode("quick");
      return;
    }
    if (paramIntro === "none" || paramIntro === "skip") {
      setMode("none");
      setIsUnlocked(true);
      onUnlock?.();
      return;
    }

    try {
      const storageKey = "prashant_portfolio_intro_last_seen";
      const sessionKey = "prashant_portfolio_intro_session_active";
      const sessionActive = sessionStorage.getItem(sessionKey);
      const lastSeenRaw = localStorage.getItem(storageKey);

      // Check if reload
      const navEntries = performance.getEntriesByType("navigation");
      const isReload =
        navEntries.length > 0 &&
        (navEntries[0] as PerformanceNavigationTiming).type === "reload";

      if (sessionActive || isReload) {
        // Quick snappy refresh transition (~0.85s)
        setMode("quick");
        sessionStorage.setItem(sessionKey, "true");
        return;
      }

      // Check 7-day return
      if (lastSeenRaw) {
        const lastSeen = parseInt(lastSeenRaw, 10);
        const timeSince = Date.now() - lastSeen;
        if (timeSince < 7 * 24 * 60 * 60 * 1000) {
          setMode("quick");
          sessionStorage.setItem(sessionKey, "true");
          return;
        }
      }

      // First visit -> full satisfying run (~1.8s)
      setMode("full");
      sessionStorage.setItem(sessionKey, "true");
    } catch {
      setMode("none");
      setIsUnlocked(true);
      onUnlock?.();
    }
  }, [onUnlock]);

  // Complete unlock
  const handleComplete = useCallback(() => {
    if (isUnlocked) return;
    try {
      localStorage.setItem("prashant_portfolio_intro_last_seen", Date.now().toString());
      sessionStorage.setItem("prashant_portfolio_intro_session_active", "true");
    } catch {}
    setIsUnlocked(true);
    onUnlock?.();
  }, [isUnlocked, onUnlock]);

  // Animate progress percentage smoothly
  useEffect(() => {
    if (!mode || mode === "none" || isUnlocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const duration = mode === "full" ? 1750 : 800;
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => handleComplete(), 150);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    if (mode === "full") {
      const skipTimer = setTimeout(() => setShowSkipHint(true), 900);
      return () => {
        document.body.style.overflow = originalOverflow;
        clearInterval(timer);
        clearTimeout(skipTimer);
      };
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      clearInterval(timer);
    };
  }, [mode, isUnlocked, handleComplete]);

  // Fail-safe protection
  useEffect(() => {
    if (!mode || mode === "none" || isUnlocked) return;

    failSafeTimerRef.current = setTimeout(() => {
      handleComplete();
    }, mode === "full" ? 3500 : 1600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleComplete();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Console replay helper for quick preview
    (window as any).__replayIntro = (testMode: "full" | "quick" = "full") => {
      try {
        localStorage.removeItem("prashant_portfolio_intro_last_seen");
        sessionStorage.removeItem("prashant_portfolio_intro_session_active");
      } catch {}
      const randomIdx = Math.floor(Math.random() * LOADER_IMAGES.length);
      setSelectedMedia(LOADER_IMAGES[randomIdx]);
      setIsUnlocked(false);
      setProgress(0);
      setMode(testMode);
    };

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (failSafeTimerRef.current) clearTimeout(failSafeTimerRef.current);
    };
  }, [mode, isUnlocked, handleComplete]);

  if (mode === "none" || (!mode && isUnlocked)) {
    return null;
  }

  // Theme-aware styles matching the exact website circadian tokens
  const isDaylight = phase === "daylight";
  const isEvening = phase === "evening";
  const isMidnight = phase === "midnight";

  // Palette configurations matching the site tokens
  const themeConfig = isDaylight
    ? {
        bg: "bg-[#F6F8FC]",
        skyGradient:
          "radial-gradient(ellipse 95% 60% at 50% -12%, rgba(191, 219, 254, 0.65), transparent 75%)",
        characterColor: "#2563EB", // Cobalt blue
        accentColor: "#38BDF8", // Cyan blue
        textColor: "text-[#0F172A]",
        subTextColor: "text-[#64748B]",
        trackBg: "bg-slate-200/80 border-slate-300/80",
        trackBar: "bg-gradient-to-r from-blue-500 to-cyan-400",
        badge: "bg-white/90 border-blue-200 text-blue-700 shadow-sm",
        glow: "rgba(37, 99, 235, 0.25)",
      }
    : isEvening
    ? {
        bg: "bg-[#F5F0E7]",
        skyGradient:
          "radial-gradient(ellipse 95% 60% at 50% -12%, rgba(245, 216, 177, 0.65), transparent 75%)",
        characterColor: "#B88752", // Warm amber
        accentColor: "#D97706", // Deep gold
        textColor: "text-[#302820]",
        subTextColor: "text-[#7E7063]",
        trackBg: "bg-[#E6DCCF]/90 border-[#D8C3A5]/80",
        trackBar: "bg-gradient-to-r from-amber-600 to-amber-400",
        badge: "bg-[#FAF6EF]/90 border-amber-300/70 text-amber-900 shadow-sm",
        glow: "rgba(184, 135, 82, 0.25)",
      }
    : {
        // Midnight
        bg: "bg-[#0C0E12]",
        skyGradient:
          "radial-gradient(ellipse 85% 55% at 50% -12%, rgba(17, 27, 43, 0.85), transparent 75%)",
        characterColor: "#6EA8FF", // Electric blue
        accentColor: "#00F0FF", // Bright cyan
        textColor: "text-[#E7EAF0]",
        subTextColor: "text-[#A6AFBE]",
        trackBg: "bg-white/10 border-white/15",
        trackBar: "bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400",
        badge: "bg-[#111B2B]/90 border-blue-500/30 text-blue-300 shadow-md",
        glow: "rgba(110, 168, 255, 0.35)",
      };

  return (
    <AnimatePresence mode="wait">
      {!isUnlocked && mode && (
        <motion.div
          key="cute-runner-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
          className={`fixed inset-0 z-[9999] ${themeConfig.bg} flex flex-col items-center justify-center select-none overflow-hidden`}
          style={{ willChange: "opacity, transform" }}
          onClick={mode === "full" && showSkipHint ? handleComplete : undefined}
        >
          {/* Ambient theme-matched background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: themeConfig.skyGradient }}
          />

          {/* Center Stage: Dynamic Random Meme Card & Smooth Progress Track */}
          <div className="relative z-10 flex flex-col items-center justify-center p-6 max-w-sm w-full">
            {/* Random Meme / Character Badge Frame */}
            <div className="relative flex flex-col items-center justify-center mb-5">
              {/* Outer soft ambient glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-40 transition-all duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${themeConfig.characterColor} 0%, transparent 70%)`,
                }}
              />

              {/* Main Image Card with Glass Border & Floating Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={
                  progress < 96
                    ? { opacity: 1, scale: 1, y: [0, -6, 0] }
                    : { opacity: 1, scale: [1, 1.08, 1], y: [0, -12, 0] } // Celebratory bounce on completion!
                }
                transition={
                  progress < 96
                    ? {
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.3 },
                        y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                      }
                    : { duration: 0.5, ease: "easeOut" }
                }
                className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-3xl overflow-hidden p-1.5 glass-surface border border-theme shadow-2xl backdrop-blur-xl flex items-center justify-center"
              >
                {/* Inner Image Mask */}
                <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden bg-black/40 flex items-center justify-center">
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.alt}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 144px, 160px"
                    className={
                      selectedMedia.fit === "contain"
                        ? "object-contain p-2 filter drop-shadow-md"
                        : "object-cover object-center filter contrast-[1.03]"
                    }
                  />

                  {/* Atmospheric soft lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Floating pill badge on top corner */}
                {selectedMedia.badge && (
                  <div className="absolute -top-2.5 right-2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-black/80 border border-white/20 text-white shadow-lg backdrop-blur-md">
                    {selectedMedia.badge}
                  </div>
                )}
              </motion.div>

              {/* Meme Caption / Status Sub-line */}
              {selectedMedia.caption && (
                <motion.p
                  key={selectedMedia.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className={`mt-3.5 text-xs font-mono text-center tracking-wide ${themeConfig.textColor} font-semibold max-w-[280px]`}
                >
                  &ldquo;{selectedMedia.caption}&rdquo;
                </motion.p>
              )}
            </div>

            {/* Satisfying Smooth Track & Progress Bar */}
            <div className="w-full flex flex-col items-center gap-3">
              {/* Floating Track Capsule */}
              <div
                className={`relative w-full h-2 rounded-full overflow-hidden border ${themeConfig.trackBg} backdrop-blur-md`}
              >
                <motion.div
                  className={`h-full rounded-full ${themeConfig.trackBar}`}
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Status Header Badge */}
              <div className="flex items-center justify-between w-full px-1">
                <span
                  className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase ${themeConfig.subTextColor}`}
                >
                  {progress < 100 ? "PREPARING EXPERIENCE" : "READY"}
                </span>

                <span
                  className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-lg border ${themeConfig.badge}`}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Subtext */}
            <p className={`mt-5 text-xs font-mono tracking-widest uppercase ${themeConfig.subTextColor} opacity-60`}>
              PRASHANT TIWARI // PORTFOLIO
            </p>
          </div>

          {/* Discreet Minimalist Skip Hint */}
          <AnimatePresence>
            {showSkipHint && !isUnlocked && mode === "full" && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleComplete();
                }}
                className={`absolute bottom-8 right-8 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono font-semibold cursor-pointer backdrop-blur-sm transition-all hover:opacity-100 ${themeConfig.badge}`}
                title="Press ESC or click to enter directly"
              >
                <span>[ESC]</span>
                <span className="text-[10px] tracking-wider uppercase">Skip</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CuteRunnerLoader;
