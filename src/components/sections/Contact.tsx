"use client";

import { motion } from "framer-motion";
import { socialLinks, personalInfo } from "@/data/content";
import { Github, Linkedin, Mail, Send, ArrowUpRight, Instagram } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  mail: <Mail size={18} />,
  instagram: <Instagram size={18} />,
};

const allSocials = [
  ...socialLinks,
  { platform: "Instagram", handle: "@_.prashant.me", url: "https://www.instagram.com/_.prashant.me/", icon: "instagram" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, honeypot: "" }) });
      const data = await res.json();
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); setTimeout(() => setStatus("idle"), 4000); }
      else { setStatus("error"); setErrorMsg(data.error ?? "Something went wrong."); }
    } catch { setStatus("error"); setErrorMsg("Network error. Please try again."); }
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Contact</span>
          <span className="flex-1 h-px bg-stone-900/20" />
          <span className="text-sm font-mono font-bold text-stone-700 tracking-widest uppercase">05</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Let's build something remarkable.
            </h2>
            <p className="text-stone-700 text-[15px] leading-relaxed mb-10">
              Whether you have a project, want to collaborate, or just want to say hi — I'm always open.
            </p>
            <div className="space-y-3">
              {allSocials.map((link) => (
                <a key={link.platform} href={link.url} target={link.icon !== "mail" ? "_blank" : undefined} rel="noopener noreferrer"
                  className="group glass-card flex items-center justify-between rounded-xl px-5 py-4 shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="text-stone-700 group-hover:text-black transition-colors">{iconMap[link.icon]}</span>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{link.platform}</p>
                      <p className="text-xs text-stone-700 font-mono">{link.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-stone-700 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="glass-card rounded-3xl p-7 shadow-xl shadow-black/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-700 font-bold uppercase tracking-widest mb-2">Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/70 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 transition-all shadow-sm" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-700 font-bold uppercase tracking-widest mb-2">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/70 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 transition-all shadow-sm" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-700 font-bold uppercase tracking-widest mb-2">Message</label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/70 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 transition-all resize-none shadow-sm" placeholder="Tell me about your project..." />
                </div>
                {/* Honeypot for spam protection */}
                <input type="text" name="honeypot" style={{ display: 'none' }} />
                {errorMsg && <p className="text-sm text-red-500 font-mono">{errorMsg}</p>}
                <button type="submit" disabled={status === "sending"}
                  className={`w-full flex items-center justify-center gap-2.5 font-bold text-sm py-3.5 rounded-xl transition-all duration-300 shadow-md ${
                    status === "sent" ? "bg-stone-700 text-white" :
                    status === "sending" ? "bg-stone-300 text-stone-600 cursor-not-allowed" :
                    "bg-stone-900 hover:bg-stone-700 text-white shadow-black/20 hover:shadow-lg"
                  }`}>
                  <Send size={14} />
                  {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent ✓" : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-24 pt-8 border-t border-stone-900/10 flex flex-col sm:flex-row items-center justify-between gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="text-xs text-stone-700 font-mono">© 2025 Prashant Tiwari · Built with Next.js & Tailwind CSS</p>
          <p className="text-xs text-stone-700 font-mono italic">Where Logic Meets Canvas.</p>
        </motion.div>
      </div>
    </section>
  );
}
