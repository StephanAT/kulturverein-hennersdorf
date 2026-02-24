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
        jedes Jahr ein neues Stück auf die Bühne. Das Martha Theater ist benannt nach
        Martha Eichberger und ist ein fester Bestandteil des kulturellen Lebens in unserer Gemeinde.
      </p>

      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="border-l-2 border-brand pl-4">
          <p className="font-medium text-gray-800">Gegründet 1994</p>
          <p>Amateurtheater mit jährlicher Produktion und Premiere im Herbst.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Engagiertes Ensemble</p>
          <p>Schauspieler:innen, Regie und Technik aus der Region.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Namengeberin</p>
          <p>Benannt nach Martha Eichberger (2014).</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <a
          href="https://www.martha-theater.at/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-brand px-4 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Website besuchen
        </a>
        <Link
          href="/events"
          className="border border-gray-200 px-4 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
        >
          Veranstaltungen
        </Link>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Archiv vergangener Aufführungen und aktuelle Produktionen folgen in Kürze.
      </p>
    </div>
  );
}
