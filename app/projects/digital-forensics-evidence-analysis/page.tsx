import Link from "next/link";

import Navbar from "@/components/Navbar";
import SectionPageTheme from "@/components/themes/SectionPageTheme";

const workflow = [
  {
    number: "01",
    title: "Evidence Image",
    description:
      "Work from a forensic image instead of modifying the original storage media.",
  },
  {
    number: "02",
    title: "Case Creation",
    description:
      "Create a structured investigation case and register the evidence source.",
  },
  {
    number: "03",
    title: "Forensic Ingest",
    description:
      "Index files, metadata, communications, deleted entries and analysis artifacts.",
  },
  {
    number: "04",
    title: "Artifact Discovery",
    description:
      "Review deleted data, encrypted content and Internet-origin metadata.",
  },
  {
    number: "05",
    title: "Keyword Analysis",
    description:
      "Search for relevant people, organizations, technical terms and document topics.",
  },
  {
    number: "06",
    title: "Evidence Correlation",
    description:
      "Connect communications, metadata and file relationships into meaningful findings.",
  },
  {
    number: "07",
    title: "Reporting",
    description:
      "Tag findings, document context and produce a structured forensic report.",
  },
];

const skills = [
  "Digital Forensics",
  "Autopsy",
  "E01 Evidence Images",
  "Evidence Integrity",
  "Cryptographic Hashing",
  "NTFS Artifact Analysis",
  "Deleted File Recovery",
  "Email Forensics",
  "Metadata Analysis",
  "Keyword Searching",
  "Encrypted File Detection",
  "Evidence Correlation",
  "Forensic Reporting",
];

const ingestModules = [
  "File Type Identification",
  "Deleted File Detection",
  "Email Parsing",
  "Encryption Detection",
  "Web Activity",
  "Keyword Indexing",
];

const takeaways = [
  {
    title: "Preserve First",
    description:
      "Analyze forensic copies instead of altering original evidence.",
  },
  {
    title: "Context Matters",
    description:
      "Artifacts become meaningful when correlated with surrounding evidence.",
  },
  {
    title: "Metadata Is Evidence",
    description:
      "Metadata can reveal information that is not obvious from file contents alone.",
  },
  {
    title: "Document Everything",
    description:
      "Repeatable analysis and clear reporting are essential to forensic work.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#35D3EB]">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#EDF4F6] sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-[15px] leading-7 text-[#8FA4AD]">
          {description}
        </p>
      )}
    </div>
  );
}

export default function DigitalForensicsEvidenceAnalysisPage() {
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
            className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 font-mono text-[9rem] font-black tracking-[-0.08em] text-[#EDF4F6]/[0.018] xl:block"
          >
            DFIR
          </div>

          <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-12 sm:px-6 md:py-14 lg:px-8">
            <Link
              href="/projects"
              className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8FA4AD] transition hover:text-[#35D3EB]"
            >
              ← Projects
            </Link>

            <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#35D3EB]">
                  Cybersecurity / Digital Forensics
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.65rem,5vw,4.7rem)] font-black leading-[0.95] tracking-[-0.05em] text-[#EDF4F6]">
                  Digital Forensics Investigation &amp; Evidence Analysis
                </h1>

                <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#8FA4AD]">
                  A structured forensic workflow using Autopsy to examine an E01
                  disk image, recover deleted artifacts, analyze communications
                  and metadata, detect encrypted content, correlate findings and
                  produce a defensible investigation report.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Autopsy",
                    "E01",
                    "Digital Forensics",
                    "Metadata",
                    "Keyword Search",
                    "DFIR",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#263640]/60 bg-[#111A22]/70 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#AFC0C8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Evidence Format", "E01"],
                  ["Platform", "Autopsy"],
                  ["Techniques", "6+"],
                  ["Output", "Forensic Report"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[16px] border border-[#263640]/45 bg-[#111A22]/75 p-4"
                  >
                    <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#6FAFC2]">
                      {label}
                    </p>

                    <p className="mt-2 text-lg font-bold tracking-[-0.02em] text-[#EDF4F6]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Overview"
            title="A practical forensic workflow."
            description="This project demonstrates a structured digital-forensics investigation using a forensic image of removable media. The analysis focused on evidence preservation, file-system artifacts, deleted information, encrypted content, communications, targeted keyword searches and correlation of findings."
          />

          <div className="mt-7 rounded-[18px] border border-[#35D3EB]/20 bg-[#0E1820] p-5 sm:p-6">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#35D3EB]">
              Evidence handling
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-[#9EB0B8]">
              Project details have been intentionally generalized. No forensic
              screenshots, extracted evidence, personal identifiers, original
              communications, evidence hashes or case-specific artifacts are
              published on this portfolio page.
            </p>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="border-y border-[#263640]/35 bg-[#0D151C]/55">
          <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Investigation Workflow"
              title="From forensic image to findings."
            />

            <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {workflow.map((step) => (
                <article
                  key={step.number}
                  className="rounded-[18px] border border-[#263640]/45 bg-[#111A22]/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#35D3EB]/25"
                >
                  <span className="font-mono text-[9px] text-[#35D3EB]">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-[#EDF4F6]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#8FA4AD]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRITY */}
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Evidence Integrity"
            title="Preserve the source. Analyze the image."
            description="The investigation used an E01 forensic image as the analysis source. Working from a forensic image helps preserve the original media and supports repeatable examination."
          />

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Evidence Format", "E01"],
              ["Integrity Check", "MD5 / SHA-256"],
              ["Analysis Method", "Forensic Image"],
              ["Original Media", "Preserved"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[16px] border border-[#263640]/45 bg-[#111A22]/70 p-5"
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#6FAFC2]">
                  {label}
                </p>

                <p className="mt-2 font-semibold text-[#EDF4F6]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INGEST */}
        <section className="border-y border-[#263640]/35 bg-[#0D151C]/55">
          <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Forensic Ingest"
              title="Automated artifact discovery."
              description="Autopsy ingest modules classified and indexed the evidence so relevant artifacts could be located and reviewed efficiently."
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ingestModules.map((module) => (
                <div
                  key={module}
                  className="flex items-center gap-3 rounded-[15px] border border-[#263640]/45 bg-[#111A22]/70 px-4 py-4"
                >
                  <span className="h-2 w-2 rounded-full bg-[#35D3EB]" />

                  <span className="text-sm font-medium text-[#C8D4D9]">
                    {module}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ANALYSIS */}
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Artifact Analysis"
            title="Examining multiple evidence sources."
            description="The investigation combined file-system analysis with communications, metadata and automated artifact detection."
          />

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Deleted File Analysis",
                text: "Reviewed deleted entries, allocation state, metadata and recoverable content.",
              },
              {
                title: "Communication Analysis",
                text: "Examined senders, recipients, timestamps, message context and related file activity.",
              },
              {
                title: "Encrypted Content",
                text: "Identified protected archives and examined their relationships to surrounding files.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-[#263640]/45 bg-[#111A22]/70 p-5"
              >
                <h3 className="text-lg font-bold tracking-[-0.02em] text-[#EDF4F6]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#8FA4AD]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CORRELATION */}
        <section className="border-y border-[#263640]/35 bg-[#0D151C]/55">
          <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Evidence Correlation"
              title="Search hits are leads. Context makes findings."
              description="Targeted searches located references across files, metadata and communications. Individual hits were correlated with surrounding evidence instead of being treated as conclusions on their own."
            />

            <div className="mt-7 rounded-[18px] border border-[#35D3EB]/20 bg-[#0E1820] p-5 sm:p-6">
              <div className="grid gap-3 text-center font-mono text-[10px] text-[#C8D4D9] sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
                <span>Keyword Hit</span>
                <span className="text-[#35D3EB]">+</span>
                <span>Email Artifact</span>
                <span className="text-[#35D3EB]">+</span>
                <span>File Metadata</span>
                <span className="text-[#35D3EB]">+</span>
                <span>Encrypted Archive</span>
              </div>

              <div className="my-5 text-center text-[#35D3EB]">↓</div>

              <p className="text-center text-sm font-semibold text-[#EDF4F6]">
                Correlated Finding
              </p>
            </div>
          </div>
        </section>

        {/* INTERNET METADATA */}
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Internet-Origin Metadata"
                title="Using metadata to add context."
                description="Windows alternate data streams associated with downloaded files were examined as potential indicators that files originated outside the local system."
              />

              <div className="mt-6 rounded-[18px] border border-[#263640]/45 bg-[#111A22]/70 p-5">
                <div className="space-y-2 text-center font-mono text-[10px] text-[#AFC0C8]">
                  <p>Downloaded File</p>
                  <p className="text-[#35D3EB]">↓</p>
                  <p>Zone.Identifier</p>
                  <p className="text-[#35D3EB]">↓</p>
                  <p>ZoneId</p>
                  <p className="text-[#35D3EB]">↓</p>
                  <p className="font-semibold text-[#EDF4F6]">
                    Internet-Origin Indicator
                  </p>
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Investigative Findings"
                title="Artifacts become meaningful when correlated."
                description="Communications, deleted-file records, encrypted archives, file metadata and keyword hits collectively provided more investigative context than any single artifact viewed in isolation."
              />

              <div className="mt-6 rounded-[18px] border border-[#263640]/45 bg-[#111A22]/70 p-5">
                <p className="text-sm leading-7 text-[#9EB0B8]">
                  The portfolio presentation intentionally focuses on forensic
                  methodology and investigative reasoning rather than publishing
                  case-specific content or evidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REPORTING */}
        <section className="border-y border-[#263640]/35 bg-[#0D151C]/55">
          <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Reporting"
              title="Documenting a repeatable investigation."
              description="Relevant artifacts were tagged, contextual notes were recorded and a structured forensic report was produced as the final investigation output."
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-5">
              {["Identify", "Validate", "Tag", "Document", "Report"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="rounded-[15px] border border-[#263640]/45 bg-[#111A22]/70 p-4 text-center"
                  >
                    <p className="font-mono text-[8px] text-[#35D3EB]">
                      0{index + 1}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#EDF4F6]">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Skills" title="Techniques demonstrated." />

          <div className="mt-7 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[#263640]/55 bg-[#111A22]/70 px-3 py-2 text-xs text-[#C8D4D9]"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-14">
            <SectionHeading
              eyebrow="Takeaways"
              title="What this project reinforced."
            />

            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {takeaways.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[18px] border border-[#263640]/45 bg-[#111A22]/70 p-5"
                >
                  <h3 className="font-bold text-[#EDF4F6]">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#8FA4AD]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/projects"
              className="rounded-full border border-[#35D3EB]/35 bg-[#35D3EB]/10 px-5 py-2.5 text-sm font-semibold text-[#CFF8FF] transition hover:bg-[#35D3EB]/15"
            >
              ← Back to projects
            </Link>
          </div>
        </section>
      </main>
    </SectionPageTheme>
  );
}