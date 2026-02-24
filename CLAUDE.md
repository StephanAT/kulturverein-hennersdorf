# Kulturverein Hennersdorf - Website Project

## Project Overview
Website for the Gemeinnütziger Hennersdorfer Kulturverein (non-profit cultural association in Hennersdorf bei Wien). The site serves as a meta-platform for all cultural activities in Hennersdorf, including Martha Theater, Kasperltheater, school projects, village renewal (Dorferneuerung), events, and more.

## Tech Stack
- **Framework:** Next.js (App Router, Server Components)
- **Language:** TypeScript (strict)
- **Database:** SQLite via better-sqlite3 (file: `data/tickets.db`)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **CMS:** TBD (Sanity.io recommended)

## Project Structure
```
src/
  types/tickets.ts          # All ticket types, enums, constants, scoring
  lib/db.ts                 # SQLite database setup and connection
  lib/tickets.ts            # All ticket CRUD, queries, smart queue, stats
  app/api/tickets/           # REST API routes
  app/tickets/               # Dashboard pages (list, board, detail)
  components/tickets/        # Ticket UI components
  components/ui/             # shadcn/ui base components
data/
  tickets.db                # SQLite database (auto-created, gitignored)
```

## Key Conventions
- All ticket data goes through `src/lib/tickets.ts`
- JSON array fields are stored as JSON strings in SQLite, parsed on read
- Ticket numbers auto-generated from category prefix (e.g., WEB-001, MTH-002)
- Agent workflow: backlog -> todo -> planning -> in_progress -> review -> done
- Agents never set tickets to "done" - only humans do
- Soft-delete only (is_archived flag), nothing hard-deleted
- History auto-logged for tracked field changes

## Categories
Website & Design (WEB), Martha Theater (MTH), Kasperltheater (KAS), Events & Veranstaltungen (EVT), Dorferneuerung (DRF), Schulprojekt (SCH), Team & Organisation (TEA), Sponsoren & Partner (SPO), CMS & Content (CMS), Infrastructure (INF)

## Running
```bash
npm run dev    # Start dev server
```

## Do Not Touch
- CLAUDE.md
- .env / .env.local
