import Link from "next/link";
import type { Metadata } from "next";
import { NEWS_ENTRIES } from "@/data/dorferneuerung-news";

export const metadata: Metadata = {
  title: "Dorferneuerung - Kulturverein Hennersdorf",
  description:
    "Dorferneuerungsprojekte des Kulturvereins Hennersdorf. Gemeinsam gestalten wir die Zukunft unserer Gemeinde.",
};

export default function DorferneuerungPage() {
  const latestNews = [...NEWS_ENTRIES]
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Gemeinde gestalten
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Dorferneuerung
      </h1>
      <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
        Im Rahmen der NÖ Dorf- und Stadterneuerung arbeiten wir seit über zehn
        Jahren an der Verschönerung und Weiterentwicklung von Hennersdorf —
        von Denkmalrenovierungen über Schulprojekte bis hin zu Kulturradtouren.
      </p>

      {/* Quick links */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Link
          href="/dorferneuerung/aktuelles"
          className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-brand/30 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-lg text-brand">
            <span aria-hidden>&#x1f4f0;</span>
          </div>
          <h2 className="text-base font-semibold text-gray-800 group-hover:text-brand transition-colors">
            Aktuelles
          </h2>
          <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
            Neuigkeiten, Veranstaltungen und Berichte aus der Dorferneuerung.
          </p>
          <p className="mt-3 text-xs font-medium text-brand">
            {NEWS_ENTRIES.length} Beiträge &rarr;
          </p>
        </Link>

        <Link
          href="/dorferneuerung/projekte"
          className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-brand/30 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-lg text-brand">
            <span aria-hidden>&#x1f3d7;</span>
          </div>
          <h2 className="text-base font-semibold text-gray-800 group-hover:text-brand transition-colors">
            Projekte
          </h2>
          <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
            360° Panoramen, Kulturpfad, Weg der Ziegelbarone und mehr.
          </p>
          <p className="mt-3 text-xs font-medium text-brand">
            Alle Projekte &rarr;
          </p>
        </Link>

        <Link
          href="/dorferneuerung/strassennamen"
          className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-brand/30 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-lg text-brand">
            <span aria-hidden>&#x1f3d8;</span>
          </div>
          <h2 className="text-base font-semibold text-gray-800 group-hover:text-brand transition-colors">
            Straßennamen
          </h2>
          <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
            Die Geschichten hinter den 23 Hennersdorfer Straßennamen.
          </p>
          <p className="mt-3 text-xs font-medium text-brand">
            Alle Straßen &rarr;
          </p>
        </Link>
      </div>

      {/* Latest news preview */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Aktuelles</h2>
          <Link
            href="/dorferneuerung/aktuelles"
            className="text-sm font-medium text-brand hover:underline"
          >
            Alle Beiträge &rarr;
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {latestNews.map((entry) => (
            <Link
              key={entry.id}
              href={`/dorferneuerung/aktuelles#${entry.id}`}
              className="group block overflow-hidden rounded-lg border border-gray-100"
            >
              {entry.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={entry.images[0]}
                  alt={entry.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              )}
              <div className="p-3">
                <p className="text-[11px] text-gray-400">{entry.date}</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 leading-snug group-hover:text-brand transition-colors">
                  {entry.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mitmachen */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-800">Mitmachen</h2>
        <p className="mt-3 text-sm text-gray-600">
          Die Dorferneuerung lebt vom Engagement der Hennersdorfer:innen. Ob
          Ortsverschönerung, Denkmalrenovierung, Kinderprojekte oder
          Kulturradtouren — es gibt viele Möglichkeiten mitzuwirken.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Kontakt:{" "}
          <a
            href="mailto:manfred.holzbach@aon.at"
            className="text-brand hover:text-brand-dark"
          >
            manfred.holzbach@aon.at
          </a>
        </p>
      </div>
    </div>
  );
}
