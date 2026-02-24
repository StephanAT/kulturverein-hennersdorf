import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dorferneuerung - Kulturverein Hennersdorf",
  description:
    "Dorferneuerungsprojekte des Kulturvereins Hennersdorf. Gemeinsam gestalten wir die Zukunft unserer Gemeinde.",
};

interface NewsEntry {
  id: string;
  title: string;
  date: string;
  dateSort: string;
  body: string;
  images: string[];
}

const NEWS_ENTRIES: NewsEntry[] = [
  {
    id: "container-art",
    title: "Blick auf Kunstwerke anstatt auf hässliche Container",
    date: "2025",
    dateSort: "2025-06-01",
    body: `Zwei rostige Container beim Kulturzentrum 9er Haus, die bislang als Lager für Theaterrequisiten dienten, wurden in echte Hingucker verwandelt. Künstlerinnen und Künstler aus der Malgruppe des Kulturvereins schufen Kunstwerke, die von der Fa. Artograph professionell gestaltet und auf wetterfeste Folien gedruckt wurden. An zwei Wochenenden montierten freiwillige Helfer Holzrahmen und spannten die Folien auf. Das Projekt wurde von der NÖ Dorf- und Stadterneuerung gefördert — ein gelungenes Beispiel, wie Gemeinschaft und Kreativität das Ortsbild verschönern.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3552679",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3552677",
    ],
  },
  {
    id: "dorfheld-vejchar",
    title: "Alfred Vejchar ist Hennersdorfs Dorfheld 2025",
    date: "13. Juni 2025",
    dateSort: "2025-06-13",
    body: `Große Ehre für Alfred Vejchar: Beim Forum der NÖ Dorf- und Stadterneuerung wurde er als Hennersdorfs Dorfheld 2025 ausgezeichnet. Über Jahrzehnte hinweg hat er die Ortsgeschichte dokumentiert und mit www.hennersdorf.at eine der ersten Gemeinde-Websites Österreichs geschaffen. Im selben Jahr feierte er seinen 80. Geburtstag — ein wahrer Pionier der digitalen Heimatpflege.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3474414",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3474415",
    ],
  },
  {
    id: "kinder-dorfgespraech-2025",
    title: "Kinder-Dorfgespräch: Beeindruckender Abschluss",
    date: "12. Juni 2025",
    dateSort: "2025-06-12",
    body: `Rund 70 Besucher:innen kamen zur Abschlussveranstaltung des Kinder-Dorfgesprächs in die Volksschule Achau-Hennersdorf. Die Kinder präsentierten ihre Erlebnisse aus dem Unterricht und den Exkursionen durch Hennersdorf — was ihnen gefällt und was verbessert werden sollte. Besonders stolz: Der Trinkbrunnen, ein früherer Kinderwunsch, wurde bereits umgesetzt. Ein Projekt, das zeigt, wie ernst die Meinungen der Jüngsten genommen werden.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3474132",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3474135",
    ],
  },
  {
    id: "frauenmesse",
    title: "Frauenmesse war ein großer Erfolg",
    date: "27. April 2025",
    dateSort: "2025-04-27",
    body: `Bei strahlendem Wetter lockte die jährliche Frauenmesse rund 200 Besucher:innen an. 25 Aussteller:innen boten Kleidung, Schmuck, Kerzen und Küchenartikel an. Höhepunkt war die professionelle Modeschau, bei der Amateur-Models elegante Outfits präsentierten. Das reichhaltige Buffet war, wie immer, ein beliebter Treffpunkt. Ein Nachmittag voller Genuss, Stil und Gemeinschaft.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3445239",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3445243",
    ],
  },
  {
    id: "trinkbrunnen",
    title: "Trinkbrunnen neben der Kirche feierlich eingeweiht",
    date: "26. April 2025",
    dateSort: "2025-04-26",
    body: `Ein handgepumpter, historisch gestalteter Trinkbrunnen neben der Kirche wurde von Bürgermeister Thaddäus Heindl feierlich eingeweiht und von Pfarrer Edward Keska gesegnet. In den frostfreien Monaten bietet er kostenloses Trinkwasser für alle. Mit den umliegenden Sitzbänken entsteht ein neuer Treffpunkt im Herzen von Hennersdorf — nachhaltig durch Handbetrieb, ganz ohne Strom.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3467522",
    ],
  },
  {
    id: "anradeln-2025",
    title: "Anradeln am Weg der Ziegelbarone",
    date: "26. April 2025",
    dateSort: "2025-04-26",
    body: `Die Dorferneuerungsgruppe lud zum Anradeln ein: Treffpunkt war der neue Trinkbrunnen neben der Kirche, wo nach der Einweihung und Segnung eine Erfrischung wartete. Danach ging es auf dem Rad zur Wallfahrtskirche Maria Lanzendorf, wo Historisches über die Kirche erzählt wurde. Zurück ging es über Himberg und Achau — insgesamt rund 25 km, mit Abkürzungsmöglichkeit.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3440731",
    ],
  },
  {
    id: "exkursion-2025",
    title: "Exkursion mit Volksschulkindern durch Hennersdorf",
    date: "28. April 2025",
    dateSort: "2025-04-28",
    body: `Die dritten Klassen der Volksschule Achau-Hennersdorf erkundeten bei einer Exkursion die Wirtschafts- und Kulturbetriebe des Ortes. Stationen waren die Ziegelfabrik Wienerberger, die Kirche mit ihrer Baugeschichte, die Toyota-Autowerkstatt und das Gemeindeamt. Die Begeisterung der Schüler:innen macht Lust auf Wiederholung — ein Projekt, das Schule und Gemeinde verbindet.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3446820",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3446819",
    ],
  },
  {
    id: "workshop-2025",
    title: "Workshop 2025 in der Volksschule",
    date: "25. Februar 2025",
    dateSort: "2025-02-25",
    body: `Die Dorferneuerungsgruppe gestaltete einen Lehrworkshop für die dritten Klassen der Volksschule Achau-Hennersdorf. An drei Themenstationen lernten die Kinder über die Geschichte Hennersdorfs, die umgebende Landschaft und die heimische Tier- und Pflanzenwelt. Ein Quiz und ein virtueller Dorfrundgang mit 360°-Panoramen am Großbildschirm rundeten den Vormittag ab. Anschauliche Unterlagen über Hennersdorf wurden verteilt.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3405133",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3405141",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3405235",
    ],
  },
  {
    id: "mariensaeule",
    title: "Mariensäule renoviert und gesegnet",
    date: "1. November 2024",
    dateSort: "2024-11-01",
    body: `Hennersdorfs ältestes Denkmal erstrahlt in neuem Glanz: Die Mariensäule, 1674 von Mühlenbesitzern errichtet und mit einem stilisierten Mühlrad versehen, wurde aufwändig restauriert. 80% der Kosten übernahm die NÖ Dorf- und Stadterneuerung im Rahmen von „Stolz auf unser Dorf". Bei der feierlichen Einweihung am Allerheiligentag segnete Pfarrer Edward Keska das renovierte Wahrzeichen.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3330790",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3317724",
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3330786",
    ],
  },
  {
    id: "dorfheld-holzbach",
    title: "Manfred Holzbach ist Hennersdorfs Dorfheld 2024",
    date: "2024",
    dateSort: "2024-06-01",
    body: `Manfred Holzbach wurde mit dem Dorfhelden-Award für seinen jahrzehntelangen Einsatz für die Verschönerung und kulturelle Bereicherung Hennersdorfs ausgezeichnet. Vizebürgermeisterin Simone Kubo nominierte ihn und würdigte sein besonderes Engagement gemeinsam mit Andrea Holzbach. Die Dorferneuerung feiert in diesem Jahr ihr 10-jähriges Bestehen — ein Meilenstein, der auch Manfreds unermüdlichem Einsatz zu verdanken ist.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3229572",
    ],
  },
  {
    id: "kinder-dorfgespraech-2024",
    title: "Würdiger Abschluss des Kinder-Dorfgesprächs 2024",
    date: "6. Juni 2024",
    dateSort: "2024-06-06",
    body: `Rund 70 Gemeindemitglieder kamen zur Abschlussveranstaltung im 9er Haus. Die Kinder präsentierten ihre Projekterfahrungen aus drei thematischen Gruppen, die „Hennersdorf durch Kinderaugen" erarbeiteten. Dabei identifizierten sie Verbesserungsmöglichkeiten und neue Entwicklungsideen. Bemerkenswert: Die Kinder formulierten ernsthafte, durchdachte Anliegen — ein Zeichen dafür, wie wichtig Beteiligung schon im jungen Alter ist.`,
    images: [],
  },
  {
    id: "kultur-radtour-2024",
    title: "Kultur-Radtour: Romanische Kirchen",
    date: "4. Mai 2024",
    dateSort: "2024-05-04",
    body: `Radtourenkoordinator Gerhard Horvath führte 36 Radler:innen auf eine kulturelle Entdeckungstour zu romanischen Kirchen in Unterlaa, Himberg und Hennersdorf. Bei bestem Wetter erkundeten die Teilnehmer:innen die Architekturgeschichte der Region und ließen den Tag gemütlich beim Heurigen ausklingen. Eine perfekte Verbindung von Sport, Kultur und Geselligkeit.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3202561",
    ],
  },
  {
    id: "exkursion-2024",
    title: "Volksschul-Exkursion durch Hennersdorf 2024",
    date: "30. April 2024",
    dateSort: "2024-04-30",
    body: `Die dritten Klassen besuchten die Wienerberger Ziegelfabrik, die Kirche mit ihrer historischen Baugeschichte, eine Alpaka-Farm — wo die Kinder die Tiere füttern und streicheln durften — und das Gemeindeamt. Ein abwechslungsreicher Tag, der den Kindern die Berufsvielfalt und das kulturelle Erbe Hennersdorfs näherbrachte.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3195973",
    ],
  },
  {
    id: "workshop-2024",
    title: "Workshop in der Volksschule 2024",
    date: "30. Jänner 2024",
    dateSort: "2024-01-30",
    body: `Die Dorferneuerungsgruppe präsentierte neu entwickeltes Lehrmaterial über Hennersdorf in der Volksschule. An drei Themenstationen erforschten die Kinder Geschichte, Umgebung und heimische Flora und Fauna. Als Folgeprojekt wurde eine Exkursion im April geplant — der Startschuss für ein spannendes Schuljahr der Dorferneuerung.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3142185",
    ],
  },
  {
    id: "dorfcafe-360",
    title: "DorfCafé: Workshop 360° Panoramen",
    date: "21. September 2023",
    dateSort: "2023-09-21",
    body: `Rund 25 Besucher:innen kamen zum DorfCafé-Workshop über das 360°-Panorama-Projekt. Die Präsentatoren erklärten die verschiedenen Zugangswege — über die Gem2Go-App, QR-Codes und die Gemeinde-Homepage — und führten durch 24 Panoramen mit Audioguides. Ein innovatives Projekt, das Hennersdorf digital erlebbar macht und Ortsgeschichte modern vermittelt.`,
    images: [
      "https://www.gemeinde-hennersdorf.at/system/web/getImage.ashx?fileid=3054288",
    ],
  },
];

function NewsImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-48 w-full object-cover sm:h-56"
        loading="lazy"
      />
    </div>
  );
}

export default function DorferneuerungPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="mb-2 inline-block text-sm font-medium text-emerald-600">
        Gemeinde gestalten
      </span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
        Dorferneuerung
      </h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Im Rahmen der Dorferneuerung arbeiten wir gemeinsam mit der Gemeinde und
        engagierten Bürger:innen an der Verschönerung und Weiterentwicklung von
        Hennersdorf. Hier finden Sie einen Überblick über unsere Projekte und
        Aktivitäten.
      </p>

      {/* Highlights */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-2xl">🏆</span>
          <p className="mt-2 text-sm font-semibold text-gray-800">10+ Jahre aktiv</p>
          <p className="text-xs text-gray-500">Seit über einem Jahrzehnt für Hennersdorf</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-2xl">👨‍👩‍👧‍👦</span>
          <p className="mt-2 text-sm font-semibold text-gray-800">Kinder eingebunden</p>
          <p className="text-xs text-gray-500">Workshops & Exkursionen mit der Volksschule</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
          <span className="text-2xl">🌍</span>
          <p className="mt-2 text-sm font-semibold text-gray-800">NÖ gefördert</p>
          <p className="text-xs text-gray-500">Mit Unterstützung der NÖ Dorf- und Stadterneuerung</p>
        </div>
      </div>

      {/* News Entries */}
      <div className="mt-12 space-y-10">
        <h2 className="text-xl font-bold text-gray-800">
          Aktuelles aus der Dorferneuerung
        </h2>

        {NEWS_ENTRIES.map((entry) => (
          <article
            key={entry.id}
            id={entry.id}
            className="rounded-xl border border-gray-200 bg-white shadow-[2px_4px_6px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            {/* Images */}
            {entry.images.length > 0 && (
              <div
                className={
                  entry.images.length === 1
                    ? ""
                    : entry.images.length === 2
                      ? "grid grid-cols-2"
                      : "grid grid-cols-2 sm:grid-cols-3"
                }
              >
                {entry.images.map((img, i) => (
                  <NewsImage key={i} src={img} alt={`${entry.title} - Bild ${i + 1}`} />
                ))}
              </div>
            )}

            <div className="p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  Dorferneuerung
                </span>
                <span className="text-xs text-gray-400">{entry.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{entry.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Mitmachen */}
      <div className="mt-12 rounded-xl bg-emerald-50 p-6">
        <h2 className="text-lg font-semibold text-gray-800">Mitmachen!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Die Dorferneuerung lebt vom Engagement der Hennersdorfer:innen. Ob
          Ortsverschönerung, Denkmalrenovierung, Kinderprojekte oder
          Kulturradtouren — es gibt viele Möglichkeiten mitzuwirken. Kontakt:{" "}
          <a
            href="mailto:manfred.holzbach@aon.at"
            className="text-brand hover:text-brand-dark font-medium"
          >
            manfred.holzbach@aon.at
          </a>
        </p>
      </div>
    </div>
  );
}
