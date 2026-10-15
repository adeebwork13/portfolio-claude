import type { ReactNode } from "react";

export default function AITheme({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-[#080812] text-[#F1F0FA] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#080812]" />

        <div className="absolute -left-48 -top-48 h-[650px] w-[650px] rounded-full bg-[#7C3AED]/[0.09] blur-[180px]" />

        <div className="absolute -right-48 top-[18%] h-[600px] w-[600px] rounded-full bg-[#06B6D4]/[0.06] blur-[180px]" />

        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-[#EC4899]/[0.035] blur-[170px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.10) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}