import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veranstaltungen - Kulturverein Hennersdorf",
  description:
    "Aktuelle und vergangene Veranstaltungen des Kulturvereins Hennersdorf.",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Termine & Rückblick
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Veranstaltungen</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Von Theateraufführungen über Dorffeste bis hin zu Kulturabenden —
        der Kulturverein Hennersdorf organisiert das ganze Jahr über
        Veranstaltungen für die Gemeinschaft.
      </p>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Kommende Termine</h2>
        <p className="mt-3 text-sm text-gray-400">
          Termine werden in Kürze bekannt gegeben.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Vergangene Veranstaltungen</h2>
        <p className="mt-3 text-sm text-gray-400">
          Rückblick und Fotogalerien folgen in Kürze.
        </p>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Sobald das CMS eingerichtet ist, können Veranstaltungen einfach über den
        Editor verwaltet werden.
      </p>
    </div>
  );
}
