"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/tickets", label: "Tickets" },
  { href: "/tickets/board", label: "Board" },
  { href: "/studio", label: "CMS" },
];

function isNavActive(href: string, pathname: string): boolean {
  if (href === "/tickets/board") return pathname === "/tickets/board";
  if (href === "/studio") return pathname.startsWith("/studio");
  // "Tickets" tab: active for /tickets and /tickets/[id] but not /tickets/board
  return pathname === "/tickets" || (pathname.startsWith("/tickets/") && !pathname.startsWith("/tickets/board"));
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex items-center justify-between px-4 py-3 max-w-[1400px]">
          <Link href="/tickets" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Kulturverein Hennersdorf"
              width={640}
              height={126}
              unoptimized
              className="h-8 w-auto"
            />
            <span className="hidden text-sm font-medium text-gray-500 sm:block">
              Dashboard
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isNavActive(item.href, pathname)
                    ? "bg-gray-100 font-medium text-gray-800"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Website
          </Link>
        </div>
      </header>

      {isStudio ? (
        <div className="h-[calc(100vh-57px)]">{children}</div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
