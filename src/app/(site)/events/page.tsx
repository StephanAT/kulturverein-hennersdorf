import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch, sanityImageUrl } from "@/lib/sanity";
import { FALLBACK_EVENTS, toEventSlug, isUpcoming } from "@/data/events";

export const metadata: Metadata = {
  title: "Veranstaltungen - Kulturverein Hennersdorf",
  description:
    "Aktuelle und vergangene Veranstaltungen des Kulturvereins Hennersdorf.",
};

export const revalidate = 60;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-AT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string): string | null {
  const d = new Date(dateStr);
  if (d.getHours() === 0 && d.getMinutes() === 0) return null;
  return (
    d.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }) +
    " Uhr"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeEvent(e: any) {
  const slug =
    e.slug?.current || (typeof e.slug === "string" ? e.slug : toEventSlug(e.title || ""));
  return {
    ...e,
    slug,
    imageUrl:
      e.image && typeof e.image === "object"
        ? sanityImageUrl(e.image, 600) || undefined
        : typeof e.image === "string"
          ? e.image
          : undefined,
  };
}

export default async function EventsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let raw: any[] = [];
  try {
    raw = await sanityFetch(
      `*[_type == "event"] | order(date desc){ _id, title, slug, date, endDate, location, address, description, image, price, organizer, externalLink }`
    );
  } catch {
    // Sanity unavailable
  }

  const events =
    raw.length > 0 ? raw.map(normalizeEvent) : FALLBACK_EVENTS.map(normalizeEvent);

  const upcoming = events
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = events
    .filter((e) => !isUpcoming(e.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Termine & R&uuml;ckblick
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Veranstaltungen
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Von Theaterauff&uuml;hrungen &uuml;ber Dorffeste bis hin zu
        Kulturradtouren &mdash; der Kulturverein Hennersdorf organisiert das
        ganze Jahr &uuml;ber Veranstaltungen f&uuml;r die Gemeinschaft.
      </p>

      {/* Upcoming Events */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">
          Kommende Termine
        </h2>
        <div className="mt-4 space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug}`}
                className="group block overflow-hidden rounded-xl border border-brand/20 bg-brand/5 transition-all hover:border-brand/40 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row">
                  {event.imageUrl && (
                    <div className="w-full sm:w-48 flex-shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="aspect-[3/2] w-full object-cover sm:h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand uppercase tracking-wider">
                        Kommend
                      </span>
                      {event.price && (
                        <span className="text-[10px] text-gray-400">
                          {event.price}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[15px] font-semibold text-gray-800 group-hover:text-brand transition-colors">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {formatDate(event.date)}
                      {formatTime(event.date) && (
                        <>, {formatTime(event.date)}</>
                      )}
                    </p>
                    {event.location && (
                      <p className="text-sm text-gray-500">{event.location}</p>
                    )}
                    {event.description && (
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <span className="mt-2 inline-block text-xs font-medium text-brand">
                      Details &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Derzeit keine kommenden Termine.
            </p>
          )}
        </div>
      </div>

      {/* Past Events */}
      {past.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800">
            Vergangene Veranstaltungen
          </h2>
          <div className="mt-4 space-y-3">
            {past.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all hover:border-gray-300 hover:shadow-sm"
              >
                {event.imageUrl && (
                  <div className="hidden sm:block w-16 h-12 flex-shrink-0 overflow-hidden rounded">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-brand transition-colors truncate">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {formatDate(event.date)}
                    {event.location && <> &middot; {event.location}</>}
                  </p>
                </div>
                <span className="text-gray-300 group-hover:text-brand transition-colors flex-shrink-0">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="mt-10 text-sm text-gray-500">
        Kontakt f&uuml;r Veranstaltungen:{" "}
        <a
          href="mailto:office@kulturverein-hennersdorf.at"
          className="text-brand hover:underline"
        >
          office@kulturverein-hennersdorf.at
        </a>
      </p>
    </div>
  );
}
