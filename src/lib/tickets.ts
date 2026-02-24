import { v4 as uuidv4 } from "uuid";
import { loadData, saveData } from "./db";
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

function now() {
  return new Date().toISOString();
}

function generateTicketNumber(category: string): string {
  const data = loadData();
  const prefix = CATEGORY_SHORT[category] || "TKT";
  const existing = data.tickets
    .filter((t) => ((t.ticket_number as string) || "").startsWith(prefix + "-"))
    .map((t) => {
      const num = (t.ticket_number as string).split("-")[1];
      return parseInt(num, 10) || 0;
    });
  const seq = existing.length > 0 ? Math.max(...existing) + 1 : 1;
  return `${prefix}-${String(seq).padStart(3, "0")}`;
}

function withOverview(ticket: Record<string, unknown>): TicketOverview {
  const data = loadData();
  const id = ticket.id as string;
  const children = data.tickets.filter((t) => t.parent_id === id);
  const childrenDone = children.filter((t) => t.status === "done");
  const blockedBy = data.dependencies.filter((d) => d.blocked_id === id);
  const blocks = data.dependencies.filter((d) => d.blocker_id === id);

  return {
    ...(ticket as unknown as Ticket),
    child_count: children.length,
    children_done: childrenDone.length,
    blocked_by_count: blockedBy.length,
    blocks_count: blocks.length,
  };
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
  const data = loadData();
  let results = data.tickets.filter((t) => !t.is_archived);

  if (filters?.status) {
    const statuses = filters.status.split(",");
    results = results.filter((t) => statuses.includes(t.status as string));
  }
  if (filters?.priority) results = results.filter((t) => t.priority === filters.priority);
  if (filters?.type) results = results.filter((t) => t.ticket_type === filters.type);
  if (filters?.category) results = results.filter((t) => t.system_category === filters.category);
  if (filters?.assignee) results = results.filter((t) => t.assignee === filters.assignee);
  if (filters?.parent_id) results = results.filter((t) => t.parent_id === filters.parent_id);
  if (filters?.top_level) results = results.filter((t) => !t.parent_id);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter((t) => ((t.title as string) || "").toLowerCase().includes(q));
  }

  results.sort((a, b) => ((b.created_at as string) || "").localeCompare((a.created_at as string) || ""));
  return results.map(withOverview);
}

export function getTicketById(id: string): TicketOverview | null {
  const data = loadData();
  const ticket = data.tickets.find((t) => t.id === id);
  if (!ticket) return null;
  return withOverview(ticket);
}

export function getTicketBrief(filters?: {
  status?: string;
  assignee?: string;
  category?: string;
}): Partial<TicketOverview>[] {
  const all = getTickets(filters);
  return all.map((t) => ({
    id: t.id,
    ticket_number: t.ticket_number,
    title: t.title,
    status: t.status,
    priority: t.priority,
    ticket_type: t.ticket_type,
    system_category: t.system_category,
    assignee: t.assignee,
    output_type: t.output_type,
    blocked_by_count: t.blocked_by_count,
    child_count: t.child_count,
    children_done: t.children_done,
    token_budget: t.token_budget,
    tokens_used: t.tokens_used,
  }));
}

// ============================================================
// MUTATIONS
// ============================================================

export function createTicket(ticket: Partial<Ticket>): Ticket {
  const data = loadData();
  const id = uuidv4();
  const category = ticket.system_category || "Infrastructure";
  const ticketNumber = generateTicketNumber(category);
  const timestamp = now();

  const newTicket: Record<string, unknown> = {
    id,
    ticket_number: ticketNumber,
    title: ticket.title || "",
    description: ticket.description ?? null,
    status: ticket.status || "backlog",
    priority: ticket.priority || "medium",
    ticket_type: ticket.ticket_type || "ticket",
    parent_id: ticket.parent_id ?? null,
    system_category: category,
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
    is_archived: false,
    created_at: timestamp,
    updated_at: timestamp,
  };

  data.tickets.push(newTicket);
  saveData(data);
  return newTicket as unknown as Ticket;
}

export function updateTicket(
  id: string,
  updates: Partial<Ticket> & { _actor?: string }
): Ticket {
  const data = loadData();
  const idx = data.tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");

  const actor = updates._actor || "system";
  const cleanUpdates = { ...updates };
  delete (cleanUpdates as Record<string, unknown>)._actor;

  const current = data.tickets[idx];

  // Auto-diff tracked fields
  for (const field of TRACKED_FIELDS) {
    if (field in cleanUpdates) {
      const oldVal = current[field];
      const newVal = (cleanUpdates as Record<string, unknown>)[field];
      if (String(oldVal) !== String(newVal)) {
        data.history.push({
          id: uuidv4(),
          ticket_id: id,
          action: "update",
          field,
          old_value: oldVal != null ? String(oldVal) : null,
          new_value: newVal != null ? String(newVal) : null,
          actor,
          created_at: now(),
        });
      }
    }
  }

  // Apply updates
  for (const [key, value] of Object.entries(cleanUpdates)) {
    current[key] = value;
  }
  current.updated_at = now();

  saveData(data);
  return current as unknown as Ticket;
}

export function archiveTicket(id: string): void {
  const data = loadData();
  const ticket = data.tickets.find((t) => t.id === id);
  if (ticket) {
    ticket.is_archived = true;
    ticket.updated_at = now();
    saveData(data);
  }
}

// ============================================================
// COMMENTS
// ============================================================

export function getComments(ticketId: string): TicketComment[] {
  const data = loadData();
  return data.comments
    .filter((c) => c.ticket_id === ticketId)
    .sort((a, b) => ((a.created_at as string) || "").localeCompare((b.created_at as string) || "")) as unknown as TicketComment[];
}

export function addComment(comment: Partial<TicketComment>): TicketComment {
  const data = loadData();
  const timestamp = now();
  const newComment: Record<string, unknown> = {
    id: uuidv4(),
    ticket_id: comment.ticket_id,
    content: comment.content,
    author: comment.author || "system",
    comment_type: comment.comment_type || "comment",
    is_deleted: false,
    parent_comment_id: comment.parent_comment_id ?? null,
    created_at: timestamp,
    updated_at: timestamp,
  };
  data.comments.push(newComment);
  saveData(data);
  return newComment as unknown as TicketComment;
}

// ============================================================
// TOKENS
// ============================================================

export function reportTokenUsage(
  id: string,
  tokensUsed: number
): { tokens_used: number; token_budget: number | null; token_budget_exceeded: boolean } {
  const data = loadData();
  const ticket = data.tickets.find((t) => t.id === id);
  if (!ticket) throw new Error("Ticket not found");

  const newTotal = ((ticket.tokens_used as number) || 0) + tokensUsed;
  const budget = ticket.token_budget as number | null;
  const exceeded = budget ? newTotal > budget : false;

  ticket.tokens_used = newTotal;
  ticket.token_budget_exceeded = exceeded;
  ticket.updated_at = now();
  saveData(data);

  return { tokens_used: newTotal, token_budget: budget, token_budget_exceeded: exceeded };
}

export function setTokenBudget(
  id: string,
  budget: number
): { token_budget: number; tokens_used: number; token_budget_exceeded: boolean } {
  const data = loadData();
  const ticket = data.tickets.find((t) => t.id === id);
  if (!ticket) throw new Error("Ticket not found");

  const tokensUsed = (ticket.tokens_used as number) || 0;
  const exceeded = tokensUsed > budget;

  ticket.token_budget = budget;
  ticket.token_budget_exceeded = exceeded;
  ticket.updated_at = now();
  saveData(data);

  return { token_budget: budget, tokens_used: tokensUsed, token_budget_exceeded: exceeded };
}

// ============================================================
// CHECKLIST
// ============================================================

export function toggleChecklistItem(id: string, index: number, done: boolean): Ticket {
  const data = loadData();
  const ticket = data.tickets.find((t) => t.id === id);
  if (!ticket) throw new Error("Ticket not found");

  const checklist = [...((ticket.implementation_checklist as { label: string; done: boolean }[]) || [])];
  if (index >= 0 && index < checklist.length) {
    checklist[index] = { ...checklist[index], done };
  }
  ticket.implementation_checklist = checklist;
  ticket.updated_at = now();
  saveData(data);

  return ticket as unknown as Ticket;
}

// ============================================================
// RELATED / CROSS-POLLINATION
// ============================================================

export function getRelatedTickets(id: string): Partial<TicketOverview>[] {
  const source = getTicketById(id);
  if (!source) return [];

  const data = loadData();
  const candidates = data.tickets.filter(
    (t) =>
      !t.is_archived &&
      ["todo", "planning", "in_progress", "review"].includes(t.status as string) &&
      t.id !== id
  );

  const scored = candidates
    .map((c) => {
      let score = 0;
      if (c.system_category === source.system_category) score += 3;
      for (const t of (c.db_tables as string[]) ?? []) {
        if ((source.db_tables ?? []).includes(t)) score += 2;
      }
      for (const s of (c.depends_on_systems as string[]) ?? []) {
        if ((source.depends_on_systems ?? []).includes(s)) score += 1;
      }
      if (((c.depends_on_systems as string[]) ?? []).includes(source.system_category)) score += 1;
      return { ...c, _score: score };
    })
    .filter((c) => (c._score as number) > 0)
    .sort((a, b) => (b._score as number) - (a._score as number))
    .slice(0, 10);

  return scored.map((c) => {
    const r = c as Record<string, unknown>;
    return {
      id: r.id as string,
      ticket_number: r.ticket_number as string,
      title: r.title as string,
      status: r.status,
      system_category: r.system_category as string,
      assignee: r.assignee as string | null,
      depends_on_systems: r.depends_on_systems,
      db_tables: r.db_tables,
    };
  }) as Partial<TicketOverview>[];
}

// ============================================================
// HISTORY
// ============================================================

export function getHistory(ticketId: string): TicketHistory[] {
  const data = loadData();
  return data.history
    .filter((h) => h.ticket_id === ticketId)
    .sort((a, b) => ((b.created_at as string) || "").localeCompare((a.created_at as string) || "")) as unknown as TicketHistory[];
}

// ============================================================
// DEPENDENCIES
// ============================================================

export function getDependencies(
  ticketId: string,
  direction: "blocked_by" | "blocks"
): (TicketDependency & { ticket: TicketOverview })[] {
  const data = loadData();
  const column = direction === "blocked_by" ? "blocked_id" : "blocker_id";
  const deps = data.dependencies.filter((d) => d[column] === ticketId) as unknown as TicketDependency[];

  const results: (TicketDependency & { ticket: TicketOverview })[] = [];
  for (const dep of deps) {
    const relatedId = direction === "blocked_by" ? dep.blocker_id : dep.blocked_id;
    const ticket = getTicketById(relatedId);
    if (ticket) results.push({ ...dep, ticket });
  }
  return results;
}

// ============================================================
// SMART QUEUE
// ============================================================

export function getNextTicket(assignee: string): TicketOverview | null {
  const candidates = getTickets({ status: "todo", assignee }).filter(
    (t) => t.blocked_by_count === 0
  );
  if (candidates.length === 0) return null;

  let best: TicketOverview | null = null;
  let bestScore = -1;

  for (const ticket of candidates) {
    const readiness = computeReadinessScore(ticket);
    const priorityWeight = PRIORITY_WEIGHT[ticket.priority] ?? PRIORITY_WEIGHT.medium;
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
  const data = loadData();
  const active = data.tickets.filter((t) => !t.is_archived);

  const count = (predicate: (t: Record<string, unknown>) => boolean) =>
    active.filter(predicate).length;

  const overall: TicketStatsOverall = {
    total: active.length,
    backlog: count((t) => t.status === "backlog"),
    todo: count((t) => t.status === "todo"),
    planning: count((t) => t.status === "planning"),
    in_progress: count((t) => t.status === "in_progress"),
    review: count((t) => t.status === "review"),
    done: count((t) => t.status === "done"),
    cancelled: count((t) => t.status === "cancelled"),
    epics: count((t) => t.ticket_type === "epic"),
    tickets: count((t) => t.ticket_type === "ticket"),
    subtasks: count((t) => t.ticket_type === "subtask"),
  };

  const categories = [...new Set(active.map((t) => t.system_category as string))].sort();
  const byCategory: TicketStatsByCategory[] = categories.map((cat) => {
    const catTickets = active.filter((t) => t.system_category === cat);
    const catCount = (predicate: (t: Record<string, unknown>) => boolean) =>
      catTickets.filter(predicate).length;
    return {
      system_category: cat,
      total: catTickets.length,
      backlog: catCount((t) => t.status === "backlog"),
      todo: catCount((t) => t.status === "todo"),
      planning: catCount((t) => t.status === "planning"),
      in_progress: catCount((t) => t.status === "in_progress"),
      review: catCount((t) => t.status === "review"),
      done: catCount((t) => t.status === "done"),
      cancelled: catCount((t) => t.status === "cancelled"),
    };
  });

  return { overall, byCategory };
}
