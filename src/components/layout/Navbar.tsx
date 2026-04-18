"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/data/content";
import NotifyModal from "@/components/ui/NotifyModal";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const COBALT = "#0047AB";
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ["hero", "about", "experience", "skills", "projects", "contact"];
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />

      <motion.header
        className="fixed top-0 left-0 right-0 h-16 lg:hidden bg-white/85 backdrop-blur-xl border-b border-stone-200/50 shadow-sm shadow-black/5 z-[110]"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3">
            <img src="/logo-light.svg" alt={personalInfo.name} className="h-10 w-auto" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setNotifyOpen(true)}
              className="hidden sm:inline-flex text-xs font-bold text-white bg-[#111111] hover:bg-black px-4 py-2 rounded-full transition-all duration-200"
            >
              Notify Me
            </button>
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-900 shadow-sm"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <motion.header
        className="fixed left-0 top-0 hidden lg:block h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-stone-200/50 shadow-sm shadow-black/5 z-[100]"
        initial={{ x: -256, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="flex flex-col items-start py-6 px-4 gap-4 h-full font-sans">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="group flex-shrink-0 mb-8">
            <img src="/logo-light.svg" alt={personalInfo.name} className="h-14 w-auto group-hover:opacity-70 transition-opacity duration-200" />
          </button>

          {/* Desktop Nav Links */}
          <div className="flex flex-col items-start gap-2 w-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative w-full text-left px-4 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-lg border ${
                    isActive ? "text-[#111111] bg-white border-black/30" : "text-stone-800 border-transparent hover:text-[#0047AB] hover:bg-stone-50"
                  }`}
                  style={isActive ? { boxShadow: `inset 2px 0 0 ${COBALT}` } : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Notify Me CTA */}
          <div className="mt-auto">
            <button
              onClick={() => setNotifyOpen(true)}
              className="text-sm font-bold text-white bg-[#111111] hover:bg-black px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-black/10 hover:shadow-lg"
            >
              Notify Me
            </button>
          </div>

        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[105] bg-white/96 backdrop-blur-xl flex flex-col items-center justify-center gap-7 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-bold text-[#111111] hover:text-[#0047AB] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => { setMobileOpen(false); setNotifyOpen(true); }}
              className="mt-4 text-sm font-bold text-white bg-stone-900 px-8 py-3 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Notify Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
