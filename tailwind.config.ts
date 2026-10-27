import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-ui)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        headline: ["var(--font-ui)", "sans-serif"],
        display: ["var(--font-ui)", "sans-serif"],
        ui: ["var(--font-ui)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
        soria: ["'Soria'", "serif"],
        playfair: ["var(--font-playfair)", "'Playfair Display'", "Georgia", "serif"],
        libre: ["var(--font-libre)", "'Libre Baskerville'", "Georgia", "serif"],
      },
      colors: {
        theme: {
          base: "var(--theme-bg-base)",
          primary: "var(--theme-text-primary)",
          secondary: "var(--theme-text-secondary)",
          muted: "var(--theme-text-muted)",
          accent: "var(--theme-text-accent)",
          card: "var(--theme-card-bg)",
          border: "var(--theme-card-border)",
          pill: "var(--theme-pill-bg)",
        },
        obsidian: {
          DEFAULT: "#101114",
          900: "#101114",
          800: "#16181D",
          700: "#1E2027",
          600: "#272A33",
        },
        porcelain: {
          DEFAULT: "#F8FAFC",
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
        },
        electric: {
          DEFAULT: "#1769E0",
          hover: "#0F52B8",
          subtle: "rgba(23, 105, 224, 0.08)",
          glow: "rgba(23, 105, 224, 0.25)",
        },
        ice: {
          DEFAULT: "#DCEBFF",
          50: "#F2F7FF",
          100: "#E6F0FF",
          200: "#DCEBFF",
        },
        silver: {
          DEFAULT: "#C8D0DC",
          light: "#E3E7EE",
          dark: "#A3ACB9",
        },
        slate: {
          muted: "#737B89",
        },
      },
      boxShadow: {
        "apple-sm": "0 2px 8px -2px rgba(16, 17, 20, 0.05), 0 1px 2px rgba(16, 17, 20, 0.02)",
        "apple-md": "0 8px 24px -4px rgba(16, 17, 20, 0.08), 0 2px 6px -1px rgba(16, 17, 20, 0.03)",
        "apple-lg": "0 16px 40px -8px rgba(16, 17, 20, 0.12), 0 4px 12px -2px rgba(16, 17, 20, 0.04)",
        "apple-glass": "0 20px 50px -12px rgba(16, 17, 20, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8) inset",
        "apple-dark": "0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
