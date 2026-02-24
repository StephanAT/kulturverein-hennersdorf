import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kasperltheater - Kulturverein Hennersdorf",
  description:
    "Kasperltheater des Kulturvereins Hennersdorf — Puppentheater für Kinder und Familien mit handgefertigten Puppen.",
};

export default function KasperltheaterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Für die Kleinen
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Kasperltheater</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Unser Kasperltheater begeistert die jüngsten Zuschauer:innen mit handgefertigten
        Puppen und liebevollen Geschichten im Kulturzentrum 9er Haus. Ein fester
        Bestandteil des jährlichen Kulturprogramms des Martha Theaters.
      </p>

      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="border-l-2 border-brand pl-4">
          <p className="font-medium text-gray-800">Handgefertigte Puppen</p>
          <p>Jede Puppe wird mit Liebe gestaltet und hat ihren eigenen Charakter.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Spielort</p>
          <p>Kulturzentrum 9er Haus, Bachgasse 9, 2332 Hennersdorf.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Für die ganze Familie</p>
          <p>Spannende Geschichten für Kinder und vergnügliche Stunden für Eltern und Großeltern.</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/events"
          className="border border-brand px-4 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Nächste Termine
        </Link>
        <Link
          href="/martha-theater"
          className="border border-gray-200 px-4 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
        >
          Martha Theater
        </Link>
      </div>
    </div>
  );
}
