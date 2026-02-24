import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schulprojekt - Kulturverein Hennersdorf",
  description:
    "Schulprojekte des Kulturvereins Hennersdorf. Workshops und Exkursionen mit Kindern und Jugendlichen.",
};

export default function SchulprojektPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Nachwuchs fördern
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Schulprojekt</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Gemeinsam mit der Volksschule Achau-Hennersdorf bringen wir Kultur in den
        Schulalltag. Kreative Workshops, Exkursionen durch Hennersdorf und
        interaktive Lernstationen wecken die Freude an Kunst, Geschichte und Natur.
      </p>

      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Workshops</p>
          <p>Themenstationen zu Geschichte, Landschaft und heimischer Tier- und Pflanzenwelt.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Exkursionen</p>
          <p>Rundgänge durch Hennersdorf mit Besuch bei Betrieben und Kulturstätten.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Kinder-Dorfgespräch</p>
          <p>Kinder gestalten Hennersdorf mit — ihre Ideen werden ernst genommen und umgesetzt.</p>
        </div>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Detaillierte Projektberichte und Fotogalerien folgen in Kürze.
      </p>
    </div>
  );
}
