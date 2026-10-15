"use client";

import { useMemo, useState } from "react";

export type SimCommand = {
  command: string;
  output: string;
  explanation: string;
};

export type TerminalProfile = {
  id: string;
  title: string;
  subtitle: string;
  prompt: string;
  badge: string;
  tone: "windows" | "kali" | "metasploitable";
  commands: SimCommand[];
};

function toneClasses(tone: TerminalProfile["tone"]) {
  if (tone === "kali") {
    return {
      badge: "border-[#705CFF]/40 bg-[#705CFF]/10 text-[#B9AEFF]",
      accent: "text-[#B9AEFF]",
    };
  }
  if (tone === "metasploitable") {
    return {
      badge: "border-[#F4B750]/40 bg-[#F4B750]/10 text-[#F4B750]",
      accent: "text-[#F4B750]",
    };
  }
  return {
    badge: "border-[#35D3EB]/35 bg-[#35D3EB]/10 text-[#9BEAF4]",
    accent: "text-[#9BEAF4]",
  };
}

export default function InteractiveTerminal({
  profile,
}: {
  profile: TerminalProfile;
}) {
  const first = profile.commands[0];
  const [value, setValue] = useState(first?.command ?? "");
  const [history, setHistory] = useState<
    { command: string; output: string; explanation: string }[]
  >(
    first
      ? [{ command: first.command, output: first.output, explanation: first.explanation }]
      : [],
  );

  const lookup = useMemo(() => {
    const map = new Map<string, SimCommand>();
    profile.commands.forEach((item) => map.set(item.command.trim().toLowerCase(), item));
    return map;
  }, [profile.commands]);

  const tone = toneClasses(profile.tone);

  function runCommand(commandToRun = value) {
    const cleaned = commandToRun.trim();
    if (!cleaned) return;

    const match = lookup.get(cleaned.toLowerCase());
    if (!match) {
      setHistory((current) => [
        ...current,
        {
          command: cleaned,
          output:
            "Command not available in this portfolio simulation.\nChoose one of the suggested commands below.",
          explanation:
            "This terminal is intentionally sandboxed. It never executes real commands or accepts arbitrary targets.",
        },
      ]);
      setValue("");
      return;
    }

    setHistory((current) => [
      ...current,
      { command: match.command, output: match.output, explanation: match.explanation },
    ]);
    setValue("");
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#263A50]/45 bg-[#060A10] shadow-[0_28px_80px_rgba(0,0,0,0.32)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#263A50]/40 bg-[#0C1320] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4B750]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#EEF4FA]">{profile.title}</p>
            <p className="mt-0.5 text-[10px] text-[#7790A4]">{profile.subtitle}</p>
          </div>
        </div>
        <span className={`rounded-full border px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.14em] ${tone.badge}`}>
          {profile.badge}
        </span>
      </div>

      <div className="h-[360px] overflow-y-auto px-4 py-4 font-mono text-[11px] leading-5 sm:text-xs">
        <div className="mb-4 rounded-[12px] border border-[#263A50]/30 bg-[#0B111B] px-3 py-2 text-[10px] leading-4 text-[#7790A4]">
          Safe simulation only — no command is executed on the viewer&apos;s device or on a real network.
        </div>

        <div className="space-y-5">
          {history.map((item, index) => (
            <div key={`${item.command}-${index}`}>
              <div className="flex flex-wrap gap-2">
                <span className={tone.accent}>{profile.prompt}</span>
                <span className="text-[#EEF4FA]">{item.command}</span>
              </div>
              <pre className="mt-2 whitespace-pre-wrap break-words text-[#B9C7D2]">{item.output}</pre>
              <p className="mt-2 border-l border-[#35D3EB]/25 pl-3 font-sans text-[11px] leading-5 text-[#7790A4]">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#263A50]/35 bg-[#0A101A] p-4">
        <div className="flex items-center gap-2 rounded-[12px] border border-[#263A50]/40 bg-[#060A10] px-3 py-2">
          <span className={`shrink-0 font-mono text-xs ${tone.accent}`}>{profile.prompt}</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") runCommand();
            }}
            className="min-w-0 flex-1 bg-transparent font-mono text-xs text-[#EEF4FA] outline-none"
            placeholder="Type a suggested command…"
          />
          <button
            type="button"
            onClick={() => runCommand()}
            className="rounded-[9px] border border-[#35D3EB]/25 bg-[#35D3EB]/10 px-3 py-1.5 text-[10px] font-semibold text-[#9BEAF4] transition hover:border-[#35D3EB]/45"
          >
            Run
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {profile.commands.slice(0, 5).map((item) => (
            <button
              key={item.command}
              type="button"
              onClick={() => runCommand(item.command)}
              className="rounded-full border border-[#263A50]/35 bg-[#0B111B] px-3 py-1.5 font-mono text-[9px] text-[#7790A4] transition hover:border-[#35D3EB]/30 hover:text-[#EEF4FA]"
            >
              {item.command}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
