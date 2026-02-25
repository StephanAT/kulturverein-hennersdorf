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

const DEFAULT_FILE = "Kirche_mit_Kirchenplatz";

export default function PanoramenPage() {
  const [activeFile, setActiveFile] = useState(DEFAULT_FILE);
  const activeLabel =
    PANORAMA_LOCATIONS.find((l) => l.file === activeFile)?.label || "";

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

      {/* Panorama Viewer */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-t-lg border border-gray-200">
          <iframe
            key={activeFile}
            src={`${BASE_URL}${activeFile}.html`}
            title={`360° Panorama: ${activeLabel}`}
            className="h-[400px] w-full sm:h-[500px]"
            allowFullScreen
          />
        </div>
        <div className="rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 px-4 py-2">
          <p className="text-xs text-gray-500">
            <span className="font-medium text-gray-700">{activeLabel}</span> — mit
            der Maus oder dem Finger navigieren. Marker anklicken für
            Informationen.
          </p>
        </div>
      </div>

      {/* Location Selector */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-800">Standort wählen</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PANORAMA_LOCATIONS.map((loc) => (
            <button
              key={loc.file}
              onClick={() => setActiveFile(loc.file)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeFile === loc.file
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 rounded-lg border border-brand/20 bg-brand/5 p-5">
        <p className="text-sm text-gray-600 leading-relaxed">
          Die Panoramen sind auch über die <strong>Gem2Go-App</strong> und
          QR-Codes vor Ort erreichbar. Innerhalb jedes Panoramas führen
          Navigations-Pfeile direkt zu benachbarten Standorten.
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

      {/* PDF Infoblatt */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Infoblatt: Panorama-Rundgang
        </h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Das Infoblatt erklärt die Standorte, Zugangswege und Bedienung der
          360°-Panoramen im Detail.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
          <iframe
            src="/documents/panoramen-infoblatt.pdf"
            title="Infoblatt 360° Panoramen Hennersdorf"
            className="h-[600px] w-full sm:h-[800px]"
          />
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
