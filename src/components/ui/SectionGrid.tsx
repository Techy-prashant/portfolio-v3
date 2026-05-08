"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  reverse?: boolean;
  gridClassName?: string;
};

export default function SectionGrid({ children, reverse = false, gridClassName }: Props) {
  const cols = reverse ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]";
  return (
    <div className="max-w-7xl mx-auto">
      <div className={`grid ${cols} gap-10 lg:gap-8 ${gridClassName ?? "items-center"}`}>
        {children}
      </div>
    </div>
  );
}
