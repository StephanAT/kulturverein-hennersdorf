import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-800">Kulturverein Hennersdorf</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Der Gemeinnützige Hennersdorfer Kulturverein fördert Kultur,
              Gemeinschaft und kreative Projekte in Hennersdorf bei Wien.
            </p>
          </div>

          {/* Projekte */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-800">Projekte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/martha-theater" className="text-sm text-gray-500 hover:text-brand transition-colors">
                  Martha Theater
                </Link>
              </li>
              <li>
                <Link href="/kasperltheater" className="text-sm text-gray-500 hover:text-brand transition-colors">
                  Kasperltheater
                </Link>
              </li>
              <li>
                <Link href="/dorferneuerung" className="text-sm text-gray-500 hover:text-brand transition-colors">
                  Dorferneuerung
                </Link>
              </li>
              <li>
                <Link href="/schulprojekt" className="text-sm text-gray-500 hover:text-brand transition-colors">
                  Schulprojekt
                </Link>
              </li>
            </ul>
          </div>

          {/* Verein */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-800">Verein</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/team" className="text-sm text-gray-500 hover:text-brand transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/sponsoren" className="text-sm text-gray-500 hover:text-brand transition-colors">
                  Sponsoren & Partner
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-500 hover:text-brand transition-colors">
                  Veranstaltungen
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-800">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.martha-theater.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-brand transition-colors"
                >
                  martha-theater.at
                </a>
              </li>
              <li>
                <a
                  href="https://www.gemeinde-hennersdorf.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-brand transition-colors"
                >
                  gemeinde-hennersdorf.at
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Gemeinnütziger Hennersdorfer Kulturverein. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
