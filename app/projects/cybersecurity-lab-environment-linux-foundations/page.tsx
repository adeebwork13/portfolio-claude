import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import CyberLabFoundationsProject from "@/components/projects/CyberLabFoundationsProject";

export const metadata: Metadata = {
  title: "Cybersecurity Lab Environment & Linux Foundations",
  description:
    "A controlled cybersecurity training environment built with VirtualBox, Kali Linux, Metasploitable 2, Wireshark, Packet Tracer, Python, and Linux system administration fundamentals.",
};

export default function CybersecurityLabFoundationsPage() {
  return (
    <main className="min-h-screen bg-[#071015] text-[#EAF2F4]">
      <div className="relative z-50 border-b border-[#1C333E]/55 bg-[#071015]/95 backdrop-blur-xl">
        <Navbar />
      </div>

      <CyberLabFoundationsProject />
    </main>
  );
}
