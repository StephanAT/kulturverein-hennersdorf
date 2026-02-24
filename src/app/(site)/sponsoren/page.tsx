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
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>
            <a href="https://www.gemeinde-hennersdorf.at/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
              Gemeinde Hennersdorf
            </a>
          </li>
          <li>
            <a href="https://www.martha-theater.at/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
              Martha Theater
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800">Sponsor werden</h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Möchten Sie die Kultur in Hennersdorf unterstützen? Als Sponsor profitieren
          Sie von Sichtbarkeit bei unseren Veranstaltungen und auf unserer Website.
        </p>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Sponsorenlogos und weitere Informationen folgen in Kürze.
      </p>
    </div>
  );
}
