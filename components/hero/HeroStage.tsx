"use client";

import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";

import { shouldLoad3D, type HeroProgress, type LoadEnv } from "./timeline";
import { useHeroScroll } from "./useHeroScroll";

// three.js and R3F load only in the browser, after first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const POSTER_ALT =
  "An exploded server stack: Network, Firewall, Operating System, Application and Data layers separated around a glowing AI core.";

/* ---------- Browser environment (read after hydration, live for reduced motion) ---------- */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

let webgl: boolean | undefined;
function hasWebGL(): boolean {
  if (webgl === undefined) {
    const gl =
      document.createElement("canvas").getContext("webgl2") ??
      document.createElement("canvas").getContext("webgl");
    webgl = gl !== null;
    // Release the test context straight away; browsers cap live contexts.
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webgl;
}

let snapshot: LoadEnv | null = null;
function getEnv(): LoadEnv {
  const reducedMotion = window.matchMedia(REDUCED_MOTION).matches;
  if (!snapshot || snapshot.reducedMotion !== reducedMotion) {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    snapshot = {
      reducedMotion,
      saveData: connection?.saveData === true,
      effectiveType: connection?.effectiveType,
      webgl: hasWebGL(),
    };
  }
  return snapshot;
}

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/* ---------- Poster: art-directed, captured at each layout's canvas size ---------- */

const { props: { srcSet: desktopPoster } } = getImageProps({
  alt: POSTER_ALT,
  src: "/hero/defense-stack.png",
  width: 1036,
  height: 1040,
  sizes: "518px",
});
const { props: mobilePoster } = getImageProps({
  alt: POSTER_ALT,
  src: "/hero/defense-stack-mobile.png",
  width: 700,
  height: 640,
  sizes: "(min-width: 600px) 540px, 100vw",
});

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  // Written by the scroll hook, read by the frame loop.
  const progress = useRef<HeroProgress>({ target: 0 });

  // null on the server and during hydration, so both render the poster.
  const env = useSyncExternalStore(subscribe, getEnv, () => null);

  // Decided once: the pin is never removed mid-visit, or the page would jump.
  const [scrollEnabled, setScrollEnabled] = useState<boolean | null>(null);
  if (env && scrollEnabled === null) setScrollEnabled(shouldLoad3D(env));

  // The canvas stops for good on context loss or if reduced motion is switched on.
  const [stopped, setStopped] = useState(false);
  if (env?.reducedMotion && scrollEnabled && !stopped) setStopped(true);

  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onLost = useCallback(() => setStopped(true), []);

  const showCanvas = scrollEnabled === true && !stopped;
  useHeroScroll(stageRef, progress, scrollEnabled === true);

  return (
    <div
      ref={stageRef}
      data-hero-stage
      className="relative mx-auto h-[320px] w-full max-w-[540px] lg:h-[520px]"
    >
      {/* Shown until the first 3D frame, and for good when 3D is skipped or fails.
          Its alt text stays in the accessibility tree even while faded out. */}
      <picture
        data-hero-poster
        className={`absolute inset-0 transition-opacity duration-200 ${
          showCanvas && ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <source media="(min-width: 1024px)" srcSet={desktopPoster} />
        <img {...mobilePoster} alt={POSTER_ALT} className="h-full w-full object-contain" />
      </picture>

      {showCanvas ? (
        <HeroCanvas progress={progress} onReady={onReady} onLost={onLost} />
      ) : null}
    </div>
  );
}
