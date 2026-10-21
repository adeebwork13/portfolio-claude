"use client";

import dynamic from "next/dynamic";

// three.js and R3F load only in the browser, after first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroStage() {
  return (
    <div
      data-hero-stage
      className="relative mx-auto h-[320px] w-full max-w-[540px] lg:h-[520px]"
    >
      <HeroCanvas />
    </div>
  );
}
