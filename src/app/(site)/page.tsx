import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    title: "Martha Theater",
    description:
      "Seit 1994 begeistert unser Amateurtheater mit jährlichen Aufführungen. Benannt nach Martha Eichberger, bringen wir Kultur auf die Bühne.",
    href: "/martha-theater",
    icon: "🎭",
    color: "bg-red-50 text-red-700",
  },
  {
    title: "Kasperltheater",
    description:
      "Kasperltheater für die Kleinen — mit handgefertigten Puppen und liebevollen Geschichten für Kinder und Familien.",
    href: "/kasperltheater",
    icon: "🤹",
    color: "bg-amber-50 text-amber-700",
  },
  {
    title: "Veranstaltungen",
    description:
      "Feste, Feiern und Kulturabende — wir bringen die Gemeinschaft zusammen und schaffen unvergessliche Erlebnisse.",
    href: "/events",
    icon: "🎉",
    color: "bg-violet-50 text-violet-700",
  },
  {
    title: "Dorferneuerung",
    description:
      "Aktive Mitgestaltung unseres Ortsbildes. Gemeinsam arbeiten wir an der Verschönerung und Weiterentwicklung von Hennersdorf.",
    href: "/dorferneuerung",
    icon: "🏡",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Schulprojekt",
    description:
      "Kreative Workshops und Projekte mit Schulkindern — wir fördern junge Talente und wecken die Freude an Kunst und Kultur.",
    href: "/schulprojekt",
    icon: "🎨",
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Sponsoren & Partner",
    description:
      "Dank unserer Unterstützer können wir unsere Projekte verwirklichen. Werden auch Sie Teil unserer Kulturgemeinschaft.",
    href: "/sponsoren",
    icon: "🤝",
    color: "bg-orange-50 text-orange-700",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-light/40 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="Hennersdorfer Kulturverein"
              width={640}
              height={126}
              unoptimized
              className="mx-auto mb-8 h-16 w-auto sm:h-20"
            />
            <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed sm:text-xl">
              Kultur, Theater und Gemeinschaft in Hennersdorf bei Wien.
              Seit 1994 bringen wir Menschen zusammen und bereichern das
              kulturelle Leben unserer Gemeinde.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/events"
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-brand-dark hover:shadow-lg"
              >
                Veranstaltungen
              </Link>
              <Link
                href="/martha-theater"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand/30 hover:text-brand"
              >
                Martha Theater
              </Link>
              <Link
                href="/team"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand/30 hover:text-brand"
              >
                Unser Team
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle decorative element */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Unsere Projekte</h2>
            <p className="mt-2 text-gray-500">Was wir in Hennersdorf bewegen</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)] transition-all hover:border-brand/30 hover:shadow-[2px_4px_12px_rgba(0,0,0,0.1)]"
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg text-lg ${project.color}`}>
                  {project.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Martha Theater Highlight */}
      <section className="border-t border-gray-100 bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex-1">
              <span className="mb-2 inline-block text-sm font-medium text-brand">Unser Hauptprojekt</span>
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Martha Theater</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Das Martha Theater ist das Herzstück unseres Vereins. Seit 1994 bringen
                engagierte Laienschauspieler:innen jedes Jahr ein neues Stück auf die Bühne.
                Benannt nach Martha Eichberger (2014), ist das Theater ein fester Bestandteil
                des kulturellen Lebens in Hennersdorf.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/martha-theater"
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brand-dark"
                >
                  Mehr erfahren
                </Link>
                <a
                  href="https://www.martha-theater.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-brand/30 hover:text-brand"
                >
                  martha-theater.at
                </a>
              </div>
            </div>
            <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand-light/50 to-brand-light/20 lg:h-64 lg:w-96">
              <span className="text-6xl">🎭</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Mach mit!</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Der Kulturverein lebt von der Gemeinschaft. Ob auf der Bühne, hinter den
            Kulissen oder als Zuschauer:in — jede:r ist willkommen.
          </p>
          <div className="mt-6">
            <Link
              href="/team"
              className="inline-block rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-brand-dark hover:shadow-lg"
            >
              Team kennenlernen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
