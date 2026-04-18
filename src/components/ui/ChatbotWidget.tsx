"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, MessageSquareText, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { achievementsData, experienceData, personalInfo, projectsData, skillsData } from "@/data/content";

type Language = "en" | "hinglish";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

type KnowledgeResponse = Record<Language, string[]>;

const languages: Array<{ id: Language; label: string; hint: string }> = [
  { id: "en", label: "English", hint: "Simple English" },
  { id: "hinglish", label: "Hinglish", hint: "Hindi + English mix" },
];

const quickPrompts = [
  { en: "Tell me about Prashant", hinglish: "Prashant ke baare mein batao" },
  { en: "What are the main skills?", hinglish: "Main skills kya hain?" },
  { en: "Show me the projects", hinglish: "Projects dikhaiye" },
  { en: "How can I contact him?", hinglish: "Contact kaise karein?" },
];

const translations = {
  title: { en: "Chota Jarvis", hinglish: "Chota Jarvis" },
  greeting: {
    en: "Hi, I am Chota Jarvis. Ask me anything about this portfolio.",
    hinglish: "Hi, main Chota Jarvis hoon. Main is portfolio ke questions ka jawab de sakta hoon.",
  },
  helper: {
    en: "Try one of the quick questions below or type your own.",
    hinglish: "Neeche quick questions try karo ya apna sawaal type karo.",
  },
  inputPlaceholder: {
    en: "Ask about skills, projects, experience, contact...",
    hinglish: "Skills, projects, experience, contact ke baare mein pucho...",
  },
  send: { en: "Send", hinglish: "Bhejo" },
  fallback: {
    en: [
      "I can help with these topics:",
      "- About Prashant",
      "- Skills and tools",
      "- Projects and work",
      "- Experience and achievements",
      "- Contact and resume",
    ],
    hinglish: [
      "Main in topics par help kar sakta hoon:",
      "- Prashant ke baare mein",
      "- Skills aur tools",
      "- Projects aur work",
      "- Experience aur achievements",
      "- Contact aur resume",
    ],
  },
} satisfies Record<string, Record<Language, string | string[]>>;

const knowledgeBase: Array<{ keywords: string[]; response: KnowledgeResponse }> = [
  {
    keywords: ["website", "portfolio", "sections", "home", "page", "what is here"],
    response: {
      en: [
        "This portfolio website has: Hero, About, Experience, Skills, Projects, and Contact sections.",
      ],
      hinglish: [
        "Is portfolio website me Hero, About, Experience, Skills, Projects aur Contact sections hain.",
      ],
    },
  },
  {
    keywords: ["about", "who are you", "your intro", "tell me about", "prashant", "bio", "introduction", "kaun", "baare"],
    response: {
      en: [
        `${personalInfo.name} is a ${personalInfo.roles.slice(0, 3).join(", ")}.`,
        "He studies B.S. in Data Science & Applications at IIT Madras.",
        "He mixes engineering work with multimedia strategy, so the profile shows both technical and creative sides.",
      ],
      hinglish: [
        `${personalInfo.name} ek ${personalInfo.roles.slice(0, 3).join(", ")} hain.`,
        "Woh IIT Madras me B.S. in Data Science & Applications padh rahe hain.",
        "Unka profile technical aur creative dono side ko show karta hai.",
      ],
    },
  },
  {
    keywords: ["skill", "skills", "tools", "tech stack", "technology", "what can he do"],
    response: {
      en: [
        `Main skills are: ${skillsData[0].skills.map((skill) => skill.name).join(", ")}.`,
        `Web stack: ${skillsData[1].skills.map((skill) => skill.name).join(", ")}.`,
        `Creative tools: ${skillsData[2].skills.map((skill) => skill.name).join(", ")}.`,
      ],
      hinglish: [
        `Main skills hain: ${skillsData[0].skills.map((skill) => skill.name).join(", ")}.`,
        `Web stack: ${skillsData[1].skills.map((skill) => skill.name).join(", ")}.`,
        `Creative tools: ${skillsData[2].skills.map((skill) => skill.name).join(", ")}.`,
      ],
    },
  },
  {
    keywords: ["project", "work", "build", "portfolio", "showcase"],
    response: {
      en: projectsData.map((project) => `${project.title} - ${project.description}`),
      hinglish: projectsData.map((project) => `${project.title} - ${project.description}`),
    },
  },
  {
    keywords: ["experience", "job", "role", "intern", "leadership", "work history"],
    response: {
      en: experienceData.flatMap((item) => [`${item.role} at ${item.company} (${item.duration})`, ...item.description]),
      hinglish: experienceData.flatMap((item) => [`${item.role} at ${item.company} (${item.duration})`, ...item.description]),
    },
  },
  {
    keywords: ["contact", "email", "phone", "reach", "linkedin", "github", "connect"],
    response: {
      en: [
        `Email: ${personalInfo.email}`,
        `Phone: ${personalInfo.phone}`,
        `Location: ${personalInfo.location}`,
        `GitHub: ${personalInfo.github}`,
        `LinkedIn: ${personalInfo.linkedin}`,
      ],
      hinglish: [
        `Email: ${personalInfo.email}`,
        `Phone: ${personalInfo.phone}`,
        `Location: ${personalInfo.location}`,
        `GitHub: ${personalInfo.github}`,
        `LinkedIn: ${personalInfo.linkedin}`,
      ],
    },
  },
  {
    keywords: ["achievement", "rank", "award", "honor", "honour"],
    response: {
      en: achievementsData.map((item) => item),
      hinglish: achievementsData.map((item) => item),
    },
  },
  {
    keywords: ["education", "study", "college", "iit", "madras", "degree"],
    response: {
      en: ["Indian Institute of Technology Madras.", "B.S. in Data Science & Applications.", "2nd Year, 2024 - 2028."],
      hinglish: ["Indian Institute of Technology Madras.", "B.S. in Data Science & Applications.", "2nd Year, 2024 - 2028."],
    },
  },
  {
    keywords: ["resume", "cv", "download"],
    response: {
      en: [`Resume: ${personalInfo.resumeUrl}`],
      hinglish: [`Resume: ${personalInfo.resumeUrl}`],
    },
  },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\u0900-\u097f\s]/g, " ").replace(/\s+/g, " ").trim();
}

function formatReply(lines: string[], language: Language) {
  const filtered = lines.filter(Boolean);
  if (!filtered.length) return translations.fallback[language].join("\n");
  return filtered.map((line) => `• ${line}`).join("\n");
}

function createReply(question: string, language: Language) {
  const normalized = normalize(question);
  if (!normalized) return translations.fallback[language].join("\n");

  if (/^(hello|hey|hola|hi jarvis|hello jarvis|chota jarvis)/.test(normalized)) {
    return translations.greeting[language];
  }

  const match = knowledgeBase.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  if (match) {
    return formatReply(match.response[language], language);
  }

  return translations.fallback[language].join("\n");
}

function localizeQuickPrompt(prompt: { en: string; hinglish: string }, language: Language) {
  return prompt[language];
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 1, role: "bot", text: translations.greeting.en },
    { id: 2, role: "bot", text: translations.helper.en },
  ]);

  const visibleQuickPrompts = useMemo(() => quickPrompts.map((prompt) => localizeQuickPrompt(prompt, language)), [language]);

  useEffect(() => {
    if (!open) return;
    window.requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, [messages, open]);

  const pushMessage = (role: Message["role"], text: string) => {
    setMessages((current) => [...current, { id: Date.now() + current.length, role, text }]);
  };

  const sendQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const selectedLanguage = language;
    pushMessage("user", trimmed);
    setInput("");

    window.setTimeout(() => {
      pushMessage("bot", createReply(trimmed, selectedLanguage));
    }, 120);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[540] bg-black/10 backdrop-blur-[1px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="pointer-events-auto fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[551] inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#111111] px-5 py-3.5 text-white shadow-[0_20px_55px_rgba(17,17,17,0.28)] transition-transform hover:-translate-y-0.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-expanded={open}
          aria-label={open ? "Close Chota Jarvis" : "Open Chota Jarvis"}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
            <MessageSquareText size={19} />
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold leading-tight">Chota Jarvis</span>
            <span className="block text-[11px] text-white/65 leading-tight">Ask anything about the portfolio</span>
          </span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="pointer-events-auto fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[550] w-[calc(100vw-2rem)] max-w-[340px] max-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 bg-stone-900 text-white">
                <div className="flex items-center gap-2">
                  <Bot size={16} />
                  <span className="text-sm font-semibold">{translations.title[language]}</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                  aria-label="Close chatbot"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="px-4 py-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((option) => {
                    const active = option.id === language;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setLanguage(option.id)}
                        className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors ${
                          active ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white text-stone-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-3">
                  <div className="max-h-[44vh] space-y-2 overflow-y-auto pr-1 text-sm leading-relaxed text-stone-800">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[88%] rounded-2xl px-3 py-2 whitespace-pre-line ${
                            message.role === "user" ? "bg-stone-900 text-white" : "bg-white text-stone-800 border border-stone-200"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {visibleQuickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendQuestion(prompt)}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-700"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendQuestion(input);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-2"
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={translations.inputPlaceholder[language]}
                    className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex min-w-[4.5rem] items-center justify-center gap-2 rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}