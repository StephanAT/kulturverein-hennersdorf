export interface Sponsor {
  slug: string;
  name: string;
  tier: "hauptsponsor" | "sponsor" | "foerderer" | "partner";
  description: string;
  website?: string;
  /** local logo path (for fallback) */
  logo?: string;
  bodyHtml: string;
}

export const TIER_ORDER = [
  "hauptsponsor",
  "sponsor",
  "foerderer",
  "partner",
] as const;

export const TIER_LABELS: Record<string, string> = {
  hauptsponsor: "Hauptsponsoren",
  sponsor: "Sponsoren",
  foerderer: "F\u00F6rderer",
  partner: "Partner",
};

export const TIER_DESCRIPTIONS: Record<string, string> = {
  hauptsponsor:
    "Unsere Hauptsponsoren erm\u00F6glichen die gr\u00F6\u00DFten Projekte des Vereins.",
  sponsor: "Mit ihrer Unterst\u00FCtzung tragen unsere Sponsoren wesentlich zum Vereinsleben bei.",
  foerderer:
    "F\u00F6rderer unterst\u00FCtzen den Verein finanziell oder mit Sachleistungen.",
  partner:
    "Unsere Partner begleiten uns bei der Umsetzung unserer Projekte.",
};

export const FALLBACK_SPONSORS: Sponsor[] = [
  {
    slug: "gemeinde-hennersdorf",
    name: "Gemeinde Hennersdorf",
    tier: "hauptsponsor",
    description:
      "Die Gemeinde Hennersdorf ist der wichtigste Partner des Kulturvereins.",
    website: "https://www.gemeinde-hennersdorf.at/",
    logo: "/images/sponsoren/gemeinde-hennersdorf.png",
    bodyHtml: `<p>Die <strong>Gemeinde Hennersdorf</strong> unterst\u00FCtzt den Kulturverein seit seiner Gr\u00FCndung im Jahr 1994. Als Hauptsponsor erm\u00F6glicht sie die Durchf\u00FChrung zahlreicher Veranstaltungen und Projekte.</p>
<h2>Unterst\u00FCtzung</h2>
<ul>
<li>Bereitstellung von R\u00E4umlichkeiten f\u00FCr Veranstaltungen und Proben</li>
<li>Finanzielle F\u00F6rderung von Kulturprojekten</li>
<li>Zusammenarbeit bei Dorferneuerungsprojekten</li>
<li>Unterst\u00FCtzung bei der Organisation von Festen und Events</li>
</ul>
<p>Hennersdorf liegt s\u00FCdlich von Wien im Bezirk M\u00F6dling und ist eine lebendige Gemeinde mit rund 2.400 Einwohnern.</p>`,
  },
  {
    slug: "noe-dorf-und-stadterneuerung",
    name: "N\u00D6 Dorf- und Stadterneuerung",
    tier: "hauptsponsor",
    description:
      "F\u00F6rderung und Begleitung der Dorferneuerungsprojekte in Hennersdorf.",
    website: "https://www.dorfstadterneuerung.at/",
    logo: "/images/sponsoren/noe-dorferneuerung.png",
    bodyHtml: `<p>Die <strong>Nieder\u00F6sterreichische Dorf- und Stadterneuerung</strong> begleitet Gemeinden bei der Gestaltung lebenswerter Ortschaften. Der Kulturverein Hennersdorf ist seit \u00FCber zehn Jahren aktiver Teil dieses Programms.</p>
<h2>Gemeinsame Projekte</h2>
<ul>
<li>Renovierung der Mariens\u00E4ule am Hauptplatz</li>
<li>Errichtung des Trinkbrunnens</li>
<li>Kulturpfad durch Hennersdorf (11 Stationen)</li>
<li>Weg der Ziegelbarone (8 Gemeinden)</li>
<li>Container-Art Projekt</li>
<li>Stra\u00DFennamen-Tafeln mit historischen Informationen</li>
</ul>
<p>Die Zusammenarbeit mit der Dorf- und Stadterneuerung erm\u00F6glicht es, F\u00F6rdergelder des Landes Nieder\u00F6sterreich f\u00FCr die Projekte zu nutzen.</p>`,
  },
  {
    slug: "wienerberger",
    name: "Wienerberger AG",
    tier: "sponsor",
    description:
      "Weltgr\u00F6\u00DFter Ziegelproduzent mit Firmensitz in Hennersdorf.",
    website: "https://www.wienerberger.com/",
    logo: "/images/sponsoren/wienerberger.png",
    bodyHtml: `<p><strong>Wienerberger</strong> ist der weltgr\u00F6\u00DFte Ziegelproduzent und hat seinen Firmensitz in Hennersdorf. Das Unternehmen ist eng mit der Geschichte des Ortes verbunden \u2014 die Ziegelindustrie pr\u00E4gte die Region s\u00FCdlich von Wien seit Jahrhunderten.</p>
<h2>Verbindung zu Hennersdorf</h2>
<p>Die Wienerberger-Zentrale und das Ziegelwerk sind ein markanter Teil des Ortsbildes. Am <a href="/dorferneuerung/projekte/kulturpfad">Kulturpfad</a> ist die Station \u201EWienerberger\u201C einer der Highlights. Auch der <a href="/dorferneuerung/projekte/ziegelbarone">Weg der Ziegelbarone</a> erz\u00E4hlt die Geschichte der Ziegelproduktion in der Region.</p>
<p>Wienerberger unterst\u00FCtzt den Kulturverein bei verschiedenen Projekten und Veranstaltungen.</p>`,
  },
  {
    slug: "martha-theater",
    name: "Martha Theater",
    tier: "partner",
    description:
      "Die Theatergruppe des Kulturvereins mit j\u00E4hrlichen Produktionen.",
    website: "https://www.martha-theater.at/",
    logo: "/images/sponsoren/martha-theater.png",
    bodyHtml: `<p>Das <strong>Martha Theater</strong> ist die Amateurtheatergruppe des Kulturvereins und gleichzeitig dessen Herzst\u00FCck. Seit 1994 bringen engagierte Laienschauspieler:innen aus Hennersdorf und Umgebung jedes Jahr ein neues St\u00FCck auf die B\u00FChne.</p>
<h2>\u00DCber das Martha Theater</h2>
<p>Benannt nach Martha Eichberger, einer Gr\u00FCnderin des Theaters, ist das Martha Theater ein fester Bestandteil des kulturellen Lebens in Hennersdorf. Die Auff\u00FChrungen finden jedes Fr\u00FChjahr im Feuerwehrhaus statt.</p>
<p>Mehr erfahren: <a href="/martha-theater">Martha Theater Seite</a> oder <a href="https://www.martha-theater.at/" target="_blank" rel="noopener noreferrer">martha-theater.at</a></p>`,
  },
  {
    slug: "pfarre-hennersdorf",
    name: "Pfarre Hennersdorf",
    tier: "partner",
    description:
      "Zusammenarbeit bei Kulturveranstaltungen und Dorferneuerung.",
    bodyHtml: `<p>Die <strong>Pfarre Hennersdorf</strong> ist ein langj\u00E4hriger Partner des Kulturvereins. Die Pfarrkirche \u2014 die \u00E4lteste Kirche der Region mit romanischen, gotischen und barocken Elementen \u2014 ist ein kulturelles Wahrzeichen des Ortes.</p>
<h2>Gemeinsame Aktivit\u00E4ten</h2>
<ul>
<li>Kulturpfad: Station \u201EPfarrkirche\u201C</li>
<li>Renovation der Mariensäule</li>
<li>Gemeinsame Feste und Veranstaltungen</li>
<li>Zusammenarbeit beim Weg der Ziegelbarone</li>
</ul>`,
  },
  {
    slug: "volksschule-achau-hennersdorf",
    name: "Volksschule Achau-Hennersdorf",
    tier: "partner",
    description:
      "Gemeinsame Schulprojekte und Workshops mit Kindern.",
    bodyHtml: `<p>Die <strong>Volksschule Achau-Hennersdorf</strong> arbeitet eng mit dem Kulturverein zusammen. Im Rahmen des <a href="/schulprojekt">Schulprojekts</a> finden regelm\u00E4\u00DFig Workshops und Exkursionen statt.</p>
<h2>Schulprojekte</h2>
<p>Die Zusammenarbeit umfasst Projekte zur Heimatkunde, Geschichte und Kultur von Hennersdorf. Die Kinder lernen die Besonderheiten ihres Ortes kennen \u2014 von den Stra\u00DFennamen \u00FCber den Kulturpfad bis zur Ziegelgeschichte.</p>`,
  },
  {
    slug: "radlobby-niederoesterreich",
    name: "Radlobby Nieder\u00F6sterreich",
    tier: "foerderer",
    description:
      "Unterst\u00FCtzung beim Weg der Ziegelbarone und Radprojekten.",
    website: "https://www.radlobby.at/niederoesterreich",
    bodyHtml: `<p>Die <strong>Radlobby Nieder\u00F6sterreich</strong> hat den Kulturverein bei der Planung und Umsetzung des <a href="/dorferneuerung/projekte/ziegelbarone">Wegs der Ziegelbarone</a> unterst\u00FCtzt. Die 25 km lange Radroute verbindet 8 Gemeinden s\u00FCdlich von Wien.</p>
<p>Die Radlobby beriet bei der Routenplanung, Beschilderung und Bewerbung der Radroute.</p>`,
  },
  {
    slug: "noe-regional",
    name: "N\u00D6.Regional",
    tier: "foerderer",
    description:
      "Regionale Entwicklung und F\u00F6rderung der Dorferneuerungsprojekte.",
    website: "https://www.noeregional.at/",
    bodyHtml: `<p><strong>N\u00D6.Regional</strong> ist die Regionalentwicklungsagentur des Landes Nieder\u00F6sterreich. Sie unterst\u00FCtzt den Kulturverein bei der Umsetzung von Dorferneuerungsprojekten und stellt den Kontakt zu F\u00F6rderprogrammen her.</p>
<p>Durch die Zusammenarbeit mit N\u00D6.Regional konnten Projekte wie der Kulturpfad, Container-Art und die Stra\u00DFennamen-Initiative realisiert werden.</p>`,
  },
];
