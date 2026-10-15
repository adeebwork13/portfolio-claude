"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import InteractiveTerminal from "@/components/labs/InteractiveTerminal";
import VirtualLabTheme, {
  VirtualLabSectionBackdrop,
} from "@/components/themes/VirtualLabTheme";
import { terminals } from "./terminalProfiles";

const evidence = [
  {
    title: "WHOIS lookup",
    src: "/projects/reconnaissance-lab/whois.png",
    text: "WHOIS was used as passive reconnaissance to review public registration, contact, and name-server information associated with humber.ca.",
  },
  {
    title: "Kali ↔ Metasploitable connectivity",
    src: "/projects/reconnaissance-lab/kali-ping.png",
    text: "Kali received 192.168.148.130/24 and successfully reached Metasploitable at 192.168.148.129 with 0% packet loss.",
  },
  {
    title: "Passive reconnaissance",
    src: "/projects/reconnaissance-lab/nslookup-harvester.png",
    text: "DNS lookup and theHarvester were used to gather public information about humber.ca without directly probing the target network.",
  },
  {
    title: "Network discovery",
    src: "/projects/reconnaissance-lab/netdiscover.png",
    text: "netdiscover identified live VMware NAT hosts, including Windows Server at .128 and Metasploitable at .129.",
  },
  {
    title: "Port scan",
    src: "/projects/reconnaissance-lab/portscan.png",
    text: "The authorized ports 1–1000 scan showed several services exposed by the intentionally vulnerable Metasploitable target.",
  },
  {
    title: "Service version detection",
    src: "/projects/reconnaissance-lab/service-versions.png",
    text: "Nmap service detection added product/version context to the open-port list, including FTP, SSH, DNS, HTTP, Samba, MySQL, and PostgreSQL.",
  },
  {
    title: "Windows Server OS fingerprinting",
    src: "/projects/reconnaissance-lab/windows-os.png",
    text: "Nmap's strongest guess was Microsoft Windows Server 2022, while also warning that OS fingerprinting is probabilistic rather than absolute.",
  },
];

export default function ReconnaissanceLabProject() {
  return (
    <VirtualLabTheme>
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="relative z-50"><Navbar /></div>

        <section className="relative overflow-hidden border-b border-[#263A50]/35">
          <VirtualLabSectionBackdrop variant="hero" />
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link href="/projects" className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7790A4] transition hover:text-[#EEF4FA]">← Projects</Link>

            <div className="mt-10 grid items-center gap-9 lg:grid-cols-[1.12fr_0.88fr]">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#35D3EB]">Cybersecurity Lab • VMware • Reconnaissance</p>
                <h1 className="mt-4 text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-0.06em] text-[#EEF4FA]">
                  RECONNAISSANCE
                  <span className="block bg-gradient-to-r from-[#705CFF] via-[#35D3EB] to-[#F4B750] bg-clip-text text-transparent">LAB</span>
                </h1>
                <p className="mt-6 max-w-3xl text-sm leading-7 text-[#8FA6B8] md:text-base">
                  A controlled VMware project combining passive information gathering with authorized active reconnaissance against my own virtual machines. The focus was understanding what different tools reveal — and how defenders can use the same information to reduce exposure.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["WHOIS", "DNS", "theHarvester", "netdiscover", "Nmap", "OS fingerprinting", "service detection"].map((item) => (
                    <span key={item} className="rounded-full border border-[#263A50]/40 bg-[#0D1522]/70 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#C2D0DB]">{item}</span>
                  ))}
                </div>
              </div>
              <LabTopology />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#263A50]/30">
          <VirtualLabSectionBackdrop variant="network" />
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8 lg:py-14">
            <SectionHeading eyebrow="Environment" title="Three systems, one controlled NAT network" description="For the reconnaissance lab, Kali, Metasploitable, and Windows Server were placed on VMware NAT so they could communicate while remaining inside the lab environment." />
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <SystemCard title="Kali Linux" ip="192.168.148.130" role="Reconnaissance workstation" accent="#705CFF" />
              <SystemCard title="Metasploitable 2" ip="192.168.148.129" role="Intentionally vulnerable target" accent="#F4B750" />
              <SystemCard title="Windows Server 2022" ip="192.168.148.128" role="Second authorized OS target" accent="#35D3EB" />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#263A50]/30">
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8 lg:py-14">
            <SectionHeading eyebrow="Method" title="Passive first, active second" description="I separated public-source information gathering from direct interaction with my own lab targets." />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <MethodCard label="Passive reconnaissance" accent="#35D3EB" items={["WHOIS → registration and name-server information", "nslookup → public DNS resolution", "theHarvester → public email and host/subdomain discovery"]} />
              <MethodCard label="Active reconnaissance" accent="#F4B750" items={["netdiscover → identify live hosts on VMware NAT", "Nmap 1–1000 → identify exposed TCP ports", "Nmap -O → estimate target operating systems", "Nmap -sV → identify service versions"]} />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#263A50]/30">
          <VirtualLabSectionBackdrop variant="evidence" />
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8 lg:py-14">
            <SectionHeading eyebrow="Evidence" title="What the lab actually returned" description="These screenshots come from the real VMware lab rather than generated sample output." />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {evidence.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[24px] border border-[#263A50]/35 bg-[#0D1522]/72">
                  <div className="relative aspect-[16/9] overflow-hidden bg-black/35">
                    <Image src={item.src} alt={item.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className="p-5"><h3 className="text-lg font-bold text-[#EEF4FA]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#8FA6B8]">{item.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#263A50]/30">
          <VirtualLabSectionBackdrop variant="terminal" />
          <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-11 sm:px-6 lg:px-8 lg:py-14">
            <SectionHeading eyebrow="Interactive lab" title="Try the commands without touching a real system" description="Each terminal below is a safe front-end simulation. It accepts only a fixed whitelist of commands and replays representative or observed lab output — nothing is executed on the viewer's device or on a network." />
            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              {terminals.map((profile) => <InteractiveTerminal key={profile.id} profile={profile} />)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#263A50]/30">
          <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-11 sm:px-6 lg:px-8 lg:py-14">
            <SectionHeading eyebrow="Interpretation" title="The same information helps both sides" description="Reconnaissance is useful because it turns a network into a set of observable facts. What happens next depends on who is using those facts and why." />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <PerspectiveCard title="Defender perspective" accent="#4ADE80" items={["Find services that should not be exposed.", "Compare discovered hosts with the expected asset inventory.", "Identify old or unnecessary software versions.", "Check whether firewall rules and segmentation are working as intended."]} />
              <PerspectiveCard title="Attacker perspective" accent="#F4B750" items={["Map reachable systems and services.", "Identify technology and operating-system clues.", "Prioritize systems with a larger exposed attack surface.", "Use public information to better understand the target environment."]} />
            </div>
            <div className="mt-5 rounded-[22px] border border-[#F87171]/20 bg-[#F87171]/[0.045] p-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#FCA5A5]">Scope & ethics</p>
              <p className="mt-3 text-sm leading-7 text-[#9CAEBB]">Active scanning in this project was limited to virtual machines I controlled in the lab. Public-domain reconnaissance was limited to publicly available information. The project is presented for defensive learning and does not encourage scanning systems without authorization.</p>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-[1380px] px-5 py-12 sm:px-6 lg:px-8">
            <div className="rounded-[28px] border border-[#35D3EB]/20 bg-gradient-to-br from-[#101A2A] via-[#0D1522] to-[#080C14] p-7 md:p-9">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#F4B750]">Build notes</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#EEF4FA] md:text-5xl">The project starts before the first scan.</h2>
              <p className="mt-5 max-w-4xl text-sm leading-7 text-[#8FA6B8] md:text-base">The most useful part of this project was building the environment itself: choosing VMware network modes, configuring Windows Server, installing Kali, controlling Metasploitable exposure, and troubleshooting the small setup mistakes that made the final reconnaissance possible.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/blog/virtualization-lab" className="rounded-full border border-[#35D3EB]/30 bg-[#35D3EB]/10 px-5 py-2.5 text-sm font-semibold text-[#C9F7FB]">Read the VM setup articles →</Link>
                <Link href="/projects" className="rounded-full border border-[#263A50]/40 bg-[#080C14]/60 px-5 py-2.5 text-sm font-semibold text-[#8FA6B8]">Back to Projects</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </VirtualLabTheme>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="max-w-5xl"><p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#35D3EB]">{eyebrow}</p><h2 className="mt-3 text-3xl font-black leading-[0.98] tracking-[-0.04em] text-[#EEF4FA] sm:text-4xl lg:text-5xl">{title}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#8FA6B8]">{description}</p></div>;
}

function LabTopology() {
  return (
    <div className="[perspective:1100px]">
      <div className="relative mx-auto aspect-square w-full max-w-[470px]" style={{ transform: "rotateX(5deg) rotateY(-5deg)" }}>
        <div className="absolute inset-[22%] flex items-center justify-center rounded-full border border-[#35D3EB]/22 bg-[#0D1522]/80 shadow-[0_30px_80px_rgba(0,0,0,0.3)]"><div className="text-center"><p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#7790A4]">VMware NAT</p><p className="mt-2 text-xl font-black text-[#35D3EB]">192.168.148.0/24</p></div></div>
        {[["KALI", "192.168.148.130", "left-[4%] top-[14%]", "#705CFF"], ["META", "192.168.148.129", "right-[2%] top-[44%]", "#F4B750"], ["SERVER", "192.168.148.128", "left-[8%] bottom-[8%]", "#35D3EB"]].map(([name, ip, pos, accent]) => (
          <div key={name} className={`absolute ${pos} rounded-[18px] border border-[#263A50]/40 bg-[#080C14]/88 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.25)]`}><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} /><p className="font-mono text-[8px] font-bold text-[#EEF4FA]">{name}</p></div><p className="mt-1 text-[10px] text-[#7790A4]">{ip}</p></div>
        ))}
      </div>
    </div>
  );
}

function SystemCard({ title, ip, role, accent }: { title: string; ip: string; role: string; accent: string }) {
  return <article className="rounded-[21px] border border-[#263A50]/35 bg-[#0D1522]/72 p-5"><div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: accent }} /><p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#7790A4]">{ip}</p></div><h3 className="mt-4 text-xl font-bold text-[#EEF4FA]">{title}</h3><p className="mt-2 text-sm text-[#8FA6B8]">{role}</p></article>;
}

function MethodCard({ label, accent, items }: { label: string; accent: string; items: string[] }) {
  return <article className="rounded-[24px] border border-[#263A50]/35 bg-[#0D1522]/72 p-6"><div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: accent }} /><h3 className="mt-4 text-2xl font-black tracking-tight text-[#EEF4FA]">{label}</h3><div className="mt-5 space-y-2">{items.map((item) => <div key={item} className="rounded-[14px] border border-[#263A50]/30 bg-[#080C14]/55 px-4 py-3 text-sm leading-6 text-[#9FB2C0]">{item}</div>)}</div></article>;
}

function PerspectiveCard({ title, accent, items }: { title: string; accent: string; items: string[] }) {
  return <article className="rounded-[24px] border border-[#263A50]/35 bg-[#0D1522]/72 p-6"><div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: accent }} /><h3 className="text-xl font-bold text-[#EEF4FA]">{title}</h3></div><div className="mt-5 space-y-3">{items.map((item) => <div key={item} className="flex gap-3 text-sm leading-7 text-[#8FA6B8]"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} /><span>{item}</span></div>)}</div></article>;
}
