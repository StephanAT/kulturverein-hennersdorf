import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum - Kulturverein Hennersdorf",
  description: "Impressum des Gemeinnützigen Hennersdorfer Kulturvereins.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Impressum</h1>

      <div className="mt-8 space-y-6 text-sm text-gray-600 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Medieninhaber und Herausgeber</h2>
          <p className="mt-2">
            Gemeinnütziger Hennersdorfer Kulturverein<br />
            Josef Postl-Gasse 19<br />
            2332 Hennersdorf<br />
            Österreich
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Kontakt</h2>
          <p className="mt-2">
            E-Mail:{" "}
            <a href="mailto:office@kulturverein-hennersdorf.at" className="text-brand hover:underline">
              office@kulturverein-hennersdorf.at
            </a><br />
            Telefon: +43 660 4367566
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Obmann</h2>
          <p className="mt-2">Manfred Holzbach</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Vereinszweck</h2>
          <p className="mt-2">
            Förderung der Kultur und des Gemeinschaftslebens in Hennersdorf.
            Der Verein ist gemeinnützig und nicht auf Gewinn ausgerichtet.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Haftungshinweis</h2>
          <p className="mt-2">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Inhalte externer Links. Für den Inhalt der
            verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Bildnachweis</h2>
          <p className="mt-2">
            Fotos: Gemeinnütziger Hennersdorfer Kulturverein,
            Gemeinde Hennersdorf, martha-theater.at.
            Alle Rechte bei den jeweiligen Urhebern.
          </p>
        </div>
      </div>
    </div>
  );
}
