import Link from "next/link";
import Navbar from "@/components/Navbar";

const transistorPhotos = [
  {
    title: "2N3904 NPN Transistor",
    description:
      "A real 2N3904 in the common TO-92 through-hole package.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/2N3904_NPN_Transistor.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:2N3904_NPN_Transistor.jpg",
    credit: "WaxPhilosophic / Wikimedia Commons",
    license: "CC BY-SA 4.0",
  },

  {
    title: "2N3904 Close-Up",
    description:
      "Another real 2N3904 showing the package body and its three leads.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/2N3904.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:2N3904.jpg",
    credit: "Windell Oskay / Wikimedia Commons",
    license: "CC BY 2.0",
  },

  {
    title: "Inside a 2N3904",
    description:
      "A cut-open 2N3904. The semiconductor die and internal bond connection can be seen inside the package.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/2N3904_transistor_cross_section.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:2N3904_transistor_cross_section.jpg",
    credit: "TubeTimeUS / Wikimedia Commons",
    license: "CC BY-SA 4.0",
  },
];

export default function TransistorPhotos() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <Link
          href="/blog/how-transistors-work"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to How Transistors Work
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Photo Gallery
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            What transistors actually look like.
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Compare the schematic symbols and interactive models with
            photographs of real transistor packages and their internal
            construction.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {transistorPhotos.map((photo) => (
            <article
              key={photo.title}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-contain transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  {photo.title}
                </h2>

                <p className="mt-3 leading-7 text-zinc-400">
                  {photo.description}
                </p>

                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <p className="text-xs leading-5 text-zinc-600">
                    {photo.credit}
                    <br />
                    {photo.license}
                  </p>

                  <a
                    href={photo.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-emerald-400 transition hover:text-emerald-300"
                  >
                    View original source →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}