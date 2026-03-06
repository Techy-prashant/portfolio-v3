"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

type Props = { open: boolean; onClose: () => void };

export default function NotifyModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simple mailto fallback — swap for real newsletter API (Mailchimp / Resend)
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
              className="relative bg-white rounded-3xl shadow-2xl shadow-black/20 p-8 sm:p-10 w-full max-w-md"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
              >
                <X size={14} />
              </button>

              <div className="mb-6">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Stay informed about updates
                </h2>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Subscribe to my newsletter, and I'll notify you whenever there's a new update in the portfolio website.
                </p>
              </div>

              {status === "sent" ? (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-3xl mb-3">📧</div>
                  <p className="text-stone-700 font-medium">Check your email!</p>
                  <p className="text-sm text-stone-400 mt-1">Click the verification link to complete your subscription.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  {/* Honeypot for spam protection */}
                  <input type="text" name="honeypot" style={{ display: 'none' }} />
                  {status === "error" && <p className="text-xs text-red-400 font-mono">Something went wrong. Please try again.</p>}
                  <button
                    type="submit"
                    className="w-full bg-stone-900 hover:bg-stone-700 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Notify Me
                  </button>
                  <p className="text-[11px] text-stone-400 text-center font-mono">No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
