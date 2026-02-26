import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { STREETS, CATEGORY_LABELS } from "@/data/strassennamen";

export function generateStaticParams() {
  return STREETS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const street = STREETS.find((s) => s.slug === slug);
  if (!street) return {};
  return {
    title: `${street.name} - Straßennamen - Kulturverein Hennersdorf`,
    description: `${street.name}: ${street.shortDesc}. ${street.namedAfter}.`,
  };
}

export default async function StreetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = STREETS.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();

  const street = STREETS[idx];
  const prev = idx > 0 ? STREETS[idx - 1] : null;
  const next = idx < STREETS.length - 1 ? STREETS[idx + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/dorferneuerung/strassennamen"
        className="mb-4 inline-block text-sm text-gray-400 hover:text-brand"
      >
        &larr; Alle Straßennamen
      </Link>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-3">
          {CATEGORY_LABELS[street.category]}
        </span>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          {street.name}
        </h1>
        <p className="mt-2 text-lg text-gray-500">{street.shortDesc}</p>
      </div>

      {/* Info card */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Benannt nach
            </dt>
            <dd className="mt-0.5 text-sm font-medium text-gray-700">
              {street.namedAfter}
            </dd>
          </div>
          {street.born && (
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Geboren
              </dt>
              <dd className="mt-0.5 text-sm text-gray-700">{street.born}</dd>
            </div>
          )}
          {street.died && (
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Gestorben
              </dt>
              <dd className="mt-0.5 text-sm text-gray-700">{street.died}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Lage in Hennersdorf
            </dt>
            <dd className="mt-0.5 text-sm text-gray-700">
              {street.location}
            </dd>
          </div>
          {street.beschluss && (
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Gemeinderatsbeschluss
              </dt>
              <dd className="mt-0.5 text-sm text-gray-700">
                {street.beschluss}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Body text */}
      <div className="prose prose-sm prose-gray max-w-none">
        {street.body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Fun fact */}
      {street.funFact && (
        <div className="mt-8 rounded-xl border border-brand/20 bg-brand/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-1">
            Wussten Sie?
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {street.funFact}
          </p>
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="mt-10 flex items-stretch gap-3 border-t border-gray-200 pt-6">
        {prev ? (
          <Link
            href={`/dorferneuerung/strassennamen/${prev.slug}`}
            className="flex-1 rounded-lg border border-gray-200 p-3 transition-colors hover:border-brand/30"
          >
            <p className="text-xs text-gray-400">&larr; Vorherige</p>
            <p className="mt-0.5 text-sm font-medium text-gray-700">
              {prev.name}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/dorferneuerung/strassennamen/${next.slug}`}
            className="flex-1 rounded-lg border border-gray-200 p-3 text-right transition-colors hover:border-brand/30"
          >
            <p className="text-xs text-gray-400">Nächste &rarr;</p>
            <p className="mt-0.5 text-sm font-medium text-gray-700">
              {next.name}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
