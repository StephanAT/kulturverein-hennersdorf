import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ALL_EVENTS_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Veranstaltungen - Kulturverein Hennersdorf",
  description:
    "Aktuelle und vergangene Veranstaltungen des Kulturvereins Hennersdorf.",
};

export const revalidate = 60;

// Fallback data when Sanity is empty
const FALLBACK_UPCOMING = [
  {
    _id: "frauenmesse-2026",
    title: "Hennersdorfer Frauenmesse",
    date: "2026-04-26T10:00:00Z",
    location: "Feuerwehrhaus Hennersdorf, Florianiplatz 1",
    description:
      "Kleidung, Accessoires und Praktisches zu erwerben. Modeschau und Kulinarik. Ein beliebter Fixpunkt im Hennersdorfer Veranstaltungskalender.",
  },
];

const FALLBACK_PAST = [
  {
    _id: "baeuerin-sucht-2025",
    title: "Martha Theater: Bäuerin sucht…",
    date: "2025-10-01",
    description: "Die Herbstproduktion 2025 des Martha Theaters im Kulturzentrum 9er Haus.",
    link: "https://www.martha-theater.at/",
  },
  {
    _id: "kasperl-2025",
    title: "Kasperltheater im 9er Haus",
    date: "2025-11-01",
    description: "Puppentheater für Kinder und Familien — ein fester Bestandteil des Kulturprogramms.",
  },
  {
    _id: "frauenmesse-2025",
    title: "Hennersdorfer Frauenmesse",
    date: "2025-04-27",
    description: "Rund 200 Besucher:innen, 25 Aussteller:innen, professionelle Modeschau und reichhaltiges Buffet.",
    link: "/dorferneuerung#frauenmesse",
  },
  {
    _id: "anradeln-2025",
    title: "Anradeln am Weg der Ziegelbarone",
    date: "2025-04-26",
    description: "Radtour ab dem neuen Trinkbrunnen über Maria Lanzendorf, Himberg und Achau — rund 25 km.",
    link: "/dorferneuerung#anradeln-2025",
  },
  {
    _id: "desaster-dinner-2024",
    title: "Martha Theater: Das (perfekte) Desaster Dinner",
    date: "2024-10-01",
    description: "Die Herbstproduktion 2024 — eine turbulente Komödie auf der Bühne des 9er Hauses.",
    link: "https://www.martha-theater.at/",
  },
  {
    _id: "kultur-radtour-2024",
    title: "Kultur-Radtour: Romanische Kirchen",
    date: "2024-05-04",
    description: "36 Radler:innen erkundeten romanische Kirchen in Unterlaa, Himberg und Hennersdorf.",
    link: "/dorferneuerung#kultur-radtour-2024",
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("de-AT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string): string | null {
  const d = new Date(dateStr);
  if (d.getHours() === 0 && d.getMinutes() === 0) return null;
  return d.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }) + " Uhr";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EventsPage() {
  let upcoming: any[] = [];
  let past: any[] = [];

  try {
    if (client) {
      upcoming = await client.fetch(UPCOMING_EVENTS_QUERY);
      const all = await client.fetch(ALL_EVENTS_QUERY);
      past = all.filter(
        (e: any) => !upcoming.some((u: any) => u._id === e._id)
      );
    }
  } catch {
    // Sanity unavailable — use fallbacks
  }

  const hasUpcoming = upcoming.length > 0;
  const hasPast = past.length > 0;
  const useFallback = !hasUpcoming && !hasPast;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Termine & Rückblick
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Veranstaltungen</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Von Theateraufführungen über Dorffeste bis hin zu Kulturradtouren —
        der Kulturverein Hennersdorf organisiert das ganze Jahr über
        Veranstaltungen für die Gemeinschaft.
      </p>

      {/* Upcoming Events */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Kommende Termine</h2>
        <div className="mt-4 space-y-4">
          {(hasUpcoming ? upcoming : useFallback ? FALLBACK_UPCOMING : []).map((event: any) => (
            <div key={event._id} className="border border-brand/20 bg-brand/5 p-5">
              <p className="text-xs font-medium text-brand">{formatDate(event.date)}</p>
              <h3 className="mt-1 text-[15px] font-semibold text-gray-800">{event.title}</h3>
              {formatTime(event.date) && (
                <p className="mt-1 text-sm text-gray-500">{formatTime(event.date)}</p>
              )}
              {event.location && (
                <p className="text-sm text-gray-500">{event.location}</p>
              )}
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          ))}
          {!hasUpcoming && !useFallback && (
            <p className="text-sm text-gray-500">Derzeit keine kommenden Termine.</p>
          )}
        </div>
      </div>

      {/* Past Events */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800">Vergangene Veranstaltungen</h2>
        <div className="mt-4 space-y-6">
          {(hasPast ? past : useFallback ? FALLBACK_PAST : []).map((event: any) => (
            <article key={event._id} className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-400">{formatDate(event.date)}</p>
              <h3 className="text-[15px] font-semibold text-gray-800">{event.title}</h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{event.description}</p>
              {event.link && (
                <Link
                  href={event.link}
                  className="mt-1 inline-block text-xs text-brand hover:underline"
                  {...(event.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  Mehr dazu
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>

      <p className="mt-10 text-sm text-gray-500">
        Kontakt für Veranstaltungen:{" "}
        <a href="mailto:office@kulturverein-hennersdorf.at" className="text-brand hover:underline">
          office@kulturverein-hennersdorf.at
        </a>
      </p>
    </div>
  );
}
