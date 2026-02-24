/**
 * Seed script for Kulturverein Hennersdorf ticketing system.
 * Run with: npx tsx scripts/seed.ts
 */

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.chdir(path.join(__dirname, ".."));

import { getDb } from "../src/lib/db";
import { createTicket } from "../src/lib/tickets";

// Ensure DB is initialized
getDb();

const tickets = [
  // ============================================================
  // EPICS
  // ============================================================
  {
    title: "Website Grundstruktur & Design",
    description:
      "Grundlegende Seitenstruktur, Navigation, Layout und visuelles Design für die Kulturverein Hennersdorf Website erstellen. Responsive Design, Barrierefreiheit, Performance.",
    system_category: "Website & Design",
    priority: "critical",
    ticket_type: "epic",
    status: "todo",
    assignee: "claude",
    acceptance_criteria: [
      "Responsive layout works on mobile, tablet, desktop",
      "Navigation to all main sections",
      "Consistent visual identity across pages",
      "Lighthouse performance score > 90",
      "Accessibility score > 90",
    ],
    tech_stack: ["TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    title: "CMS Integration",
    description:
      "CMS auswählen und integrieren. Sanity.io empfohlen (kostenloser Plan, beste Editor-Erfahrung, kein Server nötig). Alternativ: Keystatic (Git-basiert, kostenlos).",
    system_category: "CMS & Content",
    priority: "critical",
    ticket_type: "epic",
    status: "todo",
    assignee: "claude",
    acceptance_criteria: [
      "CMS is set up and accessible for editors",
      "Content schemas defined for all content types",
      "WYSIWYG editing works for non-technical users",
      "Content changes reflect on website",
      "At least 3 editor accounts possible",
    ],
    tech_stack: ["TypeScript", "Sanity", "GROQ"],
  },
  {
    title: "Martha Theater Integration",
    description:
      "Martha Theater Bereich der Website: Aktuelle Produktion, Archiv vergangener Aufführungen, Cast/Team, Karten-Info. Link zu martha-theater.at. Das Martha-Theater ist seit 1994 aktiv, benannt nach Martha Eichberger (2014).",
    system_category: "Martha Theater",
    priority: "high",
    ticket_type: "epic",
    status: "backlog",
    acceptance_criteria: [
      "Current production displayed prominently",
      "Archive of past productions with year and title",
      "Link to martha-theater.at",
      "Photo gallery for productions",
      "Ticket/contact info visible",
    ],
  },
  {
    title: "Kasperltheater Sektion",
    description:
      "Eigener Bereich für das Kasperltheater-Programm. Familienfreundlich, mit Info zu kommenden Vorstellungen. Das Kasperltheater zieht ca. 120 Besucher pro Vorstellung (2 Puppenspieler, 4 Sprecher).",
    system_category: "Kasperltheater",
    priority: "medium",
    ticket_type: "epic",
    status: "backlog",
    acceptance_criteria: [
      "Upcoming shows displayed",
      "Past shows in archive",
      "Family-friendly design",
      "Photo gallery",
    ],
  },
  {
    title: "Events & Veranstaltungen System",
    description:
      "Vergangene und zukünftige Events anzeigen. Kultursommer, Theateraufführungen, Kasperltheater, Sonderveranstaltungen. Kalenderansicht oder Timeline.",
    system_category: "Events & Veranstaltungen",
    priority: "high",
    ticket_type: "epic",
    status: "backlog",
    acceptance_criteria: [
      "Upcoming events displayed with date, time, location",
      "Past events in archive",
      "Events filterable by type/year",
      "CMS-editable by non-technical users",
    ],
  },
  {
    title: "Dorferneuerung Projekt-Seite",
    description:
      "Bereich für das Dorferneuerungs-Projekt in Hennersdorf. Fortschritt, Meilensteine, Fotos, Beteiligungsmöglichkeiten.",
    system_category: "Dorferneuerung",
    priority: "medium",
    ticket_type: "epic",
    status: "backlog",
    acceptance_criteria: [
      "Project overview page",
      "Progress/milestones display",
      "Photo gallery",
      "Contact for participation",
    ],
  },
  {
    title: "Schulprojekt Sektion",
    description:
      "Bereich für das Schulprojekt mit Kindern. Infos zum Programm, Fotos, Anmeldemöglichkeit.",
    system_category: "Schulprojekt",
    priority: "medium",
    ticket_type: "epic",
    status: "backlog",
    acceptance_criteria: [
      "Project description page",
      "Photo gallery",
      "Registration or contact info",
      "Parent-friendly information",
    ],
  },
  {
    title: "Team & Über Uns Seiten",
    description:
      "Vereinsvorstellung, Team-Mitglieder mit Fotos und Rollen. Obmann: Manfred Holzbach. Geschichte des Vereins seit 1994. Standort: Kulturzentrum 9er-Haus, Bachgasse 9, 2332 Hennersdorf.",
    system_category: "Team & Organisation",
    priority: "high",
    ticket_type: "epic",
    status: "backlog",
    acceptance_criteria: [
      "Team members with photo, name, role",
      "Association history section",
      "Venue info (9er-Haus)",
      "CMS-editable",
    ],
  },
  {
    title: "Sponsoren & Partner Seite",
    description:
      "Sponsoren mit Logo und Link darstellen. Hauptsponsor: Raiffeisenbank Mödling. Weitere Partner einbinden.",
    system_category: "Sponsoren & Partner",
    priority: "medium",
    ticket_type: "epic",
    status: "backlog",
    acceptance_criteria: [
      "Sponsor logos displayed with links",
      "Different tiers possible (Hauptsponsor, Partner)",
      "CMS-editable",
    ],
  },

  // ============================================================
  // INFRASTRUCTURE TICKETS
  // ============================================================
  {
    title: "Deployment Pipeline einrichten",
    description:
      "Vercel deployment setup. GitHub repo, automatic deploys on push, preview deployments for PRs.",
    system_category: "Infrastructure",
    priority: "high",
    ticket_type: "ticket",
    status: "todo",
    assignee: "stephan",
    acceptance_criteria: [
      "GitHub repo created and linked to Vercel",
      "Auto-deploy on push to main",
      "Preview deployments work",
    ],
    tech_stack: ["Vercel", "GitHub"],
  },
  {
    title: "Domain & DNS konfigurieren",
    description:
      "Domain für kulturverein-hennersdorf.at (oder ähnlich) registrieren und DNS bei Vercel einrichten.",
    system_category: "Infrastructure",
    priority: "medium",
    ticket_type: "ticket",
    status: "backlog",
    assignee: "stephan",
    acceptance_criteria: [
      "Domain registered",
      "DNS pointing to Vercel",
      "SSL certificate active",
    ],
  },

  // ============================================================
  // WEBSITE DESIGN TICKETS
  // ============================================================
  {
    title: "Navigation & Header Komponente",
    description:
      "Responsive Navigation mit Logo, Menü-Links zu allen Hauptbereichen. Mobile Hamburger-Menü.",
    system_category: "Website & Design",
    priority: "high",
    ticket_type: "ticket",
    status: "todo",
    assignee: "claude",
    output_type: "code",
    acceptance_criteria: [
      "Desktop: horizontal nav with all main links",
      "Mobile: hamburger menu with slide-out",
      "Active state on current page",
      "Logo links to home",
    ],
    file_scope: ["src/components/layout/**"],
    tech_stack: ["TypeScript", "React", "Tailwind CSS"],
    agent_instructions:
      "1. Create src/components/layout/header.tsx\n2. Create src/components/layout/nav.tsx\n3. Add to app layout\n4. Test responsive behavior",
  },
  {
    title: "Footer Komponente",
    description:
      "Footer mit Kontakt-Info, Social Links, Impressum-Link, Datenschutz-Link. Adresse: Josef Postl Gasse 19, A-2332 Hennersdorf bei Wien.",
    system_category: "Website & Design",
    priority: "medium",
    ticket_type: "ticket",
    status: "backlog",
    assignee: "claude",
    output_type: "code",
    acceptance_criteria: [
      "Contact information displayed",
      "Links to Impressum and Datenschutz",
      "Responsive layout",
    ],
    file_scope: ["src/components/layout/**"],
    tech_stack: ["TypeScript", "React", "Tailwind CSS"],
  },
  {
    title: "Homepage Design & Layout",
    description:
      "Landing page: Hero-Bereich mit aktuellem Highlight, Quick-Links zu allen Projekten, nächste Veranstaltungen.",
    system_category: "Website & Design",
    priority: "high",
    ticket_type: "ticket",
    status: "backlog",
    assignee: "claude",
    output_type: "code",
    acceptance_criteria: [
      "Hero section with current highlight",
      "Quick-link cards to all projects",
      "Upcoming events section",
      "Responsive and visually appealing",
    ],
    tech_stack: ["TypeScript", "React", "Tailwind CSS"],
  },
  {
    title: "Kontakt-Seite mit Formular",
    description:
      "Kontaktseite mit Adresse, Telefon (0660 436 7566), E-Mail, und einfachem Kontaktformular.",
    system_category: "Website & Design",
    priority: "low",
    ticket_type: "ticket",
    status: "backlog",
    acceptance_criteria: [
      "Contact info displayed clearly",
      "Simple contact form",
      "Form submissions handled (email or webhook)",
    ],
  },
  {
    title: "Impressum & Datenschutz Seiten",
    description:
      "Rechtlich erforderliche Seiten: Impressum (Vereinsinfo, ZVR-Nummer) und Datenschutzerklärung.",
    system_category: "Website & Design",
    priority: "medium",
    ticket_type: "ticket",
    status: "backlog",
    acceptance_criteria: [
      "Impressum page with legal info",
      "Privacy policy page",
      "Accessible from footer",
    ],
  },

  // ============================================================
  // CMS TICKETS
  // ============================================================
  {
    title: "Sanity Studio Setup",
    description:
      "Sanity.io Projekt erstellen, Studio konfigurieren, Grundschemas definieren. Free tier: 3 User, 500K req/mo.",
    system_category: "CMS & Content",
    priority: "high",
    ticket_type: "ticket",
    status: "todo",
    assignee: "claude",
    output_type: "config",
    acceptance_criteria: [
      "Sanity project created",
      "Studio accessible at /studio or separate URL",
      "Base schemas defined (page, event, team member, sponsor)",
      "At least one content entry can be created",
    ],
    tech_stack: ["TypeScript", "Sanity", "GROQ"],
    agent_instructions:
      "1. Create Sanity project\n2. Define initial schemas\n3. Configure Studio\n4. Test content creation",
  },
  {
    title: "Content Schema: Veranstaltungen (Events)",
    description:
      "Schema für Veranstaltungen: Titel, Datum, Uhrzeit, Ort, Beschreibung, Bilder, Kategorie (Theater, Kasperltheater, Kultursommer, Sonstig).",
    system_category: "CMS & Content",
    priority: "high",
    ticket_type: "ticket",
    status: "backlog",
    output_type: "schema",
    acceptance_criteria: [
      "Event schema with all required fields",
      "Date/time fields work correctly",
      "Category selection available",
      "Image upload works",
    ],
    tech_stack: ["TypeScript", "Sanity"],
  },
  {
    title: "Content Schema: Team-Mitglieder",
    description:
      "Schema für Team-Mitglieder: Name, Rolle, Foto, Bio (optional), Sortierung.",
    system_category: "CMS & Content",
    priority: "medium",
    ticket_type: "ticket",
    status: "backlog",
    output_type: "schema",
    acceptance_criteria: [
      "Team member schema defined",
      "Photo upload works",
      "Sort order configurable",
    ],
    tech_stack: ["TypeScript", "Sanity"],
  },
  {
    title: "Content Schema: Sponsoren",
    description:
      "Schema für Sponsoren: Name, Logo, Website-URL, Tier (Hauptsponsor/Partner/Unterstützer).",
    system_category: "CMS & Content",
    priority: "medium",
    ticket_type: "ticket",
    status: "backlog",
    output_type: "schema",
    acceptance_criteria: [
      "Sponsor schema with name, logo, URL, tier",
      "Logo upload works",
      "Tier selection works",
    ],
    tech_stack: ["TypeScript", "Sanity"],
  },
  {
    title: "Content Schema: Projekte",
    description:
      "Schema für Projekte (Martha Theater, Kasperltheater, Dorferneuerung, Schulprojekt): Titel, Beschreibung, Bilder, Status, zugehörige Events.",
    system_category: "CMS & Content",
    priority: "medium",
    ticket_type: "ticket",
    status: "backlog",
    output_type: "schema",
    acceptance_criteria: [
      "Project schema defined",
      "Can link to events",
      "Image gallery support",
      "Rich text description with WYSIWYG",
    ],
    tech_stack: ["TypeScript", "Sanity"],
  },
];

console.log("Seeding tickets...\n");

for (const ticketData of tickets) {
  const ticket = createTicket(ticketData);
  console.log(
    `  ${ticket.ticket_number} [${ticket.status}] ${ticket.title}`
  );
}

console.log(`\nDone! Created ${tickets.length} tickets.`);
