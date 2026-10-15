"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TerminalDemo = {
  label: string;
  command: string;
  output: string;
  note: string;
};

const terminalDemos: TerminalDemo[] = [
  {
    label: "Home directory",
    command: "echo ~",
    output: "/home/student",
    note: "The tilde (~) expands to the current user's home directory.",
  },
  {
    label: "Permissions",
    command: "ls -l .profile",
    output: "-rw-r--r--  1 student student 807 May 10 14:22 .profile",
    note: "Owner can read/write. Group and Other can read only.",
  },
  {
    label: "Network interface",
    command: "ifconfig",
    output:
      "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>\n        inet 10.10.10.x  netmask 255.255.255.0\n        ether 08:00:27:xx:xx:xx",
    note: "The VM received an address from the private VirtualBox NAT Network.",
  },
  {
    label: "Processes",
    command: "ps -u",
    output:
      "USER       PID  TTY      TIME COMMAND\nstudent   22991  pts/1    0:00 ping 127.0.0.1\nstudent   23298  pts/0    0:00 ps -u",
    note: "The process ID (PID) lets Linux identify and manage a running process.",
  },
  {
    label: "Services",
    command: "sudo service --status-all",
    output:
      " [ + ]  apache2\n [ + ]  cron\n [ + ]  dbus\n [ + ]  networking\n [ - ]  mariadb\n [ - ]  ssh",
    note: "+ indicates a running service; - indicates a stopped service.",
  },
  {
    label: "System logs",
    command: "sudo head /var/log/boot.log",
    output:
      "[  OK  ] Finished systemd-binfmt.service\n[  OK  ] Started systemd-timesyncd.service\n[  OK  ] Started rpc-statd-notify.service\n[  OK  ] Finished systemd-tmpfiles-setup.service",
    note: "Boot logs help verify service initialization and startup health.",
  },
  {
    label: "Python",
    command: "python Lab1_Part-A_Code-File.py",
    output: "2\n6\n-5\n23\n10",
    note: "The supplied script used Python's math.ceil() function.",
  },
];

const milestones = [
  {
    title: "Virtual lab architecture",
    text: "Created a controlled VirtualBox environment with Kali Linux and an intentionally vulnerable Metasploitable 2 VM connected to the same private NAT Network.",
  },
  {
    title: "Connectivity validation",
    text: "Verified addressing on both VMs and confirmed host-to-host communication with ICMP before moving on to analysis tasks.",
  },
  {
    title: "Network simulation",
    text: "Built a small two-PC switched network in Cisco Packet Tracer and validated same-subnet communication.",
  },
  {
    title: "Packet inspection",
    text: "Captured ICMP Echo Request and Echo Reply traffic in Wireshark and inspected packet-level source, destination, protocol, and frame details.",
  },
  {
    title: "Linux administration",
    text: "Practised navigation, hidden files, permissions, ownership, processes, PIDs, services, network configuration, and system logs in Kali Linux.",
  },
  {
    title: "Scripting foundation",
    text: "Verified the Python environment and executed a supplied script successfully, adding a scripting layer to the lab toolchain.",
  },
];

const questions = [
  {
    q: "Why use a NAT Network instead of attaching each VM independently?",
    a: "The shared NAT Network gives the VMs a private segment where they can communicate with each other while still allowing controlled outbound connectivity. It also gives the lab a repeatable network boundary.",
  },
  {
    q: "What does ~ actually mean in Linux?",
    a: "It is shorthand for the current user's home directory. That makes commands portable because the shell expands ~ to the correct home path for the signed-in user.",
  },
  {
    q: "Why are Linux permissions written as rw-r--r--?",
    a: "The permission string is split into owner, group, and other. Each section can grant read (r), write (w), and execute (x) access independently.",
  },
  {
    q: "What is the point of a PID?",
    a: "A PID uniquely identifies a running process. Once I found the PID of the continuous ping process, I could target that exact process with the kill command.",
  },
  {
    q: "Why inspect services and boot logs?",
    a: "Services show what the operating system is currently running, while boot logs help explain what happened during startup. Both are useful when troubleshooting or establishing a system baseline.",
  },
];

export default function CyberLabFoundationsProject() {
  const [selectedDemo, setSelectedDemo] = useState(0);
  const [terminalInput, setTerminalInput] = useState(terminalDemos[0].command);
  const [terminalOutput, setTerminalOutput] = useState(terminalDemos[0].output);
  const [terminalNote, setTerminalNote] = useState(terminalDemos[0].note);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const commandMap = useMemo(
    () => new Map(terminalDemos.map((item) => [item.command.trim(), item])),
    [],
  );

  function loadDemo(index: number) {
    const item = terminalDemos[index];
    setSelectedDemo(index);
    setTerminalInput(item.command);
    setTerminalOutput(item.output);
    setTerminalNote(item.note);
  }

  function runCommand() {
    const value = terminalInput.trim();
    const found = commandMap.get(value);

    if (found) {
      setTerminalOutput(found.output);
      setTerminalNote(found.note);
      return;
    }

    setTerminalOutput(
      `Command not available in this portfolio simulation.\n\nTry one of the listed learning commands.`,
    );
    setTerminalNote(
      "This terminal is a safe simulation. It never executes commands on the visitor's device or on a real network.",
    );
  }

  return (
    <div className="relative overflow-hidden bg-[#071015] text-[#EAF2F4]">
      <BackgroundGrid />

      {/* HERO */}
      <section className="relative border-b border-[#1C333E]/50">
        <div className="mx-auto max-w-[1220px] px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7EB8C9] transition hover:text-[#B7E4EE]"
          >
            ← Back to Projects
          </Link>

          <div className="mt-7 grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#62D7B3]">
                Cybersecurity • Virtualization • Linux
              </p>

              <h1 className="mt-4 max-w-4xl text-[clamp(2.55rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.055em] text-[#F1F7F8]">
                Cybersecurity Lab Environment
                <span className="block text-[#8FCBDD]">& Linux Foundations</span>
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#90A8B0]">
                I built a controlled virtual security environment, validated network
                communication, captured traffic, and then used Kali Linux to practise
                the operating-system fundamentals that later detection and response labs
                depend on.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "VirtualBox",
                  "Kali Linux",
                  "Metasploitable 2",
                  "Wireshark",
                  "Packet Tracer",
                  "Python",
                  "Linux CLI",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#254653]/55 bg-[#0B1820]/80 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#9DB7BF]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <LabArchitecture />
          </div>
        </div>
      </section>

      {/* OUTCOME STRIP */}
      <section className="border-b border-[#1C333E]/40 bg-[#09141A]/75">
        <div className="mx-auto grid max-w-[1220px] grid-cols-2 gap-px px-5 sm:px-6 md:grid-cols-4 lg:px-8">
          <Metric value="2" label="Virtual Machines" />
          <Metric value="1" label="Private Lab Network" />
          <Metric value="7" label="Core Tools / Areas" />
          <Metric value="100%" label="Connectivity Validated" />
        </div>
      </section>

      {/* WHAT I BUILT */}
      <ProjectSection
        eyebrow="Project Outcome"
        title="What I actually built"
        intro="The value of this project was not simply installing tools. The goal was to create a usable foundation for later cybersecurity experiments and understand what was happening underneath the interface."
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {milestones.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[18px] border border-[#1C333E]/55 bg-[#0A171E]/78 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[8px] tracking-[0.18em] text-[#62D7B3]">
                  0{index + 1}
                </span>
                <div className="h-px flex-1 bg-[#254653]/45" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[#EAF2F4]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#8FA6AE]">{item.text}</p>
            </article>
          ))}
        </div>
      </ProjectSection>

      {/* NETWORK ARCHITECTURE */}
      <ProjectSection
        eyebrow="Architecture"
        title="A small network with a clear boundary"
        intro="Kali Linux and Metasploitable 2 were placed on the same VirtualBox NAT Network. This let me validate communication between the systems before using the environment for later security work."
        alternate
      >
        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <NetworkFlow />

          <div className="space-y-3">
            <InfoRow
              title="Kali Linux"
              text="Primary analysis workstation used for Linux exercises, connectivity testing, and later security tooling."
              badge="Analysis"
            />
            <InfoRow
              title="Metasploitable 2"
              text="Intentionally vulnerable training VM used only inside the controlled lab environment."
              badge="Training Target"
            />
            <InfoRow
              title="VirtualBox NAT Network"
              text="Shared private virtual network used to place both VMs on the same logical segment."
              badge="Private Segment"
            />
          </div>
        </div>
      </ProjectSection>

      {/* PACKET ANALYSIS */}
      <ProjectSection
        eyebrow="Traffic Analysis"
        title="From a ping command to packets on the wire"
        intro="I generated ICMP traffic and inspected the resulting Echo Request and Echo Reply frames in Wireshark. Seeing the same action at both the command-line and packet level connected the networking concepts together."
      >
        <PacketVisual />
      </ProjectSection>

      {/* INTERACTIVE TERMINAL */}
      <ProjectSection
        eyebrow="Interactive Learning"
        title="Try the commands I used"
        intro="This terminal is intentionally simulated. It only returns stored educational output and never executes a real command or contacts a network."
        alternate
      >
        <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {terminalDemos.map((item, index) => (
              <button
                key={item.command}
                type="button"
                onClick={() => loadDemo(index)}
                className={`rounded-[14px] border px-4 py-3 text-left transition ${
                  selectedDemo === index
                    ? "border-[#62D7B3]/45 bg-[#12302D]/55"
                    : "border-[#1C333E]/45 bg-[#0A171E]/60 hover:border-[#365966]"
                }`}
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#78959F]">
                  {item.label}
                </p>
                <p className="mt-1 truncate font-mono text-[11px] text-[#D5E7EB]">
                  $ {item.command}
                </p>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#284955]/65 bg-[#040A0E] shadow-[0_24px_65px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between border-b border-[#1C333E]/60 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#E36B6B]" />
                <span className="h-2 w-2 rounded-full bg-[#D6B66F]" />
                <span className="h-2 w-2 rounded-full bg-[#62D7B3]" />
              </div>
              <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#607A84]">
                Portfolio Lab Terminal • Simulation
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-2 font-mono text-[12px]">
                <span className="mt-2 text-[#62D7B3]">student@kali:~$</span>
                <input
                  value={terminalInput}
                  onChange={(event) => setTerminalInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") runCommand();
                  }}
                  aria-label="Simulated terminal command"
                  className="min-w-0 flex-1 border-b border-[#24434F]/55 bg-transparent px-1 py-2 text-[#E7F2F4] outline-none focus:border-[#62D7B3]/55"
                />
                <button
                  type="button"
                  onClick={runCommand}
                  className="rounded-[10px] border border-[#62D7B3]/30 bg-[#12302D]/65 px-3 py-2 text-[10px] font-semibold text-[#A8E7D3] transition hover:bg-[#163B37]"
                >
                  Run
                </button>
              </div>

              <pre className="mt-5 min-h-[170px] whitespace-pre-wrap break-words font-mono text-[11px] leading-6 text-[#AFC4CA]">
                {terminalOutput}
              </pre>

              <div className="mt-4 border-t border-[#1C333E]/55 pt-4 text-xs leading-5 text-[#6F8B94]">
                {terminalNote}
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* LINUX FOUNDATIONS */}
      <ProjectSection
        eyebrow="Linux Foundations"
        title="The operating-system skills behind security tooling"
        intro="Before moving into detection engineering, I wanted to understand how the Linux environment is structured and how to inspect what the system is doing."
      >
        <div className="overflow-hidden rounded-[18px] border border-[#1C333E]/55">
          {[
            ["Filesystem", "echo ~ • cd .. • pwd", "Navigation and understanding the current working directory."],
            ["Permissions", "ls -l • ls -al", "Reading owner, group, and other access permissions."],
            ["Files", "echo • cat • ls • man", "Creating, reading, listing, and learning commands from manual pages."],
            ["Processes", "ps -aux • ps -u • kill", "Finding running processes, identifying PIDs, and terminating a selected process."],
            ["Services", "service --status-all", "Reviewing which operating-system services are running or stopped."],
            ["Logs", "ls /var/log • head boot.log", "Inspecting startup and system log information for troubleshooting and baselining."],
          ].map(([title, commands, description], index) => (
            <div
              key={title}
              className={`grid gap-3 bg-[#09151B]/72 px-4 py-4 sm:grid-cols-[0.26fr_0.32fr_0.42fr] sm:items-center sm:px-5 ${
                index !== 5 ? "border-b border-[#1C333E]/45" : ""
              }`}
            >
              <p className="text-sm font-semibold text-[#E3EFF1]">{title}</p>
              <p className="font-mono text-[10px] text-[#76C9D8]">{commands}</p>
              <p className="text-xs leading-5 text-[#809AA3]">{description}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* QUESTIONS */}
      <ProjectSection
        eyebrow="Questions I Had"
        title="What I wanted to understand, not just complete"
        alternate
      >
        <div className="space-y-2">
          {questions.map((item, index) => {
            const open = openQuestion === index;
            return (
              <button
                key={item.q}
                type="button"
                onClick={() => setOpenQuestion(open ? null : index)}
                className="w-full rounded-[16px] border border-[#1C333E]/50 bg-[#0A171E]/68 px-4 py-4 text-left transition hover:border-[#31535F] sm:px-5"
              >
                <div className="flex items-start justify-between gap-5">
                  <p className="text-sm font-semibold leading-6 text-[#E4EEF0]">{item.q}</p>
                  <span className="font-mono text-[#62D7B3]">{open ? "−" : "+"}</span>
                </div>
                {open && (
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-[#839DA5]">{item.a}</p>
                )}
              </button>
            );
          })}
        </div>
      </ProjectSection>

      {/* TAKEAWAY */}
      <section className="border-t border-[#1C333E]/45 bg-[#081218]">
        <div className="mx-auto max-w-[1220px] px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#62D7B3]">
                Takeaway
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#F0F6F7] sm:text-4xl">
                A foundation for future detection work.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-[#8BA3AB]">
                This project gave me a repeatable virtual environment and a stronger understanding
                of the Linux, networking, and packet-level concepts that an IDS/IPS analyst relies
                on. The next logical step is to add logging, monitoring, and detection tooling on top
                of this foundation rather than treating those systems as black boxes.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/projects/reconnaissance-lab"
                  className="rounded-full border border-[#31535F]/65 px-4 py-2 text-xs font-semibold text-[#B9D6DD] transition hover:border-[#62D7B3]/50 hover:text-[#DDF5ED]"
                >
                  View Reconnaissance Lab →
                </Link>
                <Link
                  href="/projects"
                  className="rounded-full border border-[#24434F]/55 px-4 py-2 text-xs font-semibold text-[#829AA2] transition hover:text-[#C5D8DD]"
                >
                  All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectSection({
  eyebrow,
  title,
  intro,
  alternate = false,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  alternate?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`relative border-b border-[#1C333E]/35 ${
        alternate ? "bg-[#09141A]/72" : "bg-[#071015]"
      }`}
    >
      <div className="mx-auto max-w-[1220px] px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#62D7B3]">
          {eyebrow}
        </p>
        <h2 className="mt-2 max-w-4xl text-2xl font-bold tracking-[-0.035em] text-[#EDF5F6] sm:text-3xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#849CA4]">{intro}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-x border-[#1C333E]/30 px-4 py-5 sm:px-5">
      <p className="text-2xl font-black tracking-[-0.04em] text-[#EAF2F4]">{value}</p>
      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-[#718D96]">
        {label}
      </p>
    </div>
  );
}

function LabArchitecture() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] [perspective:1000px]">
      <style>{`
        @keyframes labFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes packetMove { 0% { left: 27%; opacity: 0; } 15% { opacity: 1; } 50% { left: 50%; } 85% { opacity: 1; } 100% { left: 73%; opacity: 0; } }
      `}</style>

      <div className="relative rounded-[24px] border border-[#2A4B57]/60 bg-gradient-to-br from-[#0D1D25] via-[#09151B] to-[#071015] p-5 shadow-[0_28px_75px_rgba(0,0,0,0.30)] [transform:rotateY(-4deg)_rotateX(2deg)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#6E8993]">Host</p>
            <p className="mt-1 text-sm font-semibold text-[#DBE9EC]">VirtualBox Environment</p>
          </div>
          <span className="rounded-full border border-[#62D7B3]/25 bg-[#12302D]/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#91E1C7]">
            Isolated Lab
          </span>
        </div>

        <div className="mt-6 rounded-[18px] border border-[#31515C]/50 bg-[#071116]/80 p-4">
          <p className="text-center font-mono text-[8px] uppercase tracking-[0.16em] text-[#79A3AF]">
            Private NAT Network
          </p>

          <div className="relative mt-4 grid grid-cols-2 gap-6">
            <div className="h-px bg-[#31535F] absolute left-[23%] right-[23%] top-1/2" />
            <span
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#62D7B3] shadow-[0_0_14px_rgba(98,215,179,0.9)]"
              style={{ animation: "packetMove 3.2s linear infinite" }}
            />

            <VmNode title="Kali Linux" subtitle="Analysis VM" tone="cyan" />
            <VmNode title="Metasploitable 2" subtitle="Training VM" tone="green" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Wireshark", "Packet Tracer", "Python"].map((item, index) => (
            <div
              key={item}
              className="rounded-[12px] border border-[#1C333E]/55 bg-[#0B1820]/68 px-3 py-3 text-center"
              style={{ animation: `labFloat ${4.2 + index * 0.35}s ease-in-out infinite` }}
            >
              <p className="font-mono text-[8px] text-[#8EB0BA]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VmNode({
  title,
  subtitle,
  tone,
}: {
  title: string;
  subtitle: string;
  tone: "cyan" | "green";
}) {
  const accent = tone === "cyan" ? "#76C9D8" : "#62D7B3";
  return (
    <div className="relative z-10 rounded-[15px] border border-[#284955]/60 bg-[#0C1B22] p-4 text-center shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
      <div
        className="mx-auto flex h-10 w-10 items-center justify-center rounded-[12px] border bg-[#071116] font-black"
        style={{ borderColor: `${accent}55`, color: accent }}
      >
        VM
      </div>
      <p className="mt-3 text-xs font-semibold text-[#E0ECEE]">{title}</p>
      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#69838C]">
        {subtitle}
      </p>
    </div>
  );
}

function NetworkFlow() {
  return (
    <div className="rounded-[20px] border border-[#1C333E]/55 bg-[#071116]/80 p-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <NodeCard label="Kali Linux" role="Analysis workstation" symbol="K" />
        <div className="flex items-center justify-center gap-2 py-2 sm:flex-col">
          <span className="h-px w-10 bg-[#62D7B3]/45 sm:h-10 sm:w-px" />
          <span className="rounded-full border border-[#62D7B3]/30 bg-[#12302D]/60 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#8FDDC5]">
            ICMP
          </span>
          <span className="h-px w-10 bg-[#62D7B3]/45 sm:h-10 sm:w-px" />
        </div>
        <NodeCard label="Metasploitable 2" role="Training target" symbol="M" />
      </div>

      <div className="mt-4 rounded-[14px] border border-dashed border-[#2A4B57]/65 bg-[#0A171E]/65 px-4 py-3 text-center">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#7898A2]">
          Shared VirtualBox NAT Network • DHCP Enabled
        </p>
      </div>
    </div>
  );
}

function NodeCard({ label, role, symbol }: { label: string; role: string; symbol: string }) {
  return (
    <div className="rounded-[16px] border border-[#294A56]/60 bg-[#0D1B22] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#76C9D8]/25 bg-[#0A151B] font-black text-[#87CFDC]">
          {symbol}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#E7F0F2]">{label}</p>
          <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#69848D]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ title, text, badge }: { title: string; text: string; badge: string }) {
  return (
    <div className="rounded-[16px] border border-[#1C333E]/50 bg-[#0A171E]/68 p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-[#E2ECEE]">{title}</h3>
        <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.12em] text-[#62D7B3]">
          {badge}
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-[#7D98A1]">{text}</p>
    </div>
  );
}

function PacketVisual() {
  const packets = [
    ["Request", "Client", "Remote Host", "ICMP Echo"],
    ["Reply", "Remote Host", "Client", "ICMP Echo"],
    ["Request", "Client", "Remote Host", "ICMP Echo"],
    ["Reply", "Remote Host", "Client", "ICMP Echo"],
  ];

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#1C333E]/55 bg-[#071116]/85">
      <div className="flex items-center justify-between border-b border-[#1C333E]/50 px-4 py-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78959F]">
          Wireshark • Filter: icmp
        </p>
        <span className="rounded-full bg-[#17372F]/60 px-2 py-1 font-mono text-[7px] text-[#7BDEBE]">
          4 pairs observed
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[650px]">
          <div className="grid grid-cols-[0.16fr_0.24fr_0.24fr_0.18fr_0.18fr] border-b border-[#1C333E]/45 bg-[#0A171E] px-4 py-2 font-mono text-[7px] uppercase tracking-[0.1em] text-[#66818A]">
            <span>No.</span><span>Source</span><span>Destination</span><span>Protocol</span><span>Info</span>
          </div>
          {packets.map((packet, index) => (
            <div
              key={`${packet[0]}-${index}`}
              className="grid grid-cols-[0.16fr_0.24fr_0.24fr_0.18fr_0.18fr] border-b border-[#132832]/60 px-4 py-3 font-mono text-[9px] text-[#A9C0C6] last:border-b-0"
            >
              <span>{index + 1}</span>
              <span>{packet[1]}</span>
              <span>{packet[2]}</span>
              <span className="text-[#76C9D8]">ICMP</span>
              <span className={packet[0] === "Reply" ? "text-[#62D7B3]" : "text-[#D2B879]"}>
                Echo {packet[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 border-t border-[#1C333E]/45 bg-[#09151B]/70 p-4 md:grid-cols-3">
        <SmallFact title="Layer 3" text="ICMP rides inside IP packets." />
        <SmallFact title="Request / Reply" text="Ping creates paired Echo messages." />
        <SmallFact title="Visibility" text="Packet capture makes network behavior observable." />
      </div>
    </div>
  );
}

function SmallFact({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-[#62D7B3]">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#7D969F]">{text}</p>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(118,201,216,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(118,201,216,0.7) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-[#2F8194]/10 blur-[100px]" />
      <div className="absolute -left-28 top-[48%] h-72 w-72 rounded-full bg-[#2B8B6D]/10 blur-[105px]" />
    </div>
  );
}
