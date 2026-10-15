"use client";

import type { ReactNode } from "react";

export type VirtualLabBackdropVariant =
  | "hero"
  | "vmware"
  | "network"
  | "questions"
  | "terminal"
  | "evidence";

export default function VirtualLabTheme({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080C14] text-[#EEF4FA]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91,141,239,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(91,141,239,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(112,92,255,0.12), transparent 30%), radial-gradient(circle at 78% 20%, rgba(53,211,235,0.08), transparent 28%), radial-gradient(circle at 56% 88%, rgba(244,183,80,0.05), transparent 34%)",
        }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.12]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="labFlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#705CFF" />
            <stop offset="52%" stopColor="#35D3EB" />
            <stop offset="100%" stopColor="#F4B750" />
          </linearGradient>
        </defs>
        <path
          d="M-80 700 C220 550 390 810 650 630 S1110 410 1680 570"
          fill="none"
          stroke="url(#labFlow)"
          strokeWidth="1.1"
          strokeDasharray="7 13"
        />
        <path
          d="M-100 250 C260 430 520 100 830 280 S1270 510 1690 300"
          fill="none"
          stroke="#35D3EB"
          strokeWidth="0.8"
          strokeOpacity="0.65"
          strokeDasharray="3 15"
        />
      </svg>

      <div className="relative">{children}</div>
    </div>
  );
}

export function VirtualLabSectionBackdrop({
  variant,
}: {
  variant: VirtualLabBackdropVariant;
}) {
  const common =
    "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none";

  if (variant === "hero") {
    return (
      <div aria-hidden="true" className={common}>
        <div className="absolute right-[4%] top-[8%] h-56 w-56 rotate-12 rounded-[44px] border border-[#35D3EB]/10" />
        <div className="absolute right-[9%] top-[16%] h-36 w-36 rotate-12 rounded-[32px] border border-[#705CFF]/12" />
        <div className="absolute left-[4%] top-[28%] font-mono text-[7rem] font-black tracking-[-0.08em] text-[#EEF4FA]/[0.018] lg:text-[12rem]">
          VM
        </div>
      </div>
    );
  }

  if (variant === "vmware") {
    return (
      <div aria-hidden="true" className={common}>
        <div className="absolute -right-24 bottom-[-9rem] h-[30rem] w-[30rem] rounded-full border border-[#705CFF]/10" />
        <div className="absolute -right-5 bottom-[-5rem] h-[22rem] w-[22rem] rounded-full border border-[#35D3EB]/10" />
      </div>
    );
  }

  if (variant === "network") {
    return (
      <div aria-hidden="true" className={common}>
        <svg className="absolute inset-0 h-full w-full opacity-[0.17]" viewBox="0 0 1400 600">
          <path d="M80 300 C300 120 440 120 690 300" fill="none" stroke="#35D3EB" strokeWidth="1.2" />
          <path d="M1320 300 C1100 120 960 120 710 300" fill="none" stroke="#705CFF" strokeWidth="1.2" />
          <circle cx="700" cy="300" r="46" fill="none" stroke="#F4B750" strokeOpacity="0.28" />
          <circle cx="180" cy="220" r="7" fill="#35D3EB" />
          <circle cx="1220" cy="220" r="7" fill="#705CFF" />
        </svg>
      </div>
    );
  }

  if (variant === "terminal") {
    return (
      <div aria-hidden="true" className={common}>
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 49.8%, rgba(53,211,235,0.08) 50%, transparent 50.2%)",
            backgroundSize: "180px 100%",
          }}
        />
      </div>
    );
  }

  if (variant === "evidence") {
    return (
      <div aria-hidden="true" className={common}>
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#35D3EB]/[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#705CFF]/[0.06]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={common}>
      <div className="absolute right-[3%] top-[10%] font-mono text-[7rem] font-black tracking-[-0.08em] text-[#EEF4FA]/[0.018] lg:text-[11rem]">
        ?
      </div>
    </div>
  );
}
