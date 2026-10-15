---
name: Adeeb Nizar Portfolio
description: A dark workbench where the brand shell glows oxblood and brass, and every subject gets its own instrument light.
colors:
  oxblood: "#7A1F2B"
  faded-rose: "#C96E6E"
  brass: "#D6B48A"
  bone: "#F3EDE6"
  dusk-mauve: "#B89AAA"
  ink-black: "#0F0A0B"
  ember-panel: "#1A1114"
  smoke-line: "#5E565C"
  signal-cyan: "#34D5EB"
  signal-sky: "#38BDF8"
  harbor-deep: "#06131C"
  harbor-panel: "#111A22"
  harbor-line: "#263640"
  harbor-text: "#EAF6F8"
  harbor-muted: "#8FA4AD"
  lamp-amber: "#F4C46B"
  alert-red: "#F87171"
  pass-green: "#4ADE80"
typography:
  display:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(2.7rem, 5.4vw, 5.4rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.24em"
rounded:
  badge: "13px"
  card: "18px"
  card-feature: "20px"
  panel: "24px"
  panel-group: "28px"
  pill: "9999px"
spacing:
  gutter-sm: "20px"
  gutter-md: "24px"
  gutter-lg: "32px"
  card-pad: "20px"
  panel-pad: "40px"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "{colors.ember-panel}"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-ghost-hover:
    textColor: "{colors.brass}"
  nav-link:
    textColor: "{colors.dusk-mauve}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.bone}"
  card-feature:
    backgroundColor: "{colors.ember-panel}"
    textColor: "{colors.bone}"
    rounded: "{rounded.card-feature}"
    padding: "{spacing.card-pad}"
  icon-badge:
    textColor: "{colors.brass}"
    rounded: "{rounded.badge}"
    size: "44px"
  card-harbor:
    backgroundColor: "{colors.harbor-panel}"
    textColor: "{colors.harbor-text}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
---

# Design System: Adeeb Nizar Portfolio

## Overview

**Creative North Star: "The Lit Workbench"**

The site is a dark workshop after hours. The hall you walk in through (the homepage and the navbar) is lit warm: oxblood, brass and bone on near-black, with a signature and a portrait to say whose bench this is. Each project and article is a separate station on that bench, lit by its own instrument light: signal cyan over the network and security labs, teal over electronics, violet over AI and encryption, emerald on zinc for the transistor explainer. The lamps change; the bench does not. Type, shape, spacing and motion stay the same across every station, so the topic worlds read as one practice, not as a scrapbook.

Density is generous at the top and specific further in. Display type is set huge, heavy and tight, then gives way to small monospace labels and calm body text. Depth comes from soft ambient glows, blurred color fields and translucent panels rather than hard edges. Motion is slow and physical: cards lift, previews tilt slightly, a sheen sweeps once. All of it switches off under reduced motion.

**Key Characteristics:**
- A dark base everywhere; no light mode.
- One warm brand shell (oxblood/brass/bone) plus one cool or saturated instrument palette per topic.
- Heavy display headlines that stand alone, with mono reserved for real data.
- Soft, rounded containers (18–28px) and pill-shaped controls.
- Ambient blurred glows and faint blueprint grids as atmosphere, never as content.

## Colors

The palette has two layers: a warm, low-saturation brand shell, and saturated instrument accents that belong to individual topic worlds.

### Primary
- **Oxblood** (`oxblood`): the brand's weight. Primary button fills, the contact panel gradient, the CTA border tint and the deepest glow color. Used as a surface and a glow more often than as text.
- **Faded Rose** (`faded-rose`): oxblood's lit edge. The solid accent phrase in headlines ("how they work."), hover borders, arrows, small indicator dots and their glows.

### Secondary
- **Brass** (`brass`): the instrument-label color of the shell. Secondary accent phrases in headlines, discipline tags in project metadata, "All projects" style links, arrows, the end stop of the nav underline gradient, and the ghost-button hover text.

### Tertiary (topic worlds)
- **Signal Cyan** (`signal-cyan`): the security, networking, NIST and virtualization worlds' key accent. Labels, active terminal output, links and grid lines. (`#35D3EB` also appears in the code as a near-duplicate; treat it as the same token.)
- **Signal Sky** (`signal-sky`): the secondary cool accent in the security worlds, for highlights and diagram strokes.
- **Lamp Amber** (`lamp-amber`), **Alert Red** (`alert-red`), **Pass Green** (`pass-green`): semantic accents inside topic worlds for warning/risk, attack/failure and secure/success states in diagrams, terminals and callouts.
- Other topic worlds set their own lamp in their theme components: electronics teal `#18A999` with amber `#F0B44D` (`components/themes/ElectronicsTheme.tsx`); AI violet `#7C3AED` with pink `#EC4899` and cyan `#06B6D4` (`components/themes/AITheme.tsx`); encryption violet `#8B5CF6` with mint `#5EEAD4`; Linux-foundations mint `#62D7B3`; and the transistor explainer's zinc with emerald and yellow `#FACC15`.

### Neutral
- **Bone** (`bone`): primary text and headlines in the shell.
- **Dusk Mauve** (`dusk-mauve`): body copy and nav links in the shell; the readable secondary text color.
- **Ink Black** (`ink-black`): the shell's page background.
- **Ember Panel** (`ember-panel`): card, panel and ghost-button surfaces in the shell, usually at 70–85% opacity over the background.
- **Smoke Line** (`smoke-line`): hairlines and card borders in the shell, at 25–60% opacity.
- **Harbor Deep / Harbor Panel / Harbor Line** (`harbor-deep`, `harbor-panel`, `harbor-line`): the security world's background, panel and border.
- **Harbor Text / Harbor Muted** (`harbor-text`, `harbor-muted`): the security world's primary and secondary text.

### Named Rules
**The One Lamp Rule.** A page is lit by either the brand shell or one topic world. Brass and oxblood never share a surface with signal cyan or violet; the navbar is the only shell element that crosses into topic pages.

**The Lamp Not Floodlight Rule.** Accents mark labels, edges, glows and state. Large fields of saturated color appear only as blurred ambient light at 2–12% opacity, never as solid blocks behind text.

## Typography

**Display Font:** Arial (with Helvetica, sans-serif)
**Body Font:** Arial (with Helvetica, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace)

**Character:** a blunt, heavy grotesk for headlines, made distinctive by weight 900 and tight negative tracking, paired with a precise mono that labels everything like an instrument panel. Note: `app/layout.tsx` loads Geist Sans, but `app/globals.css` sets `body` to Arial, so Arial is what actually renders for sans text.

### Hierarchy
- **Display** (900, clamp(2.7rem → 5.4rem), line-height 0.92, -0.04em, uppercase): the hero headline, with its closing phrase in solid Faded Rose. Topic pages go larger, up to clamp(7rem → 16rem) for oversized section numerals and titles.
- **Headline** (900, clamp(2rem → 3.6rem), 0.98, -0.04em): section titles in sentence case with a second phrase in an accent color ("Systems I've *taken apart.*"). The contact panel keeps its stacked uppercase "LET'S BUILD SOMETHING."
- **Title** (700, 1.25–1.5rem, tight tracking): card and project titles.
- **Body** (400, 14–16px, line-height 1.75): descriptions and article prose, kept to about 620px (roughly 70ch) wide.
- **Data** (Geist Mono, 12px minimum, normal tracking): real data only, such as discipline, tools and topics in project and article metadata. Never a label above a heading.

### Named Rules
**The Heading Speaks Alone Rule.** No eyebrow or kicker above headings. A heading carries its own weight; mono is reserved for data (tools, disciplines, topics), set below the content it describes. (The contact panel's "Connect" label is a grandfathered exception.)

**The Heavy Or Quiet Rule.** Headlines are 900-weight and tightly tracked; everything else steps all the way down to regular body or small mono. Don't fill the gap with mid-weight display type.

## Layout

The content container is 1240px wide on the homepage and project index, 1380px on lab articles, and 1440–1500px for the navbar and footer. Side gutters step up from 20px to 24px to 32px at the `sm` and `lg` breakpoints. Sections breathe vertically (48px → 64px).

The hero is a two-column grid (about 1.05fr text, 0.95fr portrait) at `lg`, collapsing to one column below that. Feature and contact blocks use the same asymmetric split. Card grids run one, two or three columns by breakpoint. Category lists are joined with 1px gaps over a tinted background, so they read as a single segmented panel.

The navbar is sticky, translucent and blurred. Desktop links show from `lg` up; below that a round hamburger opens a full-width stacked menu.

## Elevation & Depth

Depth is ambient, not structural. Surfaces float on large, soft, low-opacity black shadows, and the brand's sense of light comes from blurred color fields (oxblood, rose, cyan) placed off-canvas behind the content. Translucent panels with backdrop blur sit over those fields. Topic worlds add faint blueprint grids (about 3.5% opacity) and drifting background diagrams in a fixed, `aria-hidden` layer.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 20px 55px rgba(0,0,0,0.16)`): default lift for shell cards.
- **Card hover glow** (`box-shadow: 0 28px 75px rgba(122,31,43,0.14)`): an oxblood-tinted shadow that replaces the rest shadow on hover.
- **Panel** (`box-shadow: 0 35px 100px rgba(0,0,0,0.25)`): large composite panels such as the contact block.
- **Primary button** (`box-shadow: 0 12px 35px rgba(122,31,43,0.28)`): the CTA's oxblood underglow, becoming `0 16px 45px rgba(201,110,110,0.22)` on hover.
- **Indicator glow** (`box-shadow: 0 0 10px rgba(201,110,110,0.7)`): small status dots.

### Named Rules
**The Glow Not Edge Rule.** Elevation is signalled by diffuse, tinted light, never by crisp drop shadows or heavy outlines.

## Shapes

Soft, generous rounding throughout. Interactive controls (buttons, nav CTA, tags, hamburger) are full pills. Containers scale their radius with their size: icon badges 13px, cards 18–20px, large panels 24px, grouped panels 28px. Borders are 1px hairlines at low opacity, in Smoke Line in the shell or the lamp color at 20–45% in topic worlds. Large panels clip their glows with `overflow: hidden`.

## Components

### Buttons
Tactile and warm; they lift toward the cursor.
- **Shape:** full pill (9999px).
- **Primary:** an Oxblood-to-deeper-oxblood (`#9A3441`) gradient with Bone text, a Faded Rose border at 40%, 10px × 20px padding, semibold 14px, a trailing arrow, and the primary button underglow.
- **Hover / Focus:** lifts 4px; the border shifts to Brass at 55%; the arrow nudges 4px right; 300ms transitions.
- **Ghost:** Ember Panel at 75% with backdrop blur and a Smoke Line border; on hover it lifts and the text and border turn Brass.
- **Nav CTA:** a smaller pill (8px × 16px, 12px text) tinted with Oxblood at 22%, deepening to 38% with an oxblood glow on hover.

### Cards / Containers
- **Corner Style:** 18–20px.
- **Background:** Ember Panel at about 82% in the shell, Harbor Panel in the security world.
- **Shadow Strategy:** card rest, then card hover glow (see Elevation).
- **Border:** a Smoke Line hairline at 35%, shifting to Faded Rose at 45% on hover. Featured cards use a Brass hairline at 20% → 45%.
- **Internal Padding:** 20px.
- **Motion:** lifts 7px on hover over 500ms `cubic-bezier(.2,.8,.2,1)`.

### Chips / Icon Badges
- **Icon badge:** a 44px rounded square (13px) with a hairline border and a 10% fill in its tone color (Brass, Faded Rose, Dusk Mauve or Oxblood). It scales to 110% when its parent card is hovered.
- **Status tags:** small mono uppercase labels (Featured, Completed, In Progress, Coming Soon) in the page's accent color.

### Navigation
A sticky bar over Ink Black at 82% with heavy backdrop blur and a Smoke Line hairline at the bottom. Links are 13px medium Dusk Mauve, turning Bone on hover, with a Faded Rose → Brass gradient underline that grows from 0 to full width. On mobile, a 40px round toggle animates three lines into an X (the middle line in Brass) and opens a stacked menu with a hairline between rows and Brass arrows.

### Project Preview (signature)
Project screenshots sit in a frame that tilts on hover (perspective 1200px, rotateX 2°, rotateY −2°, lift 4px, scale 1.012, over 650ms), and a single skewed light sheen sweeps across once.

### Interactive Terminal (signature)
`components/labs/InteractiveTerminal.tsx` replays real lab sessions as a dark terminal window: a mono command line with output in the topic world's accent and semantic colors. It is the main proof device for lab projects and keeps the same shape language as the cards.

## Do's and Don'ts

### Do:
- **Do** keep every surface dark: Ink Black (`#0F0A0B`) in the shell, the topic world's deep base elsewhere.
- **Do** give each new topic its own theme component in `components/themes/` with one lamp color plus semantic accents, while reusing the shared type, radius, spacing and motion rules.
- **Do** let headings stand alone; put discipline and tools in a mono metadata line below the content, at 12px or larger.
- **Do** set headlines at weight 900 with -0.04em tracking (never tighter) and line-height ≤ 0.98; emphasize with a solid accent color, never gradient text.
- **Do** use the shared card motion: `cubic-bezier(.2,.8,.2,1)`, 500ms, a 7px lift. Wrap decorative animation in a `prefers-reduced-motion` reset, as `app/page.tsx` does.
- **Do** keep ambient glows and grids `aria-hidden`, `pointer-events: none` and below 12% opacity.

### Don't:
- **Don't** use gradient text or put eyebrow labels above headings.
- **Don't** set functional text below 12px.
- **Don't** mix shell colors (Oxblood, Brass) with a topic lamp (cyan, violet, teal) on the same page body. (The One Lamp Rule.)
- **Don't** put a solid saturated fill behind body text; saturated color appears as edges, labels, glows and states only.
- **Don't** use mid-weight (500–700) display-size headlines.
- **Don't** use hard, dark drop shadows or thick borders for elevation; borders stay 1px hairlines.
- **Don't** introduce square-cornered containers or non-pill buttons.
- **Don't** use a light theme or white page backgrounds.
