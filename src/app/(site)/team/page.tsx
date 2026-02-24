import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team - Kulturverein Hennersdorf",
  description: "Das Team des Gemeinnützigen Hennersdorfer Kulturvereins. Vorstand, Mitglieder und engagierte Helfer:innen.",
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-brand">Wer wir sind</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Unser Team</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Der Gemeinnützige Hennersdorfer Kulturverein lebt von seinen engagierten
        Mitgliedern. Ob auf der Bühne, hinter den Kulissen oder in der Organisation —
        jede:r trägt zum Erfolg bei.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Vorstand</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white font-semibold">
              MH
            </div>
            <div>
              <p className="font-medium text-gray-800">Manfred Holzbach</p>
              <p className="text-sm text-gray-500">Obmann</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Mitglied werden</h2>
        <p className="mt-3 text-gray-600">
          Du möchtest Teil unseres Teams werden? Ob als Schauspieler:in, Helfer:in
          bei Veranstaltungen oder mit neuen Ideen — wir freuen uns über jede:n, der
          sich für Kultur in Hennersdorf engagieren möchte.
        </p>
      </div>

      <div className="mt-12 rounded-xl bg-brand-light/30 p-6 text-center">
        <p className="text-sm text-gray-500">
          Weitere Teammitglieder und Fotos folgen in Kürze.
        </p>
      </div>
    </div>
  );
}
