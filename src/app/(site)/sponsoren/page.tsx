import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsoren & Partner - Kulturverein Hennersdorf",
  description:
    "Unsere Sponsoren und Partner machen die Projekte des Kulturvereins Hennersdorf möglich.",
};

export default function SponsorenPage() {
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
