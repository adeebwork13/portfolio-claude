"use client";

import { useEffect, useMemo, useRef, type Ref, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { LAYERS, PLATE, CORE } from "./layers";
import {
  assembledY,
  coreProgress,
  damp01,
  idleWeight,
  labelOpacity,
  parallaxAngles,
  plateProgress,
  plateY,
  stepSpin,
  yawFor,
  type HeroProgress,
} from "./timeline";

const BRASS = "#D6B48A";
const EMBER = "#1A1114";
const OXBLOOD = "#7A1F2B";
const ROSE = "#C96E6E";

// Width of each side bar around the open centre.
const BAR = (PLATE.size - PLATE.opening) / 2;
const BAR_OFFSET = PLATE.opening / 2 + BAR / 2;

// Core light and glow at full reveal.
const CORE_EMISSIVE = 2.5;
const CORE_LIGHT = 6;
const HALO_OPACITY = 0.8;

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

/** A soft round glow texture for the core's halo sprite (stands in for bloom). */
function haloTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(201,110,110,1)");
  g.addColorStop(0.35, "rgba(201,110,110,0.35)");
  g.addColorStop(1, "rgba(201,110,110,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

/** One hollow square plate: four bars around an open centre, with a Brass rim. */
function Plate({
  ref,
  y,
  plateMaterial,
  rimGeometry,
  rimMaterial,
}: {
  ref: Ref<THREE.Group>;
  y: number;
  plateMaterial: THREE.Material;
  rimGeometry: THREE.BufferGeometry;
  rimMaterial: THREE.Material;
}) {
  return (
    <group ref={ref} position={[0, y, 0]}>
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

/** Smoothed pointer tilt on an outer group. Off on touch devices. */
function usePointerTilt() {
  const gl = useThree((state) => state.gl);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.current = parallaxAngles(nx, ny);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  return target;
}

export default function DefenseStack({
  progress,
  labels,
}: {
  progress: RefObject<HeroProgress>;
  // DOM labels owned by HeroCanvas, placed here each frame beside their plates.
  labels: RefObject<(HTMLSpanElement | null)[]>;
}) {
  const tiltGroup = useRef<THREE.Group>(null);
  const yawGroup = useRef<THREE.Group>(null);
  const plates = useRef<(THREE.Group | null)[]>([]);
  const core = useRef<THREE.Mesh>(null);
  const coreMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const halo = useRef<THREE.Sprite>(null);
  const spin = useRef(0);
  const smoothed = useRef(0);
  const anchor = useMemo(() => new THREE.Vector3(), []);
  // Label widths, measured once (reading them every frame would force layout).
  const labelWidths = useRef<number[]>([]);
  const tilt = usePointerTilt();

  // Shared by all plates, so the stack costs one material and one rim geometry.
  const { plateMaterial, rimGeometry, rimMaterial, haloMap } = useMemo(
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
      haloMap: haloTexture(),
    }),
    [],
  );

  useFrame(({ camera, size }, delta) => {
    smoothed.current = damp01(smoothed.current, progress.current.target, delta);
    const p = smoothed.current;

    // Idle spin fades out and parallax tilt follows the pointer.
    const weight = idleWeight(p);
    spin.current = stepSpin(spin.current, delta, weight);
    if (yawGroup.current) yawGroup.current.rotation.y = yawFor(spin.current, weight);
    if (tiltGroup.current) {
      const { rotation } = tiltGroup.current;
      rotation.x = THREE.MathUtils.damp(rotation.x, tilt.current.x, 6, delta);
      rotation.y = THREE.MathUtils.damp(rotation.y, tilt.current.y, 6, delta);
    }

    // Plates lift in order; each label arrives with its plate.
    LAYERS.forEach((_, i) => {
      const plate = plates.current[i];
      if (plate) plate.position.y = plateY(p, i);
    });
    tiltGroup.current?.updateMatrixWorld();

    // Place each label at its plate's right edge, projected to canvas pixels.
    LAYERS.forEach((_, i) => {
      const plate = plates.current[i];
      const label = labels.current[i];
      if (!plate || !label) return;
      const o = labelOpacity(plateProgress(p, i));
      label.style.opacity = String(o);
      if (o === 0) return;
      // Clear of the plate's near corner, which projects further right than the edge midpoint.
      anchor.set(PLATE.size / 2 + 0.3, 0, 0);
      plate.localToWorld(anchor).project(camera);
      // Clamped so the longest label never runs past the canvas on narrow phones.
      const width = (labelWidths.current[i] ||= label.offsetWidth);
      const x = Math.min(((anchor.x + 1) / 2) * size.width, size.width - width) + (1 - o) * -6;
      const y = ((1 - anchor.y) / 2) * size.height;
      label.style.transform = `translate(${x}px, ${y}px) translateY(-50%)`;
    });

    // The core rises up the open centre and lights.
    const c = coreProgress(p);
    const y = CORE.startY + (CORE.endY - CORE.startY) * c;
    if (core.current) core.current.position.y = y;
    if (coreMaterial.current) coreMaterial.current.emissiveIntensity = CORE_EMISSIVE * c;
    if (coreLight.current) {
      coreLight.current.position.y = y;
      coreLight.current.intensity = CORE_LIGHT * c;
    }
    if (halo.current) {
      halo.current.position.y = y;
      (halo.current.material as THREE.SpriteMaterial).opacity = HALO_OPACITY * c;
    }
  });

  return (
    <group ref={tiltGroup}>
      <group ref={yawGroup}>
        {LAYERS.map((layer, i) => (
          <Plate
            key={layer.number}
            ref={(node) => {
              plates.current[i] = node;
            }}
            y={assembledY(i)}
            plateMaterial={plateMaterial}
            rimGeometry={rimGeometry}
            rimMaterial={rimMaterial}
          />
        ))}

        {/* AI core: hidden inside the bottom plate until revealed. The only light. */}
        <mesh ref={core} position={[0, CORE.startY, 0]}>
          <icosahedronGeometry args={[CORE.radius, 2]} />
          <meshStandardMaterial
            ref={coreMaterial}
            color={OXBLOOD}
            emissive={OXBLOOD}
            emissiveIntensity={0}
            roughness={0.4}
          />
        </mesh>
        <pointLight
          ref={coreLight}
          position={[0, CORE.startY, 0]}
          color={ROSE}
          intensity={0}
        />
        <sprite ref={halo} position={[0, CORE.startY, 0]} scale={1.8}>
          <spriteMaterial
            map={haloMap}
            color={ROSE}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      </group>
    </group>
  );
}
