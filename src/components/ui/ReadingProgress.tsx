"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const calculated = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setProgress(calculated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[120] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#1769E0] via-[#5BA2FF] to-[#1769E0] transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(23,105,224,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
