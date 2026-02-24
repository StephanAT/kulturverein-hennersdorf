import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsoren & Partner - Kulturverein Hennersdorf",
  description: "Unsere Sponsoren und Partner machen die Projekte des Kulturvereins Hennersdorf möglich.",
};

export default function SponsorenPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-orange-600">Unterstützung</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Sponsoren & Partner</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Ohne die Unterstützung unserer Sponsoren und Partner wären viele unserer
        Projekte nicht möglich. Herzlichen Dank an alle, die den Kulturverein
        Hennersdorf fördern.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Unsere Unterstützer</h2>
        <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
          <p className="text-sm text-gray-400">Sponsorenlogos und -informationen folgen in Kürze.</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Sponsor werden</h2>
        <p className="mt-3 text-gray-600">
          Möchten Sie die Kultur in Hennersdorf unterstützen? Als Sponsor profitieren
          Sie von Sichtbarkeit bei unseren Veranstaltungen und auf unserer Website.
          Kontaktieren Sie uns für weitere Informationen.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-semibold text-gray-800">Partner</h2>
        <ul className="mt-4 space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">&#9679;</span>
            <a href="https://www.gemeinde-hennersdorf.at/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
              Gemeinde Hennersdorf
            </a>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">&#9679;</span>
            <a href="https://www.martha-theater.at/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
              Martha Theater
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
