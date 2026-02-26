import Link from "next/link";
import type { Metadata } from "next";
import { STREETS, CATEGORY_LABELS, type Street } from "@/data/strassennamen";

export const metadata: Metadata = {
  title: "Straßennamen - Dorferneuerung - Kulturverein Hennersdorf",
  description:
    "Die Geschichten hinter den 23 Straßennamen von Hennersdorf. Recherchiert und dokumentiert von der Dorferneuerungsgruppe.",
};

function CategoryIcon({ category }: { category: Street["category"] }) {
  const icons: Record<Street["category"], string> = {
    person: "\u{1f464}",
    ort: "\u{1f4cd}",
    familie: "\u{1f46a}",
    flurname: "\u{1f33e}",
  };
  return <span aria-hidden>{icons[category]}</span>;
}

const grouped = (["person", "familie", "ort", "flurname"] as const).map(
  (cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    streets: STREETS.filter((s) => s.category === cat),
  })
);

export default function StrassennamenPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/dorferneuerung"
        className="mb-4 inline-block text-sm text-gray-400 hover:text-brand"
      >
        &larr; Dorferneuerung
      </Link>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Dorferneuerung
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Straßennamen von Hennersdorf
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
        Wer waren die Persönlichkeiten hinter den Straßennamen? Die
        Dorferneuerungsgruppe hat die Geschichten aller 23 Hennersdorfer
        Straßennamen recherchiert und dokumentiert — von der Böhlergasse bis
        zur Zehentnergasse.
      </p>

      {/* Stats */}
      <div className="mt-8 flex flex-wrap gap-3">
        {grouped.map((g) => (
          <div
            key={g.category}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5"
          >
            <div className="flex items-center gap-2">
              <CategoryIcon category={g.category} />
              <span className="text-sm font-medium text-gray-700">
                {g.label}
              </span>
              <span className="text-xs text-gray-400">
                ({g.streets.length})
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Alphabetical list */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">
          Alle Straßen von A bis Z
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STREETS.map((street) => (
            <Link
              key={street.slug}
              href={`/dorferneuerung/strassennamen/${street.slug}`}
              className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-brand/30 hover:shadow-md"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm">
                <CategoryIcon category={street.category} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-brand transition-colors">
                  {street.name}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 truncate">
                  {street.shortDesc}
                </p>
              </div>
              <span className="mt-0.5 text-gray-300 group-hover:text-brand transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Grouped by category */}
      {grouped.map((g) => (
        <div key={g.category} className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <CategoryIcon category={g.category} />
            {g.label}
          </h2>
          <div className="mt-4 space-y-2">
            {g.streets.map((street) => (
              <Link
                key={street.slug}
                href={`/dorferneuerung/strassennamen/${street.slug}`}
                className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 transition-all hover:border-brand/20"
              >
                <div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-brand transition-colors">
                    {street.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    {street.namedAfter}
                  </span>
                </div>
                <span className="text-xs text-gray-300 group-hover:text-brand">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
