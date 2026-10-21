# Defense in Depth Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage hero portrait with a procedural React Three Fiber "Defense in depth" server stack that explodes into five labelled layers and reveals an Oxblood AI core as the visitor scrolls a 1-viewport pinned prologue, with a static poster for every fallback case.

**Architecture:** A client `HeroStage` sits in the hero's right column, renders the poster, and lazy-loads `HeroCanvas` (`next/dynamic`, `ssr: false`) only when motion and WebGL are allowed. GSAP ScrollTrigger pins the hero and writes scroll progress into a plain shared object; the R3F frame loop reads it, so React never re-renders on scroll. All timing and geometry math lives in pure functions in `timeline.ts`, unit-tested with Node's built-in test runner.

**Tech Stack:** Next 16.3.3 (App Router), React 19.2, three, @react-three/fiber, @react-three/drei (`Html` only), gsap + ScrollTrigger, Tailwind 4, Node 24 `node --test` (native TS type stripping), @playwright/test.

**Spec:** `docs/superpowers/specs/2026-10-21-defense-in-depth-hero-design.md` (read it before every task). Visual rules: `DESIGN.md`.

## Global Constraints

- **Read the Next docs first:** before touching Next APIs, read `node_modules/next/dist/docs/` (AGENTS.md). `next/image` `priority` is deprecated in Next 16. Use `fetchPriority="high"` + `loading="eager"`.
- **`ssr: false`:** `next/dynamic` with `ssr: false` is only allowed inside a Client Component (`"use client"`).
- **Server component:** `app/page.tsx` stays a server component.
- **Colours:** Oxblood `#7A1F2B`, Faded Rose `#C96E6E`, Brass `#D6B48A`, Bone `#F3EDE6`, Ink Black `#0F0A0B`. No cyan or violet anywhere in the hero (One Lamp Rule).
- **Labels:** Geist Mono via `var(--font-geist-mono)`, at least 12px; text Bone, number Brass; `aria-hidden`.
- **Light:** the core is the only light source. No postprocessing library, particles, neon, holograms, starfields or grids.
- **Parallax:** ±6° max (`0.10472` rad), off when `(pointer: coarse)`.
- **Pin:** exactly 1 viewport (`end: "+=100%"`) on all sizes. No scroll snapping, wheel or touch hijacking.
- **DPR cap:** `[1, 2]` at `lg` (≥1024px) and up, `[1, 1.5]` below.
- **Animated properties:** only transform, opacity, clip-path, mask and filter.
- **Reduced motion:** ScrollTrigger is never created and GSAP is never imported (dynamic `import("gsap")` inside the effect).
- **Easing:** time-based CSS motion uses `cubic-bezier(.2,.8,.2,1)`.
- **Poster alt text** (exact): "An exploded server stack: Network, Firewall, Operating System, Application and Data layers separated around a glowing AI core."
- **Commits:** stage only the files the task lists, never `git add -A`.

## Review Focus

1. **Loading the page mid-scroll** (reload, back button, `/#projects`): the stack must show the state for the current scroll position, with no jump. Pinned in Task 5 (`hero-scroll.spec`: goto `/#projects`).
2. **"See the work" with the pin in place:** the click must land on the `#projects` heading, not inside the pin spacer. Pinned in Task 5.
3. **Visitor scrolls before the 3D chunk arrives:** the pin must already exist (created at hydration, not after the canvas loads), or a 100vh spacer appears mid-scroll and the page jumps. Pinned in Task 5 (pin-spacer present while the canvas is still blocked).
4. **Hero taller than the viewport** (phones, landscape 844×390): pin from `"bottom bottom"` so the canvas is fully visible, and no horizontal scroll. Pinned in Task 5.
5. **Reduced motion switched on mid-visit:** canvas unmounts and poster shows; the pin stays (removing it would jump the page). Pinned in Task 6.

---

## File Structure

| Path | Status | Responsibility |
|---|---|---|
| `components/hero/layers.ts` | create | Layer data and geometry constants |
| `components/hero/timeline.ts` | create | Pure functions: progress maths, parallax, load decision. No imports. |
| `components/hero/timeline.test.ts` | create | `node --test` unit tests for `timeline.ts` and `layers.ts` |
| `components/hero/HeroStage.tsx` | create | Client: poster, load decision, lazy canvas, crossfade, sr-only text, scroll hook |
| `components/hero/HeroCanvas.tsx` | create | R3F `<Canvas>`, DPR, pause, first-frame and context-loss callbacks |
| `components/hero/DefenseStack.tsx` | create | Meshes, materials, idle, parallax, explode, core, labels |
| `components/hero/useHeroScroll.ts` | create | ScrollTrigger pin, progress writes, post-pin recede |
| `app/page.tsx` | modify | Hero right column → `<HeroStage />`; small portrait by name; framed portrait in Chapter 02; remove `HeroPortrait` |
| `next.config.ts` | modify (Task 7, only if the poster is LCP) | `images.formats: ["image/avif", "image/webp"]` |
| `tsconfig.json` | modify | `"allowImportingTsExtensions": true` (tests import `./timeline.ts`) |
| `package.json` | modify | deps + scripts `test:unit`, `test:e2e`, `poster` |
| `playwright.config.ts` | create | Projects `desktop` (1280×800, DSF 3) and `mobile` (390×844, DSF 3); webServer builds with `NEXT_PUBLIC_HERO_DEBUG=1` on port 3100 |
| `scripts/capture-hero-poster.ts` | create | Poster screenshots |
| `tests/hero-scroll.spec.ts` | create | Pin and scroll behaviour |
| `tests/hero-fallback.spec.ts` | create | Poster fallbacks |
| `tests/hero-perf.spec.ts` | create | LCP, chunk size, fps, DPR, pause |
| `public/hero/defense-stack.png`, `@2x.png` | generated | Poster |

---

### Task 0: Clean starting point

- [ ] **Step 1:** Ask the user to commit or stash their pending `DESIGN.md` and `app/page.tsx` changes (the GitHub URL fix and the Redesign Direction section) so task commits contain only task work. Do not commit them yourself without a yes.
- [ ] **Step 2:** Confirm you are on branch `defense-in-depth-hero`. Run `git status --short`. Expected: empty.

### Task 1: Install dependencies and the unit test runner (your step 1)

**Files:** Modify `package.json`, `package-lock.json`, `tsconfig.json`. Create `components/hero/timeline.ts`, `components/hero/timeline.test.ts`.

**Interfaces:**
- Produces: `npm run test:unit` = `node --test "components/hero/*.test.ts"`.

- [ ] **Step 1:** Run `npm install three @react-three/fiber @react-three/drei gsap` and `npm install -D @types/three`. Expected: exits 0. Pick versions compatible with React 19.2 (R3F v9+).
- [ ] **Step 2:** Add `"allowImportingTsExtensions": true` to `tsconfig.json` `compilerOptions`. Add script `"test:unit": "node --test \"components/hero/*.test.ts\""`.
- [ ] **Step 3: Smoke test.** Create `timeline.ts` exporting `export const clamp01 = (x: number): number => …`. Create `timeline.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { clamp01 } from "./timeline.ts";

test("clamp01 clamps to [0,1]", () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(0.4), 0.4);
  assert.equal(clamp01(2), 1);
});
```

- [ ] **Step 4:** Run `npm run test:unit`. Expected: 1 pass. Run `npm run build`. Expected: build succeeds (type check accepts the `.ts` import).
- [ ] **Step 5: Browser check (user).** `npm run dev`, open `/`. Expected: the page is unchanged.
- [ ] **Step 6:** Commit `package.json package-lock.json tsconfig.json components/hero/timeline.ts components/hero/timeline.test.ts` with the message "Add 3D, GSAP and unit test tooling for the hero".

### Task 2: Static layered stack in the hero (your step 2)

**Files:** Create `layers.ts`, `HeroStage.tsx`, `HeroCanvas.tsx`, `DefenseStack.tsx`. Modify `app/page.tsx`, `timeline.test.ts`.

**Interfaces:**
- Produces, in `layers.ts`:
  - `export type Layer = { number: string; label: string }`
  - `export const LAYERS: readonly Layer[]` = `01 Network`, `02 Firewall`, `03 Operating System`, `04 Application`, `05 Data`, in that order (index 0 = top).
  - `export const PLATE = { size: 2.4, thickness: 0.2, opening: 1.3, rim: 0.03 }`, `export const ASSEMBLED_PITCH = 0.24`, `export const EXPLODED_PITCH = 0.75`, `export const CORE = { startY: -0.48, endY: 0, radius: 0.32 }`.
- Produces, in `timeline.ts`:
  - `assembledY(index: number): number` = `(2 - index) * ASSEMBLED_PITCH`
  - `explodedY(index: number): number` = `(2 - index) * EXPLODED_PITCH`
  - The numeric constants (`PLATE`, `ASSEMBLED_PITCH`, `EXPLODED_PITCH`, `CORE`) live in `timeline.ts`, which stays import-free. `layers.ts` re-exports them with `export { … } from "./timeline.ts"` (the explicit `.ts` extension is required so `node --test` can load `layers.ts`).
- Produces: `HeroCanvas` props `{ progress: HeroProgress; onReady(): void; onLost(): void }`, and `HeroProgress = { target: number; current: number }` exported from `timeline.ts`. In this task `progress` is a constant `{ target: 0, current: 0 }` held in a `useRef` in `HeroStage`.

- [ ] **Step 1: Failing tests.**
  - `LAYERS.map(l => l.number + " " + l.label)` deep-equals the five strings above.
  - `assembledY(0) > assembledY(4)`.
  - `assembledY(0) - assembledY(1)` is approximately `0.24`.
  - `explodedY(2) === 0`.
  - `explodedY(0)` is approximately `1.5`.
- [ ] **Step 2:** Run `npm run test:unit`. Expected: FAIL (exports missing).
- [ ] **Step 3:** Implement `layers.ts` and the two `timeline.ts` functions.
- [ ] **Step 4:** Run `npm run test:unit`. Expected: PASS.
- [ ] **Step 5: `DefenseStack`.** Implement `DefenseStack({ progress }: { progress: HeroProgress })`. Static assembled state only:
  - Each plate is a square frame: four box segments around an open centre of `PLATE.opening`.
  - Material: `meshStandardMaterial`, colour `#1A1114`, roughness 0.85, metalness 0.2.
  - Rim: a thin Brass `#D6B48A` edge (`lineSegments` from `EdgesGeometry`, or emissive boxes with `emissiveIntensity` about 0.35) so the stack reads without light.
  - Core: a sphere or short cylinder at `CORE.startY`, Oxblood emissive, intensity 0. A `pointLight` colour `#C96E6E`, intensity 0. No other lights.
  - Camera: slightly above, looking at the origin, at a three-quarter angle.
- [ ] **Step 6: `HeroCanvas`.** `"use client"`. A `<Canvas>` with `dpr` from `matchMedia("(min-width: 1024px)")` (`[1,2]` or `[1,1.5]`) and `gl={{ alpha: true, antialias: true }}`. Call `onReady` after the first frame. Wrap it in `<div aria-hidden="true" className="absolute inset-0">`. drei `Html` portals into the canvas parent, so labels inherit this.
- [ ] **Step 7: `HeroStage`.** `"use client"`. Root: `<div data-hero-stage className="relative mx-auto h-[320px] w-full max-w-[540px] lg:h-[520px]">`. It holds `const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false })`. Render the canvas unconditionally for now; the poster and load decision come in Task 6.
- [ ] **Step 8: `app/page.tsx`.**
  - Replace `<HeroPortrait />` with `<HeroStage />`.
  - Add `data-hero` to the hero `<section>`.
  - Put the name `<p>` in a flex row with a 44px round portrait before it: `next/image` `/adeeb-cutout.png`, `alt=""` (decorative; the name sits beside it), `rounded-full`, `object-cover object-top`, background `#1A1114`, 1px border `#5E565C`/35.
  - Leave the `HeroPortrait` function in place; Task 3 removes it.
- [ ] **Step 9:** Run `npm run build`. Expected: succeeds.
- [ ] **Step 10: Browser check (user).** Open `/` at 1280px and at 390px. Expected:
  - a dark stack of five plates with Brass rims in the right column (below the buttons on mobile);
  - no glow, no motion;
  - the small portrait beside "Adeeb Nizar";
  - the headline unchanged;
  - no console errors.
- [ ] **Step 11:** Commit the files from this task with the message "Add static Defense in Depth stack to the hero".

### Task 3: Framed portrait in Chapter 02

**Files:** Modify `app/page.tsx`.

- [ ] **Step 1: Placement.** In the "At work" column, put a framed portrait beside the "At work" `h3` and intro paragraph.
  - Layout: a 2-column flex at `sm` and up; the portrait stacks above the text below `sm`.
  - Frame: about 120×150px, `rounded-[20px]`, 1px border `#D6B48A`/20, background `#1A1114`/82, `overflow-hidden`.
  - Image: `/adeeb-cutout.png`, `object-cover object-top`, keeping today's treatment (`opacity-[0.76] brightness-[0.72] contrast-[1.08] saturate-[0.72]`).
  - Alt: "Portrait of Adeeb Nizar".
  - Default lazy loading.
- [ ] **Step 2: Remove orphans.** Delete the `HeroPortrait` function. Delete the `floatPortrait` and `atmosphericDrift` keyframes and the `.motion-element` reduced-motion rule if nothing else uses them (grep first).
- [ ] **Step 3:** Run `npm run build` and `npm run lint`. Expected: both pass.
- [ ] **Step 4: Browser check (user).** At 390, 768 and 1280px the framed portrait sits beside "At work" (above it on phones) with no overflow.
- [ ] **Step 5:** Commit with the message "Move portrait into Chapter 02 beside At work".

### Task 4: Idle rotation and pointer parallax (your step 3)

**Files:** Modify `timeline.ts`, `timeline.test.ts`, `DefenseStack.tsx`.

**Interfaces:** Produces, in `timeline.ts`:
- `MAX_TILT = 0.10472` (6° in radians).
- `parallaxAngles(nx: number, ny: number): { x: number; y: number }`. Inputs are pointer position normalised to [-1, 1] over the canvas (out-of-range input is clamped). Returns `x = -ny * MAX_TILT`, `y = nx * MAX_TILT`.
- `IDLE_SPEED = (2 * Math.PI) / 90` (rad/s, one turn per 90s).
- `FRONT_ANGLE = -Math.PI / 4` (the three-quarter angle).
- `idleWeight(progress: number): number` = `1 - clamp01(progress / 0.3)` (1 = free spin, 0 = locked to `FRONT_ANGLE`).

- [ ] **Step 1: Failing tests.**
  - `parallaxAngles(1, 0).y` is approximately `MAX_TILT`.
  - `parallaxAngles(5, -5)` equals `parallaxAngles(1, -1)`.
  - `Math.abs(parallaxAngles(-1, 1).x)` ≤ `MAX_TILT`.
  - `idleWeight(0) === 1`, `idleWeight(0.15) === 0.5`, `idleWeight(1) === 0`.
- [ ] **Step 2:** Run `npm run test:unit`. Expected: FAIL.
- [ ] **Step 3:** Implement both functions.
- [ ] **Step 4:** Run `npm run test:unit`. Expected: PASS.
- [ ] **Step 5: Wire it into `DefenseStack`.**
  - Accumulate the idle angle by `IDLE_SPEED * delta`, and blend: group rotation Y = `lerp(FRONT_ANGLE, idleAngle, idleWeight(progress.current))`.
  - Parallax: listen to `pointermove` on `window` (skip when `matchMedia("(pointer: coarse)").matches`) and normalise to the canvas rect. Damp the tilt toward `parallaxAngles` with `THREE.MathUtils.damp(…, 6, delta)`, applied to an outer group.
- [ ] **Step 6: Browser check (user).** The stack turns slowly (about 90s per turn); moving the mouse tilts it gently (never more than about 6°); on a touch device or emulation it does not tilt.
- [ ] **Step 7:** Commit with the message "Add idle rotation and pointer parallax to hero stack".

### Task 5: Scroll-driven explode, labels, AI core and recede (your step 4)

**Files:** Create `useHeroScroll.ts`, `playwright.config.ts`, `tests/hero-scroll.spec.ts`. Modify `timeline.ts`, `timeline.test.ts`, `DefenseStack.tsx`, `HeroStage.tsx`, `package.json`.

Playwright is installed here (not in Task 6) because Review Focus 1–4 need browser tests.

**Interfaces:** Produces, in `timeline.ts`:
- `PLATE_START = 0.05`, `PLATE_STAGGER = 0.1125`, `PLATE_DURATION = 0.2`. The starts are 0.05, 0.1625, 0.275, 0.3875 and 0.5, so the last plate ends at 0.70.
- `plateProgress(progress: number, index: number): number` = `clamp01((progress - (PLATE_START + index * PLATE_STAGGER)) / PLATE_DURATION)`.
- `plateY(progress: number, index: number): number` = linear interpolation from `assembledY` to `explodedY`, by `plateProgress`.
- `labelOpacity(plate: number): number` = `clamp01((plate - 0.6) / 0.4)`; the label offset is `(1 - labelOpacity) * -6` px.
- `coreProgress(progress: number): number` = `clamp01((progress - 0.70) / 0.22)`.
- `damp01(current: number, target: number, delta: number): number`: frame-rate-independent smoothing, `current + (target - current) * (1 - Math.exp(-8 * delta))`.
- `useHeroScroll(stage: RefObject<HTMLElement | null>, progress: HeroProgress, enabled: boolean): void`.

- [ ] **Step 1: Failing tests.**
  - `plateProgress(0.05, 0) === 0` and `plateProgress(0.25, 0) === 1`.
  - `plateProgress(0.70, 4) === 1` and `plateProgress(0.49, 4) === 0`.
  - At progress 0.1, plate 0 > plate 1 (order 01 → 05).
  - `plateY(0, i) === assembledY(i)` and `plateY(1, i) === explodedY(i)` for every i.
  - `labelOpacity(0.6) === 0` and `labelOpacity(1) === 1`.
  - `coreProgress(0.70) === 0`, `coreProgress(0.92)` ≈ 1, `coreProgress(1) === 1`.
  - `damp01(0, 1, 0)` = 0; `damp01(0, 1, 10)` > 0.999.
- [ ] **Step 2:** Run `npm run test:unit`. Expected: FAIL.
- [ ] **Step 3:** Implement the functions.
- [ ] **Step 4:** Run `npm run test:unit`. Expected: PASS.
- [ ] **Step 5: `useHeroScroll`.** In `useEffect`, when `enabled`, run `const { gsap } = await import("gsap"); const { ScrollTrigger } = await import("gsap/ScrollTrigger")`, then register the plugin.
  - Section: `stage.current.closest("section[data-hero]")`.
  - Pin trigger: `pin: section`, `end: "+=100%"`, `start: () => section.offsetHeight > innerHeight ? "bottom bottom" : "top top"`, `invalidateOnRefresh: true`, and `onUpdate: self => { progress.target = self.progress }`.
  - Recede trigger: on `#projects`, `start: "top bottom"`, `end: "top 40%"`, `scrub: true`, tweening `stage.current` to `{ opacity: 0.25, scale: 0.92 }`.
  - Cleanup kills both triggers and reverts the tweens. The hook is called from `HeroStage` at hydration, not after the canvas loads (Review Focus 3).
- [ ] **Step 6: `DefenseStack`.**
  - Each frame: `progress.current = damp01(progress.current, progress.target, delta)`, then set each plate's `position.y = plateY(progress.current, i)`.
  - Core Y: lerp `CORE.startY`→`CORE.endY` by `coreProgress`. Core `emissiveIntensity` = `2.5 * coreProgress`, point light intensity = `6 * coreProgress`.
  - Halo: a `sprite` with a radial-gradient `CanvasTexture` in `#C96E6E`, `AdditiveBlending`, opacity `0.8 * coreProgress`.
  - Labels: drei `<Html>` at each plate's right edge (`x = PLATE.size / 2 + 0.15`). Inner markup: `<span data-hero-label className="whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-[12px] text-[#F3EDE6]"><span className="text-[#D6B48A]">{number}</span> {label}</span>`. Opacity and translate come from `labelOpacity`, written straight to the DOM node through a ref inside `useFrame` (no React state).
- [ ] **Step 7:** `HeroStage` calls `useHeroScroll(stageRef, progress.current, true)`. Task 6 replaces `true` with the load decision.
- [ ] **Step 8: Playwright setup.**
  - Install: `npm install -D @playwright/test`, then `npx playwright install chromium`.
  - Create `playwright.config.ts` with projects `desktop` (1280×800, deviceScaleFactor 3) and `mobile` (390×844, deviceScaleFactor 3, `hasTouch`, `isMobile`).
  - webServer command: `npm run build && npx next start -p 3100`, with env `NEXT_PUBLIC_HERO_DEBUG=1`, url `http://localhost:3100`, `reuseExistingServer: !process.env.CI`, timeout 300000.
  - Script: `"test:e2e": "playwright test"`.
- [ ] **Step 9: Write `tests/hero-scroll.spec.ts`** with these tests:
  - `pins for one viewport`: `.pin-spacer` exists, and its height minus the section height is within 2px of `innerHeight`.
  - `see the work lands on projects`: click "See the work", then the `#projects h2` bounding box top is ≥ 0 and < `innerHeight / 2`.
  - `deep link mid-page`: goto `/#projects`, wait 1s; `[data-hero-stage]` computed opacity < 0.5; no `pageerror`.
  - `pin exists before canvas loads`: `page.route("**/*.js", …)` delays any chunk whose body contains `WebGLRenderer` by 5s; after load, `.pin-spacer` exists and `canvas` count is 0.
  - `short landscape viewport`: viewport 844×390; `.pin-spacer` exists; `document.documentElement.scrollWidth <= innerWidth`.
  - `labels are hidden from assistive tech`: scroll to the pin end; every `[data-hero-label]` has `closest('[aria-hidden="true"]')` not null and computed `font-size` ≥ 12px.
- [ ] **Step 10:** Run `npm run test:e2e -- tests/hero-scroll.spec.ts`. Expected: all pass on both projects. Fix code, not tests, on failure.
- [ ] **Step 11: Browser check (user).** Scroll slowly from the top. Expected:
  - the hero pins for about one screen;
  - plates lift one at a time from 01 Network to 05 Data, each label sliding in beside its plate;
  - the core rises and glows Oxblood, lighting the plate undersides;
  - the stack fades and shrinks as "Systems I've taken apart." arrives;
  - scrolling back up reassembles it;
  - the first project is about two screens down.
- [ ] **Step 12:** Commit the files from this task with the message "Drive hero explode, labels and AI core from scroll".

### Task 6: Poster and fallbacks (your step 5)

**Files:** Create `scripts/capture-hero-poster.ts`, `tests/hero-fallback.spec.ts`, `public/hero/defense-stack.png`, `public/hero/defense-stack@2x.png`. Modify `timeline.ts`, `timeline.test.ts`, `HeroStage.tsx`, `HeroCanvas.tsx`, `package.json`.

**Interfaces:** Produces, in `timeline.ts`:
- `type LoadEnv = { reducedMotion: boolean; saveData: boolean; effectiveType?: string; webgl: boolean }`
- `shouldLoad3D(env: LoadEnv): boolean`: true only when `!reducedMotion && !saveData && webgl` and `effectiveType` is not `"2g"` or `"slow-2g"`.

- [ ] **Step 1: Failing tests.** One test per false case (reduced motion; Save-Data; `"2g"`; `"slow-2g"`; no WebGL), and true for `{false, false, "4g", true}` and for `effectiveType` undefined.
- [ ] **Step 2:** Run `npm run test:unit`. Expected: FAIL.
- [ ] **Step 3:** Implement `shouldLoad3D`.
- [ ] **Step 4:** Run `npm run test:unit`. Expected: PASS.
- [ ] **Step 5: `HeroCanvas`.**
  - Add the `webglcontextlost` listener in `onCreated` (calls `onLost`).
  - `frameloop` is `"always"` only while an IntersectionObserver reports the stage visible and `document.visibilityState === "visible"`; otherwise `"never"`.
  - When `process.env.NEXT_PUBLIC_HERO_DEBUG === "1"`, increment `window.__heroFrames` in `useFrame`.
- [ ] **Step 6: `HeroStage`.**
  - Poster: always render `next/image` `/hero/defense-stack.png` with `fill`, `sizes="(min-width: 1024px) 540px, 100vw"` and the exact alt text from Global Constraints. Default loading for now; Task 7 decides priority.
  - After mount, compute `LoadEnv` from:
    - `matchMedia("(prefers-reduced-motion: reduce)")`;
    - `navigator.connection?.saveData` and `effectiveType`;
    - `document.createElement("canvas").getContext("webgl2") ?? getContext("webgl")`.
  - Keep two pieces of state:
    - `scrollEnabled`: set once from `shouldLoad3D(env)` and never changed afterwards, so the pin is never removed mid-visit. It is passed to `useHeroScroll`.
    - `showCanvas`: starts equal to `scrollEnabled`, and can later become false.
  - On `onReady`, fade the poster to opacity 0 (`transition-opacity duration-200`) and add a `sr-only` `<p>` with the alt text.
  - On `onLost`, or on a reduced-motion `change` event to `reduce`: set `showCanvas` to false and restore the poster. The pin stays because `scrollEnabled` doesn't change (Review Focus 5).
- [ ] **Step 7: `scripts/capture-hero-poster.ts`.**
  - Use `import { chromium } from "@playwright/test"`. Open `http://localhost:3100/` at 1280×800 with deviceScaleFactor 1, then again at 2.
  - Wait for `canvas`, scroll to the pin end (`.pin-spacer` top + `innerHeight`), wait 1500ms for damping to settle, and screenshot `[data-hero-stage]`.
  - Write `public/hero/defense-stack.png` and `public/hero/defense-stack@2x.png`. Use the @2x file as the `next/image` source so its resizing serves both densities, or keep both if the user wants the 1× file for reference.
  - Add script `"poster": "node scripts/capture-hero-poster.ts"`. It assumes `next start -p 3100` is already running.
- [ ] **Step 8:** Build, start on 3100, run `npm run poster`. Expected: both PNGs exist and show the exploded stack with all five labels and the lit core.
- [ ] **Step 9: Write `tests/hero-fallback.spec.ts`:**
  - `reduced motion shows poster only`: `emulateMedia({ reducedMotion: "reduce" })` before goto. Then: no `canvas`, the poster `img` is visible with the exact alt, and no `.pin-spacer`.
  - `save-data shows poster`: `addInitScript` defines `navigator.connection = { saveData: true }`. Then: no canvas, no pin-spacer.
  - `no webgl shows poster`: `addInitScript` overrides `HTMLCanvasElement.prototype.getContext` to return null for `webgl`/`webgl2`. Then: no canvas.
  - `context loss restores poster`: wait for canvas, then call `getExtension("WEBGL_lose_context").loseContext()` on its context. Then: canvas count 0 and poster opacity 1.
  - `reduced motion mid-visit`: load normally and wait for the canvas, then `emulateMedia({ reducedMotion: "reduce" })`. Then: canvas count 0, poster visible, `.pin-spacer` still present.
  - `hero never empty before 3D`: block chunks containing `WebGLRenderer` (as in Task 5). Then: the poster is visible.
- [ ] **Step 10:** Run `npm run test:e2e`. Expected: all specs pass on both projects.
- [ ] **Step 11: Browser check (user).** In DevTools → Rendering, set "prefers-reduced-motion: reduce" and reload. Expected: the poster shows at the same size, nothing pins, and the first project comes right after the hero.
- [ ] **Step 12:** Commit the files from this task, including the PNGs, with the message "Add hero poster and reduced-motion, Save-Data and WebGL fallbacks".

### Task 7: Performance check (your step 6)

**Files:** Create `tests/hero-perf.spec.ts`. Possibly modify `HeroStage.tsx`, `next.config.ts`, `DESIGN.md`.

- [ ] **Step 1: Write `tests/hero-perf.spec.ts`:**
  - `lcp is the headline`: before goto, `addInitScript` starts a buffered `PerformanceObserver` for `largest-contentful-paint` that stores the last entry's `element.tagName` and `startTime` on `window`. Load, wait 3s, then click the body (this finalises LCP). Assert the tag is `"H1"`.
  - `3d chunk ≤ 200KB gzipped`:
    - Run 1 emulates reduced motion and records every `.js` response URL.
    - Run 2 runs normally until the canvas exists, recording URL plus `(await response.request().sizes()).responseBodySize`.
    - Sum the sizes for URLs only in run 2. Assert ≤ 204800, and log the number.
  - `fps while scrolling the pin`:
    - Read `WEBGL_debug_renderer_info` and log the renderer.
    - In `page.evaluate`, scroll from 0 to the pin end over 2s with `scrollTo` per rAF, recording rAF deltas, and return the median fps.
    - Desktop: assert ≥ 55, unless the renderer contains `SwiftShader`; in that case, log "software GL, fps not representative" and skip the assertion.
    - Mobile: add a CDP session with `Emulation.setCPUThrottlingRate` `{ rate: 4 }`; log the median and do not assert.
  - `dpr is capped`: `canvas.width / canvas.clientWidth` ≤ 2 (desktop) or ≤ 1.5 (mobile), with deviceScaleFactor 3 from the config.
  - `rendering pauses`:
    - Off-screen: scroll to the footer, wait 300ms, read `__heroFrames` twice 500ms apart. Assert they are equal.
    - Hidden tab: back at the top, use `evaluate` to override `document.visibilityState` to `"hidden"` and dispatch `visibilitychange`. Assert equal frame counts again.
- [ ] **Step 2:** Run `npm run test:e2e -- tests/hero-perf.spec.ts`. Record every logged number.
- [ ] **Step 3: If `lcp is the headline` fails because the poster is the LCP** (approved in advance in the spec):
  1. Add `images: { formats: ["image/avif", "image/webp"] }` to `next.config.ts`.
  2. Give the poster `next/image` `fetchPriority="high"` and `loading="eager"`. Do not use `priority`, which is deprecated.
  3. In `DESIGN.md` "Accessibility and performance guardrails", change the LCP line to "LCP stays under 2.5s."
  4. Change the test to assert LCP `startTime < 2500`.
  5. Re-run. Expected: pass.
- [ ] **Step 4:** If the chunk-size or fps tests fail, stop and report the numbers to the user with the likely cause. Don't add new optimisations without asking.
- [ ] **Step 5: Final run.**
  - Run `npm run test:unit` and `npm run test:e2e`. Expected: all green.
  - Run `npm run lint` and `npm run build`. Expected: both pass.
  - If the scene changed during Task 7, re-run `npm run poster`.
- [ ] **Step 6: Browser check (user).** Read the logged numbers (chunk KB, desktop fps, throttled mobile fps). Try the page on a real phone if one is available.
- [ ] **Step 7:** Commit `tests/hero-perf.spec.ts`, plus `next.config.ts`, `HeroStage.tsx` and `DESIGN.md` if Step 3 changed them, with the message "Add hero performance checks".
