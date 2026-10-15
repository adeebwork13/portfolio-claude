"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";

import Navbar from "@/components/Navbar";

/* =========================================================
   TYPES
========================================================= */

type IconType =
  | "solar"
  | "powerline"
  | "ai"
  | "shield"
  | "cloud"
  | "code"
  | "electronics"
  | "engineering"
  | "devops";

/* =========================================================
   DATA
========================================================= */

const heroSkills = [
  {
    title: "Solar Design",
    description: "Renewable-energy layouts and technical planning.",
    icon: "solar" as IconType,
    tone: "gold",
  },
  {
    title: "Powerline Design",
    description: "Utility infrastructure and overhead systems.",
    icon: "powerline" as IconType,
    tone: "burgundy",
  },
  {
    title: "Cybersecurity + AI",
    description: "Current learning across secure and intelligent systems.",
    icon: "shield" as IconType,
    tone: "coral",
  },
  {
    title: "Software + Cloud",
    description: "Modern development, infrastructure, and DevOps.",
    icon: "cloud" as IconType,
    tone: "mauve",
  },
];

const capabilities = [
  {
    title: "Engineering",
    subtitle: "Systems & Problem Solving",
    icon: "engineering" as IconType,
    items: [
      "Engineering thinking",
      "Technical documentation",
      "System analysis",
      "Structured problem solving",
    ],
  },
  {
    title: "Electronics",
    subtitle: "Components & Circuits",
    icon: "electronics" as IconType,
    items: [
      "Circuit concepts",
      "Electronic components",
      "Interactive explainers",
      "Practical technical learning",
    ],
  },
  {
    title: "Artificial Intelligence",
    subtitle: "Intelligent Systems",
    icon: "ai" as IconType,
    items: [
      "AI foundations",
      "AI-assisted development",
      "Automation concepts",
      "Emerging technologies",
    ],
  },
  {
    title: "Cybersecurity",
    subtitle: "Active Learning",
    icon: "shield" as IconType,
    items: [
      "Security fundamentals",
      "Secure systems",
      "Cloud security",
      "DevSecOps concepts",
    ],
  },
  {
    title: "Software",
    subtitle: "Modern Development",
    icon: "code" as IconType,
    items: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Infrastructure",
    icon: "devops" as IconType,
    items: [
      "Git & GitHub",
      "Cloud fundamentals",
      "CI/CD concepts",
      "Automation workflows",
    ],
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>
  ) {
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX}px`
    );

    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY}px`
    );
  }

  return (
    <main
      onPointerMove={handlePointerMove}
      className="relative min-h-screen overflow-x-hidden bg-[#0F0A0B] text-[#F3EDE6]"
    >
      {/* ===================================================
          ANIMATIONS
      =================================================== */}

      <style>{`
        @keyframes floatPortrait {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes atmosphericDrift {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(16px, -12px, 0);
          }
        }

        @keyframes grainShift {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-1%, 1%);
          }
          50% {
            transform: translate(1%, -1%);
          }
          75% {
            transform: translate(1%, 1%);
          }
        }

        @keyframes sweep {
          0% {
            transform: translateX(-180%) skewX(-18deg);
          }
          100% {
            transform: translateX(330%) skewX(-18deg);
          }
        }

        @keyframes softPulse {
          0%, 100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.8;
          }
        }

        .premium-card {
          transition:
            transform 500ms cubic-bezier(.2,.8,.2,1),
            border-color 400ms ease,
            box-shadow 400ms ease,
            background-color 400ms ease;
        }

        .premium-card:hover {
          transform: translateY(-7px);
        }

        .project-preview {
          transform:
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1);
          transition:
            transform 650ms cubic-bezier(.2,.8,.2,1),
            box-shadow 500ms ease;
        }

        .project-card:hover .project-preview {
          transform:
            perspective(1200px)
            rotateX(2deg)
            rotateY(-2deg)
            translateY(-4px)
            scale(1.012);
        }

        .project-card:hover .project-shine {
          animation: sweep 1.05s ease forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-element {
            animation: none !important;
          }

          .premium-card,
          .premium-card:hover,
          .project-preview,
          .project-card:hover .project-preview {
            transform: none !important;
          }
        }
      `}</style>

      <BackgroundDecor />

      {/* subtle cursor light */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2] hidden lg:block"
        style={{
          background:
            "radial-gradient(circle 320px at var(--pointer-x, 50vw) var(--pointer-y, 35vh), rgba(201,110,110,0.075), rgba(214,180,138,0.025) 40%, transparent 72%)",
        }}
      />

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative z-10 overflow-hidden border-b border-[#5E565C]/30">
        {/* oversized editorial text */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-8 hidden -translate-x-1/2 select-none whitespace-nowrap text-[clamp(7rem,13vw,12rem)] font-black leading-none tracking-[-0.08em] text-[#F3EDE6]/[0.014] xl:block"
        >
          ADEEB
        </div>

        <div className="relative mx-auto max-w-[1240px] px-5 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
          {/* hero top line */}

          <div className="flex items-center justify-between border-b border-[#5E565C]/30 pb-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#D6B48A] sm:text-[10px]">
              Engineer & Technology Enthusiast
            </p>

            <div className="hidden items-center gap-3 sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#C96E6E] shadow-[0_0_14px_rgba(201,110,110,0.65)]" />

              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#B89AAA]">
                Building / Learning / Exploring
              </p>
            </div>
          </div>

          {/* main hero */}

          <div className="grid items-center gap-8 py-8 lg:min-h-[560px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
            {/* LEFT */}

            <div className="relative z-20 max-w-[720px]">
              <AdeebSignature />

              <p className="mt-5 max-w-3xl font-mono text-[9px] uppercase tracking-[0.25em] text-[#D6B48A] sm:text-[10px] md:text-xs">
                Engineering • Electronics • AI • Software • Cloud • DevOps
              </p>

              <h1 className="mt-6 text-[clamp(2.9rem,5vw,5.6rem)] font-black leading-[0.9] tracking-[-0.055em]">
                <span className="block text-[#F3EDE6]">
                  ENGINEER
                </span>

                <span className="block bg-gradient-to-r from-[#7A1F2B] via-[#C96E6E] to-[#D6B48A] bg-clip-text text-transparent">
                  & TECHNOLOGY
                </span>

                <span className="block text-[#F3EDE6]">
                  ENTHUSIAST
                </span>
              </h1>

              <div className="mt-5 max-w-[620px]">
                <p className="text-[14px] leading-7 text-[#B89AAA] sm:text-[15px] md:text-base">
                  I explore technology across engineering systems,
                  electronics, cybersecurity, artificial intelligence,
                  software development, cloud infrastructure, and
                  DevOps — learning by building practical projects
                  and visual technical experiences.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#C96E6E]/40 bg-gradient-to-r from-[#7A1F2B] to-[#9A3441] px-5 py-2.5 text-sm font-semibold text-[#F3EDE6] shadow-[0_12px_35px_rgba(122,31,43,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#D6B48A]/55 hover:shadow-[0_16px_45px_rgba(201,110,110,0.22)]"
                >
                  View Projects

                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <Link
                  href="/blog"
                  className="rounded-full border border-[#5E565C]/60 bg-[#1A1114]/75 px-5 py-2.5 text-sm font-semibold text-[#F3EDE6] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D6B48A]/55 hover:text-[#D6B48A]"
                >
                  Explore Blog
                </Link>
              </div>
            </div>

            {/* PORTRAIT */}

            <HeroPortrait />
          </div>

          {/* hero skills */}

          <div className="grid gap-px overflow-hidden rounded-[18px] border border-[#5E565C]/30 bg-[#5E565C]/25 sm:grid-cols-2 xl:grid-cols-4">
            {heroSkills.map((skill) => (
              <HeroSkillCard
                key={skill.title}
                title={skill.title}
                description={skill.description}
                icon={skill.icon}
                tone={skill.tone}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          ABOUT
      =================================================== */}

      <section
        id="about"
        className="relative z-10 overflow-hidden border-b border-[#5E565C]/25"
      >
        <Watermark text="ABOUT" />

        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <SectionHeading
            label="About"
            title={
              <>
                Engineering mindset.
                <span className="block text-[#C96E6E]">
                  Technology without boundaries.
                </span>
              </>
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden rounded-[20px] border border-[#5E565C]/35 bg-[#1A1114]/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.25)] md:p-10">
              <div className="absolute right-[-10%] top-[-15%] h-64 w-64 rounded-full bg-[#7A1F2B]/20 blur-[95px]" />

              <p className="relative font-mono text-[10px] uppercase tracking-[0.24em] text-[#D6B48A]">
                Personal Manifesto
              </p>

              <p className="relative mt-8 text-[clamp(1.7rem,2.7vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#F3EDE6]">
                I THINK
                <span className="text-[#C96E6E]">
                  {" "}IN SYSTEMS.
                </span>

                <br />

                I BUILD
                <span className="text-[#D6B48A]">
                  {" "}TO LEARN.
                </span>

                <br />

                I EXPLORE
                <span className="text-[#B89AAA]">
                  {" "}WITHOUT LIMITS.
                </span>
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InfoCard dark>
                My foundation is engineering, but my interests extend
                beyond any single discipline. I enjoy understanding how
                systems work and connecting ideas across physical
                infrastructure, software, security, and intelligent
                systems.
              </InfoCard>

              <InfoCard>
                This portfolio is a living record of that journey —
                projects, experiments, visual explainers, technical
                learning, and tools that continue to evolve as I learn.
              </InfoCard>

              <div className="md:col-span-2 grid gap-px overflow-hidden rounded-[24px] border border-[#5E565C]/30 bg-[#5E565C]/25 sm:grid-cols-3">
                <Metric value="BUILD" label="Practical Projects" />
                <Metric value="LEARN" label="Continuous Growth" />
                <Metric value="SHARE" label="Technical Knowledge" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SKILLS
      =================================================== */}

      <section
        id="skills"
        className="relative z-10 overflow-hidden border-b border-[#5E565C]/25"
      >
        <Watermark text="SYSTEMS" />

        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <SectionHeading
            label="Capability Matrix"
            title={
              <>
                Skills across
                <span className="text-[#C96E6E]">
                  {" "}physical{" "}
                </span>
                and
                <span className="text-[#D6B48A]">
                  {" "}digital systems.
                </span>
              </>
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((card) => (
              <CapabilityCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
                items={card.items}
              />
            ))}
          </div>

          {/* specialist skills */}

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <SpecialSkillCard
              title="Solar Design"
              subtitle="Renewable Energy Systems"
              icon="solar"
            />

            <SpecialSkillCard
              title="Powerline Design"
              subtitle="Utility Infrastructure"
              icon="powerline"
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          EXPERIENCE
      =================================================== */}

      <section
        id="experience"
        className="relative z-10 overflow-hidden border-b border-[#5E565C]/25 bg-[#1A1114]/25"
      >
        <Watermark text="EXPERIENCE" />

        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <SectionHeading
            label="Professional Foundation"
            title={
              <>
                Experience shaped by
                <span className="text-[#D6B48A]">
                  {" "}engineering discipline.
                </span>
              </>
            }
          />

          <div className="mt-8 grid gap-px overflow-hidden rounded-[20px] border border-[#5E565C]/30 bg-[#5E565C]/30 lg:grid-cols-2">
            <ExperienceCard
              role="Electrical Designer"
              company="Powerhaus"
              location="Ontario, Canada"
              description="Engineering and design experience involving technical documentation, drawings, coordination, and structured problem solving."
            />

            <ExperienceCard
              role="Engineering / Technical Experience"
              company="Savage Arms"
              location="Ontario, Canada"
              description="Technical and manufacturing experience involving quality, engineering processes, documentation, and performance-focused work."
            />
          </div>

          <p className="mt-6 text-sm text-[#B89AAA]">
            More detailed professional experience can be expanded here later.
          </p>
        </div>
      </section>

      {/* ===================================================
          PROJECTS
      =================================================== */}

      <section
        id="projects"
        className="relative z-10 overflow-hidden border-b border-[#5E565C]/25"
      >
        <Watermark text="WORK" />

        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              label="Selected Work"
              title={
                <>
                  Projects built to
                  <span className="text-[#C96E6E]">
                    {" "}teach, test,
                  </span>
                  <span className="text-[#D6B48A]">
                    {" "}and explore.
                  </span>
                </>
              }
            />

            <Link
              href="/projects"
              className="group relative inline-flex self-start items-center gap-3 overflow-hidden rounded-full border border-[#C96E6E]/35 bg-[#1A1114]/85 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F3EDE6] shadow-[0_0_0_1px_rgba(201,110,110,0.04),0_0_28px_rgba(122,31,43,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#D6B48A]/65 hover:text-[#D6B48A] hover:shadow-[0_0_18px_rgba(201,110,110,0.22),0_0_45px_rgba(122,31,43,0.26)]"
            >
              {/* Backlight */}
              <span className="pointer-events-none absolute inset-[-18px] -z-10 rounded-full bg-[#7A1F2B]/30 blur-2xl transition duration-500 group-hover:bg-[#C96E6E]/30" />

              {/* Soft inner highlight */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#7A1F2B]/20 via-[#C96E6E]/10 to-[#D6B48A]/10 opacity-70 transition duration-500 group-hover:opacity-100" />

              {/* Small glowing dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C96E6E] opacity-20 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C96E6E] shadow-[0_0_10px_rgba(201,110,110,0.7)]" />
              </span>

              <span className="relative">
                View Projects
              </span>

              <span className="relative text-[#D6B48A] transition duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>

          {/* Simple project list */}

          <div className="mt-8 border-t border-[#5E565C]/30">
            <ProjectLink
              number="01"
              title="Reconnaissance Lab"
              href="/projects/reconnaissance-lab"
            />

            <ProjectLink
              number="02"
              title="How Transistors Work"
              href="/blog/how-transistors-work"
            />

            <ProjectLink
              number="03"
              title="Virtualization Security Lab"
              href="/blog/virtualization-lab"
            />

            <ProjectLink
              number="04"
              title="Git Learning Hub"
            />

            <ProjectLink
              number="05"
              title="Personal Portfolio"
              href="/"
            />

            <ProjectLink
              number="06"
              title="AI Systems"
            />

            <ProjectLink
              number="07"
              title="Cloud & DevOps"
            />
            <ProjectLink
              number="08"
              title="Cybersecurity Lab Environment & Linux Foundations"
              href="/projects/cybersecurity-lab-environment-linux-foundations"
            />
            <ProjectLink
              number="09"
              title="Flow-Based Intrusion Detection Lab"
              href="/projects/flow-based-intrusion-detection-lab"
            />
            <ProjectLink
              number="10"
              title="Digital Forensics Investigation"
              href="/projects/digital-forensics-evidence-analysis"
            />
            <ProjectLink
              number="11"
              title="Encrypted Network Communication & Traffic Analysis"
              href="/projects/encrypted-network-communication-traffic-analysis"
            />

          </div>
        </div>
      </section>


      {/* ===================================================
    BLOG / WRITING & VISUALS
=================================================== */}

      <section
        id="blog"
        className="relative z-10 overflow-hidden border-b border-[#5E565C]/25 bg-[#1A1114]/18"
      >
        <Watermark text="JOURNAL" />

        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">

          {/* Heading + View Articles button */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading
              label="Writing & Visuals"
              title={
                <>
                  Learning
                  <span className="text-[#C96E6E]">
                    ...
                  </span>
                </>
              }
            />

            <Link
              href="/blog"
              className="group relative inline-flex self-start items-center gap-3 overflow-hidden rounded-full border border-[#C96E6E]/35 bg-[#1A1114]/85 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F3EDE6] shadow-[0_0_0_1px_rgba(201,110,110,0.04),0_0_28px_rgba(122,31,43,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#D6B48A]/65 hover:text-[#D6B48A] hover:shadow-[0_0_18px_rgba(201,110,110,0.22),0_0_45px_rgba(122,31,43,0.26)]"
            >
              {/* Backlight */}
              <span className="pointer-events-none absolute inset-[-18px] -z-10 rounded-full bg-[#7A1F2B]/30 blur-2xl transition duration-500 group-hover:bg-[#C96E6E]/30" />

              {/* Inner glow */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#7A1F2B]/20 via-[#C96E6E]/10 to-[#D6B48A]/10 opacity-70 transition duration-500 group-hover:opacity-100" />

              {/* Glow dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C96E6E] opacity-20 motion-reduce:animate-none" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C96E6E] shadow-[0_0_10px_rgba(201,110,110,0.7)]" />
              </span>

              <span className="relative">
                View Articles
              </span>

              <span className="relative text-[#D6B48A] transition duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>

          {/* Featured article + categories */}
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

            {/* Featured Article */}
            <Link
              href="/blog/how-transistors-work"
              className="group relative overflow-hidden rounded-[20px] border border-[#7A1F2B]/45 bg-gradient-to-br from-[#7A1F2B]/22 via-[#1A1114] to-[#0F0A0B] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#C96E6E]/65 md:p-10"
            >
              <div className="absolute right-[-8%] top-[-20%] h-72 w-72 rounded-full bg-[#C96E6E]/12 blur-[90px]" />

              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D6B48A]">
                  Featured Article
                </p>

                <h3 className="mt-5 max-w-xl text-[clamp(2rem,3.4vw,3.4rem)] font-black leading-[0.95] tracking-[-0.045em]">
                  HOW
                  <br />
                  TRANSISTORS
                  <br />
                  WORK
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#B89AAA]">
                  An interactive visual explanation combining engineering,
                  animation, equations, and real electronics concepts.
                </p>

                <p className="mt-6 text-sm font-semibold text-[#D6B48A] transition duration-300 group-hover:text-[#C96E6E]">
                  Read & Interact →
                </p>
              </div>
            </Link>

            {/* Blog categories */}
            <div className="grid gap-px overflow-hidden rounded-[28px] border border-[#5E565C]/30 bg-[#5E565C]/25">
              <BlogTopic
                icon="electronics"
                title="Electronics"
              />

              <BlogTopic
                icon="ai"
                title="AI & Technology"
              />

              <BlogTopic
                icon="shield"
                title="Cybersecurity"
              />

              <BlogTopic
                icon="cloud"
                title="Cloud & DevOps"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CONTACT
      =================================================== */}

      <section
        id="contact"
        className="relative z-10 overflow-hidden"
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
                  href="https://github.com/YOUR-GITHUB-USERNAME"
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
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-7 text-sm text-[#B89AAA]/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Adeeb</p>

          <p>Engineer & Technology Enthusiast</p>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   HERO PORTRAIT
========================================================= */

function HeroPortrait() {
  return (
    <div className="relative mx-auto min-h-[360px] w-full max-w-[560px] lg:min-h-[500px]">
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

      <div className="absolute right-[3%] top-[8%] h-[84%] w-[80%] rounded-[34px] border border-[#5E565C]/35 bg-[#1A1114]/35 backdrop-blur-[2px]" />

      <div className="absolute right-[9%] top-[14%] h-[72%] w-[68%] rounded-[28px] border border-[#D6B48A]/12" />

      {/* abstract burgundy area */}

      <div className="absolute right-[-2%] top-[22%] h-[48%] w-[44%] rounded-[45%] bg-gradient-to-br from-[#7A1F2B]/40 via-[#C96E6E]/12 to-transparent blur-[2px]" />

      {/* oversized A */}

      <div
        aria-hidden="true"
        className="absolute left-[5%] top-[12%] hidden text-[clamp(12rem,22vw,21rem)] font-black leading-none tracking-[-0.12em] text-[#F3EDE6]/[0.025] md:block"
      >
        A
      </div>

      {/* portrait */}

      <div
        className="motion-element absolute inset-x-0 bottom-0 z-10 h-[96%]"
        style={{
          animation: "floatPortrait 7s ease-in-out infinite",
        }}
      >
        <Image
          src="/adeeb-cutout.png"
          alt="Adeeb"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-contain object-bottom opacity-[0.76] brightness-[0.72] contrast-[1.08] saturate-[0.72]"
        />

        {/* dark blend along lower image */}

        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#0F0A0B] via-[#0F0A0B]/45 to-transparent" />

        {/* side fade */}

        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[#0F0A0B] to-transparent" />
      </div>

      {/* labels */}

      <div className="absolute right-[7%] top-[13%] z-20 border-l border-[#D6B48A]/40 pl-4">
        <p className="font-mono text-[8px] uppercase leading-5 tracking-[0.23em] text-[#D6B48A]">
          ENGINEERING
          <br />
          TECHNOLOGY
          <br />
          CURIOSITY
        </p>
      </div>

      <div className="absolute bottom-[14%] left-[3%] z-20 hidden max-w-[180px] border-l border-[#C96E6E]/50 pl-4 sm:block">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B89AAA]">
          Current Focus
        </p>

        <p className="mt-2 text-sm font-medium text-[#F3EDE6]">
          Cybersecurity + AI
        </p>
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
          fontFamily="'Segoe Script', 'Brush Script MT', cursive"
          fontSize="29"
          fontStyle="italic"
          fontWeight="600"
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
   HERO SKILLS
========================================================= */

function HeroSkillCard({
  title,
  description,
  icon,
  tone,
}: {
  title: string;
  description: string;
  icon: IconType;
  tone: string;
}) {
  return (
    <div className="group bg-[#1A1114]/95 p-4 transition duration-400 hover:bg-[#24171B]">
      <div className="flex items-start gap-4">
        <IconBadge icon={icon} tone={tone} />

        <div>
          <h3 className="text-sm font-semibold text-[#F3EDE6]">
            {title}
          </h3>

          <p className="mt-2 text-xs leading-6 text-[#B89AAA]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: React.ReactNode;
}) {
  return (
    <div className="relative max-w-[840px]">
      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-[#C96E6E]/60" />

        <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#D6B48A]">
          {label}
        </p>
      </div>

      <h2 className="mt-3 text-[clamp(2rem,3.6vw,3.8rem)] font-black leading-[0.98] tracking-[-0.045em] text-[#F3EDE6]">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   WATERMARK
========================================================= */

function Watermark({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-2%] top-5 hidden select-none text-[clamp(6rem,12vw,10rem)] font-black leading-none tracking-[-0.07em] text-[#F3EDE6]/[0.01] xl:block"
    >
      {text}
    </div>
  );
}

/* =========================================================
   INFO CARDS
========================================================= */

function InfoCard({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] border border-[#5E565C]/35 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] ${
        dark
          ? "bg-gradient-to-br from-[#7A1F2B]/28 via-[#1A1114] to-[#1A1114]"
          : "bg-[#1A1114]/85"
      }`}
    >
      <p className="text-sm leading-7 text-[#B89AAA]">
        {children}
      </p>
    </div>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-[#1A1114] p-5">
      <p className="text-xl font-black text-[#C96E6E]">
        {value}
      </p>

      <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-[#B89AAA]/65">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   CAPABILITIES
========================================================= */

function CapabilityCard({
  title,
  subtitle,
  icon,
  items,
}: {
  title: string;
  subtitle: string;
  icon: IconType;
  items: string[];
}) {
  return (
    <article className="premium-card group relative overflow-hidden rounded-[20px] border border-[#5E565C]/35 bg-[#1A1114]/82 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.16)] hover:border-[#C96E6E]/45 hover:shadow-[0_28px_75px_rgba(122,31,43,0.14)]">
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#7A1F2B]/15 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

      <div className="relative">
        <IconBadge icon={icon} tone="burgundy" />

        <h3 className="mt-5 text-xl font-bold tracking-tight text-[#F3EDE6]">
          {title}
        </h3>

        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#D6B48A]">
          {subtitle}
        </p>

        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm text-[#B89AAA]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C96E6E]" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#C96E6E] via-[#D6B48A]/40 to-transparent transition duration-500 group-hover:scale-x-100" />
      </div>
    </article>
  );
}

function SpecialSkillCard({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: IconType;
}) {
  return (
    <div className="premium-card group relative overflow-hidden rounded-[20px] border border-[#D6B48A]/20 bg-gradient-to-br from-[#1A1114] via-[#201419] to-[#0F0A0B] p-5 hover:border-[#D6B48A]/45">
      <div className="absolute right-[-5%] top-[-30%] h-52 w-52 rounded-full bg-[#D6B48A]/10 blur-[75px]" />

      <div className="relative flex items-center gap-5">
        <IconBadge icon={icon} tone="gold" />

        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#D6B48A]">
            {subtitle}
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EXPERIENCE
========================================================= */

function ExperienceCard({
  role,
  company,
  location,
  description,
}: {
  role: string;
  company: string;
  location: string;
  description: string;
}) {
  return (
    <article className="group bg-[#1A1114] p-5 transition duration-400 hover:bg-[#22161A] md:p-9">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C96E6E]">
        {company}
      </p>

      <h3 className="mt-4 text-xl font-bold md:text-2xl">
        {role}
      </h3>

      <p className="mt-4 max-w-xl text-sm leading-7 text-[#B89AAA]">
        {description}
      </p>

      <p className="mt-6 border-t border-[#5E565C]/25 pt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-[#B89AAA]/55">
        {location}
      </p>
    </article>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

function ProjectLink({
  number,
  title,
  href,
}: {
  number: string;
  title: string;
  href?: string;
}) {
  const content = (
    <div
      className={`group flex items-center justify-between gap-6 border-b border-[#5E565C]/30 py-5 transition duration-300 ${
        href ? "cursor-pointer hover:pl-2" : "opacity-45"
      }`}
    >
      <div className="flex min-w-0 items-center gap-5 sm:gap-7">
        <span className="shrink-0 font-mono text-[8px] tracking-[0.18em] text-[#B89AAA]/45">
          {number}
        </span>

        <h3
          className={`truncate text-lg font-semibold tracking-[-0.02em] transition duration-300 sm:text-xl ${
            href
              ? "text-[#F3EDE6] group-hover:text-[#D6B48A]"
              : "text-[#B89AAA]"
          }`}
        >
          {title}
        </h3>
      </div>

      {href ? (
        <span className="shrink-0 text-sm text-[#C96E6E] transition duration-300 group-hover:translate-x-1">
          →
        </span>
      ) : (
        <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.16em] text-[#B89AAA]/45">
          Coming Soon
        </span>
      )}
    </div>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}

/* =========================================================
   BLOG
========================================================= */

function BlogTopic({
  icon,
  title,
}: {
  icon: IconType;
  title: string;
}) {
  return (
    <div className="group flex items-center justify-between bg-[#1A1114] p-4 transition duration-300 hover:bg-[#22161A]">
      <div className="flex items-center gap-4">
        <IconBadge icon={icon} tone="gold" />

        <p className="font-semibold">
          {title}
        </p>
      </div>

      <span className="text-lg text-[#B89AAA]/35 transition duration-300 group-hover:translate-x-1 group-hover:text-[#C96E6E]">
        →
      </span>
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
   ICON BADGE
========================================================= */

function IconBadge({
  icon,
  tone,
}: {
  icon: IconType;
  tone: string;
}) {
  const toneClasses =
    tone === "gold"
      ? "border-[#D6B48A]/25 bg-[#D6B48A]/10 text-[#D6B48A]"
      : tone === "coral"
        ? "border-[#C96E6E]/25 bg-[#C96E6E]/10 text-[#C96E6E]"
        : tone === "mauve"
          ? "border-[#B89AAA]/25 bg-[#B89AAA]/10 text-[#B89AAA]"
          : "border-[#7A1F2B]/40 bg-[#7A1F2B]/20 text-[#C96E6E]";

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border p-2.5 transition duration-400 group-hover:scale-110 ${toneClasses}`}
    >
      <TechIcon
        icon={icon}
        className="h-6 w-6"
      />
    </div>
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

      {/* grid */}

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(214,180,138,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(214,180,138,0.10) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* fine particles */}

      <div
        className="motion-element absolute -inset-[5%] opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201,110,110,0.55) 0.65px, transparent 0.8px)",
          backgroundSize: "24px 24px",
          animation:
            "grainShift 9s steps(2) infinite",
        }}
      />

      {/* burgundy smoke */}

      <div className="absolute right-[3%] top-[8%] h-[340px] w-[240px] rotate-12 rounded-[50%] bg-gradient-to-b from-[#7A1F2B]/15 via-[#C96E6E]/[0.04] to-transparent blur-[50px]" />

      {/* vignette */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,10,11,0.28)_62%,rgba(15,10,11,0.92)_100%)]" />
    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function TechIcon({
  icon,
  className,
}: {
  icon: IconType;
  className?: string;
}) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  /* SOLAR PANEL */

  if (icon === "solar") {
    return (
      <svg {...props}>
        <circle cx="5" cy="5" r="2" />

        <path d="M5 1.5v1M5 7.5v1M1.5 5h1M7.5 5h1M2.5 2.5l.8.8M6.7 6.7l.8.8" />

        <path d="M7 9.5h10l1.7 7H5.4z" />

        <path d="M9 9.5l-1.1 7M12 9.5v7M15 9.5l1.1 7M6.5 13h11" />

        <path d="M11.5 16.5v2.5M8.5 19h6" />

        <path d="M18 4.5c1.6.1 2.8.8 3.4 2-.3 1.4-1.3 2.1-3 2.1h-2" />
      </svg>
    );
  }

  /* POWERLINE */

  if (icon === "powerline") {
    return (
      <svg {...props}>
        <path d="M5 21V7M12 21V9M19 21V11" />

        <path d="M2.7 7h4.6M9.7 9h4.6M16.7 11h4.6" />

        <path d="M4 9.7h2M11 11.7h2M18 13.7h2" />

        <path d="M0.8 5.8c3.7 1.4 7.3 1.7 10.7.8 4-1 7.7-.9 11.7.5" />

        <path d="M0.8 9.1c3.7 1.3 7.3 1.5 10.7.8 4-.9 7.7-.8 11.7.5" />

        <path d="M3.6 21h2.8M10.6 21h2.8M17.6 21h2.8" />
      </svg>
    );
  }

  if (icon === "engineering") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="7" />

        <path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
      </svg>
    );
  }

  if (icon === "electronics") {
    return (
      <svg {...props}>
        <path d="M13 2 5 14h6l-1 8 9-13h-6z" />
      </svg>
    );
  }

  if (icon === "ai") {
    return (
      <svg {...props}>
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="4"
        />

        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />

        <text
          x="12"
          y="14.3"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="6"
          fontWeight="700"
        >
          AI
        </text>
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg {...props}>
        <path d="M12 3 19 6v5c0 4.6-2.8 8.2-7 10-4.2-1.8-7-5.4-7-10V6z" />
        <path d="m9.4 12.4 1.7 1.7 3.8-4" />
      </svg>
    );
  }

  if (icon === "cloud") {
    return (
      <svg {...props}>
        <path d="M17.5 19H7a5 5 0 0 1-.7-9.95A6.5 6.5 0 0 1 18.7 11 4 4 0 0 1 17.5 19Z" />
      </svg>
    );
  }

  if (icon === "code") {
    return (
      <svg {...props}>
        <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
      </svg>
    );
  }

  if (icon === "devops") {
    return (
      <svg {...props}>
        <path d="M7.5 8a5.5 5.5 0 0 1 8.2-1.7L18 8.5" />
        <path d="m18 5 .2 3.7-3.7.2" />

        <path d="M16.5 16a5.5 5.5 0 0 1-8.2 1.7L6 15.5" />
        <path d="m6 19-.2-3.7 3.7-.2" />

        <circle cx="12" cy="12" r="2.4" />
      </svg>
    );
  }

  return null;
}