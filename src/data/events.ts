export interface FallbackEvent {
  _id: string;
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  location?: string;
  address?: string;
  description: string;
  bodyHtml?: string;
  image?: string;
  gallery?: string[];
  price?: string;
  organizer?: string;
  contact?: string;
  externalLink?: string;
  project?: string;
}

export const FALLBACK_EVENTS: FallbackEvent[] = [
  {
    _id: "frauenmesse-2026",
    slug: "frauenmesse-2026",
    title: "Hennersdorfer Frauenmesse",
    date: "2026-04-26T10:00:00Z",
    location: "Feuerwehrhaus Hennersdorf",
    address: "Florianiplatz 1, 2332 Hennersdorf",
    description:
      "Kleidung, Accessoires und Praktisches zu erwerben. Modeschau und Kulinarik. Ein beliebter Fixpunkt im Hennersdorfer Veranstaltungskalender.",
    bodyHtml:
      "<p>Die Hennersdorfer Frauenmesse ist einer der beliebtesten Termine im Veranstaltungskalender unserer Gemeinde. Rund 25 Aussteller:innen pr\u00E4sentieren Kleidung, Accessoires, Schmuck, Kosmetik und vieles mehr.</p><p>Highlights: Professionelle Modeschau, reichhaltiges Buffet mit hausgemachten Mehlspeisen und herzhaften Snacks. Der Eintritt ist frei.</p>",
    price: "Freier Eintritt",
    organizer: "Kulturverein Hennersdorf",
    contact: "office@kulturverein-hennersdorf.at",
  },
  {
    _id: "baeuerin-sucht-2025",
    slug: "baeuerin-sucht-2025",
    title: "Martha Theater: B\u00E4uerin sucht\u2026",
    date: "2025-10-01T19:30:00Z",
    location: "Kulturzentrum 9er Haus",
    address: "Bachgasse 9, 2332 Hennersdorf",
    description:
      "Die Herbstproduktion 2025 des Martha Theaters im Kulturzentrum 9er Haus.",
    bodyHtml:
      "<p>Das Martha Theater pr\u00E4sentiert seine Herbstproduktion 2025: \u201EB\u00E4uerin sucht\u2026\u201C \u2014 eine unterhaltsame Kom\u00F6die auf der B\u00FChne des 9er Hauses.</p><p>Seit 1994 bringen engagierte Laienschauspieler:innen aus Hennersdorf und Umgebung jedes Jahr ein neues St\u00FCck auf die B\u00FChne. Benannt nach Martha Eichberger, ist das Theater ein fester Bestandteil des kulturellen Lebens in unserer Gemeinde.</p>",
    price: "15 \u20AC",
    organizer: "Martha Theater",
    contact: "office@kulturverein-hennersdorf.at",
    externalLink: "https://www.martha-theater.at/",
    project: "Martha Theater",
    image: "/images/martha-theater/szene-2.jpg",
    gallery: [
      "/images/martha-theater/szene-1.jpg",
      "/images/martha-theater/szene-3.jpg",
      "/images/martha-theater/szene-4.jpg",
    ],
  },
  {
    _id: "kasperl-2025",
    slug: "kasperltheater-2025",
    title: "Kasperltheater im 9er Haus",
    date: "2025-11-01T15:00:00Z",
    location: "Kulturzentrum 9er Haus",
    address: "Bachgasse 9, 2332 Hennersdorf",
    description:
      "Puppentheater f\u00FCr Kinder und Familien \u2014 ein fester Bestandteil des Kulturprogramms.",
    price: "Freiwillige Spende",
    organizer: "Kulturverein Hennersdorf",
    project: "Kasperltheater",
  },
  {
    _id: "frauenmesse-2025",
    slug: "frauenmesse-2025",
    title: "Hennersdorfer Frauenmesse",
    date: "2025-04-27T10:00:00Z",
    location: "Feuerwehrhaus Hennersdorf",
    address: "Florianiplatz 1, 2332 Hennersdorf",
    description:
      "Rund 200 Besucher:innen, 25 Aussteller:innen, professionelle Modeschau und reichhaltiges Buffet.",
    price: "Freier Eintritt",
    organizer: "Kulturverein Hennersdorf",
  },
  {
    _id: "anradeln-2025",
    slug: "anradeln-2025",
    title: "Anradeln am Weg der Ziegelbarone",
    date: "2025-04-26T09:00:00Z",
    location: "Treffpunkt: Trinkbrunnen Kirchenplatz",
    address: "Kirchenplatz, 2332 Hennersdorf",
    description:
      "Radtour ab dem neuen Trinkbrunnen \u00FCber Maria Lanzendorf, Himberg und Achau \u2014 rund 25 km.",
    bodyHtml:
      "<p>Das j\u00E4hrliche Anradeln am Weg der Ziegelbarone startet beim neuen Trinkbrunnen am Kirchenplatz. Die ca. 2\u00BD-st\u00FCndige gemeinsame Fahrt f\u00FChrt durch die Region, w\u00E4hrend Radtourenkoordinator Gerhard Horvath interessante Orte entlang des Weges erl\u00E4utert.</p><p>Die Radroute ist beschildert, abwechslungsreich und einfach zu befahren \u2014 ideal f\u00FCr Familien und Genussradler:innen.</p>",
    price: "Freier Eintritt",
    organizer: "Dorferneuerung Hennersdorf",
    project: "Dorferneuerung",
  },
  {
    _id: "desaster-dinner-2024",
    slug: "desaster-dinner-2024",
    title: "Martha Theater: Das (perfekte) Desaster Dinner",
    date: "2024-10-01T19:30:00Z",
    location: "Kulturzentrum 9er Haus",
    address: "Bachgasse 9, 2332 Hennersdorf",
    description:
      "Die Herbstproduktion 2024 \u2014 eine turbulente Kom\u00F6die auf der B\u00FChne des 9er Hauses.",
    price: "15 \u20AC",
    organizer: "Martha Theater",
    externalLink: "https://www.martha-theater.at/",
    project: "Martha Theater",
  },
  {
    _id: "kultur-radtour-2024",
    slug: "kultur-radtour-2024",
    title: "Kultur-Radtour: Romanische Kirchen",
    date: "2024-05-04T09:00:00Z",
    location: "Treffpunkt: Hauptplatz Hennersdorf",
    address: "Hauptplatz, 2332 Hennersdorf",
    description:
      "36 Radler:innen erkundeten romanische Kirchen in Unterlaa, Himberg und Hennersdorf.",
    price: "Freier Eintritt",
    organizer: "Dorferneuerung Hennersdorf",
    project: "Dorferneuerung",
  },
];

export function toEventSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\u00E4/g, "ae")
    .replace(/\u00F6/g, "oe")
    .replace(/\u00FC/g, "ue")
    .replace(/\u00DF/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")
    .replace(/^-+/, "");
}

export function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr) >= new Date();
}
