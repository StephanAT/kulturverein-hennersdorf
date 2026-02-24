import { v4 as uuidv4 } from "uuid";
import { getDb } from "./db";
import {
  Ticket,
  TicketOverview,
  TicketComment,
  TicketHistory,
  TicketDependency,
  TicketStatsOverall,
  TicketStatsByCategory,
  PRIORITY_WEIGHT,
  CATEGORY_SHORT,
  computeReadinessScore,
} from "@/types/tickets";

// --- Tracked fields for auto-diff history ---
const TRACKED_FIELDS = [
  "status",
  "priority",
  "assignee",
  "ticket_type",
  "system_category",
  "output_type",
  "plan_text",
  "handoff_summary",
  "token_budget",
] as const;

// JSON array fields that need parse/stringify
const JSON_FIELDS = [
  "tech_stack",
  "db_tables",
  "depends_on_systems",
  "api_endpoints",
  "ui_components",
  "implementation_checklist",
  "acceptance_criteria",
  "context_refs",
  "file_scope",
  "do_not_touch",
  "metadata",
] as const;

function parseRow(row: Record<string, unknown>): Record<string, unknown> {
  if (!row) return row;
  const parsed = { ...row };
  for (const field of JSON_FIELDS) {
    if (typeof parsed[field] === "string") {
      try {
        parsed[field] = JSON.parse(parsed[field] as string);
      } catch {
        // keep as-is
      }
    }
  }
  // Convert SQLite integers to booleans
  parsed.is_archived = Boolean(parsed.is_archived);
  parsed.token_budget_exceeded = Boolean(parsed.token_budget_exceeded);
  return parsed;
}

function stringifyJsonFields(
  data: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...data };
  for (const field of JSON_FIELDS) {
    if (field in result && Array.isArray(result[field])) {
      result[field] = JSON.stringify(result[field]);
    } else if (
      field in result &&
      typeof result[field] === "object" &&
      result[field] !== null
    ) {
      result[field] = JSON.stringify(result[field]);
    }
  }
  // Convert booleans to SQLite integers
  if ("is_archived" in result)
    result.is_archived = result.is_archived ? 1 : 0;
  if ("token_budget_exceeded" in result)
    result.token_budget_exceeded = result.token_budget_exceeded ? 1 : 0;
  return result;
}

function generateTicketNumber(category: string): string {
  const db = getDb();
  const prefix = CATEGORY_SHORT[category] || "TKT";

  const row = db
    .prepare(
      `SELECT MAX(CAST(SUBSTR(ticket_number, INSTR(ticket_number, '-') + 1) AS INTEGER)) as max_seq
     FROM tickets WHERE ticket_number LIKE ? || '-%'`
    )
    .get(prefix) as { max_seq: number | null } | undefined;

  const seq = (row?.max_seq ?? 0) + 1;
  return `${prefix}-${String(seq).padStart(3, "0")}`;
}

// ============================================================
// TICKET OVERVIEW QUERY (with computed fields)
// ============================================================

function ticketOverviewQuery(where: string = "", params: unknown[] = []) {
  const db = getDb();
  const sql = `
    SELECT t.*,
      COALESCE((SELECT COUNT(*) FROM tickets c WHERE c.parent_id = t.id), 0) AS child_count,
      COALESCE((SELECT COUNT(*) FROM tickets c WHERE c.parent_id = t.id AND c.status = 'done'), 0) AS children_done,
      COALESCE((SELECT COUNT(*) FROM ticket_dependencies d WHERE d.blocked_id = t.id), 0) AS blocked_by_count,
      COALESCE((SELECT COUNT(*) FROM ticket_dependencies d WHERE d.blocker_id = t.id), 0) AS blocks_count
    FROM tickets t
    ${where ? `WHERE ${where}` : ""}
    ORDER BY t.created_at DESC
  `;
  return db.prepare(sql).all(...params).map((row) => parseRow(row as Record<string, unknown>)) as unknown as TicketOverview[];
}

// ============================================================
// QUERIES
// ============================================================

export function getTickets(filters?: {
  status?: string;
  priority?: string;
  type?: string;
  category?: string;
  assignee?: string;
  parent_id?: string;
  top_level?: boolean;
  search?: string;
}): TicketOverview[] {
  const conditions: string[] = ["t.is_archived = 0"];
  const params: unknown[] = [];

  if (filters?.status) {
    const statuses = filters.status.split(",");
    conditions.push(
      `t.status IN (${statuses.map(() => "?").join(",")})`
    );
    params.push(...statuses);
  }
  if (filters?.priority) {
    conditions.push("t.priority = ?");
    params.push(filters.priority);
  }
  if (filters?.type) {
    conditions.push("t.ticket_type = ?");
    params.push(filters.type);
  }
  if (filters?.category) {
    conditions.push("t.system_category = ?");
    params.push(filters.category);
  }
  if (filters?.assignee) {
    conditions.push("t.assignee = ?");
    params.push(filters.assignee);
  }
  if (filters?.parent_id) {
    conditions.push("t.parent_id = ?");
    params.push(filters.parent_id);
  }
  if (filters?.top_level) {
    conditions.push("t.parent_id IS NULL");
  }
  if (filters?.search) {
    conditions.push("t.title LIKE ?");
    params.push(`%${filters.search}%`);
  }

  return ticketOverviewQuery(conditions.join(" AND "), params);
}

export function getTicketById(id: string): TicketOverview | null {
  const results = ticketOverviewQuery("t.id = ?", [id]);
  return results[0] ?? null;
}

export function getTicketBrief(filters?: {
  status?: string;
  assignee?: string;
  category?: string;
}): Partial<TicketOverview>[] {
  const db = getDb();
  const conditions: string[] = ["t.is_archived = 0"];
  const params: unknown[] = [];

  if (filters?.status) {
    const statuses = filters.status.split(",");
    conditions.push(
      `t.status IN (${statuses.map(() => "?").join(",")})`
    );
    params.push(...statuses);
  }
  if (filters?.assignee) {
    conditions.push("t.assignee = ?");
    params.push(filters.assignee);
  }
  if (filters?.category) {
    conditions.push("t.system_category = ?");
    params.push(filters.category);
  }

  const sql = `
    SELECT t.id, t.ticket_number, t.title, t.status, t.priority, t.ticket_type,
           t.system_category, t.assignee, t.output_type, t.token_budget, t.tokens_used,
           COALESCE((SELECT COUNT(*) FROM ticket_dependencies d WHERE d.blocked_id = t.id), 0) AS blocked_by_count,
           COALESCE((SELECT COUNT(*) FROM tickets c WHERE c.parent_id = t.id), 0) AS child_count,
           COALESCE((SELECT COUNT(*) FROM tickets c WHERE c.parent_id = t.id AND c.status = 'done'), 0) AS children_done
    FROM tickets t
    WHERE ${conditions.join(" AND ")}
    ORDER BY t.created_at DESC
  `;

  return db.prepare(sql).all(...params) as Partial<TicketOverview>[];
}

// ============================================================
// MUTATIONS
// ============================================================

export function createTicket(ticket: Partial<Ticket>): Ticket {
  const db = getDb();
  const id = uuidv4();
  const ticketNumber = generateTicketNumber(
    ticket.system_category || "Infrastructure"
  );

  const data = stringifyJsonFields({
    id,
    ticket_number: ticketNumber,
    title: ticket.title || "",
    description: ticket.description ?? null,
    status: ticket.status || "backlog",
    priority: ticket.priority || "medium",
    ticket_type: ticket.ticket_type || "ticket",
    parent_id: ticket.parent_id ?? null,
    system_category: ticket.system_category || "Infrastructure",
    assignee: ticket.assignee ?? null,
    estimate: ticket.estimate ?? null,
    due_date: ticket.due_date ?? null,
    tech_stack: ticket.tech_stack ?? [],
    db_tables: ticket.db_tables ?? [],
    depends_on_systems: ticket.depends_on_systems ?? [],
    api_endpoints: ticket.api_endpoints ?? [],
    ui_components: ticket.ui_components ?? [],
    implementation_checklist: ticket.implementation_checklist ?? [],
    acceptance_criteria: ticket.acceptance_criteria ?? [],
    context_refs: ticket.context_refs ?? [],
    file_scope: ticket.file_scope ?? [],
    do_not_touch: ticket.do_not_touch ?? [],
    output_type: ticket.output_type ?? null,
    agent_instructions: ticket.agent_instructions ?? null,
    plan_text: ticket.plan_text ?? null,
    handoff_summary: ticket.handoff_summary ?? null,
    token_budget: ticket.token_budget ?? null,
    tokens_used: ticket.tokens_used ?? 0,
    token_budget_exceeded: ticket.token_budget_exceeded ?? false,
    metadata: ticket.metadata ?? {},
    is_archived: ticket.is_archived ?? false,
  });

  const columns = Object.keys(data);
  const placeholders = columns.map(() => "?").join(", ");
  const values = columns.map((c) => data[c]);

  db.prepare(
    `INSERT INTO tickets (${columns.join(", ")}) VALUES (${placeholders})`
  ).run(...values);

  return parseRow(
    db.prepare("SELECT * FROM tickets WHERE id = ?").get(id) as Record<
      string,
      unknown
    >
  ) as unknown as Ticket;
}

export function updateTicket(
  id: string,
  updates: Partial<Ticket> & { _actor?: string }
): Ticket {
  const db = getDb();
  const actor = updates._actor || "system";
  const cleanUpdates = { ...updates };
  delete (cleanUpdates as Record<string, unknown>)._actor;

  // Fetch current for diff
  const current = parseRow(
    db.prepare("SELECT * FROM tickets WHERE id = ?").get(id) as Record<
      string,
      unknown
    >
  );
  if (!current) throw new Error("Ticket not found");

  // Auto-diff tracked fields
  const historyEntries: {
    id: string;
    ticket_id: string;
    action: string;
    field: string;
    old_value: string | null;
    new_value: string | null;
    actor: string;
  }[] = [];

  for (const field of TRACKED_FIELDS) {
    if (field in cleanUpdates) {
      const oldVal = current[field];
      const newVal = (cleanUpdates as Record<string, unknown>)[field];
      if (String(oldVal) !== String(newVal)) {
        historyEntries.push({
          id: uuidv4(),
          ticket_id: id,
          action: "update",
          field,
          old_value: oldVal != null ? String(oldVal) : null,
          new_value: newVal != null ? String(newVal) : null,
          actor,
        });
      }
    }
  }

  // Build update
  const stringified = stringifyJsonFields(
    cleanUpdates as Record<string, unknown>
  );
  const setClauses: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(stringified)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  setClauses.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(
    `UPDATE tickets SET ${setClauses.join(", ")} WHERE id = ?`
  ).run(...values);

  // Insert history entries
  if (historyEntries.length > 0) {
    const insertHistory = db.prepare(
      `INSERT INTO ticket_history (id, ticket_id, action, field, old_value, new_value, actor)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    for (const entry of historyEntries) {
      insertHistory.run(
        entry.id,
        entry.ticket_id,
        entry.action,
        entry.field,
        entry.old_value,
        entry.new_value,
        entry.actor
      );
    }
  }

  return parseRow(
    db.prepare("SELECT * FROM tickets WHERE id = ?").get(id) as Record<
      string,
      unknown
    >
  ) as unknown as Ticket;
}

export function archiveTicket(id: string): void {
  const db = getDb();
  db.prepare(
    "UPDATE tickets SET is_archived = 1, updated_at = datetime('now') WHERE id = ?"
  ).run(id);
}

// ============================================================
// COMMENTS
// ============================================================

export function getComments(ticketId: string): TicketComment[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM ticket_comments WHERE ticket_id = ? ORDER BY created_at ASC"
    )
    .all(ticketId)
    .map((row) => ({
      ...(row as Record<string, unknown>),
      is_deleted: Boolean((row as Record<string, unknown>).is_deleted),
    })) as unknown as TicketComment[];
}

export function addComment(
  comment: Partial<TicketComment>
): TicketComment {
  const db = getDb();
  const id = uuidv4();

  db.prepare(
    `INSERT INTO ticket_comments (id, ticket_id, content, author, comment_type, parent_comment_id)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    comment.ticket_id,
    comment.content,
    comment.author || "system",
    comment.comment_type || "comment",
    comment.parent_comment_id ?? null
  );

  const row = db
    .prepare("SELECT * FROM ticket_comments WHERE id = ?")
    .get(id) as Record<string, unknown>;

  return {
    ...row,
    is_deleted: Boolean(row.is_deleted),
  } as unknown as TicketComment;
}

// ============================================================
// TOKENS
// ============================================================

export function reportTokenUsage(
  id: string,
  tokensUsed: number
): {
  tokens_used: number;
  token_budget: number | null;
  token_budget_exceeded: boolean;
} {
  const db = getDb();
  const current = db
    .prepare(
      "SELECT tokens_used, token_budget, token_budget_exceeded FROM tickets WHERE id = ?"
    )
    .get(id) as {
    tokens_used: number;
    token_budget: number | null;
    token_budget_exceeded: number;
  };

  const newTotal = (current.tokens_used || 0) + tokensUsed;
  const exceeded = current.token_budget
    ? newTotal > current.token_budget
      ? 1
      : 0
    : 0;

  db.prepare(
    "UPDATE tickets SET tokens_used = ?, token_budget_exceeded = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(newTotal, exceeded, id);

  return {
    tokens_used: newTotal,
    token_budget: current.token_budget,
    token_budget_exceeded: Boolean(exceeded),
  };
}

export function setTokenBudget(
  id: string,
  budget: number
): {
  token_budget: number;
  tokens_used: number;
  token_budget_exceeded: boolean;
} {
  const db = getDb();
  const current = db
    .prepare("SELECT tokens_used FROM tickets WHERE id = ?")
    .get(id) as { tokens_used: number };

  const exceeded = current.tokens_used > budget ? 1 : 0;

  db.prepare(
    "UPDATE tickets SET token_budget = ?, token_budget_exceeded = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(budget, exceeded, id);

  return {
    token_budget: budget,
    tokens_used: current.tokens_used,
    token_budget_exceeded: Boolean(exceeded),
  };
}

// ============================================================
// CHECKLIST
// ============================================================

export function toggleChecklistItem(
  id: string,
  index: number,
  done: boolean
): Ticket {
  const db = getDb();
  const current = db
    .prepare("SELECT implementation_checklist FROM tickets WHERE id = ?")
    .get(id) as { implementation_checklist: string };

  const checklist = JSON.parse(current.implementation_checklist || "[]");
  if (index >= 0 && index < checklist.length) {
    checklist[index] = { ...checklist[index], done };
  }

  db.prepare(
    "UPDATE tickets SET implementation_checklist = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(JSON.stringify(checklist), id);

  return parseRow(
    db.prepare("SELECT * FROM tickets WHERE id = ?").get(id) as Record<
      string,
      unknown
    >
  ) as unknown as Ticket;
}

// ============================================================
// RELATED / CROSS-POLLINATION
// ============================================================

export function getRelatedTickets(id: string): Partial<TicketOverview>[] {
  const source = getTicketById(id);
  if (!source) return [];

  const db = getDb();
  const candidates = db
    .prepare(
      `SELECT id, ticket_number, title, status, system_category, assignee,
              depends_on_systems, db_tables
       FROM tickets
       WHERE is_archived = 0
         AND status IN ('todo', 'planning', 'in_progress', 'review')
         AND id != ?`
    )
    .all(id)
    .map((row) => parseRow(row as Record<string, unknown>));

  const scored = candidates
    .map((c) => {
      let score = 0;
      if (c.system_category === source.system_category) score += 3;

      const cDbTables = (c.db_tables as string[]) ?? [];
      const sDbTables = source.db_tables ?? [];
      for (const t of cDbTables) {
        if (sDbTables.includes(t)) score += 2;
      }

      const cSystems = (c.depends_on_systems as string[]) ?? [];
      const sSystems = source.depends_on_systems ?? [];
      for (const s of cSystems) {
        if (sSystems.includes(s)) score += 1;
      }
      if (cSystems.includes(source.system_category)) score += 1;

      return { ...c, _score: score };
    })
    .filter((c) => (c._score as number) > 0)
    .sort((a, b) => (b._score as number) - (a._score as number))
    .slice(0, 10);

  return scored.map(({ _score, ...rest }) => rest) as Partial<TicketOverview>[];
}

// ============================================================
// HISTORY
// ============================================================

export function getHistory(ticketId: string): TicketHistory[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM ticket_history WHERE ticket_id = ? ORDER BY created_at DESC"
    )
    .all(ticketId) as TicketHistory[];
}

// ============================================================
// DEPENDENCIES
// ============================================================

export function getDependencies(
  ticketId: string,
  direction: "blocked_by" | "blocks"
): (TicketDependency & { ticket: TicketOverview })[] {
  const db = getDb();
  const column = direction === "blocked_by" ? "blocked_id" : "blocker_id";

  const deps = db
    .prepare(
      `SELECT * FROM ticket_dependencies WHERE ${column} = ?`
    )
    .all(ticketId) as TicketDependency[];

  const results: (TicketDependency & { ticket: TicketOverview })[] = [];
  for (const dep of deps) {
    const relatedId =
      direction === "blocked_by" ? dep.blocker_id : dep.blocked_id;
    const ticket = getTicketById(relatedId);
    if (ticket) {
      results.push({ ...dep, ticket });
    }
  }

  return results;
}

// ============================================================
// SMART QUEUE
// ============================================================

export function getNextTicket(assignee: string): TicketOverview | null {
  const candidates = ticketOverviewQuery(
    "t.assignee = ? AND t.status = 'todo' AND t.is_archived = 0",
    [assignee]
  ).filter((t) => t.blocked_by_count === 0);

  if (candidates.length === 0) return null;

  let best: TicketOverview | null = null;
  let bestScore = -1;

  for (const ticket of candidates) {
    const readiness = computeReadinessScore(ticket);
    const priorityWeight =
      PRIORITY_WEIGHT[ticket.priority] ?? PRIORITY_WEIGHT.medium;
    const readinessBonus = readiness >= 70 ? readiness : readiness * 0.3;
    const score = priorityWeight + readinessBonus;

    if (score > bestScore) {
      bestScore = score;
      best = ticket;
    }
  }

  return best;
}

// ============================================================
// STATS
// ============================================================

export function getStats(): {
  overall: TicketStatsOverall;
  byCategory: TicketStatsByCategory[];
} {
  const db = getDb();

  const overall = db
    .prepare(
      `SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'backlog') as backlog,
        COUNT(*) FILTER (WHERE status = 'todo') as todo,
        COUNT(*) FILTER (WHERE status = 'planning') as planning,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'review') as review,
        COUNT(*) FILTER (WHERE status = 'done') as done,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled,
        COUNT(*) FILTER (WHERE ticket_type = 'epic') as epics,
        COUNT(*) FILTER (WHERE ticket_type = 'ticket') as tickets,
        COUNT(*) FILTER (WHERE ticket_type = 'subtask') as subtasks
      FROM tickets WHERE is_archived = 0`
    )
    .get() as TicketStatsOverall;

  const byCategory = db
    .prepare(
      `SELECT
        system_category,
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'backlog') as backlog,
        COUNT(*) FILTER (WHERE status = 'todo') as todo,
        COUNT(*) FILTER (WHERE status = 'planning') as planning,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'review') as review,
        COUNT(*) FILTER (WHERE status = 'done') as done,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled
      FROM tickets
      WHERE is_archived = 0
      GROUP BY system_category
      ORDER BY system_category`
    )
    .all() as TicketStatsByCategory[];

  return { overall, byCategory };
}
