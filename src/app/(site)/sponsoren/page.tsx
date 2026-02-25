import type { Metadata } from "next";
import { sanityFetch, sanityImageUrl } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Sponsoren & Partner - Kulturverein Hennersdorf",
  description:
    "Unsere Sponsoren und Partner machen die Projekte des Kulturvereins Hennersdorf möglich.",
};

export const revalidate = 60;

const TIER_LABELS: Record<string, string> = {
  hauptsponsor: "Hauptsponsoren",
  sponsor: "Sponsoren",
  partner: "Partner",
  foerderer: "Förderer",
};

const TIER_ORDER = ["hauptsponsor", "sponsor", "partner", "foerderer"];

function FallbackSponsors() {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-gray-800">Partner</h2>
      <div className="mt-4 space-y-3 text-sm text-gray-600">
        <div className="border-l-2 border-brand pl-4">
          <a href="https://www.gemeinde-hennersdorf.at/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 hover:text-brand transition-colors">
            Gemeinde Hennersdorf
          </a>
          <p>Unterstützung bei Veranstaltungen und Dorferneuerungsprojekten.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <a href="https://www.martha-theater.at/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 hover:text-brand transition-colors">
            Martha Theater
          </a>
          <p>Theatergruppe des Kulturvereins mit jährlichen Produktionen.</p>
        </div>
        <div className="border-l-2 border-gray-200 pl-4">
          <p className="font-medium text-gray-800">NÖ Dorf- und Stadterneuerung</p>
          <p>Förderung von Dorferneuerungsprojekten wie Mariensäulen-Renovierung und Container-Art.</p>
        </div>
      </div>
    </div>
  );
}

export default async function SponsorenPage() {
  let sponsors: any[] = [];
  try {
    sponsors = await sanityFetch(
      `*[_type == "sponsor"] | order(order asc){ _id, name, logo, website, tier }`
    );
  } catch {
    // Sanity unavailable
  }

  const useSanity = sponsors.length > 0;

  // Group sponsors by tier
  const grouped = TIER_ORDER.reduce(
    (acc, tier) => {
      const items = sponsors.filter((s: any) => s.tier === tier);
      if (items.length > 0) acc[tier] = items;
      return acc;
    },
    {} as Record<string, any[]>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Unterstützung
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Sponsoren & Partner</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Ohne die Unterstützung unserer Sponsoren und Partner wären viele unserer
        Projekte nicht möglich. Herzlichen Dank an alle, die den Kulturverein
        Hennersdorf fördern.
      </p>

      {useSanity ? (
        <>
          {TIER_ORDER.filter((t) => grouped[t]).map((tier) => (
            <div key={tier} className="mt-10">
              <h2 className="text-lg font-semibold text-gray-800">
                {TIER_LABELS[tier]}
              </h2>
              <div className="mt-4 space-y-3">
                {grouped[tier].map((sponsor: any) => (
                  <div
                    key={sponsor._id}
                    className={`border-l-2 ${tier === "hauptsponsor" ? "border-brand" : "border-gray-200"} pl-4 flex items-center gap-4`}
                  >
                    {sponsor.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sanityImageUrl(sponsor.logo, 80) || ""}
                        alt={sponsor.name}
                        className="h-10 w-10 object-contain flex-shrink-0"
                      />
                    )}
                    <div>
                      {sponsor.website ? (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-gray-800 hover:text-brand transition-colors text-sm"
                        >
                          {sponsor.name}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-800 text-sm">{sponsor.name}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <FallbackSponsors />
      )}

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Sponsor werden</h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Möchten Sie die Kultur in Hennersdorf unterstützen? Wir freuen uns über
          jede Form der Unterstützung — kontaktieren Sie uns unter{" "}
          <a href="mailto:office@kulturverein-hennersdorf.at" className="text-brand hover:underline">
            office@kulturverein-hennersdorf.at
          </a>.
        </p>
      </div>
    </div>
  );
}
