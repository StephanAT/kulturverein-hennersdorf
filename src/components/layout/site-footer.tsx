import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium text-gray-700">Gemeinnütziger Hennersdorfer Kulturverein</p>
            <p className="text-xs text-gray-400">Josef Postl-Gasse 19, 2332 Hennersdorf</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-400">
            <a href="https://www.martha-theater.at/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">martha-theater.at</a>
            <span className="hidden sm:inline">|</span>
            <a href="https://www.gemeinde-hennersdorf.at/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">gemeinde-hennersdorf.at</a>
            <span className="hidden sm:inline">|</span>
            <Link href="/team" className="hover:text-gray-600">Kontakt</Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-gray-300">
            &copy; {new Date().getFullYear()} Gemeinnütziger Hennersdorfer Kulturverein
          </p>
          <div className="flex gap-4 text-[11px] text-gray-300">
            <Link href="/impressum" className="hover:text-gray-500">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gray-500">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
