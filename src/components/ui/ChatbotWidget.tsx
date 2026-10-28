"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, MessageSquareText, Send, X, ExternalLink, RefreshCw, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { achievementsData, experienceData, personalInfo, projectsData, skillsData } from "@/data/content";

type Language = "en" | "hinglish";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
  links?: Array<{ label: string; url: string }>;
};

type KnowledgeEntry = {
  id: string;
  intents: string[];
  en: {
    reply: string;
    links?: Array<{ label: string; url: string }>;
  };
  hinglish: {
    reply: string;
    links?: Array<{ label: string; url: string }>;
  };
};

const knowledgeData: KnowledgeEntry[] = [
  {
    id: "identity",
    intents: [
      "who are you", "who is prashant", "tell me about prashant", "about", "bio", "intro", "introduction",
      "prashant kaun hai", "profile", "background", "summary"
    ],
    en: {
      reply: "Prashant Tiwari is a 2nd-year B.S. Data Science & Applications student at IIT Madras. He is a full-stack engineer and multimedia strategist who bridges technical architecture with high-impact creative storytelling. He also co-founded Adniko and directs digital media initiatives for audiences reaching millions.",
      links: [
        { label: "View Resume", url: personalInfo.resumeUrl },
        { label: "LinkedIn", url: personalInfo.linkedin },
      ],
    },
    hinglish: {
      reply: "Prashant Tiwari IIT Madras me 2nd-year B.S. in Data Science ke student hain. Woh ek full-stack developer aur multimedia strategist hain jo technical systems develop karte hain aur creative digital campaigns lead karte hain. Unhone Adniko startup co-found kiya aur 1M+ users tak digital reach create ki hai.",
      links: [
        { label: "Resume Dekho", url: personalInfo.resumeUrl },
        { label: "LinkedIn", url: personalInfo.linkedin },
      ],
    },
  },
  {
    id: "education",
    intents: [
      "education", "college", "university", "iit", "iitm", "iit madras", "degree", "study", "studies", "academics",
      "padhai", "degree kya hai", "kaha padhte ho"
    ],
    en: {
      reply: "Prashant is pursuing his B.S. Degree in Data Science & Applications from the Indian Institute of Technology Madras (IIT Madras), currently in his 2nd year (2024 to 2028). His coursework covers machine learning, algorithm design, distributed software systems, and data structures.",
      links: [{ label: "IIT Madras Program", url: "https://study.iitm.ac.in/ds" }],
    },
    hinglish: {
      reply: "Prashant IIT Madras se Data Science & Applications me B.S. degree pursue kar rahe hain (2nd Year, 2024 to 2028). Unka academic focus machine learning, algorithms aur scalable software systems par hai.",
      links: [{ label: "IIT Madras Program", url: "https://study.iitm.ac.in/ds" }],
    },
  },
  {
    id: "skills",
    intents: [
      "skills", "tech stack", "tools", "programming", "languages", "what tech", "frameworks", "technologies",
      "frontend", "backend", "full stack", "kya aata hai", "languages kya hai"
    ],
    en: {
      reply: "Here is Prashant's technical and creative toolkit:\n• Core Languages: Python, JavaScript, TypeScript, C, C++\n• Web & Systems: React.js, Next.js, Node.js, Express, MongoDB, Tailwind CSS\n• Multimedia & 3D: DaVinci Resolve, Premiere Pro, After Effects, Figma, Blender, Unreal Engine.",
      links: [{ label: "Explore Projects", url: "#projects" }],
    },
    hinglish: {
      reply: "Prashant ka technical aur creative toolkit:\n• Languages: Python, JavaScript, TypeScript, C, C++\n• Web Tech: React.js, Next.js, Node.js, Express, MongoDB, Tailwind CSS\n• Multimedia & 3D: DaVinci Resolve, Premiere Pro, After Effects, Figma, Blender, Unreal Engine.",
      links: [{ label: "Projects Dekhein", url: "#projects" }],
    },
  },
  {
    id: "projects",
    intents: [
      "projects", "work", "portfolio", "built", "apps", "websites", "what has he made", "namdapha", "tesseract", "projectos",
      "kya banaya", "projects dikhao"
    ],
    en: {
      reply: "Key flagship projects engineered by Prashant:\n1. Namdapha House Website: Full-stack MERN portal serving a 5,000+ student campus community.\n2. Tesseract Club Website: Interactive student portal with modern UI and events system.\n3. ProjectOS Initiative: Selected contributor building India's first PC-based OS (C/C++, Linux, UI/UX).\n4. Multimedia Campaigns: Produced high-engagement video assets (Shiv-Ratri, Paradox Fest Promo, Namdapha launch).",
      links: [
        { label: "Namdapha Website", url: "https://namdapha.iitmbs.org" },
        { label: "Tesseract Site", url: "https://tesseractfun.netlify.app" },
      ],
    },
    hinglish: {
      reply: "Prashant ke major projects:\n1. Namdapha House Website: Full-stack MERN web app jo 5,000+ students ke liye scale karta hai.\n2. Tesseract Club Website: Highly interactive club website built with React & Netlify.\n3. ProjectOS Initiative: India ke first PC-based OS me selected contributor (C/C++, Linux).\n4. Video Campaigns: Shiv-Ratri, Paradox Saavan promo aur Namdapha launch video campaigns.",
      links: [
        { label: "Namdapha Website", url: "https://namdapha.iitmbs.org" },
        { label: "Tesseract Site", url: "https://tesseractfun.netlify.app" },
      ],
    },
  },
  {
    id: "experience",
    intents: [
      "experience", "work history", "roles", "leadership", "jobs", "internship", "paradox", "adniko", "namdapha head",
      "kaha kaam kiya", "experience batao"
    ],
    en: {
      reply: "Prashant's leadership & work experience:\n• Coordinator | Multimedia & Content Strategy at Paradox, IIT Madras (Jun 2025 to Present): Directed digital campaigns generating 150K+ views.\n• Multimedia Head at Namdapha House, IIT Madras (Jun 2024 to Present): Managed content strategy with 1M+ user reach.\n• Co-Founder at Adniko (Jun 2023 to Sep 2025): Led client acquisition, brand strategy, and team building from day one.",
    },
    hinglish: {
      reply: "Prashant ka leadership aur work experience:\n• Paradox, IIT Madras: Multimedia & Content Coordinator (150K+ views campaign).\n• Namdapha House, IIT Madras: Multimedia Head (1M+ reach achieve ki).\n• Adniko: Co-Founder (Business development, client strategy aur team leadership).",
    },
  },
  {
    id: "achievements",
    intents: [
      "achievements", "awards", "rank", "hackerrank", "milestones", "honors", "accomplishments", "trophy",
      "kya jeeta", "achievements kya hai"
    ],
    en: {
      reply: "Notable milestones & honors:\n• Ranked #72 Globally in a National Level Coding Contest on HackerRank.\n• Selected contributor for the ProjectOS PC operating system initiative.\n• Fest Coordinator for Paradox (IIT Madras BS Fest).\n• Multimedia Head for Namdapha House.\n• Head Editor at Stemonef | HumanON.\n• Co-Founder of Adniko.",
    },
    hinglish: {
      reply: "Prashant ke major milestones:\n• HackerRank National Coding Contest me Global Rank #72 achieve kiya.\n• ProjectOS initiative me selected contributor.\n• Paradox IIT Madras fest coordinator.\n• Namdapha House me Multimedia Head.\n• Adniko startup ke Co-Founder.",
    },
  },
  {
    id: "photography",
    intents: [
      "photography", "photos", "camera", "creative frames", "pictures", "vivo", "matepad", "huawei", "hobby",
      "photo kisse li", "photography karte ho"
    ],
    en: {
      reply: "Photography is one of Prashant's favorite passions. He shoots visual storytelling frames using a VIVO T1 5G and Huawei MatePad Pro. Featured locations include Bhole Ghat, Garud Govind Temple, RadhaRaman Mandir, and historical street perspectives in Mathura & Vrindavan.",
      links: [{ label: "View Creative Frames", url: "#projects" }],
    },
    hinglish: {
      reply: "Photography Prashant ka favorite hobby hai. Woh VIVO T1 5G aur Huawei MatePad Pro se visual frames capture karte hain. Unke collection me Bhole Ghat, Garud Govind Temple aur RadhaRaman Mandir ki aesthetic frames included hain.",
      links: [{ label: "Frames Dekho", url: "#projects" }],
    },
  },
  {
    id: "contact",
    intents: [
      "contact", "email", "phone", "hire", "freelance", "opportunity", "connect", "reach out", "message", "linkedin", "github",
      "contact kaise kare", "email id", "phone number", "baat karni hai"
    ],
    en: {
      reply: "You can connect directly with Prashant through any of these channels:\n• Email: pt286355@gmail.com\n• Phone: +91 9548966498\n• Location: IIT Madras, Chennai\n• GitHub: github.com/Techy-prashant\n• LinkedIn: linkedin.com/in/prashant-tiwari-6b440a313",
      links: [
        { label: "Send Email", url: `mailto:${personalInfo.email}` },
        { label: "GitHub Profile", url: personalInfo.github },
        { label: "LinkedIn Profile", url: personalInfo.linkedin },
      ],
    },
    hinglish: {
      reply: "Aap Prashant se in channels ke through direct connect kar sakte hain:\n• Email: pt286355@gmail.com\n• Phone: +91 9548966498\n• Location: IIT Madras, Chennai\n• GitHub: @Techy-prashant\n• LinkedIn: /prashant-tiwari-6b440a313",
      links: [
        { label: "Email Bhejo", url: `mailto:${personalInfo.email}` },
        { label: "LinkedIn Connect", url: personalInfo.linkedin },
      ],
    },
  },
  {
    id: "resume",
    intents: [
      "resume", "cv", "download resume", "pdf", "biodata", "resume link",
      "resume chahiye", "cv dikhao"
    ],
    en: {
      reply: "You can view and download Prashant Tiwari's complete engineering and multimedia resume directly using the link below.",
      links: [{ label: "Download Resume (PDF)", url: personalInfo.resumeUrl }],
    },
    hinglish: {
      reply: "Aap Prashant ka full resume directly download kar sakte hain niche diye link se.",
      links: [{ label: "Resume Download Karein (PDF)", url: personalInfo.resumeUrl }],
    },
  },
];

const quickPrompts = [
  { en: "Who is Prashant?", hinglish: "Prashant kaun hai?" },
  { en: "What are his key skills?", hinglish: "Main skills kya hain?" },
  { en: "Tell me about his projects", hinglish: "Projects ke baare me batao" },
  { en: "What is his IIT Madras degree?", hinglish: "IIT Madras me kya padhte hain?" },
  { en: "How can I contact him?", hinglish: "Contact kaise karein?" },
  { en: "Show me his achievements", hinglish: "Achievements kya hain?" },
];

function smartMatch(query: string, lang: Language) {
  const clean = query.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
  if (!clean) {
    return {
      reply: lang === "en"
        ? "I can answer questions regarding Prashant's education at IIT Madras, tech skills, full-stack projects, multimedia work, and contact details."
        : "Main Prashant ke IIT Madras studies, skills, projects, multimedia work aur contact ke baare me bata sakta hoon.",
    };
  }

  // Greetings
  if (/^(hi|hello|hey|namaste|hola|good morning|good evening|wassup|yo)/.test(clean)) {
    return {
      reply: lang === "en"
        ? "Hello! I am Chota Jarvis, Prashant's AI portfolio assistant. Ask me anything about his technical projects, IIT Madras studies, multimedia work, or how to collaborate."
        : "Namaste! Main Chota Jarvis hoon, Prashant ka AI portfolio assistant. Aap mujhse unke projects, IIT Madras studies, skills ya contact ke baare me puch sakte hain.",
    };
  }

  // Score each entry
  const words = clean.split(/\s+/).filter(w => w.length > 2);
  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeData) {
    let score = 0;
    for (const intent of entry.intents) {
      if (clean.includes(intent)) {
        score += 8;
      }
      for (const w of words) {
        if (intent.includes(w)) {
          score += 2;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= 4) {
    return bestEntry[lang];
  }

  return {
    reply: lang === "en"
      ? "I don't have verified records on that specific topic yet. However, I can help you with:\n• Prashant's Background & IIT Madras Data Science Degree\n• Technical Stack & Languages (Python, Next.js, C++)\n• Projects (Namdapha, Tesseract, ProjectOS)\n• Work Experience & Leadership Roles\n• Contact Details & Resume Download."
      : "Mere paas is specific sawaal ka record nahi hai. Lekin main in topics par guide kar sakta hoon:\n• Prashant ka Background aur IIT Madras studies\n• Technical Skills (Python, React/Next.js, C++)\n• Projects (Namdapha, Tesseract, ProjectOS)\n• Leadership experience aur startup Adniko\n• Contact details aur Resume download.",
  };
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isScrollingOrDragging = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi, I am Chota Jarvis. I have direct access to Prashant's verified portfolio data. How can I help you today?",
    },
  ]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isTyping]);

  // Robust mobile outside-click dismissal that doesn't block page scrolling
  useEffect(() => {
    if (!open) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartPos.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        isScrollingOrDragging.current = false;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartPos.current && e.touches.length > 0) {
        const dx = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
        const dy = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
        if (dx > 8 || dy > 8) {
          isScrollingOrDragging.current = true;
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        isScrollingOrDragging.current = false;
      }
    };

    const onDocumentClick = (e: MouseEvent) => {
      // Preserve desktop behavior 100% (only X button or trigger button closes on desktop)
      if (window.innerWidth >= 1024) return;

      // If the user was scrolling or swiping the page/widget, do not close
      if (isScrollingOrDragging.current) {
        isScrollingOrDragging.current = false;
        return;
      }

      const target = e.target as Node | null;
      if (!target) return;

      // If clicked inside chatbot window or trigger button, do not close
      if (
        widgetRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      // Genuine outside tap on mobile -> dismiss chatbot
      setOpen(false);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("click", onDocumentClick, true);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("click", onDocumentClick, true);
    };
  }, [open]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsgId = Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const result = smartMatch(trimmed, language);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: result.reply,
          links: result.links,
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "bot",
        text: language === "en"
          ? "Chat cleared! Ask me anything about Prashant's projects, skills, or background."
          : "Chat clear ho gaya! Aap Prashant ke projects, skills ya background ke baare me puch sakte hain.",
      },
    ]);
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pointer-events-auto fixed bottom-4 right-3 sm:bottom-7 sm:right-7 z-[555] inline-flex items-center gap-2 sm:gap-3.5 rounded-full bg-theme-card/90 backdrop-blur-xl border border-theme text-theme-primary px-3 py-2 sm:px-6 sm:py-3.5 shadow-apple-lg hover:border-theme-accent transition-all duration-300 group hover:-translate-y-0.5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={open ? "Close Chota Jarvis" : "Open Chota Jarvis"}
      >
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500" />
        </span>
        <div className="text-left">
          <span className="block text-xs sm:text-[15px] font-bold leading-tight tracking-wide font-sans">
            <span className="hidden sm:inline">Chota </span>Jarvis
          </span>
          <span className="hidden sm:block text-[11px] text-theme-muted font-mono leading-tight mt-0.5">
            AI Assistant
          </span>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-300 text-theme-muted shrink-0 ${open ? "rotate-180" : ""}`} />
      </motion.button>

      {/* Modern Conversational Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={widgetRef}
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto fixed bottom-16 right-2 left-2 sm:left-auto sm:bottom-24 sm:right-7 z-[550] w-auto sm:w-[400px] max-w-[400px] max-h-[75vh] sm:max-h-[82vh] h-[520px] sm:h-[580px] flex flex-col rounded-2xl sm:rounded-3xl border border-theme glass-surface backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden text-theme-primary"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-theme-card text-theme-primary border-b border-theme">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-xs">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold tracking-tight">Chota Jarvis</h3>
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  </div>
                  <p className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                    Portfolio Intelligence
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-theme-pill transition-colors"
                  title="Clear Conversation"
                  aria-label="Clear Conversation"
                >
                  <RefreshCw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-theme-pill transition-colors"
                  aria-label="Close Chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Language Selector Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-theme-pill/40 border-b border-theme text-xs">
              <span className="text-[11px] font-mono text-theme-muted font-medium">Language:</span>
              <div className="flex gap-1">
                {(["en", "hinglish"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-all ${
                      language === lang
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-theme-muted hover:text-theme-primary bg-transparent"
                    }`}
                  >
                    {lang === "en" ? "English" : "Hinglish"}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-line text-[13px] ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-theme-pill border border-theme text-theme-primary shadow-xs"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Action Links from bot */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target={link.url.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-theme-accent bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink size={10} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing animation */}
              {isTyping && (
                <div className="flex items-center gap-1.5 bg-theme-pill border border-theme rounded-2xl px-4 py-2.5 w-fit text-theme-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.3s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-theme-pill/30 border-t border-theme overflow-x-auto no-scrollbar flex gap-1.5">
              {quickPrompts.map((q) => (
                <button
                  key={q.en}
                  onClick={() => handleSend(q[language])}
                  className="whitespace-nowrap rounded-xl bg-theme-pill border border-theme px-3 py-1 text-[11px] font-medium text-theme-secondary hover:border-theme-accent hover:text-theme-accent transition-colors shadow-xs"
                >
                  {q[language]}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-theme-card border-t border-theme flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === "en"
                    ? "Ask about skills, projects, IIT Madras, contact..."
                    : "Skills, projects, IIT Madras ke baare me pucho..."
                }
                className="flex-1 bg-theme-pill border border-theme rounded-xl px-3.5 py-2.5 text-xs text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-theme-accent focus:bg-theme-pill transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-theme-pill disabled:text-theme-muted text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}