import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";

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

export const metadata: Metadata = {
  title: "Prashant Tiwari — Where Logic Meets Canvas",
  description: "Full-Stack Developer, Multimedia Strategist & Data Science student at IIT Madras.",
  keywords: ["Prashant Tiwari", "IIT Madras", "Full-Stack Developer", "Multimedia", "Data Science"],
  authors: [{ name: "Prashant Tiwari" }],
  openGraph: {
    title: "Prashant Tiwari — Where Logic Meets Canvas",
    description: "Full-Stack Developer & Multimedia Strategist at IIT Madras",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable} scroll-smooth`}>
      <body className="antialiased font-sans selection:bg-[#174EA6] selection:text-white cursor-none pl-64">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
