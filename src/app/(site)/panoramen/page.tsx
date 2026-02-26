"use client";

import { useState } from "react";

const BASE_URL = "http://www.werbevilla.at/Panoramen_neu/";

const PANORAMA_LOCATIONS = [
  { label: "Startpunkt", file: "Start" },
  { label: "Alpakagehege", file: "Alpakagehege" },
  { label: "Bahnbrücke", file: "Bahnbruecke" },
  { label: "Bahnhof", file: "Bahnhof_morgens_2" },
  { label: "Damwildgehege", file: "Damwildgehege" },
  { label: "Bachgasse", file: "Feuerwehr_Bachgasse" },
  { label: "Feuerwehr", file: "Feuerwehr_Hauptstrasse" },
  { label: "Friedhof", file: "Friedhof_2022" },
  { label: "Friedhofsbergerl", file: "Friedhofsbergerl" },
  { label: "Gemeindeamt", file: "Gemeindeamt" },
  { label: "Glocken", file: "Glocken" },
  { label: "Hauptplatz", file: "Hauptstrasse_Hauptplatz" },
  { label: "Kirche innen", file: "Kirche_Altar_innen" },
  { label: "Kirchenplatz", file: "Kirche_mit_Kirchenplatz" },
  { label: "Kirche Südansicht", file: "Kirche_Sueden_3" },
  { label: "Kirchturm", file: "Kirchturm" },
  { label: "ÖBB", file: "OEBB_Bahnsteige" },
  { label: "Pfarrhof", file: "Pfarrhof_Vorplatz" },
  { label: "S1 Bergerl", file: "S1_Bergerl" },
  { label: "Schendalersäule", file: "Schendalersaeule" },
  { label: "Spielplatz", file: "Spielplatz" },
  { label: "Teich Nordseite", file: "Teich_Nordseite" },
  { label: "Teich Ostseite", file: "Teich_Ostseite" },
  { label: "Wasserturm", file: "Wasserturm" },
  { label: "Wienerberger", file: "Wienerberger_1" },
  { label: "Wiesmayerkapelle", file: "Wiesmayerkapelle_August_2019_morgens" },
];

const PDF_PAGES = [
  "/images/panoramen/infoblatt-1.jpg",
  "/images/panoramen/infoblatt-2.jpg",
  "/images/panoramen/infoblatt-3.jpg",
];

// Pairs: [0,1], [2] — show 2 pages side by side, last page alone if odd
const PAGE_SPREADS: number[][] = [];
for (let i = 0; i < PDF_PAGES.length; i += 2) {
  if (i + 1 < PDF_PAGES.length) {
    PAGE_SPREADS.push([i, i + 1]);
  } else {
    PAGE_SPREADS.push([i]);
  }
}

export default function PanoramenPage() {
  const [spread, setSpread] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Virtueller Rundgang
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        360° Panoramen
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Entdecken Sie Hennersdorf digital: Die Dorferneuerungsgruppe des
        Kulturvereins hat einen interaktiven Rundgang mit 26 hochauflösenden
        360-Grad-Panoramen erstellt. Jedes Panorama ist mit Audioguides,
        Hintergrundmusik und farbigen Informations-Markern ausgestattet.
      </p>

      {/* Hero CTA — Rundgang starten */}
      <a
        href={`${BASE_URL}Kirche_mit_Kirchenplatz.html`}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 block overflow-hidden rounded-xl border border-brand/20 bg-gradient-to-br from-brand/5 to-brand/15 transition-all hover:border-brand/40 hover:shadow-lg"
      >
        <div className="flex items-center gap-5 px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-md transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 sm:h-8 sm:w-8">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-800 sm:text-xl">
              Rundgang starten
            </p>
            <p className="mt-0.5 text-sm text-gray-500">
              Einstiegspunkt Kirchenplatz &mdash; von dort aus durch ganz Hennersdorf navigieren
            </p>
          </div>
          <span className="hidden text-brand transition-transform group-hover:translate-x-1 sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </a>

      {/* Panorama Locations */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-800">
          Oder direkt einen Standort wählen
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {PANORAMA_LOCATIONS.map((loc) => (
            <a
              key={loc.file}
              href={`${BASE_URL}${loc.file}.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-brand hover:text-white sm:px-3 sm:py-1.5 sm:text-xs"
            >
              {loc.label}
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Öffnet das interaktive Panorama in einem neuen Tab. Innerhalb der
          Panoramen führen Pfeile zu benachbarten Standorten.
        </p>
      </div>

      {/* Info */}
      <div className="mt-8 rounded-lg border border-brand/20 bg-brand/5 p-5">
        <p className="text-sm text-gray-600 leading-relaxed">
          Die Panoramen sind auch über die <strong>Gem2Go-App</strong> und
          QR-Codes vor Ort erreichbar. Mit der Maus (PC) oder dem Finger
          (Smartphone) durch die Bilder navigieren — farbige Marker zeigen
          interessante Punkte mit Informationstexten.
        </p>
      </div>

      {/* Hintergrund */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-800">Hintergrund</h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Das Panorama-Projekt wurde von der Dorferneuerungsgruppe des
          Kulturvereins initiiert und Ende 2019 fertiggestellt. Beim DorfCafé im
          September 2023 wurden die Panoramen der Öffentlichkeit präsentiert —
          rund 25 Besucher:innen erkundeten die verschiedenen Zugangswege und
          die Panoramen mit Audioguides. Ein innovatives Projekt, das
          Hennersdorf digital erlebbar macht und Ortsgeschichte modern vermittelt.
        </p>
      </div>

      {/* PDF Infoblatt as page viewer */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Infoblatt: Panorama-Rundgang
        </h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Das Infoblatt erklärt die Standorte, Zugangswege und Bedienung der
          360°-Panoramen im Detail.
        </p>

        {/* Page viewer */}
        <div className="mt-5">
          <div className="flex items-center justify-center gap-1 rounded-t-lg border border-b-0 border-gray-200 bg-gray-50 px-4 py-2">
            <button
              onClick={() => setSpread((s) => Math.max(0, s - 1))}
              disabled={spread === 0}
              className="rounded px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              &larr; Zurück
            </button>
            <span className="mx-3 text-xs text-gray-400">
              {PAGE_SPREADS[spread].map((i) => i + 1).join("–")} von{" "}
              {PDF_PAGES.length}
            </span>
            <button
              onClick={() =>
                setSpread((s) => Math.min(PAGE_SPREADS.length - 1, s + 1))
              }
              disabled={spread === PAGE_SPREADS.length - 1}
              className="rounded px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              Weiter &rarr;
            </button>
          </div>
          <div className="flex gap-px overflow-hidden rounded-b-lg border border-gray-200 bg-gray-200">
            {PAGE_SPREADS[spread].map((pageIdx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={pageIdx}
                src={PDF_PAGES[pageIdx]}
                alt={`Infoblatt Seite ${pageIdx + 1}`}
                className={`bg-white object-contain ${
                  PAGE_SPREADS[spread].length === 2 ? "w-1/2" : "mx-auto w-1/2"
                }`}
              />
            ))}
          </div>
        </div>

        <a
          href="/documents/panoramen-infoblatt.pdf"
          download
          className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
        >
          PDF herunterladen
        </a>
      </div>
    </div>
  );
}
