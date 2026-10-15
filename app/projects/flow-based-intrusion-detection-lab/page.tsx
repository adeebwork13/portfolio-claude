"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";

type TrafficType = "benign" | "attack";

const tools = [
  "Python",
  "PyShark",
  "TShark",
  "Wireshark",
  "NTLFlowLyzer",
  "Pandas",
  "Matplotlib",
  "Kali Linux",
  "VirtualBox",
];

const questions = [
  {
    question: "Why does PyShark need TShark?",
    answer:
      "PyShark provides the Python interface, while TShark performs the underlying packet dissection. This let me work with captured traffic from Python without manually parsing raw packet structures.",
  },
  {
    question: "Why did the first 20-second capture appear to keep running?",
    answer:
      "The timed capture completed, but iterating over the live capture object could continue capture behaviour. I changed the workflow so the script processed the packets already collected during the timed capture.",
  },
  {
    question: "Why did PyShark fail with Python 3.14?",
    answer:
      "The installed PyShark version expected an asyncio event loop to already exist. Creating an explicit event loop before initializing the capture resolved the compatibility issue.",
  },
  {
    question: "Why did renaming .pcapng to .pcap not work?",
    answer:
      "Changing a filename does not change the underlying capture format. NTLFlowLyzer expected a traditional PCAP header, so the capture had to be properly converted instead of simply renamed.",
  },
];

const debugging = [
  {
    error: "TShark not found",
    problem: "'tshark' is not recognized",
    solution:
      "Located the Wireshark installation and made TShark available to the environment.",
  },
  {
    error: "Python event loop",
    problem: "No current event loop",
    solution:
      "Created an explicit asyncio event loop before starting the PyShark capture.",
  },
  {
    error: "Kali Python protection",
    problem: "externally-managed-environment",
    solution:
      "Created a Python virtual environment instead of modifying Kali's system Python.",
  },
  {
    error: "Capture format",
    problem: "invalid tcpdump header",
    solution:
      "Converted the PCAPNG captures into true PCAP files before flow extraction.",
  },
];

const lessons = [
  "Packet capture and flow analysis provide different views of the same network activity.",
  "A single suspicious packet is usually not enough context for reliable detection.",
  "Correlating many related flows can reveal behaviour that is difficult to see from one flow alone.",
  "Detection thresholds should be tested against benign traffic to understand false positives.",
  "File formats, dependencies and runtime environments can be just as important as the detection code.",
];

const futureQuestions = [
  "Could legitimate applications produce the same short-flow pattern?",
  "How would encrypted traffic affect the available detection features?",
  "How would this detector behave on a much larger network?",
  "Could machine learning improve anomaly detection over fixed thresholds?",
  "How could this become a continuously running real-time sensor?",
];

export default function FlowBasedIntrusionDetectionLab() {
  const [trafficType, setTrafficType] =
    useState<TrafficType>("benign");

  const profile =
    trafficType === "benign"
      ? {
          label: "Benign Traffic",
          duration: "0.1327 s",
          packets: "10.8",
          syn: "0.60",
          rst: "0.60",
          byteRate: "5,589 B/s",
          status: "Normal baseline",
          description:
            "Longer and more varied flows generated during routine web, DNS and network activity.",
        }
      : {
          label: "Controlled Scan Traffic",
          duration: "0.00226 s",
          packets: "2.023",
          syn: "1.023",
          rst: "1.00",
          byteRate: "0 B/s",
          status: "Suspicious pattern",
          description:
            "Large numbers of very short TCP flows generated during the isolated lab scan.",
        };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0B1117] text-[#EDF4F6]">
      <Navbar />

      {/* HERO */}
      <section className="relative border-b border-[#263640]/70">
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full border border-[#35D3EB]/10" />
          <div className="absolute -right-6 top-28 h-56 w-56 rounded-full border border-[#35D3EB]/10" />

          <div className="absolute left-[8%] top-24 h-px w-44 bg-gradient-to-r from-[#35D3EB]/50 to-transparent" />

          <div className="absolute right-[8%] top-24 font-mono text-[8rem] font-black tracking-tighter text-white/[0.015] md:text-[13rem]">
            IDPS
          </div>
        </div>

        <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
          <a
            href="/projects"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8FA4AD] transition hover:text-[#35D3EB]"
          >
            ← Projects
          </a>

          <div className="mt-10 max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#35D3EB]">
              Cybersecurity • Network Monitoring • IDPS
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Flow-Based
              <span className="block text-[#A9D6E5]">
                Intrusion Detection Lab
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#8FA4AD] md:text-base">
              I built a network-monitoring pipeline that captures
              live traffic, converts packets into flow-level
              features, compares benign and controlled scan
              behaviour, and correlates suspicious flows into a
              possible intrusion event.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[#263640] bg-[#111A22] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#8FA4AD]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I BUILT */}
      <ProjectSection
        eyebrow="Overview"
        title="What I built"
        description="The project moves from raw packets to higher-level behavioural detection."
      >
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <p className="text-sm leading-7 text-[#8FA4AD]">
              I started by building a Python packet sensor with
              PyShark. I then extended it to count protocols,
              ports and IP activity, captured benign and controlled
              scan traffic, extracted hundreds of flow features
              with NTLFlowLyzer, compared the datasets, and finally
              created detection logic that correlates related
              suspicious flows.
            </p>
          </Panel>

          <Pipeline />
        </div>
      </ProjectSection>

      {/* SENSOR */}
      <ProjectSection
        eyebrow="Packet Capture"
        title="Starting with raw packets"
        description="Before analysing behaviour, I first needed to understand what the sensor could observe."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#35D3EB]">
              snif.py
            </p>

            <h3 className="mt-3 text-xl font-bold">
              Baseline sensor
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#8FA4AD]">
              The first version captured traffic for a fixed period
              and identified the highest detected protocol for each
              packet.
            </p>

            <div className="mt-5 rounded-xl border border-[#263640] bg-[#081016] p-4 font-mono text-xs leading-6 text-[#A9D6E5]">
              <div>Starting 20-second capture...</div>
              <div>Capture finished.</div>
              <div>Packets captured: 240</div>
              <div className="mt-2 text-[#8FA4AD]">
                TCP · TLS · DNS · ICMP · UDP
              </div>
            </div>
          </Panel>

          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#35D3EB]">
              snif_extended.py
            </p>

            <h3 className="mt-3 text-xl font-bold">
              Extended traffic report
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#8FA4AD]">
              The extended sensor summarized traffic instead of
              simply printing protocol names.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                "TCP packet count",
                "UDP packet count",
                "TCP ports",
                "UDP ports",
                "Source IP frequency",
                "Destination IP frequency",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#263640] bg-[#0B151D] px-3 py-3 text-xs text-[#A9D6E5]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </ProjectSection>

      {/* QUESTIONS */}
      <ProjectSection
        eyebrow="Learning Notes"
        title="Questions I had while building it"
        description="Most of the useful learning came from understanding why something failed."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-[#263640] bg-[#111A22]"
            >
              <summary className="cursor-pointer list-none px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold">
                    {item.question}
                  </span>

                  <span className="text-[#35D3EB] transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <p className="border-t border-[#263640] px-5 py-4 text-sm leading-7 text-[#8FA4AD]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </ProjectSection>

      {/* TRAFFIC CAPTURE */}
      <ProjectSection
        eyebrow="Dataset Creation"
        title="Benign vs controlled scan traffic"
        description="Both datasets were captured inside an isolated training environment."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TrafficCard
            title="Benign Traffic"
            label="Baseline"
            items={[
              "Normal web activity",
              "HTTPS traffic",
              "DNS queries",
              "ICMP traffic",
              "Routine network communication",
            ]}
          />

          <TrafficCard
            title="Controlled Scan Traffic"
            label="Lab Test"
            items={[
              "Kali Linux source",
              "Intentionally vulnerable training VM",
              "Isolated VirtualBox network",
              "TCP SYN scan behaviour",
              "Rapid connections across many ports",
            ]}
          />
        </div>

        <div className="mt-4 rounded-xl border border-[#35D3EB]/20 bg-[#35D3EB]/[0.04] px-4 py-3 text-xs leading-6 text-[#8FA4AD]">
          All security testing for this project was performed in an
          isolated lab environment against systems intentionally
          configured for cybersecurity training.
        </div>
      </ProjectSection>

      {/* FLOW FEATURES */}
      <ProjectSection
        eyebrow="Feature Extraction"
        title="From packets to flows"
        description="NTLFlowLyzer transformed packet captures into structured flow records."
      >
        <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr]">
          <div className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-[#263640] bg-gradient-to-br from-[#111A22] to-[#0B151D] p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#35D3EB]">
                Extracted dataset
              </p>

              <div className="mt-5 text-7xl font-black tracking-[-0.07em] text-[#A9D6E5]">
                347
              </div>

              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8FA4AD]">
                Flow features
              </div>
            </div>

            <p className="mt-8 text-xs leading-6 text-[#8FA4AD]">
              Each flow becomes a structured observation that can
              be compared, visualized and evaluated by detection
              logic.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Identity"
              items={[
                "Source IP",
                "Destination IP",
                "Source Port",
                "Destination Port",
                "Protocol",
              ]}
            />

            <FeatureGroup
              title="Traffic"
              items={[
                "Flow Duration",
                "Packet Count",
                "Payload Bytes",
                "Byte Rate",
                "Packet Rate",
              ]}
            />

            <FeatureGroup
              title="TCP Behaviour"
              items={[
                "SYN Count",
                "RST Count",
                "ACK Count",
                "FIN Count",
                "TCP percentages",
              ]}
            />

            <FeatureGroup
              title="Timing"
              items={[
                "Packet IAT",
                "Forward IAT",
                "Backward IAT",
                "Handshake Duration",
                "Delta Time",
              ]}
            />
          </div>
        </div>
      </ProjectSection>

      {/* DATA COMPARISON */}
      <ProjectSection
        eyebrow="Analysis"
        title="What changed during the scan?"
        description="The controlled scan generated a very different per-flow profile from normal activity."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ComparisonCard
            title="Flow Duration"
            benign="0.1327 s"
            attack="0.00226 s"
            note="Scan flows were concentrated at extremely short durations."
          />

          <ComparisonCard
            title="SYN Flags"
            benign="0.60"
            attack="1.023"
            note="Almost every scan flow contained a SYN packet."
          />

          <ComparisonCard
            title="Packet Count"
            benign="10.8"
            attack="2.023"
            note="The scan generally produced very small flows."
          />
        </div>

        <div className="mt-4 rounded-2xl border border-[#263640] bg-[#111A22] p-5">
          <div className="grid gap-5 md:grid-cols-3">
            <MetricBar
              label="Average flow duration"
              benign={88}
              attack={4}
            />
            <MetricBar
              label="Average SYN presence"
              benign={45}
              attack={78}
            />
            <MetricBar
              label="Average packets per flow"
              benign={82}
              attack={16}
            />
          </div>
        </div>
      </ProjectSection>

      {/* INTERACTIVE INSPECTOR */}
      <ProjectSection
        eyebrow="Interactive"
        title="Flow inspector"
        description="Switch between the measured profiles from the benign and controlled scan datasets."
      >
        <div className="overflow-hidden rounded-2xl border border-[#263640] bg-[#081016]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263640] px-5 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8FA4AD]">
              Dataset Profile
            </div>

            <div className="flex rounded-lg border border-[#263640] bg-[#0B1117] p-1">
              <button
                type="button"
                onClick={() => setTrafficType("benign")}
                className={`rounded-md px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition ${
                  trafficType === "benign"
                    ? "bg-[#A9D6E5] text-[#081016]"
                    : "text-[#8FA4AD] hover:text-white"
                }`}
              >
                Benign
              </button>

              <button
                type="button"
                onClick={() => setTrafficType("attack")}
                className={`rounded-md px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition ${
                  trafficType === "attack"
                    ? "bg-[#35D3EB] text-[#081016]"
                    : "text-[#8FA4AD] hover:text-white"
                }`}
              >
                Scan
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_0.75fr]">
            <div className="border-b border-[#263640] p-5 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#35D3EB]">
                {profile.label}
              </p>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#8FA4AD]">
                {profile.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <InspectorMetric
                  label="Duration"
                  value={profile.duration}
                />
                <InspectorMetric
                  label="Packets"
                  value={profile.packets}
                />
                <InspectorMetric
                  label="SYN"
                  value={profile.syn}
                />
                <InspectorMetric
                  label="RST"
                  value={profile.rst}
                />
                <InspectorMetric
                  label="Byte Rate"
                  value={profile.byteRate}
                />
                <InspectorMetric
                  label="Status"
                  value={profile.status}
                />
              </div>
            </div>

            <div className="p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8FA4AD]">
                Detector
              </p>

              <div className="mt-5 space-y-3">
                <DetectorCheck
                  active={trafficType === "attack"}
                  text="Very short flow duration"
                />
                <DetectorCheck
                  active={trafficType === "attack"}
                  text="SYN flag present"
                />
                <DetectorCheck
                  active={trafficType === "attack"}
                  text="Small packet count"
                />
                <DetectorCheck
                  active={trafficType === "attack"}
                  text="Repeated destination ports"
                />
              </div>

              <div
                className={`mt-6 rounded-xl border px-4 py-4 font-mono text-xs ${
                  trafficType === "attack"
                    ? "border-[#35D3EB]/40 bg-[#35D3EB]/10 text-[#A9E6EF]"
                    : "border-[#263640] bg-[#111A22] text-[#8FA4AD]"
                }`}
              >
                {trafficType === "attack"
                  ? "→ Possible Port Scan"
                  : "→ No correlated alert"}
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* CORRELATION */}
      <ProjectSection
        eyebrow="Detection Logic"
        title="One suspicious flow isn't enough"
        description="The extension correlates many related flows into one higher-level event."
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#263640] bg-[#111A22] p-5">
            <div className="space-y-2 font-mono text-xs">
              {[
                ["Flow 001", "Port 21"],
                ["Flow 002", "Port 22"],
                ["Flow 003", "Port 23"],
                ["Flow 004", "Port 25"],
                ["Flow 005", "Port 53"],
              ].map(([flow, port]) => (
                <div
                  key={flow}
                  className="flex items-center justify-between rounded-lg border border-[#263640] bg-[#0B151D] px-4 py-3"
                >
                  <span className="text-[#8FA4AD]">{flow}</span>
                  <span className="text-[#A9D6E5]">
                    LAB TARGET → {port}
                  </span>
                </div>
              ))}

              <div className="py-2 text-center text-[#35D3EB]">
                ↓ correlate
              </div>

              <div className="rounded-xl border border-[#35D3EB]/40 bg-[#35D3EB]/10 p-4 text-center text-[#A9E6EF]">
                POSSIBLE PORT SCAN EVENT
              </div>
            </div>
          </div>

          <Panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#35D3EB]">
              Observed lab rule
            </p>

            <div className="mt-5 space-y-3">
              <RuleRow label="Duration" value="≤ 0.013 s" />
              <RuleRow label="SYN Flags" value="≥ 1" />
              <RuleRow label="Packets" value="≤ 3" />
              <RuleRow label="Unique Ports" value="≥ 20" />
            </div>

            <p className="mt-5 text-xs leading-6 text-[#8FA4AD]">
              These values were derived from this controlled lab
              dataset. They are learning thresholds, not universal
              production IDS rules.
            </p>
          </Panel>
        </div>
      </ProjectSection>

      {/* DEBUGGING */}
      <ProjectSection
        eyebrow="Troubleshooting"
        title="Things that didn't work the first time"
        description="Debugging the environment became an important part of the project."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {debugging.map((item) => (
            <div
              key={item.error}
              className="rounded-2xl border border-[#263640] bg-[#111A22] p-5"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#35D3EB]">
                {item.error}
              </p>

              <div className="mt-3 rounded-lg bg-[#081016] px-3 py-2 font-mono text-xs text-[#A9D6E5]">
                {item.problem}
              </div>

              <p className="mt-4 text-sm leading-6 text-[#8FA4AD]">
                {item.solution}
              </p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* LEARNED */}
      <ProjectSection
        eyebrow="Takeaways"
        title="What I learned"
        description="The project connected packet-level networking with behavioural intrusion detection."
      >
        <div className="space-y-2">
          {lessons.map((lesson, index) => (
            <div
              key={lesson}
              className="flex gap-4 border-b border-[#263640]/70 py-4"
            >
              <span className="font-mono text-[10px] text-[#35D3EB]">
                0{index + 1}
              </span>

              <p className="text-sm leading-6 text-[#A9D6E5]">
                {lesson}
              </p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* FUTURE */}
      <ProjectSection
        eyebrow="Next Questions"
        title="What I'm exploring next"
        description="The lab answered some questions and created several new ones."
        last
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {futureQuestions.map((question) => (
            <div
              key={question}
              className="rounded-xl border border-[#263640] bg-[#111A22] px-4 py-4 text-sm leading-6 text-[#8FA4AD]"
            >
              {question}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/projects"
            className="rounded-full border border-[#263640] px-5 py-3 text-xs font-semibold text-[#A9D6E5] transition hover:border-[#35D3EB]/50 hover:text-white"
          >
            ← All Projects
          </a>

          <a
            href="/blog"
            className="rounded-full border border-[#35D3EB]/30 bg-[#35D3EB]/10 px-5 py-3 text-xs font-semibold text-[#A9E6EF] transition hover:bg-[#35D3EB]/15"
          >
            Learning Notes →
          </a>
        </div>
      </ProjectSection>
    </main>
  );
}

function ProjectSection({
  eyebrow,
  title,
  description,
  children,
  last = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={`${
        last ? "" : "border-b border-[#263640]/60"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 md:py-14 lg:px-8">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#35D3EB]">
          {eyebrow}
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA4AD]">
            {description}
          </p>
        )}

        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#263640] bg-[#111A22] p-5">
      {children}
    </div>
  );
}

function Pipeline() {
  const steps = [
    "Capture",
    "Extract",
    "Analyse",
    "Detect",
  ];

  return (
    <div className="rounded-2xl border border-[#263640] bg-[#081016] p-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step}>
            <div className="rounded-xl border border-[#263640] bg-[#111A22] px-3 py-5 text-center">
              <div className="font-mono text-[9px] text-[#35D3EB]">
                0{index + 1}
              </div>

              <div className="mt-2 text-xs font-semibold text-[#A9D6E5]">
                {step}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between px-2 font-mono text-[9px] text-[#8FA4AD]">
        <span>PACKETS</span>
        <span>→</span>
        <span>PCAP</span>
        <span>→</span>
        <span>FLOWS</span>
        <span>→</span>
        <span>ALERT</span>
      </div>
    </div>
  );
}

function TrafficCard({
  title,
  label,
  items,
}: {
  title: string;
  label: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#263640] bg-[#111A22] p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold">{title}</h3>

        <span className="rounded-full border border-[#263640] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-[#8FA4AD]">
          {label}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 text-sm text-[#8FA4AD]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#35D3EB]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureGroup({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#263640] bg-[#111A22] p-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#35D3EB]">
        {title}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-[#263640] bg-[#0B151D] px-3 py-2 text-xs text-[#A9D6E5]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ComparisonCard({
  title,
  benign,
  attack,
  note,
}: {
  title: string;
  benign: string;
  attack: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-[#263640] bg-[#111A22] p-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#35D3EB]">
        {title}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] uppercase text-[#8FA4AD]">
            Benign
          </div>
          <div className="mt-1 text-xl font-bold text-[#A9D6E5]">
            {benign}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase text-[#8FA4AD]">
            Scan
          </div>
          <div className="mt-1 text-xl font-bold text-[#35D3EB]">
            {attack}
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-6 text-[#8FA4AD]">
        {note}
      </p>
    </div>
  );
}

function MetricBar({
  label,
  benign,
  attack,
}: {
  label: string;
  benign: number;
  attack: number;
}) {
  return (
    <div>
      <div className="mb-3 text-xs text-[#A9D6E5]">
        {label}
      </div>

      <div className="space-y-2">
        <Bar label="Benign" value={benign} />
        <Bar label="Scan" value={attack} scan />
      </div>
    </div>
  );
}

function Bar({
  label,
  value,
  scan = false,
}: {
  label: string;
  value: number;
  scan?: boolean;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-[#8FA4AD]">
        <span>{label}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-[#081016]">
        <div
          className={`h-full rounded-full ${
            scan ? "bg-[#35D3EB]" : "bg-[#A9D6E5]"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function InspectorMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#263640] bg-[#111A22] p-3">
      <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#8FA4AD]">
        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-[#A9D6E5]">
        {value}
      </div>
    </div>
  );
}

function DetectorCheck({
  active,
  text,
}: {
  active: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-[#A9D6E5]">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          active
            ? "border-[#35D3EB] bg-[#35D3EB]/10 text-[#35D3EB]"
            : "border-[#263640] text-[#5F7781]"
        }`}
      >
        {active ? "✓" : "–"}
      </span>

      {text}
    </div>
  );
}

function RuleRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#263640] pb-3 text-sm">
      <span className="text-[#8FA4AD]">{label}</span>
      <span className="font-mono text-xs text-[#A9D6E5]">
        {value}
      </span>
    </div>
  );
}