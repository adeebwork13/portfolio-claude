import Link from "next/link";

import Navbar from "@/components/Navbar";
import SectionPageTheme from "@/components/themes/SectionPageTheme";

const projects = [
  {
    category: "Cybersecurity • VMware",
    title: "Reconnaissance Lab",
    description:
      "Passive reconnaissance and authorized active scanning inside a controlled VMware environment, with interactive command simulations.",
    href: "/projects/reconnaissance-lab",
    status: "Featured",
    accent: "#A99CFF",
  },
  {
    category: "Electronics",
    title: "How Transistors Work",
    description:
      "An interactive visual explanation of transistor switching, amplification and semiconductor fundamentals.",
    href: "/blog/how-transistors-work",
    status: "Interactive",
    accent: "#A9D6E5",
  },
  {
    category: "Web Development",
    title: "Personal Portfolio",
    description:
      "The portfolio itself, built with Next.js, TypeScript, Tailwind and interactive technical content.",
    href: "/",
    status: "Active",
    accent: "#6FAFC2",
  },
  {
    category: "Cybersecurity",
    title: "Virtualization Security Lab",
    description:
      "Windows Server, Windows client, Kali Linux, Metasploitable, VMware networking and DHCP configuration.",
    href: "/blog/virtualization-lab",
    status: "Growing",
    accent: "#35D3EB",
  },
  {
    category: "Developer Tools",
    title: "Git Learning Hub",
    description:
      "Repositories, commits, branches, remotes and development workflows.",
    href: "#",
    status: "In Progress",
    accent: "#8FA4AD",
  },
  {
    category: "Cloud & DevOps",
    title: "Cloud & DevOps",
    description:
      "Infrastructure, deployment, containers and automation projects.",
    href: "#",
    status: "Coming Soon",
    accent: "#8FA4AD",
  },
  {
    category: "Cybersecurity • Virtualization • Linux",
    title: "Cybersecurity Lab Environment & Linux Foundations",
    description:
      "A controlled cybersecurity lab built with VirtualBox, Kali Linux and Metasploitable, covering virtual networking, connectivity testing, Wireshark packet analysis, Packet Tracer, Python and Linux system administration.",
    href: "/projects/cybersecurity-lab-environment-linux-foundations",
    status: "Completed",
    accent: "#35D3EB",
  },
  {
    category: "Cybersecurity • IDPS",
    title: "Flow-Based Intrusion Detection Lab",
    description:
      "A network-monitoring pipeline using PyShark, Wireshark and NTLFlowLyzer to capture traffic, extract flow features, compare benign and scan behaviour, and correlate suspicious flows into intrusion alerts.",
    href: "/projects/flow-based-intrusion-detection-lab",
    status: "Completed",
    accent: "#35D3EB",
  },
  {
    category: "Cybersecurity • Digital Forensics",
    title: "Digital Forensics Investigation & Evidence Analysis",
    description:
      "A forensic investigation workflow using Autopsy to examine an E01 disk image, recover deleted artifacts, analyze metadata and communications, detect encrypted content, correlate findings, and produce a structured forensic report.",
    href: "/projects/digital-forensics-evidence-analysis",
    status: "Completed",
    accent: "#35D3EB",
  },

  {
    category: "Cybersecurity • Network Security",
    title: "Encrypted Network Communication & Traffic Analysis",
    description:
      "Built a three-system security environment to compare plaintext and encrypted TCP communication, analyze captured traffic with Wireshark, exchange public keys, decrypt protected files, and verify digital signatures.",
    href: "/projects/encrypted-network-communication-traffic-analysis",
    status: "Completed",
    accent: "#8B5CF6",
  },

];

export default function ProjectsPage() {
  return (
    <SectionPageTheme>
      <main className="min-h-screen">
        <div className="relative z-50">
          <Navbar />
        </div>

        <section className="relative overflow-hidden border-b border-[#263640]/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 text-[10rem] font-black tracking-[-0.08em] text-[#EDF4F6]/[0.018] xl:block"
          >
            WORK
          </div>

          <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-12 sm:px-6 md:py-14 lg:px-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6FAFC2]">
              Projects / Selected Work
            </p>

            <h1 className="mt-4 max-w-3xl text-[clamp(2.8rem,5vw,4.8rem)] font-black leading-[0.94] tracking-[-0.05em] text-[#EDF4F6]">
              Things I&apos;m building.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#8FA4AD]">
              Projects that turn what I&apos;m learning into practical,
              interactive and visual work.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>
      </main>
    </SectionPageTheme>
  );
}

function ProjectCard({
  category,
  title,
  description,
  href,
  status,
  accent,
}: {
  category: string;
  title: string;
  description: string;
  href: string;
  status: string;
  accent: string;
}) {
  const disabled = href === "#";

  const card = (
    <article
      className={`group relative h-full overflow-hidden rounded-[18px] border p-5 transition duration-300 ${
        disabled
          ? "border-[#263640]/25 bg-[#111A22]/40"
          : "border-[#263640]/40 bg-[#111A22]/70 hover:-translate-y-0.5 hover:border-[#6FAFC2]/45 hover:bg-[#14202A]"
      }`}
    >
      <div
        className="absolute left-0 top-0 h-full w-[2px]"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-center justify-between gap-4">
        <p
          className="font-mono text-[8px] uppercase tracking-[0.16em]"
          style={{ color: accent }}
        >
          {category}
        </p>

        <span className="rounded-full border border-[#263640]/40 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#8FA4AD]">
          {status}
        </span>
      </div>

      <h2
        className={`mt-5 text-xl font-bold tracking-[-0.025em] ${
          disabled ? "text-[#EDF4F6]/45" : "text-[#EDF4F6]"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-3 text-sm leading-6 ${
          disabled ? "text-[#8FA4AD]/35" : "text-[#8FA4AD]"
        }`}
      >
        {description}
      </p>

      {!disabled && (
        <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#C8D4D9]">
          View project
          <span className="transition group-hover:translate-x-1">→</span>
        </div>
      )}
    </article>
  );

  if (disabled) return card;

  return <Link href={href}>{card}</Link>;
}