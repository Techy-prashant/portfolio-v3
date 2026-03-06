"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type ProgressBarProps = { name: string; percentage: number };

export default function ProgressBar({ name, percentage }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-stone-800">{name}</span>
        <motion.span className="text-xs font-mono text-stone-700 font-bold tabular-nums" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
          {percentage}%
        </motion.span>
      </div>
      <div className="h-[2px] w-full bg-stone-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-stone-800"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}
