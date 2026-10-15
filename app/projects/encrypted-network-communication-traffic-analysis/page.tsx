import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import SectionPageTheme from "@/components/themes/SectionPageTheme";

export const metadata: Metadata = {
  title: "Encrypted Network Communication & Traffic Analysis | Adeeb Nizar",
  description:
    "A cybersecurity project demonstrating plaintext interception, asymmetric encryption, Wireshark traffic analysis, GPG key exchange, digital signatures, and tamper detection.",
};

const tools = [
  "VMware Workstation",
  "Windows 10",
  "Ubuntu Linux",
  "Kali Linux",
  "GnuPG / Gpg4win",
  "Wireshark",
  "Ncat",
  "TCP/IP",
];

const outcomes = [
  {
    number: "01",
    title: "Observed plaintext exposure",
    text: "Captured an unencrypted TCP file transfer and demonstrated how application data can be reconstructed directly from network traffic.",
  },
  {
    number: "02",
    title: "Implemented asymmetric encryption",
    text: "Generated RSA key pairs, exchanged public keys, and encrypted data for a specific recipient using GPG.",
  },
  {
    number: "03",
    title: "Analyzed encrypted traffic",
    text: "Captured the encrypted transfer from a passive monitoring system and compared ciphertext with the original plaintext session.",
  },
  {
    number: "04",
    title: "Verified integrity and authenticity",
    text: "Created detached digital signatures and demonstrated successful verification as well as signature failure after file modification.",
  },
];

export default function EncryptedNetworkCommunicationPage() {
  return (
    <SectionPageTheme>
      <main className="relative min-h-screen overflow-x-hidden bg-[#0D0912] text-[#F4F1F7]">
        <SecurityBackground />

        <div className="relative z-50">
          <Navbar />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pb-24 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8E8795] transition hover:text-[#5EEAD4]"
          >
            <span>←</span>
            Projects
          </Link>

          <section className="pb-20 pt-14">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-violet-200">
                Cybersecurity
              </span>
              <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-teal-200">
                Cryptography
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#817A89]">
                Completed
              </span>
            </div>

            <h1 className="max-w-5xl text-[clamp(2.8rem,6vw,5.4rem)] font-black leading-[0.92] tracking-[-0.055em]">
              Encrypted Network
              <span className="block text-[#9E8AFB]">
                Communication &amp; Traffic Analysis
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-[15px] leading-8 text-[#BDB6C5] md:text-lg">
              A controlled security project exploring how plaintext network
              communication can be intercepted, how asymmetric cryptography
              protects transmitted data, and how digital signatures provide
              integrity and authentication.
            </p>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
              {[
                ["3", "Virtual systems"],
                ["RSA", "Public-key crypto"],
                ["TCP", "Traffic analysis"],
                ["GPG", "Signing + encryption"],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#120E18] p-5">
                  <div className="text-xl font-semibold text-[#63E6D5]">{value}</div>
                  <div className="mt-1 text-xs text-[#88818F]">{label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-t border-white/10 py-16 md:grid-cols-[0.75fr_1.6fr]">
            <SectionLabel>Overview</SectionLabel>
            <div className="space-y-6 text-[15px] leading-7 text-[#BDB6C5]">
              <p>
                The project was built around three isolated virtual systems:
                Windows acted as the sender, Ubuntu as the intended receiver,
                and Kali Linux as a passive network observer.
              </p>
              <p>
                The environment was first used to establish a baseline by
                transferring a plaintext file over TCP. Packet inspection showed
                that the transferred contents could be reconstructed directly
                from captured traffic.
              </p>
              <p>
                The same communication was then protected using GPG public-key
                encryption. The observer could still identify the connection and
                capture packets, but the application payload was no longer
                readable without the recipient&apos;s private key.
              </p>
            </div>
          </section>

          <section className="border-t border-white/10 py-16">
            <SectionLabel>Lab Architecture</SectionLabel>
            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <Machine label="Sender" title="Windows 10" detail="GPG encryption · Ncat" />
              <Arrow label="TCP" />
              <Machine label="Receiver" title="Ubuntu Linux" detail="Private-key decryption" />
              <Arrow label="Observe" />
              <Machine label="Passive Observer" title="Kali Linux" detail="Wireshark traffic analysis" />
            </div>
          </section>

          <section className="grid gap-10 border-t border-white/10 py-16 md:grid-cols-[0.75fr_1.6fr]">
            <SectionLabel>The Problem</SectionLabel>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                TCP delivers data. It does not automatically protect it.
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#BDB6C5]">
                A basic TCP connection can successfully move a file between two
                systems while still exposing the application payload to anyone
                positioned to capture the traffic. This project compares that
                baseline with encrypted communication.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-[#15101D] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm text-[#8E8795]">Passive TCP inspection</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-rose-300">
                    Plaintext
                  </span>
                </div>
                <div className="font-mono text-sm leading-7 text-[#E7E2EB]">
                  <p>TCP stream reconstructed</p>
                  <p className="text-rose-300">Application contents visible to observer</p>
                  <p className="text-[#746D7B]">No encryption layer protecting payload</p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 py-16">
            <SectionLabel>Public-Key Cryptography</SectionLabel>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-[-0.03em]">
              Public keys can be shared openly. Private keys remain with their owners.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <KeyCard title="Windows" publicUse="Shared with Ubuntu" privateUse="Used to create signatures" />
              <KeyCard title="Ubuntu" publicUse="Shared with Windows" privateUse="Used to decrypt received data" />
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-[#98919F]">
              A passive observer may capture exchanged public keys. That does
              not provide the corresponding private keys required to decrypt
              protected data or generate authentic signatures.
            </p>
          </section>

          <section className="border-t border-white/10 py-16">
            <SectionLabel>Encrypted Communication</SectionLabel>
            <div className="mt-8 rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-teal-300/[0.04] p-7 md:p-10">
              <div className="grid gap-5 md:grid-cols-5 md:items-center">
                <FlowBlock title="Plaintext" detail="Original data" />
                <FlowArrow />
                <FlowBlock title="Ubuntu Public Key" detail="Encryption" accent />
                <FlowArrow />
                <FlowBlock title="Ciphertext" detail="Unreadable in capture" />
              </div>
              <div className="my-8 h-px bg-white/10" />
              <div className="grid gap-5 md:grid-cols-5 md:items-center">
                <FlowBlock title="Ciphertext" detail="Received by Ubuntu" />
                <FlowArrow />
                <FlowBlock title="Ubuntu Private Key" detail="Decryption" accent />
                <FlowArrow />
                <FlowBlock title="Plaintext" detail="Original bytes restored" />
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 py-16">
            <SectionLabel>Traffic Analysis</SectionLabel>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <TrafficCard
                status="Exposed"
                title="Plaintext TCP transfer"
                text="The passive observer could reconstruct the TCP stream and inspect the application data directly."
                encrypted={false}
              />
              <TrafficCard
                status="Protected"
                title="GPG-encrypted transfer"
                text="The observer could still see endpoints, ports, packet sizes, and timing, but the transferred payload appeared as ciphertext."
                encrypted
              />
            </div>
            <p className="mt-7 max-w-3xl text-sm leading-7 text-[#98919F]">
              Encryption protects the payload, not all network metadata. Packet
              capture can still reveal that communication occurred, along with
              characteristics such as source, destination, protocol, packet size,
              timing, and connection duration.
            </p>
          </section>

          <section className="border-t border-white/10 py-16">
            <SectionLabel>Digital Signatures</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Encryption protects confidentiality. Signatures protect trust.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Concept title="Confidentiality" text="Recipient public key encrypts. Recipient private key decrypts." />
              <Concept title="Authenticity" text="Sender private key creates the signature. Sender public key verifies it." />
              <Concept title="Integrity" text="Changing the signed file invalidates the original signature." />
            </div>
          </section>

          <section className="border-t border-white/10 py-16">
            <SectionLabel>Tamper Detection</SectionLabel>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-teal-300/20 bg-teal-300/[0.05] p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-teal-300">Original</p>
                <p className="mt-4 font-mono text-lg text-teal-200">Good signature</p>
                <p className="mt-3 text-sm leading-6 text-[#AAA3B0]">
                  The received document matched the data originally signed using the sender&apos;s private key.
                </p>
              </div>

              <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.05] p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-300">Modified</p>
                <p className="mt-4 font-mono text-lg text-rose-300">BAD signature</p>
                <p className="mt-3 text-sm leading-6 text-[#AAA3B0]">
                  After the document was modified, the original detached signature could no longer be validated.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 py-16">
            <SectionLabel>What I Implemented</SectionLabel>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {outcomes.map((item) => (
                <div key={item.number} className="rounded-2xl border border-white/10 bg-[#120E18]/80 p-6">
                  <span className="font-mono text-xs text-[#6D6573]">{item.number}</span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#9F98A6]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-t border-white/10 py-16 md:grid-cols-[0.75fr_1.6fr]">
            <SectionLabel>Tools &amp; Technologies</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-[#C4BEC9]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-t border-white/10 py-16 md:grid-cols-[0.75fr_1.6fr]">
            <SectionLabel>Key Takeaways</SectionLabel>
            <div className="space-y-5 text-[15px] leading-7 text-[#BDB6C5]">
              <p>
                Encryption does not hide the existence of communication. A
                network observer can still capture packets and analyze metadata,
                but properly encrypted payloads cannot be recovered simply from
                possession of the public key.
              </p>
              <p>
                Public-key cryptography solves different problems depending on
                how the keys are used: public-key encryption provides
                confidentiality, while private-key signatures provide
                authenticity and integrity.
              </p>
              <p>
                The project also highlighted the importance of authenticating
                public keys. Encryption can protect data from passive
                observation, but a secure system must also prevent public-key
                substitution and man-in-the-middle attacks.
              </p>
            </div>
          </section>

          <section className="border-t border-white/10 pb-8 pt-16">
            <div className="rounded-3xl border border-white/10 bg-[#15101D] p-8 md:p-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-teal-300">Result</p>
              <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.025em]">
                A practical demonstration of how cryptography changes what a network observer can learn from captured traffic.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#A8A1AF]">
                The final environment combined network traffic analysis,
                asymmetric encryption, key management, digital signatures, and
                tamper detection into a single end-to-end secure communication workflow.
              </p>
            </div>
          </section>
        </div>
      </main>
    </SectionPageTheme>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-violet-300">
      {children}
    </p>
  );
}

function Machine({ label, title, detail }: { label: string; title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#15101D] p-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#77707E]">{label}</p>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[#918A97]">{detail}</p>
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="hidden text-center md:block">
      <div className="text-lg text-violet-300">→</div>
      <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-[#655E6C]">{label}</div>
    </div>
  );
}

function KeyCard({ title, publicUse, privateUse }: { title: string; publicUse: string; privateUse: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#15101D] p-6">
      <p className="text-lg font-semibold">{title}</p>
      <div className="mt-6 space-y-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-teal-300">Public key</p>
          <p className="mt-1 text-sm text-[#AFA8B5]">{publicUse}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-violet-300">Private key</p>
          <p className="mt-1 text-sm text-[#AFA8B5]">{privateUse}</p>
        </div>
      </div>
    </div>
  );
}

function FlowBlock({ title, detail, accent = false }: { title: string; detail: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? "border-violet-400/30 bg-violet-400/10" : "border-white/10 bg-[#100C15]"}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-[#837C8A]">{detail}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="text-center text-lg text-[#716A78]">
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </div>
  );
}

function TrafficCard({ status, title, text, encrypted }: { status: string; title: string; text: string; encrypted: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#15101D] p-6">
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[9px] uppercase tracking-[0.18em] ${encrypted ? "text-teal-300" : "text-rose-300"}`}>
          {status}
        </span>
        <span className="font-mono text-xs text-[#6E6774]">TCP</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#A19AA8]">{text}</p>
      <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4 font-mono text-xs leading-6">
        {encrypted ? (
          <>
            <p className="text-[#857E8B]">packet payload</p>
            <p className="break-all text-teal-200">8f 3a 71 c2 09 e4 a8 1d 7b 26 ...</p>
          </>
        ) : (
          <>
            <p className="text-[#857E8B]">packet payload</p>
            <p className="text-rose-200">Readable application data</p>
          </>
        )}
      </div>
    </div>
  );
}

function Concept({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#15101D] p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#99929F]">{text}</p>
    </div>
  );
}

function SecurityBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[4%] top-[6%] h-[440px] w-[440px] rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="absolute bottom-[8%] right-[3%] h-[420px] w-[420px] rounded-full bg-teal-300/[0.08] blur-[140px]" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <svg className="absolute left-[2%] top-[12%] h-[330px] w-[480px] opacity-[0.15]" viewBox="0 0 480 330" fill="none">
        <defs>
          <linearGradient id="networkLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#5EEAD4" />
          </linearGradient>
        </defs>

        <path d="M65 95 C150 35 245 55 325 110" stroke="url(#networkLine)" strokeWidth="1" strokeDasharray="5 8" />
        <path d="M325 110 C365 165 345 225 405 270" stroke="url(#networkLine)" strokeWidth="1" strokeDasharray="5 8" />
        <path d="M65 95 C120 185 210 245 405 270" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 10" opacity="0.55" />

        <circle cx="65" cy="95" r="13" stroke="#8B5CF6" />
        <circle cx="65" cy="95" r="4" fill="#8B5CF6" />
        <circle cx="325" cy="110" r="13" stroke="#5EEAD4" />
        <circle cx="325" cy="110" r="4" fill="#5EEAD4" />
        <circle cx="405" cy="270" r="13" stroke="#A78BFA" />
        <circle cx="405" cy="270" r="4" fill="#A78BFA" />

        <circle r="3.5" fill="#5EEAD4">
          <animateMotion dur="5s" repeatCount="indefinite" path="M65 95 C150 35 245 55 325 110" />
        </circle>
        <circle r="3" fill="#8B5CF6">
          <animateMotion dur="7s" repeatCount="indefinite" path="M65 95 C120 185 210 245 405 270" />
        </circle>

        <text x="42" y="70" fill="#B9A7FF" fontSize="9" fontFamily="monospace">WINDOWS</text>
        <text x="305" y="83" fill="#77E8D8" fontSize="9" fontFamily="monospace">UBUNTU</text>
        <text x="382" y="300" fill="#B9A7FF" fontSize="9" fontFamily="monospace">KALI</text>
      </svg>

      <div className="absolute right-[4%] top-[16%] hidden font-mono text-[10px] leading-5 text-[#81798A]/20 lg:block">
        <p>TCP 53502 → 9876</p>
        <p>SEQ=1 ACK=1</p>
        <p>PSH, ACK</p>
        <p>LEN=389</p>
        <p>WINDOW=64240</p>
      </div>

      <div className="absolute right-[7%] top-[34%] hidden w-[330px] lg:block">
        <div className="mb-5 flex justify-end opacity-[0.12]">
          <svg width="68" height="76" viewBox="0 0 68 76" fill="none">
            <rect x="9" y="31" width="50" height="38" rx="9" stroke="#A78BFA" strokeWidth="2" />
            <path d="M20 31V23C20 13 26 7 34 7C42 7 48 13 48 23V31" stroke="#5EEAD4" strokeWidth="2" />
            <circle cx="34" cy="49" r="4" fill="#5EEAD4" />
            <path d="M34 53V60" stroke="#5EEAD4" strokeWidth="2" />
          </svg>
        </div>
        <div className="font-mono text-[10px] leading-5 text-violet-200/[0.08]">
          <p>RSA-2048 / OPENPGP</p>
          <p>8f 3a 71 c2 09 e4 a8 1d</p>
          <p>7b 26 93 40 1c bd 5f a9</p>
          <p>d4 81 2e 66 0f 71 a3 c2</p>
          <p>9b 08 ff 32 74 6c e1 90</p>
        </div>
      </div>

      <svg className="absolute bottom-[8%] left-[3%] h-[180px] w-[520px] opacity-[0.1]" viewBox="0 0 520 180" fill="none">
        <line x1="0" y1="145" x2="520" y2="145" stroke="#6B6470" strokeWidth="1" />
        <polyline
          points="0,140 30,136 58,118 82,132 115,70 145,120 175,111 205,42 238,96 267,85 295,127 330,64 365,89 400,40 430,93 462,72 520,128"
          stroke="#5EEAD4"
          strokeWidth="1.5"
        />
        {[30, 115, 205, 330, 400, 462].map((x) => (
          <line key={x} x1={x} y1="145" x2={x} y2="155" stroke="#8B5CF6" />
        ))}
        <text x="5" y="170" fill="#A78BFA" fontSize="9" fontFamily="monospace">
          PACKET ACTIVITY / TCP STREAM
        </text>
      </svg>

      <div className="absolute bottom-[5%] right-[3%] hidden w-[390px] overflow-hidden rounded-xl border border-white/[0.025] opacity-[0.14] xl:block">
        <PacketRow no="137" source="192.168.148.132" destination="192.168.148.131" info="SYN" />
        <PacketRow no="138" source="192.168.148.131" destination="192.168.148.132" info="SYN, ACK" />
        <PacketRow no="139" source="192.168.148.132" destination="192.168.148.131" info="ACK" />
        <PacketRow no="140" source="192.168.148.132" destination="192.168.148.131" info="PSH, ACK · LEN 389" />
      </div>

      <span className="absolute left-[46%] top-[17%] font-mono text-[10px] tracking-[0.28em] text-violet-300/[0.09]">
        RSA // TCP // GPG
      </span>
      <span className="absolute bottom-[17%] left-[57%] font-mono text-[10px] tracking-[0.22em] text-teal-300/[0.07]">
        CAPTURE → INSPECT → VERIFY
      </span>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0D0912] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0D0912] to-transparent" />
    </div>
  );
}

function PacketRow({
  no,
  source,
  destination,
  info,
}: {
  no: string;
  source: string;
  destination: string;
  info: string;
}) {
  return (
    <div className="grid grid-cols-[42px_1fr_1fr_95px] border-b border-white/10 bg-[#15101D]/70 px-3 py-2 font-mono text-[9px] text-[#BDB6C5] last:border-b-0">
      <span>{no}</span>
      <span>{source}</span>
      <span>{destination}</span>
      <span className="text-teal-200">{info}</span>
    </div>
  );
}
