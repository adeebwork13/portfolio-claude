import type { ReactNode } from "react";

export default function ElectronicsTheme({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-[#070A0B] text-[#ECF4F4] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#070A0B]" />

        <div className="absolute -left-48 top-[-20%] h-[600px] w-[600px] rounded-full bg-[#18A999]/[0.08] blur-[170px]" />

        <div className="absolute -right-48 top-[20%] h-[600px] w-[600px] rounded-full bg-[#F0B44D]/[0.055] blur-[180px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(24,169,153,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(24,169,153,0.11) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}