// Pure maths for the hero scene. No imports, so `node --test` can load it directly.

/** Scroll progress written by GSAP (`target`, 0–1). The R3F frame loop keeps its own smoothed copy. */
export type HeroProgress = { target: number };

export const PLATE = { size: 2.4, thickness: 0.2, opening: 1.3, rim: 0.03 } as const;
export const ASSEMBLED_PITCH = 0.24;
export const EXPLODED_PITCH = 0.75;
// The core starts inside the lower half of the assembled tube (plates span -0.58..0.58),
// low enough to read as "in the bottom" while its 0.32 radius stays fully inside.
export const CORE = { startY: -0.24, endY: 0, radius: 0.32 } as const;

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

/* Explode timeline (progress 0–1 over the 1-viewport pin). */
export const PLATE_START = 0.05;
export const PLATE_STAGGER = 0.1125;
export const PLATE_DURATION = 0.2;

/** 0–1 travel of one plate; plates leave in order 01 → 05 and the last lands at 0.70. */
export const plateProgress = (progress: number, index: number): number =>
  clamp01((progress - (PLATE_START + index * PLATE_STAGGER)) / PLATE_DURATION);

/** Plate Y at a given progress: linear from assembled to exploded. */
export const plateY = (progress: number, index: number): number => {
  const t = plateProgress(progress, index);
  return assembledY(index) + (explodedY(index) - assembledY(index)) * t;
};

/** A label fades in over the last 40% of its plate's travel. */
export const labelOpacity = (plate: number): number => clamp01((plate - 0.6) / 0.4);

/** The core rises and lights between 0.70 and 0.92, then holds. */
export const coreProgress = (progress: number): number => clamp01((progress - 0.7) / 0.22);

/** Frame-rate-independent smoothing toward `target`. */
export const damp01 = (current: number, target: number, delta: number): number =>
  current + (target - current) * (1 - Math.exp(-8 * delta));
