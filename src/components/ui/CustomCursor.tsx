"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ref  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    audio.current = new Audio("/click.mp3");
    audio.current.volume = 0.4;

    const move = (e: MouseEvent) => {
      setVis(true);
      if (ref.current)  ref.current.style.transform  = `translate(${e.clientX-5}px,${e.clientY-5}px)`;
      if (ring.current) ring.current.style.transform = `translate(${e.clientX-16}px,${e.clientY-16}px)`;
      const el = e.target as HTMLElement;
      setHov(!!el.closest("a,button,[role='button']"));
    };
    const click = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a,button,[role='button']") && audio.current) {
        const c = audio.current.cloneNode() as HTMLAudioElement;
        c.volume = 0.35;
        c.play().catch(()=>{});
      }
    };
    const hide = () => setVis(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    document.addEventListener("mouseleave", hide);
    return () => { window.removeEventListener("mousemove",move); window.removeEventListener("click",click); document.removeEventListener("mouseleave",hide); };
  }, []);

  return (
    <>
      {/* dot */}
      <div ref={ref} className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-200" style={{ opacity: vis?1:0 }}>
        <div className={`rounded-full bg-slate-900 transition-all duration-200 ${hov?"w-3 h-3":"w-2.5 h-2.5"}`} />
      </div>
      {/* ring */}
      <div ref={ring} className="pointer-events-none fixed top-0 left-0 z-[9998] transition-opacity duration-200" style={{ opacity: vis?1:0 }}>
        <div className={`rounded-full border border-blue-400/60 transition-all duration-300 ${hov?"w-10 h-10 border-blue-500":"w-8 h-8"}`} />
      </div>
    </>
  );
}
