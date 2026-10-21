"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import type { HeroProgress } from "./timeline";

// three.js and R3F load only in the browser, after first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroStage() {
  // Shared with the frame loop. Scroll writes `target` from Task 5; 0 until then.
  const progress = useRef<HeroProgress>({ target: 0, current: 0 });

  return (
    <div
      data-hero-stage
      className="relative mx-auto h-[320px] w-full max-w-[540px] lg:h-[520px]"
    >
      <HeroCanvas progress={progress} />
    </div>
  );
}
