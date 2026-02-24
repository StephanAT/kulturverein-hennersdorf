import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dorferneuerung - Kulturverein Hennersdorf",
  description: "Dorferneuerungsprojekte des Kulturvereins Hennersdorf. Gemeinsam gestalten wir die Zukunft unserer Gemeinde.",
};

export default function DorferneuerungPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-emerald-600">Gemeinde gestalten</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Dorferneuerung</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Im Rahmen der Dorferneuerung arbeiten wir gemeinsam mit der Gemeinde und
        engagierten Bürger:innen an der Verschönerung und Weiterentwicklung von
        Hennersdorf. Projekte, die unser Ortsbild nachhaltig verbessern.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-3xl">🌳</span>
          <h3 className="mt-3 text-lg font-semibold text-gray-800">Ortsbild</h3>
          <p className="mt-2 text-sm text-gray-500">
            Grünflächen, Plätze und öffentliche Räume werden gemeinsam gestaltet und gepflegt.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-3xl">🏗️</span>
          <h3 className="mt-3 text-lg font-semibold text-gray-800">Projekte</h3>
          <p className="mt-2 text-sm text-gray-500">
            Von der Planung bis zur Umsetzung — Dorferneuerung als Gemeinschaftswerk.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-emerald-50 p-6 text-center">
        <p className="text-sm text-gray-500">
          Detaillierte Projektbeschreibungen und Fotodokumentationen folgen in Kürze.
        </p>
      </div>
    </div>
  );
}
