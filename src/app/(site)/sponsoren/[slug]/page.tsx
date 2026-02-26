import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch, sanityImageUrl } from "@/lib/sanity";
import { FALLBACK_SPONSORS, TIER_LABELS } from "@/data/sponsoren";

const TIER_MAP: Record<string, string> = {
  main: "hauptsponsor",
  supporter: "foerderer",
  hauptsponsor: "hauptsponsor",
  sponsor: "sponsor",
  partner: "partner",
  foerderer: "foerderer",
};

interface Props {
  params: Promise<{ slug: string }>;
}

async function getSponsor(slug: string) {
  // Try Sanity first (match by slug or by generated slug from name)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sponsors: any[] = [];
  try {
    sponsors = await sanityFetch(
      `*[_type == "sponsor"]{ _id, name, slug, logo, website, tier, description, bodyHtml }`
    );
  } catch {
    // Sanity unavailable
  }

  if (sponsors.length > 0) {
    const s = sponsors.find(
      (sp: any) =>
        sp.slug?.current === slug ||
        (sp.name &&
          sp.name
            .toLowerCase()
            .replace(/[^a-z0-9\u00E4\u00F6\u00FC\u00DF]+/g, "-")
            .replace(/-+$/, "")
            .replace(/^-+/, "") === slug)
    );
    if (s) {
      return {
        slug,
        name: s.name,
        tier: TIER_MAP[s.tier] || "partner",
        description: s.description || "",
        website: s.website,
        logoUrl:
          s.logo && typeof s.logo === "object"
            ? sanityImageUrl(s.logo, 400) || undefined
            : undefined,
        bodyHtml: s.bodyHtml || "",
      };
    }
  }

  // Fallback
  const fallback = FALLBACK_SPONSORS.find((f) => f.slug === slug);
  if (!fallback) return null;

  return {
    slug: fallback.slug,
    name: fallback.name,
    tier: fallback.tier,
    description: fallback.description,
    website: fallback.website,
    logoUrl: fallback.logo,
    bodyHtml: fallback.bodyHtml,
  };
}

export async function generateStaticParams() {
  return FALLBACK_SPONSORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sponsor = await getSponsor(slug);
  if (!sponsor) return {};
  return {
    title: `${sponsor.name} - Sponsoren - Kulturverein Hennersdorf`,
    description:
      sponsor.description ||
      `${sponsor.name} unterst\u00FCtzt den Kulturverein Hennersdorf.`,
  };
}

export const revalidate = 60;

export default async function SponsorDetailPage({ params }: Props) {
  const { slug } = await params;
  const sponsor = await getSponsor(slug);
  if (!sponsor) notFound();

  const tierLabel = TIER_LABELS[sponsor.tier] || sponsor.tier;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Back */}
      <Link
        href="/sponsoren"
        className="mb-6 inline-block text-sm text-gray-400 hover:text-brand"
      >
        &larr; Sponsoren & Partner
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Logo */}
        {sponsor.logoUrl && (
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sponsor.logoUrl}
              alt={sponsor.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        {!sponsor.logoUrl && (
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-brand text-3xl font-bold text-white">
            {sponsor.name.charAt(0)}
          </div>
        )}

        <div>
          <span className="inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
            {tierLabel}
          </span>
          <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
            {sponsor.name}
          </h1>
          {sponsor.description && (
            <p className="mt-2 text-gray-600 leading-relaxed">
              {sponsor.description}
            </p>
          )}
          {sponsor.website && (
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Website besuchen
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      {sponsor.bodyHtml && (
        <div
          className="prose prose-sm prose-gray mt-8 max-w-none prose-headings:text-gray-800 prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: sponsor.bodyHtml }}
        />
      )}

      {/* Back + CTA */}
      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-6">
        <Link
          href="/sponsoren"
          className="text-sm font-medium text-gray-500 hover:text-brand"
        >
          &larr; Alle Sponsoren & Partner
        </Link>
        <a
          href="mailto:office@kulturverein-hennersdorf.at"
          className="ml-auto text-sm font-medium text-brand hover:underline"
        >
          Auch Sponsor werden?
        </a>
      </div>
    </div>
  );
}
