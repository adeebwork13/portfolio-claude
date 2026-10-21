// Pure maths for the hero scene. No imports, so `node --test` can load it directly.

/** Scroll progress shared between GSAP (writes target) and the R3F frame loop (smooths current). */
export type HeroProgress = { target: number; current: number };

export const PLATE = { size: 2.4, thickness: 0.2, opening: 1.3, rim: 0.03 } as const;
export const ASSEMBLED_PITCH = 0.24;
export const EXPLODED_PITCH = 0.75;
export const CORE = { startY: -0.48, endY: 0, radius: 0.32 } as const;

export const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

/** Plate Y when the stack is assembled. Index 0 is the top plate. */
export const assembledY = (index: number): number => (2 - index) * ASSEMBLED_PITCH;

/** Plate Y when fully exploded; the middle plate stays at 0. */
export const explodedY = (index: number): number => (2 - index) * EXPLODED_PITCH;
