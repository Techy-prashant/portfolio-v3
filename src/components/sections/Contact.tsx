"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { personalInfo } from "@/data/content";

const socials = [
  {
    platform: "GitHub",
    handle: "@Techy-prashant",
    url: personalInfo.github,
    icon: Github,
  },
  {
    platform: "LinkedIn",
    handle: "/prashant-tiwari",
    url: personalInfo.linkedin,
    icon: Linkedin,
  },
  {
    platform: "Instagram",
    handle: "@_.prashant.me",
    url: "https://www.instagram.com/_.prashant.me/",
    icon: Instagram,
  },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: "" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-10 lg:pl-28 lg:pr-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Progressive Divider */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-electric">
            05 / CONNECT
          </span>
          <div className="flex-1 section-divider" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* ========================================================= */}
          {/* LEFT COLUMN: HEROIC EDITORIAL INVITATION                  */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-theme-primary tracking-tight leading-[1.05] mb-6"
            >
              Let's engineer something remarkable.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-theme-muted text-base sm:text-lg max-w-lg leading-relaxed mb-8 font-normal"
            >
              Available for full-stack engineering collaborations, creative technology consulting, and data science initiatives.
            </motion.p>

            {/* Direct Email Card with One-Click Copy */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-surface border border-theme rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/15 text-theme-accent flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-theme-muted tracking-wider">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="block text-sm sm:text-base font-bold text-theme-primary hover:text-theme-accent transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-theme-pill text-theme-primary text-xs font-semibold hover:border-theme-accent border border-theme transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Channels */}
            <div className="space-y-2.5">
              {socials.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group glass-surface border border-theme flex items-center justify-between p-4 px-5 rounded-2xl hover:border-theme-accent transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-theme-pill flex items-center justify-center text-theme-primary group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-theme-primary leading-tight">
                          {s.platform}
                        </h4>
                        <span className="text-[11px] font-mono text-theme-muted">
                          {s.handle}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="text-theme-muted group-hover:text-theme-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: REFINED FROSTED GLASS MESSAGE FORM          */}
          {/* ========================================================= */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-surface border border-theme rounded-[2.5rem] p-7 sm:p-9"
            >
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase font-bold text-theme-accent tracking-widest">
                  Quick Inquiry
                </span>
                <h3 className="text-xl font-bold text-theme-primary leading-snug mt-1">
                  Send a direct message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-theme-muted font-bold uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-theme-pill border border-theme rounded-2xl px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-theme-muted font-bold uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@domain.com"
                      className="w-full bg-theme-pill border border-theme rounded-2xl px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-theme-muted font-bold uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your idea, project, or organization..."
                    className="w-full bg-theme-pill border border-theme rounded-2xl px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400 font-mono">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-2xl transition-all duration-300 shadow-apple-dark ${
                    status === "sent"
                      ? "bg-emerald-600 text-white"
                      : status === "sending"
                      ? "bg-theme-pill text-theme-muted cursor-not-allowed"
                      : "bg-theme-primary text-theme-invert hover:bg-theme-accent hover:text-white hover:-translate-y-0.5"
                  }`}
                >
                  {status === "sent" ? (
                    <>
                      <Check size={16} />
                      <span>Message Dispatched</span>
                    </>
                  ) : status === "sending" ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MINIMAL EDITORIAL FOOTER                                   */}
        {/* ========================================================= */}
        <div className="pt-8 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-theme-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CHENNAI, IN · IIT MADRAS</span>
          </div>

          <p>© {new Date().getFullYear()} Prashant Tiwari. Engineered with precision.</p>

          <a
            href={personalInfo.resumeUrl}
            download
            className="text-theme-accent hover:underline font-semibold"
          >
            Download CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
