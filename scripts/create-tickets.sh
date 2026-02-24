#!/bin/bash
# Create all project tickets for Kulturverein Hennersdorf
# Run with: bash scripts/create-tickets.sh

API="http://localhost:3000/api/tickets"

# Epic IDs (from seed)
WEB_EPIC="ee26655e-372e-47be-86da-2f0be4425423"
CMS_EPIC="01775c52-a88b-45ad-9913-0cae21d45022"
MTH_EPIC="fba135b4-6818-4dc6-9407-6a9a3c50a82e"
KAS_EPIC="087190f8-c49a-4ae9-bbac-6f0639dc2328"
EVT_EPIC="d4a001f7-3060-408f-90ca-68fe1e419469"
DRF_EPIC="08c30fb7-9f77-4c44-ad85-1f99a304d282"
SCH_EPIC="b14ca556-dc56-481f-b870-eb46e6ff3ec5"
TEA_EPIC="d6fb6194-39b5-4a5a-ab69-7a4800e72c12"
SPO_EPIC="1c9119a7-cfe2-434a-9519-2da6b5403318"

# Existing ticket IDs to link to parents
WEB002="74f45ea4-bb0f-4d01-8a9b-6dca8c0b9a51"
WEB003="af32c5f2-bfc3-4b3f-be5c-7a969b280581"
WEB004="e661a07b-8f07-47d7-b099-cfa6c3bd8cb0"
WEB005="bedbccc0-fa98-4baf-a0fc-96c4a07236ea"
WEB006="64fa2e2d-3989-42c7-b1a5-87e0dad5645d"
CMS002="f6dc6897-31ab-4467-8d2e-019349ff512f"
CMS003="d19e7e08-87da-4ce5-b2a8-f25d32cbad77"
CMS004="e7b62ded-e530-4bc7-ac06-073e42856408"
CMS005="df9bbe65-a5d4-4ad7-81b2-fbd5a1125002"
CMS006="45f75699-8bb3-4320-8ffe-2ad3f62b0a5b"
INF001="b68566d8-43a2-48ba-be9b-fc48c576bf23"
INF002="6eaac9a1-0dd4-42e9-b758-0dbbba8f5df7"

echo "=== Linking existing tickets to parent epics ==="

# Link WEB tickets to WEB epic
for ID in $WEB002 $WEB003 $WEB004 $WEB005 $WEB006; do
  curl -s -X PATCH "$API/$ID" -H 'Content-Type: application/json' \
    -d "{\"parent_id\": \"$WEB_EPIC\", \"_actor\": \"stephan\"}" > /dev/null
done
echo "  Linked WEB-002..006 -> WEB-001"

# Link CMS tickets to CMS epic
for ID in $CMS002 $CMS003 $CMS004 $CMS005 $CMS006; do
  curl -s -X PATCH "$API/$ID" -H 'Content-Type: application/json' \
    -d "{\"parent_id\": \"$CMS_EPIC\", \"_actor\": \"stephan\"}" > /dev/null
done
echo "  Linked CMS-002..006 -> CMS-001"

echo ""
echo "=== Creating new tickets ==="

create() {
  local result=$(curl -s -X POST "$API" -H 'Content-Type: application/json' -d "$1")
  local num=$(echo "$result" | python3 -c "import json,sys; print(json.load(sys.stdin)['ticket_number'])" 2>/dev/null)
  local title=$(echo "$result" | python3 -c "import json,sys; print(json.load(sys.stdin)['title'])" 2>/dev/null)
  echo "  $num $title"
  echo "$result" | python3 -c "import json,sys; print(json.load(sys.stdin)['id'])" 2>/dev/null
}

# ============================================================
# WEBSITE & DESIGN - subtasks under WEB-001
# ============================================================
echo ""
echo "--- Website & Design subtasks ---"

create '{
  "title": "Farbschema & Typografie definieren",
  "description": "Visuelles Konzept: Farben, Schriften, Abstände. Anlehnung an bestehendes Martha Theater Branding möglich. Soll warm, einladend und dörflich-modern wirken.",
  "system_category": "Website & Design",
  "priority": "high",
  "ticket_type": "subtask",
  "status": "todo",
  "assignee": "claude",
  "parent_id": "'"$WEB_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Tailwind theme with custom colors defined", "Font selection (Google Fonts or local)", "Consistent spacing scale", "Dark/light considerations"],
  "file_scope": ["src/app/globals.css", "tailwind.config.*"],
  "tech_stack": ["Tailwind CSS"],
  "agent_instructions": "1. Research warm, cultural association color palettes\n2. Define primary, secondary, accent colors in Tailwind config\n3. Choose readable serif+sans-serif font pairing\n4. Update globals.css with CSS variables"
}'

create '{
  "title": "Responsive Layout Grid & Container Setup",
  "description": "Basis-Layout: max-width Container, responsive Breakpoints, Section-Spacing für alle Seiten.",
  "system_category": "Website & Design",
  "priority": "high",
  "ticket_type": "subtask",
  "status": "backlog",
  "assignee": "claude",
  "parent_id": "'"$WEB_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Container component with consistent max-width", "Responsive breakpoints work on all screen sizes", "Section spacing is consistent"],
  "file_scope": ["src/components/layout/**"],
  "tech_stack": ["Tailwind CSS", "React"]
}'

create '{
  "title": "SEO & Meta Tags Setup",
  "description": "OpenGraph tags, Twitter cards, favicon, structured data (JSON-LD) für lokalen Verein. Deutsche Sprache als Standard.",
  "system_category": "Website & Design",
  "priority": "medium",
  "ticket_type": "subtask",
  "status": "backlog",
  "assignee": "claude",
  "parent_id": "'"$WEB_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["OpenGraph meta tags on all pages", "Favicon set", "JSON-LD for local organization", "lang=de set"],
  "file_scope": ["src/app/layout.tsx", "public/**"],
  "tech_stack": ["Next.js", "TypeScript"]
}'

create '{
  "title": "Bildoptimierung & Media Pipeline",
  "description": "Next.js Image component konfigurieren, Bildgrößen für responsive, WebP/AVIF Formate. Platzhalter für Lazy Loading.",
  "system_category": "Website & Design",
  "priority": "medium",
  "ticket_type": "subtask",
  "status": "backlog",
  "assignee": "claude",
  "parent_id": "'"$WEB_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["next/image configured with proper sizes", "Lazy loading with blur placeholders", "Responsive image srcsets"],
  "tech_stack": ["Next.js"]
}'

# ============================================================
# MARTHA THEATER - subtasks under MTH-001
# ============================================================
echo ""
echo "--- Martha Theater subtasks ---"

create '{
  "title": "Martha Theater - Aktuelle Produktion Seite",
  "description": "Hauptseite für die aktuelle Produktion mit Titel, Beschreibung, Plakat, Terminen, Cast, Regisseur. 2025: \"Bauerin sucht...\" von Irene Presoly.",
  "system_category": "Martha Theater",
  "priority": "high",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$MTH_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Current production hero with poster image", "Show dates and times", "Cast list", "Director credit", "Ticket info (phone: 0660 436 7566)"],
  "tech_stack": ["TypeScript", "React", "Tailwind CSS", "Sanity"]
}'

create '{
  "title": "Martha Theater - Produktionsarchiv",
  "description": "Archiv aller bisherigen Produktionen seit 1994. Jahresweise sortiert, mit Titel und optionalem Foto/Plakat. Bekannte Produktionen: 2024 Das (perfekte) Desaster Dinner, 2024 Heinz Erhardt, 2023 Verliebt verlobt und wie verhext, etc.",
  "system_category": "Martha Theater",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$MTH_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Timeline or grid of past productions", "Year, title, optional image per entry", "Sorted newest first", "CMS-editable"],
  "tech_stack": ["TypeScript", "React", "Sanity"]
}'

create '{
  "title": "Martha Theater - Geschichte",
  "description": "Geschichte des Martha Theaters: Gründung 1994 im Heurigen Schrank, Namensgebung 2014 nach Martha Eichberger (Oberstudienrätin, 1996-2010 auf der Bühne, gestorben mit 93). Regisseur Alfred Ocenasek, Umzug ins Kulturzentrum 9er-Haus.",
  "system_category": "Martha Theater",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$MTH_EPIC"'",
  "output_type": "content",
  "acceptance_criteria": ["History text with key dates", "Photo of Martha Eichberger if available", "Timeline format", "CMS-editable"]
}'

create '{
  "title": "Martha Theater - Fotogalerie",
  "description": "Fotogalerie für Aufführungsbilder. Lightbox-Ansicht, nach Produktion/Jahr gruppierbar.",
  "system_category": "Martha Theater",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$MTH_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Image gallery with lightbox", "Groupable by production/year", "CMS-managed images", "Responsive grid"],
  "tech_stack": ["TypeScript", "React", "Tailwind CSS"]
}'

# ============================================================
# KASPERLTHEATER - subtasks under KAS-001
# ============================================================
echo ""
echo "--- Kasperltheater subtasks ---"

create '{
  "title": "Kasperltheater - Übersichtsseite",
  "description": "Info-Seite über das Kasperltheater: 2 Puppenspieler, 4 Sprecher, ca. 120 Besucher. Kinderfreundliches Design. Regie: Susanne Missauer. Nächste Vorstellung 2026 geplant.",
  "system_category": "Kasperltheater",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$KAS_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Overview with description of the puppet theater", "Next show info", "Child-friendly visual design", "Photo from past shows"],
  "tech_stack": ["TypeScript", "React", "Tailwind CSS"]
}'

create '{
  "title": "Kasperltheater - Vergangene Vorstellungen",
  "description": "Archiv der Kasperltheater-Shows: Nov 2025 Prinzessin und der Drache + Fluch der Meerjungfrau.",
  "system_category": "Kasperltheater",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$KAS_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Past shows listed with date and title", "CMS-editable"]
}'

# ============================================================
# EVENTS - subtasks under EVT-001
# ============================================================
echo ""
echo "--- Events subtasks ---"

create '{
  "title": "Events - Kommende Veranstaltungen Ansicht",
  "description": "Liste/Karten der nächsten Veranstaltungen. Datum, Uhrzeit, Ort (Kulturzentrum 9er-Haus), kurze Beschreibung, Link zur Detailseite.",
  "system_category": "Events & Veranstaltungen",
  "priority": "high",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$EVT_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Upcoming events sorted by date", "Date, time, location, description", "Link to detail page", "CMS-editable", "Empty state when no upcoming events"],
  "tech_stack": ["TypeScript", "React", "Sanity"]
}'

create '{
  "title": "Events - Veranstaltungsarchiv",
  "description": "Vergangene Events nach Jahr gruppiert. Filterbar nach Kategorie (Theater, Kasperltheater, Kultursommer, Sonstig).",
  "system_category": "Events & Veranstaltungen",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$EVT_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Past events grouped by year", "Filter by category", "Responsive layout"],
  "tech_stack": ["TypeScript", "React", "Sanity"]
}'

create '{
  "title": "Events - Einzelveranstaltungs-Detailseite",
  "description": "Detailseite pro Event: Titel, Datum, Beschreibung, Bilder, Ort, Karten-Info.",
  "system_category": "Events & Veranstaltungen",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$EVT_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Event detail page with all info", "Image gallery", "Back link to events list", "Dynamic route /events/[slug]"],
  "tech_stack": ["TypeScript", "React", "Sanity", "Next.js"]
}'

# ============================================================
# DORFERNEUERUNG - subtasks under DRF-001
# ============================================================
echo ""
echo "--- Dorferneuerung subtasks ---"

create '{
  "title": "Dorferneuerung - Projekt-Übersichtsseite",
  "description": "Hauptseite für das Dorferneuerungs-Projekt: Was ist es, Ziele, aktueller Stand, wie kann man mitmachen.",
  "system_category": "Dorferneuerung",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$DRF_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Project overview with goals", "Current status/progress", "How to participate", "CMS-editable"]
}'

create '{
  "title": "Dorferneuerung - Meilensteine & Fortschritt",
  "description": "Timeline oder Fortschrittsanzeige der Dorferneuerung mit Meilensteinen, Fotos, Beschreibungen.",
  "system_category": "Dorferneuerung",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$DRF_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Timeline of milestones", "Photos per milestone", "Progress indicator", "CMS-editable"]
}'

# ============================================================
# SCHULPROJEKT - subtasks under SCH-001
# ============================================================
echo ""
echo "--- Schulprojekt subtasks ---"

create '{
  "title": "Schulprojekt - Programm & Info-Seite",
  "description": "Beschreibung des Schulprojekts mit Kindern: Was wird gemacht, Altersgruppe, Termine, Ansprechpartner.",
  "system_category": "Schulprojekt",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$SCH_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Program description", "Age group info", "Schedule/dates", "Contact person", "CMS-editable"]
}'

create '{
  "title": "Schulprojekt - Fotogalerie & Eindrücke",
  "description": "Fotos und Berichte von vergangenen Schulprojekt-Aktivitäten. Elternfreundlich gestaltet.",
  "system_category": "Schulprojekt",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$SCH_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Photo gallery", "Short descriptions per activity", "Parent-friendly design"]
}'

# ============================================================
# TEAM & ORGANISATION - subtasks under TEA-001
# ============================================================
echo ""
echo "--- Team subtasks ---"

create '{
  "title": "Team - Mitglieder-Seite",
  "description": "Team-Seite mit Foto, Name, Rolle für alle Vereinsmitglieder. Obmann: Manfred Holzbach. Regisseurin Kasperltheater: Susanne Missauer.",
  "system_category": "Team & Organisation",
  "priority": "high",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$TEA_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Grid/list of team members", "Photo, name, role per person", "CMS-editable", "Responsive layout"],
  "tech_stack": ["TypeScript", "React", "Sanity"]
}'

create '{
  "title": "Über den Verein - Geschichte & Mission",
  "description": "Vereinsgeschichte: Gemeinnütziger Hennersdorfer Kulturverein, gegründet als Theatergruppe 1994, Obmann Manfred Holzbach. Sitz: Josef Postl Gasse 19, A-2332 Hennersdorf bei Wien. Spielstätte: Kulturzentrum 9er-Haus, Bachgasse 9.",
  "system_category": "Team & Organisation",
  "priority": "high",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$TEA_EPIC"'",
  "output_type": "content",
  "acceptance_criteria": ["Association history with key dates", "Mission statement", "Venue description with address", "CMS-editable rich text"]
}'

create '{
  "title": "Vereinsinfo - Bankverbindung & Mitgliedschaft",
  "description": "Raiffeisenbank Mödling, IBAN: AT11 3225 0000 0030 1663. Infos zur Mitgliedschaft und Unterstützung.",
  "system_category": "Team & Organisation",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$TEA_EPIC"'",
  "output_type": "content",
  "acceptance_criteria": ["Bank details displayed", "Membership info", "How to support the association"]
}'

# ============================================================
# SPONSOREN - subtasks under SPO-001
# ============================================================
echo ""
echo "--- Sponsoren subtasks ---"

create '{
  "title": "Sponsoren - Logo-Grid & Tiers",
  "description": "Sponsoren-Seite: Logos in verschiedenen Größen je nach Tier (Hauptsponsor groß, Partner mittel, Unterstützer klein). Hauptsponsor: Raiffeisenbank Mödling. Alle mit Link zur Sponsor-Website.",
  "system_category": "Sponsoren & Partner",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$SPO_EPIC"'",
  "output_type": "code",
  "acceptance_criteria": ["Logo grid with different sizes per tier", "Links to sponsor websites", "CMS-editable", "Responsive layout"],
  "tech_stack": ["TypeScript", "React", "Sanity"]
}'

create '{
  "title": "Sponsoring-Info Seite",
  "description": "Seite für potentielle Sponsoren: Was bieten wir (Reichweite, Events, Logo-Platzierung), Kontakt für Sponsoring-Anfragen.",
  "system_category": "Sponsoren & Partner",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "parent_id": "'"$SPO_EPIC"'",
  "output_type": "content",
  "acceptance_criteria": ["Sponsoring benefits described", "Contact info for inquiries", "CMS-editable"]
}'

# ============================================================
# INFRASTRUCTURE - additional tickets
# ============================================================
echo ""
echo "--- Infrastructure tickets ---"

create '{
  "title": "Analytics Setup (Datenschutzkonform)",
  "description": "Privacy-konformes Analytics. Martha Theater nutzt Matomo (self-hosted). Plausible.io oder Matomo Cloud als Alternative.",
  "system_category": "Infrastructure",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "acceptance_criteria": ["Analytics tracking installed", "GDPR/DSGVO compliant", "No cookie banner needed (cookieless mode)", "Basic pageview + referrer data"],
  "tech_stack": ["Next.js"]
}'

create '{
  "title": "E-Mail Setup für Kontaktformular",
  "description": "E-Mail-Versand für Kontaktformular. Resend, Postmark oder ähnlich. Einfach und zuverlässig.",
  "system_category": "Infrastructure",
  "priority": "low",
  "ticket_type": "ticket",
  "status": "backlog",
  "acceptance_criteria": ["Contact form emails delivered reliably", "Spam protection (honeypot or simple captcha)", "Confirmation to sender"]
}'

# ============================================================
# CMS - additional content migration tickets
# ============================================================
echo ""
echo "--- Content migration tickets ---"

create '{
  "title": "Content: Martha Theater Produktionsdaten erfassen",
  "description": "Alle bisherigen Produktionen seit 2011 (oder weiter zurück) aus martha-theater.at übernehmen. Titel, Jahr, optionale Fotos/Plakate.",
  "system_category": "CMS & Content",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "output_type": "data",
  "acceptance_criteria": ["All productions from martha-theater.at captured", "Year, title, description per production", "Poster images where available"]
}'

create '{
  "title": "Content: Fotos sammeln und aufbereiten",
  "description": "Bestehende Fotos von martha-theater.at und anderen Quellen sammeln, in richtige Größen bringen, Metadaten (Produktion, Jahr) zuordnen.",
  "system_category": "CMS & Content",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "output_type": "data",
  "acceptance_criteria": ["Photos collected from existing sources", "Resized for web (max 2000px, WebP)", "Metadata assigned (production, year, credit)"]
}'

create '{
  "title": "Content: Texte für Über Uns schreiben",
  "description": "Vereinsgeschichte, Mission, Team-Beschreibungen auf Deutsch verfassen. Warm, einladend, persönlich.",
  "system_category": "CMS & Content",
  "priority": "medium",
  "ticket_type": "ticket",
  "status": "backlog",
  "output_type": "content",
  "acceptance_criteria": ["About text written in German", "History section covers 1994-present", "Tone is warm and inviting", "Proofread"]
}'

echo ""
echo "=== Done! ==="
echo ""
curl -s http://localhost:3000/api/tickets/stats | python3 -c "
import json,sys
s = json.load(sys.stdin)
o = s['overall']
print(f'Total: {o[\"total\"]} tickets ({o[\"epics\"]} epics, {o[\"tickets\"]} tickets, {o[\"subtasks\"]} subtasks)')
print(f'Backlog: {o[\"backlog\"]} | Todo: {o[\"todo\"]} | Planning: {o[\"planning\"]} | In Progress: {o[\"in_progress\"]} | Review: {o[\"review\"]} | Done: {o[\"done\"]}')
print()
print('By category:')
for c in s['byCategory']:
    print(f'  {c[\"system_category\"]}: {c[\"total\"]} ({c[\"todo\"]} todo, {c[\"backlog\"]} backlog)')
"
