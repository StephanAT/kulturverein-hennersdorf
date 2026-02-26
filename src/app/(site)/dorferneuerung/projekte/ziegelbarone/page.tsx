import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weg der Ziegelbarone - Dorferneuerung - Kulturverein Hennersdorf",
  description:
    "Weg der Ziegelbarone: Ein 25 km langer Radweg südlich von Wien, der die Geschichte der Ziegelindustrie erlebbar macht.",
};

const ROUTE_STOPS = [
  {
    name: "Schloss Vösendorf",
    desc: "Offizieller Start am Thermenradweg (EuroVelo 9). Stadt-, Krippen- und Fahrradmuseum.",
  },
  {
    name: "Hennersdorf",
    desc: "Wienerberger-Zentrale und Ziegelwerk, Bahnstation mit Ziegelfassade, älteste Kirche der Region (Romanik, Gotik, Barock), Kulturpfad und Wildgehege am Petersbach.",
  },
  {
    name: "Leopoldsdorf",
    desc: "\u201EZiegelhaus AG34\u201C \u2014 ein restauriertes ehemaliges Arbeiterwohnhaus in typischer Ziegelbauweise. Land-Art-Objekte zur ehemaligen Trasse des Wiener Neust\u00E4dter Kanals.",
  },
  {
    name: "Maria Lanzendorf",
    desc: "Historischer Bahnhof der Aspangbahn, Wallfahrtskirche mit begehbarem Kreuzweg — über einer frühchristlichen Kapelle erbaut.",
  },
  {
    name: "Himberg",
    desc: "\u00DCber das \u201EHahnenkreuz\u201C am Rande von Himberg weiter nach Achau.",
  },
  {
    name: "Achau",
    desc: "Schautafeln \u00FCber die Kaiserablass, ein imposantes Wasserbauwerk. \u201EKulturachse\u201C mit Kirche, \u00E4ltester Steinbr\u00FCcke der Region und Schloss.",
  },
  {
    name: "Biedermannsdorf",
    desc: "Ende des wasserführenden Wiener Neustädter Kanals an einem Wasserfall — idealer Rastplatz.",
  },
  {
    name: "Laxenburg",
    desc: "Schloss und Schlosspark mit romantischer Teichlandschaft und historischer Franzensburg.",
  },
];

export default function ZiegelbaronePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/dorferneuerung/projekte"
        className="mb-4 inline-block text-sm text-gray-400 hover:text-brand"
      >
        &larr; Projekte
      </Link>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Projekt der Dorferneuerung
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Weg der Ziegelbarone
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
        In der Region südlich von Wien haben 8 Gemeinden die Radroute ‚Weg der
        Ziegelbarone" als gemeinsames Projekt entwickelt. Die unterschiedlichen
        Aspekte der Ziegelproduktion und der daraus entstandenen Verkehrswege
        sind ein Themenschwerpunkt.
      </p>

      {/* Key facts */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Länge", value: "~25 km" },
          { label: "Gemeinden", value: "8" },
          { label: "Eröffnung", value: "April 2019" },
          { label: "Schwierigkeit", value: "Einfach" },
        ].map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-gray-200 bg-white p-4 text-center"
          >
            <p className="text-xl font-bold text-brand">{fact.value}</p>
            <p className="text-xs text-gray-500 mt-1">{fact.label}</p>
          </div>
        ))}
      </div>

      {/* Hero image */}
      <div className="mt-8 overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dorferneuerung/ziegelbarone-wegweiser.jpg"
          alt="Wegweiser am Weg der Ziegelbarone"
          className="w-full object-cover"
        />
      </div>

      {/* Description */}
      <div className="mt-8 space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>
          Der ‚Weg der Ziegelbarone" wurde am 27. April 2019 im Rahmen der NÖ
          Landesausstellung eröffnet. Teil des Konzepts ist es, Radtourist:innen
          aus Wien und dem Umland entlang des Wiener Neustädter Kanals
          anzusprechen. Der Kanal war vor dem Siegeszug der Eisenbahn und des LKW
          der bedeutendste Verkehrsweg für den Gütertransport in der Region — so
          auch für die vielen Ziegelwerke.
        </p>
        <p>
          Die Radroute ist beschildert, abwechslungsreich und einfach zu
          befahren. Sie nutzt hauptsächlich Nebenstraßen und Güterwege — ideal
          für Familien und Genussradler:innen. In jeder Gemeinde gibt es
          Übersichts- und Thementafeln mit interessanten Orten und verfügbaren
          Gaststätten.
        </p>
      </div>

      {/* Route */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">
          Die Route im Überblick
        </h2>
        <div className="mt-5 space-y-4">
          {ROUTE_STOPS.map((stop, i) => (
            <div key={stop.name} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    stop.name === "Hennersdorf" ? "bg-brand" : "bg-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                {i < ROUTE_STOPS.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 my-1" />
                )}
              </div>
              <div className="pb-4">
                <h3
                  className={`text-sm font-semibold ${
                    stop.name === "Hennersdorf"
                      ? "text-brand"
                      : "text-gray-800"
                  }`}
                >
                  {stop.name}
                  {stop.name === "Hennersdorf" && (
                    <span className="ml-2 text-xs font-normal text-brand/70">
                      Unser Ort
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {stop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beitrag der Dorferneuerung */}
      <div className="mt-10 rounded-xl border border-brand/20 bg-brand/5 p-5">
        <h2 className="text-sm font-semibold text-gray-800">
          Beitrag der Dorferneuerung
        </h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Die Dorferneuerungsgruppe brachte die Idee der Radroute auf, warb
          dafür und koordinierte die Planung mit den Nachbargemeinden, der
          Radlobby, NÖ Regional, der Pfarre und Unternehmen — vor allem
          Wienerberger und ÖBB. In der Schlussphase wurden Aufstellungsorte,
          Inhalte und Designs der Schilder und Folder erarbeitet. Bei der
          Eröffnungsfeier wurde tatkräftig mitgeholfen.
        </p>
      </div>

      {/* Anradeln */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Jährliches Anradeln
        </h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Jedes Frühjahr organisiert die Dorferneuerungsgruppe das ‚Anradeln" am
          Weg der Ziegelbarone. Treffpunkt ist der Hennersdorfer Hauptplatz.
          Während der ca. 2½-stündigen gemeinsamen Fahrt werden interessante Orte
          entlang des Weges erläutert. Radtourenkoordinator Gerhard Horvath führt
          die Gruppe durch die Region.
        </p>
      </div>

      {/* Downloads */}
      <div className="mt-10 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-semibold text-gray-800">Downloads</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <a
            href="/documents/dorferneuerung/ziegelbarone-karte.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand/30 hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Routenkarte (PDF)
          </a>
          <a
            href="/documents/dorferneuerung/kulturradtour-2024.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand/30 hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Zeitplan Kulturradtour 2024 (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
