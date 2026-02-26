import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekte - Dorferneuerung - Kulturverein Hennersdorf",
  description:
    "Die Projekte der Dorferneuerung Hennersdorf: Kulturpfad, 360° Panoramen, Weg der Ziegelbarone und mehr.",
};

const PROJECTS = [
  {
    href: "/panoramen",
    icon: "\u{1f30d}",
    title: "360° Panoramen",
    desc: "Ein virtueller Rundgang mit 26 interaktiven 360-Grad-Panoramen von interessanten Aussichtspunkten in Hennersdorf — mit Audioguides und Informations-Markern.",
    cta: "Zur Panoramen-Seite",
  },
  {
    href: "/dorferneuerung/projekte/kulturpfad",
    icon: "\u{1f6b6}",
    title: "Kulturpfad",
    desc: "Ein rund zwei Kilometer langer Fußweg, der elf historische Orte Hennersdorfs miteinander verbindet. An jeder Station informiert eine Schautafel über die Geschichte und Bedeutung des Ortes.",
    cta: "Kulturpfad entdecken",
  },
  {
    href: "/dorferneuerung/projekte/ziegelbarone",
    icon: "\u{1f6b2}",
    title: "Weg der Ziegelbarone",
    desc: "Ein rund 25 km langer, beschilderter Radweg südlich von Wien, der die Geschichte der Ziegelindustrie in der Region erlebbar macht. Seit 2019 verbindet die Route 8 Gemeinden.",
    cta: "Route erkunden",
  },
  {
    href: "/dorferneuerung/strassennamen",
    icon: "\u{1f3d8}",
    title: "Straßennamen von Hennersdorf",
    desc: "Wer waren die Persönlichkeiten hinter den Straßennamen? Die Dorferneuerungsgruppe hat die Geschichten aller 23 Hennersdorfer Straßennamen recherchiert und dokumentiert.",
    cta: "Alle Straßen ansehen",
  },
];

export default function ProjektePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
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
        Projekte
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Die Dorferneuerungsgruppe des Kulturvereins hat in über zehn Jahren
        zahlreiche Projekte umgesetzt — von digitalen Innovationen bis zur
        Dokumentation der Ortsgeschichte.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <Link
            key={project.href}
            href={project.href}
            className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-brand/30 hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-lg text-brand">
              <span aria-hidden>{project.icon}</span>
            </div>
            <h2 className="text-[15px] font-semibold text-gray-800 group-hover:text-brand transition-colors">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {project.desc}
            </p>
            <p className="mt-3 text-xs font-medium text-brand">
              {project.cta} &rarr;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
