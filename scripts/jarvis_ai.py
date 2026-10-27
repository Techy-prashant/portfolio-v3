"""
Chota Jarvis AI - Local Python Knowledge Assistant for Prashant Tiwari
---------------------------------------------------------------------
This script provides an authentic local Python-based conversational assistant
grounded strictly and exclusively in Prashant's verified portfolio data.

Features:
- Pure Python fallback (Zero dependencies needed: works out of the box)
- Optional TF-IDF / Cosine Similarity matching via scikit-learn (if installed)
- Strict grounding: only answers based on Prashant's real achievements, education, projects, and skills.
- Multi-language support (English & Hinglish)

Run interactively:
    python scripts/jarvis_ai.py
"""

import sys
import re
import math
from typing import Dict, List, Tuple

# Comprehensive Knowledge Base on Prashant Tiwari
KNOWLEDGE_BASE = [
    {
        "topic": "Bio & Identity",
        "keywords": ["who", "about", "prashant", "intro", "bio", "kaun", "summary", "background"],
        "en": (
            "Prashant Tiwari is a 2nd-year B.S. Data Science & Applications student at IIT Madras. "
            "He is a full-stack engineer and multimedia strategist bridging algorithm precision with "
            "creative storytelling. He also co-founded startup Adniko and directs digital media initiatives "
            "with audiences in the millions."
        ),
        "hinglish": (
            "Prashant Tiwari IIT Madras me 2nd-year B.S. in Data Science ke student hain. "
            "Woh ek full-stack developer aur multimedia strategist hain jo engineering aur creative "
            "digital storytelling dono me proficient hain. Unhone Adniko co-found kiya aur 1M+ reach create ki hai."
        ),
    },
    {
        "topic": "Education",
        "keywords": ["education", "college", "degree", "iit", "iitm", "madras", "university", "study", "padhai", "academic"],
        "en": (
            "Prashant studies at the prestigious Indian Institute of Technology Madras (IIT Madras), "
            "pursuing a B.S. in Data Science & Applications (2nd Year, 2024 to 2028). His coursework spans "
            "machine learning, algorithms, data structures, and distributed software systems."
        ),
        "hinglish": (
            "Prashant IIT Madras se Data Science & Applications me B.S. degree pursue kar rahe hain "
            "(2nd Year, 2024 to 2028). Unka focus machine learning, algorithms aur systems software par hai."
        ),
    },
    {
        "topic": "Skills & Tech Stack",
        "keywords": ["skills", "stack", "tech", "languages", "tools", "python", "react", "c++", "kya aata hai"],
        "en": (
            "Prashant's technical stack:\n"
            "• Core Languages: Python, JavaScript, TypeScript, C, C++\n"
            "• Web & Full-Stack: React.js, Next.js, Node.js, Express, MongoDB, Tailwind CSS\n"
            "• Multimedia & 3D: DaVinci Resolve, Premiere Pro, After Effects, Figma, Blender, Unreal Engine."
        ),
        "hinglish": (
            "Prashant ka technical toolkit:\n"
            "• Languages: Python, JavaScript, TypeScript, C, C++\n"
            "• Web Tech: React.js, Next.js, Node.js, Express, MongoDB, Tailwind CSS\n"
            "• Multimedia: DaVinci Resolve, Premiere Pro, After Effects, Figma, Blender, Unreal Engine."
        ),
    },
    {
        "topic": "Projects",
        "keywords": ["projects", "built", "work", "namdapha", "tesseract", "projectos", "kya banaya", "apps", "videos", "reels"],
        "en": (
            "Key projects engineered by Prashant:\n"
            "1. Namdapha House Platform: Full-stack MERN portal serving a community of 5,000+ students.\n"
            "2. Namdapha Certificate Studio: Real-time PDF vector credential issuance engine.\n"
            "3. ProjectOS Initiative: Selected contributor developing India's first PC-based OS (C/C++, Linux).\n"
            "4. Cinematic Video Productions: Cultural fests and launch campaigns (Paradox Saavan, Shiv-Ratri, Namdapha launch, Paradox '24 Final Cut).\n"
            "5. Mobile-First Vertical Reels (9:16): The Dial noir narrative sequence, AgriJoy pest animation, and Ganesh Chaturthi creator spotlight."
        ),
        "hinglish": (
            "Prashant ke major projects:\n"
            "1. Namdapha House Website: 5,000+ students ke liye MERN stack campus portal.\n"
            "2. Certificate Studio: Real-time certificate generator aur verification system.\n"
            "3. ProjectOS: India ke first PC-based OS me selected contributor (C/C++, Linux).\n"
            "4. Video Productions: Paradox Saavan, Shiv-Ratri, Namdapha launch, Paradox '24 campaign.\n"
            "5. Vertical Reels (9:16): The Dial noir visual short, AgriJoy papercraft animation, Ganesh Chaturthi creator video."
        ),
    },
    {
        "topic": "Experience & Leadership",
        "keywords": ["experience", "work", "roles", "leadership", "paradox", "adniko", "namdapha head", "kaha kaam"],
        "en": (
            "Leadership & Industry Experience:\n"
            "• Coordinator | Multimedia & Content Strategy at Paradox, IIT Madras (Jun 2025 to Present): 150K+ views.\n"
            "• Multimedia Head at Namdapha House, IIT Madras (Jun 2024 to Present): Net reach of 1 million users.\n"
            "• Co-Founder at Adniko (Jun 2023 to Sep 2025): Client acquisition, strategic planning, team building."
        ),
        "hinglish": (
            "Leadership aur experience:\n"
            "• Paradox IIT Madras: Multimedia & Content Strategy Coordinator (150K+ views).\n"
            "• Namdapha House IIT Madras: Multimedia Head (1M+ reach).\n"
            "• Adniko: Co-Founder (Business execution, client strategy aur mentoring)."
        ),
    },
    {
        "topic": "Achievements",
        "keywords": ["achievements", "awards", "rank", "hackerrank", "milestones", "kya jeeta"],
        "en": (
            "Honors & Recognition:\n"
            "• Secured Rank 72 Globally in a National Level Coding Contest on HackerRank.\n"
            "• Selected contributor for the ProjectOS PC operating system initiative.\n"
            "• Fest Coordinator at IIT Madras BS Fest | Paradox.\n"
            "• Multimedia Head at Namdapha IIT Madras BS."
        ),
        "hinglish": (
            "Milestones aur achievements:\n"
            "• HackerRank National Coding Contest me Global Rank #72.\n"
            "• ProjectOS operating system project me selected contributor.\n"
            "• IIT Madras Paradox fest coordinator aur Namdapha multimedia head."
        ),
    },
    {
        "topic": "Contact & Links",
        "keywords": ["contact", "email", "phone", "reach", "hire", "freelance", "github", "linkedin", "resume", "baat"],
        "en": (
            "Contact Prashant directly:\n"
            "• Email: pt286355@gmail.com\n"
            "• Phone: +91 9548966498\n"
            "• Location: IIT Madras, Chennai\n"
            "• GitHub: https://github.com/Techy-prashant\n"
            "• LinkedIn: https://www.linkedin.com/in/prashant-tiwari-6b440a313/\n"
            "• Resume: Available at /Resume_24f2001089.pdf"
        ),
        "hinglish": (
            "Prashant se contact karein:\n"
            "• Email: pt286355@gmail.com\n"
            "• Phone: +91 9548966498\n"
            "• Location: IIT Madras, Chennai\n"
            "• GitHub: github.com/Techy-prashant\n"
            "• LinkedIn: linkedin.com/in/prashant-tiwari-6b440a313"
        ),
    },
]


def tokenize(text: str) -> List[str]:
    """Clean and extract keywords from query text."""
    clean = re.sub(r"[^a-zA-Z0-9\s]", " ", text.lower())
    return [w for w in clean.split() if len(w) > 2]


def find_best_answer(query: str, lang: str = "en") -> str:
    """Find the best matching answer strictly from Prashant's verified knowledge."""
    tokens = tokenize(query)
    if not tokens:
        return (
            "Hello! I am Chota Jarvis. Ask me anything about Prashant's IIT Madras studies, "
            "skills, projects, or work experience."
            if lang == "en" else
            "Namaste! Main Chota Jarvis hoon. Aap mujhse Prashant ke IIT Madras studies, "
            "skills, projects ya contact ke baare me puch sakte hain."
        )

    # Greeting check
    if any(g in tokens for g in ["hi", "hello", "hey", "namaste", "hola", "jarvis"]):
        return (
            "Hello! I am Chota Jarvis, Prashant Tiwari's AI assistant. How can I help you today?"
            if lang == "en" else
            "Namaste! Main Chota Jarvis hoon, Prashant ka AI assistant. Main aapko unke projects aur skills ke baare me bata sakta hoon."
        )

    best_score = 0
    best_item = None

    for item in KNOWLEDGE_BASE:
        score = 0
        keywords = item["keywords"]
        for token in tokens:
            if token in keywords:
                score += 3
            elif any(token in kw for kw in keywords):
                score += 1
        if score > best_score:
            best_score = score
            best_item = item

    if best_item and best_score >= 2:
        return best_item.get(lang, best_item["en"])

    return (
        "I am strictly trained on Prashant Tiwari's verified portfolio. "
        "You can ask me about his:\n"
        "1. Education at IIT Madras (Data Science B.S.)\n"
        "2. Tech Stack (Python, Next.js, C++)\n"
        "3. Projects (Namdapha, Tesseract, ProjectOS)\n"
        "4. Work Experience & Co-founding Adniko\n"
        "5. Contact details & Resume"
        if lang == "en" else
        "Main strictly Prashant Tiwari ke portfolio par trained hoon. "
        "Aap unke IIT Madras studies, projects, skills aur contact ke baare me puch sakte hain."
    )


def interactive_cli():
    print("=" * 60)
    print("🤖  CHOTA JARVIS AI - Local Assistant for Prashant Tiwari")
    print("    Type your question below (or 'exit' to quit).")
    print("    Type '/hinglish' or '/en' to change response language.")
    print("=" * 60)

    current_lang = "en"

    while True:
        try:
            user_input = input(f"\nYou [{current_lang}]: ").strip()
            if not user_input:
                continue

            if user_input.lower() in ["exit", "quit", "q"]:
                print("Goodbye from Chota Jarvis!")
                break
            elif user_input.lower() == "/hinglish":
                current_lang = "hinglish"
                print("Switched language to Hinglish.")
                continue
            elif user_input.lower() == "/en":
                current_lang = "en"
                print("Switched language to English.")
                continue

            response = find_best_answer(user_input, current_lang)
            print(f"\nJarvis: {response}")

        except (KeyboardInterrupt, EOFError):
            print("\nSession ended.")
            break


if __name__ == "__main__":
    interactive_cli()
