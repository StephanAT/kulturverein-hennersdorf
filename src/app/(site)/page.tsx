import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";

export const revalidate = 60;

const SECTIONS = [
  {
    title: "Martha Theater",
    text: "Seit 1994 bringt unser Amateurtheater jährlich ein neues Stück auf die Bühne.",
    href: "/martha-theater",
  },
  {
    title: "Veranstaltungen",
    text: "Feste, Kulturabende und Gemeinschaftsveranstaltungen das ganze Jahr über.",
    href: "/events",
  },
  {
    title: "Dorferneuerung",
    text: "Gemeinsame Verschönerung und Weiterentwicklung unseres Ortsbildes.",
    href: "/dorferneuerung",
  },
  {
    title: "360° Panoramen",
    text: "Virtueller Rundgang mit 25 interaktiven Panoramen durch Hennersdorf.",
    href: "/panoramen",
  },
  {
    title: "Schulprojekt",
    text: "Workshops und Exkursionen mit der Volksschule Achau-Hennersdorf.",
    href: "/schulprojekt",
  },
  {
    title: "Sponsoren & Partner",
    text: "Unsere Unterstützer machen die Projekte des Vereins möglich.",
    href: "/sponsoren",
  },
];

const FALLBACK_EVENT = {
  title: "Hennersdorfer Frauenmesse",
  date: "2026-04-26T10:00:00Z",
  location: "Feuerwehrhaus Hennersdorf, Florianiplatz 1",
};

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  const date = d.toLocaleDateString("de-AT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const h = d.getHours();
  const m = d.getMinutes();
  if (h === 0 && m === 0) return date;
  return `${date}, ${d.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" })} Uhr`;
}

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let nextEvent: any = null;
  try {
    const upcoming = await sanityFetch(
      `*[_type == "event" && date >= now()] | order(date asc){ _id, title, date, location }[0...1]`
    );
    if (upcoming.length > 0) nextEvent = upcoming[0];
  } catch {
    // Sanity unavailable
  }

  const event = nextEvent || FALLBACK_EVENT;

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Image
            src="/logo.png"
            alt="Hennersdorfer Kulturverein"
            width={640}
            height={126}
            unoptimized
            className="mx-auto mb-6 h-14 w-auto sm:h-16"
          />
          <p className="text-lg text-gray-600 leading-relaxed">
            Kultur, Theater und Gemeinschaft in Hennersdorf bei Wien.
            Seit 1994 bereichern wir das kulturelle Leben unserer Gemeinde.
          </p>
        </div>
      </section>

      {/* Next Event */}
      {event && (
        <section className="border-t border-gray-100 bg-brand/5">
          <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brand">Nächster Termin</p>
                <h2 className="mt-1 text-lg font-bold text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-600">{formatEventDate(event.date)}</p>
                {event.location && (
                  <p className="text-sm text-gray-500">{event.location}</p>
                )}
              </div>
              <Link
                href="/events"
                className="self-start border border-brand px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
              >
                Alle Termine
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Aktuelles */}
      <section className="border-t border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Neuigkeiten</p>
          <h2 className="mt-1 text-xl font-bold text-gray-800">Aktuelles</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Link href="/dorferneuerung/aktuelles#dorfheld-vejchar" className="group block overflow-hidden rounded-lg border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dorferneuerung/dorfheld-vejchar-1.jpg"
                alt="Alfred Vejchar - Dorfheld 2025"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="p-3">
                <p className="text-xs text-gray-400">13. Juni 2025</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 leading-snug group-hover:text-brand transition-colors">
                  Alfred Vejchar ist Hennersdorfs Dorfheld 2025
                </p>
              </div>
            </Link>
            <Link href="/dorferneuerung/aktuelles#workshop-2025" className="group block overflow-hidden rounded-lg border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dorferneuerung/workshop-2025-1.jpg"
                alt="Workshop in der Volksschule 2025"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="p-3">
                <p className="text-xs text-gray-400">25. Februar 2025</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 leading-snug group-hover:text-brand transition-colors">
                  Workshop 2025 in der Volksschule
                </p>
              </div>
            </Link>
            <Link href="/dorferneuerung/aktuelles#container-art" className="group block overflow-hidden rounded-lg border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dorferneuerung/container-art-1.jpg"
                alt="Container-Art Projekt"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="p-3">
                <p className="text-xs text-gray-400">2025</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 leading-snug group-hover:text-brand transition-colors">
                  Blick auf Kunstwerke anstatt auf hässliche Container
                </p>
              </div>
            </Link>
          </div>
          <Link
            href="/dorferneuerung/aktuelles"
            className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
          >
            Mehr aus der Dorferneuerung &rarr;
          </Link>
        </div>
      </section>

      {/* Sections */}
      <section className="border-t border-gray-100 bg-white pb-16">
        <div className="mx-auto max-w-4xl px-4 pt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="text-[15px] font-semibold text-gray-800">
                  {s.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-gray-500 leading-relaxed">{s.text}</p>
                <span className="mt-3 text-xs font-medium text-brand">
                  Mehr erfahren &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Martha Theater with photo */}
      <section className="border-t border-gray-100 py-14">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex-1">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">Hauptprojekt</p>
              <h2 className="text-xl font-bold text-gray-800">Martha Theater</h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Das Martha Theater ist das Herzstück unseres Vereins. Seit 1994 bringen
                engagierte Laienschauspieler:innen aus Hennersdorf und Umgebung jedes Jahr
                ein neues Stück auf die Bühne. Benannt nach Martha Eichberger, ist das
                Theater ein fester Bestandteil des kulturellen Lebens in unserer Gemeinde.
              </p>
              <div className="mt-5 flex gap-3">
                <Link
                  href="/martha-theater"
                  className="border border-brand px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  Mehr erfahren
                </Link>
                <a
                  href="https://www.martha-theater.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 px-5 py-2.5 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
                >
                  martha-theater.at
                </a>
              </div>
            </div>
            <div className="w-full sm:w-72 flex-shrink-0 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/martha-theater/szene-2.jpg"
                alt="Szene aus einer Martha Theater Aufführung"
                className="aspect-[3/2] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dorferneuerung */}
      <section className="border-t border-gray-100 py-14">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">Gemeinde gestalten</p>
          <h2 className="text-xl font-bold text-gray-800">Dorferneuerung</h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
            Im Rahmen der NÖ Dorf- und Stadterneuerung arbeiten wir seit über zehn Jahren
            an der Verschönerung Hennersdorfs — von der Mariensäulen-Renovierung über
            Trinkbrunnen bis hin zu Schulprojekten mit Kindern.
          </p>
          <Link
            href="/dorferneuerung"
            className="mt-4 inline-block border border-brand px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Projekte ansehen
          </Link>
        </div>
      </section>

      {/* Mitmachen */}
      <section className="border-t border-gray-100 py-14">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-bold text-gray-800">Mitmachen</h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
            Der Kulturverein lebt von der Gemeinschaft. Ob auf der Bühne, hinter den
            Kulissen oder als Zuschauer:in — jede:r ist willkommen.
          </p>
          <Link
            href="/team"
            className="mt-4 inline-block border border-brand px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Team & Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}
