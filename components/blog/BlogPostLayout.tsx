import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

type BlogPostLayoutProps = {
  title: string;
  description: string;
  category: string;
  date: string;
  children: ReactNode;
};

export default function BlogPostLayout({
  title,
  description,
  category,
  date,
  children,
}: BlogPostLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <article className="mx-auto max-w-4xl px-6 py-20">

        <Link
          href="/blog"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back to Blog
        </Link>

        <header className="mt-12 border-b border-zinc-800 pb-12">

          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            {category}
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {description}
          </p>

          <p className="mt-6 text-sm text-zinc-500">
            {date}
          </p>

        </header>

        <div className="mt-12 space-y-10 leading-8 text-zinc-300">
          {children}
        </div>

      </article>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-zinc-500">
          © 2026 Adeeb.
        </div>
      </footer>
    </main>
  );
}