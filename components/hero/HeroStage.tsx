"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import type { HeroProgress } from "./timeline";
import { useHeroScroll } from "./useHeroScroll";

// three.js and R3F load only in the browser, after first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  // Written by the scroll hook, read by the frame loop.
  const progress = useRef<HeroProgress>({ target: 0 });

  // Created at hydration, not after the canvas loads, so the pin never appears mid-scroll.
  useHeroScroll(stageRef, progress, true);

  return (
    <div
      ref={stageRef}
      data-hero-stage
      className="relative mx-auto h-[320px] w-full max-w-[540px] lg:h-[520px]"
    >
      <HeroCanvas progress={progress} />
    </div>
  );
}
