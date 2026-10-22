"use client";

import { useLayoutEffect, type RefObject } from "react";

import type { HeroProgress } from "./timeline";

/**
 * Pins the hero for one viewport and writes scroll progress (0–1) into
 * `progress.current.target`, then fades and shrinks the stage as Chapter 01
 * arrives. GSAP is imported only when `enabled`, so under reduced motion it
 * never loads and no ScrollTrigger is created.
 */
export function useHeroScroll(
  stage: RefObject<HTMLElement | null>,
  progress: RefObject<HeroProgress>,
  enabled: boolean,
): void {
  // Layout effect: its cleanup reverts the pin before React removes the DOM,
  // so React never tries to remove a section GSAP has moved into a pin-spacer.
  useLayoutEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const el = stage.current;
      const section = el?.closest<HTMLElement>("section[data-hero]");
      const projects = document.getElementById("projects");
      if (cancelled || !el || !section || !projects) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          pin: section,
          // A hero taller than the viewport (phones) pins once its bottom is in view,
          // so the stack is fully visible while it explodes.
          start: () =>
            section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
          end: "+=100%",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current.target = self.progress;
          },
        });

        gsap.to(el, {
          opacity: 0.25,
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: projects,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      revert = () => ctx.revert();

      // A deep link (/#projects) scrolled to its target before the pin added a
      // viewport of scroll above it. Jump there again now the page has its final length.
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) document.getElementById(hash)?.scrollIntoView();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [stage, progress, enabled]);
}
