import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veranstaltungen - Kulturverein Hennersdorf",
  description:
    "Aktuelle und vergangene Veranstaltungen des Kulturvereins Hennersdorf.",
};

interface Event {
  id: string;
  title: string;
  date: string;
  dateSort: string;
  time?: string;
  location?: string;
  description: string;
  link?: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: "frauenmesse-2026",
    title: "Hennersdorfer Frauenmesse",
    date: "26. April 2026",
    dateSort: "2026-04-26",
    time: "10:00 – 18:00 Uhr",
    location: "Feuerwehrhaus Hennersdorf, Florianiplatz 1",
    description:
      "Kleidung, Accessoires und Praktisches zu erwerben. Modeschau und Kulinarik. Ein beliebter Fixpunkt im Hennersdorfer Veranstaltungskalender.",
  },
];

const PAST_EVENTS: Event[] = [
  {
    id: "baeuerin-sucht-2025",
    title: "Martha Theater: Bäuerin sucht…",
    date: "Herbst 2025",
    dateSort: "2025-10-01",
    description:
      "Die Herbstproduktion 2025 des Martha Theaters im Kulturzentrum 9er Haus.",
    link: "https://www.martha-theater.at/",
  },
  {
    id: "kasperl-2025",
    title: "Kasperltheater im 9er Haus",
    date: "November 2025",
    dateSort: "2025-11-01",
    description:
      "Puppentheater für Kinder und Familien — ein fester Bestandteil des Kulturprogramms.",
  },
  {
    id: "frauenmesse-2025",
    title: "Hennersdorfer Frauenmesse",
    date: "27. April 2025",
    dateSort: "2025-04-27",
    description:
      "Rund 200 Besucher:innen, 25 Aussteller:innen, professionelle Modeschau und reichhaltiges Buffet.",
    link: "/dorferneuerung#frauenmesse",
  },
  {
    id: "anradeln-2025",
    title: "Anradeln am Weg der Ziegelbarone",
    date: "26. April 2025",
    dateSort: "2025-04-26",
    description:
      "Radtour ab dem neuen Trinkbrunnen über Maria Lanzendorf, Himberg und Achau — rund 25 km.",
    link: "/dorferneuerung#anradeln-2025",
  },
  {
    id: "desaster-dinner-2024",
    title: "Martha Theater: Das (perfekte) Desaster Dinner",
    date: "Herbst 2024",
    dateSort: "2024-10-01",
    description:
      "Die Herbstproduktion 2024 — eine turbulente Komödie auf der Bühne des 9er Hauses.",
    link: "https://www.martha-theater.at/",
  },
  {
    id: "kultur-radtour-2024",
    title: "Kultur-Radtour: Romanische Kirchen",
    date: "4. Mai 2024",
    dateSort: "2024-05-04",
    description:
      "36 Radler:innen erkundeten romanische Kirchen in Unterlaa, Himberg und Hennersdorf.",
    link: "/dorferneuerung#kultur-radtour-2024",
  },
];

export default function EventsPage() {
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
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.id} className="border border-brand/20 bg-brand/5 p-5">
              <p className="text-xs font-medium text-brand">{event.date}</p>
              <h3 className="mt-1 text-[15px] font-semibold text-gray-800">{event.title}</h3>
              {event.time && (
                <p className="mt-1 text-sm text-gray-500">{event.time}</p>
              )}
              {event.location && (
                <p className="text-sm text-gray-500">{event.location}</p>
              )}
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800">Vergangene Veranstaltungen</h2>
        <div className="mt-4 space-y-6">
          {PAST_EVENTS.map((event) => (
            <article key={event.id} className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-400">{event.date}</p>
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
