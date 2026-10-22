"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import DefenseStack from "./DefenseStack";
import { LAYERS } from "./layers";
import type { HeroProgress } from "./timeline";

declare global {
  interface Window {
    /** Frames rendered by the hero; only counted in NEXT_PUBLIC_HERO_DEBUG builds (tests). */
    __heroFrames?: number;
  }
}

const DEBUG = process.env.NEXT_PUBLIC_HERO_DEBUG === "1";

/** Tells the stage once the first frame has rendered, and counts frames in debug builds. */
function FrameSignals({ onReady }: { onReady: () => void }) {
  const sent = useRef(false);
  useFrame(() => {
    if (DEBUG) window.__heroFrames = (window.__heroFrames ?? 0) + 1;
    if (!sent.current) {
      sent.current = true;
      onReady();
    }
  });
  return null;
}

/** True while the element is on screen and the tab is visible. */
function useShouldRender(ref: RefObject<HTMLElement | null>) {
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return onScreen && tabVisible;
}

export default function HeroCanvas({
  progress,
  onReady,
  onLost,
}: {
  progress: RefObject<HeroProgress>;
  onReady: () => void;
  onLost: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const render = useShouldRender(root);

  // This file only loads client-side, so window is available.
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  // Pixel ratio cap: 2 from lg up, 1.5 below.
  const dpr: [number, number] = wide ? [1, 2] : [1, 1.5];
  // Aim right of the stack so it sits left of centre, leaving room for the labels.
  // Narrow canvases need a bigger shift. Moves along screen-right: (1, 0, -1) / sqrt 2.
  const aimRight = (wide ? 0.55 : 0.85) / Math.SQRT2;
  // Narrow canvases also zoom out a little, so the longest label clears the edge.
  const fov = wide ? 30 : 34;

  return (
    // aria-hidden covers the canvas and the labels: the headline and the
    // poster's description carry the meaning.
    <div ref={root} aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={dpr}
        gl={{ alpha: true, antialias: true }}
        // Pauses rendering off-screen and in hidden tabs.
        frameloop={render ? "always" : "never"}
        // offsetSize ignores CSS transforms, so the scroll-driven scale on the
        // stage doesn't resize the canvas every frame.
        resize={{ scroll: false, offsetSize: true }}
        camera={{ position: [6.2, 4, 6.2], fov }}
        onCreated={({ camera, gl }) => {
          camera.lookAt(aimRight, 0, -aimRight);
          gl.domElement.addEventListener("webglcontextlost", onLost, { once: true });
        }}
      >
        <FrameSignals onReady={onReady} />
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
