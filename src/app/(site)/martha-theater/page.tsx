import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Martha Theater - Kulturverein Hennersdorf",
  description: "Das Martha Theater ist seit 1994 das Herzstück des Kulturvereins Hennersdorf. Jährliche Theaterproduktionen von engagierten Laienschauspieler:innen.",
};

export default function MarthaTheaterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-brand">Unser Hauptprojekt</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Martha Theater</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Seit 1994 bringen engagierte Laienschauspieler:innen aus Hennersdorf und Umgebung
        jedes Jahr ein neues Stück auf die Bühne. Das Martha Theater ist benannt nach
        Martha Eichberger und ist ein fester Bestandteil des kulturellen Lebens in unserer Gemeinde.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Über das Martha Theater</h2>
        <ul className="mt-4 space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">&#9679;</span>
            Gegründet 1994 als Amateurtheater
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">&#9679;</span>
            Jährliche Produktion mit Premiere im Herbst
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">&#9679;</span>
            Engagiertes Ensemble aus der Region
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">&#9679;</span>
            Benannt nach Martha Eichberger (2014)
          </li>
        </ul>
      </div>

      <div className="mt-8 flex gap-3">
        <a
          href="https://www.martha-theater.at/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-dark"
        >
          Website besuchen &rarr;
        </a>
        <Link
          href="/events"
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-all hover:border-brand/30 hover:text-brand"
        >
          Alle Veranstaltungen
        </Link>
      </div>

      <div className="mt-12 rounded-xl bg-brand-light/30 p-6 text-center">
        <p className="text-sm text-gray-500">
          Weitere Inhalte wie Archiv vergangener Aufführungen, aktuelle Produktion und
          Cast-Informationen folgen in Kürze.
        </p>
      </div>
    </div>
  );
}
