"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Skills",
    href: "/#skills",
  },
  {
    label: "Experience",
    href: "/#experience",
  },
  {
    label: "Projects",
    href: "/#projects",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#5E565C]/25 bg-[#0F0A0B]/82 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
        {/* LOGO */}

        <Link
          href="/"
          className="group relative flex items-center"
          aria-label="Adeeb homepage"
        >
          <NavbarLogo />

          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#C96E6E] to-[#D6B48A] transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative py-2 text-[13px] font-medium text-[#B89AAA] transition duration-300 hover:text-[#F3EDE6]"
            >
              {item.label}

              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#C96E6E] to-[#D6B48A] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* DESKTOP CTA */}

        <div className="hidden lg:block">
          <a
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-[#7A1F2B]/65 bg-[#7A1F2B]/22 px-4 py-2 text-xs font-semibold text-[#F3EDE6] transition duration-300 hover:border-[#C96E6E]/60 hover:bg-[#7A1F2B]/38 hover:shadow-[0_0_28px_rgba(122,31,43,0.22)]"
          >
            View Work

            <span className="text-[#D6B48A] transition duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* MOBILE BUTTON */}

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5E565C]/35 bg-[#1A1114]/70 lg:hidden"
        >
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-[2px] h-px w-5 bg-[#F3EDE6] transition duration-300 ${
                open
                  ? "translate-y-[6px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[8px] h-px w-5 bg-[#D6B48A] transition duration-300 ${
                open
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 top-[14px] h-px w-5 bg-[#F3EDE6] transition duration-300 ${
                open
                  ? "-translate-y-[6px] -rotate-45"
                  : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}

      <div
        className={`overflow-hidden border-t border-[#5E565C]/25 bg-[#0F0A0B]/96 backdrop-blur-2xl transition-all duration-400 lg:hidden ${
          open
            ? "max-h-[500px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1500px] flex-col px-5 py-4 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-[#5E565C]/20 py-4 text-sm font-medium text-[#B89AAA] transition duration-300 last:border-0 hover:pl-2 hover:text-[#F3EDE6]"
            >
              {item.label}

              <span className="text-[#D6B48A] opacity-50 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* =========================================================
   NAVBAR LOGO
========================================================= */

function NavbarLogo() {
  return (
    <svg
      viewBox="0 0 245 70"
      className="h-[36px] w-[122px] overflow-visible"
      role="img"
      aria-label="ADEEB"
    >
      <defs>
        <linearGradient
          id="navbarSignature"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#F3EDE6"
          />

          <stop
            offset="55%"
            stopColor="#D6B48A"
          />

          <stop
            offset="100%"
            stopColor="#C96E6E"
          />
        </linearGradient>
      </defs>

      {/* A flourish */}

      <path
        d="
          M8 48
          C18 31 27 16 35 13
          C43 10 42 26 35 39
          C28 51 19 58 14 53
          M27 40
          C40 36 53 36 66 39
        "
        fill="none"
        stroke="url(#navbarSignature)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* name */}

      <text
        x="55"
        y="48"
        fill="url(#navbarSignature)"
        fontFamily="'Segoe Script', 'Brush Script MT', cursive"
        fontSize="25"
        fontStyle="italic"
        fontWeight="600"
        letterSpacing="0.8"
      >
        ADEEB
      </text>

      {/* underline */}

      <path
        d="M53 56 C91 63 148 62 207 49"
        fill="none"
        stroke="#C96E6E"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}