"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Startseite" },
  { href: "/martha-theater", label: "Martha Theater" },
  { href: "/kasperltheater", label: "Kasperltheater" },
  { href: "/events", label: "Veranstaltungen" },
  { href: "/dorferneuerung", label: "Dorferneuerung" },
  { href: "/schulprojekt", label: "Schulprojekt" },
  { href: "/team", label: "Team" },
  { href: "/sponsoren", label: "Sponsoren" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo.png"
            alt="Hennersdorfer Kulturverein"
            width={640}
            height={126}
            unoptimized
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-light/60 text-brand-dark"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 py-2 lg:hidden">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-light/60 text-brand-dark"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
