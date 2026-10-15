"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import SecurityTheme, {
  SecuritySectionBackdrop,
} from "@/components/themes/SecurityTheme";

/* =========================================================
   TYPES
========================================================= */

type LearningCard = {
  title: string;
  text: string;
};

type AttackTone = "passive" | "active";

/* =========================================================
   CONTENT
========================================================= */

const networkingCards: LearningCard[] = [
  {
    title: "What is networking?",
    text: "Networking is the practice of connecting computers and devices so they can share resources, exchange data, and communicate locally or across the internet.",
  },
  {
    title: "Data vs Information",
    text: "Data is made up of raw facts. Information is created when that data is organized and given context or meaning.",
  },
  {
    title: "Why do networks matter?",
    text: "Networks allow devices to communicate, share services and resources, and exchange information across homes, businesses, data centers, and the internet.",
  },
];

const modelCards: LearningCard[] = [
  {
    title: "Are OSI and TCP/IP the same?",
    text: "No. OSI is a seven-layer conceptual model used to understand communication in detail, while TCP/IP is a four-layer model that reflects practical internet communication.",
  },
  {
    title: "Why do both models matter?",
    text: "OSI helps separate networking responsibilities into understandable layers. TCP/IP shows how those responsibilities are grouped in real-world internet communication.",
  },
  {
    title: "How do they map together?",
    text: "TCP/IP Link combines OSI Physical and Data Link. Internet aligns with Network. Transport aligns with Transport. Application combines Session, Presentation, and Application.",
  },
];

const addressCards: LearningCard[] = [
  {
    title: "Is a MAC address only for Apple devices?",
    text: "No. MAC means Media Access Control. It identifies a network interface and has nothing to do with Apple's Mac computers.",
  },
  {
    title: "MAC address vs IP address",
    text: "A MAC address helps identify an interface on a local network. An IP address provides logical addressing so traffic can move between networks.",
  },
  {
    title: "What does a MAC address look like?",
    text: "A MAC address is commonly represented as six hexadecimal pairs, such as 00:1A:2B:3C:4D:5E.",
  },
];

const securityTerms = [
  {
    term: "Asset",
    text: "Something valuable that needs protection, such as data, hardware, software, services, or people.",
  },
  {
    term: "Threat",
    text: "An event, action, or condition that could cause harm to a system, network, or information.",
  },
  {
    term: "Threat Actor",
    text: "An individual or group that intentionally causes harm to digital systems or networks.",
  },
  {
    term: "Vulnerability",
    text: "A weakness in software, hardware, configuration, networking, processes, or human behavior.",
  },
  {
    term: "Risk",
    text: "The potential for loss or damage when a threat can exploit a vulnerability affecting something valuable.",
  },
  {
    term: "Attack",
    text: "An attempt to gain unauthorized access or compromise confidentiality, integrity, or availability.",
  },
];

const passiveActive: {
  title: string;
  short: string;
  points: string[];
  tone: AttackTone;
}[] = [
  {
    title: "Passive Attack",
    short: "Observe without changing",
    points: [
      "Monitors or listens to communication",
      "Does not alter transmitted data",
      "Attempts to gather information quietly",
      "Includes message interception and traffic analysis",
    ],
    tone: "passive",
  },
  {
    title: "Active Attack",
    short: "Interfere with communication",
    points: [
      "Changes or generates data",
      "May impersonate another entity",
      "Can interrupt or disrupt services",
      "Includes replay, masquerade, modification, and DoS",
    ],
    tone: "active",
  },
];

const principles = [
  {
    title: "Authentication",
    text: "Verifies that a user or system is really who it claims to be.",
  },
  {
    title: "Authorization",
    text: "Determines what an authenticated user is allowed to access or do.",
  },
  {
    title: "Accountability",
    text: "Makes actions traceable to a particular user, system, or process.",
  },
  {
    title: "Authenticity",
    text: "Confirms that information, communication, or a source is genuine.",
  },
  {
    title: "Non-repudiation",
    text: "Provides evidence so an involved party cannot reasonably deny an action or communication.",
  },
];

const importanceItems = [
  "Protecting systems and information from cyber threats",
  "Maintaining business continuity and reducing downtime",
  "Supporting compliance requirements",
  "Protecting privacy and sensitive information",
  "Maintaining trust, integrity, and operational reliability",
];

const learnerQuestions = [
  {
    q: "Are OSI and TCP/IP two different things?",
    a: "Yes. OSI is a seven-layer conceptual model, while TCP/IP is a four-layer practical networking model.",
  },
  {
    q: "Is a MAC address only on Apple computers?",
    a: "No. MAC stands for Media Access Control and applies to network interfaces generally.",
  },
  {
    q: "What is the difference between a MAC address and an IP address?",
    a: "MAC addresses mainly identify interfaces locally. IP addresses provide logical addressing used to route traffic across networks.",
  },
];

const commandTips = [
  {
    command: "ipconfig",
    description: "Quickly view your computer's current IP configuration.",
  },
  {
    command: "ipconfig /all",
    description:
      "View detailed adapter, DNS, DHCP, IPv4, IPv6, and MAC information.",
  },
  {
    command: "getmac",
    description:
      "Display the MAC addresses associated with network interfaces.",
  },
  {
    command: "arp -a",
    description:
      "View IP-to-MAC mappings currently stored in the ARP cache.",
  },
  {
    command: "ping example.com",
    description:
      "Check whether a destination is reachable and view response time.",
  },
  {
    command: "tracert example.com",
    description:
      "View the path traffic takes toward a destination.",
  },
  {
    command: "nslookup example.com",
    description:
      "Look up DNS information associated with a domain.",
  },
  {
    command: "Get-NetAdapter | Select-Object Name, MacAddress",
    description:
      "PowerShell command for viewing adapters and their MAC addresses.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function InformationAndNetworkSecurityPage() {
  return (
    <SecurityTheme>
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-2%] top-6 hidden select-none text-[clamp(7rem,17vw,16rem)] font-black leading-none tracking-[-0.08em] text-[#EAF6F8]/[0.018] lg:block"
          >
            SECURITY
          </div>

          <div className="mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#8EABB5] transition hover:text-[#A9E6EF]"
            >
              <span className="transition duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to Blog
            </Link>

            <div className="mt-9 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#A9E6EF]">
                  Information & Network Security • Learning Notes
                </p>

                <h1 className="mt-4 text-[clamp(2.7rem,6.5vw,6rem)] font-black leading-[0.89] tracking-[-0.055em]">
                  INTRODUCTION TO

                  <span className="block bg-gradient-to-r from-[#168AAD] via-[#34D5EB] to-[#A9E6EF] bg-clip-text text-transparent">
                    INFORMATION &
                  </span>

                  <span className="block">NETWORK SECURITY</span>
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-[#8EABB5] md:text-base">
                  My learning notes covering networking, communication models,
                  addressing, threats, vulnerabilities, attacks, risk, and the
                  principles behind secure information systems.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Networking",
                    "OSI & TCP/IP",
                    "MAC & IP",
                    "Threats & Risk",
                    "CIA Triad",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#173A49]/40 bg-[#0A1C28]/70 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-[#EAF6F8]/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <HeroOverviewCard />
            </div>
          </div>
        </section>

        {/* =================================================
            INTRO
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25">
          <SecuritySectionBackdrop variant="networking" />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-10 sm:px-6 lg:px-8">
            <SectionHeading
              title="Before we start"
              description="A quick overview of the ideas I focused on while learning this topic."
            />

            <p className="mt-5 max-w-4xl text-sm leading-7 text-[#8EABB5]">
              This article focuses on how devices communicate, how networking
              responsibilities are organized, how devices are addressed, and
              how security concepts such as threats, vulnerabilities, risk,
              attacks, confidentiality, integrity, and availability fit
              together.
            </p>
          </div>
        </section>

        {/* =================================================
            NETWORKING
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25">
          <SecuritySectionBackdrop variant="networking" />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="Networking Basics"
              description="How devices connect, communicate, exchange data, and turn raw facts into useful information."
            />

            <div className="mt-8 grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr]">
              <CardFan cards={networkingCards} />

              <ConceptPanel title="Data → Information">
                <DataToInformationVisual />
              </ConceptPanel>
            </div>
          </div>
        </section>

        {/* =================================================
            OSI / TCP-IP
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25 bg-[#0A1C28]/15">
          <SecuritySectionBackdrop variant="networking" />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="OSI & TCP/IP Models"
              description="Two perspectives on the same network journey — how data moves from an application, through a network, and reaches another device."
            />

            <div className="mt-8 grid items-center gap-9 xl:grid-cols-[1.18fr_0.82fr]">
              <ConceptPanel title="Communication Layers">
                <OsiTcpVisual />
              </ConceptPanel>

              <CardFan cards={modelCards} />
            </div>
          </div>
        </section>

        {/* =================================================
            ADDRESSING
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25">
          <SecuritySectionBackdrop variant="addressing" />

          {/* More visible local background elements */}
          <MacAddressBackgroundProp />
          <AddressStreamBackgroundProp />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="Addressing Basics"
              description="MAC addresses identify interfaces locally, while IP addresses provide logical addressing used across networks."
            />

            <div className="mt-8 grid items-center gap-9 lg:grid-cols-[0.88fr_1.12fr]">
              <CardFan cards={addressCards} />

              <div className="grid gap-5">
                <ConceptPanel title="MAC vs IP">
                  <MacIpComparisonVisual />
                </ConceptPanel>

                <TipsPanel />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            SECURITY TERMS
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25 bg-[#0A1C28]/15">
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="Core Security Terms"
              description="The vocabulary that connects assets, threats, vulnerabilities, attacks, and risk."
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {securityTerms.map((item) => (
                <DefinitionCard
                  key={item.term}
                  term={item.term}
                  text={item.text}
                />
              ))}
            </div>

            <div className="mt-5">
              <ConceptPanel title="How Risk is Formed">
                <RiskFormulaVisual />
              </ConceptPanel>
            </div>
          </div>
        </section>

        {/* =================================================
            ATTACKS
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25">
          <SecuritySectionBackdrop variant="attacks" />

          {/* More visible attack-themed background elements */}
          <PhishingBackgroundProp />
          <TrafficMonitoringBackgroundProp />
          <PacketFloodBackgroundProp />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="Passive vs Active Attacks"
              description="The difference is whether communication is only observed or whether an attacker actively changes, injects, impersonates, or disrupts it."
            />

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {passiveActive.map((item) => (
                <AttackComparisonCard
                  key={item.title}
                  title={item.title}
                  short={item.short}
                  points={item.points}
                  tone={item.tone}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            PRINCIPLES
        ================================================= */}

        <section className="relative z-10 overflow-hidden border-b border-[#173A49]/25 bg-[#0A1C28]/15">
          <SecuritySectionBackdrop variant="secure" />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="Key Security Principles"
              description="Security is also about identity, access, responsibility, trust, and keeping information dependable."
            />

            <div className="mt-7 grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <ConceptPanel title="CIA Triad">
                <CiaTriadVisual />
              </ConceptPanel>

              <div className="grid gap-3 sm:grid-cols-2">
                {principles.map((item) => (
                  <MiniConceptCard
                    key={item.title}
                    title={item.title}
                    text={item.text}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            WHY SECURITY MATTERS
        ================================================= */}

        <section className="relative z-10 border-b border-[#173A49]/25">
          <div className="mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="Why Network Security Matters"
              description="Security supports privacy, reliability, continuity, compliance, and trust in the systems people depend on."
            />

            <div className="mt-7 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <InfoBlock
                title="Protecting more than just devices"
                text="Network security helps protect systems and information from cyber threats while supporting reliable operations, reducing downtime, and protecting sensitive information."
              />

              <div className="rounded-[22px] border border-[#173A49]/35 bg-[#0A1C28]/75 p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {importanceItems.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-[14px] border border-[#173A49]/25 bg-[#071923]/55 p-3"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4ADE80] shadow-[0_0_10px_rgba(74,222,128,0.45)]" />

                      <p className="text-sm leading-6 text-[#8EABB5]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            QUESTIONS
        ================================================= */}

        <section className="relative z-10 border-b border-[#173A49]/25 bg-[#0A1C28]/15">
          <div className="mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="Questions I Had While Learning"
              description="Simple questions that helped me understand some of the fundamentals more clearly."
            />

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {learnerQuestions.map((item) => (
                <QuestionCard
                  key={item.q}
                  q={item.q}
                  a={item.a}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            CONCLUSION
        ================================================= */}

        <section className="relative z-10">
          <div className="mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8">
            <SectionHeading
              title="My Takeaway"
              description="The ideas that connected everything together for me."
            />

            <div className="mt-7 rounded-[26px] border border-[#168AAD]/35 bg-gradient-to-br from-[#168AAD]/15 via-[#0A1C28]/90 to-[#06131C] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.2)] md:p-8">
              <p className="max-w-4xl text-sm leading-7 text-[#8EABB5] md:text-base">
                This topic helped me understand how networking and security fit
                together. The most important connection was seeing how devices
                communicate, how weaknesses create opportunities for threats,
                and why confidentiality, integrity, availability,
                authentication, and authorization are necessary for building
                trusted systems.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-[#34D5EB]/35 bg-[#0A1C28]/80 px-5 py-2.5 text-sm font-semibold text-[#EAF6F8] transition duration-300 hover:-translate-y-1 hover:border-[#A9E6EF]/55 hover:text-[#A9E6EF]"
                >
                  View Articles →
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-[#173A49]/40 bg-[#06131C]/70 px-5 py-2.5 text-sm font-semibold text-[#8EABB5] transition duration-300 hover:border-[#34D5EB]/40 hover:text-[#EAF6F8]"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SecurityTheme>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#34D5EB]/60" />

        <span className="h-1.5 w-1.5 rounded-full bg-[#34D5EB] shadow-[0_0_10px_rgba(52,213,235,0.7)]" />
      </div>

      <h2 className="mt-3 text-3xl font-black leading-[0.95] tracking-[-0.04em] text-[#EAF6F8] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#8EABB5]">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   FAN CARD DECK
========================================================= */

function CardFan({ cards }: { cards: LearningCard[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function nextCard() {
    setActiveIndex((current) => (current + 1) % cards.length);
  }

  function previousCard() {
    setActiveIndex(
      (current) => (current - 1 + cards.length) % cards.length,
    );
  }

  return (
    <div className="w-full">
      <div className="relative mx-auto h-[300px] w-full max-w-[620px] sm:h-[320px]">
        {cards.map((card, index) => {
          const relativeIndex =
            (index - activeIndex + cards.length) % cards.length;

          const isFront = relativeIndex === 0;
          const isRight = relativeIndex === 1;
          const isLeft = relativeIndex === 2;

          if (!isFront && !isRight && !isLeft) {
            return null;
          }

          let positionClasses = "";

          if (isFront) {
            positionClasses =
              "left-1/2 top-8 z-30 -translate-x-1/2 rotate-0 scale-100";
          }

          if (isRight) {
            positionClasses =
              "left-1/2 top-1 z-20 -translate-x-[28%] rotate-[7deg] scale-[0.90] sm:-translate-x-[23%]";
          }

          if (isLeft) {
            positionClasses =
              "left-1/2 top-3 z-10 -translate-x-[72%] -rotate-[7deg] scale-[0.90] sm:-translate-x-[77%]";
          }

          return (
            <button
              key={card.title}
              type="button"
              onClick={() => {
                if (isFront) {
                  nextCard();
                } else {
                  setActiveIndex(index);
                }
              }}
              className={`absolute w-[82%] max-w-[470px] rounded-[26px] border text-left shadow-[0_30px_70px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out sm:w-[76%] ${positionClasses} ${
                isFront
                  ? "border-[#34D5EB]/50 bg-gradient-to-br from-[#0D2938] via-[#0A1C28] to-[#071923]"
                  : "border-[#173A49]/55 bg-gradient-to-br from-[#102B38] via-[#0A1C28] to-[#071923] opacity-75 hover:opacity-100"
              }`}
            >
              <div
                className={`h-1 rounded-t-[26px] ${
                  isFront
                    ? "bg-gradient-to-r from-[#168AAD] via-[#34D5EB] to-[#A9E6EF]"
                    : "bg-[#173A49]"
                }`}
              />

              <div className="relative min-h-[205px] overflow-hidden p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#34D5EB]/[0.07] blur-3xl"
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#A9E6EF]/80">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(cards.length).padStart(2, "0")}
                    </span>

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isFront
                          ? "bg-[#34D5EB] shadow-[0_0_13px_rgba(52,213,235,0.75)]"
                          : "bg-[#173A49]"
                      }`}
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-[#EAF6F8] sm:text-2xl">
                    {card.title}
                  </h3>

                  <p
                    className={`mt-4 text-sm leading-6 ${
                      isFront
                        ? "text-[#8EABB5]"
                        : "text-[#8EABB5]/65"
                    }`}
                  >
                    {card.text}
                  </p>

                  {isFront && (
                    <div className="mt-5 flex items-center justify-between border-t border-[#173A49]/30 pt-4">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#8EABB5]/70">
                        Click card for next
                      </span>

                      <span className="text-lg text-[#34D5EB]">↻</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={previousCard}
          aria-label="Previous card"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#173A49]/55 bg-[#071923]/80 text-[#A9E6EF] transition duration-300 hover:-translate-x-1 hover:border-[#34D5EB]/55"
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          {cards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${card.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-[#34D5EB] shadow-[0_0_10px_rgba(52,213,235,0.45)]"
                  : "w-2 bg-[#173A49] hover:bg-[#168AAD]"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextCard}
          aria-label="Next card"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#173A49]/55 bg-[#071923]/80 text-[#A9E6EF] transition duration-300 hover:translate-x-1 hover:border-[#34D5EB]/55"
        >
          →
        </button>
      </div>

      <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-[#8EABB5]/55">
        Select a card or use the arrows
      </p>
    </div>
  );
}

/* =========================================================
   CONCEPT PANEL
========================================================= */

function ConceptPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-[#173A49]/35 bg-[#0A1C28]/78 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.17)] md:p-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#34D5EB]">
        {title}
      </p>

      <div className="mt-5">{children}</div>
    </div>
  );
}

/* =========================================================
   HERO OVERVIEW
========================================================= */

function HeroOverviewCard() {
  const topics = [
    "Networking Basics",
    "OSI & TCP/IP",
    "Addressing",
    "Security Terms",
    "Attack Types",
    "Security Principles",
    "Why Security Matters",
  ];

  return (
    <div className="rounded-[26px] border border-[#168AAD]/35 bg-gradient-to-br from-[#168AAD]/17 via-[#0A1C28]/88 to-[#06131C] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A9E6EF]">
        In this article
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {topics.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#173A49]/40 bg-[#071923]/65 px-3 py-2 text-xs text-[#8EABB5]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-[#173A49]/30 pt-5">
        <div className="relative flex h-8 w-8 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full border border-[#4ADE80]/20 [animation-duration:3s]" />

          <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80] shadow-[0_0_12px_rgba(74,222,128,0.65)]" />
        </div>

        <div>
          <p className="text-xs font-medium text-[#EAF6F8]">
            Foundation topic
          </p>

          <p className="mt-1 text-[11px] text-[#8EABB5]">
            Networking → Risk → Security
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DATA TO INFORMATION
========================================================= */

function DataToInformationVisual() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div className="rounded-[18px] border border-[#173A49]/35 bg-[#071923] p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#A9E6EF]">
          Raw Data
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "J. Smith",
            "123 King St",
            "London",
            "UK",
            "0202656788",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#173A49]/30 bg-[#0A1C28] px-2.5 py-1 text-xs text-[#8EABB5]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <span className="text-2xl text-[#34D5EB]">→</span>
      </div>

      <div className="rounded-[18px] border border-[#34D5EB]/30 bg-[#168AAD]/10 p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#34D5EB]">
          Information
        </p>

        <p className="mt-3 text-sm leading-6 text-[#EAF6F8]">
          Raw facts become useful when they are organized and given context and
          meaning.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   OSI + TCP/IP
========================================================= */

function OsiTcpVisual() {
  const osiLayers = [
    "Application",
    "Presentation",
    "Session",
    "Transport",
    "Network",
    "Data Link",
    "Physical",
  ];

  const tcpLayers = [
    "Application",
    "Transport",
    "Internet",
    "Link",
  ];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
      <LayerStack
        title="OSI Model"
        subtitle="7-layer conceptual model"
        layers={osiLayers}
        variant="osi"
      />

      <div className="hidden flex-col items-center gap-2 lg:flex">
        <span className="h-12 w-px bg-gradient-to-b from-transparent via-[#34D5EB]/60 to-transparent" />

        <span className="rounded-full border border-[#34D5EB]/25 bg-[#06131C] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-[#34D5EB]">
          Maps to
        </span>

        <span className="h-12 w-px bg-gradient-to-b from-transparent via-[#34D5EB]/60 to-transparent" />
      </div>

      <LayerStack
        title="TCP/IP Model"
        subtitle="4-layer practical model"
        layers={tcpLayers}
        variant="tcp"
      />
    </div>
  );
}

function LayerStack({
  title,
  subtitle,
  layers,
  variant,
}: {
  title: string;
  subtitle: string;
  layers: string[];
  variant: "osi" | "tcp";
}) {
  return (
    <div>
      <div className="mb-5 text-center">
        <h4 className="text-lg font-bold text-[#EAF6F8]">
          {title}
        </h4>

        <p className="mt-1 text-xs text-[#8EABB5]">
          {subtitle}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-[390px] flex-col items-center pb-3">
        {layers.map((layer, index) => {
          const total = layers.length;

          const width =
            72 + (index / Math.max(total - 1, 1)) * 28;

          const opacity =
            0.08 + (index / Math.max(total - 1, 1)) * 0.13;

          return (
            <div
              key={layer}
              className="relative -mt-[1px] flex h-[42px] items-center justify-center border border-[#34D5EB]/30 text-center text-xs font-semibold text-[#EAF6F8] shadow-[0_8px_18px_rgba(0,0,0,0.18)] first:mt-0"
              style={{
                width: `${width}%`,
                clipPath:
                  "polygon(6% 0, 94% 0, 100% 100%, 0 100%)",
                background:
                  variant === "osi"
                    ? `rgba(22, 138, 173, ${opacity})`
                    : `rgba(52, 213, 235, ${opacity})`,
              }}
            >
              <div className="absolute inset-x-[7%] top-0 h-px bg-gradient-to-r from-transparent via-[#A9E6EF]/45 to-transparent" />

              {layer}
            </div>
          );
        })}

        <div
          className={`mt-2 h-2 rounded-full blur-md ${
            variant === "osi"
              ? "w-[85%] bg-[#168AAD]/35"
              : "w-[85%] bg-[#34D5EB]/30"
          }`}
        />
      </div>
    </div>
  );
}

/* =========================================================
   MAC VS IP
========================================================= */

function MacIpComparisonVisual() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-[18px] border border-[#A9E6EF]/25 bg-[#071923] p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#A9E6EF]">
          MAC Address
        </p>

        <h4 className="mt-2 text-lg font-bold">
          Local identity
        </h4>

        <p className="mt-2 text-sm leading-6 text-[#8EABB5]">
          Used for local network communication at the data link layer.
        </p>

        <div className="mt-3 rounded-[12px] border border-[#173A49]/25 bg-[#0A1C28] px-3 py-2 font-mono text-xs text-[#EAF6F8]">
          00:1A:2B:3C:4D:5E
        </div>
      </div>

      <div className="rounded-[18px] border border-[#34D5EB]/25 bg-[#168AAD]/10 p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#34D5EB]">
          IP Address
        </p>

        <h4 className="mt-2 text-lg font-bold">
          Network location
        </h4>

        <p className="mt-2 text-sm leading-6 text-[#8EABB5]">
          Used for logical addressing and routing between networks.
        </p>

        <div className="mt-3 rounded-[12px] border border-[#173A49]/25 bg-[#0A1C28] px-3 py-2 font-mono text-xs text-[#EAF6F8]">
          192.168.1.25
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TIPS
========================================================= */

function TipsPanel() {
  return (
    <div className="rounded-[22px] border border-[#A9E6EF]/20 bg-[#06131C]/75 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#A9E6EF]">
          Tips
        </p>

        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-[#8EABB5]/55">
          Windows Networking
        </span>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {commandTips.map((tip) => (
          <div
            key={tip.command}
            className="rounded-[14px] border border-[#173A49]/30 bg-[#071923] p-3"
          >
            <code className="break-all font-mono text-[11px] text-[#34D5EB]">
              {tip.command}
            </code>

            <p className="mt-2 text-xs leading-5 text-[#8EABB5]">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SECURITY TERMS
========================================================= */

function DefinitionCard({
  term,
  text,
}: {
  term: string;
  text: string;
}) {
  return (
    <article className="rounded-[18px] border border-[#173A49]/35 bg-[#0A1C28]/72 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#34D5EB]/40">
      <h3 className="text-lg font-bold tracking-tight text-[#EAF6F8]">
        {term}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#8EABB5]">
        {text}
      </p>
    </article>
  );
}

/* =========================================================
   RISK
========================================================= */

function RiskFormulaVisual() {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
      <FormulaBox
        label="Asset"
        value="Value to protect"
      />

      <FormulaOperator symbol="+" />

      <FormulaBox
        label="Threat"
        value="Potential harm"
      />

      <FormulaOperator symbol="+" />

      <FormulaBox
        label="Vulnerability"
        value="Weakness"
      />

      <FormulaOperator symbol="=" />

      <FormulaBox
        label="Risk"
        value="Potential loss"
        accent
      />
    </div>
  );
}

function FormulaBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[16px] border p-4 text-center ${
        accent
          ? "border-[#34D5EB]/40 bg-[#168AAD]/16"
          : "border-[#173A49]/35 bg-[#071923]"
      }`}
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#A9E6EF]">
        {label}
      </p>

      <p className="mt-2 text-xs text-[#8EABB5]">
        {value}
      </p>
    </div>
  );
}

function FormulaOperator({
  symbol,
}: {
  symbol: string;
}) {
  return (
    <div className="flex items-center justify-center text-xl font-bold text-[#34D5EB]">
      {symbol}
    </div>
  );
}

/* =========================================================
   ATTACKS
========================================================= */

function AttackComparisonCard({
  title,
  short,
  points,
  tone,
}: {
  title: string;
  short: string;
  points: string[];
  tone: AttackTone;
}) {
  const active = tone === "active";

  return (
    <article
      className={`rounded-[22px] border p-5 shadow-[0_20px_55px_rgba(0,0,0,0.16)] ${
        active
          ? "border-[#F87171]/25 bg-gradient-to-br from-[#F87171]/[0.055] via-[#0A1C28]/85 to-[#071923]"
          : "border-[#34D5EB]/25 bg-[#0A1C28]/80"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            active
              ? "bg-[#F87171] shadow-[0_0_11px_rgba(248,113,113,0.5)]"
              : "bg-[#34D5EB] shadow-[0_0_11px_rgba(52,213,235,0.5)]"
          }`}
        />

        <p
          className={`font-mono text-[8px] uppercase tracking-[0.18em] ${
            active
              ? "text-[#FCA5A5]"
              : "text-[#A9E6EF]"
          }`}
        >
          {title}
        </p>
      </div>

      <h3 className="mt-4 text-2xl font-black tracking-tight text-[#EAF6F8]">
        {short}
      </h3>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {points.map((point) => (
          <div
            key={point}
            className="flex gap-2 rounded-[12px] border border-[#173A49]/25 bg-[#071923]/50 p-3"
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                active
                  ? "bg-[#F87171]"
                  : "bg-[#34D5EB]"
              }`}
            />

            <p className="text-xs leading-5 text-[#8EABB5]">
              {point}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

/* =========================================================
   CIA TRIAD
========================================================= */

function CiaTriadVisual() {
  return (
    <div>
      <div className="[perspective:950px]">
        <div
          className="relative mx-auto max-w-[420px] rounded-[24px] border border-[#173A49]/35 bg-gradient-to-br from-[#071923] via-[#0A1C28] to-[#06131C] p-5 shadow-[0_30px_70px_rgba(0,0,0,0.32)] transition duration-500 hover:[transform:rotateX(2deg)_rotateY(-3deg)_translateY(-3px)]"
          style={{
            transform: "rotateX(5deg) rotateY(-5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-4 translate-x-3 translate-y-3 rounded-[20px] border border-[#34D5EB]/10 bg-[#168AAD]/[0.04]" />

          <svg
            viewBox="0 0 360 300"
            className="relative z-10 h-auto w-full drop-shadow-[0_22px_20px_rgba(0,0,0,0.4)]"
          >
            <defs>
              <linearGradient
                id="ciaFront"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#168AAD"
                  stopOpacity="0.38"
                />

                <stop
                  offset="60%"
                  stopColor="#34D5EB"
                  stopOpacity="0.13"
                />

                <stop
                  offset="100%"
                  stopColor="#4ADE80"
                  stopOpacity="0.10"
                />
              </linearGradient>

              <linearGradient
                id="ciaSide"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#168AAD"
                  stopOpacity="0.32"
                />

                <stop
                  offset="100%"
                  stopColor="#06131C"
                  stopOpacity="0.65"
                />
              </linearGradient>
            </defs>

            <polygon
              points="188,39 326,253 50,253"
              fill="#06131C"
              stroke="#168AAD"
              strokeOpacity="0.4"
              strokeWidth="2"
            />

            <polygon
              points="170,22 188,39 326,253 307,235"
              fill="url(#ciaSide)"
              stroke="#168AAD"
              strokeOpacity="0.28"
            />

            <polygon
              points="32,235 50,253 326,253 307,235"
              fill="#168AAD"
              fillOpacity="0.10"
              stroke="#34D5EB"
              strokeOpacity="0.25"
            />

            <polygon
              points="170,22 188,39 50,253 32,235"
              fill="#0A1C28"
              fillOpacity="0.65"
              stroke="#34D5EB"
              strokeOpacity="0.20"
            />

            <polygon
              points="170,22 307,235 32,235"
              fill="url(#ciaFront)"
              stroke="#34D5EB"
              strokeOpacity="0.70"
              strokeWidth="2"
            />

            <polygon
              points="170,78 257,212 83,212"
              fill="#06131C"
              fillOpacity="0.40"
              stroke="#A9E6EF"
              strokeOpacity="0.17"
            />

            <circle
              cx="170"
              cy="22"
              r="5"
              fill="#34D5EB"
            />

            <circle
              cx="32"
              cy="235"
              r="5"
              fill="#4ADE80"
            />

            <circle
              cx="307"
              cy="235"
              r="5"
              fill="#A9E6EF"
            />

            <text
              x="170"
              y="59"
              textAnchor="middle"
              fill="#A9E6EF"
              fontSize="14"
              fontWeight="700"
            >
              Confidentiality
            </text>

            <text
              x="84"
              y="225"
              textAnchor="middle"
              fill="#EAF6F8"
              fontSize="14"
              fontWeight="700"
            >
              Integrity
            </text>

            <text
              x="255"
              y="225"
              textAnchor="middle"
              fill="#EAF6F8"
              fontSize="14"
              fontWeight="700"
            >
              Availability
            </text>

            <text
              x="170"
              y="166"
              textAnchor="middle"
              fill="#34D5EB"
              fontSize="34"
              fontWeight="900"
            >
              CIA
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        <SmallInfoPill
          title="Confidentiality"
          text="Only authorized access"
          tone="cyan"
        />

        <SmallInfoPill
          title="Integrity"
          text="Accurate and unaltered data"
          tone="green"
        />

        <SmallInfoPill
          title="Availability"
          text="Accessible when needed"
          tone="ice"
        />
      </div>
    </div>
  );
}

function SmallInfoPill({
  title,
  text,
  tone,
}: {
  title: string;
  text: string;
  tone: "cyan" | "green" | "ice";
}) {
  const dotClass =
    tone === "green"
      ? "bg-[#4ADE80]"
      : tone === "ice"
        ? "bg-[#A9E6EF]"
        : "bg-[#34D5EB]";

  return (
    <div className="rounded-[14px] border border-[#173A49]/30 bg-[#071923]/75 p-3">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />

        <p className="text-sm font-semibold text-[#EAF6F8]">
          {title}
        </p>
      </div>

      <p className="mt-2 text-[11px] leading-5 text-[#8EABB5]">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   SECURITY PRINCIPLE CARD
========================================================= */

function MiniConceptCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[17px] border border-[#173A49]/35 bg-[#0A1C28]/72 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#A9E6EF]/40">
      <h3 className="text-base font-bold text-[#EAF6F8]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-[#8EABB5]">
        {text}
      </p>
    </article>
  );
}

/* =========================================================
   WHY SECURITY MATTERS
========================================================= */

function InfoBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#173A49]/35 bg-[#0A1C28]/80 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.16)]">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80] shadow-[0_0_12px_rgba(74,222,128,0.5)]" />

        <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-[#4ADE80]">
          Protected
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-[#EAF6F8] md:text-2xl">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#8EABB5]">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   QUESTIONS
========================================================= */

function QuestionCard({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  return (
    <article className="rounded-[18px] border border-[#173A49]/35 bg-[#0A1C28]/72 p-5 transition duration-300 hover:border-[#34D5EB]/35">
      <h3 className="text-base font-bold leading-6 text-[#EAF6F8]">
        {q}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#8EABB5]">
        {a}
      </p>
    </article>
  );
}

/* =========================================================
   MAC ADDRESS / NIC BACKGROUND PROP
========================================================= */

function MacAddressBackgroundProp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-2%] top-[8%] z-[1] hidden w-[360px] rotate-[4deg] opacity-[0.20] lg:block"
    >
      <div className="rounded-[26px] border border-[#34D5EB]/55 bg-[#071923]/90 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#34D5EB]">
              Network Interface
            </p>

            <p className="mt-1 text-[10px] text-[#8EABB5]">
              Layer 2 identity
            </p>
          </div>

          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-[#A9E6EF]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <rect
              x="4"
              y="5"
              width="16"
              height="14"
              rx="3"
            />

            <path d="M8 9h8M8 13h5M7 19v2M17 19v2" />
          </svg>
        </div>

        <div className="mt-5 rounded-[16px] border border-[#173A49]/50 bg-[#06131C]/90 p-4">
          <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#8EABB5]">
            MAC Address
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1 font-mono text-sm">
            <span className="rounded bg-[#168AAD]/25 px-2 py-1 text-[#34D5EB]">
              00:1A:2B
            </span>

            <span className="text-[#8EABB5]">:</span>

            <span className="rounded bg-[#4ADE80]/15 px-2 py-1 text-[#4ADE80]">
              3C:4D:5E
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-[10px] border border-[#168AAD]/30 p-2">
              <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-[#34D5EB]">
                OUI
              </p>

              <p className="mt-1 text-[9px] text-[#8EABB5]">
                Manufacturer
              </p>
            </div>

            <div className="rounded-[10px] border border-[#4ADE80]/25 p-2">
              <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-[#4ADE80]">
                NIC ID
              </p>

              <p className="mt-1 text-[9px] text-[#8EABB5]">
                Interface
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADDRESS STREAM
========================================================= */

function AddressStreamBackgroundProp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[8%] left-[2%] z-[1] hidden font-mono text-[9px] leading-8 tracking-[0.18em] text-[#34D5EB]/20 lg:block"
    >
      <p>192.168.1.25</p>
      <p>10.0.0.14</p>
      <p>172.16.0.8</p>
      <p>2001:db8::1</p>

      <p className="mt-2 text-[#A9E6EF]/25">
        00:1A:2B:3C:4D:5E
      </p>

      <p className="text-[#A9E6EF]/25">
        AA:71:4C:22:8F:10
      </p>

      <p className="text-[#A9E6EF]/25">
        FF:EE:03:19:7A:B2
      </p>
    </div>
  );
}

/* =========================================================
   PHISHING BACKGROUND PROP
========================================================= */

function PhishingBackgroundProp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-3%] top-[6%] z-[1] hidden h-[230px] w-[330px] rotate-[5deg] opacity-[0.18] lg:block"
    >
      <div className="absolute inset-0 rounded-[28px] border border-[#F87171]/60 bg-[#071923]/90 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3 border-b border-[#173A49]/55 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#F87171]/50 bg-[#F87171]/15">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#F87171]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              />

              <path d="m4 7 8 6 8-6" />
            </svg>
          </div>

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#FCA5A5]">
              Suspicious Message
            </p>

            <p className="mt-1 text-[10px] text-[#8EABB5]">
              Verify sender before interacting
            </p>
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="h-2 w-[75%] rounded-full bg-[#8EABB5]/35" />
          <div className="h-2 w-[92%] rounded-full bg-[#8EABB5]/25" />
          <div className="h-2 w-[58%] rounded-full bg-[#8EABB5]/25" />

          <div className="mt-6 inline-flex rounded-[8px] border border-[#F87171]/45 bg-[#F87171]/15 px-4 py-2 font-mono text-[8px] text-[#F87171]">
            UNVERIFIED LINK
          </div>
        </div>
      </div>

      <span className="absolute -left-8 -top-5 rounded-full border border-[#F87171]/45 bg-[#06131C]/95 px-3 py-1 font-mono text-[7px] uppercase tracking-[0.18em] text-[#F87171]">
        Phishing
      </span>
    </div>
  );
}

/* =========================================================
   TRAFFIC MONITORING
========================================================= */

function TrafficMonitoringBackgroundProp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[2%] left-[-3%] z-[1] hidden h-[250px] w-[440px] opacity-[0.18] lg:block"
    >
      <svg
        viewBox="0 0 430 250"
        className="h-full w-full"
      >
        <defs>
          <filter id="trafficMonitorGlow">
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M-30 75 C80 40 150 105 225 95 S330 55 470 75"
          fill="none"
          stroke="#34D5EB"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />

        <path
          d="M-20 165 C80 210 150 130 225 150 S330 205 470 165"
          fill="none"
          stroke="#168AAD"
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />

        {/* monitoring node */}
        <circle
          cx="225"
          cy="125"
          r="47"
          fill="#06131C"
          stroke="#A9E6EF"
          strokeOpacity="0.85"
        />

        <circle
          cx="225"
          cy="125"
          r="28"
          fill="none"
          stroke="#34D5EB"
          strokeOpacity="0.65"
        />

        {/* eye */}
        <ellipse
          cx="225"
          cy="125"
          rx="19"
          ry="11"
          fill="none"
          stroke="#A9E6EF"
          strokeOpacity="0.9"
        />

        <circle
          cx="225"
          cy="125"
          r="4.5"
          fill="#34D5EB"
        />

        <circle
          r="4"
          fill="#34D5EB"
          filter="url(#trafficMonitorGlow)"
        >
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M-30 75 C80 40 150 105 225 95 S330 55 470 75"
          />
        </circle>

        <circle
          r="3"
          fill="#A9E6EF"
        >
          <animateMotion
            dur="11s"
            repeatCount="indefinite"
            path="M-20 165 C80 210 150 130 225 150 S330 205 470 165"
          />
        </circle>
      </svg>

      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.22em] text-[#A9E6EF]">
        Traffic Monitoring
      </span>
    </div>
  );
}

/* =========================================================
   PACKET FLOOD / DISRUPTION
========================================================= */

function PacketFloodBackgroundProp() {
  const packets = [
    { y: 25, delay: "0s", duration: "5s" },
    { y: 55, delay: "0.8s", duration: "6s" },
    { y: 85, delay: "1.4s", duration: "4.5s" },
    { y: 115, delay: "2.1s", duration: "5.5s" },
    { y: 145, delay: "2.8s", duration: "4.8s" },
    { y: 175, delay: "3.2s", duration: "6.3s" },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[2%] right-[-3%] z-[1] hidden h-[230px] w-[440px] opacity-[0.17] lg:block"
    >
      <svg
        viewBox="0 0 430 220"
        className="h-full w-full"
      >
        {/* server */}
        <rect
          x="330"
          y="55"
          width="65"
          height="110"
          rx="12"
          fill="#06131C"
          stroke="#F87171"
          strokeWidth="1.4"
          strokeOpacity="0.9"
        />

        {[80, 110, 140].map((y) => (
          <g key={y}>
            <line
              x1="345"
              y1={y}
              x2="380"
              y2={y}
              stroke="#F87171"
              strokeOpacity="0.7"
            />

            <circle
              cx="350"
              cy={y - 7}
              r="2.5"
              fill="#F87171"
            />
          </g>
        ))}

        {/* packets */}
        {packets.map((packet, index) => (
          <rect
            key={index}
            x="-18"
            y={packet.y}
            width="24"
            height="12"
            rx="3"
            fill="#34D5EB"
          >
            <animate
              attributeName="x"
              values="-30;310"
              dur={packet.duration}
              begin={packet.delay}
              repeatCount="indefinite"
            />
          </rect>
        ))}

        {/* warning pulse */}
        <circle
          cx="362"
          cy="110"
          r="42"
          fill="none"
          stroke="#F87171"
          strokeOpacity="0.4"
        >
          <animate
            attributeName="r"
            values="35;65;35"
            dur="4s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      <p className="absolute bottom-0 right-7 font-mono text-[7px] uppercase tracking-[0.2em] text-[#F87171]">
        Traffic Disruption
      </p>
    </div>
  );
}