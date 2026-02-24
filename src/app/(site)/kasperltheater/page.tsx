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
        Puppen und liebevollen Geschichten. Ein Erlebnis für die ganze Familie.
      </p>

      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Handgefertigte Puppen</p>
          <p>Jede Puppe wird mit Liebe gestaltet und hat ihren eigenen Charakter.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Für Familien</p>
          <p>Spannende Geschichten für Kinder und vergnügliche Stunden für Eltern.</p>
        </div>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Aufführungstermine und Bildergalerien folgen in Kürze.
      </p>
    </div>
  );
}
