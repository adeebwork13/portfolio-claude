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

/** Pointer parallax limit: 6 degrees, in radians. */
export const MAX_TILT = 0.10472;

/** Tilt for a pointer position normalised to [-1, 1] over the canvas (clamped). */
export const parallaxAngles = (nx: number, ny: number): { x: number; y: number } => {
  const cx = Math.min(1, Math.max(-1, nx));
  const cy = Math.min(1, Math.max(-1, ny));
  return { x: -cy * MAX_TILT, y: cx * MAX_TILT };
};

/** Idle spin speed: one turn per 90s. */
export const IDLE_SPEED = (2 * Math.PI) / 90;

/** The fixed three-quarter angle the stack settles to while exploding: about 22.5 degrees off
 * face-on to the camera, so each plate's right edge (where labels sit) faces screen-right. */
export const FRONT_ANGLE = Math.PI / 8;

/** 1 = free idle spin, 0 = locked to FRONT_ANGLE. Fades out over the first 0.3 of progress. */
export const idleWeight = (progress: number): number => 1 - clamp01(progress / 0.3);

/**
 * Advances the idle spin (an offset from FRONT_ANGLE), slowed by `weight`.
 * It wraps into (-PI, PI] only at full weight, where the 2*PI jump is invisible;
 * mid-blend it never wraps, so the blended yaw stays continuous.
 */
export const stepSpin = (spin: number, delta: number, weight: number): number => {
  const next = spin + IDLE_SPEED * delta * weight;
  if (weight < 1 || next <= Math.PI) return next;
  return next - 2 * Math.PI;
};

/** Stack yaw: the idle spin, faded toward FRONT_ANGLE as the explode takes over. */
export const yawFor = (spin: number, weight: number): number => FRONT_ANGLE + spin * weight;
