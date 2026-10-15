import type { ReactNode } from "react";

export default function SectionPageTheme({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-[#0B1117] text-[#EDF4F6] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#0B1117]" />

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6FAFC2]/[0.05] blur-[150px]" />

        <div className="absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-[#A9D6E5]/[0.035] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(169,214,229,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(169,214,229,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}