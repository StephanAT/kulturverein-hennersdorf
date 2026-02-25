"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { href: "/martha-theater", label: "Martha Theater" },
  {
    href: "/events",
    label: "Veranstaltungen",
    children: [
      { href: "/events", label: "Termine" },
      { href: "/kasperltheater", label: "Kasperltheater" },
    ],
  },
  { href: "/dorferneuerung", label: "Dorferneuerung" },
  { href: "/panoramen", label: "360° Panoramen" },
  { href: "/schulprojekt", label: "Schulprojekt" },
  { href: "/team", label: "Team" },
  { href: "/sponsoren", label: "Sponsoren" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    item.children?.some((c) => pathname === c.href);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo.png"
            alt="Hennersdorfer Kulturverein"
            width={640}
            height={126}
            unoptimized
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);

            if (item.children) {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-0.5 px-2.5 py-1.5 text-[13px] transition-colors ${
                      active
                        ? "font-medium text-brand"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Link>
                  {/* Dropdown */}
                  <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[160px] rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 text-[13px] transition-colors ${
                            pathname === child.href
                              ? "font-medium text-brand"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 text-[13px] transition-colors ${
                  active
                    ? "font-medium text-brand"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-gray-500 lg:hidden"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 py-2 lg:hidden">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`block px-3 py-2 text-sm ${
              pathname === "/" ? "font-medium text-brand" : "text-gray-600"
            }`}
          >
            Startseite
          </Link>
          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm ${
                  isActive(item) ? "font-medium text-brand" : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
              {item.children?.map((child) =>
                child.href !== item.href ? (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block pl-8 pr-3 py-1.5 text-sm ${
                      pathname === child.href
                        ? "font-medium text-brand"
                        : "text-gray-400"
                    }`}
                  >
                    {child.label}
                  </Link>
                ) : null
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
