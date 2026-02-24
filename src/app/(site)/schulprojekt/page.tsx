import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schulprojekt - Kulturverein Hennersdorf",
  description:
    "Schulprojekte des Kulturvereins Hennersdorf. Workshops und Exkursionen mit der Volksschule Achau-Hennersdorf.",
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
        Schulalltag. Seit 2024 gestaltet die Dorferneuerungsgruppe Workshops und
        Exkursionen für die dritten Klassen.
      </p>

      {/* Fotos */}
      <div className="mt-8 grid grid-cols-2 gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dorferneuerung/workshop-2025-1.jpg"
          alt="Workshop in der Volksschule 2025"
          className="h-40 w-full object-cover sm:h-48"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dorferneuerung/exkursion-2025-1.jpg"
          alt="Exkursion durch Hennersdorf 2025"
          className="h-40 w-full object-cover sm:h-48"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/team/holzbach-schulprojekt.jpg"
          alt="Andrea und Manfred Holzbach mit Volksschulkindern"
          className="h-40 w-full object-cover sm:h-48"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dorferneuerung/kinder-dorfgespraech-1.jpg"
          alt="Kinder-Dorfgespräch Abschlussveranstaltung"
          className="h-40 w-full object-cover sm:h-48"
          loading="lazy"
        />
      </div>

      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="border-l-2 border-brand pl-4">
          <p className="font-medium text-gray-800">Workshops in der Volksschule</p>
          <p>
            An drei Themenstationen lernen die Kinder über die Geschichte Hennersdorfs,
            die umgebende Landschaft und die heimische Tier- und Pflanzenwelt.
            Ein Quiz und virtuelle 360°-Panoramen runden den Vormittag ab.
          </p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Exkursionen durch Hennersdorf</p>
          <p>
            Die Kinder besuchen die Ziegelfabrik Wienerberger, die Kirche mit ihrer
            Baugeschichte, die Toyota-Autowerkstatt und das Gemeindeamt.
          </p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">Kinder-Dorfgespräch</p>
          <p>
            Kinder präsentieren, was ihnen an Hennersdorf gefällt und was verbessert
            werden sollte. Der Trinkbrunnen neben der Kirche war ein früherer
            Kinderwunsch, der bereits umgesetzt wurde.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/dorferneuerung"
          className="border border-brand px-4 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Alle Dorferneuerungsprojekte
        </Link>
      </div>
    </div>
  );
}
