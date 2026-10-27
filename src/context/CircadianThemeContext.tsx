"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

export type CircadianPhase = "daylight" | "evening" | "midnight";
export type ThemeMode = CircadianPhase;

export interface CircadianContextType {
  theme: ThemeMode;
  phase: CircadianPhase;
  isLive: boolean;
  hours: number;
  minutes: number;
  seconds: number;
  hourAngle: number; // 0 to 360 degrees
  status: "DAY" | "EVENING" | "NIGHT";
  setInteractiveTime: (hours: number, minutes: number) => void;
  setInteractiveAngle: (angleDeg: number) => void;
  resetToLive: () => void;
}

const CircadianThemeContext = createContext<CircadianContextType | undefined>(
  undefined
);

/**
 * Three-Phase Local-Time Rules:
 * - 06:00 to 15:59: Daylight (Fresh porcelain, pale ice-blue, crisp slate)
 * - 16:00 to 19:59: Golden Evening (Warm ivory, champagne, muted amber, espresso)
 * - 20:00 to 05:59: Midnight (Deep obsidian, midnight navy, electric blue, silver)
 */
export function getCircadianPhase(hours: number): CircadianPhase {
  if (hours >= 6 && hours < 16) {
    return "daylight";
  } else if (hours >= 16 && hours < 20) {
    return "evening";
  } else {
    return "midnight";
  }
}

/**
 * Backwards compatibility helper
 */
export function getCircadianTheme(hours: number): ThemeMode {
  return getCircadianPhase(hours);
}

/**
 * Convert 24-hour time to angle (0° = 00:00 midnight at top, 90° = 06:00 sunrise, 240° = 16:00 evening, 300° = 20:00 night)
 */
export function timeToAngle(hours: number, minutes: number): number {
  const totalMinutes = (hours % 24) * 60 + minutes;
  return (totalMinutes / 1440) * 360;
}

/**
 * Convert angle (0° to 360°) to 24-hour time
 */
export function angleToTime(angleDeg: number): { hours: number; minutes: number } {
  const normalized = ((angleDeg % 360) + 360) % 360;
  const totalMinutes = Math.round((normalized / 360) * 1440) % 1440;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export function CircadianThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLive, setIsLive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("prashant_portfolio_is_live");
        if (stored !== null) return stored !== "false";
      } catch {}
    }
    return true;
  });

  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number }>(
    () => {
      if (typeof window !== "undefined") {
        try {
          const storedIsLive = localStorage.getItem("prashant_portfolio_is_live");
          const storedTime = localStorage.getItem("prashant_portfolio_interactive_time");
          if (storedIsLive === "false" && storedTime) {
            const parsed = JSON.parse(storedTime);
            if (typeof parsed.hours === "number") {
              return { hours: parsed.hours, minutes: parsed.minutes || 0, seconds: 0 };
            }
          }
          const now = new Date();
          return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
        } catch {}
      }
      // Default to midnight/dark for SSR so initial render never flashes white
      return { hours: 22, minutes: 0, seconds: 0 };
    }
  );
  const [mounted, setMounted] = useState(false);

  // Synchronize with real browser-local time
  const syncWithBrowserTime = useCallback(() => {
    const now = new Date();
    setTime({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    });
  }, []);

  useEffect(() => {
    setMounted(true);

    // If live, sync with browser time immediately on mount
    try {
      const storedIsLive = localStorage.getItem("prashant_portfolio_is_live");
      if (storedIsLive !== "false") {
        syncWithBrowserTime();
      }
    } catch {
      syncWithBrowserTime();
    }

    // Live mode timer
    const timer = setInterval(() => {
      if (isLive) {
        syncWithBrowserTime();
      }
    }, 1000);

    // Tab visibility change / wake listener
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && isLive) {
        syncWithBrowserTime();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isLive, syncWithBrowserTime]);

  // Derive phase and angle
  const phase: CircadianPhase = useMemo(() => {
    return getCircadianPhase(time.hours);
  }, [time.hours]);

  const hourAngle = useMemo(() => {
    return timeToAngle(time.hours, time.minutes);
  }, [time.hours, time.minutes]);

  const status: "DAY" | "EVENING" | "NIGHT" = useMemo(() => {
    if (phase === "daylight") return "DAY";
    if (phase === "evening") return "EVENING";
    return "NIGHT";
  }, [phase]);

  // Synchronize document attributes and classes for CSS theme tokens
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", phase);
    root.classList.remove("theme-daylight", "theme-evening", "theme-midnight", "dark", "light");
    root.classList.add(`theme-${phase}`);

    if (phase === "midnight") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, [phase]);

  // User drags or picks interactive time
  const setInteractiveTime = useCallback((h: number, m: number) => {
    setIsLive(false);
    const validHours = Math.max(0, Math.min(23, Math.floor(h)));
    const validMinutes = Math.max(0, Math.min(59, Math.floor(m)));
    setTime({
      hours: validHours,
      minutes: validMinutes,
      seconds: 0,
    });
    try {
      localStorage.setItem("prashant_portfolio_is_live", "false");
      localStorage.setItem(
        "prashant_portfolio_interactive_time",
        JSON.stringify({ hours: validHours, minutes: validMinutes })
      );
    } catch {}
  }, []);

  // User moves the circular dial by angle
  const setInteractiveAngle = useCallback((angleDeg: number) => {
    setIsLive(false);
    const { hours, minutes } = angleToTime(angleDeg);
    setTime({
      hours,
      minutes,
      seconds: 0,
    });
    try {
      localStorage.setItem("prashant_portfolio_is_live", "false");
      localStorage.setItem(
        "prashant_portfolio_interactive_time",
        JSON.stringify({ hours, minutes })
      );
    } catch {}
  }, []);

  // Reset to browser's live local time
  const resetToLive = useCallback(() => {
    setIsLive(true);
    try {
      localStorage.setItem("prashant_portfolio_is_live", "true");
      localStorage.removeItem("prashant_portfolio_interactive_time");
    } catch {}
    syncWithBrowserTime();
  }, [syncWithBrowserTime]);

  const contextValue = useMemo<CircadianContextType>(() => {
    return {
      theme: phase,
      phase,
      isLive,
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds,
      hourAngle,
      status,
      setInteractiveTime,
      setInteractiveAngle,
      resetToLive,
    };
  }, [
    phase,
    isLive,
    time.hours,
    time.minutes,
    time.seconds,
    hourAngle,
    status,
    setInteractiveTime,
    setInteractiveAngle,
    resetToLive,
  ]);

  return (
    <CircadianThemeContext.Provider value={contextValue}>
      {children}
    </CircadianThemeContext.Provider>
  );
}

export function useCircadianTheme(): CircadianContextType {
  const context = useContext(CircadianThemeContext);
  if (!context) {
    throw new Error(
      "useCircadianTheme must be used within a CircadianThemeProvider"
    );
  }
  return context;
}
