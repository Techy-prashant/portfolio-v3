export const personalInfo = {
  name: "Prashant Tiwari",
  avatarUrl: "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/cool.png",
  roles: [
    "Tech-Developer",
    "Multimedia Strategist",
    "Data Science Engineer",
    "Creative Technologist",
  ],
  email: "pt286355@gmail.com",
  phone: "+91 9548966498",
  location: "IIT Madras, Chennai",
  resumeUrl: "/Resume_24f2001089.pdf",
  github: "https://github.com/Techy-prashant",
  linkedin: "https://www.linkedin.com/in/prashant-tiwari-6b440a313/",
};

export const heroContent = {
  greeting: "Hello, I'm",
  headline: "Where Logic\nMeets Canvas.",
  subheadline: "Building systems that think and stories that resonate.",
  description:
    "I'm a Data Science student at IIT Madras who architects scalable full-stack systems by day and directs high-impact multimedia campaigns by night. I bridge the gap between engineering precision and creative vision.",
};

export const aboutContent = {
  paragraphs: [
    "I'm a 2nd-year B.S. student in Data Science and Applications at the Indian Institute of Technology Madras, one of India's most prestigious technical institutions. My academic foundation spans machine learning, algorithms, and software systems, which I continuously apply to real-world products and platforms.",
    "Beyond the terminal, I lead cross-functional multimedia teams, drive content strategy for audiences in the millions, and co-founded a startup from the ground up. Whether it's engineering a full-stack web application or producing a viral digital campaign, I approach every challenge with the same obsessive attention to detail, because great systems and great stories are built the same way.",
  ],
};

export type SkillCategory = {
  category: string;
  skills: { name: string; percentage: number }[];
};

export const skillsData: SkillCategory[] = [
  {
    category: "Languages & Core",
    skills: [
      { name: "Python", percentage: 88 },
      { name: "JavaScript / TypeScript", percentage: 85 },
      { name: "C / C++", percentage: 78 },
    ],
  },
  {
    category: "Web Development",
    skills: [
      { name: "React.js / Next.js", percentage: 87 },
      { name: "Tailwind CSS", percentage: 90 },
      { name: "Node.js / Express", percentage: 80 },
      { name: "MongoDB", percentage: 78 },
    ],
  },
  {
    category: "Multimedia & Design",
    skills: [
      { name: "DaVinci Resolve / Premiere Pro", percentage: 92 },
      { name: "Adobe After Effects", percentage: 85 },
      { name: "Figma / Affinity", percentage: 82 },
      { name: "Blender / Unreal Engine", percentage: 70 },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  duration: string;
  type: string;
  description: string[];
};

export const experienceData: Experience[] = [
  {
    role: "Coordinator | Multimedia & Content Strategy",
    company: "Paradox, IIT Madras",
    duration: "Jun 2025 to Present",
    type: "Leadership",
    description: [
      "Spearheaded content ideation, video editing, and graphic design initiatives across Instagram, LinkedIn, and YouTube (@paradox_iitmadras).",
      "Executed targeted digital campaigns driving engagement and accumulating 150,000+ views.",
    ],
  },
  {
    role: "Multimedia Head",
    company: "Namdapha House, IIT Madras",
    duration: "Jun 2024 to Present",
    type: "Leadership",
    description: [
      "Directed a cross-functional multimedia team producing high-quality digital content for student meet-ups, live sessions, events, workshops, and cultural festivals.",
      "Managed comprehensive content strategy and social media planning (@namdapha_iitm), achieving a net reach of 1 million new users.",
    ],
  },
  {
    role: "Co-Founder",
    company: "Adniko",
    duration: "Jun 2023 to Sep 2025",
    type: "Entrepreneurship",
    description: [
      "Drove comprehensive strategic planning, on-ground marketing execution, and client acquisition to establish and scale the startup.",
      "Built and mentored a dynamic team, cultivating a shared organizational vision and leveraging complementary skills to achieve key business objectives.",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  techStack: string[];
  thumbnailUrl: string;
  externalLink?: string;
  githubUrl: string;
  badge?: string;
  status: "Completed" | "On-going";
  imageTheme: "light" | "dark";
};

export const projectsData: Project[] = [
  {
    id: "namdapha-website",
    title: "Namdapha House Platform",
    category: "Full-Stack Web & Community",
    role: "Web-Ops & Multimedia Lead",
    description:
      "Collaborated in the full-stack development and deployment of the official Namdapha House platform, engineered to serve, manage, and scale for an active community of 5,000+ students at IIT Madras.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/Namdapha%20House%20Platform.png",
    externalLink: "https://namdapha.iitmbs.org",
    githubUrl: "https://github.com/Techy-prashant",
    badge: "Flagship Campus Platform",
    status: "Completed",
    imageTheme: "dark",
  },
  {
    id: "certificate-generator",
    title: "Namdapha Certificate Studio",
    category: "Frontend & PDF Vector Engine",
    role: "Lead Architect & Full-Stack Developer",
    description:
      "Institutional web application for creating, issuing, managing, and cryptographically verifying credentials for Namdapha House, featuring a real-time visual canvas studio and PDF-Lib vector compilation.",
    techStack: ["React 18", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "PDF-Lib"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/Namdapha%20Certificate%20Studio.png",
    externalLink: "https://certificate-generator-liart-pi.vercel.app",
    githubUrl: "https://github.com/Techy-prashant/Certificate-Generator",
    badge: "Production Credential Registry",
    status: "Completed",
    imageTheme: "light",
  },
  {
    id: "agriscope",
    title: "AgriScope Smart Data Dashboard",
    category: "Data Science & Visual Analytics",
    role: "Data Science Engineer",
    description:
      "Interactive data science dashboard designed to explore, benchmark, and compare complex agricultural datasets, featuring multi-crop explorer matrices, correlation heatmaps, and predictive quality reporting.",
    techStack: ["Python", "Streamlit", "Pandas", "Plotly Express", "Data Analytics"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/AgriScope%20Smart%20Data%20Dashboard.png",
    externalLink: "https://agriscopegit-dashboard.streamlit.app/",
    githubUrl: "https://github.com/Techy-prashant/AgriScope",
    badge: "Live Streamlit Cloud",
    status: "Completed",
    imageTheme: "light",
  },
  {
    id: "rag-langchain",
    title: "TechNova Policy Intelligence RAG",
    category: "Generative AI & LLM Systems",
    role: "AI & ML Systems Engineer",
    description:
      "Production-ready Retrieval-Augmented Generation system built to answer enterprise policy queries with 100% context grounding, zero hallucination, semantic vector retrieval via FAISS, and Google Gemini LLMs.",
    techStack: ["LangChain LCEL", "Google Gemini", "FAISS Vector CPU", "Python 3.11", "RAG"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/TechNova%20Policy%20Intelligence%20RAG.png",
    githubUrl: "https://github.com/Techy-prashant/mini-project_Langchain",
    badge: "Enterprise RAG Pipeline",
    status: "Completed",
    imageTheme: "light",
  },
  {
    id: "dailybuddy",
    title: "DailyBuddy WebAssembly Suite",
    category: "Client-Side WASM & Full-Stack",
    role: "Creator & Core Engineer",
    description:
      "Zero-cost, privacy-first client-side utility suite where file transformations, background removals, format conversions, and PDF tools run locally on-device using WebAssembly with a dedicated Python media fetcher.",
    techStack: ["Next.js 15", "WebAssembly", "TypeScript", "Python Microservice", "Tailwind CSS"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/DailyBuddy/main/public/site-cover.png",
    githubUrl: "https://github.com/Techy-prashant/DailyBuddy",
    badge: "Client-Side WASM Suite",
    status: "On-going",
    imageTheme: "dark",
  },
  {
    id: "business-entity-resolution",
    title: "Business Entity Resolution Pipeline",
    category: "Machine Learning & Big Data",
    role: "ML Pipeline Architect",
    description:
      "Scalable, out-of-core machine learning pipeline designed for high-throughput entity resolution, candidate record blocking, similarity matching, and batch inference across heterogeneous, noisy corporate registries.",
    techStack: ["Python", "Machine Learning", "Out-of-Core Processing", "Record Linkage"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/Business%20Entity%20Resolution%20Pipeline.png",
    githubUrl: "https://github.com/Techy-prashant/Scalable-Business-Entity-Resolution",
    badge: "Out-of-Core ML Pipeline",
    status: "Completed",
    imageTheme: "dark",
  },
  {
    id: "projectos",
    title: "ProjectOS System Initiative",
    category: "Systems / OS Architecture",
    role: "Selected Core Contributor",
    description:
      "Selected contributor for India's first student-led PC operating system initiative under Project Nirmaan, focusing on low-level system architecture, kernel abstractions, and user interface physics.",
    techStack: ["C", "C++", "Linux Kernel", "System Architecture"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/ProjectOS.png",
    githubUrl: "https://github.com/Project-Nirmaan",
    badge: "National OS Initiative",
    status: "On-going",
    imageTheme: "dark",
  },
  {
    id: "email-drafter",
    title: "Namdapha Email Studio",
    category: "Visual Email Studio & Compiler",
    role: "Lead Architect & UI Engineer",
    description:
      "Production visual email design studio and responsive HTML compiler engineered for Namdapha House, featuring drag-and-drop canvas editing, dynamic typography controls, and cross-client table generation.",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "HTML Compiler", "Canva Studio"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/portfolioproject-images/Namdapha%20Email%20Studio.png",
    githubUrl: "https://github.com/Techy-prashant/Email-drafter",
    badge: "Visual Email Studio",
    status: "On-going",
    imageTheme: "light",
  },
];

export const achievementsData: string[] = [
  "Secured Rank 72 globally in a National Level Coding Contest on HackerRank.",
  "Selected for the ProjectOS startup initiative, developing India's first PC-based OS.",
  "Coordinator at IITM BS Fest | Paradox.",
  "Multimedia Head at Namdapha IITM BS.",
  "Head Editor at Stemonef | HumanON.",
  "Co-Founder of Adniko.",
];

export const socialLinks = [
  {
    platform: "GitHub",
    handle: "@Techy-prashant",
    url: "https://github.com/Techy-prashant",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    handle: "/prashant-tiwari",
    url: "https://www.linkedin.com/in/prashant-tiwari-6b440a313/",
    icon: "linkedin",
  },
  {
    platform: "Email",
    handle: "pt286355@gmail.com",
    url: "mailto:pt286355@gmail.com",
    icon: "mail",
  },
];
