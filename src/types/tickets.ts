// ============================================================
// TYPES, ENUMS, CONSTANTS for Kulturverein Hennersdorf Ticketing
// ============================================================

// --- Status ---
export const TICKET_STATUSES = [
  "backlog",
  "todo",
  "planning",
  "in_progress",
  "review",
  "done",
  "cancelled",
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; color: string; bgColor: string }
> = {
  backlog: {
    label: "Backlog",
    color: "text-zinc-400",
    bgColor: "bg-zinc-400/10",
  },
  todo: { label: "Todo", color: "text-blue-400", bgColor: "bg-blue-400/10" },
  planning: {
    label: "Planning",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
  },
  in_progress: {
    label: "In Progress",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  review: {
    label: "Review",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  done: {
    label: "Done",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
};

// --- Priority ---
export const TICKET_PRIORITIES = [
  "critical",
  "high",
  "medium",
  "low",
  "none",
] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export const PRIORITY_CONFIG: Record<
  TicketPriority,
  { label: string; color: string; bgColor: string; icon: string }
> = {
  critical: {
    label: "Critical",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    icon: "!!",
  },
  high: {
    label: "High",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    icon: "!",
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    icon: "-",
  },
  low: {
    label: "Low",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    icon: "v",
  },
  none: {
    label: "None",
    color: "text-zinc-400",
    bgColor: "bg-zinc-400/10",
    icon: "·",
  },
};

export const PRIORITY_WEIGHT: Record<TicketPriority, number> = {
  critical: 100,
  high: 75,
  medium: 50,
  low: 25,
  none: 10,
};

// --- Ticket Type ---
export const TICKET_TYPES = ["epic", "ticket", "subtask"] as const;
export type TicketType = (typeof TICKET_TYPES)[number];

export const TYPE_CONFIG: Record<
  TicketType,
  { label: string; color: string; bgColor: string }
> = {
  epic: {
    label: "Epic",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  ticket: {
    label: "Ticket",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  subtask: {
    label: "Subtask",
    color: "text-zinc-400",
    bgColor: "bg-zinc-400/10",
  },
};

// --- System Categories (adapted for Kulturverein Hennersdorf) ---
export const SYSTEM_CATEGORIES = [
  "Website & Design",
  "Martha Theater",
  "Kasperltheater",
  "Events & Veranstaltungen",
  "Dorferneuerung",
  "Schulprojekt",
  "Team & Organisation",
  "Sponsoren & Partner",
  "CMS & Content",
  "Infrastructure",
] as const;

export const CATEGORY_SHORT: Record<string, string> = {
  "Website & Design": "WEB",
  "Martha Theater": "MTH",
  Kasperltheater: "KAS",
  "Events & Veranstaltungen": "EVT",
  Dorferneuerung: "DRF",
  Schulprojekt: "SCH",
  "Team & Organisation": "TEA",
  "Sponsoren & Partner": "SPO",
  "CMS & Content": "CMS",
  Infrastructure: "INF",
};

export const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  "Website & Design": {
    label: "Website & Design",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
  },
  "Martha Theater": {
    label: "Martha Theater",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
  },
  Kasperltheater: {
    label: "Kasperltheater",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  "Events & Veranstaltungen": {
    label: "Events",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  Dorferneuerung: {
    label: "Dorferneuerung",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  Schulprojekt: {
    label: "Schulprojekt",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  "Team & Organisation": {
    label: "Team",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  "Sponsoren & Partner": {
    label: "Sponsoren",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  "CMS & Content": {
    label: "CMS",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
  },
  Infrastructure: {
    label: "Infra",
    color: "text-zinc-400",
    bgColor: "bg-zinc-400/10",
  },
};

// --- Output Type ---
export type OutputType =
  | "code"
  | "migration"
  | "schema"
  | "config"
  | "design_doc"
  | "data"
  | "content";

export const OUTPUT_TYPE_CONFIG: Record<
  OutputType,
  { label: string; color: string }
> = {
  code: { label: "Code", color: "text-blue-400" },
  migration: { label: "Migration", color: "text-amber-400" },
  schema: { label: "Schema", color: "text-violet-400" },
  config: { label: "Config", color: "text-zinc-400" },
  design_doc: { label: "Design Doc", color: "text-green-400" },
  data: { label: "Data", color: "text-cyan-400" },
  content: { label: "Content", color: "text-rose-400" },
};

// --- Comment Type ---
export type CommentType = "comment" | "discussion" | "idea" | "question";

export const COMMENT_TYPE_CONFIG: Record<
  CommentType,
  { label: string; icon: string; color: string }
> = {
  comment: { label: "Comment", icon: "", color: "text-zinc-400" },
  discussion: {
    label: "Discussion",
    icon: "~",
    color: "text-violet-400",
  },
  idea: { label: "Idea", icon: "*", color: "text-amber-400" },
  question: { label: "Question", icon: "?", color: "text-blue-400" },
};

// --- Actors ---
export type ActorType = "human" | "agent";

export interface Actor {
  id: string;
  name: string;
  initials: string;
  color: string;
  type: ActorType;
}

export const ACTORS: Actor[] = [
  {
    id: "stephan",
    name: "Stephan",
    initials: "SH",
    color: "bg-blue-500",
    type: "human",
  },
  {
    id: "claude",
    name: "Claude",
    initials: "CL",
    color: "bg-violet-500",
    type: "agent",
  },
];

export function getActor(id: string): Actor | undefined {
  return ACTORS.find((a) => a.id === id);
}

// --- Data Interfaces ---
export interface ChecklistItem {
  label: string;
  done: boolean;
}

export interface ContextRef {
  type: "doc" | "ticket" | "file" | "schema" | "url";
  path: string;
  hint?: string;
}

export interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  ticket_type: TicketType;
  system_category: string;
  parent_id: string | null;
  assignee: string | null;
  estimate: number | null;
  due_date: string | null;
  tech_stack: string[];
  db_tables: string[];
  depends_on_systems: string[];
  api_endpoints: string[];
  ui_components: string[];
  implementation_checklist: ChecklistItem[];
  acceptance_criteria: string[];
  context_refs: ContextRef[];
  file_scope: string[];
  do_not_touch: string[];
  output_type: OutputType | null;
  agent_instructions: string | null;
  plan_text: string | null;
  handoff_summary: string | null;
  token_budget: number | null;
  tokens_used: number;
  token_budget_exceeded: boolean;
  metadata: Record<string, unknown>;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface TicketOverview extends Ticket {
  child_count: number;
  children_done: number;
  blocked_by_count: number;
  blocks_count: number;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  content: string;
  author: string;
  comment_type: CommentType;
  is_deleted: boolean;
  parent_comment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketHistory {
  id: string;
  ticket_id: string;
  action: string;
  field: string | null;
  old_value: string | null;
  new_value: string | null;
  actor: string;
  created_at: string;
}

export interface TicketDependency {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
}

export interface TicketStatsOverall {
  total: number;
  backlog: number;
  todo: number;
  planning: number;
  in_progress: number;
  review: number;
  done: number;
  cancelled: number;
  epics: number;
  tickets: number;
  subtasks: number;
}

export interface TicketStatsByCategory {
  system_category: string;
  total: number;
  backlog: number;
  todo: number;
  planning: number;
  in_progress: number;
  review: number;
  done: number;
  cancelled: number;
}

// --- Readiness Score ---
export function computeReadinessScore(ticket: Ticket | TicketOverview): number {
  let score = 0;
  if (ticket.title && ticket.title.length > 5) score += 10;
  if (ticket.description && ticket.description.length > 10) score += 10;
  const ac = ticket.acceptance_criteria ?? [];
  if (ac.length >= 1) score += 10;
  if (ac.length >= 3) score += 15;
  if (ticket.agent_instructions && ticket.agent_instructions.length > 20)
    score += 15;
  if ((ticket.file_scope ?? []).length >= 1) score += 15;
  const cr = ticket.context_refs ?? [];
  if (cr.length >= 1) score += 5;
  if (cr.length >= 2) score += 5;
  if (ticket.output_type) score += 5;
  if (ticket.assignee) score += 5;
  if (ticket.system_category) score += 5;
  return Math.min(score, 100);
}

export function readinessColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

// --- Templates ---
export interface TicketTemplate {
  id: string;
  label: string;
  description: string;
  defaults: Partial<Ticket>;
}

const GLOBAL_DO_NOT_TOUCH = ["CLAUDE.md", ".env", ".env.local"];

export const TICKET_TEMPLATES: TicketTemplate[] = [
  {
    id: "page",
    label: "Website Page",
    description: "New page or section for the website",
    defaults: {
      output_type: "code",
      tech_stack: ["TypeScript", "Next.js", "Tailwind CSS", "Sanity"],
      do_not_touch: [...GLOBAL_DO_NOT_TOUCH],
      acceptance_criteria: [
        "Page renders correctly on desktop and mobile",
        "Content is editable via CMS",
        "Images are optimized",
      ],
      agent_instructions:
        "1. Check existing page structure\n2. Create page component\n3. Add CMS schema if needed\n4. Test responsiveness",
    },
  },
  {
    id: "cms_schema",
    label: "CMS Content Type",
    description: "New content type / schema in the CMS",
    defaults: {
      output_type: "schema",
      tech_stack: ["TypeScript", "Sanity"],
      do_not_touch: [...GLOBAL_DO_NOT_TOUCH],
      acceptance_criteria: [
        "Schema is defined with proper field types",
        "Content can be created and edited in Sanity Studio",
        "Frontend renders the content correctly",
      ],
      agent_instructions:
        "1. Define schema in sanity/schemas/\n2. Add to schema index\n3. Create GROQ query\n4. Test in Studio",
    },
  },
  {
    id: "component",
    label: "UI Component",
    description: "Reusable frontend component",
    defaults: {
      output_type: "code",
      tech_stack: ["TypeScript", "React", "Tailwind CSS", "shadcn/ui"],
      do_not_touch: [...GLOBAL_DO_NOT_TOUCH],
      acceptance_criteria: [
        "Component renders correctly",
        "Responsive on mobile and desktop",
        "Accessible (keyboard nav, screen reader)",
      ],
      agent_instructions:
        "1. Read existing component patterns\n2. Implement component\n3. Test in context",
    },
  },
  {
    id: "content",
    label: "Content Task",
    description: "Content creation, migration, or editing",
    defaults: {
      output_type: "content",
      tech_stack: ["Sanity"],
      do_not_touch: [...GLOBAL_DO_NOT_TOUCH],
      acceptance_criteria: [
        "Content is accurate and complete",
        "Images are properly sized and credited",
        "Text is proofread (German)",
      ],
    },
  },
  {
    id: "design_doc",
    label: "Design Document",
    description: "Planning or architecture document",
    defaults: {
      output_type: "design_doc",
      tech_stack: [],
      do_not_touch: [...GLOBAL_DO_NOT_TOUCH],
      acceptance_criteria: [
        "Document covers problem, approach, and trade-offs",
        "Reviewed by at least one team member",
      ],
    },
  },
  {
    id: "blank",
    label: "Blank",
    description: "Start from scratch",
    defaults: {
      do_not_touch: [...GLOBAL_DO_NOT_TOUCH],
    },
  },
];
