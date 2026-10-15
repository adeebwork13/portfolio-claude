import Link from "next/link";

import Navbar from "@/components/Navbar";
import NistTheme from "@/components/themes/NistTheme";

const futureTopics = [
  "CSF Core Functions",
  "Cybersecurity Profiles",
  "Implementation Tiers",
  "Informative References",
];

export default function NistIndexPage() {
  return (
    <NistTheme>
      <main className="min-h-screen">
        <div className="relative z-50">
          <Navbar />
        </div>

        <section className="relative overflow-hidden border-b border-[#28445F]/35">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-3%] top-4 hidden text-[10rem] font-black tracking-[-0.08em] text-[#DCEAF5]/[0.02] lg:block"
          >
            NIST
          </div>

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
            <Link
              href="/blog"
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8FA9BC] transition hover:text-[#DCEAF5]"
            >
              ← Back to Blog
            </Link>

            <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.24em] text-[#38BDF8]">
              NIST • Cybersecurity Framework
            </p>

            <h1 className="mt-4 max-w-5xl text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
              NIST
              <span className="block bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#F4C46B] bg-clip-text text-transparent">
                LEARNING HUB
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-[#8FA9BC] md:text-base">
              Notes and visual explainers on cybersecurity governance, risk,
              controls, and how the NIST Cybersecurity Framework connects
              security decisions to business outcomes.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <Link
              href="/blog/nist/csf-govern-function"
              className="group relative overflow-hidden rounded-[28px] border border-[#38BDF8]/25 bg-gradient-to-br from-[#10243A] via-[#0B1929] to-[#07111D] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/45"
            >
              <div className="absolute right-[-2rem] top-[-2rem] h-48 w-48 rounded-full border border-[#38BDF8]/10" />
              <div className="absolute right-[1rem] top-[1rem] h-28 w-28 rounded-full border border-[#F4C46B]/10" />

              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#38BDF8]">
                Featured Article
              </p>

              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] text-[#EAF2F8] md:text-5xl">
                NIST CSF 2.0:
                <span className="block text-[#F4C46B]">GOVERN Function</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8FA9BC]">
                A visual guide to organizational context, compliance,
                dependencies, risk appetite, enterprise risk management, and
                standardized risk decisions.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#DCEAF5]">
                Read article
                <span className="transition duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <div className="rounded-[28px] border border-[#28445F]/35 bg-[#0B1929]/72 p-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#F4C46B]">
                NIST Topics
              </p>

              <div className="mt-5 grid gap-2">
                {futureTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between rounded-[15px] border border-[#28445F]/30 bg-[#07111D]/55 px-4 py-3"
                  >
                    <span className="text-sm text-[#8FA9BC]">{topic}</span>
                    <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#8FA9BC]/45">
                      Later
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </NistTheme>
  );
}
