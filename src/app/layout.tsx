import type { Metadata } from "next";
import { Syne, Space_Mono, Manrope, Caveat } from "next/font/google";
// @ts-ignore - Next.js handles global CSS side-effect imports at build time
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

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

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-v3-ten-gray.vercel.app/"),
  title: "Prashant Tiwari | Where logic meets Canvas.",
  description:
    "I'm a Data Science student at IIT Madras who architects scalable full-stack systems by day and directs high-impact multimedia campaigns by night. I bridge the gap between engineering precision and creative vision.",
  icons: {
    icon: "/website_logo.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prashant Tiwari | Where logic meets Canvas.",
    description:
      "I'm a Data Science student at IIT Madras who architects scalable full-stack systems by day and directs high-impact multimedia campaigns by night. I bridge the gap between engineering precision and creative vision.",
    type: "website",
    url: "https://portfolio-v3-ten-gray.vercel.app/",
    images: [
      {
        url: "/previewscreen.png",
        width: 1200,
        height: 630,
        alt: "Prashant Tiwari | Where logic meets Canvas.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Tiwari | Where logic meets Canvas.",
    description:
      "I'm a Data Science student at IIT Madras who architects scalable full-stack systems by day and directs high-impact multimedia campaigns by night. I bridge the gap between engineering precision and creative vision.",
    images: ["/previewscreen.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable} ${manrope.variable} ${caveat.variable} scroll-smooth`}>
      <body className="antialiased font-sans selection:bg-[#0047AB] selection:text-white cursor-none lg:pl-64">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
