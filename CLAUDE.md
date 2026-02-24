# Kulturverein Hennersdorf - Website Project

## Project Overview
Website for the Gemeinnütziger Hennersdorfer Kulturverein (non-profit cultural association in Hennersdorf bei Wien). The site serves as a meta-platform for all cultural activities in Hennersdorf, including Martha Theater, Kasperltheater, school projects, village renewal (Dorferneuerung), events, and more.

## Tech Stack
- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript (strict)
- **Data:** JSON file storage (`data/tickets.json`)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **CMS:** Sanity.io v3 (embedded studio at `/studio`)
- **Fonts:** Quicksand (headings) + Roboto (body)
- **Brand colors:** Green #1A7E34, Red #C11525, Mint #CBE1D1

## Project Structure
```
src/
  app/
    (site)/                    # Public website (shared header/footer layout)
      page.tsx                 # Homepage
      martha-theater/          # Martha Theater section
      kasperltheater/          # Kasperltheater section
      events/                  # Veranstaltungen
      dorferneuerung/          # Dorferneuerung
      schulprojekt/            # Schulprojekt
      team/                    # Team page
      sponsoren/               # Sponsoren & Partner
    studio/[[...tool]]/        # Embedded Sanity Studio
    tickets/                   # Project dashboard (list, board, detail)
    api/tickets/               # Ticket REST API
  components/
    layout/                    # Site header, footer
    tickets/                   # Ticket UI components
    ui/                        # shadcn/ui base components
  sanity/
    schemaTypes/               # Content schemas (Page, Event, TeamMember, Sponsor, Project)
    lib/                       # Client, image helper, GROQ queries
    env.ts                     # Environment variables
  types/tickets.ts             # Ticket types, enums, constants
  lib/db.ts                    # JSON file store
  lib/tickets.ts               # Ticket CRUD, queries, smart queue
data/
  tickets.json                 # Ticket data store
sanity.config.ts               # Sanity Studio config
sanity.cli.ts                  # Sanity CLI config
```

## Key Conventions
- All ticket data goes through `src/lib/tickets.ts`
- Data stored as plain JSON (no database)
- Ticket numbers auto-generated from category prefix (e.g., WEB-001, MTH-002)
- Agent workflow: backlog -> todo -> planning -> in_progress -> review -> done
- Agents never set tickets to "done" - only humans do
- Soft-delete only (is_archived flag), nothing hard-deleted
- History auto-logged for tracked field changes
- UI language: German (Austrian)
- Light theme: white backgrounds, subtle shadows, green brand accents

## Categories
Website & Design (WEB), Martha Theater (MTH), Kasperltheater (KAS), Events & Veranstaltungen (EVT), Dorferneuerung (DRF), Schulprojekt (SCH), Team & Organisation (TEA), Sponsoren & Partner (SPO), CMS & Content (CMS), Infrastructure (INF)

## CMS Setup (Sanity)
- Schemas: Page, Event, TeamMember, Sponsor, Project, BlockContent
- Studio at `/studio` (needs NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local)
- All labels in German for non-technical editors
- GROQ queries in `src/sanity/lib/queries.ts`

## Running
```bash
npm run dev    # Start dev server
```

## Do Not Touch
- CLAUDE.md
- .env / .env.local
