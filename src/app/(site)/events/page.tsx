import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veranstaltungen - Kulturverein Hennersdorf",
  description: "Aktuelle und vergangene Veranstaltungen des Kulturvereins Hennersdorf. Feste, Theateraufführungen und kulturelle Events.",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-violet-600">Termine & Rückblick</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Veranstaltungen</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Von Theateraufführungen über Dorffeste bis hin zu Kulturabenden —
        der Kulturverein Hennersdorf organisiert das ganze Jahr über Veranstaltungen
        für die Gemeinschaft.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Kommende Veranstaltungen</h2>
        <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
          <p className="text-sm text-gray-400">Termine werden in Kürze bekannt gegeben.</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Vergangene Veranstaltungen</h2>
        <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
          <p className="text-sm text-gray-400">Rückblick und Fotogalerien folgen in Kürze.</p>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-violet-50 p-6 text-center">
        <p className="text-sm text-gray-500">
          Sobald das CMS eingerichtet ist, können Veranstaltungen einfach über den
          Editor verwaltet werden.
        </p>
      </div>
    </div>
  );
}
