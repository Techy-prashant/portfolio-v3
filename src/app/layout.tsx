import type { Metadata } from "next";
import { Playfair_Display, Libre_Baskerville, Syne, Space_Mono, Manrope } from "next/font/google";
// @ts-ignore - Next.js handles global CSS side-effect imports at build time
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ReadingProgress from "@/components/ui/ReadingProgress";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import { CircadianThemeProvider } from "@/context/CircadianThemeContext";
import CuteRunnerLoader from "@/components/intro/CuteRunnerLoader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-v3-ten-gray.vercel.app/"),
  title: "Prashant Tiwari | Where Logic Meets Canvas.",
  description:
    "Data Science student at IIT Madras building full-stack systems and creative digital experiences.",
  icons: {
    icon: "/website_logo.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prashant Tiwari | Where Logic Meets Canvas.",
    description:
      "Data Science student at IIT Madras building full-stack systems and creative digital experiences.",
    type: "website",
    url: "https://portfolio-v3-ten-gray.vercel.app/",
    images: [
      {
        url: "/previewscreen.jpg",
        width: 1200,
        height: 630,
        alt: "Prashant Tiwari | Where Logic Meets Canvas.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Tiwari | Where Logic Meets Canvas.",
    description:
      "Data Science student at IIT Madras building full-stack systems and creative digital experiences.",
    images: ["/previewscreen.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${libreBaskerville.variable} ${syne.variable} ${spaceMono.variable} ${manrope.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/fonts/soria-bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="https://fonts.cdnfonts.com/css/soria" rel="stylesheet" />
        <script
          id="circadian-theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isLive = localStorage.getItem('prashant_portfolio_is_live') !== 'false';
                  var savedTime = localStorage.getItem('prashant_portfolio_interactive_time');
                  var h = new Date().getHours();
                  if (!isLive && savedTime) {
                    try {
                      var parsed = JSON.parse(savedTime);
                      if (typeof parsed.hours === 'number') h = parsed.hours;
                    } catch(e) {}
                  }
                  var phase = 'midnight';
                  if (h >= 6 && h < 16) {
                    phase = 'daylight';
                  } else if (h >= 16 && h < 20) {
                    phase = 'evening';
                  } else {
                    phase = 'midnight';
                  }
                  var root = document.documentElement;
                  root.setAttribute('data-theme', phase);
                  root.classList.remove('theme-daylight', 'theme-evening', 'theme-midnight', 'dark', 'light');
                  root.classList.add('theme-' + phase);
                  if (phase === 'midnight') {
                    root.classList.add('dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.add('light');
                    root.style.colorScheme = 'light';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans selection:bg-blue-500/25 selection:text-current relative">
        <CircadianThemeProvider>
          {/* Satisfying Theme-Aware Cute Runner Intro Experience */}
          <CuteRunnerLoader />

          {/* Circadian Three-Phase Ambient Sky Layers */}
          <div className="ambient-sky ambient-sky-daylight" />
          <div className="ambient-sky ambient-sky-evening" />
          <div className="ambient-sky ambient-sky-midnight" />
          <div className="ambient-grid" />
          <div className="ambient-noise" />

          {/* Core UI & Navigation */}
          <ReadingProgress />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <ChatbotWidget />
        </CircadianThemeProvider>
      </body>
    </html>
  );
}
