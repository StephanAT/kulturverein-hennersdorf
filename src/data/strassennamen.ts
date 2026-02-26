export interface Street {
  slug: string;
  name: string;
  category: "person" | "ort" | "familie" | "flurname";
  shortDesc: string;
  namedAfter: string;
  born?: string;
  died?: string;
  location: string;
  beschluss?: string;
  body: string;
  funFact?: string;
}

export const STREETS: Street[] = [
  {
    slug: "boehlergasse",
    name: "Böhlergasse",
    category: "person",
    shortDesc: "Begründer der modernen Unfallchirurgie",
    namedAfter: "Lorenz Böhler (1885–1973)",
    born: "15. Jänner 1885, Wolfurt, Vorarlberg",
    died: "20. Jänner 1973, Wien",
    location: "Siedlung ‚Achauer Spitz' am südöstlichen Ortsausgang",
    beschluss: "6. Mai 1983",
    body: `Lorenz Böhler gilt als Begründer der modernen Unfallchirurgie. Nach zahlreichen Reisen nach Süd- und Nordamerika, wo er sich weiter ausbildete, entwickelte er 1916 eine neue Methode zur fachgemäßen Ruhigstellung von Knochenbrüchen und verwendete erstmals einen Marknagel zur Heilung gebrochener Knochen.

Nach dem Ersten Weltkrieg arbeitete er an der Chirurgischen Klinik Hochenegg und der Orthopädischen Universitätsklinik von Adolf Lorenz in Wien, war Chirurg in Gries bei Bozen und danach Leiter des Krankenhauses in Brixen. 1925 wurde er Primarius und Direktor des nach seinen Plänen errichteten ersten Unfallkrankenhauses in Wien (Lorenz-Böhler-Krankenhaus). 1930 habilitierte er an der Wiener Universität, wurde 1936 außerordentlicher Professor und 1954 ordentlicher Professor für Unfallchirurgie.

Er verfasste 450 wissenschaftliche Werke, darunter sein dreibändiges Hauptwerk "Technik der Knochenbruchbehandlung" (1929), das in 13 deutschen Auflagen erschien und in alle Weltsprachen übersetzt wurde.`,
    funFact: "Böhlers Hauptwerk wurde in alle Weltsprachen übersetzt — ein Standardwerk der Unfallchirurgie, das Generationen von Ärzten weltweit geprägt hat.",
  },
  {
    slug: "flemingstrasse",
    name: "Flemingstraße",
    category: "person",
    shortDesc: "Entdecker des Penicillins",
    namedAfter: "Sir Alexander Fleming (1881–1955)",
    born: "6. August 1881, Darvel, Schottland",
    died: "11. März 1955, London",
    location: "Querstraße zur Hauptstraße und zum ‚Achauer Spitz'",
    beschluss: "März 1956",
    body: `Sir Alexander Fleming war ein schottischer Mediziner und Bakteriologe. 1928 entdeckte er das Penicillin — eines der bedeutendsten medizinischen Durchbrüche des 20. Jahrhunderts. Ebenso entdeckte er das Lysozym, ein Enzym mit starken antibakteriellen Eigenschaften, das in verschiedenen Körpersekreten wie Tränen und Speichel vorkommt.

1945 erhielt er den Nobelpreis für Physiologie oder Medizin. 2007 wurde der Asteroid (91006) nach ihm benannt. In Stuttgart wurde 2013 die "Berufliche Schule für Gesundheit und Pflege" nach ihm getauft.`,
    funFact: "Flemings Entdeckung des Penicillins war ein Zufall: Er bemerkte, dass Schimmelpilze auf einer vergessenen Bakterienkultur das Wachstum der Bakterien hemmten.",
  },
  {
    slug: "grillparzerstrasse",
    name: "Grillparzerstraße",
    category: "person",
    shortDesc: "Österreichischer Dramatiker und Schriftsteller",
    namedAfter: "Franz Grillparzer (1791–1872)",
    born: "15. Jänner 1791, Wien",
    died: "21. Jänner 1872, Wien",
    location: "Parallelstraße südlich der Hauptstraße",
    beschluss: "März 1956",
    body: `Franz Grillparzer war Schriftsteller und Dramatiker, der das gesellschaftliche klassisch-romantische Bildungsgut seiner Zeit zusammenfasste. Aus seinen Tagebüchern erkennt man den bürgerlich-oppositionellen Zeit- und Kulturkritiker.

Nach seinem Philosophie- und Jusstudium war er Konzeptspraktikant an der Hofbibliothek, dann Hofkonzipist bei der Allgemeinen Hofkammer. Von 1832 bis zu seiner Pensionierung als Hofrat (1856) leitete er das Hofkammerarchiv.

Zu seinen bedeutendsten Werken zählen "Die Ahnfrau" (1817), "Sappho" (1818), die Trilogie "Das goldene Vlies" (1820), "König Ottokars Glück und Ende" (1825), "Der Traum ein Leben" (1834) und die Novelle "Der arme Spielmann" (1838). Von 1849 bis zu seinem Tod lebte er bei den Schwestern Fröhlich, wo er an seinen großen Altersdramen arbeitete.`,
    funFact: "Grillparzer wurde 1864 Ehrenbürger der Stadt Wien — seine Büste schmückt bis heute das Wiener Burgtheater.",
  },
  {
    slug: "hoebelgasse",
    name: "Höbelgasse",
    category: "familie",
    shortDesc: "Alteingesessene Hennersdorfer Familie",
    namedAfter: "Familie Höbel",
    location: "Südlich der Hauptstraße in der Nähe des Hauptplatzes",
    beschluss: "28. Oktober 1976",
    body: `Die Gasse wurde benannt nach der Familie Höbel, die seit 1784 jahrzehntelang im Besitz des Eckhauses Höbelgasse–Hauptstraße stand. Diese alteingesessene Hennersdorfer Familie scheint bereits im Jahr 1777 in den Pfarrmatriken auf.

Die Familie, die hauptsächlich durch Generationen das Wagnerhandwerk (Wagenbau) ausübte, brachte auch Gemeinderäte, Gastwirte und Schulaufseher hervor.`,
    funFact: "Die Höbels waren Wagner — also Wagenbauer. In einer Zeit vor dem Automobil war das eines der wichtigsten Handwerke im Ort.",
  },
  {
    slug: "keplergasse",
    name: "Keplergasse",
    category: "person",
    shortDesc: "Astronom und Mathematiker",
    namedAfter: "Johannes Kepler (1571–1630)",
    born: "27. Dezember 1571, Weil der Stadt",
    died: "15. November 1630, Regensburg",
    location: "Quergasse zwischen Grillparzerstraße und Pestalozzigasse",
    beschluss: "März 1956",
    body: `Johannes Kepler war ein deutscher Naturphilosoph, Mathematiker, Astronom, Astrologe, Optiker und evangelischer Theologe. 1594 erhielt er mit 23 Jahren einen Lehrauftrag für Mathematik an der evangelischen Stiftsschule in Graz.

1600 wurde er Assistent von Tycho Brahe, 1601 kaiserlicher Hofmathematiker. 1609 veröffentlichte er "Astronomia nova" mit dem ersten und zweiten Keplerschen Gesetz. Im Oktober 1604 beobachtete er eine Supernova, die später "Keplers Stern" genannt wurde. Er entwickelte das dritte Keplersche Gesetz und veröffentlichte es in "Harmonices mundi".

Von 1612 bis 1627 war er Landvermesser in Linz, wo er auch die Kepler'sche Fassregel entwickelte. Ab 1627 war Albrecht von Wallenstein sein neuer Förderer.`,
    funFact: "Keplers Grab in Regensburg ging in den Kriegswirren verloren — sein geistiges Erbe aber prägt die Astronomie bis heute.",
  },
  {
    slug: "kochgasse",
    name: "Kochgasse",
    category: "person",
    shortDesc: "Entdecker des Tuberkulose-Erregers",
    namedAfter: "Robert Koch (1843–1910)",
    born: "11. Dezember 1843, Clausthal",
    died: "27. Mai 1910, Baden-Baden",
    location: "Siedlung ‚Achauer Spitz' am südöstlichen Ortsausgang",
    beschluss: "6. Mai 1983",
    body: `Robert Koch war Arzt und Bakteriologe. 1876 kultivierte er erstmals den Erreger des Milzbrands (Bacillus anthracis) außerhalb des Organismus und beschrieb dessen Lebenszyklus — damit wurde erstmals lückenlos die Rolle eines Krankheitserregers beim Entstehen einer Krankheit beschrieben.

1882 entdeckte er den Erreger der Tuberkulose (Mycobacterium tuberculosis) und entwickelte das Tuberkulin als vermeintliches Heilmittel. Neben seinem Kollegen Louis Pasteur in Paris gilt er als Begründer der modernen Bakteriologie und Mikrobiologie.

1905 erhielt er den Nobelpreis für Physiologie oder Medizin.`,
    funFact: "Koch und Pasteur waren erbitterte Rivalen — ihre Konkurrenz trieb die Mikrobiologie in beispiellosem Tempo voran.",
  },
  {
    slug: "koralevskygasse",
    name: "Koralevskygasse",
    category: "person",
    shortDesc: "Gemeindearzt und Ehrenbürger von Hennersdorf",
    namedAfter: "Dr. Roderich Koralewski (1860–1924)",
    born: "17. September 1860, Krakau, Polen",
    died: "29. Juli 1924, Hennersdorf",
    location: "Quergasse zur Gartengasse",
    beschluss: "23. November 1934",
    body: `Dr. Roderich Koralewski war eine führende Persönlichkeit der niederösterreichischen Ärzteschaft und setzte sich besonders für eine Verbesserung der sozialen Situation der Ärzte ein. Er wohnte ab 1892 in Hennersdorf, zuerst im Haus Hauptstraße 32, später in der Hauptstraße 33, wo er im ersten Stock wohnte und ordinierte.

In Hennersdorf war er von 1894 bis 1919 Mitglied des Gemeindeausschusses, davon die letzten sieben Jahre Vizebürgermeister. Von 1921 bis 1924 war er nochmals Vizebürgermeister als Vertreter der Hennersdorfer Wirtschaftspartei.

Sein Lebenswerk war die Initiierung und Errichtung des Hennersdorfer Kinderheims im Jahr 1905, für das er Spenden sammelte. Die Gasse wurde 1934 nach ihm benannt, nachdem er den ältesten Sohn des Gemeindeverwalters Johann Toyfl während einer schweren Krankheit gesund gepflegt hatte.`,
    funFact: "Koralewski war ein passionierter Radfahrer — ungewöhnlich für einen Arzt seiner Zeit. Er war Ehrenbürger von Hennersdorf seit 1905.",
  },
  {
    slug: "kreutergasse",
    name: "Kreutergasse",
    category: "person",
    shortDesc: "Weitere Informationen in Recherche",
    namedAfter: "Noch nicht dokumentiert",
    location: "Im Ortsgebiet von Hennersdorf",
    body: `Zur Kreutergasse liegen derzeit keine detaillierten historischen Informationen vor. Die Recherche zur Herkunft des Namens ist in Arbeit.`,
  },
  {
    slug: "nestroygasse",
    name: "Nestroygasse",
    category: "person",
    shortDesc: "Schauspieler, Theaterdichter und Satiriker",
    namedAfter: "Johann Nestroy (1801–1862)",
    born: "7. Dezember 1801, Wien",
    died: "25. Mai 1862, Graz",
    location: "Nördlich der Hauptstraße am Ortsende Richtung Leopoldsdorf",
    beschluss: "28. Oktober 1976",
    body: `Johann Nestroy war Schauspieler und Theaterdichter, politischer Satiriker und einer der bedeutendsten österreichischen Bühnenautoren. Nach Abbruch des Jusstudiums debütierte er 1822 am Hoftheater als Sarastro in Mozarts "Zauberflöte". Er entwickelte sich zum gefeierten Komiker in Sprechstücken.

Von 1854 bis 1860 war er Direktor des Carl-Theaters. Zu seinen bekanntesten Werken zählen "Der böse Geist Lumpazivagabundus" (1833), "Der Talisman" (1840), "Das Mädl aus der Vorstadt" (1842), "Einen Jux will er sich machen" (1842), "Der Zerrissene" (1844) und "Freiheit in Krähwinkel" (1848).

Seinen Lebensabend verbrachte er in Graz.`,
    funFact: `\u201EEinen Jux will er sich machen\u201C wurde 1964 von Tom Stoppard als \u201EOn the Razzle\u201C adaptiert und ist bis heute weltweit auf den B\u00FChnen zu sehen.`,
  },
  {
    slug: "neuweilergasse",
    name: "Neuweilergasse",
    category: "ort",
    shortDesc: "Benannt nach der Partnergemeinde in Deutschland",
    namedAfter: "Partnergemeinde Neuweiler (Baden-Württemberg)",
    location: "Quergasse zur Gartengasse östlich der Josef-Postl-Gasse",
    beschluss: "27. August 1985",
    body: `Benannt nach dem Ort Neuweiler im Kreis Böblingen, Bezirk Stuttgart in Baden-Württemberg (Deutschland). Neuweiler ist eine der Partnergemeinden von Hennersdorf. Die Partnerschaft besteht seit dem Jahr 1976.`,
    funFact: "Die Gemeindepartnerschaft zwischen Hennersdorf und Neuweiler besteht seit fast 50 Jahren — ein lebendiges Zeichen europäischer Verbundenheit.",
  },
  {
    slug: "oesterlegasse",
    name: "Österlegasse",
    category: "person",
    shortDesc: "Lehrer, Musiker und Bürgermeister von Hennersdorf",
    namedAfter: "Rudolf Österle (1887–1957)",
    born: "21. April 1887, Baumgarten an der March",
    died: "25. Juli 1957, Hennersdorf",
    location: "Quergasse zur Gartengasse",
    beschluss: "28. Oktober 1976",
    body: `Rudolf Österle war Lehrer, Musiker, Komponist, Organist in der Pfarrkirche und Bürgermeister des Ortes. Ursprünglich sollte er Kellner werden, machte dann aber die Lehrerausbildung. Seit 1913 als Lehrer in Hennersdorf tätig, wurde er im Dezember 1924 zum ersten sozialdemokratischen Bürgermeister des Ortes gewählt. Dieses Amt bekleidete er bis Februar 1934.

In seine Ära fielen die Renovierung des Schulhauses (1927), des Kirchturms (1928), der Ankauf eines Mannschaftswagens und einer Benzinmotorspritze für die Feuerwehr (1930), die Kommassierung und Parzellierung von Baugründen sowie die Errichtung der Triestingtaler Wasserleitung (1933).`,
    funFact: "Österle war nicht nur Bürgermeister, sondern auch Organist in der Pfarrkirche — ein Mann, der Politik und Kultur gleichermaßen prägte.",
  },
  {
    slug: "pestalozzigasse",
    name: "Pestalozzigasse",
    category: "person",
    shortDesc: "Schweizer Pädagoge und Sozialreformer",
    namedAfter: "Johann Heinrich Pestalozzi (1746–1827)",
    born: "12. Jänner 1746, Zürich",
    died: "17. Februar 1827, Brugg",
    location: "Südlich der Hauptstraße, parallel zur Grillparzerstraße",
    beschluss: "März 1956",
    body: `Johann Heinrich Pestalozzi war Schweizer Pädagoge, Erzieher, Philanthrop, Schul- und Sozialreformer, Philosoph und Politiker. Er entwickelte die "Idee der Elementarbildung" — eine naturgemäße Erziehung, die die Kräfte des Kopfes (intellektuelle Kräfte), des Herzens (sittlich-religiöse Kräfte) und der Hand (handwerkliche Kräfte) in Harmonie entfaltet.

Ab 1773/74 nahm er rund 40 Kinder auf seinem Landgut auf. 1800 gründete er das berühmte Erziehungsinstitut im Schloss Burgdorf, das er 1804 nach Yverdon-les-Bains verlegte. Dort entwickelte er seine Methode weiter, bis die Anstalt 1825 geschlossen wurde.

1792 wurde er als einziger Schweizer französischer Ehrenbürger.`,
    funFact: "Pestalozzis Erziehung seines eigenen Sohnes nach Rousseaus Vorbild scheiterte tragisch — seine Pädagogik für andere Kinder wurde jedoch weltberühmt.",
  },
  {
    slug: "postlgasse",
    name: "Josef-Postl-Gasse",
    category: "person",
    shortDesc: "Lehrer, Vizebürgermeister und Bürgermeister",
    namedAfter: "Josef Postl (1917–1967)",
    born: "13. Juni 1917, Breitenfurt bei Freiwaldau",
    died: "15. Juli 1967, Mödling",
    location: "Quergasse zur Gartengasse",
    beschluss: "13. November 1985",
    body: `Josef Postl war Lehrer, Vizebürgermeister und Bürgermeister von Hennersdorf. Von 1963 bis 1967 war er Direktor der Vösendorfer Schule. Unter seiner Ära als Bürgermeister (1958–1967) entstand 1959 die umgebaute Aufbahrungshalle am Friedhof, 1961 wurde das neue Kriegerdenkmal eingeweiht und eine neue Kirchenglocke aufgezogen.

Die 1966/67 neu errichtete Gemeindewohnhausanlage Rothneusiedler Straße 2 wurde nach ihm benannt (Josef-Postl-Hof).`,
    funFact: "Postl war Sudetendeutscher aus Schlesien und fand in Hennersdorf seine neue Heimat — der Josef-Postl-Hof erinnert noch heute an ihn.",
  },
  {
    slug: "raimundgasse",
    name: "Raimundgasse",
    category: "person",
    shortDesc: "Klassiker des österreichischen Volksstücks",
    namedAfter: "Ferdinand Raimund (1790–1836)",
    born: "1. Juni 1790, Wien",
    died: "5. September 1836, Pottenstein",
    location: "Nördlich der Hauptstraße am Ortsende Richtung Leopoldsdorf",
    beschluss: "März 1956",
    body: `Ferdinand Raimund (eigentlich Ferdinand Jakob Raimann) war Dramatiker und Schauspieler, Klassiker des österreichischen Volksstücks. Er begann 1804 als Zuckerbäckerlehrling, wurde dann Schauspieler und debütierte 1814 am Theater in der Josefstadt als Franz Moor. Von 1817 bis 1830 spielte er am Leopoldstädter Theater, wo er 1828–1830 die Direktion übernahm.

Zu seinen bekanntesten Werken zählen "Der Barometermacher auf der Zauberinsel" (1823), "Der Diamant des Geisterkönigs" (1824), "Der Bauer als Millionär" (1826), "Der Alpenkönig und der Menschenfeind" (1828) und "Der Verschwender" (1833).

Am 30. August 1836 beging er aus Angst vor einer Infektion mit Tollwut einen Selbstmordversuch, an dessen Folgen er starb.`,
    funFact: "Raimund begann als Zuckerbäckerlehrling — vom Konditor zum gefeierten Theaterdichter: eine der ungewöhnlichsten Karrieren der Theatergeschichte.",
  },
  {
    slug: "roseggerstrasse",
    name: "Roseggerstraße",
    category: "person",
    shortDesc: "Steirischer Dichter und Journalist",
    namedAfter: "Peter Rosegger (1843–1918)",
    born: "31. Juli 1843, Alpl, Steiermark",
    died: "26. Juni 1918, Krieglach",
    location: "Südlich der Hauptstraße, Verbindung zwischen Hauptstraße und Achauer Straße",
    beschluss: "März 1956",
    body: `Peter Rosegger war ein steirischer Dichter und Journalist. Nach einer Störschneiderlehre (1860–1864) besuchte er als Hospitant die Grazer Akademie für Handel und Industrie. 1869 veröffentlichte er die Mundartgedichte "Zither und Hackbrett".

Von 1880 bis 1894 erschien die erste Gesamtausgabe seiner Werke in 20 Bänden. Die Einnahmen einer Lesung im Bösendorfersaal (1900) stiftete er für die 1902 eröffnete Waldschule in Alpl.

1913 wurde er für den Nobelpreis für Literatur nominiert. Er erhielt Ehrendoktorwürden der Universitäten Heidelberg (1903), Wien (1913) und Graz (1917) sowie das Österreichische Ehrenzeichen für Kunst und Wissenschaft.`,
    funFact: "Rosegger wuchs in bitterer Armut auf einem Bergbauernhof auf — seine Bücher über das einfache Leben machten ihn zum meistgelesenen steirischen Autor aller Zeiten.",
  },
  {
    slug: "rothneusiedlerstrasse",
    name: "Rothneusiedlerstraße",
    category: "ort",
    shortDesc: "Alter Verbindungsweg nach Wien-Rothneusiedl",
    namedAfter: "Richtung Wien-Rothneusiedl",
    location: "Straße in nördlicher Richtung nach Wien-Rothneusiedl",
    body: `Die Rothneusiedlerstraße ist der alte "Rothneusiedler oder Wiener Weg" — eine Straße, die in nördlicher Richtung nach Wien-Rothneusiedl führt. Für die Benennung gibt es keinen Gemeinderatsbeschluss; die Straße dürfte schon immer so genannt worden sein.

Als historischer Verbindungsweg zwischen Hennersdorf und Wien spiegelt sie die enge Verflechtung des Dorfes mit der Großstadt wider.`,
    funFact: "Die Straße heißt seit jeher so — kein Gemeinderatsbeschluss war nötig, weil der Name einfach der Richtung folgt, wie es im ländlichen Raum üblich war.",
  },
  {
    slug: "stiftergasse",
    name: "Stiftergasse",
    category: "person",
    shortDesc: "Bedeutendster Vertreter des Realismus in Österreich",
    namedAfter: "Adalbert Stifter (1805–1868)",
    born: "23. Oktober 1805, Oberplan, Böhmen",
    died: "28. Jänner 1868, Linz",
    location: "Nördlich der Hauptstraße am Ortsende Richtung Leopoldsdorf",
    beschluss: "28. Oktober 1976",
    body: `Adalbert Stifter war Dichter, Zeichner und Maler — der bedeutendste Vertreter des deutschen Realismus in Österreich. Im Herbst 1826 begann er ein Jusstudium in Wien, das er bald abbrach. Seine erste literarische Veröffentlichung war die Erzählung "Der Condor" (1840).

Eines seiner berühmtesten Werke ist die 1845 entstandene Erzählung "Bergkristall", die 1853 seiner Sammlung "Bunte Steine" hinzugefügt wurde. Weitere Hauptwerke sind "Der Nachsommer" (1857) und "Witiko" (1865–1867).

Als Maler beteiligte er sich 1839 mit Gemälden an einer Akademie-Ausstellung, darunter "Blick auf Wiener Vorstadthäuser" und "Blick in die Beatrixgasse".`,
    funFact: "Stifter beobachtete die totale Sonnenfinsternis vom 8. Juli 1842 vom Dach des Wiener Kornhäuselturms — seine Schilderung dieses Erlebnisses gilt als literarisches Meisterwerk.",
  },
  {
    slug: "teichfeldgasse",
    name: "Teichfeldgasse",
    category: "flurname",
    shortDesc: "Benannt nach dem historischen Flurnamen",
    namedAfter: "Flurname ‚Teichfeld'",
    location: "Südlich der Hauptstraße, Verbindung zwischen Achauer Straße und Friedhof",
    beschluss: "28. Oktober 1976",
    body: `Die Teichfeldgasse ist ein ehemaliger Feldweg, benannt nach dem alten Flurnamen "Teichfeld". Der Name verweist auf die historische Teichlandschaft in diesem Gebiet, die einst das Ortsbild Hennersdorfs prägte.

In der Teichfeldgasse steht auch die historische Mariensäule, die 1674 von den Mühlbesitzern Jakob und Magdalena Schendaler errichtet wurde — Hennersdorfs ältestes Denkmal.`,
    funFact: "Im Teichfeld befand sich einst eine ausgedehnte Teichlandschaft — heute erinnert nur noch der Straßenname an dieses verschwundene Landschaftsbild.",
  },
  {
    slug: "waggerlgasse",
    name: "Karl-Heinrich-Waggerl-Gasse",
    category: "person",
    shortDesc: "Einer der meistgelesenen österreichischen Autoren",
    namedAfter: "Karl Heinrich Waggerl (1897–1973)",
    born: "10. Dezember 1897, Bad Gastein",
    died: "4. November 1973, Schwarzach im Pongau",
    location: "Nördlich der Hauptstraße am Ortsende Richtung Leopoldsdorf",
    beschluss: "6. Mai 1983",
    body: `Karl Heinrich Waggerl war ein Salzburger Erzähler und Schriftsteller. Mit 5 Millionen verkauften Büchern und Übersetzungen in mehr als ein Dutzend Sprachen zählt er zu den meistgelesenen deutschsprachigen Autoren des 20. Jahrhunderts.

Nach dem Lehrerseminar in Salzburg meldete er sich 1916 freiwillig zum Ersten Weltkrieg, geriet in Kriegsgefangenschaft in Italien und erkrankte an Tuberkulose. Von 1920 bis 1923 war er Dorfschullehrer in Wagrain.

Sein erster Roman "Brot" (1930) machte ihn bekannt. Seine Weihnachtsgeschichten "Und es begab sich" mit den berühmten Legenden "Worüber das Christkind lächeln musste" und "Warum der schwarze König Melchior so froh wurde" gehören zu den beliebtesten deutschsprachigen Weihnachtserzählungen.`,
    funFact: "Waggerl war 1940/41 kurzzeitig Bürgermeister von Wagrain — seine Weihnachtsgeschichten aber machten ihn unsterblich.",
  },
  {
    slug: "wasserturmweg",
    name: "Wasserturmweg",
    category: "ort",
    shortDesc: "Benannt nach dem nahegelegenen Wasserturm",
    namedAfter: "Der Wasserturm im Wohnpark",
    location: "Kleines Gässchen im Wohnpark",
    body: `Dieses kleine Gässchen im Wohnpark wurde ohne formelle Beschlussfassung in den 1990er-Jahren nach dem in der Nähe befindlichen Wasserturm benannt. Der Turm diente durch Speicherung von Trink- oder Brauchwasser in einem Hochbehälter der Wasserversorgung des ehemaligen Anwesens.

Der Wasserturm ist eines der wenigen noch erhaltenen baulichen Zeugnisse aus der Zeit, als das Areal ein weitläufiger Park mit Villa, Kegelbahn und Tennisplatz war — im Besitz der Generaldirektoren des nahen Ziegelwerks.`,
    funFact: "Der Wasserturm ist ein stummes Zeugnis der Ziegelindustrie-Ära: Er versorgte einst die Villa der Wienerberger-Direktoren mit Wasser.",
  },
  {
    slug: "wildgansgasse",
    name: "Wildgansgasse",
    category: "person",
    shortDesc: "Schriftsteller und Burgtheater-Direktor",
    namedAfter: "Anton Wildgans (1881–1932)",
    born: "17. April 1881, Wien",
    died: "3. Mai 1932, Mödling",
    location: "Nördlich der Hauptstraße am Ortsende Richtung Leopoldsdorf",
    beschluss: "17. Dezember 1996",
    body: `Anton Wildgans war Schriftsteller und Dichter, dessen Entwicklung vom Naturalismus über den Symbolismus bis zum Expressionismus ging. Seine Lyrik, anfangs unter dem Einfluss von Rilke und Hofmannsthal, erfuhr bald durch realistische Naturnähe, Anmut und Musikalität eine persönliche Prägung.

Nach dem Jusstudium (Dr. jur. 1908) war er kurz Gerichtspraktikant, dann freier Schriftsteller. 1921/22 und 1930/31 war er Direktor des Burgtheaters.

Zu seinen bekanntesten Werken zählen die Dramen "In Ewigkeit Amen" (1913), "Armut" (1914), "Liebe" (1916), das Hexameterepos "Kirbisch" (1927), die autobiographische Prosa "Musik der Kindheit" (1928) und die berühmte "Rede über Österreich" (1929).`,
    funFact: `Der \u201EAnton Wildgans Preis der \u00D6sterreichischen Industrie\u201C wird seit 1962 verliehen \u2014 eine der wichtigsten literarischen Auszeichnungen \u00D6sterreichs.`,
  },
  {
    slug: "wiesmayergasse",
    name: "Wiesmayergasse",
    category: "person",
    shortDesc: "Bürgermeister während des Ersten Weltkriegs",
    namedAfter: "Johann Wiesmayer (1871–1942)",
    born: "13. September 1871, Wien-Oberlaa",
    died: "22. Juni 1942, Hennersdorf",
    location: "Quergasse zur Gartengasse",
    beschluss: "6. Mai 1983",
    body: `Johann Wiesmayer war Bürgermeister von Hennersdorf von September 1912 bis Dezember 1924. Er erbte das Haus von seinen Eltern auf der Hauptstraße 33, wo bis 1924 auch der Gemeindearzt Dr. Roderich Koralewski im ersten Stock wohnte und ordinierte.

In die Ära Wiesmayers fiel der Erste Weltkrieg. 1912/13 konnten die Felder drainagiert werden, 1916 gab es das erste öffentliche Telefon im Postamt, und 1919/20 wurde elektrischer Strom im Ort eingeleitet. Wiesmayer war der letzte christlich-soziale Bürgermeister von Hennersdorf — im Februar 1919 zogen erstmals Anhänger der sozialdemokratischen Partei in den Gemeindeausschuss ein.`,
    funFact: "Unter Wiesmayer bekam Hennersdorf 1919/20 elektrischen Strom — ein Meilenstein, der den Ort in die Moderne führte.",
  },
  {
    slug: "zehentnergasse",
    name: "Zehentnergasse",
    category: "familie",
    shortDesc: "Alteingesessene Hennersdorfer Familie seit 1690",
    namedAfter: "Familie Zehentner",
    location: "Verbindungsgasse zwischen Hauptstraße und Bachgasse",
    beschluss: "28. Oktober 1976",
    body: `Ursprünglich in "Josef-Zehentner-Gasse" benannt, heute nur mehr "Zehentnergasse" nach einer alteingesessenen Hennersdorfer Familie, die sich bereits seit dem Jahr 1690 im Ort nachweisen lässt.

Die Zehentners scheinen auf als Hausbesitzer, Gemeinderäte, Bäcker, Gastwirte und Ziegelmeister. Simon Zehentner wird im Taufbuch der Pfarre Hennersdorf als "Zieglermeister" erwähnt — möglicherweise ein Hinweis auf eine ältere Ziegelproduktionsstätte, die noch vor der modernen Ziegelindustrie in Hennersdorf bestand.`,
    funFact: "Die Zehentners sind seit über 330 Jahren in Hennersdorf nachweisbar — eine der ältesten dokumentierten Familien des Ortes.",
  },
];

export const CATEGORY_LABELS: Record<Street["category"], string> = {
  person: "Nach Persönlichkeiten",
  ort: "Nach Orten",
  familie: "Nach Familien",
  flurname: "Nach Flurnamen",
};
