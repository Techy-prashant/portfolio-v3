export const personalInfo = {
  name: "Prashant Tiwari",
  roles: [
    "Tech-Developer",
    "Multimedia Strategist",
    "Data Science Engineer",
    "Creative Technologist",
  ],
  email: "pt286355@gmail.com",
  phone: "+91 9548966498",
  location: "IIT Madras, Chennai",
  resumeUrl: "/Prashant_Resume.pdf",
  github: "https://github.com/Techy-prashant",
  linkedin: "https://www.linkedin.com/in/prashant-tiwari-6b440a313/",
};

export const heroContent = {
  greeting: "Hello, I'm",
  headline: "Where Logic\nMeets Canvas.",
  subheadline: "Building systems that think — and stories that resonate.",
  description:
    "I'm a Data Science student at IIT Madras who architects scalable full-stack systems by day and directs high-impact multimedia campaigns by night. I bridge the gap between engineering precision and creative vision.",
};

export const aboutContent = {
  paragraphs: [
    "I'm a 2nd-year B.S. student in Data Science and Applications at the Indian Institute of Technology Madras — one of India's most prestigious technical institutions. My academic foundation spans machine learning, algorithms, and software systems, which I continuously apply to real-world products and platforms.",
    "Beyond the terminal, I lead cross-functional multimedia teams, drive content strategy for audiences in the millions, and co-founded a startup from the ground up. Whether it's engineering a full-stack web application or producing a viral digital campaign, I approach every challenge with the same obsessive attention to detail — because great systems and great stories are built the same way.",
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
    role: "Coordinator — Multimedia & Content Strategy",
    company: "Paradox, IIT Madras",
    duration: "Jun 2025 – Present",
    type: "Leadership",
    description: [
      "Spearheaded content ideation, video editing, and graphic design initiatives across Instagram, LinkedIn, and YouTube (@paradox_iitmadras).",
      "Executed targeted digital campaigns driving engagement and accumulating 150,000+ views.",
    ],
  },
  {
    role: "Multimedia Head",
    company: "Namdapha House, IIT Madras",
    duration: "Jun 2024 – Present",
    type: "Leadership",
    description: [
      "Directed a cross-functional multimedia team producing high-quality digital content for student meet-ups, live sessions, events, workshops, and cultural festivals.",
      "Managed comprehensive content strategy and social media planning (@namdapha_iitm), achieving a net reach of 1 million new users.",
    ],
  },
  {
    role: "Co-Founder",
    company: "Adniko",
    duration: "Jun 2023 – Sep 2025",
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
  externalLink: string;
};

export const projectsData: Project[] = [
  {
    id: "namdapha-website",
    title: "Namdapha House Website",
    category: "Full-Stack Web",
    role: "Web-Ops & Multimedia Lead",
    description:
      "Collaborated in the full-stack development and deployment of the official Namdapha House website, designed to reliably serve, manage, and scale for a community of 5,000+ students.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/Namdapha.png",
    externalLink: "https://namdapha.iitmbs.org",
  },
  {
    id: "tesseract-website",
    title: "Tesseract Club Website",
    category: "Frontend",
    role: "Web-Ops & Multimedia Lead",
    description:
      "Led the end-to-end design and development of a modern, highly interactive club website hosted via Netlify to boost student engagement and streamline club updates.",
    techStack: ["React.js", "HTML5", "CSS3", "JavaScript", "Figma"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/brave_screenshot_tesseractfun.netlify.app.png",
    externalLink: "https://tesseractfun.netlify.app",
  },
  {
    id: "projectos",
    title: "ProjectOS Initiative",
    category: "Systems / OS",
    role: "Selected Contributor",
    description:
      "Selected for the ProjectOS startup initiative | developing India's first PC-based OS alongside fellow students, focusing on system-level architecture and UI/UX design.",
    techStack: ["C", "C++", "Linux", "System Design"],
    thumbnailUrl:
      "https://raw.githubusercontent.com/Techy-prashant/images_workIITM/refs/heads/main/ProjectOS.png",
    externalLink: "https://github.com/Project-Nirmaan",
  },
];

export const achievementsData: string[] = [
  "Secured Rank 72 globally in a National Level Coding Contest on HackerRank.",
  "Selected for the ProjectOS startup initiative — developing India's first PC-based OS.",
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
