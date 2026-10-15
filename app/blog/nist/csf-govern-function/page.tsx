"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import NistTheme, {
  NistSectionBackdrop,
} from "@/components/themes/NistTheme";

type CrosswalkItem = {
  id: string;
  title: string;
  iso: string[];
  nist: string[];
};

const crosswalks: CrosswalkItem[] = [
  {
    id: "GV.OC-01",
    title: "Mission informs cybersecurity",
    iso: [
      "ISO/IEC 27001:2022 — 4.1 Understanding the organization and its context",
      "ISO/IEC 27001:2022 — 6.1 Actions to address risks and opportunities",
      "ISO/IEC 27001:2022 — 8.1 Operational planning and control",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — PM-11 Mission and Business Process Definition",
      "NIST SP 800-53 Rev. 5 — PM-09 Risk Management Strategy",
      "NIST SP 800-53 Rev. 5 — PM-08 Critical Infrastructure Plan",
    ],
  },
  {
    id: "GV.OC-03",
    title: "Legal, regulatory, and contractual obligations",
    iso: [
      "ISO/IEC 27001:2022 — A.5.31 Legal, statutory, regulatory and contractual requirements",
      "ISO/IEC 27001:2022 — A.5.34 Privacy and protection of PII",
      "ISO/IEC 27001:2022 — A.5.20 Information security within supplier agreements",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — AC-01 Access Control Policy and Procedures",
      "NIST SP 800-53 Rev. 5 — AT-01 Awareness and Training Policy and Procedures",
      "NIST SP 800-53 Rev. 5 — AU-01 Audit and Accountability Policy and Procedures",
    ],
  },
  {
    id: "GV.OC-04",
    title: "Services others depend on",
    iso: [
      "ISO/IEC 27001:2022 — A.5.29 Information security during disruption",
      "ISO/IEC 27001:2022 — A.5.30 ICT readiness for business continuity",
      "ISO/IEC 27001:2022 — A.8.14 Redundancy of information processing facilities",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — PM-11 Mission and Business Process Definition",
      "NIST SP 800-53 Rev. 5 — RA-09 Criticality Analysis",
      "NIST SP 800-53 Rev. 5 — CP-02(08) Identify Critical Assets",
    ],
  },
  {
    id: "GV.OC-05",
    title: "Services the organization depends on",
    iso: [
      "ISO/IEC 27001:2022 — A.5.19 Information security in supplier relationships",
      "ISO/IEC 27001:2022 — A.5.22 Monitoring, review and change management of supplier services",
      "ISO/IEC 27001:2022 — A.5.30 ICT readiness for business continuity",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — PM-30 Supply Chain Risk Management Strategy",
      "NIST SP 800-53 Rev. 5 — SA-09 External System Services",
      "NIST SP 800-53 Rev. 5 — SR-05 Acquisition Strategies, Tools and Methods",
    ],
  },
  {
    id: "GV.RM-01",
    title: "Risk management objectives",
    iso: [
      "ISO/IEC 27001:2022 — 6.2 Information security objectives",
      "ISO/IEC 27001:2022 — A.5.1 Policies for information security",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — PM-09 Risk Management Strategy",
      "NIST SP 800-53 Rev. 5 — RA-07 Risk Response",
    ],
  },
  {
    id: "GV.RM-02",
    title: "Risk appetite and tolerance",
    iso: [
      "ISO/IEC 27001:2022 — 6.1.2 Information security risk assessment",
      "ISO/IEC 27001:2022 — 6.1.3 Information security risk treatment",
      "ISO/IEC 27001:2022 — A.5.1 Policies for information security",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — PM-09 Risk Management Strategy",
      "NIST SP 800-53 Rev. 5 — PM-28 Risk Framing",
      "NIST SP 800-53 Rev. 5 — RA-07 Risk Response",
    ],
  },
  {
    id: "GV.RM-03",
    title: "Cybersecurity inside enterprise risk management",
    iso: [
      "ISO/IEC 27001:2022 — 6.1.3 Information security risk treatment",
      "ISO/IEC 27001:2022 — A.5.1 Policies for information security",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — PM-09 Risk Management Strategy",
      "NIST SP 800-53 Rev. 5 — RA-07 Risk Response",
    ],
  },
  {
    id: "GV.RM-06",
    title: "A standardized risk method",
    iso: [
      "ISO/IEC 27001:2022 — 6.1.2 Information security risk assessment",
      "ISO/IEC 27001:2022 — 8.2 Information security risk assessment",
    ],
    nist: [
      "NIST SP 800-53 Rev. 5 — PM-09 Risk Management Strategy",
      "NIST SP 800-53 Rev. 5 — RA-03 Risk Assessment",
    ],
  },
];

const riskScenarios = [
  {
    name: "Customer portal outage",
    likelihood: 3,
    impact: 4,
    note: "Operationally important and customer-facing, but the response should still be proportional to the actual scope of the incident.",
  },
  {
    name: "Patient system unavailable",
    likelihood: 2,
    impact: 5,
    note: "Lower likelihood can still produce a high-priority risk when the potential impact is severe.",
  },
  {
    name: "Supplier service disruption",
    likelihood: 4,
    impact: 3,
    note: "A dependency risk: the organization may be healthy internally while an external provider becomes the failure point.",
  },
];

export default function GovernArticlePage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = riskScenarios[scenarioIndex];
  const riskScore = scenario.likelihood * scenario.impact;

  return (
    <NistTheme>
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>

        <section className="relative overflow-hidden border-b border-[#28445F]/35">
          <NistSectionBackdrop variant="overview" />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link
              href="/blog/nist"
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8FA9BC] transition hover:text-[#DCEAF5]"
            >
              ← NIST Learning Hub
            </Link>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#38BDF8]">
                  NIST CSF 2.0 • GOVERN
                </p>

                <h1 className="mt-4 text-[clamp(3rem,7vw,6.7rem)] font-black leading-[0.87] tracking-[-0.06em]">
                  GOVERN
                  <span className="block bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#F4C46B] bg-clip-text text-transparent">
                    BEFORE YOU
                  </span>
                  <span className="block">DEFEND</span>
                </h1>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-[#8FA9BC] md:text-base">
                  Cybersecurity is not only about firewalls, monitoring, and
                  incident response. Before those controls make sense, an
                  organization needs to understand its mission, obligations,
                  dependencies, acceptable risk, and who is responsible for
                  making decisions.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "GV.OC",
                    "GV.RM",
                    "Mission",
                    "Compliance",
                    "Dependencies",
                    "Risk Appetite",
                    "ERM",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#28445F]/45 bg-[#0B1929]/70 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#DCEAF5]/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <GovernHubVisual />
            </div>
          </div>
        </section>

        <ArticleSection variant="overview">
          <SectionHeading
            eyebrow="The big idea"
            title="Govern is the decision layer"
            description="The GOVERN Function connects cybersecurity to the mission of the organization. It sets the context and rules that guide the other CSF Functions."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <InfoCard
              title="What GOVERN does"
              text="It establishes and communicates the organization's cybersecurity risk management strategy, expectations, and policies. That means security priorities are shaped by business objectives instead of being created in isolation."
              accent="blue"
            />

            <FunctionRail />
          </div>
        </ArticleSection>

        <ArticleSection variant="context">
          <SectionHeading
            eyebrow="Organizational Context • GV.OC"
            title="Security starts with understanding the organization"
            description="A security team cannot protect everything equally. It first needs to know what the organization exists to do, who depends on it, what it depends on, and which obligations shape its decisions."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <MissionVisual />

            <div className="grid gap-4">
              <SubcategoryCard
                code="GV.OC-01"
                title="Mission informs cybersecurity"
                text="The mission tells the security program what matters most. A hospital prioritizes patient care and clinical systems. An ecommerce company prioritizes storefront availability, payment services, and customer information."
              />

              <SubcategoryCard
                code="GV.OC-03"
                title="Obligations shape the security baseline"
                text="Legal, regulatory, privacy, civil-liberties, and contractual requirements become part of the organization's cybersecurity context rather than a separate afterthought."
              />
            </div>
          </div>
        </ArticleSection>

        <ArticleSection variant="compliance">
          <SectionHeading
            eyebrow="GV.OC-03"
            title="Compliance is part of context"
            description="Organizations operate inside legal and contractual boundaries. Those boundaries can change what data must be protected, how incidents are handled, and which safeguards are expected."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <RegulationCard
              label="GDPR"
              title="Personal data and privacy obligations"
              text="For organizations within its scope, GDPR creates obligations around personal data processing, security, accountability, and the protection of individual rights."
            />

            <RegulationCard
              label="HIPAA"
              title="Protection of health information"
              text="For covered healthcare environments in the United States, HIPAA's Security Rule establishes safeguards for electronic protected health information."
            />
          </div>

          <div className="mt-5 rounded-[22px] border border-[#F4C46B]/25 bg-[#F4C46B]/[0.055] p-5">
            <p className="text-sm leading-7 text-[#A9BDCB]">
              The important point is not to memorize a list of regulations. It
              is to build a repeatable process for identifying which
              obligations apply, translating them into requirements, assigning
              ownership, and reviewing them as the organization changes.
            </p>
          </div>
        </ArticleSection>

        <ArticleSection variant="dependencies">
          <SectionHeading
            eyebrow="GV.OC-04 + GV.OC-05"
            title="Dependency works in both directions"
            description="Governance asks two different questions: who depends on us, and what do we depend on?"
          />

          <div className="mt-8">
            <DependencyMap />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <SubcategoryCard
              code="GV.OC-04"
              title="What others depend on"
              text="Customers, partners, regulators, and communities may rely on services the organization provides. Their expectations help define which capabilities are truly critical."
            />

            <SubcategoryCard
              code="GV.OC-05"
              title="What the organization depends on"
              text="Cloud providers, utilities, DNS, software vendors, payment processors, telecom providers, and other suppliers can become external points of failure."
            />
          </div>
        </ArticleSection>

        <ArticleSection variant="risk">
          <SectionHeading
            eyebrow="Risk Management Strategy • GV.RM"
            title="Risk decisions need boundaries"
            description="The organization needs agreed objectives, a shared language for acceptable risk, and a consistent way to decide which risks deserve attention first."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <RiskObjectivesVisual />
            <RiskAppetiteGauge />
          </div>

          <div className="mt-5 rounded-[24px] border border-[#28445F]/35 bg-[#0B1929]/75 p-6">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
              GV.RM-01 • A response should be proportional
            </p>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#EAF2F8]">
              Should malware removal shut down the entire ecommerce system?
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#8FA9BC]">
              Not automatically. If malware is spreading and the scope is
              unknown, broader isolation may be justified. But if an
              unaffected service such as invoice processing is separated from
              the compromised environment, shutting it down can create extra
              business impact without reducing the actual cyber risk.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["1", "Understand scope", "Identify affected systems and connections."],
                ["2", "Contain proportionally", "Isolate what is needed to stop spread."],
                ["3", "Protect operations", "Keep safe services running when practical."],
              ].map(([n, title, text]) => (
                <div
                  key={n}
                  className="rounded-[16px] border border-[#28445F]/30 bg-[#07111D]/60 p-4"
                >
                  <span className="font-mono text-[8px] text-[#F4C46B]">{n}</span>
                  <h4 className="mt-2 font-semibold text-[#DCEAF5]">{title}</h4>
                  <p className="mt-2 text-xs leading-5 text-[#8FA9BC]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </ArticleSection>

        <ArticleSection variant="erm">
          <SectionHeading
            eyebrow="GV.RM-03"
            title="Cyber risk belongs inside enterprise risk"
            description="A cyber incident can become an operational, financial, legal, safety, and reputational problem at the same time."
          />

          <div className="mt-8 grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr]">
            <ErmOrbit />

            <div className="space-y-4">
              <InfoCard
                title="Outsourcing does not outsource accountability"
                text="A vendor can monitor systems, assess vulnerabilities, or respond to incidents, but leadership still needs visibility into the organization's own risk profile and must remain responsible for risk decisions."
                accent="gold"
              />

              <InfoCard
                title="Management needs decision-useful information"
                text="Senior leaders need to understand major risks, incidents, compliance issues, third-party exposure, and how cybersecurity can affect business objectives."
                accent="blue"
              />
            </div>
          </div>
        </ArticleSection>

        <ArticleSection variant="method">
          <SectionHeading
            eyebrow="GV.RM-06"
            title="Use one repeatable risk method"
            description="A standardized method makes different risks comparable. The goal is consistency in how risks are calculated, documented, categorized, and prioritized."
          />

          <div className="mt-8">
            <RiskPipeline />
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <RiskMatrix
              likelihood={scenario.likelihood}
              impact={scenario.impact}
            />

            <div className="rounded-[24px] border border-[#28445F]/35 bg-[#0B1929]/76 p-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
                Interactive example
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {riskScenarios.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setScenarioIndex(index)}
                    className={`rounded-full border px-3 py-2 text-xs transition ${
                      scenarioIndex === index
                        ? "border-[#38BDF8]/55 bg-[#38BDF8]/10 text-[#EAF2F8]"
                        : "border-[#28445F]/35 bg-[#07111D]/50 text-[#8FA9BC] hover:border-[#38BDF8]/35"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[18px] border border-[#28445F]/30 bg-[#07111D]/65 p-5">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-sm font-semibold text-[#DCEAF5]">
                      {scenario.name}
                    </p>
                    <p className="mt-2 text-xs text-[#8FA9BC]">
                      Likelihood {scenario.likelihood}/5 • Impact{" "}
                      {scenario.impact}/5
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#8FA9BC]">
                      Example score
                    </p>
                    <p className="mt-1 text-4xl font-black text-[#F4C46B]">
                      {riskScore}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#8FA9BC]">
                  {scenario.note}
                </p>
              </div>

              <p className="mt-4 text-[11px] leading-5 text-[#6F899A]">
                This matrix is a learning visualization. Real organizations may
                use different qualitative or quantitative methods based on
                their own risk model.
              </p>
            </div>
          </div>
        </ArticleSection>

        <ArticleSection variant="overview">
          <SectionHeading
            eyebrow="Control crosswalk"
            title="Connecting CSF outcomes to other standards"
            description="NIST CSF informative references help show relationships between CSF outcomes and other standards and control catalogs. They are useful crosswalks, not statements that two controls are perfectly equivalent."
          />

          <div className="mt-8 grid gap-4">
            {crosswalks.map((item) => (
              <CrosswalkCard key={item.id} item={item} />
            ))}
          </div>
        </ArticleSection>

        <section className="relative border-t border-[#28445F]/35">
          <div className="mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8">
            <div className="rounded-[28px] border border-[#38BDF8]/25 bg-gradient-to-br from-[#10243A] via-[#0B1929] to-[#07111D] p-7 md:p-9">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#F4C46B]">
                Takeaway
              </p>

              <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#EAF2F8] md:text-5xl">
                Cybersecurity governance starts before the first technical control.
              </h2>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-[#8FA9BC] md:text-base">
                The GOVERN Function makes cybersecurity a business decision.
                Mission, stakeholders, regulation, dependencies, risk appetite,
                enterprise risk, and consistent assessment methods create the
                boundaries within which technical security decisions can be
                made intelligently.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.nist.gov/cyberframework"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#38BDF8]/35 bg-[#38BDF8]/10 px-5 py-2.5 text-sm font-semibold text-[#DCEAF5] transition hover:-translate-y-0.5 hover:border-[#38BDF8]/55"
                >
                  NIST CSF Resource Center ↗
                </a>

                <a
                  href="https://www.nist.gov/cyberframework/informative-references"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#28445F]/40 bg-[#07111D]/60 px-5 py-2.5 text-sm font-semibold text-[#8FA9BC] transition hover:text-[#DCEAF5]"
                >
                  Informative References ↗
                </a>

                <Link
                  href="/blog/nist"
                  className="rounded-full border border-[#28445F]/40 bg-[#07111D]/60 px-5 py-2.5 text-sm font-semibold text-[#8FA9BC] transition hover:text-[#DCEAF5]"
                >
                  More NIST Articles →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </NistTheme>
  );
}

function ArticleSection({
  variant,
  children,
}: {
  variant: "overview" | "context" | "compliance" | "dependencies" | "risk" | "erm" | "method";
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#28445F]/30">
      <NistSectionBackdrop variant={variant} />
      <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8 lg:py-14">
        {children}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-5xl">
      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#38BDF8]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-[0.98] tracking-[-0.04em] text-[#EAF2F8] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8FA9BC]">
        {description}
      </p>
    </div>
  );
}

function GovernHubVisual() {
  const functions = [
    ["GOVERN", "top-[8%] left-1/2 -translate-x-1/2", true],
    ["IDENTIFY", "left-[4%] top-[36%]", false],
    ["PROTECT", "right-[3%] top-[36%]", false],
    ["DETECT", "left-[10%] bottom-[10%]", false],
    ["RESPOND", "right-[8%] bottom-[10%]", false],
    ["RECOVER", "left-1/2 bottom-[2%] -translate-x-1/2", false],
  ] as const;

  return (
    <div className="[perspective:1100px]">
      <div
        className="relative mx-auto aspect-square w-full max-w-[500px]"
        style={{ transform: "rotateX(5deg) rotateY(-5deg)" }}
      >
        <div className="absolute inset-[18%] rounded-full border border-[#38BDF8]/25 bg-[#0B1929]/70 shadow-[0_35px_90px_rgba(0,0,0,0.35)]" />
        <div className="absolute inset-[29%] rounded-full border border-[#F4C46B]/25 bg-[#07111D] shadow-[0_0_45px_rgba(56,189,248,0.08)]" />

        <div className="absolute inset-[38%] flex items-center justify-center rounded-full border border-[#38BDF8]/35 bg-[#10243A]">
          <div className="text-center">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
              CSF 2.0
            </p>
            <p className="mt-1 text-2xl font-black text-[#F4C46B]">GV</p>
          </div>
        </div>

        <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="168" fill="none" stroke="#38BDF8" strokeOpacity="0.25" />
          <circle cx="250" cy="250" r="118" fill="none" stroke="#F4C46B" strokeOpacity="0.18" strokeDasharray="5 10">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 250 250"
              to="360 250 250"
              dur="28s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {functions.map(([name, position, active]) => (
          <div
            key={name}
            className={`absolute ${position} rounded-full border px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] ${
              active
                ? "border-[#F4C46B]/45 bg-[#F4C46B]/10 text-[#F4C46B]"
                : "border-[#28445F]/45 bg-[#07111D]/80 text-[#8FA9BC]"
            }`}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function FunctionRail() {
  const items = ["GOVERN", "IDENTIFY", "PROTECT", "DETECT", "RESPOND", "RECOVER"];

  return (
    <div className="rounded-[22px] border border-[#28445F]/35 bg-[#0B1929]/72 p-5">
      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8FA9BC]">
        CSF 2.0 Functions
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div
            key={item}
            className={`rounded-full border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.13em] ${
              index === 0
                ? "border-[#F4C46B]/45 bg-[#F4C46B]/10 text-[#F4C46B]"
                : "border-[#28445F]/35 bg-[#07111D]/50 text-[#8FA9BC]"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function MissionVisual() {
  const steps = [
    ["MISSION", "Why the organization exists"],
    ["CRITICAL SERVICES", "What must keep working"],
    ["CYBER RISKS", "What can prevent the mission"],
    ["PRIORITIES", "Where protection matters most"],
  ];

  return (
    <div className="[perspective:950px]">
      <div
        className="rounded-[26px] border border-[#38BDF8]/25 bg-gradient-to-br from-[#10243A] via-[#0B1929] to-[#07111D] p-6 shadow-[0_28px_70px_rgba(0,0,0,0.25)]"
        style={{ transform: "rotateX(3deg) rotateY(3deg)" }}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#F4C46B]">
          Mission → Risk
        </p>

        <div className="mt-5 space-y-3">
          {steps.map(([title, text], index) => (
            <div key={title} className="relative">
              <div className="rounded-[16px] border border-[#28445F]/35 bg-[#07111D]/72 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#38BDF8]/30 font-mono text-[8px] text-[#38BDF8]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#DCEAF5]">{title}</p>
                    <p className="mt-1 text-xs text-[#8FA9BC]">{text}</p>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="mx-auto h-3 w-px bg-gradient-to-b from-[#38BDF8]/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubcategoryCard({
  code,
  title,
  text,
}: {
  code: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[21px] border border-[#28445F]/35 bg-[#0B1929]/74 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/35">
      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
        {code}
      </p>
      <h3 className="mt-3 text-xl font-bold tracking-tight text-[#EAF2F8]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#8FA9BC]">{text}</p>
    </article>
  );
}

function RegulationCard({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <article className="group rounded-[24px] border border-[#F4C46B]/20 bg-[#0B1929]/78 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F4C46B]/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#F4C46B]/30 bg-[#F4C46B]/10 font-black text-[#F4C46B]">
          §
        </div>

        <span className="rounded-full border border-[#28445F]/35 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8FA9BC]">
          {label}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#EAF2F8]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#8FA9BC]">{text}</p>
    </article>
  );
}

function DependencyMap() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#28445F]/35 bg-[#0B1929]/72 p-6 md:p-8">
      <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
            External stakeholders depend on us
          </p>
          <div className="mt-4 grid gap-2">
            {["Customers", "Partners", "Regulators", "Communities"].map((item) => (
              <div
                key={item}
                className="rounded-[14px] border border-[#38BDF8]/20 bg-[#07111D]/55 px-4 py-3 text-sm text-[#A9BDCB]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-[#38BDF8]/25 bg-[#07111D] shadow-[0_0_70px_rgba(56,189,248,0.08)]">
          <div className="absolute inset-4 rounded-full border border-[#F4C46B]/15" />
          <div className="text-center">
            <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#8FA9BC]">
              Organization
            </p>
            <p className="mt-2 text-2xl font-black text-[#DCEAF5]">CORE</p>
          </div>
        </div>

        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#F4C46B]">
            We depend on external services
          </p>
          <div className="mt-4 grid gap-2">
            {["Cloud / SaaS", "Utilities", "DNS / Telecom", "Suppliers"].map((item) => (
              <div
                key={item}
                className="rounded-[14px] border border-[#F4C46B]/20 bg-[#07111D]/55 px-4 py-3 text-sm text-[#A9BDCB]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskObjectivesVisual() {
  return (
    <div className="rounded-[24px] border border-[#28445F]/35 bg-[#0B1929]/75 p-6">
      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
        GV.RM-01
      </p>
      <h3 className="mt-3 text-2xl font-bold text-[#EAF2F8]">Risk objectives</h3>

      <div className="mt-5 space-y-3">
        {[
          ["01", "Protect customer data"],
          ["02", "Maintain critical availability"],
          ["03", "Reduce high-severity exposure"],
          ["04", "Improve response readiness"],
        ].map(([n, text]) => (
          <div
            key={n}
            className="flex items-center gap-3 rounded-[14px] border border-[#28445F]/30 bg-[#07111D]/55 px-4 py-3"
          >
            <span className="font-mono text-[8px] text-[#F4C46B]">{n}</span>
            <span className="text-sm text-[#A9BDCB]">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskAppetiteGauge() {
  return (
    <div className="rounded-[24px] border border-[#28445F]/35 bg-[#0B1929]/75 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
            GV.RM-02
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[#EAF2F8]">
            Appetite vs tolerance
          </h3>
        </div>
        <span className="rounded-full border border-[#F4C46B]/25 bg-[#F4C46B]/10 px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.14em] text-[#F4C46B]">
          Decision boundary
        </span>
      </div>

      <svg viewBox="0 0 420 220" className="mt-5 w-full">
        <path d="M55 185 A155 155 0 0 1 365 185" fill="none" stroke="#172A3D" strokeWidth="28" strokeLinecap="round" />
        <path d="M55 185 A155 155 0 0 1 185 40" fill="none" stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="28" strokeLinecap="round" />
        <path d="M185 40 A155 155 0 0 1 285 70" fill="none" stroke="#F4C46B" strokeOpacity="0.7" strokeWidth="28" strokeLinecap="round" />
        <path d="M285 70 A155 155 0 0 1 365 185" fill="none" stroke="#F87171" strokeOpacity="0.55" strokeWidth="28" strokeLinecap="round" />

        <line x1="210" y1="185" x2="278" y2="92" stroke="#DCEAF5" strokeWidth="4" strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-10 210 185;7 210 185;-10 210 185"
            dur="6s"
            repeatCount="indefinite"
          />
        </line>

        <circle cx="210" cy="185" r="10" fill="#DCEAF5" />
        <text x="70" y="210" fill="#8FA9BC" fontSize="11">LOW</text>
        <text x="188" y="25" fill="#F4C46B" fontSize="11">TOLERANCE</text>
        <text x="330" y="210" fill="#8FA9BC" fontSize="11">HIGH</text>
      </svg>

      <p className="text-sm leading-7 text-[#8FA9BC]">
        Risk appetite is the broad amount of risk the organization is willing
        to pursue or retain. Tolerance turns that idea into practical limits
        for specific decisions and activities.
      </p>
    </div>
  );
}

function ErmOrbit() {
  const labels = [
    ["Financial", "left-[2%] top-[20%]"],
    ["Operational", "right-[2%] top-[18%]"],
    ["Legal", "left-[8%] bottom-[18%]"],
    ["Reputation", "right-[3%] bottom-[18%]"],
    ["Safety", "left-1/2 bottom-[2%] -translate-x-1/2"],
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[470px]">
      <div className="absolute inset-[8%] rounded-full border border-[#38BDF8]/15" />
      <div className="absolute inset-[20%] rounded-full border border-[#38BDF8]/20" />
      <div className="absolute inset-[34%] flex items-center justify-center rounded-full border border-[#F4C46B]/30 bg-[#0B1929] shadow-[0_0_70px_rgba(56,189,248,0.07)]">
        <div className="text-center">
          <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#38BDF8]">Cyber</p>
          <p className="mt-1 text-xl font-black text-[#DCEAF5]">RISK</p>
        </div>
      </div>

      {labels.map(([label, position]) => (
        <span
          key={label}
          className={`absolute ${position} rounded-full border border-[#28445F]/40 bg-[#07111D]/80 px-3 py-2 text-xs text-[#8FA9BC]`}
        >
          {label}
        </span>
      ))}

      <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 470 470">
        <circle cx="235" cy="235" r="184" fill="none" stroke="#38BDF8" strokeDasharray="4 12">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 235 235"
            to="360 235 235"
            dur="32s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

function RiskPipeline() {
  const steps = [
    ["IDENTIFY", "What could go wrong?"],
    ["ASSESS", "Likelihood + impact"],
    ["CATEGORIZE", "Use consistent labels"],
    ["PRIORITIZE", "What matters first?"],
    ["RESPOND", "Treat, accept, transfer, avoid"],
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-5">
      {steps.map(([title, text], index) => (
        <div
          key={title}
          className="relative rounded-[18px] border border-[#28445F]/35 bg-[#0B1929]/72 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-[#38BDF8]">0{index + 1}</span>
            {index < steps.length - 1 && (
              <span className="hidden text-[#F4C46B] lg:block">→</span>
            )}
          </div>
          <h3 className="mt-4 text-sm font-bold text-[#DCEAF5]">{title}</h3>
          <p className="mt-2 text-xs leading-5 text-[#8FA9BC]">{text}</p>
        </div>
      ))}
    </div>
  );
}

function RiskMatrix({
  likelihood,
  impact,
}: {
  likelihood: number;
  impact: number;
}) {
  const cells = [];

  for (let row = 5; row >= 1; row--) {
    for (let col = 1; col <= 5; col++) {
      const selected = row === likelihood && col === impact;
      const score = row * col;

      cells.push(
        <div
          key={`${row}-${col}`}
          className={`relative flex aspect-square items-center justify-center rounded-[9px] border text-[10px] transition duration-300 ${
            selected
              ? "scale-[1.08] border-[#F4C46B]/70 bg-[#F4C46B]/20 text-[#F4C46B] shadow-[0_0_22px_rgba(244,196,107,0.18)]"
              : score >= 16
                ? "border-[#F87171]/20 bg-[#F87171]/[0.055] text-[#FCA5A5]/70"
                : score >= 9
                  ? "border-[#F4C46B]/18 bg-[#F4C46B]/[0.045] text-[#F4C46B]/65"
                  : "border-[#38BDF8]/16 bg-[#38BDF8]/[0.04] text-[#8FA9BC]/70"
          }`}
        >
          {score}
        </div>,
      );
    }
  }

  return (
    <div className="rounded-[24px] border border-[#28445F]/35 bg-[#0B1929]/76 p-6">
      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#38BDF8]">
        Learning risk matrix
      </p>

      <div className="mt-5 grid grid-cols-5 gap-2">{cells}</div>

      <div className="mt-3 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.13em] text-[#6F899A]">
        <span>Impact →</span>
        <span>Likelihood ↑</span>
      </div>
    </div>
  );
}

function CrosswalkCard({ item }: { item: CrosswalkItem }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-[20px] border border-[#28445F]/35 bg-[#0B1929]/72">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left"
      >
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-[#38BDF8]">
            {item.id}
          </p>
          <h3 className="mt-1 text-base font-bold text-[#EAF2F8]">{item.title}</h3>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#28445F]/40 text-[#DCEAF5]">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="grid gap-4 border-t border-[#28445F]/30 px-5 py-5 lg:grid-cols-2">
          <ControlList title="ISO/IEC 27001:2022" items={item.iso} />
          <ControlList title="NIST SP 800-53 Rev. 5" items={item.nist} />
        </div>
      )}
    </article>
  );
}

function ControlList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[16px] border border-[#28445F]/30 bg-[#07111D]/55 p-4">
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#F4C46B]">
        {title}
      </p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-xs leading-5 text-[#8FA9BC]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  text,
  accent,
}: {
  title: string;
  text: string;
  accent: "blue" | "gold";
}) {
  return (
    <article className="rounded-[22px] border border-[#28445F]/35 bg-[#0B1929]/74 p-5">
      <div
        className={`h-1.5 w-10 rounded-full ${
          accent === "gold" ? "bg-[#F4C46B]" : "bg-[#38BDF8]"
        }`}
      />
      <h3 className="mt-4 text-xl font-bold tracking-tight text-[#EAF2F8]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#8FA9BC]">{text}</p>
    </article>
  );
}
