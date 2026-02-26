import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Martha Theater - Kulturverein Hennersdorf",
  description:
    "Das Martha Theater ist seit 1994 das Herzstück des Kulturvereins Hennersdorf. Jährliche Theaterproduktionen von engagierten Laienschauspieler:innen.",
};

export default function MarthaTheaterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Unser Hauptprojekt
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Martha Theater</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Seit 1994 bringen engagierte Laienschauspieler:innen aus Hennersdorf und Umgebung
        jedes Jahr ein neues Stück auf die Bühne des Kulturzentrums 9er Haus. Benannt nach
        Martha Eichberger, ist das Theater ein fester Bestandteil des kulturellen Lebens
        in unserer Gemeinde.
      </p>

      {/* Szenenfotos — featured + grid */}
      <div className="mt-10 space-y-3">
        <div className="group overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/martha-theater/szene-2.jpg"
            alt="Ensemble des Martha Theaters auf der Bühne"
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { src: "/images/martha-theater/szene-1.jpg", alt: "Szene aus einer Martha Theater Aufführung" },
            { src: "/images/martha-theater/szene-3.jpg", alt: "Theaterszene im Kulturzentrum 9er Haus" },
            { src: "/images/martha-theater/szene-4.jpg", alt: "Aufführung des Martha Theaters" },
          ].map((img) => (
            <div key={img.src} className="group overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">Fotos: martha-theater.at</p>
      </div>

      {/* Info */}
      <div className="mt-10 space-y-3 text-sm text-gray-600">
        <div className="border-l-2 border-brand pl-4">
          <p className="font-medium text-gray-800">Gegründet 1994</p>
          <p>Amateurtheater mit jährlicher Produktion und Premiere im Herbst.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Spielort</p>
          <p>Kulturzentrum 9er Haus, Bachgasse 9, 2332 Hennersdorf.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Namengeberin</p>
          <p>Benannt nach Martha Eichberger (2014).</p>
        </div>
      </div>

      {/* Letzte Produktionen */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Letzte Produktionen</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <span>Bäuerin sucht…</span>
            <span className="text-gray-400">2025</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <span>Das (perfekte) Desaster Dinner</span>
            <span className="text-gray-400">2024</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <span>Heinz Erhardt — Mein Leben</span>
            <span className="text-gray-400">2024</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <span>Verliebt, verlobt, und wie verhext!</span>
            <span className="text-gray-400">2023</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <a
          href="https://www.martha-theater.at/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-brand px-4 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
        >
          martha-theater.at
        </a>
        <Link
          href="/events"
          className="border border-gray-200 px-4 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
        >
          Veranstaltungen
        </Link>
      </div>
    </div>
  );
}
