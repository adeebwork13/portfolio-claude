// Pure maths for the hero scene. No imports, so `node --test` can load it directly.

export const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));
