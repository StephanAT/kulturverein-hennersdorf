import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kasperltheater - Kulturverein Hennersdorf",
  description: "Kasperltheater des Kulturvereins Hennersdorf - Puppentheater für Kinder und Familien mit handgefertigten Puppen.",
};

export default function KasperltheaterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-amber-600">Für die Kleinen</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Kasperltheater</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Unser Kasperltheater begeistert die jüngsten Zuschauer:innen mit handgefertigten
        Puppen und liebevollen Geschichten. Ein Erlebnis für die ganze Familie.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-3xl">🧸</span>
          <h3 className="mt-3 text-lg font-semibold text-gray-800">Handgefertigte Puppen</h3>
          <p className="mt-2 text-sm text-gray-500">
            Jede Puppe wird mit Liebe gestaltet und hat ihren eigenen Charakter.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-3xl">👨‍👩‍👧‍👦</span>
          <h3 className="mt-3 text-lg font-semibold text-gray-800">Für Familien</h3>
          <p className="mt-2 text-sm text-gray-500">
            Spannende Geschichten für Kinder und vergnügliche Stunden für Eltern.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-amber-50 p-6 text-center">
        <p className="text-sm text-gray-500">
          Weitere Inhalte wie Aufführungstermine und Bildergalerien folgen in Kürze.
        </p>
      </div>
    </div>
  );
}
