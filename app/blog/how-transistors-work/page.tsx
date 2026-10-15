"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import TransistorAnimation from "@/components/visualizations/TransistorAnimation";

export default function HowTransistorsWork() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <ElectronicsBackground scrollY={scrollY} />

      <div className="relative z-30">
        <Navbar />
      </div>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative z-10 overflow-hidden border-b border-zinc-800/80">
        <HeroTransistorIllustration scrollY={scrollY} />

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 xl:py-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <span>←</span>
            Back to Blog
          </Link>

          <div className="mt-10 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                Electronics
              </span>

              <span className="text-sm text-zinc-600">
                Visual Explainer
              </span>

              <span className="text-zinc-700">•</span>

              <span className="text-sm text-zinc-600">
                Interactive
              </span>
            </div>

            <h1 className="mt-7 max-w-5xl text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.03] tracking-tight">
              How Transistors
              <span className="text-zinc-500">
                {" "}Work.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg xl:text-xl">
              A transistor can act as a switch, an amplifier, and one of the
              fundamental building blocks of modern electronics. Instead of
              only reading about one, interact with a real-time educational
              circuit model and watch it respond.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#interactive-lab"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
              >
                Try the Interactive Lab
              </a>

              <a
                href="#basics"
                className="rounded-xl border border-zinc-700 bg-zinc-950/40 px-6 py-3 font-semibold text-zinc-300 backdrop-blur-sm transition hover:border-zinc-500 hover:text-white"
              >
                Learn the Basics
              </a>

              <Link
                href="/blog/how-transistors-work/photos"
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 py-3 font-semibold text-amber-200 transition hover:border-amber-400/60 hover:bg-amber-500/15"
              >
                View Real Transistors →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          QUICK CONCEPTS
      =================================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          <ConceptCard
            icon="⚡"
            eyebrow="Core idea"
            title="Small input. Larger controlled current."
            description="Current entering the base can influence a much larger current between collector and emitter."
            accent="emerald"
          />

          <ConceptCard
            icon="↗"
            eyebrow="Three terminals"
            title="Base. Collector. Emitter."
            description="The terminals connect the transistor to the control signal, load, and return path."
            accent="blue"
          />

          <ConceptCard
            icon="⌁"
            eyebrow="Switching"
            title="OFF → ACTIVE → SATURATED"
            description="Its operating state changes depending on base drive and the surrounding circuit."
            accent="amber"
          />
        </div>
      </section>

      {/* ===================================================
          BASICS
      =================================================== */}

      <section
        id="basics"
        className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-6 py-14 md:py-18 xl:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              The Basics
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              What is a transistor?
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-zinc-400 md:text-lg">
            <p>
              A transistor is a semiconductor device used to control electrical
              signals. This article focuses on an{" "}
              <span className="font-medium text-white">
                NPN bipolar junction transistor
              </span>.
            </p>

            <p>
              Think of the base as a control input. Once enough voltage appears
              between base and emitter, base current begins to flow. That allows
              the transistor to control a larger collector current.
            </p>

            <p>
              This makes transistors extremely useful as electronic switches for
              LEDs, relays, motors, digital circuits, and many other systems.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          TERMINALS
      =================================================== */}

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-16 md:pb-20">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            NPN transistor terminals
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <TerminalCard
              terminal="B"
              title="Base"
              description="The control terminal. Base current influences collector current."
              className="text-blue-400"
            />

            <TerminalCard
              terminal="C"
              title="Collector"
              description="Current from the load enters the transistor through the collector."
              className="text-emerald-400"
            />

            <TerminalCard
              terminal="E"
              title="Emitter"
              description="Provides the return path for current through the transistor."
              className="text-zinc-300"
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          INTERACTIVE LAB
      =================================================== */}

      <section
        id="interactive-lab"
        className="relative z-10 scroll-mt-4 border-y border-zinc-800/80 bg-black/35 py-12 md:py-16 xl:py-20"
      >
        <div className="mx-auto max-w-[1540px] px-3 sm:px-4 md:px-6">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Interactive Lab
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl xl:text-5xl">
              Control the circuit yourself.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Change voltage, resistance, and transistor parameters. Watch
              current flow, LED brightness, and transistor state update in real
              time.
            </p>
          </div>

          <TransistorAnimation />
        </div>
      </section>

      {/* ===================================================
          VOLTAGE EXPLANATION
      =================================================== */}

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20 xl:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Voltage & Current
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Where does the supply voltage go?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
              The full supply voltage does not simply appear across one
              component. The LED, transistor, and resistor each account for part
              of the circuit voltage.
            </p>
          </div>

          <div className="space-y-3">
            <VoltageCard label="Supply" value="5.0 V" />

            <VoltageCard
              label="LED forward voltage"
              value="≈ 2.0 V"
              valueClass="text-emerald-400"
            />

            <VoltageCard
              label="Saturated transistor"
              value="≈ 0.2 V"
              valueClass="text-blue-400"
            />

            <VoltageCard
              label="Remaining across RL"
              value="≈ 2.8 V"
              valueClass="text-amber-300"
              highlight
            />
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm md:p-8">
          <p className="text-sm text-zinc-500">
            Approximate maximum collector current
          </p>

          <p className="mt-4 overflow-x-auto font-mono text-base text-emerald-400 md:text-xl">
            IC(max) ≈ (VS − VLED − VCE(sat)) / RL
          </p>

          <p className="mt-4 text-zinc-400">
            Using 5 V, a 2 V LED, 0.2 V transistor drop, and a 220 Ω load
            resistor:
          </p>

          <p className="mt-3 font-mono text-white">
            (5 − 2 − 0.2) / 220 ≈ 12.7 mA
          </p>
        </div>
      </section>

      {/* ===================================================
          OPERATING STATES
      =================================================== */}

      <section className="relative z-10 border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 xl:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Operating Regions
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Three states to understand.
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-400 md:text-lg">
              Watching the transistor move between these simplified regions
              helps explain how it behaves as a switch.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <StateCard
              state="OFF"
              title="No useful conduction"
              description="There is not enough base-emitter drive for significant collector current."
              type="off"
            />

            <StateCard
              state="ACTIVE"
              title="Current is controlled"
              description="Collector current is approximately related to base current through transistor current gain."
              type="active"
              equation="IC ≈ β × IB"
            />

            <StateCard
              state="SATURATED"
              title="Fully switched on"
              description="The surrounding load circuit becomes the main limitation on collector current."
              type="saturated"
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          BASE RESISTOR
      =================================================== */}

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.04] p-6 backdrop-blur-sm md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                RB
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Why do we need a base resistor?
              </h2>
            </div>

            <div>
              <p className="text-base leading-8 text-zinc-400 md:text-lg">
                The base-emitter junction behaves somewhat like a diode. Once
                Vin exceeds VBE, current can flow into the base. Without a
                resistor, that current could become excessive.
              </p>

              <p className="mt-4 text-base leading-8 text-zinc-400 md:text-lg">
                RB limits that current to a controlled value.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl bg-zinc-950/80 p-4 font-mono text-blue-400">
                IB ≈ (Vin − VBE) / RB
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          TAKEAWAYS
      =================================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-sm md:p-9">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Key Takeaways
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Five things to remember.
          </h2>

          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {[
              "A small base signal can control a larger collector current.",
              "An NPN BJT has base, collector, and emitter terminals.",
              "RB limits current entering the transistor base.",
              "LED and transistor voltage drops reduce the voltage across RL.",
              "In saturation, the surrounding load limits collector current.",
            ].map((text, index) => (
              <div
                key={text}
                className="rounded-2xl border border-zinc-800 bg-black/35 p-5"
              >
                <p className="font-mono text-sm text-emerald-400">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FOOTER CTA
      =================================================== */}

      <section className="relative z-10 border-t border-zinc-800/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-zinc-600">
              Continue exploring
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              More visual explainers coming soon.
            </h2>
          </div>

          <Link
            href="/blog"
            className="self-start rounded-xl border border-zinc-700 bg-zinc-950/60 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            Browse Blog →
          </Link>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function ElectronicsBackground({
  scrollY,
}: {
  scrollY: number;
}) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* LAYER 1 — SOFT GLOWS */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
          willChange: "transform",
        }}
      >
        <div className="absolute left-[-10%] top-[0%] h-[700px] w-[700px] rounded-full bg-emerald-500/[0.12] blur-[170px]" />

        <div className="absolute right-[-12%] top-[6%] h-[680px] w-[680px] rounded-full bg-red-500/[0.09] blur-[180px]" />

        <div className="absolute left-[20%] bottom-[-10%] h-[620px] w-[620px] rounded-full bg-yellow-400/[0.10] blur-[170px]" />

        <div className="absolute right-[12%] bottom-[2%] h-[450px] w-[450px] rounded-full bg-emerald-300/[0.06] blur-[130px]" />

        <div className="absolute left-[56%] top-[30%] h-[300px] w-[300px] rounded-full bg-orange-400/[0.05] blur-[120px]" />
      </div>

      {/* LAYER 2 — DIAGONAL LIGHT SWEEP */}
      <div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          transform: `translate3d(0, ${scrollY * 0.13}px, 0)`,
          willChange: "transform",
          background:
            "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.06) 38%, transparent 55%)",
        }}
      />

      {/* LAYER 3 — TECH / PCB SVG */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.18}px, 0)`,
          willChange: "transform",
        }}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.30]"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="traceGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#86efac" />
            </linearGradient>

            <linearGradient id="traceYellow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>

            <linearGradient id="traceRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>

            <radialGradient id="chipGlow" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Trace paths for pulse animation */}
            <path id="pulsePathGreen1" d="M0 160 H250 V260 H420" />
            <path id="pulsePathGreen2" d="M0 420 H170 V540 H330 V650" />
            <path id="pulsePathYellow1" d="M720 0 V110 H640 V210" />
            <path id="pulsePathYellow2" d="M720 430 H840 V350 H980" />
            <path id="pulsePathRed1" d="M1600 210 H1380 V330 H1210" />
            <path id="pulsePathRed2" d="M1060 590 H1220 V500 H1370" />
          </defs>

          {/* BASE TRACES */}
          <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g stroke="url(#traceGreen)" opacity="0.40">
              <path d="M0 160 H250 V260 H420" />
              <path d="M0 420 H170 V540 H330 V650" />
              <path d="M150 0 V110 H320 V220" />
              <path d="M360 1000 V850 H520 V760" />
              <path d="M80 760 H280 V700 H470" />
              <path d="M540 220 H650 V150 H760" />
            </g>

            <g stroke="url(#traceYellow)" opacity="0.36">
              <path d="M720 0 V110 H640 V210" />
              <path d="M900 1000 V890 H980 V790" />
              <path d="M240 760 H390 V670 H540" />
              <path d="M1170 120 H1040 V230 H930" />
              <path d="M720 430 H840 V350 H980" />
              <path d="M470 570 H610 V500 H730" />
            </g>

            <g stroke="url(#traceRed)" opacity="0.30">
              <path d="M1600 210 H1380 V330 H1210" />
              <path d="M1600 620 H1420 V730 H1240" />
              <path d="M1280 0 V150 H1150 V250" />
              <path d="M1320 1000 V860 H1120 V770" />
              <path d="M1060 590 H1220 V500 H1370" />
              <path d="M980 360 H1110 V280 H1250" />
            </g>
          </g>

          {/* ANIMATED FLOWING TRACE LIGHTS */}
          <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <g stroke="url(#traceGreen)" opacity="0.55" strokeDasharray="16 22">
              <path d="M0 160 H250 V260 H420">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-76"
                  dur="5.5s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M0 420 H170 V540 H330 V650">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-90"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            <g stroke="url(#traceYellow)" opacity="0.48" strokeDasharray="14 24">
              <path d="M720 0 V110 H640 V210">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-72"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M720 430 H840 V350 H980">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-84"
                  dur="6.8s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            <g stroke="url(#traceRed)" opacity="0.44" strokeDasharray="14 22">
              <path d="M1600 210 H1380 V330 H1210">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-70"
                  dur="6.2s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M1060 590 H1220 V500 H1370">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-78"
                  dur="7.6s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>

          {/* MOVING PULSE DOTS */}
          <g>
            <circle r="4.5" fill="#86efac" opacity="0.95">
              <animateMotion
                dur="5.2s"
                repeatCount="indefinite"
                path="M0 160 H250 V260 H420"
              />
            </circle>

            <circle r="3.8" fill="#4ade80" opacity="0.9">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                begin="1.1s"
                path="M0 420 H170 V540 H330 V650"
              />
            </circle>

            <circle r="4.5" fill="#fde68a" opacity="0.95">
              <animateMotion
                dur="5.8s"
                repeatCount="indefinite"
                begin="0.6s"
                path="M720 0 V110 H640 V210"
              />
            </circle>

            <circle r="4.2" fill="#facc15" opacity="0.92">
              <animateMotion
                dur="6.8s"
                repeatCount="indefinite"
                begin="1.8s"
                path="M720 430 H840 V350 H980"
              />
            </circle>

            <circle r="4.5" fill="#fca5a5" opacity="0.94">
              <animateMotion
                dur="6.4s"
                repeatCount="indefinite"
                begin="0.8s"
                path="M1600 210 H1380 V330 H1210"
              />
            </circle>

            <circle r="4" fill="#f87171" opacity="0.9">
              <animateMotion
                dur="7.2s"
                repeatCount="indefinite"
                begin="1.5s"
                path="M1060 590 H1220 V500 H1370"
              />
            </circle>
          </g>

          {/* PCB NODES / VIA POINTS */}
          <g>
            <g fill="#4ade80" opacity="0.62">
              <circle cx="250" cy="160" r="5" />
              <circle cx="250" cy="260" r="5" />
              <circle cx="170" cy="420" r="5" />
              <circle cx="320" cy="110" r="5" />
              <circle cx="520" cy="850" r="5" />
              <circle cx="650" cy="150" r="5" />
            </g>

            <g fill="#facc15" opacity="0.56">
              <circle cx="640" cy="110" r="5" />
              <circle cx="980" cy="890" r="5" />
              <circle cx="390" cy="670" r="5" />
              <circle cx="1040" cy="230" r="5" />
              <circle cx="840" cy="350" r="5" />
              <circle cx="610" cy="500" r="5" />
            </g>

            <g fill="#f87171" opacity="0.50">
              <circle cx="1380" cy="210" r="5" />
              <circle cx="1380" cy="330" r="5" />
              <circle cx="1420" cy="620" r="5" />
              <circle cx="1420" cy="730" r="5" />
              <circle cx="1150" cy="150" r="5" />
              <circle cx="1120" cy="860" r="5" />
            </g>
          </g>

          {/* CHIP / IC BLOCKS */}
          <g opacity="0.24">
            <g transform="translate(180 300)">
              <rect
                x="0"
                y="0"
                width="160"
                height="110"
                rx="16"
                fill="#111827"
                stroke="#4ade80"
                strokeWidth="1.5"
              />
              <rect
                x="12"
                y="12"
                width="136"
                height="86"
                rx="12"
                fill="url(#chipGlow)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={`lchip-top-${i}`}
                  x1={20 + i * 22}
                  y1="-10"
                  x2={20 + i * 22}
                  y2="0"
                  stroke="#4ade80"
                  strokeWidth="2"
                />
              ))}

              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={`lchip-bottom-${i}`}
                  x1={20 + i * 22}
                  y1="110"
                  x2={20 + i * 22}
                  y2="120"
                  stroke="#4ade80"
                  strokeWidth="2"
                />
              ))}
            </g>

            <g transform="translate(1170 640)">
              <rect
                x="0"
                y="0"
                width="180"
                height="120"
                rx="16"
                fill="#111827"
                stroke="#facc15"
                strokeWidth="1.5"
              />
              <rect
                x="14"
                y="14"
                width="152"
                height="92"
                rx="12"
                fill="url(#chipGlow)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`rchip-left-${i}`}
                  x1="-10"
                  y1={16 + i * 14}
                  x2="0"
                  y2={16 + i * 14}
                  stroke="#facc15"
                  strokeWidth="2"
                />
              ))}

              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`rchip-right-${i}`}
                  x1="180"
                  y1={16 + i * 14}
                  x2="190"
                  y2={16 + i * 14}
                  stroke="#facc15"
                  strokeWidth="2"
                />
              ))}
            </g>
          </g>

          {/* TECHNICAL HUD RINGS */}
          <g opacity="0.18">
            <circle
              cx="280"
              cy="760"
              r="120"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
            />
            <circle
              cx="280"
              cy="760"
              r="85"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1"
            />
            <circle
              cx="1280"
              cy="220"
              r="95"
              fill="none"
              stroke="#f87171"
              strokeWidth="1.5"
            />
            <circle
              cx="1280"
              cy="220"
              r="62"
              fill="none"
              stroke="#f87171"
              strokeWidth="1"
            />
            <circle
              cx="720"
              cy="140"
              r="70"
              fill="none"
              stroke="#facc15"
              strokeWidth="1.2"
            />
          </g>

          {/* GHOSTED TRANSISTOR SYMBOL */}
          <g
            transform="translate(1280 455)"
            stroke="#facc15"
            fill="none"
            opacity="0.24"
          >
            <circle cx="0" cy="0" r="110" strokeWidth="2" />
            <line x1="-52" y1="-58" x2="-52" y2="58" strokeWidth="4" />
            <line x1="-52" y1="-28" x2="12" y2="-84" strokeWidth="4" />
            <line x1="-52" y1="28" x2="12" y2="84" strokeWidth="4" />
            <line x1="-128" y1="0" x2="-52" y2="0" strokeWidth="4" />
            <polygon
              points="-6,50 12,84 -28,68"
              fill="#facc15"
              stroke="none"
            />
          </g>

          {/* MICRO TEXT DETAILS */}
          <g opacity="0.13" fontFamily="monospace" fontSize="16">
            <text x="90" y="120" fill="#4ade80">
              PCB-LAYER / SIGNAL-PATH
            </text>

            <text x="1070" y="120" fill="#f87171">
              TRANSISTOR / CURRENT / FLOW
            </text>

            <text x="90" y="940" fill="#facc15">
              ELECTRONICS / VISUAL EXPLAINER
            </text>
          </g>
        </svg>
      </div>

      {/* LAYER 4 — GRID */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          transform: `translate3d(0, ${scrollY * 0.24}px, 0)`,
          willChange: "transform",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.28) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      {/* LAYER 5 — DOT MATRIX */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          willChange: "transform",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
        }}
      />
    </div>
  );
}

/* =========================================================
   HERO ONLY ILLUSTRATION
========================================================= */

function HeroTransistorIllustration({
  scrollY,
}: {
  scrollY: number;
}) {
  return (
    <div
      className="pointer-events-none absolute right-[-4%] top-[6%] hidden h-[640px] w-[640px] lg:block xl:right-[0%] xl:h-[720px] xl:w-[720px]"
      style={{
        transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-yellow-400/[0.04] blur-[120px]" />
      <div className="absolute inset-[12%] rounded-full bg-red-500/[0.035] blur-[130px]" />

      <svg
        viewBox="0 0 720 720"
        className="h-full w-full opacity-[0.9]"
      >
        {/* Outer rings */}
        <circle
          cx="360"
          cy="360"
          r="230"
          fill="none"
          stroke="rgba(250,204,21,0.16)"
          strokeWidth="2"
        />
        <circle
          cx="360"
          cy="360"
          r="190"
          fill="none"
          stroke="rgba(74,222,128,0.12)"
          strokeWidth="1.5"
        />
        <circle
          cx="360"
          cy="360"
          r="140"
          fill="none"
          stroke="rgba(248,113,113,0.10)"
          strokeWidth="1.5"
        />

        {/* Accent lines */}
        <path
          d="M145 215 H245"
          stroke="rgba(74,222,128,0.25)"
          strokeWidth="2"
          strokeDasharray="8 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-36"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M490 500 H605"
          stroke="rgba(250,204,21,0.22)"
          strokeWidth="2"
          strokeDasharray="8 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-36"
            dur="4.8s"
            repeatCount="indefinite"
          />
        </path>

        {/* Transistor symbol */}
        <g transform="translate(360 360)">
          <circle
            cx="0"
            cy="0"
            r="104"
            fill="rgba(24,24,27,0.35)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="2.5"
          />

          <line
            x1="-42"
            y1="-56"
            x2="-42"
            y2="56"
            stroke="#f4f4f5"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <line
            x1="-42"
            y1="-24"
            x2="12"
            y2="-80"
            stroke="#f4f4f5"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <line
            x1="-42"
            y1="24"
            x2="12"
            y2="80"
            stroke="#f4f4f5"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <line
            x1="-135"
            y1="0"
            x2="-42"
            y2="0"
            stroke="#60a5fa"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <line
            x1="12"
            y1="-80"
            x2="92"
            y2="-160"
            stroke="#4ade80"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <line
            x1="12"
            y1="80"
            x2="92"
            y2="160"
            stroke="#facc15"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <polygon
            points="-5,48 13,80 -28,67"
            fill="#facc15"
          />

          {/* Moving energy rings */}
          <circle
            cx="0"
            cy="0"
            r="128"
            fill="none"
            stroke="rgba(74,222,128,0.18)"
            strokeWidth="2"
          >
            <animate
              attributeName="r"
              values="118;132;118"
              dur="5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.10;0.22;0.10"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="0"
            cy="0"
            r="155"
            fill="none"
            stroke="rgba(248,113,113,0.12)"
            strokeWidth="1.5"
          >
            <animate
              attributeName="r"
              values="148;162;148"
              dur="6.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.07;0.16;0.07"
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Labels */}
        <g fontFamily="monospace" fontSize="18">
          <text x="170" y="365" fill="rgba(96,165,250,0.70)">
            BASE
          </text>

          <text x="475" y="205" fill="rgba(74,222,128,0.65)">
            COLLECTOR
          </text>

          <text x="488" y="548" fill="rgba(250,204,21,0.65)">
            EMITTER
          </text>

          <text x="260" y="618" fill="rgba(255,255,255,0.28)">
            NPN TRANSISTOR
          </text>
        </g>

        {/* Pulse dots on hero lines */}
        <circle r="5" fill="#60a5fa">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M225 360 H318"
          />
        </circle>

        <circle r="5" fill="#4ade80">
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            begin="0.8s"
            path="M372 280 L452 200"
          />
        </circle>

        <circle r="5" fill="#facc15">
          <animateMotion
            dur="3.4s"
            repeatCount="indefinite"
            begin="1.2s"
            path="M372 440 L452 520"
          />
        </circle>
      </svg>
    </div>
  );
}

/* =========================================================
   SMALL PAGE COMPONENTS
========================================================= */

function ConceptCard({
  icon,
  eyebrow,
  title,
  description,
  accent,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "emerald" | "blue" | "amber";
}) {
  const accentClass =
    accent === "emerald"
      ? "text-emerald-400 bg-emerald-500/10"
      : accent === "blue"
      ? "text-blue-400 bg-blue-500/10"
      : "text-amber-300 bg-amber-500/10";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClass}`}
      >
        {icon}
      </div>

      <p className={`mt-5 text-xs font-semibold uppercase tracking-widest ${accentClass.split(" ")[0]}`}>
        {eyebrow}
      </p>

      <h2 className="mt-3 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 leading-7 text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function TerminalCard({
  terminal,
  title,
  description,
  className,
}: {
  terminal: string;
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-950/80 p-5">
      <div className={`text-2xl font-bold ${className}`}>
        {terminal}
      </div>

      <h3 className="mt-3 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function VoltageCard({
  label,
  value,
  valueClass = "text-white",
  highlight = false,
}: {
  label: string;
  value: string;
  valueClass?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur-sm ${
        highlight
          ? "border-amber-500/20 bg-amber-500/[0.05]"
          : "border-zinc-800 bg-zinc-900/60"
      }`}
    >
      <div className="flex items-center justify-between gap-5">
        <span className="text-zinc-400">
          {label}
        </span>

        <span className={`font-mono ${valueClass}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

function StateCard({
  state,
  title,
  description,
  type,
  equation,
}: {
  state: string;
  title: string;
  description: string;
  type: "off" | "active" | "saturated";
  equation?: string;
}) {
  const classes =
    type === "off"
      ? {
          border: "border-zinc-800",
          bg: "bg-zinc-950/80",
          dot: "bg-zinc-500",
          text: "text-zinc-500",
        }
      : type === "active"
      ? {
          border: "border-blue-500/20",
          bg: "bg-blue-500/[0.04]",
          dot: "bg-blue-400",
          text: "text-blue-400",
        }
      : {
          border: "border-emerald-500/20",
          bg: "bg-emerald-500/[0.04]",
          dot: "bg-emerald-400",
          text: "text-emerald-400",
        };

  return (
    <div
      className={`rounded-3xl border p-6 backdrop-blur-sm ${classes.border} ${classes.bg}`}
    >
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${classes.dot}`} />

        <span className={`font-mono text-sm ${classes.text}`}>
          {state}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-400">
        {description}
      </p>

      {equation && (
        <div className="mt-4 rounded-xl bg-zinc-950/70 p-3 font-mono text-sm text-blue-400">
          {equation}
        </div>
      )}
    </div>
  );
}