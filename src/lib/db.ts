import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Use /tmp on Vercel (only writable dir in serverless), local data/ dir otherwise
const isVercel = process.env.VERCEL === "1";
const DB_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "tickets.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    // Ensure directory exists
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initializeDatabase(_db);
  }
  return _db;
}

function initializeDatabase(db: Database.Database) {
  db.exec(`
    -- ============================================================
    -- TICKETS TABLE
    -- ============================================================
    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      ticket_number TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'backlog'
        CHECK (status IN ('backlog', 'todo', 'planning', 'in_progress', 'review', 'done', 'cancelled')),
      priority TEXT NOT NULL DEFAULT 'medium'
        CHECK (priority IN ('critical', 'high', 'medium', 'low', 'none')),
      ticket_type TEXT NOT NULL DEFAULT 'ticket'
        CHECK (ticket_type IN ('epic', 'ticket', 'subtask')),
      parent_id TEXT REFERENCES tickets(id) ON DELETE SET NULL,
      system_category TEXT NOT NULL,
      assignee TEXT,
      estimate REAL,
      due_date TEXT,
      tech_stack TEXT DEFAULT '[]',
      db_tables TEXT DEFAULT '[]',
      depends_on_systems TEXT DEFAULT '[]',
      api_endpoints TEXT DEFAULT '[]',
      ui_components TEXT DEFAULT '[]',
      implementation_checklist TEXT DEFAULT '[]',
      acceptance_criteria TEXT DEFAULT '[]',
      context_refs TEXT DEFAULT '[]',
      file_scope TEXT DEFAULT '[]',
      do_not_touch TEXT DEFAULT '[]',
      output_type TEXT
        CHECK (output_type IS NULL OR output_type IN ('code', 'migration', 'schema', 'config', 'design_doc', 'data', 'content')),
      agent_instructions TEXT,
      plan_text TEXT,
      handoff_summary TEXT,
      token_budget INTEGER,
      tokens_used INTEGER NOT NULL DEFAULT 0,
      token_budget_exceeded INTEGER NOT NULL DEFAULT 0,
      metadata TEXT DEFAULT '{}',
      is_archived INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ============================================================
    -- TICKET COMMENTS TABLE
    -- ============================================================
    CREATE TABLE IF NOT EXISTS ticket_comments (
      id TEXT PRIMARY KEY,
      ticket_id TEXT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'system',
      comment_type TEXT NOT NULL DEFAULT 'comment'
        CHECK (comment_type IN ('comment', 'discussion', 'idea', 'question')),
      is_deleted INTEGER NOT NULL DEFAULT 0,
      parent_comment_id TEXT REFERENCES ticket_comments(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ============================================================
    -- TICKET HISTORY TABLE
    -- ============================================================
    CREATE TABLE IF NOT EXISTS ticket_history (
      id TEXT PRIMARY KEY,
      ticket_id TEXT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      action TEXT NOT NULL DEFAULT 'update',
      field TEXT,
      old_value TEXT,
      new_value TEXT,
      actor TEXT NOT NULL DEFAULT 'system',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- ============================================================
    -- TICKET DEPENDENCIES TABLE
    -- ============================================================
    CREATE TABLE IF NOT EXISTS ticket_dependencies (
      id TEXT PRIMARY KEY,
      blocker_id TEXT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      blocked_id TEXT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE (blocker_id, blocked_id),
      CHECK (blocker_id <> blocked_id)
    );

    -- ============================================================
    -- INDEXES
    -- ============================================================
    CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
    CREATE INDEX IF NOT EXISTS idx_tickets_assignee ON tickets(assignee);
    CREATE INDEX IF NOT EXISTS idx_tickets_system_category ON tickets(system_category);
    CREATE INDEX IF NOT EXISTS idx_tickets_parent_id ON tickets(parent_id);
    CREATE INDEX IF NOT EXISTS idx_tickets_ticket_number ON tickets(ticket_number);
    CREATE INDEX IF NOT EXISTS idx_tickets_is_archived ON tickets(is_archived);
    CREATE INDEX IF NOT EXISTS idx_comments_ticket_id ON ticket_comments(ticket_id);
    CREATE INDEX IF NOT EXISTS idx_history_ticket_id ON ticket_history(ticket_id);
    CREATE INDEX IF NOT EXISTS idx_deps_blocker ON ticket_dependencies(blocker_id);
    CREATE INDEX IF NOT EXISTS idx_deps_blocked ON ticket_dependencies(blocked_id);
  `);
}
