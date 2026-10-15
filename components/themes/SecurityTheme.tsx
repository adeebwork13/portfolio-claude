import type { ReactNode } from "react";

type SecuritySectionVariant =
  | "networking"
  | "addressing"
  | "attacks"
  | "secure";

export default function SecurityTheme({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-[#06131C] text-[#EAF6F8] ${className}`}
    >
      <SecurityGlobalBackground />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* =========================================================
   GLOBAL SECURITY BACKGROUND

   Runs behind the entire article:
   - Network lines
   - Moving packets
   - Nodes
   - Protocol labels
   - Scan rings
   - Shield watermark
========================================================= */

function SecurityGlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#06131C]" />

      {/* Ambient glows */}
      <div className="absolute -left-[18%] top-[-20%] h-[700px] w-[700px] rounded-full bg-[#168AAD]/[0.10] blur-[180px]" />

      <div className="absolute -right-[18%] top-[18%] h-[650px] w-[650px] rounded-full bg-[#34D5EB]/[0.055] blur-[180px]" />

      <div className="absolute bottom-[-25%] left-[28%] h-[600px] w-[600px] rounded-full bg-[#4ADE80]/[0.025] blur-[180px]" />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52,213,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(52,213,235,0.12) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Fine secondary grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(169,230,239,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(169,230,239,0.10) 1px, transparent 1px)",
          backgroundSize: "13px 13px",
        }}
      />

      {/* ===================================================
          GLOBAL NETWORK MAP
      =================================================== */}

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.34]"
      >
        <defs>
          <filter id="securityGlobalPacketGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Network paths */}

        <g
          fill="none"
          stroke="#168AAD"
          strokeWidth="1"
          opacity="0.30"
        >
          <path d="M-50 220 C180 210 220 370 430 330 S720 180 930 290" />

          <path d="M850 80 C920 180 1110 190 1190 340 S1410 470 1660 410" />

          <path d="M-80 720 C190 610 370 750 560 650 S930 580 1120 730" />

          <path d="M1050 930 C1120 770 1280 720 1650 790" />
        </g>

        <g
          fill="none"
          stroke="#34D5EB"
          strokeWidth="1"
          opacity="0.12"
        >
          <path
            d="M70 90 L260 180 L420 110 L610 240"
            strokeDasharray="5 10"
          />

          <path
            d="M980 560 L1150 490 L1300 620 L1510 540"
            strokeDasharray="5 10"
          />

          <path
            d="M250 900 L410 820 L590 910"
            strokeDasharray="5 10"
          />
        </g>

        {/* Static nodes */}

        {[
          [120, 218],
          [430, 330],
          [675, 245],
          [930, 290],
          [915, 150],
          [1190, 340],
          [1410, 445],
          [180, 660],
          [560, 650],
          [900, 625],
          [1120, 730],
          [1300, 620],
          [1510, 540],
        ].map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle
              cx={cx}
              cy={cy}
              r="9"
              fill="#06131C"
              stroke={
                index === 8 || index === 11
                  ? "#4ADE80"
                  : "#34D5EB"
              }
              strokeWidth="1"
              opacity="0.52"
            />

            <circle
              cx={cx}
              cy={cy}
              r="2.5"
              fill={
                index === 8 || index === 11
                  ? "#4ADE80"
                  : "#34D5EB"
              }
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.25;0.9;0.25"
                dur={`${4 + (index % 4)}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Moving packet 1 */}

        <circle
          r="3.5"
          fill="#34D5EB"
          filter="url(#securityGlobalPacketGlow)"
          opacity="0.85"
        >
          <animateMotion
            dur="13s"
            repeatCount="indefinite"
            path="M-50 220 C180 210 220 370 430 330 S720 180 930 290"
          />
        </circle>

        {/* Moving packet 2 */}

        <circle
          r="3"
          fill="#A9E6EF"
          filter="url(#securityGlobalPacketGlow)"
          opacity="0.65"
        >
          <animateMotion
            dur="17s"
            repeatCount="indefinite"
            path="M850 80 C920 180 1110 190 1190 340 S1410 470 1660 410"
          />
        </circle>

        {/* Secure packet */}

        <circle
          r="3"
          fill="#4ADE80"
          filter="url(#securityGlobalPacketGlow)"
          opacity="0.7"
        >
          <animateMotion
            dur="19s"
            repeatCount="indefinite"
            path="M-80 720 C190 610 370 750 560 650 S930 580 1120 730"
          />
        </circle>
      </svg>

      {/* ===================================================
          NETWORK SCAN
      =================================================== */}

      <div className="absolute left-[5%] top-[28%] hidden h-28 w-28 items-center justify-center lg:flex">
        <span
          className="absolute h-8 w-8 animate-ping rounded-full border border-[#34D5EB]/25"
          style={{ animationDuration: "5s" }}
        />

        <span
          className="absolute h-16 w-16 animate-ping rounded-full border border-[#34D5EB]/15"
          style={{
            animationDuration: "7s",
            animationDelay: "1.2s",
          }}
        />

        <span className="h-2 w-2 rounded-full bg-[#34D5EB]/60 shadow-[0_0_14px_rgba(52,213,235,0.65)]" />
      </div>

      {/* ===================================================
          SHIELD WATERMARK
      =================================================== */}

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#34D5EB"
        strokeWidth="0.5"
        className="absolute right-[3%] top-[48%] hidden h-[320px] w-[320px] opacity-[0.025] xl:block"
      >
        <path d="M12 2.5 20 6v5.5c0 5.1-3.2 9-8 11-4.8-2-8-5.9-8-11V6z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>

      {/* ===================================================
          SMALL PROTOCOL ANNOTATIONS
      =================================================== */}

      <BackgroundLabel
        className="left-[7%] top-[18%]"
        text="NODE-03"
      />

      <BackgroundLabel
        className="right-[12%] top-[24%]"
        text="TCP"
      />

      <BackgroundLabel
        className="right-[5%] top-[38%]"
        text="SEGMENT-B"
      />

      <BackgroundLabel
        className="left-[4%] top-[62%]"
        text="LAN"
      />

      <BackgroundLabel
        className="right-[16%] top-[74%]"
        text="ETH"
      />

      <BackgroundLabel
        className="left-[15%] top-[84%]"
        text="DNS"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(6,19,28,0.20)_66%,rgba(6,19,28,0.88)_100%)]" />
    </div>
  );
}

/* =========================================================
   SECTION-SPECIFIC BACKGROUNDS
========================================================= */

export function SecuritySectionBackdrop({
  variant,
}: {
  variant: SecuritySectionVariant;
}) {
  if (variant === "networking") {
    return <NetworkingBackdrop />;
  }

  if (variant === "addressing") {
    return <AddressingBackdrop />;
  }

  if (variant === "attacks") {
    return <AttackBackdrop />;
  }

  return <SecureBackdrop />;
}

/* =========================================================
   NETWORKING SECTION

   Nodes + packet routing
========================================================= */

function NetworkingBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1400 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.16]"
      >
        <g
          fill="none"
          stroke="#34D5EB"
          strokeWidth="1"
        >
          <path d="M-80 340 C170 270 300 380 520 255 S900 170 1110 280 S1320 330 1480 220" />

          <path
            d="M40 100 L250 170 L450 90 L650 180"
            strokeDasharray="5 9"
            opacity="0.4"
          />
        </g>

        {[
          [150, 310],
          [520, 255],
          [790, 205],
          [1110, 280],
          [1350, 275],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle
              cx={cx}
              cy={cy}
              r="9"
              fill="#06131C"
              stroke="#34D5EB"
            />

            <circle
              cx={cx}
              cy={cy}
              r="2.5"
              fill="#34D5EB"
            />
          </g>
        ))}

        <circle
          r="4"
          fill="#34D5EB"
          opacity="0.9"
        >
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            path="M-80 340 C170 270 300 380 520 255 S900 170 1110 280 S1320 330 1480 220"
          />
        </circle>
      </svg>

      <span className="absolute right-[5%] top-[18%] font-mono text-[8px] uppercase tracking-[0.2em] text-[#34D5EB]/10">
        PACKET ROUTE
      </span>

      <span className="absolute bottom-[12%] left-[4%] font-mono text-[8px] uppercase tracking-[0.2em] text-[#A9E6EF]/10">
        NETWORK SEGMENT
      </span>
    </div>
  );
}

/* =========================================================
   ADDRESSING SECTION

   IP / MAC fragments + data frames
========================================================= */

function AddressingBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute right-[3%] top-[15%] hidden font-mono text-[10px] leading-8 tracking-[0.18em] text-[#34D5EB]/[0.075] lg:block">
        <p>192.168.1.25</p>
        <p>10.0.0.14</p>
        <p>172.16.0.8</p>
        <p>2001:db8::1</p>
      </div>

      <div className="absolute bottom-[10%] left-[3%] hidden font-mono text-[9px] leading-7 tracking-[0.16em] text-[#A9E6EF]/[0.06] lg:block">
        <p>00:1A:2B:3C:4D:5E</p>
        <p>AA:7C:91:02:EF:18</p>
        <p>NIC-04 / SEG-A</p>
      </div>

      <svg
        viewBox="0 0 1400 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.11]"
      >
        <path
          d="M-50 260 H270 L360 190 H650 L750 310 H1050 L1160 235 H1450"
          fill="none"
          stroke="#34D5EB"
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* travelling data frame */}

        <g>
          <rect
            x="-18"
            y="-8"
            width="36"
            height="16"
            rx="3"
            fill="#06131C"
            stroke="#34D5EB"
          />

          <line
            x1="-9"
            y1="0"
            x2="9"
            y2="0"
            stroke="#A9E6EF"
            strokeWidth="1"
          />

          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            path="M-50 260 H270 L360 190 H650 L750 310 H1050 L1160 235 H1450"
          />
        </g>
      </svg>
    </div>
  );
}

/* =========================================================
   ATTACK SECTION

   Broken / disrupted communication paths
========================================================= */

function AttackBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1400 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.16]"
      >
        {/* Normal route */}

        <path
          d="M-40 170 C220 120 370 230 560 165 S900 120 1050 190"
          fill="none"
          stroke="#34D5EB"
          strokeWidth="1"
        />

        {/* Disrupted path */}

        <path
          d="M650 350 L790 300 L875 330"
          fill="none"
          stroke="#F87171"
          strokeWidth="1.2"
        />

        <path
          d="M930 355 L1080 300 L1260 350 L1450 290"
          fill="none"
          stroke="#F87171"
          strokeWidth="1.2"
          strokeDasharray="5 9"
        />

        <circle
          cx="902"
          cy="343"
          r="16"
          fill="none"
          stroke="#F87171"
          strokeWidth="1"
          opacity="0.35"
        >
          <animate
            attributeName="r"
            values="8;26;8"
            dur="4s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0.4;0;0.4"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* normal packet */}

        <circle
          r="3.5"
          fill="#34D5EB"
        >
          <animateMotion
            dur="11s"
            repeatCount="indefinite"
            path="M-40 170 C220 120 370 230 560 165 S900 120 1050 190"
          />
        </circle>
      </svg>

      <span className="absolute bottom-[10%] right-[7%] font-mono text-[8px] uppercase tracking-[0.2em] text-[#F87171]/10">
        CONNECTION INTERRUPTED
      </span>
    </div>
  );
}

/* =========================================================
   SECURITY PRINCIPLES SECTION

   CIA watermark + secure green network
========================================================= */

function SecureBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* CIA triangle watermark */}

      <svg
        viewBox="0 0 500 430"
        className="absolute -right-12 top-1/2 hidden h-[420px] w-[500px] -translate-y-1/2 opacity-[0.025] lg:block"
      >
        <polygon
          points="250,35 450,375 50,375"
          fill="none"
          stroke="#34D5EB"
          strokeWidth="3"
        />

        <text
          x="250"
          y="100"
          textAnchor="middle"
          fill="#A9E6EF"
          fontSize="22"
          fontWeight="700"
        >
          CONFIDENTIALITY
        </text>

        <text
          x="115"
          y="350"
          textAnchor="middle"
          fill="#A9E6EF"
          fontSize="22"
          fontWeight="700"
        >
          INTEGRITY
        </text>

        <text
          x="385"
          y="350"
          textAnchor="middle"
          fill="#A9E6EF"
          fontSize="22"
          fontWeight="700"
        >
          AVAILABILITY
        </text>

        <text
          x="250"
          y="245"
          textAnchor="middle"
          fill="#34D5EB"
          fontSize="42"
          fontWeight="800"
        >
          CIA
        </text>
      </svg>

      {/* secure connection */}

      <svg
        viewBox="0 0 800 350"
        className="absolute bottom-0 left-0 h-[70%] w-[60%] opacity-[0.10]"
      >
        <path
          d="M-40 280 C180 180 310 280 470 175 S650 110 840 150"
          fill="none"
          stroke="#4ADE80"
          strokeWidth="1"
        />

        {[150, 470, 700].map((cx, index) => (
          <g key={cx}>
            <circle
              cx={cx}
              cy={index === 0 ? 220 : index === 1 ? 175 : 135}
              r="10"
              fill="#06131C"
              stroke="#4ADE80"
            />

            <circle
              cx={cx}
              cy={index === 0 ? 220 : index === 1 ? 175 : 135}
              r="3"
              fill="#4ADE80"
            >
              <animate
                attributeName="opacity"
                values="0.35;1;0.35"
                dur={`${4 + index}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        <circle
          r="4"
          fill="#4ADE80"
        >
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            path="M-40 280 C180 180 310 280 470 175 S650 110 840 150"
          />
        </circle>
      </svg>

      <span className="absolute bottom-[12%] left-[7%] font-mono text-[8px] uppercase tracking-[0.2em] text-[#4ADE80]/10">
        VERIFIED CONNECTION
      </span>
    </div>
  );
}

/* =========================================================
   SMALL LABEL
========================================================= */

function BackgroundLabel({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`absolute hidden font-mono text-[7px] uppercase tracking-[0.22em] text-[#8EABB5]/[0.09] lg:block ${className}`}
    >
      {text}
    </span>
  );
}