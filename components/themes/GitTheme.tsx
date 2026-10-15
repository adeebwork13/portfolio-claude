import type { ReactNode } from "react";

export default function GitTheme({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-[#0D0D0E] text-[#F5F2EE] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#0D0D0E]" />

        <div className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#F05032]/[0.09] blur-[170px]" />

        <div className="absolute -right-48 top-[30%] h-[550px] w-[550px] rounded-full bg-[#F6C7B9]/[0.035] blur-[170px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,80,50,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(240,80,50,0.10) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}