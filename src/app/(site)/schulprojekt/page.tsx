import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schulprojekt - Kulturverein Hennersdorf",
  description: "Schulprojekte des Kulturvereins Hennersdorf. Kreative Workshops und Projekte mit Kindern und Jugendlichen.",
};

export default function SchulprojektPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-blue-600">Nachwuchs fördern</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Schulprojekt</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Kreative Workshops und Projekte mit Schulkindern — wir fördern junge Talente
        und wecken die Freude an Kunst und Kultur. Gemeinsam mit der Volksschule Hennersdorf
        bringen wir Kultur in den Schulalltag.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-3xl">🎨</span>
          <h3 className="mt-3 font-semibold text-gray-800">Kreativ-Workshops</h3>
          <p className="mt-2 text-sm text-gray-500">Malen, Basteln und künstlerisches Gestalten.</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-3xl">🎭</span>
          <h3 className="mt-3 font-semibold text-gray-800">Theater-AGs</h3>
          <p className="mt-2 text-sm text-gray-500">Erste Bühnenerfahrungen für junge Talente.</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-3xl">📚</span>
          <h3 className="mt-3 font-semibold text-gray-800">Leseförderung</h3>
          <p className="mt-2 text-sm text-gray-500">Geschichten entdecken und erzählen lernen.</p>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-blue-50 p-6 text-center">
        <p className="text-sm text-gray-500">
          Detaillierte Projektberichte und Fotogalerien folgen in Kürze.
        </p>
      </div>
    </div>
  );
}
