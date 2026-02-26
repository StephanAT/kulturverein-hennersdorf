import Link from "next/link";
import type { Metadata } from "next";
import { KULTURPFAD_STATIONS } from "@/data/kulturpfad";

export const metadata: Metadata = {
  title: "Kulturpfad - Dorferneuerung - Kulturverein Hennersdorf",
  description:
    "Der Hennersdorfer Kulturpfad: Ein zwei Kilometer langer Fußweg, der elf historische Orte miteinander verbindet.",
};

export default function KulturpfadPage() {
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
        Kulturpfad Hennersdorf
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
        Der Hennersdorfer Kulturpfad ist ein etwa zwei Kilometer langer Fußweg,
        der interessante historische Orte miteinander verbindet. Er wurde von
        der Dorferneuerungsgruppe ausgearbeitet und mit Hilfe des Landes
        Niederösterreich und der Gemeinde Hennersdorf umgesetzt.
      </p>
      <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-2xl">
        Er beginnt bei den Wienerberger Ziegelwerken und endet beim
        Gemeindeamt. Elf Schautafeln beschreiben die Geschichte und die
        Bedeutung des jeweiligen Ortes für Hennersdorf. Ein künstlerisch
        gestalteter Folder begleitet den Spaziergang.
      </p>

      {/* Route overview */}
      <div className="mt-8 rounded-xl border border-brand/20 bg-brand/5 p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <span className="font-medium text-brand">Route:</span>
          {KULTURPFAD_STATIONS.map((s, i) => (
            <span key={s.slug}>
              <a
                href={`#station-${s.nr}`}
                className="hover:text-brand hover:underline"
              >
                {s.title}
              </a>
              {i < KULTURPFAD_STATIONS.length - 1 && (
                <span className="ml-2 text-gray-300">&rarr;</span>
              )}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Ca. 2 km &middot; 11 Stationen &middot; Zu Fuß erreichbar
        </p>
      </div>

      {/* Stations */}
      <div className="mt-10 space-y-12">
        {KULTURPFAD_STATIONS.map((station) => (
          <article
            key={station.slug}
            id={`station-${station.nr}`}
            className="scroll-mt-20"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="w-full sm:w-64 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={station.image}
                  alt={station.title}
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {station.nr}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {station.title}
                  </h2>
                </div>
                <p className="text-sm font-medium text-gray-500 mb-3">
                  {station.shortDesc}
                </p>
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  {station.body.split("\n\n").map((para, i) => {
                    if (para.startsWith("**") && para.includes("**\n")) {
                      const [heading, ...rest] = para.split("\n");
                      const title = heading.replace(/\*\*/g, "");
                      return (
                        <div key={i}>
                          <h3 className="font-semibold text-gray-700 mt-4 mb-1">
                            {title}
                          </h3>
                          <p>{rest.join(" ")}</p>
                        </div>
                      );
                    }
                    if (para.startsWith("**")) {
                      const match = para.match(/^\*\*(.+?)\*\*\s*([\s\S]*)/);
                      if (match) {
                        return (
                          <div key={i}>
                            <h3 className="font-semibold text-gray-700 mt-4 mb-1">
                              {match[1]}
                            </h3>
                            <p>{match[2]}</p>
                          </div>
                        );
                      }
                    }
                    return <p key={i}>{para}</p>;
                  })}
                </div>
              </div>
            </div>
            {station.nr < KULTURPFAD_STATIONS.length && (
              <div className="mt-6 border-b border-gray-100" />
            )}
          </article>
        ))}
      </div>

      {/* Back to top */}
      <div className="mt-10 border-t border-gray-200 pt-6 text-center">
        <a
          href="#"
          className="text-sm font-medium text-brand hover:underline"
        >
          Zurück nach oben
        </a>
      </div>
    </div>
  );
}
