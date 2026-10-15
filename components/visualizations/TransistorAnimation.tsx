"use client";

import { useState } from "react";

/* =========================================================
   TRANSISTOR PRESETS
========================================================= */

const transistorPresets = {
  "2N3904": {
    beta: 100,
    vbe: 0.7,
    vceSat: 0.2,
  },

  "2N2222A": {
    beta: 120,
    vbe: 0.7,
    vceSat: 0.2,
  },

  "BC547B": {
    beta: 200,
    vbe: 0.7,
    vceSat: 0.2,
  },

  "Generic NPN": {
    beta: 100,
    vbe: 0.7,
    vceSat: 0.2,
  },
} as const;

type TransistorType = keyof typeof transistorPresets;

type Tab = "controls" | "advanced" | "learn";

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TransistorAnimation() {
  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  const [activeTab, setActiveTab] = useState<Tab>("controls");

  /* -------------------------------------------------------
     BASIC CIRCUIT SETTINGS
  ------------------------------------------------------- */

  const [supplyVoltage, setSupplyVoltage] = useState(5);
  const [inputVoltage, setInputVoltage] = useState(0);

  const [loadResistance, setLoadResistance] = useState(220);
  const [baseResistance, setBaseResistance] = useState(4700);

  const [transistorType, setTransistorType] =
    useState<TransistorType>("2N3904");

  /* -------------------------------------------------------
     ADVANCED SETTINGS
  ------------------------------------------------------- */

  const [ledVoltage, setLedVoltage] = useState(2.0);
  const [vbe, setVbe] = useState(0.7);
  const [vceSat, setVceSat] = useState(0.2);
  const [beta, setBeta] = useState(100);

  /* -------------------------------------------------------
     SAFE VALUES
  ------------------------------------------------------- */

  const safeLoadResistance = Math.max(loadResistance, 1);
  const safeBaseResistance = Math.max(baseResistance, 1);

  /* -------------------------------------------------------
     BASE CURRENT

     IB ≈ (Vin - VBE) / RB
  ------------------------------------------------------- */

  const baseCurrent =
    inputVoltage > vbe
      ? (inputVoltage - vbe) / safeBaseResistance
      : 0;

  /* -------------------------------------------------------
     COLLECTOR CURRENT FROM TRANSISTOR GAIN

     IC ≈ β × IB
  ------------------------------------------------------- */

  const gainLimitedCollectorCurrent = beta * baseCurrent;

  /* -------------------------------------------------------
     MAXIMUM LOAD CURRENT

     IC(max) ≈
     (VS - VLED - VCEsat) / RL
  ------------------------------------------------------- */

  const availableLoadVoltage = Math.max(
    supplyVoltage - ledVoltage - vceSat,
    0
  );

  const loadLimitedCurrent =
    availableLoadVoltage / safeLoadResistance;

  const collectorCurrent = Math.min(
    gainLimitedCollectorCurrent,
    loadLimitedCurrent
  );

  /* -------------------------------------------------------
     DISPLAY VALUES
  ------------------------------------------------------- */

  const baseCurrentMa = baseCurrent * 1000;
  const collectorCurrentMa = collectorCurrent * 1000;
  const maxCollectorCurrentMa = loadLimitedCurrent * 1000;

  const resistorVoltage =
    collectorCurrent * safeLoadResistance;

  const brightness =
    loadLimitedCurrent > 0
      ? Math.min(collectorCurrent / loadLimitedCurrent, 1)
      : 0;

  /* -------------------------------------------------------
     TRANSISTOR STATE
  ------------------------------------------------------- */

  let transistorState:
    | "OFF"
    | "ACTIVE"
    | "SATURATED" = "OFF";

  if (baseCurrent > 0 && collectorCurrent > 0) {
    transistorState =
      gainLimitedCollectorCurrent >= loadLimitedCurrent
        ? "SATURATED"
        : "ACTIVE";
  }

  /* -------------------------------------------------------
     CURRENT FLOW ANIMATION
  ------------------------------------------------------- */

  const collectorFlow = collectorCurrent > 0.0001;
  const baseFlow = baseCurrent > 0.000001;

  const collectorFlowDuration = Math.max(
    0.7,
    2.4 - brightness * 1.5
  );

  const baseStrength = Math.min(baseCurrentMa / 1, 1);

  const baseFlowDuration = Math.max(
    0.85,
    2 - baseStrength
  );

  /* -------------------------------------------------------
     TRANSISTOR CHANGE
  ------------------------------------------------------- */

  function changeTransistor(type: TransistorType) {
    const preset = transistorPresets[type];

    setTransistorType(type);
    setBeta(preset.beta);
    setVbe(preset.vbe);
    setVceSat(preset.vceSat);
  }

  /* -------------------------------------------------------
     RESET
  ------------------------------------------------------- */

  function resetLab() {
    const preset = transistorPresets["2N3904"];

    setSupplyVoltage(5);
    setInputVoltage(0);

    setLoadResistance(220);
    setBaseResistance(4700);

    setTransistorType("2N3904");

    setLedVoltage(2.0);
    setVbe(preset.vbe);
    setVceSat(preset.vceSat);
    setBeta(preset.beta);

    setActiveTab("controls");
  }

  const rightPanelScroll =
    activeTab === "controls"
      ? ""
      : "xl:max-h-[calc(100vh-12rem)] xl:overflow-y-auto xl:overscroll-contain";

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-sm">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col gap-4 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">

        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            <span className="text-sm font-medium text-emerald-400">
              Interactive Electronics Lab
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-xl font-bold text-white md:text-2xl">
              NPN Transistor Switch
            </h3>

            <span className="text-xs text-zinc-600">
              Simplified educational model
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={resetLab}
          className="self-start rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-white"
        >
          Reset Lab
        </button>
      </div>

      {/* ===================================================
          MAIN WORKSPACE
      =================================================== */}

      <div className="grid items-start xl:grid-cols-[1.06fr_0.94fr]">

        {/* =================================================
            LEFT — CIRCUIT
        ================================================= */}

        <div className="border-b border-zinc-800 p-3 sm:p-4 xl:sticky xl:top-3 xl:self-start xl:border-b-0 xl:border-r">

          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black/70">

            {/* CIRCUIT HEADER */}

            <div className="border-b border-zinc-800 px-4 py-3">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div>
                  <p className="text-sm font-medium text-white">
                    Live Circuit
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Conventional current flow
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-400">
                    Collector path
                  </span>

                  <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] text-blue-400">
                    Base path
                  </span>
                </div>

              </div>

              {/* LIVE VALUES */}

              <div className="mt-3 grid grid-cols-3 gap-2">

                <div className="rounded-lg bg-zinc-900/70 px-3 py-2">
                  <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                    IB
                  </p>

                  <p className="mt-1 font-mono text-xs text-blue-400 sm:text-sm">
                    {baseCurrentMa.toFixed(2)} mA
                  </p>
                </div>

                <div className="rounded-lg bg-zinc-900/70 px-3 py-2">
                  <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                    IC
                  </p>

                  <p className="mt-1 font-mono text-xs text-emerald-400 sm:text-sm">
                    {collectorCurrentMa.toFixed(2)} mA
                  </p>
                </div>

                <div className="rounded-lg bg-zinc-900/70 px-3 py-2">
                  <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                    State
                  </p>

                  <p
                    className={`mt-1 font-mono text-xs sm:text-sm ${
                      transistorState === "OFF"
                        ? "text-zinc-500"
                        : transistorState === "ACTIVE"
                        ? "text-blue-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {transistorState}
                  </p>
                </div>

              </div>

            </div>

            {/* =================================================
                RESPONSIVE CIRCUIT SVG
            ================================================= */}

            <div className="bg-gradient-to-b from-zinc-950 to-black px-2 py-1 sm:px-4">

              <svg
                viewBox="0 0 560 500"
                preserveAspectRatio="xMidYMid meet"
                className="
                  mx-auto block w-full
                  h-[clamp(300px,46vh,470px)]
                  2xl:h-[clamp(380px,52vh,520px)]
                "
                role="img"
                aria-label="Interactive NPN transistor LED circuit"
              >

                {/* MAIN COLLECTOR PATH */}

                <path
                  d="
                    M350 42
                    L350 88
                    L350 150
                    L350 185
                    L350 245
                    L350 285
                    L350 405
                    L350 448
                  "
                  fill="none"
                  stroke={
                    collectorFlow
                      ? "#34d399"
                      : "#3f3f46"
                  }
                  strokeOpacity={
                    collectorFlow ? 0.45 : 0.7
                  }
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* COLLECTOR PARTICLES */}

                {collectorFlow &&
                  [0, 1, 2, 3, 4].map((particle) => (
                    <circle
                      key={particle}
                      r="6"
                      fill="#6ee7b7"
                      style={{
                        filter:
                          "drop-shadow(0 0 7px rgba(110,231,183,1))",
                      }}
                    >
                      <animateMotion
                        dur={`${collectorFlowDuration}s`}
                        repeatCount="indefinite"
                        begin={`${particle * 0.25}s`}
                        path="M350 42 L350 448"
                      />
                    </circle>
                  ))}

                {/* SUPPLY */}

                <text
                  x="350"
                  y="18"
                  textAnchor="middle"
                  fill="#71717a"
                  fontSize="13"
                >
                  Supply
                </text>

                <text
                  x="350"
                  y="40"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="20"
                  fontFamily="monospace"
                >
                  +{supplyVoltage.toFixed(1)} V
                </text>

                {/* LOAD RESISTOR */}

                <rect
                  x="296"
                  y="88"
                  width="108"
                  height="62"
                  rx="10"
                  fill="#18181b"
                  stroke="#f59e0b"
                  strokeOpacity="0.75"
                  strokeWidth="2"
                />

                <text
                  x="350"
                  y="114"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="16"
                >
                  RL
                </text>

                <text
                  x="350"
                  y="135"
                  textAnchor="middle"
                  fill="#a1a1aa"
                  fontSize="12"
                >
                  {loadResistance} Ω
                </text>

                <text
                  x="418"
                  y="120"
                  fill="#71717a"
                  fontSize="10"
                >
                  {resistorVoltage.toFixed(2)} V
                </text>

                {/* LED */}

                <circle
                  cx="350"
                  cy="217"
                  r="32"
                  fill={`rgba(
                    52,
                    211,
                    153,
                    ${0.06 + brightness * 0.86}
                  )`}
                  stroke="#52525b"
                  strokeWidth="4"
                  style={{
                    filter:
                      brightness > 0.03
                        ? `drop-shadow(
                            0 0 ${
                              6 + brightness * 19
                            }px rgba(52,211,153,0.95)
                          )`
                        : "none",
                  }}
                />

                <text
                  x="350"
                  y="222"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                >
                  LED
                </text>

                <text
                  x="404"
                  y="218"
                  fill="#71717a"
                  fontSize="10"
                >
                  {ledVoltage.toFixed(2)} V
                </text>

                {/* TRANSISTOR */}

                <circle
                  cx="350"
                  cy="345"
                  r="62"
                  fill="#18181b"
                  stroke={
                    transistorState === "SATURATED"
                      ? "#34d399"
                      : transistorState === "ACTIVE"
                      ? "#60a5fa"
                      : "#52525b"
                  }
                  strokeWidth="3"
                />

                {/* BASE BAR */}

                <line
                  x1="309"
                  y1="307"
                  x2="309"
                  y2="384"
                  stroke="#e4e4e7"
                  strokeWidth="4"
                />

                {/* COLLECTOR LEG */}

                <line
                  x1="309"
                  y1="324"
                  x2="350"
                  y2="283"
                  stroke="#e4e4e7"
                  strokeWidth="4"
                />

                {/* EMITTER LEG */}

                <line
                  x1="309"
                  y1="368"
                  x2="350"
                  y2="407"
                  stroke="#e4e4e7"
                  strokeWidth="4"
                />

                {/* NPN ARROW */}

                <polygon
                  points="327,381 349,406 319,397"
                  fill="#e4e4e7"
                />

                {/* TERMINAL LABELS */}

                <text
                  x="363"
                  y="309"
                  fill="#71717a"
                  fontSize="10"
                >
                  Collector
                </text>

                <text
                  x="363"
                  y="396"
                  fill="#71717a"
                  fontSize="10"
                >
                  Emitter
                </text>

                <text
                  x="278"
                  y="349"
                  fill="#71717a"
                  fontSize="10"
                >
                  Base
                </text>

                {/* TRANSISTOR NAME */}

                <text
                  x="370"
                  y="350"
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="600"
                >
                  {transistorType}
                </text>

                {/* BASE PATH */}

                <path
                  d="
                    M48 345
                    L120 345
                    L225 345
                    L309 345
                  "
                  fill="none"
                  stroke={
                    baseFlow
                      ? "#3b82f6"
                      : "#334155"
                  }
                  strokeOpacity={
                    baseFlow ? 0.8 : 0.55
                  }
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* BASE RESISTOR */}

                <rect
                  x="120"
                  y="318"
                  width="105"
                  height="54"
                  rx="9"
                  fill="#18181b"
                  stroke="#60a5fa"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                />

                <text
                  x="172"
                  y="340"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="14"
                >
                  RB
                </text>

                <text
                  x="172"
                  y="360"
                  textAnchor="middle"
                  fill="#a1a1aa"
                  fontSize="11"
                >
                  {baseResistance} Ω
                </text>

                {/* BASE PARTICLES */}

                {baseFlow &&
                  [0, 1, 2].map((particle) => (
                    <circle
                      key={particle}
                      r="5"
                      fill="#93c5fd"
                      style={{
                        filter:
                          "drop-shadow(0 0 6px rgba(147,197,253,1))",
                      }}
                    >
                      <animateMotion
                        dur={`${baseFlowDuration}s`}
                        repeatCount="indefinite"
                        begin={`${particle * 0.4}s`}
                        path="M48 345 L309 345"
                      />
                    </circle>
                  ))}

                {/* INPUT */}

                <text
                  x="48"
                  y="323"
                  textAnchor="middle"
                  fill="#71717a"
                  fontSize="12"
                >
                  Vin
                </text>

                <text
                  x="48"
                  y="373"
                  textAnchor="middle"
                  fill="#60a5fa"
                  fontSize="12"
                  fontFamily="monospace"
                >
                  {inputVoltage.toFixed(1)} V
                </text>

                {/* GROUND */}

                <line
                  x1="326"
                  y1="448"
                  x2="374"
                  y2="448"
                  stroke="#a1a1aa"
                  strokeWidth="3"
                />

                <line
                  x1="334"
                  y1="457"
                  x2="366"
                  y2="457"
                  stroke="#a1a1aa"
                  strokeWidth="3"
                />

                <line
                  x1="342"
                  y1="466"
                  x2="358"
                  y2="466"
                  stroke="#a1a1aa"
                  strokeWidth="3"
                />

                <text
                  x="350"
                  y="492"
                  textAnchor="middle"
                  fill="#71717a"
                  fontSize="12"
                >
                  Ground
                </text>

              </svg>

            </div>

          </div>
        </div>

        {/* =================================================
            RIGHT — INTERACTIVE CONTROL PANEL
        ================================================= */}

        <div
          className={`min-w-0 p-3 sm:p-4 xl:p-5 ${rightPanelScroll}`}
        >

          {/* STATUS + TABS */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950">

            <div className="flex items-center justify-between gap-6 px-4 py-3">

              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-600">
                  Circuit state
                </p>

                <p
                  className={`mt-1 text-xl font-semibold ${
                    transistorState === "OFF"
                      ? "text-zinc-400"
                      : transistorState === "ACTIVE"
                      ? "text-blue-400"
                      : "text-emerald-400"
                  }`}
                >
                  {transistorState}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-zinc-600">
                  LED output
                </p>

                <p className="mt-1 font-mono text-lg text-emerald-400">
                  {(brightness * 100).toFixed(0)}%
                </p>
              </div>

            </div>

            <div className="mx-4 mb-3 h-1.5 overflow-hidden rounded-full bg-zinc-900">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                style={{
                  width: `${brightness * 100}%`,
                }}
              />
            </div>

          </div>

          {/* TABS */}

          <div className="mt-3 grid grid-cols-3 rounded-xl border border-zinc-800 bg-zinc-950 p-1">

            {[
              ["controls", "Controls"],
              ["advanced", "Advanced"],
              ["learn", "Learn"],
            ].map(([tab, label]) => (

              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab as Tab)}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  activeTab === tab
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {label}
              </button>

            ))}

          </div>

          {/* =================================================
              CONTROLS
          ================================================= */}

          {activeTab === "controls" && (

            <div className="mt-3">

              <div className="mb-3">
                <h4 className="font-semibold text-white">
                  Circuit Controls
                </h4>

                <p className="mt-1 text-xs text-zinc-500">
                  Adjust the main values and watch the circuit respond.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {/* SUPPLY */}

                <ControlCard
                  label="Supply"
                  value={`${supplyVoltage.toFixed(1)} V`}
                  valueClass="text-emerald-400"
                >
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="0.1"
                    value={supplyVoltage}
                    onChange={(e) =>
                      setSupplyVoltage(Number(e.target.value))
                    }
                    className="mt-3 w-full accent-emerald-400"
                  />

                  <RangeLabels left="3 V" right="12 V" />
                </ControlCard>

                {/* BASE DRIVE */}

                <ControlCard
                  label="Base Drive"
                  value={`${inputVoltage.toFixed(1)} V`}
                  valueClass="text-blue-400"
                >
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={inputVoltage}
                    onChange={(e) =>
                      setInputVoltage(Number(e.target.value))
                    }
                    className="mt-3 w-full accent-blue-400"
                  />

                  <RangeLabels left="0 V" right="5 V" />
                </ControlCard>

                {/* LOAD */}

                <ControlCard
                  label="Load RL"
                  value={`${loadResistance} Ω`}
                  valueClass="text-amber-300"
                >
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="10"
                    value={loadResistance}
                    onChange={(e) =>
                      setLoadResistance(Number(e.target.value))
                    }
                    className="mt-3 w-full accent-amber-400"
                  />

                  <RangeLabels left="100 Ω" right="1 kΩ" />
                </ControlCard>

                {/* TRANSISTOR */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

                  <label className="text-sm text-zinc-300">
                    Transistor
                  </label>

                  <select
                    value={transistorType}
                    onChange={(e) =>
                      changeTransistor(
                        e.target.value as TransistorType
                      )
                    }
                    className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-base text-white outline-none focus:border-emerald-500"
                  >

                    {Object.keys(transistorPresets).map((type) => (
                      <option key={type}>
                        {type}
                      </option>
                    ))}

                  </select>

                  <p className="mt-2 text-[10px] text-zinc-600">
                    β ≈ {beta} · VBE ≈ {vbe.toFixed(2)} V
                  </p>

                </div>

              </div>

              {/* QUICK READINGS */}

              <div className="mt-3 grid grid-cols-3 rounded-2xl border border-zinc-800 bg-zinc-950">

                <MiniReading
                  label="IB"
                  value={`${baseCurrentMa.toFixed(2)} mA`}
                  className="text-blue-400"
                />

                <MiniReading
                  label="IC"
                  value={`${collectorCurrentMa.toFixed(2)} mA`}
                  className="border-x border-zinc-800 text-emerald-400"
                />

                <MiniReading
                  label="IC max"
                  value={`${maxCollectorCurrentMa.toFixed(2)} mA`}
                  className="text-white"
                />

              </div>

            </div>

          )}

          {/* =================================================
              ADVANCED
          ================================================= */}

          {activeTab === "advanced" && (

            <div className="mt-3">

              <h4 className="font-semibold text-white">
                Advanced Parameters
              </h4>

              <p className="mt-1 text-xs text-zinc-500">
                Fine-tune the educational transistor model.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <AdvancedSlider
                  label="Base resistor RB"
                  value={`${baseResistance} Ω`}
                  min={470}
                  max={20000}
                  step={100}
                  sliderValue={baseResistance}
                  onChange={setBaseResistance}
                />

                <AdvancedSlider
                  label="LED forward voltage"
                  value={`${ledVoltage.toFixed(2)} V`}
                  min={1.5}
                  max={3.6}
                  step={0.05}
                  sliderValue={ledVoltage}
                  onChange={setLedVoltage}
                />

                <AdvancedSlider
                  label="VBE"
                  value={`${vbe.toFixed(2)} V`}
                  min={0.55}
                  max={0.9}
                  step={0.01}
                  sliderValue={vbe}
                  onChange={setVbe}
                />

                <AdvancedSlider
                  label="VCE(sat)"
                  value={`${vceSat.toFixed(2)} V`}
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  sliderValue={vceSat}
                  onChange={setVceSat}
                />

                <div className="sm:col-span-2">
                  <AdvancedSlider
                    label="Current gain β / hFE"
                    value={`${beta}`}
                    min={20}
                    max={300}
                    step={5}
                    sliderValue={beta}
                    onChange={setBeta}
                  />
                </div>

              </div>

            </div>

          )}

          {/* =================================================
              LEARN
          ================================================= */}

          {activeTab === "learn" && (

            <div className="mt-3 space-y-3">

              <LearnCard title="What is RB?">
                <p>
                  RB is the base resistor. It limits current flowing
                  into the transistor&apos;s base-emitter junction.
                </p>

                <Equation>
                  IB ≈ (Vin − VBE) / RB
                </Equation>
              </LearnCard>

              <LearnCard title="Where does the supply voltage go?">
                <p>
                  Near saturation, the supply voltage is shared by the
                  LED, transistor, and load resistor.
                </p>

                <div className="mt-4 space-y-2">

                  <ValueRow
                    label="Supply"
                    value={`${supplyVoltage.toFixed(2)} V`}
                  />

                  <ValueRow
                    label="LED"
                    value={`− ${ledVoltage.toFixed(2)} V`}
                  />

                  <ValueRow
                    label="VCE(sat)"
                    value={`− ${vceSat.toFixed(2)} V`}
                  />

                  <ValueRow
                    label="Available for RL"
                    value={`${availableLoadVoltage.toFixed(2)} V`}
                    highlight
                  />

                </div>

                <Equation>
                  IC(max) ≈ (VS − VLED − VCE(sat)) / RL
                </Equation>
              </LearnCard>

              <LearnCard title="Operating state">

                <div className="mt-2 flex items-center gap-2">

                  <StateDot
                    active={transistorState === "OFF"}
                    type="off"
                  />

                  <div className="h-px flex-1 bg-zinc-800" />

                  <StateDot
                    active={transistorState === "ACTIVE"}
                    type="active"
                  />

                  <div className="h-px flex-1 bg-zinc-800" />

                  <StateDot
                    active={transistorState === "SATURATED"}
                    type="saturated"
                  />

                </div>

                <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
                  <span>OFF</span>
                  <span>ACTIVE</span>
                  <span>SATURATED</span>
                </div>

                <p className="mt-4">

                  {transistorState === "OFF" &&
                    "There is not enough base drive for significant collector current."}

                  {transistorState === "ACTIVE" &&
                    "Collector current is being controlled by base current and transistor gain."}

                  {transistorState === "SATURATED" &&
                    "The transistor is fully switched on and the external load limits collector current."}

                </p>

              </LearnCard>

            </div>

          )}

        </div>

      </div>

      {/* ===================================================
          DISCLAIMER
      =================================================== */}

      <div className="border-t border-zinc-800 px-5 py-3">

        <p className="text-[10px] leading-5 text-zinc-600">
          Educational approximation. Real transistor β, VBE,
          VCE(sat), LED forward voltage, and other electrical
          characteristics vary with operating conditions and
          component selection.
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function ControlCard({
  label,
  value,
  valueClass,
  children,
}: {
  label: string;
  value: string;
  valueClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

      <div className="flex justify-between gap-3">

        <label className="text-sm text-zinc-300">
          {label}
        </label>

        <span
          className={`font-mono text-sm ${valueClass ?? "text-white"}`}
        >
          {value}
        </span>

      </div>

      {children}

    </div>
  );
}

function RangeLabels({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="mt-1 flex justify-between text-[9px] text-zinc-700">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function MiniReading({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`p-3 text-center ${className}`}>

      <p className="text-[9px] uppercase tracking-wider text-zinc-600">
        {label}
      </p>

      <p className="mt-1 font-mono text-xs sm:text-sm">
        {value}
      </p>

    </div>
  );
}

function AdvancedSlider({
  label,
  value,
  min,
  max,
  step,
  sliderValue,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  sliderValue: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

      <div className="flex justify-between gap-3">

        <label className="text-sm text-zinc-300">
          {label}
        </label>

        <span className="font-mono text-xs text-white">
          {value}
        </span>

      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="mt-4 w-full"
      />

    </div>
  );
}

function LearnCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

      <h4 className="font-semibold text-white">
        {title}
      </h4>

      <div className="mt-2 text-sm leading-6 text-zinc-400">
        {children}
      </div>

    </div>
  );
}

function Equation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl bg-emerald-500/5 p-3 font-mono text-sm text-emerald-400">
      {children}
    </div>
  );
}

function ValueRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">

      <span className="text-zinc-500">
        {label}
      </span>

      <span
        className={`font-mono ${
          highlight
            ? "text-amber-300"
            : "text-white"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

function StateDot({
  active,
  type,
}: {
  active: boolean;
  type: "off" | "active" | "saturated";
}) {
  const activeClass =
    type === "off"
      ? "bg-zinc-200"
      : type === "active"
      ? "bg-blue-400"
      : "bg-emerald-400";

  return (
    <div
      className={`h-3 w-3 rounded-full ${
        active ? activeClass : "bg-zinc-800"
      }`}
    />
  );
}