"use client";

import type { RefObject } from "react";
import { Canvas } from "@react-three/fiber";

import DefenseStack from "./DefenseStack";
import type { HeroProgress } from "./timeline";

export default function HeroCanvas({
  progress,
}: {
  progress: RefObject<HeroProgress>;
}) {
  // Pixel ratio cap: 2 from lg up, 1.5 below. This file only loads client-side.
  const dpr: [number, number] = window.matchMedia("(min-width: 1024px)").matches
    ? [1, 2]
    : [1, 1.5];

  return (
    // aria-hidden also covers drei <Html> labels, which portal into this container.
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={dpr}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [6.2, 4, 6.2], fov: 30 }}
      >
        <DefenseStack progress={progress} />
      </Canvas>
    </div>
  );
}
