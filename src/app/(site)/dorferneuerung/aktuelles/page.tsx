import Link from "next/link";
import type { Metadata } from "next";
import { NEWS_ENTRIES } from "@/data/dorferneuerung-news";

export const metadata: Metadata = {
  title: "Aktuelles - Dorferneuerung - Kulturverein Hennersdorf",
  description:
    "Neuigkeiten und Berichte aus der Dorferneuerung Hennersdorf.",
};

function NewsImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group overflow-hidden rounded-lg bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );
}

const sortedEntries = [...NEWS_ENTRIES].sort((a, b) =>
  b.dateSort.localeCompare(a.dateSort)
);

export default function AktuellesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/dorferneuerung"
        className="mb-4 inline-block text-sm text-gray-400 hover:text-brand"
      >
        &larr; Dorferneuerung
      </Link>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        Dorferneuerung
      </p>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Aktuelles
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Neuigkeiten, Veranstaltungen und Berichte aus der Dorferneuerung
        Hennersdorf.
      </p>

      <div className="mt-8 space-y-8">
        {sortedEntries.map((entry) => (
          <article
            key={entry.id}
            id={entry.id}
            className="border-t border-gray-200 pt-6"
          >
            <p className="text-xs text-gray-400 mb-1">{entry.date}</p>
            <h3 className="text-[15px] font-semibold text-gray-800">
              {entry.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {entry.body}
            </p>

            {entry.images.length > 0 && (
              <div
                className={`mt-4 ${
                  entry.images.length === 1
                    ? "max-w-md"
                    : entry.images.length === 2
                      ? "grid grid-cols-2 gap-3 max-w-xl"
                      : "grid grid-cols-2 gap-3 sm:grid-cols-3 max-w-2xl"
                }`}
              >
                {entry.images.map((img, i) => (
                  <NewsImage
                    key={i}
                    src={img}
                    alt={`${entry.title} - Bild ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
