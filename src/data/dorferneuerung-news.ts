export interface NewsEntry {
  id: string;
  title: string;
  date: string;
  dateSort: string;
  body: string;
  images: string[];
}

export const NEWS_ENTRIES: NewsEntry[] = [
  {
    id: "container-art",
    title: "Blick auf Kunstwerke anstatt auf hässliche Container",
    date: "2025",
    dateSort: "2025-06-01",
    body: `Zwei rostige Container beim Kulturzentrum 9er Haus, die bislang als Lager für Theaterrequisiten dienten, wurden in echte Hingucker verwandelt. Künstlerinnen und Künstler aus der Malgruppe des Kulturvereins schufen Kunstwerke, die von der Fa. Artograph professionell gestaltet und auf wetterfeste Folien gedruckt wurden. An zwei Wochenenden montierten freiwillige Helfer Holzrahmen und spannten die Folien auf. Das Projekt wurde von der NÖ Dorf- und Stadterneuerung gefördert — ein gelungenes Beispiel, wie Gemeinschaft und Kreativität das Ortsbild verschönern.`,
    images: [
      "/images/dorferneuerung/container-art-1.jpg",
      "/images/dorferneuerung/container-art-2.jpg",
    ],
  },
  {
    id: "dorfheld-vejchar",
    title: "Alfred Vejchar ist Hennersdorfs Dorfheld 2025",
    date: "13. Juni 2025",
    dateSort: "2025-06-13",
    body: `Große Ehre für Alfred Vejchar: Beim Forum der NÖ Dorf- und Stadterneuerung wurde er als Hennersdorfs Dorfheld 2025 ausgezeichnet. Über Jahrzehnte hinweg hat er die Ortsgeschichte dokumentiert und mit www.hennersdorf.at eine der ersten Gemeinde-Websites Österreichs geschaffen. Im selben Jahr feierte er seinen 80. Geburtstag — ein wahrer Pionier der digitalen Heimatpflege.`,
    images: [
      "/images/dorferneuerung/dorfheld-vejchar-1.jpg",
      "/images/dorferneuerung/dorfheld-vejchar-2.jpg",
    ],
  },
  {
    id: "kinder-dorfgespraech-2025",
    title: "Kinder-Dorfgespräch: Beeindruckender Abschluss",
    date: "12. Juni 2025",
    dateSort: "2025-06-12",
    body: `Rund 70 Besucher:innen kamen zur Abschlussveranstaltung des Kinder-Dorfgesprächs in die Volksschule Achau-Hennersdorf. Die Kinder präsentierten ihre Erlebnisse aus dem Unterricht und den Exkursionen durch Hennersdorf — was ihnen gefällt und was verbessert werden sollte. Besonders stolz: Der Trinkbrunnen, ein früherer Kinderwunsch, wurde bereits umgesetzt. Ein Projekt, das zeigt, wie ernst die Meinungen der Jüngsten genommen werden.`,
    images: [
      "/images/dorferneuerung/kinder-dorfgespraech-1.jpg",
      "/images/dorferneuerung/kinder-dorfgespraech-2.jpg",
    ],
  },
  {
    id: "frauenmesse",
    title: "Frauenmesse war ein großer Erfolg",
    date: "27. April 2025",
    dateSort: "2025-04-27",
    body: `Bei strahlendem Wetter lockte die jährliche Frauenmesse rund 200 Besucher:innen an. 25 Aussteller:innen boten Kleidung, Schmuck, Kerzen und Küchenartikel an. Höhepunkt war die professionelle Modeschau, bei der Amateur-Models elegante Outfits präsentierten. Das reichhaltige Buffet war, wie immer, ein beliebter Treffpunkt. Ein Nachmittag voller Genuss, Stil und Gemeinschaft.`,
    images: [
      "/images/dorferneuerung/frauenmesse-1.jpg",
      "/images/dorferneuerung/frauenmesse-2.jpg",
    ],
  },
  {
    id: "trinkbrunnen",
    title: "Trinkbrunnen neben der Kirche feierlich eingeweiht",
    date: "26. April 2025",
    dateSort: "2025-04-26",
    body: `Ein handgepumpter, historisch gestalteter Trinkbrunnen neben der Kirche wurde von Bürgermeister Thaddäus Heindl feierlich eingeweiht und von Pfarrer Edward Keska gesegnet. In den frostfreien Monaten bietet er kostenloses Trinkwasser für alle. Mit den umliegenden Sitzbänken entsteht ein neuer Treffpunkt im Herzen von Hennersdorf — nachhaltig durch Handbetrieb, ganz ohne Strom.`,
    images: [
      "/images/dorferneuerung/trinkbrunnen.jpg",
    ],
  },
  {
    id: "anradeln-2025",
    title: "Anradeln am Weg der Ziegelbarone",
    date: "26. April 2025",
    dateSort: "2025-04-26",
    body: `Die Dorferneuerungsgruppe lud zum Anradeln ein: Treffpunkt war der neue Trinkbrunnen neben der Kirche, wo nach der Einweihung und Segnung eine Erfrischung wartete. Danach ging es auf dem Rad zur Wallfahrtskirche Maria Lanzendorf, wo Historisches über die Kirche erzählt wurde. Zurück ging es über Himberg und Achau — insgesamt rund 25 km, mit Abkürzungsmöglichkeit.`,
    images: [
      "/images/dorferneuerung/anradeln-2025.jpg",
    ],
  },
  {
    id: "exkursion-2025",
    title: "Exkursion mit Volksschulkindern durch Hennersdorf",
    date: "28. April 2025",
    dateSort: "2025-04-28",
    body: `Die dritten Klassen der Volksschule Achau-Hennersdorf erkundeten bei einer Exkursion die Wirtschafts- und Kulturbetriebe des Ortes. Stationen waren die Ziegelfabrik Wienerberger, die Kirche mit ihrer Baugeschichte, die Toyota-Autowerkstatt und das Gemeindeamt. Die Begeisterung der Schüler:innen macht Lust auf Wiederholung — ein Projekt, das Schule und Gemeinde verbindet.`,
    images: [
      "/images/dorferneuerung/exkursion-2025-1.jpg",
      "/images/dorferneuerung/exkursion-2025-2.jpg",
    ],
  },
  {
    id: "workshop-2025",
    title: "Workshop 2025 in der Volksschule",
    date: "25. Februar 2025",
    dateSort: "2025-02-25",
    body: `Die Dorferneuerungsgruppe gestaltete einen Lehrworkshop für die dritten Klassen der Volksschule Achau-Hennersdorf. An drei Themenstationen lernten die Kinder über die Geschichte Hennersdorfs, die umgebende Landschaft und die heimische Tier- und Pflanzenwelt. Ein Quiz und ein virtueller Dorfrundgang mit 360°-Panoramen am Großbildschirm rundeten den Vormittag ab. Anschauliche Unterlagen über Hennersdorf wurden verteilt.`,
    images: [
      "/images/dorferneuerung/workshop-2025-1.jpg",
      "/images/dorferneuerung/workshop-2025-2.jpg",
      "/images/dorferneuerung/workshop-2025-3.jpg",
    ],
  },
  {
    id: "mariensaeule",
    title: "Mariensäule renoviert und gesegnet",
    date: "1. November 2024",
    dateSort: "2024-11-01",
    body: `Hennersdorfs ältestes Denkmal erstrahlt in neuem Glanz: Die Mariensäule, 1674 von Mühlenbesitzern errichtet und mit einem stilisierten Mühlrad versehen, wurde aufwändig restauriert. 80% der Kosten übernahm die NÖ Dorf- und Stadterneuerung im Rahmen von „Stolz auf unser Dorf". Bei der feierlichen Einweihung am Allerheiligentag segnete Pfarrer Edward Keska das renovierte Wahrzeichen.`,
    images: [
      "/images/dorferneuerung/mariensaeule-1.jpg",
      "/images/dorferneuerung/mariensaeule-2.jpg",
      "/images/dorferneuerung/mariensaeule-3.jpg",
    ],
  },
  {
    id: "dorfheld-holzbach",
    title: "Manfred Holzbach ist Hennersdorfs Dorfheld 2024",
    date: "2024",
    dateSort: "2024-06-01",
    body: `Manfred Holzbach wurde mit dem Dorfhelden-Award für seinen jahrzehntelangen Einsatz für die Verschönerung und kulturelle Bereicherung Hennersdorfs ausgezeichnet. Vizebürgermeisterin Simone Kubo nominierte ihn und würdigte sein besonderes Engagement gemeinsam mit Andrea Holzbach. Die Dorferneuerung feiert in diesem Jahr ihr 10-jähriges Bestehen — ein Meilenstein, der auch Manfreds unermüdlichem Einsatz zu verdanken ist.`,
    images: [
      "/images/dorferneuerung/dorfheld-holzbach.jpg",
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
      "/images/dorferneuerung/kultur-radtour-2024.jpg",
    ],
  },
  {
    id: "exkursion-2024",
    title: "Volksschul-Exkursion durch Hennersdorf 2024",
    date: "30. April 2024",
    dateSort: "2024-04-30",
    body: `Die dritten Klassen besuchten die Wienerberger Ziegelfabrik, die Kirche mit ihrer historischen Baugeschichte, eine Alpaka-Farm — wo die Kinder die Tiere füttern und streicheln durften — und das Gemeindeamt. Ein abwechslungsreicher Tag, der den Kindern die Berufsvielfalt und das kulturelle Erbe Hennersdorfs näherbrachte.`,
    images: [
      "/images/dorferneuerung/exkursion-2024.jpg",
    ],
  },
  {
    id: "workshop-2024",
    title: "Workshop in der Volksschule 2024",
    date: "30. Jänner 2024",
    dateSort: "2024-01-30",
    body: `Die Dorferneuerungsgruppe präsentierte neu entwickeltes Lehrmaterial über Hennersdorf in der Volksschule. An drei Themenstationen erforschten die Kinder Geschichte, Umgebung und heimische Flora und Fauna. Als Folgeprojekt wurde eine Exkursion im April geplant — der Startschuss für ein spannendes Schuljahr der Dorferneuerung.`,
    images: [
      "/images/dorferneuerung/workshop-2024.jpg",
    ],
  },
  {
    id: "dorfcafe-360",
    title: "DorfCaf\u00e9: Workshop 360\u00b0 Panoramen",
    date: "21. September 2023",
    dateSort: "2023-09-21",
    body: `Rund 25 Besucher:innen kamen zum DorfCaf\u00e9-Workshop \u00fcber das 360\u00b0-Panorama-Projekt. Die Pr\u00e4sentatoren erkl\u00e4rten die verschiedenen Zugangswege \u2014 \u00fcber die Gem2Go-App, QR-Codes und die Gemeinde-Homepage \u2014 und f\u00fchrten durch 24 Panoramen mit Audioguides. Ein innovatives Projekt, das Hennersdorf digital erlebbar macht und Ortsgeschichte modern vermittelt.`,
    images: [],
  },
];
