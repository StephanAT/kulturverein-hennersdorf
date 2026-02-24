import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team & Kontakt - Kulturverein Hennersdorf",
  description:
    "Das Team des Gemeinnützigen Hennersdorfer Kulturvereins — Vorstand, Dorferneuerung und Kontakt.",
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Wer wir sind
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Team & Kontakt</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Der Gemeinnützige Hennersdorfer Kulturverein wurde 1994 gegründet und lebt
        vom Engagement seiner Mitglieder — auf der Bühne, hinter den Kulissen
        und in der Organisation.
      </p>

      {/* Vorstand */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Vorstand</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Manfred */}
          <div className="overflow-hidden rounded-lg bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/team/holzbach-dorfheld.jpg"
              alt="Manfred und Andrea Holzbach bei der Dorfhelden-Auszeichnung"
              className="aspect-[3/4] w-full object-cover object-top"
              loading="lazy"
            />
            <div className="p-4">
              <p className="font-medium text-gray-800">Manfred Holzbach</p>
              <p className="text-sm text-gray-500">Obmann</p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Seit Jahrzehnten engagiert für die Verschönerung und kulturelle
                Bereicherung Hennersdorfs. 2024 als Dorfheld ausgezeichnet.
              </p>
            </div>
          </div>
          {/* Andrea */}
          <div className="overflow-hidden rounded-lg bg-gray-50">
            <div className="flex aspect-[3/4] items-end bg-gray-100 p-6">
              <p className="text-sm text-gray-400">Foto folgt</p>
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-800">Andrea Holzbach</p>
              <p className="text-sm text-gray-500">Obmann-Stellvertreterin</p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Mitorganisatorin der Frauenmesse, Schulprojekte und
                zahlreicher Vereinsveranstaltungen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dorferneuerung */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800">Dorferneuerung</h2>
        <figure className="mt-4">
          <div className="overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/team/dorferneuerung-team.jpg"
              alt="Dorferneuerungsteam bei der Pressekonferenz"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-2 text-xs text-gray-400">
            Pressekonferenz mit LH-Stv. Stephan Pernkopf und dem Dorferneuerungsteam
          </figcaption>
        </figure>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          Die Dorferneuerungsgruppe arbeitet seit über zehn Jahren an der
          Verschönerung und Weiterentwicklung Hennersdorfs — unterstützt von
          der NÖ Dorf- und Stadterneuerung.
        </p>
      </div>

      {/* Dorfhelden */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800">Unsere Dorfhelden</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <figure>
            <div className="overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dorferneuerung/dorfheld-holzbach.jpg"
                alt="Manfred Holzbach - Dorfheld 2024"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2">
              <p className="text-sm font-medium text-gray-800">Manfred Holzbach</p>
              <p className="text-xs text-gray-500">Dorfheld 2024</p>
            </figcaption>
          </figure>
          <figure>
            <div className="overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/team/vejchar-dorfheld.jpg"
                alt="Alfred Vejchar - Dorfheld 2025"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2">
              <p className="text-sm font-medium text-gray-800">Alfred Vejchar</p>
              <p className="text-xs text-gray-500">Dorfheld 2025 — Pionier der digitalen Heimatpflege</p>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Kontakt */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-800">Kontakt</h2>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>
            <span className="text-gray-800 font-medium">Gemeinnütziger Hennersdorfer Kulturverein</span>
          </p>
          <p>Josef Postl-Gasse 19, 2332 Hennersdorf</p>
          <p>
            E-Mail:{" "}
            <a href="mailto:office@kulturverein-hennersdorf.at" className="text-brand hover:underline">
              office@kulturverein-hennersdorf.at
            </a>
          </p>
          <p>
            Telefon:{" "}
            <a href="tel:+436604367566" className="text-brand hover:underline">
              +43 660 4367566
            </a>
          </p>
        </div>
      </div>

      {/* Mitglied werden */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Mitglied werden</h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Du möchtest Teil unseres Teams werden? Ob als Schauspieler:in, Helfer:in
          bei Veranstaltungen oder mit neuen Ideen — wir freuen uns über jede:n, der
          sich für Kultur in Hennersdorf engagieren möchte. Schreib uns einfach.
        </p>
      </div>
    </div>
  );
}
