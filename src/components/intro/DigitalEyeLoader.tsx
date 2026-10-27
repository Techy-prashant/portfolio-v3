"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DigitalEyeCanvas } from "./DigitalEyeCanvas";
import {
  DEFAULT_EYE_CONFIG,
  ExperienceMode,
  ScenePhase,
} from "./eyeTypes";

interface DigitalEyeLoaderProps {
  onUnlock?: () => void;
}

export const DigitalEyeLoader: React.FC<DigitalEyeLoaderProps> = ({ onUnlock }) => {
  const [mode, setMode] = useState<ExperienceMode | null>(null);
  const [phase, setPhase] = useState<ScenePhase>("opening");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const failSafeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const skipHintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine visitor status on mount
  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setMode("none");
      setIsUnlocked(true);
      onUnlock?.();
      return;
    }

    // URL override check (e.g., ?intro=full or ?intro=quick for testing)
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
      const sessionActive = sessionStorage.getItem(DEFAULT_EYE_CONFIG.sessionKey);
      const lastSeenRaw = localStorage.getItem(DEFAULT_EYE_CONFIG.storageKey);

      // Check if page was refreshed
      const navEntries = performance.getEntriesByType("navigation");
      const isReload =
        navEntries.length > 0 &&
        (navEntries[0] as PerformanceNavigationTiming).type === "reload";

      // If active session or reload -> Ordinary refresh gets the quick, polished eye transition
      if (sessionActive || isReload) {
        setMode("quick");
        sessionStorage.setItem(DEFAULT_EYE_CONFIG.sessionKey, "true");
        return;
      }

      // Check long-term return persistence (7-day rule)
      if (lastSeenRaw) {
        const lastSeen = parseInt(lastSeenRaw, 10);
        const timeSince = Date.now() - lastSeen;

        if (timeSince < DEFAULT_EYE_CONFIG.reappearancePeriodMs) {
          // Returning visitor within 7 days -> quick eye transition
          setMode("quick");
          sessionStorage.setItem(DEFAULT_EYE_CONFIG.sessionKey, "true");
          return;
        }
      }

      // First-time visitor or returned after 7+ days inactivity -> full cinematic experience
      setMode("full");
      sessionStorage.setItem(DEFAULT_EYE_CONFIG.sessionKey, "true");
    } catch {
      // Fallback gracefully on storage access restriction
      setMode("none");
      setIsUnlocked(true);
      onUnlock?.();
    }
  }, [onUnlock]);

  // Handle completion and transition into the website
  const handleComplete = useCallback(() => {
    if (isUnlocked) return;

    try {
      // Update persistent timestamps
      localStorage.setItem(DEFAULT_EYE_CONFIG.storageKey, Date.now().toString());
      sessionStorage.setItem(DEFAULT_EYE_CONFIG.sessionKey, "true");
    } catch {
      // Storage quota or privacy mode fallback
    }

    setIsUnlocked(true);
    onUnlock?.();
  }, [isUnlocked, onUnlock]);

  // Fail-safe protection: Ensure portfolio is NEVER blocked indefinitely
  useEffect(() => {
    if (!mode || mode === "none" || isUnlocked) return;

    // Lock body scroll while intro is playing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Show faint skip hint after 1.8 seconds in full mode
    if (mode === "full") {
      skipHintTimerRef.current = setTimeout(() => {
        setShowSkipHint(true);
      }, 1800);
    }

    // Hard fail-safe timeout (8.0s for full, 2.5s for quick)
    const timeoutDuration = mode === "full" ? 8000 : 2500;
    failSafeTimerRef.current = setTimeout(() => {
      handleComplete();
    }, timeoutDuration);

    // Escape key listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Global developer helper in window for testing in dev tools
    (window as any).__replayDigitalEye = (testMode: ExperienceMode = "full") => {
      try {
        localStorage.removeItem(DEFAULT_EYE_CONFIG.storageKey);
        sessionStorage.removeItem(DEFAULT_EYE_CONFIG.sessionKey);
      } catch {}
      setIsUnlocked(false);
      setPhase("opening");
      setMode(testMode);
    };

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (failSafeTimerRef.current) clearTimeout(failSafeTimerRef.current);
      if (skipHintTimerRef.current) clearTimeout(skipHintTimerRef.current);
    };
  }, [mode, isUnlocked, handleComplete]);

  // Don't render if bypassed
  if (mode === "none" || (!mode && isUnlocked)) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {!isUnlocked && mode && (
        <motion.div
          key="digital-eye-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(6px)",
            transition: {
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1], // Smooth cinematic exponential ease-out
            },
          }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden select-none pointer-events-auto cursor-default"
          style={{ willChange: "opacity, transform" }}
          onClick={mode === "full" && showSkipHint ? handleComplete : undefined}
        >
          {/* Canvas Digital Eye Animation */}
          <DigitalEyeCanvas
            mode={mode}
            onPhaseChange={setPhase}
            onComplete={handleComplete}
          />

          {/* Discreet Minimalist Skip Hint */}
          <AnimatePresence>
            {showSkipHint && !isUnlocked && mode === "full" && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.55, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleComplete();
                }}
                className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-cyan-500/25 text-[11px] font-mono text-cyan-400/80 hover:text-cyan-300 hover:border-cyan-400/50 hover:opacity-100 transition-all backdrop-blur-sm cursor-pointer"
                title="Press ESC or click to enter portfolio directly"
              >
                <span>[ESC]</span>
                <span className="text-[10px] tracking-wider uppercase">Skip Intro</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DigitalEyeLoader;
