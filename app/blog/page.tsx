import Link from "next/link";

import Navbar from "@/components/Navbar";
import SectionPageTheme from "@/components/themes/SectionPageTheme";

const articles = [
  {
    category: "Virtualization • Cybersecurity",
    title: "Building My VMware Security Lab",
    description:
      "Windows Server 2022, Windows 10, Kali Linux and Metasploitable — including VMware networking, troubleshooting and the questions I had while building the lab.",
    href: "/blog/virtualization-lab",
    accent: "violet",
  },
  {
    category: "NIST • Cybersecurity Framework",
    title: "NIST CSF 2.0 — GOVERN",
    description:
      "Organizational context, compliance, risk appetite, enterprise risk management and cybersecurity governance explained visually.",
    href: "/blog/nist/csf-govern-function",
    accent: "blue",
  },
  {
    category: "Information & Network Security",
    title: "Introduction to Network Security",
    description:
      "Networking fundamentals, OSI and TCP/IP, addressing, threats, vulnerabilities, attacks and the principles behind secure systems.",
    href: "/blog/information-and-network-security/introduction-to-information-and-network-security",
    accent: "cyan",
  },
  {
    category: "Electronics",
    title: "How Transistors Work",
    description:
      "An interactive explanation of transistor switching, amplification and semiconductor fundamentals.",
    href: "/blog/how-transistors-work",
    accent: "ice",
  },
];

const topics = [
  {
    title: "Virtualization Lab",
    description: "VMware, Windows Server, Kali, networking and lab setup.",
    href: "/blog/virtualization-lab",
    accent: "#A99CFF",
  },
  {
    title: "NIST",
    description: "Frameworks, governance, risk and security controls.",
    href: "/blog/nist",
    accent: "#7CC7E8",
  },
  {
    title: "Network Security",
    description: "Networking, threats, vulnerabilities and defensive concepts.",
    href: "/blog/information-and-network-security/introduction-to-information-and-network-security",
    accent: "#76D7E8",
  },
  {
    title: "Electronics",
    description: "Circuits, semiconductors and hardware fundamentals.",
    href: "/blog/how-transistors-work",
    accent: "#B8D8E5",
  },
  {
    title: "AI & Technology",
    description: "AI systems, experiments and emerging technology.",
    href: "#",
    accent: "#8FA4AD",
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure, automation and deployment workflows.",
    href: "#",
    accent: "#8FA4AD",
  },
];

export default function BlogPage() {
  return (
    <SectionPageTheme>
      <main className="min-h-screen">
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[#263640]/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[3%] top-1/2 hidden -translate-y-1/2 select-none text-[10rem] font-black tracking-[-0.08em] text-[#EDF4F6]/[0.018] xl:block"
          >
            BLOG
          </div>

          <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-12 sm:px-6 md:py-14 lg:px-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6FAFC2]">
              Blog / Learning Notes
            </p>

            <h1 className="mt-4 max-w-3xl text-[clamp(2.8rem,5vw,4.8rem)] font-black leading-[0.94] tracking-[-0.05em] text-[#EDF4F6]">
              Things I&apos;m learning.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#8FA4AD]">
              Notes, experiments and visual explanations from cybersecurity,
              networking, electronics, AI, software and engineering.
            </p>
          </div>
        </section>

        {/* LATEST */}
        <section className="border-b border-[#263640]/30">
          <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#6FAFC2]">
                  Latest
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#EDF4F6] sm:text-3xl">
                  Latest Articles
                </h2>
              </div>

              <p className="hidden text-sm text-[#8FA4AD] md:block">
                Recent learning notes and experiments
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* TOPICS */}
        <section>
          <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-6 lg:px-8">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#6FAFC2]">
              Browse
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#EDF4F6] sm:text-3xl">
              Topics
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => (
                <TopicCard key={topic.title} {...topic} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </SectionPageTheme>
  );
}

function ArticleCard({
  category,
  title,
  description,
  href,
  accent,
}: {
  category: string;
  title: string;
  description: string;
  href: string;
  accent: string;
}) {
  const accentColor =
    accent === "violet"
      ? "#A99CFF"
      : accent === "blue"
        ? "#7CC7E8"
        : accent === "cyan"
          ? "#76D7E8"
          : "#B8D8E5";

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[18px] border border-[#263640]/45 bg-[#111A22]/75 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#6FAFC2]/45 hover:bg-[#14202A]"
    >
      <div
        className="absolute left-0 top-0 h-full w-[2px] opacity-70"
        style={{ backgroundColor: accentColor }}
      />

      <p
        className="font-mono text-[8px] uppercase tracking-[0.16em]"
        style={{ color: accentColor }}
      >
        {category}
      </p>

      <h3 className="mt-3 text-xl font-bold tracking-[-0.025em] text-[#EDF4F6]">
        {title}
      </h3>

      <p className="mt-3 max-w-xl text-sm leading-6 text-[#8FA4AD]">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#C8D4D9]">
        Read article
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

function TopicCard({
  title,
  description,
  href,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  accent: string;
}) {
  const disabled = href === "#";

  const content = (
    <div
      className={`h-full rounded-[16px] border p-4 transition duration-300 ${
        disabled
          ? "border-[#263640]/25 bg-[#111A22]/40"
          : "border-[#263640]/40 bg-[#111A22]/65 hover:border-[#6FAFC2]/40 hover:bg-[#14202A]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3
          className={`text-base font-semibold ${
            disabled ? "text-[#EDF4F6]/45" : "text-[#EDF4F6]"
          }`}
        >
          {title}
        </h3>

        {!disabled && (
          <span style={{ color: accent }} className="text-sm">
            →
          </span>
        )}
      </div>

      <p
        className={`mt-2 text-xs leading-5 ${
          disabled ? "text-[#8FA4AD]/35" : "text-[#8FA4AD]"
        }`}
      >
        {description}
      </p>
    </div>
  );

  if (disabled) return content;

  return <Link href={href}>{content}</Link>;
}