"use client";

import type { ReactNode } from "react";

export type NistBackdropVariant =
  | "overview"
  | "context"
  | "compliance"
  | "dependencies"
  | "risk"
  | "erm"
  | "method";

export default function NistTheme({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111D] text-[#EAF2F8]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(70,145,210,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(70,145,210,0.045) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(59,130,246,0.12), transparent 30%), radial-gradient(circle at 82% 24%, rgba(56,189,248,0.08), transparent 28%), radial-gradient(circle at 55% 86%, rgba(244,196,107,0.06), transparent 32%)",
        }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.13]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="nistFlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="55%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F4C46B" />
          </linearGradient>
        </defs>

        <path
          d="M-100 760 C280 560 430 850 720 650 S1180 410 1710 590"
          fill="none"
          stroke="url(#nistFlow)"
          strokeWidth="1.1"
          strokeDasharray="6 12"
        />

        <path
          d="M-80 240 C300 430 560 90 860 280 S1260 560 1680 310"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.8"
          strokeOpacity="0.65"
          strokeDasharray="3 14"
        />

        {[180, 420, 690, 980, 1270, 1480].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={i % 2 === 0 ? 330 : 680}
            r="4"
            fill={i === 5 ? "#F4C46B" : "#38BDF8"}
          >
            <animate
              attributeName="opacity"
              values="0.25;1;0.25"
              dur={`${4 + i}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <div className="relative">{children}</div>
    </div>
  );
}

export function NistSectionBackdrop({
  variant,
}: {
  variant: NistBackdropVariant;
}) {
  const common =
    "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none";

  if (variant === "context") {
    return (
      <div aria-hidden="true" className={common}>
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full border border-[#38BDF8]/10" />
        <div className="absolute -right-5 top-[5.5rem] h-52 w-52 rounded-full border border-[#38BDF8]/10" />
        <div className="absolute right-16 top-28 h-28 w-28 rounded-full border border-[#F4C46B]/10" />
        <div className="absolute left-[4%] top-[18%] font-mono text-[7rem] font-black tracking-[-0.08em] text-[#DCEAF5]/[0.018] lg:text-[11rem]">
          GV.OC
        </div>
      </div>
    );
  }

  if (variant === "compliance") {
    return (
      <div aria-hidden="true" className={common}>
        <div className="absolute right-[4%] top-[18%] hidden rotate-6 lg:block">
          <div className="w-[330px] rounded-[26px] border border-[#F4C46B]/20 bg-[#0B1929]/45 p-5 opacity-40">
            <div className="h-2 w-24 rounded-full bg-[#F4C46B]/40" />
            <div className="mt-5 space-y-3">
              <div className="h-2 w-full rounded-full bg-[#DCEAF5]/10" />
              <div className="h-2 w-[82%] rounded-full bg-[#DCEAF5]/10" />
              <div className="h-2 w-[68%] rounded-full bg-[#DCEAF5]/10" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="h-12 rounded-xl border border-[#38BDF8]/15" />
              <div className="h-12 rounded-xl border border-[#38BDF8]/15" />
              <div className="h-12 rounded-xl border border-[#38BDF8]/15" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "dependencies") {
    return (
      <div aria-hidden="true" className={common}>
        <svg className="absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1400 600">
          <path d="M60 300 C300 120 420 120 690 300" fill="none" stroke="#38BDF8" strokeWidth="1.4" />
          <path d="M1340 300 C1100 120 980 120 710 300" fill="none" stroke="#F4C46B" strokeWidth="1.4" />
          <circle cx="700" cy="300" r="44" fill="none" stroke="#DCEAF5" strokeOpacity="0.35" />
          <circle cx="180" cy="215" r="8" fill="#38BDF8" />
          <circle cx="1220" cy="215" r="8" fill="#F4C46B" />
        </svg>
      </div>
    );
  }

  if (variant === "risk") {
    return (
      <div aria-hidden="true" className={common}>
        <div className="absolute -left-28 bottom-[-9rem] h-[28rem] w-[28rem] rounded-full border border-[#3B82F6]/10" />
        <div className="absolute -left-12 bottom-[-5rem] h-[20rem] w-[20rem] rounded-full border border-[#38BDF8]/10" />
        <div className="absolute right-[3%] top-[12%] font-mono text-[7rem] font-black tracking-[-0.08em] text-[#DCEAF5]/[0.018] lg:text-[11rem]">
          GV.RM
        </div>
      </div>
    );
  }

  if (variant === "erm") {
    return (
      <div aria-hidden="true" className={common}>
        <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38BDF8]/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38BDF8]/[0.07]" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F4C46B]/[0.08]" />
      </div>
    );
  }

  if (variant === "method") {
    return (
      <div aria-hidden="true" className={common}>
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 49.8%, rgba(56,189,248,0.08) 50%, transparent 50.2%)",
            backgroundSize: "180px 100%",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={common}>
      <div className="absolute right-[4%] top-[10%] h-48 w-48 rotate-45 rounded-[34px] border border-[#38BDF8]/10" />
      <div className="absolute right-[8%] top-[18%] h-32 w-32 rotate-45 rounded-[26px] border border-[#F4C46B]/10" />
    </div>
  );
}
