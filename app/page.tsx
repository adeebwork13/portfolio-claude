import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";

/* =========================================================
   DATA
========================================================= */

const featuredWork = {
  title: "Reconnaissance Lab",
  summary:
    "Passive reconnaissance and authorized active scanning inside a controlled VMware environment, with interactive replays of the real terminal sessions.",
  discipline: "Network security",
  tools: ["Kali Linux", "Nmap", "Netdiscover", "VMware"],
  href: "/projects/reconnaissance-lab",
  image: "/projects/reconnaissance-lab/portscan.png",
};

const work = [
  {
    title: "How Transistors Work",
    summary:
      "An interactive, animated explanation of switching, amplification and semiconductor fundamentals.",
    discipline: "Electronics",
    tools: ["Interactive animation"],
    href: "/blog/how-transistors-work",
  },
  {
    title: "Flow-Based Intrusion Detection Lab",
    summary:
      "Captured traffic, extracted flow features and correlated suspicious flows into intrusion alerts.",
    discipline: "Network security",
    tools: ["PyShark", "Wireshark", "NTLFlowLyzer"],
    href: "/projects/flow-based-intrusion-detection-lab",
  },
  {
    title: "Digital Forensics Investigation",
    summary:
      "Examined an E01 disk image, recovered deleted artifacts and produced a structured forensic report.",
    discipline: "Digital forensics",
    tools: ["Autopsy", "E01 imaging"],
    href: "/projects/digital-forensics-evidence-analysis",
  },
  {
    title: "Encrypted Network Communication",
    summary:
      "Compared plaintext and encrypted TCP traffic across three systems, then decrypted files and verified signatures.",
    discipline: "Cryptography",
    tools: ["Wireshark", "Public-key encryption"],
    href: "/projects/encrypted-network-communication-traffic-analysis",
  },
];

const roles = [
  {
    role: "Electrical Designer",
    company: "Powerhaus",
    description:
      "Technical documentation, drawings, coordination and structured problem solving.",
  },
  {
    role: "Engineering / Technical Experience",
    company: "Savage Arms",
    description:
      "Quality, engineering processes, documentation and performance-focused manufacturing work.",
  },
];

const labs = [
  {
    area: "Network security",
    proof: "5 documented labs",
    href: "/projects",
  },
  {
    area: "Virtualization",
    proof: "4-part VMware build series",
    href: "/blog/virtualization-lab",
  },
  {
    area: "Electronics",
    proof: "Interactive transistor explainer",
    href: "/blog/how-transistors-work",
  },
  {
    area: "Security frameworks",
    proof: "NIST CSF 2.0, the Govern function",
    href: "/blog/nist/csf-govern-function",
  },
];

const writing = [
  {
    title: "Building My VMware Security Lab",
    summary:
      "Windows Server 2022, Windows 10, Kali Linux and Metasploitable, including the networking problems along the way.",
    topic: "Virtualization",
    href: "/blog/virtualization-lab",
  },
  {
    title: "NIST CSF 2.0: Govern",
    summary:
      "Organizational context, risk appetite and cybersecurity governance, explained visually.",
    topic: "Frameworks",
    href: "/blog/nist/csf-govern-function",
  },
  {
    title: "Introduction to Network Security",
    summary:
      "OSI and TCP/IP, addressing, threats, attacks and the principles behind secure systems.",
    topic: "Network security",
    href: "/blog/information-and-network-security/introduction-to-information-and-network-security",
  },
];

const ease = "ease-[cubic-bezier(.2,.8,.2,1)]";

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0F0A0B] text-[#F3EDE6]">
      <style>{`
        @keyframes floatPortrait {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes atmosphericDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(16px, -12px, 0); }
        }

        .home a:focus-visible {
          outline: 2px solid #D6B48A;
          outline-offset: 3px;
        }

        .home ::selection {
          background: rgba(201, 110, 110, 0.38);
          color: #F3EDE6;
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-element {
            animation: none !important;
          }
        }
      `}</style>

      <BackgroundDecor />

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="home">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="relative z-10 border-b border-[#5E565C]/30">
          <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-5 pb-10 pt-10 sm:px-6 lg:min-h-[600px] lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-12 lg:pt-12">
            <div className="relative z-20 max-w-[700px]">
              <p className="text-lg font-bold tracking-[-0.02em] text-[#F3EDE6] sm:text-xl">
                Adeeb Nizar
              </p>

              <h1 className="mt-5 text-balance text-[clamp(2.7rem,5.6vw,5.6rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] [font-stretch:88%] text-[#F3EDE6]">
                I take systems apart to see{" "}
                <span className="text-[#C96E6E]">how they work.</span>
              </h1>

              <p className="mt-6 max-w-[34rem] text-lg leading-8 text-[#B89AAA]">
                Power grids, circuits, networks. I design power
                infrastructure at work, and take circuits and networks
                apart in labs I document step by step.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className={`group inline-flex items-center gap-3 rounded-full border border-[#C96E6E]/40 bg-gradient-to-r from-[#7A1F2B] to-[#9A3441] px-5 py-3 text-sm font-semibold text-[#F3EDE6] shadow-[0_12px_35px_rgba(122,31,43,0.28)] transition duration-300 ${ease} hover:-translate-y-1 hover:border-[#D6B48A]/55 hover:shadow-[0_16px_45px_rgba(201,110,110,0.22)] motion-reduce:hover:translate-y-0`}
                >
                  See the work
                  <Arrow className="transition duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border border-[#5E565C]/60 bg-[#1A1114]/75 px-5 py-3 text-sm font-semibold text-[#F3EDE6] transition duration-300 ${ease} hover:-translate-y-1 hover:border-[#D6B48A]/55 hover:text-[#D6B48A] motion-reduce:hover:translate-y-0`}
                >
                  Resume
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </div>
            </div>

            <HeroPortrait />
          </div>
        </section>

        {/* ===================================================
            WORK
        =================================================== */}

        <section
          id="projects"
          className="relative z-10 scroll-mt-20 border-b border-[#5E565C]/25"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              title={
                <>
                  Systems I&apos;ve{" "}
                  <span className="text-[#D6B48A]">taken apart.</span>
                </>
              }
              link={{ href: "/projects", label: "All projects" }}
            />

            <FeaturedWork />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {work.map((item) => (
                <WorkCard
                  key={item.title}
                  {...item}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            WORK + LAB
        =================================================== */}

        <section
          id="experience"
          className="relative z-10 scroll-mt-20 border-b border-[#5E565C]/25 bg-[#1A1114]/25"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              title={
                <>
                  Designed at work.{" "}
                  <span className="text-[#C96E6E]">
                    Dissected in the lab.
                  </span>
                </>
              }
            />

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <h3 className="text-xl font-bold tracking-[-0.02em]">
                  At work
                </h3>

                <p className="mt-2 text-base leading-7 text-[#B89AAA]">
                  Solar and powerline design: renewable-energy layouts,
                  utility infrastructure and overhead systems.
                </p>

                <ul className="mt-6 border-t border-[#5E565C]/35">
                  {roles.map((item) => (
                    <li
                      key={item.company}
                      className="border-b border-[#5E565C]/35 py-5"
                    >
                      <p className="text-lg font-semibold tracking-[-0.02em]">
                        {item.role}
                        <span className="font-normal text-[#B89AAA]">
                          {" "}· {item.company}
                        </span>
                      </p>

                      <p className="mt-2 max-w-[34rem] text-[15px] leading-7 text-[#B89AAA]">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-[-0.02em]">
                  In the lab
                </h3>

                <p className="mt-2 text-base leading-7 text-[#B89AAA]">
                  Every area below links to the work that backs it.
                </p>

                <ul className="mt-6 border-t border-[#5E565C]/35">
                  {labs.map((item) => (
                    <li key={item.area}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between gap-6 border-b border-[#5E565C]/35 py-5"
                      >
                        <span>
                          <span className="block text-lg font-semibold tracking-[-0.02em] transition duration-300 group-hover:text-[#D6B48A]">
                            {item.area}
                          </span>

                          <span className="mt-1 block text-sm text-[#B89AAA]">
                            {item.proof}
                          </span>
                        </span>

                        <Arrow className="shrink-0 text-[#C96E6E] transition duration-300 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm leading-7 text-[#B89AAA]">
                  Currently learning: AI systems, cloud and DevOps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            WRITING
        =================================================== */}

        <section
          id="blog"
          className="relative z-10 scroll-mt-20 border-b border-[#5E565C]/25"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              title={
                <>
                  Written up{" "}
                  <span className="text-[#D6B48A]">to explain.</span>
                </>
              }
              link={{ href: "/blog", label: "All writing" }}
            />

            <ul className="mt-10 border-t border-[#5E565C]/35">
              {writing.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group grid gap-2 border-b border-[#5E565C]/35 py-6 md:grid-cols-[1fr_1.2fr_auto] md:items-baseline md:gap-8"
                  >
                    <span className="text-xl font-semibold tracking-[-0.02em] transition duration-300 group-hover:text-[#D6B48A]">
                      {item.title}
                    </span>

                    <span className="text-[15px] leading-7 text-[#B89AAA]">
                      {item.summary}
                    </span>

                    <span className="flex items-center gap-3 font-mono text-xs text-[#B89AAA]">
                      {item.topic}
                      <Arrow className="text-[#C96E6E] transition duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===================================================
            CONTACT
        =================================================== */}

        <section
          id="contact"
          className="relative z-10 scroll-mt-20 overflow-hidden"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid overflow-hidden rounded-[24px] border border-[#5E565C]/35 shadow-[0_35px_100px_rgba(0,0,0,0.25)] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#7A1F2B] via-[#63202B] to-[#1A1114] p-6 md:p-8 lg:p-10">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C96E6E]/20 blur-[100px]" />

                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D6B48A]">
                    Connect
                  </p>

                  <h2 className="mt-5 text-[clamp(2.2rem,4vw,4rem)] font-black leading-[0.92] tracking-[-0.05em] text-[#F3EDE6]">
                    LET&apos;S
                    <br />
                    BUILD
                    <br />
                    SOMETHING.
                  </h2>

                  <div className="mt-10">
                    <AdeebSignature />
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1114] p-6 md:p-8 lg:p-10">
                <p className="max-w-lg text-base leading-7 text-[#B89AAA]">
                  Interested in my projects, technical work, or learning
                  journey? Connect with me through GitHub, LinkedIn, or my
                  resume.
                </p>

                <div className="mt-10 grid gap-3">
                  <ContactButton
                    href="https://github.com/adeebwork13"
                    title="GitHub"
                    subtitle="Projects & Code"
                  />

                  <ContactButton
                    href="https://www.linkedin.com/in/adeebnizar"
                    title="LinkedIn"
                    subtitle="Professional Profile"
                  />

                  <ContactButton
                    href="/resume.pdf"
                    title="Resume"
                    subtitle="View PDF"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer className="relative z-10 border-t border-[#5E565C]/25">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-7 text-sm text-[#B89AAA] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>© 2026 Adeeb Nizar</p>

            <div className="flex gap-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition duration-300 hover:text-[#F3EDE6]"
              >
                Resume
              </a>

              <a
                href="https://www.linkedin.com/in/adeebnizar"
                target="_blank"
                rel="noopener noreferrer"
                className="transition duration-300 hover:text-[#F3EDE6]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  title,
  link,
}: {
  title: React.ReactNode;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="max-w-[840px] text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[0.98] tracking-[-0.02em] [font-stretch:88%] text-[#F3EDE6]">
        {title}
      </h2>

      {link ? (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#D6B48A] transition duration-300 hover:text-[#F3EDE6]"
        >
          {link.label}
          <Arrow className="transition duration-300 group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}

/* =========================================================
   WORK
========================================================= */

function FeaturedWork() {
  return (
    <Link
      href={featuredWork.href}
      className={`group mt-10 grid overflow-hidden rounded-[20px] border border-[#5E565C]/35 bg-[#1A1114]/82 transition duration-500 ${ease} hover:-translate-y-1.5 hover:border-[#C96E6E]/45 motion-reduce:hover:translate-y-0 lg:grid-cols-[1.25fr_1fr]`}
    >
      <div className="relative aspect-[1000/618] overflow-hidden border-b border-[#5E565C]/35 bg-[#06131C] lg:border-b-0 lg:border-r">
        <Image
          src={featuredWork.image}
          alt="Nmap port scan output from the Reconnaissance Lab, run from Kali Linux against a lab target"
          fill
          sizes="(max-width: 1024px) 100vw, 680px"
          className={`object-cover object-left-top transition duration-700 ${ease} group-hover:scale-[1.02] motion-reduce:group-hover:scale-100`}
        />
      </div>

      <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:p-10">
        <div>
          <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-black leading-[1] tracking-[-0.025em] [font-stretch:88%] transition duration-300 group-hover:text-[#D6B48A]">
            {featuredWork.title}
          </h3>

          <p className="mt-4 max-w-[30rem] text-base leading-7 text-[#B89AAA]">
            {featuredWork.summary}
          </p>
        </div>

        <WorkMeta
          discipline={featuredWork.discipline}
          tools={featuredWork.tools}
        />
      </div>
    </Link>
  );
}

function WorkCard({
  title,
  summary,
  discipline,
  tools,
  href,
}: {
  title: string;
  summary: string;
  discipline: string;
  tools: string[];
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between gap-8 rounded-[20px] border border-[#5E565C]/35 bg-[#1A1114]/82 p-6 transition duration-500 ${ease} hover:-translate-y-1.5 hover:border-[#C96E6E]/45 motion-reduce:hover:translate-y-0 md:p-7`}
    >
      <div>
        <h3 className="flex items-start justify-between gap-4 text-xl font-bold tracking-[-0.025em] transition duration-300 group-hover:text-[#D6B48A] md:text-2xl">
          {title}
          <Arrow className="mt-1.5 shrink-0 text-[#C96E6E] transition duration-300 group-hover:translate-x-1" />
        </h3>

        <p className="mt-3 max-w-[32rem] text-[15px] leading-7 text-[#B89AAA]">
          {summary}
        </p>
      </div>

      <WorkMeta
        discipline={discipline}
        tools={tools}
      />
    </Link>
  );
}

function WorkMeta({
  discipline,
  tools,
}: {
  discipline: string;
  tools: string[];
}) {
  return (
    <dl className="grid gap-1 border-t border-[#5E565C]/35 pt-4 font-mono text-xs leading-6">
      <div className="flex gap-3">
        <dt className="sr-only">Discipline</dt>
        <dd className="text-[#D6B48A]">{discipline}</dd>
      </div>

      <div className="flex gap-3">
        <dt className="sr-only">Tools</dt>
        <dd className="text-[#B89AAA]">{tools.join(" · ")}</dd>
      </div>
    </dl>
  );
}

/* =========================================================
   HERO PORTRAIT
========================================================= */

function HeroPortrait() {
  return (
    <div className="relative mx-auto min-h-[320px] w-full max-w-[540px] lg:min-h-[520px]">
      {/* atmospheric glow */}

      <div
        className="motion-element absolute right-[5%] top-[10%] h-[55%] w-[60%] rounded-full bg-[#7A1F2B]/25 blur-[110px]"
        style={{
          animation: "atmosphericDrift 10s ease-in-out infinite",
        }}
      />

      <div
        className="motion-element absolute bottom-[8%] right-[10%] h-[45%] w-[50%] rounded-full bg-[#D6B48A]/10 blur-[100px]"
        style={{
          animation:
            "atmosphericDrift 13s ease-in-out infinite reverse",
        }}
      />

      {/* editorial frame */}

      <div className="absolute right-[3%] top-[8%] h-[84%] w-[80%] rounded-[34px] border border-[#5E565C]/35 bg-[#1A1114]/35" />

      <div className="absolute right-[9%] top-[14%] h-[72%] w-[68%] rounded-[28px] border border-[#D6B48A]/12" />

      {/* portrait */}

      <div
        className="motion-element absolute inset-x-0 bottom-0 z-10 h-[96%]"
        style={{
          animation: "floatPortrait 7s ease-in-out infinite",
        }}
      >
        <Image
          src="/adeeb-cutout.png"
          alt="Portrait of Adeeb Nizar"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-contain object-bottom opacity-[0.76] brightness-[0.72] contrast-[1.08] saturate-[0.72]"
        />

        {/* dark blend along lower image */}

        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#0F0A0B] via-[#0F0A0B]/45 to-transparent" />
      </div>
    </div>
  );
}

/* =========================================================
   SIGNATURE
========================================================= */

function AdeebSignature() {
  return (
    <div className="relative inline-flex">
      <div className="absolute inset-0 rounded-full bg-[#C96E6E]/10 blur-xl" />

      <svg
        viewBox="0 0 270 86"
        className="relative h-[48px] w-[165px] overflow-visible sm:h-[54px] sm:w-[185px]"
        aria-label="ADEEB signature"
      >
        <defs>
          <linearGradient
            id="adeebSignatureGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#F3EDE6" />
            <stop offset="55%" stopColor="#D6B48A" />
            <stop offset="100%" stopColor="#C96E6E" />
          </linearGradient>
        </defs>

        <path
          d="
            M15 58
            C28 36 40 18 50 15
            C60 12 58 31 49 46
            C41 60 30 70 23 64

            M39 47
            C57 42 73 42 91 46
          "
          fill="none"
          stroke="url(#adeebSignatureGradient)"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="76"
          y="57"
          fill="url(#adeebSignatureGradient)"
          style={{ fontFamily: "var(--font-signature), cursive" }}
          fontSize="31"
          letterSpacing="1"
        >
          ADEEB
        </text>

        <path
          d="M69 66 C112 76 177 73 235 57"
          fill="none"
          stroke="#C96E6E"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function ContactButton({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={
        href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      className="group flex items-center justify-between rounded-[18px] border border-[#5E565C]/35 bg-[#0F0A0B]/55 px-5 py-4 transition duration-300 hover:border-[#C96E6E]/45 hover:bg-[#7A1F2B]/10"
    >
      <div>
        <p className="font-semibold text-[#F3EDE6]">
          {title}
        </p>

        <p className="mt-1 text-sm text-[#B89AAA]/70">
          {subtitle}
        </p>
      </div>

      <span className="text-[#D6B48A] transition duration-300 group-hover:translate-x-1 group-hover:text-[#C96E6E]">
        ↗
      </span>
    </a>
  );
}

/* =========================================================
   ARROW
========================================================= */

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0F0A0B]" />

      <div className="absolute -left-[14%] top-[-15%] h-[720px] w-[720px] rounded-full bg-[#7A1F2B]/18 blur-[175px]" />

      <div className="absolute right-[-15%] top-[5%] h-[680px] w-[680px] rounded-full bg-[#C96E6E]/[0.085] blur-[170px]" />

      <div className="absolute bottom-[-18%] left-[28%] h-[680px] w-[680px] rounded-full bg-[#D6B48A]/[0.06] blur-[180px]" />

      {/* vignette */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,10,11,0.28)_62%,rgba(15,10,11,0.92)_100%)]" />
    </div>
  );
}
