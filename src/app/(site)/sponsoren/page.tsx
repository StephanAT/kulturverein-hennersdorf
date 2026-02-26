import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch, sanityImageUrl } from "@/lib/sanity";
import {
  FALLBACK_SPONSORS,
  TIER_ORDER,
  TIER_LABELS,
  TIER_DESCRIPTIONS,
} from "@/data/sponsoren";
import type { Sponsor } from "@/data/sponsoren";

export const metadata: Metadata = {
  title: "Sponsoren & Partner - Kulturverein Hennersdorf",
  description:
    "Unsere Sponsoren und Partner machen die Projekte des Kulturvereins Hennersdorf m\u00F6glich.",
};

export const revalidate = 60;

const TIER_MAP: Record<string, string> = {
  main: "hauptsponsor",
  supporter: "foerderer",
  hauptsponsor: "hauptsponsor",
  sponsor: "sponsor",
  partner: "partner",
  foerderer: "foerderer",
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\u00E4/g, "ae")
    .replace(/\u00F6/g, "oe")
    .replace(/\u00FC/g, "ue")
    .replace(/\u00DF/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")
    .replace(/^-+/, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeSponsor(s: any): Sponsor & { logoUrl?: string } {
  return {
    slug: s.slug?.current || (typeof s.slug === "string" && s.slug) || toSlug(s.name || ""),
    name: s.name,
    tier: (TIER_MAP[s.tier] || "partner") as Sponsor["tier"],
    description: s.description || "",
    website: s.website,
    logo: s.logo && typeof s.logo === "string" ? s.logo : undefined,
    logoUrl:
      s.logo && typeof s.logo === "object"
        ? sanityImageUrl(s.logo, 200) || undefined
        : typeof s.logo === "string"
          ? s.logo
          : undefined,
    bodyHtml: s.bodyHtml || "",
  };
}

export default async function SponsorenPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let raw: any[] = [];
  try {
    raw = await sanityFetch(
      `*[_type == "sponsor"] | order(order asc){ _id, name, slug, logo, website, tier, description, bodyHtml }`
    );
  } catch {
    // Sanity unavailable
  }

  const sponsors =
    raw.length > 0
      ? raw.map(normalizeSponsor)
      : FALLBACK_SPONSORS.map(normalizeSponsor);

  const grouped = TIER_ORDER.reduce(
    (acc, tier) => {
      const items = sponsors.filter((s) => s.tier === tier);
      if (items.length > 0) acc[tier] = items;
      return acc;
    },
    {} as Record<string, (Sponsor & { logoUrl?: string })[]>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        {"Unterst\u00FCtzung"}
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Sponsoren & Partner
      </h1>
      <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
        {"Ohne die Unterst\u00FCtzung unserer Sponsoren und Partner w\u00E4ren viele unserer Projekte nicht m\u00F6glich. Herzlichen Dank an alle, die den Kulturverein Hennersdorf f\u00F6rdern."}
      </p>

      {TIER_ORDER.filter((t) => grouped[t]).map((tier) => (
        <section key={tier} className="mt-12">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              {TIER_LABELS[tier]}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {TIER_DESCRIPTIONS[tier]}
            </p>
          </div>

          <div
            className={`grid gap-4 ${
              tier === "hauptsponsor"
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {grouped[tier].map((sponsor) => (
              <Link
                key={sponsor.slug}
                href={`/sponsoren/${sponsor.slug}`}
                className={`group flex flex-col items-center rounded-xl border bg-white p-5 text-center transition-all hover:shadow-md ${
                  tier === "hauptsponsor"
                    ? "border-brand/20 hover:border-brand/40"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex items-center justify-center ${
                    tier === "hauptsponsor"
                      ? "mb-4 h-20 w-20"
                      : "mb-3 h-14 w-14"
                  }`}
                >
                  {sponsor.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-lg text-white font-bold ${
                        tier === "hauptsponsor"
                          ? "bg-brand text-2xl"
                          : tier === "sponsor"
                            ? "bg-brand/80 text-lg"
                            : tier === "foerderer"
                              ? "bg-gray-500 text-lg"
                              : "bg-gray-400 text-lg"
                      }`}
                    >
                      {sponsor.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3
                  className={`font-semibold transition-colors group-hover:text-brand ${
                    tier === "hauptsponsor"
                      ? "text-base text-gray-800"
                      : "text-sm text-gray-800"
                  }`}
                >
                  {sponsor.name}
                </h3>
                {sponsor.description && (
                  <p
                    className={`mt-1 text-gray-500 leading-snug ${
                      tier === "hauptsponsor" ? "text-sm" : "text-xs"
                    }`}
                  >
                    {sponsor.description}
                  </p>
                )}
                <span className="mt-3 text-xs font-medium text-brand sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                  Mehr erfahren &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Sponsor werden */}
      <section className="mt-16 rounded-xl border border-brand/20 bg-brand/5 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-800">Sponsor werden</h2>
        <p className="mt-3 max-w-2xl text-sm text-gray-600 leading-relaxed">
          {"M\u00F6chten Sie die Kultur in Hennersdorf unterst\u00FCtzen? Wir freuen uns \u00FCber jede Form der Unterst\u00FCtzung \u2014 ob als Hauptsponsor, Sponsor, F\u00F6rderer oder Partner. Kontaktieren Sie uns:"}
        </p>
        <a
          href="mailto:office@kulturverein-hennersdorf.at"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-brand bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          office@kulturverein-hennersdorf.at
        </a>
      </section>
    </div>
  );
}
