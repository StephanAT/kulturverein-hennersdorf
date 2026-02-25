import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "360° Panoramen - Kulturverein Hennersdorf",
  description:
    "Virtueller Rundgang durch Hennersdorf mit 25 interaktiven 360-Grad-Panoramen, Audioguides und Hintergrundmusik.",
};

const PANORAMA_LOCATIONS = [
  "Alpakagehege",
  "Bahnbrücke",
  "Bahnhof",
  "Damwildgehege",
  "Bachgasse",
  "Feuerwehr",
  "Friedhof",
  "Friedhofsbergerl",
  "Gemeindeamt",
  "Glocken",
  "Hauptplatz",
  "Kirche innen",
  "Kirchenplatz",
  "Kirche Südansicht",
  "Kirchturm",
  "ÖBB",
  "Pfarrhof",
  "S1 Bergerl",
  "Schendalersäule",
  "Spielplatz",
  "Teich Nordseite",
  "Wasserturm",
  "Wienerberger",
  "Wiesmayerkapelle",
];

export default function PanoramenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Virtueller Rundgang
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        360° Panoramen
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Entdecken Sie Hennersdorf digital: Die Dorferneuerungsgruppe des
        Kulturvereins hat einen interaktiven Rundgang mit 25 hochauflösenden
        360-Grad-Panoramen erstellt. Jedes Panorama ist mit Audioguides,
        Hintergrundmusik und farbigen Informations-Markern ausgestattet.
      </p>

      <div className="mt-8 rounded-lg border border-brand/20 bg-brand/5 p-6">
        <h2 className="text-[15px] font-semibold text-gray-800">So funktioniert&apos;s</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p>
            Navigieren Sie mit der Maus (am PC) oder dem Finger (am Smartphone)
            durch die Panoramabilder. Farbige Marker kennzeichnen interessante
            Punkte mit Informationstexten.
          </p>
          <p>
            Der Rundgang ist über die <strong>Gem2Go-App</strong>, über
            QR-Codes vor Ort und über die Gemeinde-Homepage erreichbar.
          </p>
        </div>
        <a
          href="https://www.gemeinde-hennersdorf.at/system/web/zusatzseite.aspx?detailonr=226769177&menuonr=226763919"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block border border-brand px-4 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Panoramen starten
        </a>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">
          25 Panorama-Standorte
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
          {PANORAMA_LOCATIONS.map((loc) => (
            <p key={loc} className="text-sm text-gray-600">
              {loc}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-800">Hintergrund</h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Das Panorama-Projekt wurde von der Dorferneuerungsgruppe des
          Kulturvereins initiiert und Ende 2019 fertiggestellt. Beim DorfCafé im
          September 2023 wurden die Panoramen der Öffentlichkeit präsentiert —
          rund 25 Besucher:innen erkundeten die verschiedenen Zugangswege und
          die 24 Panoramen mit Audioguides. Ein innovatives Projekt, das
          Hennersdorf digital erlebbar macht und Ortsgeschichte modern vermittelt.
        </p>
      </div>
    </div>
  );
}
