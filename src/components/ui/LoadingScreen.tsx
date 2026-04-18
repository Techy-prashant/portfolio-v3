"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-slate-50"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Glow pulse */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 75%)" }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.9, 0.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
            {/* Rotating triangle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
              style={{ position: "absolute" }}
            >
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e40af" />
                    <stop offset="60%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                  <filter id="glow-tri" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <polygon points="36,5 67,61 5,61" fill="none" stroke="url(#g1)" strokeWidth="3.5" strokeLinejoin="round" filter="url(#glow-tri)" />
                <polygon points="36,20 54,52 18,52" fill="rgba(59,130,246,0.07)" stroke="rgba(147,197,253,0.4)" strokeWidth="1.2" />
              </svg>
            </motion.div>
          </div>
          <motion.p
            className="mt-6 text-[11px] font-mono text-stone-700 tracking-[0.35em] uppercase"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
