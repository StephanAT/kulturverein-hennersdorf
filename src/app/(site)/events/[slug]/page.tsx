import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch, sanityImageUrl } from "@/lib/sanity";
import {
  FALLBACK_EVENTS,
  toEventSlug,
  isUpcoming,
} from "@/data/events";
import type { FallbackEvent } from "@/data/events";

interface Props {
  params: Promise<{ slug: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeEvent(e: any): FallbackEvent & { imageUrl?: string; galleryUrls?: string[] } {
  const slug =
    e.slug?.current || (typeof e.slug === "string" ? e.slug : toEventSlug(e.title || ""));
  return {
    _id: e._id,
    slug,
    title: e.title,
    date: e.date,
    endDate: e.endDate,
    location: e.location,
    address: e.address,
    description: e.description || "",
    bodyHtml: e.bodyHtml || "",
    price: e.price,
    organizer: e.organizer,
    contact: e.contact,
    externalLink: e.externalLink,
    project: e.project?.title || e.project,
    image: typeof e.image === "string" ? e.image : undefined,
    imageUrl:
      e.image && typeof e.image === "object"
        ? sanityImageUrl(e.image, 1200) || undefined
        : typeof e.image === "string"
          ? e.image
          : undefined,
    gallery: Array.isArray(e.gallery)
      ? e.gallery.map((g: string) => (typeof g === "string" ? g : ""))
      : undefined,
    galleryUrls: Array.isArray(e.gallery)
      ? e.gallery
          .map((g: unknown) =>
            typeof g === "object" && g !== null
              ? sanityImageUrl(g as Record<string, unknown>, 800) || ""
              : typeof g === "string"
                ? g
                : ""
          )
          .filter(Boolean)
      : undefined,
  };
}

async function getEvent(slug: string) {
  // Try Sanity
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let events: any[] = [];
  try {
    events = await sanityFetch(
      `*[_type == "event"]{ _id, title, slug, date, endDate, location, address, description, bodyHtml, image, gallery, price, organizer, contact, externalLink, "project": project->{title, slug} }`
    );
  } catch {
    // Sanity unavailable
  }

  if (events.length > 0) {
    const match = events.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e: any) =>
        e.slug?.current === slug || toEventSlug(e.title || "") === slug
    );
    if (match) return normalizeEvent(match);
  }

  // Fallback
  const fallback = FALLBACK_EVENTS.find((f) => f.slug === slug);
  if (!fallback) return null;
  return normalizeEvent(fallback);
}

export async function generateStaticParams() {
  return FALLBACK_EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return {
    title: `${event.title} - Veranstaltungen - Kulturverein Hennersdorf`,
    description: event.description || `${event.title} - Kulturverein Hennersdorf`,
  };
}

export const revalidate = 60;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-AT", {
    weekday: "long",
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

function generateIcsUrl(event: FallbackEvent): string {
  const start = new Date(event.date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const end = event.endDate
    ? new Date(event.endDate)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "")
    : new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");

  const loc = [event.location, event.address].filter(Boolean).join(", ");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kulturverein Hennersdorf//Event//DE",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    loc ? `LOCATION:${loc}` : "",
    event.description ? `DESCRIPTION:${event.description.slice(0, 200)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines)}`;
}

function mapEmbedUrl(address: string): string {
  const q = encodeURIComponent(address);
  return `https://www.openstreetmap.org/export/embed.html?bbox=16.33%2C48.09%2C16.39%2C48.13&layer=mapnik&marker=48.11%2C16.36`;
}

function mapLinkUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const upcoming = isUpcoming(event.date);
  const heroUrl = event.imageUrl || event.image;
  const time = formatTime(event.date);
  const fullLocation = [event.location, event.address]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Back */}
      <Link
        href="/events"
        className="mb-6 inline-block py-1 text-sm text-gray-400 hover:text-brand"
      >
        &larr; Alle Veranstaltungen
      </Link>

      {/* Hero Image */}
      {heroUrl && (
        <div className="mb-8 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroUrl}
            alt={event.title}
            className="w-full object-cover aspect-[3/2]"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
              upcoming
                ? "bg-brand/10 text-brand"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {upcoming ? "Kommend" : "Vergangen"}
          </span>
          {event.project && (
            <span className="inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-500">
              {event.project}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          {event.title}
        </h1>
        {event.description && (
          <p className="mt-3 text-gray-600 leading-relaxed">
            {event.description}
          </p>
        )}
      </div>

      {/* Info Grid: Details (2/3) + Map (1/3) */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Left: Details */}
        <div className="flex-1 space-y-4">
          {/* Date & Time */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <dl className="space-y-3">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Datum
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-gray-800">
                  {formatDate(event.date)}
                  {event.endDate && (
                    <> &ndash; {formatDate(event.endDate)}</>
                  )}
                </dd>
              </div>
              {time && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Uhrzeit
                  </dt>
                  <dd className="mt-0.5 text-sm text-gray-700">{time}</dd>
                </div>
              )}
              {fullLocation && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Ort
                  </dt>
                  <dd className="mt-0.5 text-sm text-gray-700">
                    {fullLocation}
                  </dd>
                </div>
              )}
              {event.price && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Eintritt
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-gray-700">
                    {event.price}
                  </dd>
                </div>
              )}
              {event.organizer && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Veranstalter
                  </dt>
                  <dd className="mt-0.5 text-sm text-gray-700">
                    {event.organizer}
                  </dd>
                </div>
              )}
              {event.contact && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Kontakt
                  </dt>
                  <dd className="mt-0.5 text-sm text-gray-700">
                    {event.contact.includes("@") ? (
                      <a
                        href={`mailto:${event.contact}`}
                        className="text-brand hover:underline"
                      >
                        {event.contact}
                      </a>
                    ) : (
                      event.contact
                    )}
                  </dd>
                </div>
              )}
            </dl>

            {/* Action buttons */}
            <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-4">
              {upcoming && (
                <a
                  href={generateIcsUrl(event)}
                  download={`${event.slug}.ics`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Zum Kalender
                </a>
              )}
              {event.externalLink && (
                <a
                  href={event.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Map */}
        {event.address && (
          <div className="w-full sm:w-1/3 flex-shrink-0">
            <div className="overflow-hidden rounded-xl border-2 border-brand/20">
              <iframe
                src={mapEmbedUrl(event.address)}
                className="h-48 w-full sm:h-full sm:min-h-[280px]"
                style={{ border: 0 }}
                loading="lazy"
                title={`Karte: ${event.address}`}
              />
            </div>
            <a
              href={mapLinkUrl(event.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3 w-3"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Route planen (Google Maps)
            </a>
          </div>
        )}
      </div>

      {/* Rich Text Body */}
      {event.bodyHtml && (
        <div
          className="prose prose-sm prose-gray mt-10 max-w-none prose-headings:text-gray-800 prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: event.bodyHtml }}
        />
      )}

      {/* Gallery */}
      {((event.galleryUrls && event.galleryUrls.length > 0) ||
        (event.gallery && event.gallery.length > 0)) && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Bildergalerie
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {(event.galleryUrls || event.gallery || []).map(
              (src: string, i: number) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-lg bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${event.title} - Bild ${i + 1}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-6">
        <Link
          href="/events"
          className="py-1 text-sm font-medium text-gray-500 hover:text-brand"
        >
          &larr; Alle Veranstaltungen
        </Link>
        {event.contact && (
          <a
            href={`mailto:${event.contact}`}
            className="ml-auto py-1 text-sm font-medium text-brand hover:underline"
          >
            Fragen? Kontaktieren Sie uns
          </a>
        )}
      </div>
    </div>
  );
}
