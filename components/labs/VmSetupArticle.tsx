import Link from "next/link";
import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import VirtualLabTheme, {
  VirtualLabSectionBackdrop,
} from "@/components/themes/VirtualLabTheme";
import type { LabArticle } from "@/app/blog/virtualization-lab/labArticles";

export default function VmSetupArticle({ data }: { data: LabArticle }) {
  return (
    <VirtualLabTheme>
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>

        <section className="relative overflow-hidden border-b border-[#263A50]/35">
          <VirtualLabSectionBackdrop variant="hero" />
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link
              href="/blog/virtualization-lab"
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7790A4] transition hover:text-[#EEF4FA]"
            >
              ← Virtualization Lab
            </Link>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#35D3EB]">
                  {data.eyebrow}
                </p>
                <h1 className="mt-4 text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-0.06em] text-[#EEF4FA]">
                  {data.title}
                </h1>
                <p
                  className="mt-4 text-2xl font-bold tracking-[-0.03em]"
                  style={{ color: data.accent }}
                >
                  {data.subtitle}
                </p>
                <p className="mt-6 max-w-3xl text-sm leading-7 text-[#8FA6B8] md:text-base">
                  {data.summary}
                </p>
              </div>

              <VmStackVisual accent={data.accent} title={data.title} />
            </div>
          </div>
        </section>

        <ArticleSection variant="vmware">
          <SectionHeading
            eyebrow="Build profile"
            title="How I configured the virtual machine"
            description="The settings below are the configuration choices I used or targeted while building the lab."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.specs.map((item) => (
              <div
                key={item.label}
                className="rounded-[18px] border border-[#263A50]/35 bg-[#0D1522]/72 p-4"
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#7790A4]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#EEF4FA]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {data.steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[21px] border border-[#263A50]/35 bg-[#0D1522]/72 p-5"
              >
                <span className="font-mono text-[8px] text-[#35D3EB]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-[#EEF4FA]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#8FA6B8]">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection variant="network">
          <SectionHeading
            eyebrow="Networking"
            title={data.networkTitle}
            description={data.networkBody}
          />
          <div className="mt-8">
            <NetworkVisual items={data.networkItems} accent={data.accent} />
          </div>
        </ArticleSection>

        <ArticleSection variant="questions">
          <SectionHeading
            eyebrow="Questions I had while building it"
            title="The doubts that taught me the most"
            description="These are the questions that came up while I was actually setting up the VM, not a separate textbook FAQ."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {data.questions.map((item) => (
              <details
                key={item.question}
                className="group rounded-[20px] border border-[#263A50]/35 bg-[#0D1522]/72 p-5"
              >
                <summary className="cursor-pointer list-none pr-8 text-base font-bold leading-6 text-[#EEF4FA]">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-[#8FA6B8]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </ArticleSection>

        <section className="relative border-t border-[#263A50]/35">
          <div className="mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8">
            <div className="rounded-[28px] border border-[#35D3EB]/20 bg-gradient-to-br from-[#101A2A] via-[#0D1522] to-[#080C14] p-7 md:p-9">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#F4B750]">
                Takeaway
              </p>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-[#B7C5D0]">
                {data.takeaway}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/projects/reconnaissance-lab"
                  className="rounded-full border border-[#35D3EB]/30 bg-[#35D3EB]/10 px-5 py-2.5 text-sm font-semibold text-[#C9F7FB] transition hover:-translate-y-0.5 hover:border-[#35D3EB]/50"
                >
                  View Reconnaissance Project →
                </Link>
                <Link
                  href="/blog/virtualization-lab"
                  className="rounded-full border border-[#263A50]/40 bg-[#080C14]/60 px-5 py-2.5 text-sm font-semibold text-[#8FA6B8] transition hover:text-[#EEF4FA]"
                >
                  More Lab Setup Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </VirtualLabTheme>
  );
}

function ArticleSection({
  variant,
  children,
}: {
  variant: "vmware" | "network" | "questions";
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#263A50]/30">
      <VirtualLabSectionBackdrop variant={variant} />
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
      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#35D3EB]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-[0.98] tracking-[-0.04em] text-[#EEF4FA] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8FA6B8]">
        {description}
      </p>
    </div>
  );
}

function VmStackVisual({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="[perspective:1100px]">
      <div
        className="relative mx-auto h-[390px] w-full max-w-[480px]"
        style={{ transform: "rotateX(5deg) rotateY(-6deg)" }}
      >
        {[
          ["HOST", "Windows host PC", 0],
          ["HYPERVISOR", "VMware Workstation Pro", 1],
          ["GUEST", title, 2],
        ].map(([label, text, index]) => (
          <div
            key={String(label)}
            className="absolute left-1/2 w-[78%] -translate-x-1/2 rounded-[26px] border border-[#263A50]/40 bg-gradient-to-br from-[#111C2B] via-[#0D1522] to-[#080C14] p-5 shadow-[0_30px_65px_rgba(0,0,0,0.3)]"
            style={{
              top: `${50 + Number(index) * 82}px`,
              transform: `translateX(-50%) translateZ(${Number(index) * 12}px) rotateX(${Number(index) * -1.5}deg)`,
              zIndex: 10 + Number(index),
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[7px] uppercase tracking-[0.17em] text-[#7790A4]">
                  {label}
                </p>
                <p className="mt-2 text-sm font-bold text-[#EEF4FA]">{text}</p>
              </div>
              <span
                className="h-3 w-3 rounded-full shadow-[0_0_16px_currentColor]"
                style={{ backgroundColor: accent, color: accent }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkVisual({
  items,
  accent,
}: {
  items: string[];
  accent: string;
}) {
  const midpoint = Math.ceil(items.length / 2);

  return (
    <div className="rounded-[26px] border border-[#263A50]/35 bg-[#0D1522]/72 p-6">
      <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-2">
          {items.slice(0, midpoint).map((item) => (
            <div
              key={item}
              className="rounded-[14px] border border-[#263A50]/30 bg-[#080C14]/55 px-4 py-3 text-sm text-[#A9BAC7]"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-[#35D3EB]/20 bg-[#080C14]">
          <div className="absolute inset-4 rounded-full border border-[#705CFF]/16" />
          <div className="text-center">
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#7790A4]">
              VMware
            </p>
            <p className="mt-2 text-xl font-black" style={{ color: accent }}>
              NETWORK
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {items.slice(midpoint).map((item) => (
            <div
              key={item}
              className="rounded-[14px] border border-[#263A50]/30 bg-[#080C14]/55 px-4 py-3 text-sm text-[#A9BAC7]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
