import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team - Kulturverein Hennersdorf",
  description:
    "Das Team des Gemeinnützigen Hennersdorfer Kulturvereins.",
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Wer wir sind
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Unser Team</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Der Gemeinnützige Hennersdorfer Kulturverein lebt von seinen engagierten
        Mitgliedern. Ob auf der Bühne, hinter den Kulissen oder in der Organisation —
        jede:r trägt zum Erfolg bei.
      </p>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Vorstand</h2>
        <div className="mt-4 border-l-2 border-brand pl-4">
          <p className="font-medium text-gray-800">Manfred Holzbach</p>
          <p className="text-sm text-gray-500">Obmann</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Mitglied werden</h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Du möchtest Teil unseres Teams werden? Ob als Schauspieler:in, Helfer:in
          bei Veranstaltungen oder mit neuen Ideen — wir freuen uns über jede:n, der
          sich für Kultur in Hennersdorf engagieren möchte.
        </p>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Weitere Teammitglieder und Fotos folgen in Kürze.
      </p>
    </div>
  );
}
