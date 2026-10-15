import Link from "next/link";

import Navbar from "@/components/Navbar";
import VirtualLabTheme, {
  VirtualLabSectionBackdrop,
} from "@/components/themes/VirtualLabTheme";
import { labArticles } from "./labArticles";

export default function VirtualizationLabHub() {
  return (
    <VirtualLabTheme>
      <main className="min-h-screen">
        <div className="relative z-50">
          <Navbar />
        </div>

        <section className="relative overflow-hidden border-b border-[#263A50]/35">
          <VirtualLabSectionBackdrop variant="hero" />
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
            <Link href="/blog" className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7790A4] transition hover:text-[#EEF4FA]">
              ← Back to Blog
            </Link>

            <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.24em] text-[#35D3EB]">
              Virtualization • Security Lab Setup
            </p>

            <h1 className="mt-4 max-w-5xl text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em] text-[#EEF4FA]">
              BUILDING THE
              <span className="block bg-gradient-to-r from-[#705CFF] via-[#35D3EB] to-[#F4B750] bg-clip-text text-transparent">
                LAB ITSELF
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-[#8FA6B8] md:text-base">
              Before running security exercises, I had to build the environment:
              VMware networking, Windows Server, a Windows client, Kali Linux,
              and an intentionally vulnerable Metasploitable target.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {labArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/virtualization-lab/${article.slug}`}
                className="group relative overflow-hidden rounded-[26px] border border-[#263A50]/35 bg-gradient-to-br from-[#111C2B] via-[#0D1522] to-[#080C14] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#35D3EB]/35"
              >
                <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full border opacity-20" style={{ borderColor: article.accent }} />
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#7790A4]">{article.tag}</p>
                <h2 className="mt-5 text-2xl font-black tracking-[-0.035em] text-[#EEF4FA]">{article.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#8FA6B8]">{article.summary}</p>
                <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#D8E4EC]">
                  Read setup article <span className="transition duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/projects/reconnaissance-lab"
            className="mt-7 block rounded-[28px] border border-[#35D3EB]/22 bg-[#35D3EB]/[0.045] p-7 transition hover:border-[#35D3EB]/40"
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#F4B750]">Project</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#EEF4FA]">Reconnaissance Lab</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8FA6B8]">
              See how the environment was used for passive reconnaissance, network discovery, port scanning, OS fingerprinting, and service version detection — with interactive command simulations.
            </p>
          </Link>
        </section>
      </main>
    </VirtualLabTheme>
  );
}
