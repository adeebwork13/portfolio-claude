export type Layer = { number: string; label: string };

/** Security layers in explode order, outside in. Index 0 is the top plate. */
export const LAYERS: readonly Layer[] = [
  { number: "01", label: "Network" },
  { number: "02", label: "Firewall" },
  { number: "03", label: "Operating System" },
  { number: "04", label: "Application" },
  { number: "05", label: "Data" },
];

export { PLATE, ASSEMBLED_PITCH, EXPLODED_PITCH, CORE } from "./timeline.ts";
