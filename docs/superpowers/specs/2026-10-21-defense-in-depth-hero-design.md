# Defense in Depth Hero: Design

Date: 2026-10-21
Source: DESIGN.md, "Redesign Direction" → "The hero object", "Scroll-driven motion", "Reduced motion and fallbacks", "Accessibility and performance guardrails".

## Goal

Replace the homepage hero portrait with one real-time 3D object: a dark, layered server stack that explodes into five labelled security layers as the visitor scrolls the prologue, then reveals a glowing Oxblood AI core. It acts out the headline "I take systems apart to see how they work."

Success means:
- The scene matches DESIGN.md (palette, labels, motion limits, One Lamp Rule).
- The headline stays readable and See the work / Resume stay in the first viewport.
- The first project sits about 2 screens down.
- Reduced motion, no WebGL, Save-Data and slow connections all get a static poster of the same scene.
- The performance checks in "Testing" pass.

## Scope

In scope:
- The hero (prologue) of `app/page.tsx` only.
- Moving the portrait: a small round portrait beside the name in the prologue, and a framed portrait beside "At work" in Chapter 02.
- The poster image and the Playwright checks.

Out of scope (separate work):
- Chapter numerals, heading wipes, the growing featured screenshot, drawn-in hairlines.
- Any change to topic pages.

## Decisions made during brainstorming

| Topic | Decision |
|---|---|
| Portrait | Replaced in the hero's right column by the 3D stack. A small round portrait (about 44px) sits beside "Adeeb Nizar"; a framed portrait sits beside "At work" in Chapter 02. |
| Mobile | Same scene, smaller (about 320px tall), DPR ≤ 1.5, same 1-viewport pin. |
| Pin length | 1 viewport for the prologue on all sizes (DESIGN.md updated). |
| Scroll → 3D wiring | ScrollTrigger writes progress (0–1) into a plain shared object; the R3F frame loop reads it. No React re-render per scroll. |
| Bloom | No postprocessing library. Core glow = emissive material + additive halo sprite. |
| drei | Only `Html` is imported (for labels). |
| Labels | drei `<Html>`, `aria-hidden`. |
| Poster as LCP | If the test shows the poster is the LCP: serve it as a small AVIF with `fetchPriority="high"` and `loading="eager"` (Next 16 deprecates `priority`), and change the DESIGN.md rule to "LCP stays under 2.5s". Agreed in advance. |

Rejected approaches: progress in React state (re-renders every scroll event), drei `ScrollControls` (own scroll container, which breaks "no scroll-jacking").

## Architecture

New folder `components/hero/`:

| File | Responsibility | Depends on |
|---|---|---|
| `layers.ts` | Data only: five layers (number, label, plate height, exploded Y) and the core's start/end Y. | nothing |
| `HeroStage.tsx` | Client component in the hero's right column. Renders the poster; decides whether to load 3D; lazy-loads `HeroCanvas` with `next/dynamic` and `ssr: false`; crossfades poster → canvas; restores the poster on failure; holds `sr-only` description text. | `next/image`, `HeroCanvas` (lazy), `useHeroScroll` |
| `HeroCanvas.tsx` | R3F `<Canvas>`: DPR cap (2 desktop, 1.5 below `lg`), pauses when off-screen (IntersectionObserver) or tab hidden, reports first frame and context loss to `HeroStage`. `aria-hidden`. | `@react-three/fiber`, `DefenseStack` |
| `DefenseStack.tsx` | Procedural geometry, materials, idle rotation, pointer parallax, explode positions, core light, labels. Reads the shared progress object each frame. | `three`, `@react-three/fiber`, drei `Html`, `layers.ts` |
| `useHeroScroll.ts` | GSAP ScrollTrigger: pins the hero section for 1 viewport, writes progress into the shared object, and drives the post-pin recede. Not created under reduced motion. Cleans up on unmount. | `gsap`, `gsap/ScrollTrigger` |

`app/page.tsx` stays a server component. `HeroPortrait` is removed from the hero; `<HeroStage />` takes its place. The portrait image (`/adeeb-cutout.png`) is reused for the two new portrait spots.

Dependencies added: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`; dev: `@playwright/test`, `@types/three`.

## The object

- **Plates:** five dark, matte, hollow square plates (rack-bezel style, open centre), each with a thin Brass rim that is slightly emissive so the stack reads with the core hidden. Top to bottom: 01 Network, 02 Firewall, 03 Operating System, 04 Application, 05 Data.
- **Assembled:** plates stacked tight into one block; the AI core is hidden inside the bottom of the stack.
- **Core:** a simple Oxblood emissive form plus a point light (the only light in the scene) and an additive halo sprite. Glow intensity scales with reveal progress.
- **Labels:** Geist Mono 12px or larger; text in Bone, number in Brass; placed at each plate's right edge; `aria-hidden`.
- Low polygon count, no textures. No particles, neon, holograms, starfields or grids.

## Motion

Progress maps linearly to scroll over the 1-viewport pin, with light smoothing:

| Progress | Behaviour |
|---|---|
| 0–0.05 | Assembled; idle only. |
| 0.05–0.70 | Plates lift to their exploded slots one at a time, in order 01 → 05; each takes about 0.2 of progress, overlapping. A label fades in and slides 6px out once its plate is about 60% of the way to its slot. |
| 0.70–0.92 | The core rises up the open centre to the middle of the column; emissive, light and halo go from 0 to full. Plate undersides pick up Oxblood light. |
| 0.92–1 | Fully exploded hold (this is the poster frame). |

- Scrolling up reverses the same mapping, so the stack reassembles.
- **Idle:** slow Y rotation, about one turn per 90s. As progress rises, rotation eases toward a fixed three-quarter angle so labels stay in front.
- **Parallax:** pointer tilt up to ±6° on both axes, smoothed; off on touch (`pointer: coarse`).
- **After the pin:** as Chapter 01 enters, the canvas wrapper goes to 25% opacity and 0.92 scale (CSS opacity/transform only). Rendering pauses once the canvas is off-screen.

## Fallbacks and accessibility

- The poster is server-rendered at the canvas's size, so the hero is never empty.
- `HeroStage` loads 3D only after hydration and only if all of these hold: no `prefers-reduced-motion: reduce`; no `navigator.connection.saveData` and `effectiveType` not `2g`/`slow-2g`; a WebGL context can be created.
- The canvas mounts behind the poster; after its first rendered frame the poster fades out over 200ms.
- `webglcontextlost`: unmount the canvas, show the poster, don't retry.
- Reduced motion switched on mid-visit: kill ScrollTrigger, unmount the canvas, show the poster.
- Poster alt text: "An exploded server stack: Network, Firewall, Operating System, Application and Data layers separated around a glowing AI core." While the live canvas shows, the same sentence stays in the DOM as `sr-only` text.
- Canvas and labels are `aria-hidden`. The pin uses normal pin spacing; Tab moves through the hero links without a focus trap.

## Poster

- `scripts/capture-hero-poster.ts` (Playwright) runs against the production build, scrolls to the end of the pin, waits for the hold state, and screenshots the canvas element at deviceScaleFactor 1 and 2.
- Output: `public/hero/defense-stack.png` and `public/hero/defense-stack@2x.png`, served through `next/image`.
- Re-run whenever the scene changes.

## Testing

Manual: each implementation step ends with a browser check you run yourself.

Automated: `tests/hero.spec.ts` (Playwright, Chromium) against `next build && next start`:

| Check | Pass condition |
|---|---|
| LCP element | is the `h1` (if it is the poster, apply the "Poster as LCP" decision and re-check that LCP < 2.5s) |
| 3D chunk size | ≤ about 200KB gzipped, measured from the build output |
| Frame rate scrolling the pin | median ≥ 55fps desktop; 4× CPU throttle at 390px wide reported against the 60fps mid-range-phone target |
| DPR cap | canvas backing size / display size ≤ 2 desktop, ≤ 1.5 mobile |
| Pause | a frame counter (exposed on `window` only in non-production builds) stops when off-screen and when the tab is hidden |
| Reduced motion (emulated) | no canvas, poster visible, no `.pin-spacer`, no ScrollTrigger instances created |
| Save-Data / no WebGL (stubbed with `addInitScript`) | poster only |
| Forced context loss (`WEBGL_lose_context`) | poster returns |

Because the frame counter must work in the tested build, the Playwright run uses a build with a test-only env flag (`NEXT_PUBLIC_HERO_DEBUG=1`) rather than shipping the counter.

## Implementation steps (each checked in the browser)

1. Install `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@types/three`. Check: the site still builds and looks unchanged.
2. Static layered stack in the hero, replacing the portrait (no motion). Check: assembled stack with Brass rims in the right column, small portrait beside the name.
3. Framed portrait beside "At work" in Chapter 02. Check: the portrait appears there at all widths.
4. Idle rotation + pointer parallax. Check: slow spin; tilt follows the pointer, at most 6°.
5. Scroll-driven explode with labels and the AI core lighting up, plus the post-pin recede. Check: pin lasts 1 viewport; plates leave in order with labels; core rises and brightens; reverses on scroll up.
6. Playwright setup, poster capture, and the reduced-motion / no-WebGL / Save-Data / context-loss poster fallback. Check: with reduced motion emulated, the poster shows and nothing pins.
7. Performance check with Playwright. Check: all rows in "Testing" pass, or a failure is reported with numbers.

Step 3 is new (from the portrait decision). Playwright installation moves into step 6 because the poster is a Playwright screenshot.
