"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Sunset, Moon, RotateCcw } from "lucide-react";
import { useCircadianTheme, CircadianPhase } from "@/context/CircadianThemeContext";

export default function CircadianClock({ className = "" }: { className?: string }) {
  const {
    phase,
    isLive,
    hours,
    minutes,
    hourAngle,
    status,
    setInteractiveAngle,
    setInteractiveTime,
    resetToLive,
  } = useCircadianTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const dialRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Formatted digital time: HH:MM
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Calculate pointer angle relative to dial center
  const calculateAngleFromPointer = useCallback(
    (clientX: number, clientY: number): number => {
      if (!dialRef.current) return 0;
      const rect = dialRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;

      // Math.atan2 gives angle from positive X axis (-180 to 180)
      // 0 degrees at 12 o'clock top (negative Y axis)
      const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      const angleFromTop = (rawAngle + 90 + 360) % 360;
      return angleFromTop;
    },
    []
  );

  // Pointer Down handler
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}

      const angle = calculateAngleFromPointer(e.clientX, e.clientY);
      setInteractiveAngle(angle);
    },
    [calculateAngleFromPointer, setInteractiveAngle]
  );

  // Smooth Pointer Move handler with requestAnimationFrame
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        const angle = calculateAngleFromPointer(clientX, clientY);
        setInteractiveAngle(angle);
      });
    },
    [isDragging, calculateAngleFromPointer, setInteractiveAngle]
  );

  // Pointer Up / Cancel handler
  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (isDragging) {
        setIsDragging(false);
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}
      }
    },
    [isDragging]
  );

  // Keyboard navigation support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let deltaMinutes = 0;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        deltaMinutes = e.shiftKey ? 60 : 15;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        deltaMinutes = e.shiftKey ? -60 : -15;
      } else if (e.key === "Home") {
        // Jump to Daylight Sunrise (06:00)
        setInteractiveTime(6, 0);
        e.preventDefault();
        return;
      } else if (e.key === "PageUp") {
        // Jump to Golden Evening (16:00)
        setInteractiveTime(16, 0);
        e.preventDefault();
        return;
      } else if (e.key === "End") {
        // Jump to Midnight (20:00)
        setInteractiveTime(20, 0);
        e.preventDefault();
        return;
      } else {
        return;
      }

      e.preventDefault();
      const currentTotal = hours * 60 + minutes;
      const nextTotal = (currentTotal + deltaMinutes + 1440) % 1440;
      const nextHours = Math.floor(nextTotal / 60);
      const nextMins = nextTotal % 60;
      setInteractiveTime(nextHours, nextMins);
    },
    [hours, minutes, setInteractiveTime]
  );

  // Global safety release
  useEffect(() => {
    if (!isDragging) return;
    const onWindowPointerUp = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setIsDragging(false);
    };
    window.addEventListener("pointerup", onWindowPointerUp);
    return () => window.removeEventListener("pointerup", onWindowPointerUp);
  }, [isDragging]);

  // Dot coordinates on 40px SVG circle (center: 20, 20, radius: 14)
  const dialRadius = 14;
  const centerCoord = 20;
  // Convert angleFromTop to Cartesian (0° top = -90° in standard trigonometry)
  const rad = ((hourAngle - 90) * Math.PI) / 180;
  const dotX = centerCoord + dialRadius * Math.cos(rad);
  const dotY = centerCoord + dialRadius * Math.sin(rad);

  const isDaylight = phase === "daylight";
  const isEvening = phase === "evening";
  const isMidnight = phase === "midnight";

  if (!mounted) {
    return (
      <div
        className={`relative inline-flex items-center gap-3 p-1.5 sm:p-2 pr-2.5 sm:pr-3 rounded-2xl glass-surface select-none shadow-apple-sm min-h-[50px] min-w-[170px] opacity-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative inline-flex items-center gap-3 p-1.5 sm:p-2 pr-2.5 sm:pr-3 rounded-2xl glass-surface select-none shadow-apple-sm transition-all duration-300 ${
        isDragging ? "ring-2 ring-blue-500/40" : ""
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ========================================================= */}
      {/* 1. DIGITAL LOCAL TIME & THREE-PHASE STATUS BADGE          */}
      {/* ========================================================= */}
      <div className="flex flex-col items-start pl-1 sm:pl-1.5">
        <div className="flex items-center gap-2 leading-none mb-1">
          <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-theme-muted">
            LOCAL TIME
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-xl text-[10px] sm:text-[11px] font-mono font-extrabold uppercase tracking-wider border transition-all duration-300 shadow-xs ${
              isDaylight
                ? "bg-sky-400/25 border-sky-500/45 text-black"
                : isEvening
                ? "bg-amber-400/30 border-amber-600/45 text-[#2E1804]"
                : "bg-indigo-600/40 border-indigo-400/50 text-white shadow-indigo-500/25"
            }`}
          >
            {isDaylight ? (
              <Sun size={16} strokeWidth={2.4} className="text-black shrink-0" />
            ) : isEvening ? (
              <Sunset size={16} strokeWidth={2.4} className="text-[#2E1804] shrink-0" />
            ) : (
              <Moon size={16} strokeWidth={2.4} className="text-white shrink-0" />
            )}
            <span className="font-black">{status}</span>
          </span>
        </div>

        <div className="flex items-baseline gap-1 font-mono font-bold text-theme-primary text-sm sm:text-base tracking-tight leading-tight">
          <span>{formattedHours}</span>
          <span className="opacity-70 animate-pulse">:</span>
          <span>{formattedMinutes}</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. THREE-PHASE INTERACTIVE CIRCULAR ORBITAL CLOCK DIAL   */}
      {/* ========================================================= */}
      <div
        ref={dialRef}
        role="slider"
        tabIndex={0}
        aria-label="Circadian clock time selector. Drag the dot to transition through Daylight, Golden Evening, and Midnight."
        aria-valuemin={0}
        aria-valuemax={1439}
        aria-valuenow={hours * 60 + minutes}
        aria-valuetext={`${formattedHours}:${formattedMinutes} ${status}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 hover:scale-105 ${
          isDaylight
            ? "bg-white/80 border border-slate-200/60 shadow-xs"
            : isEvening
            ? "bg-[#FDF9F3]/90 border border-[#D8C3A5]/60 shadow-xs"
            : "bg-[#111B2B]/85 border border-white/10 shadow-xs"
        }`}
        style={{ touchAction: "none" }}
      >
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full pointer-events-none overflow-visible"
        >
          {/* Subtle outer track circumference ring */}
          <circle
            cx={centerCoord}
            cy={centerCoord}
            r={dialRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-theme-muted opacity-30"
          />

          {/* Daylight arc: 06:00 (90°) to 16:00 (240°) */}
          <path
            d="M 34 20 A 14 14 0 0 1 7.88 27"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`${
              isDaylight ? "text-blue-600 opacity-90 stroke-[2.2]" : "text-blue-500/40"
            } transition-all duration-500`}
            strokeLinecap="round"
          />

          {/* Golden Evening arc: 16:00 (240°) to 20:00 (300°) */}
          <path
            d="M 7.88 27 A 14 14 0 0 1 7.88 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className={`${
              isEvening ? "text-[#B88752] opacity-95 stroke-[2.6]" : "text-[#B88752]/45"
            } transition-all duration-500`}
            strokeLinecap="round"
          />

          {/* Midnight arc: 20:00 (300°) to 06:00 (90°) via 0° top */}
          <path
            d="M 7.88 13 A 14 14 0 0 1 34 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`${
              isMidnight ? "text-indigo-400 opacity-90 stroke-[2.2]" : "text-indigo-500/35"
            } transition-all duration-500`}
            strokeLinecap="round"
          />

          {/* Phase Boundary & Cardinal Markers */}
          <circle cx="20" cy="6" r="0.8" className="fill-theme-muted opacity-70" />
          <circle cx="34" cy="20" r="0.9" className="fill-theme-muted opacity-80" />
          <circle cx="7.88" cy="27" r="0.9" className="fill-amber-600/70" />
          <circle cx="7.88" cy="13" r="0.9" className="fill-indigo-400/70" />

          {/* Center anchor pivot */}
          <circle
            cx={centerCoord}
            cy={centerCoord}
            r="1.5"
            className="fill-theme-primary opacity-60"
          />

          {/* Draggable Hour Hand Dot with Phase-Aware Luminous Glow */}
          <g>
            {/* Outer halo / glow ring */}
            <circle
              cx={dotX}
              cy={dotY}
              r={isDragging ? "7.5" : "6"}
              className={`${
                isDaylight
                  ? "fill-blue-500/25"
                  : isEvening
                  ? "fill-[#B88752]/35"
                  : "fill-[#6EA8FF]/35"
              } transition-all duration-150`}
            />
            {/* Core prominent indicator dot */}
            <circle
              cx={dotX}
              cy={dotY}
              r={isDragging ? "4.2" : "3.6"}
              className={`${
                isDaylight
                  ? "fill-blue-600 stroke-white"
                  : isEvening
                  ? "fill-[#B88752] stroke-[#FAF6F0]"
                  : "fill-[#6EA8FF] stroke-white"
              } stroke-[1.2] shadow-sm transition-transform duration-100`}
            />
          </g>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 3. LIVE MODE STATUS / RESET TO LIVE BUTTON                */}
      {/* ========================================================= */}
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          {isLive ? (
            <motion.div
              key="live-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              title="Tracking live local browser time"
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-mono font-bold tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">LIVE</span>
            </motion.div>
          ) : (
            <motion.button
              key="reset-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={resetToLive}
              title="Return to real current local time"
              aria-label="Reset clock to live local time"
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-theme-primary text-theme-invert text-[10px] font-mono font-bold tracking-wider shadow-sm transition-all duration-200 active:scale-95 hover:opacity-90"
            >
              <RotateCcw size={10} className="animate-spin-once" />
              <span>LIVE</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
