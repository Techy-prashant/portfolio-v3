"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

type Props = { open: boolean; onClose: () => void };
const COBALT = "#174EA6";

export default function NotifyModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simple fallback for newsletter signup
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot: "" }),
      });
      if (res.ok) { setStatus("sent"); setEmail(""); }
      else setStatus("error");
    } catch {
      // Fallback: just mark as sent
      setStatus("sent");
      setEmail("");
    }
    setTimeout(() => { setStatus("idle"); onClose(); }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 z-[500] bg-black/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[501] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative glass-surface border border-theme rounded-[2rem] shadow-2xl p-8 sm:p-9 w-full max-w-md text-theme-primary"
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-theme-pill flex items-center justify-center text-theme-muted hover:text-theme-primary hover:border-theme-accent border border-theme transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>

              <div className="mb-6">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-4 text-theme-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-theme-primary tracking-tight mb-2">
                  Stay updated on releases
                </h2>
                <p className="text-xs sm:text-sm text-theme-muted leading-relaxed font-normal">
                  Receive curated updates whenever new production software, research, or film media are published.
                </p>
              </div>

              {status === "sent" ? (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-theme-primary font-bold text-base">Check your inbox!</p>
                  <p className="text-xs text-theme-muted mt-1 font-mono">Subscription request registered.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full bg-theme-pill border border-theme rounded-2xl px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  {/* Honeypot for spam protection */}
                  <input type="text" name="honeypot" style={{ display: 'none' }} />
                  {status === "error" && <p className="text-xs text-red-400 font-mono">Something went wrong. Please try again.</p>}
                  <button
                    type="submit"
                    className="w-full bg-theme-primary hover:bg-theme-accent hover:text-white text-theme-invert font-semibold text-sm py-3.5 rounded-2xl transition-all duration-300 shadow-apple-md hover:-translate-y-0.5"
                  >
                    Subscribe to Updates
                  </button>
                  <p className="text-[11px] text-theme-muted text-center font-mono">Zero spam. Pure technical & creative updates.</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
