"use client";

import { useMemo } from "react";
import * as THREE from "three";

import { LAYERS, PLATE, CORE } from "./layers";
import { assembledY } from "./timeline";

const BRASS = "#D6B48A";
const EMBER = "#1A1114";
const OXBLOOD = "#7A1F2B";
const ROSE = "#C96E6E";

// Width of each side bar around the open centre.
const BAR = (PLATE.size - PLATE.opening) / 2;
const BAR_OFFSET = PLATE.opening / 2 + BAR / 2;

/** Joins two line-segment geometries into one, so each plate's rim is a single draw call. */
function mergeEdges(a: THREE.BufferGeometry, b: THREE.BufferGeometry) {
  const pa = a.getAttribute("position").array;
  const pb = b.getAttribute("position").array;
  const merged = new Float32Array(pa.length + pb.length);
  merged.set(pa);
  merged.set(pb, pa.length);
  a.dispose();
  b.dispose();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(merged, 3));
  return geometry;
}

/** One hollow square plate: four bars around an open centre, with a Brass rim. */
function Plate({
  y,
  plateMaterial,
  rimGeometry,
  rimMaterial,
}: {
  y: number;
  plateMaterial: THREE.Material;
  rimGeometry: THREE.BufferGeometry;
  rimMaterial: THREE.Material;
}) {
  return (
    <group position={[0, y, 0]}>
      {/* front and back bars span the full width */}
      <mesh position={[0, 0, BAR_OFFSET]} material={plateMaterial}>
        <boxGeometry args={[PLATE.size, PLATE.thickness, BAR]} />
      </mesh>
      <mesh position={[0, 0, -BAR_OFFSET]} material={plateMaterial}>
        <boxGeometry args={[PLATE.size, PLATE.thickness, BAR]} />
      </mesh>
      {/* side bars fill the gap between them */}
      <mesh position={[BAR_OFFSET, 0, 0]} material={plateMaterial}>
        <boxGeometry args={[BAR, PLATE.thickness, PLATE.opening]} />
      </mesh>
      <mesh position={[-BAR_OFFSET, 0, 0]} material={plateMaterial}>
        <boxGeometry args={[BAR, PLATE.thickness, PLATE.opening]} />
      </mesh>

      <lineSegments geometry={rimGeometry} material={rimMaterial} />
    </group>
  );
}

export default function DefenseStack() {
  // Shared by all plates, so the stack costs one material and one rim geometry.
  const { plateMaterial, rimGeometry, rimMaterial } = useMemo(
    () => ({
      // Dark, matte plates. A faint self-glow in their own colour keeps them
      // Ember rather than pure black while the core (the only light) is off.
      plateMaterial: new THREE.MeshStandardMaterial({
        color: EMBER,
        emissive: EMBER,
        emissiveIntensity: 1,
        roughness: 0.85,
        metalness: 0.2,
      }),
      // Outer edge plus the edge of the open centre, so the plate reads as hollow.
      rimGeometry: mergeEdges(
        new THREE.EdgesGeometry(
          new THREE.BoxGeometry(PLATE.size, PLATE.thickness, PLATE.size),
        ),
        new THREE.EdgesGeometry(
          new THREE.BoxGeometry(PLATE.opening, PLATE.thickness, PLATE.opening),
        ),
      ),
      rimMaterial: new THREE.LineBasicMaterial({
        color: BRASS,
        transparent: true,
        opacity: 0.85,
      }),
    }),
    [],
  );

  return (
    <group>
      {LAYERS.map((layer, i) => (
        <Plate
          key={layer.number}
          y={assembledY(i)}
          plateMaterial={plateMaterial}
          rimGeometry={rimGeometry}
          rimMaterial={rimMaterial}
        />
      ))}

      {/* AI core: hidden inside the bottom plate, unlit until revealed. */}
      <mesh position={[0, CORE.startY, 0]}>
        <cylinderGeometry args={[CORE.radius, CORE.radius, 0.16, 32]} />
        <meshStandardMaterial
          color={OXBLOOD}
          emissive={OXBLOOD}
          emissiveIntensity={0}
          roughness={0.4}
        />
      </mesh>
      <pointLight
        position={[0, CORE.startY, 0]}
        color={ROSE}
        intensity={0}
      />
    </group>
  );
}
