"use client";

import { useRef, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";

import DefenseStack from "./DefenseStack";
import { LAYERS } from "./layers";
import type { HeroProgress } from "./timeline";

export default function HeroCanvas({
  progress,
}: {
  progress: RefObject<HeroProgress>;
}) {
  const labels = useRef<(HTMLSpanElement | null)[]>([]);

  // This file only loads client-side, so window is available.
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  // Pixel ratio cap: 2 from lg up, 1.5 below.
  const dpr: [number, number] = wide ? [1, 2] : [1, 1.5];
  // Aim right of the stack so it sits left of centre, leaving room for the labels.
  // Narrow canvases need a bigger shift. Moves along screen-right: (1, 0, -1) / sqrt 2.
  const aimRight = (wide ? 0.55 : 0.85) / Math.SQRT2;

  return (
    // aria-hidden covers the canvas and the labels: the headline and the
    // poster's description carry the meaning.
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={dpr}
        gl={{ alpha: true, antialias: true }}
        // offsetSize ignores CSS transforms, so the scroll-driven scale on the
        // stage doesn't resize the canvas every frame.
        resize={{ scroll: false, offsetSize: true }}
        camera={{ position: [6.2, 4, 6.2], fov: 30 }}
        onCreated={({ camera }) => camera.lookAt(aimRight, 0, -aimRight)}
      >
        <DefenseStack progress={progress} labels={labels} />
      </Canvas>

      {/* Data labels, positioned each frame by DefenseStack. Plain DOM, not drei
          <Html>: its per-label React roots error on unmount under React 19. */}
      {LAYERS.map((layer, i) => (
        <span
          key={layer.number}
          ref={(node) => {
            labels.current[i] = node;
          }}
          data-hero-label
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-[12px] leading-none text-[#F3EDE6]"
          style={{ opacity: 0 }}
        >
          <span className="text-[#D6B48A]">{layer.number}</span> {layer.label}
        </span>
      ))}
    </div>
  );
}
