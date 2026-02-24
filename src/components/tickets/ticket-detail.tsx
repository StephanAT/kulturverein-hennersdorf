"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  StatusBadge,
  PriorityBadge,
  TypeBadge,
  CategoryBadge,
  ActorAvatar,
} from "./ticket-badges";
import { TicketChecklist } from "./ticket-checklist";
import { TicketComments } from "./ticket-comments";
import { TicketHistoryLog } from "./ticket-history";
import {
  TicketOverview,
  TicketComment,
  TicketHistory,
  TicketDependency,
  TICKET_STATUSES,
  ACTORS,
  STATUS_CONFIG,
  OUTPUT_TYPE_CONFIG,
  computeReadinessScore,
  readinessColor,
} from "@/types/tickets";

interface TicketDetailProps {
  ticket: TicketOverview;
  children: TicketOverview[];
  comments: TicketComment[];
  blockedBy: (TicketDependency & { ticket: TicketOverview })[];
  blocks: (TicketDependency & { ticket: TicketOverview })[];
  parent: TicketOverview | null;
  history: TicketHistory[];
}

export function TicketDetail({
  ticket,
  children: childTickets,
  comments,
  blockedBy,
  blocks,
  parent,
  history,
}: TicketDetailProps) {
  const router = useRouter();
  const readiness = computeReadinessScore(ticket);

  async function updateField(field: string, value: unknown) {
    await fetch(`/api/tickets/${ticket.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value, _actor: "stephan" }),
    });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Back link */}
      <Button variant="ghost" size="sm" onClick={() => router.push("/tickets")} className="mb-4 text-zinc-400">
        &larr; Back to tickets
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <PriorityBadge priority={ticket.priority} />
              <span className="text-sm text-zinc-500 font-mono">{ticket.ticket_number}</span>
              <TypeBadge type={ticket.ticket_type} />
              <span className={`text-sm ${readinessColor(readiness)}`}>
                {readiness}% ready
              </span>
            </div>
            <h1 className="text-xl font-semibold text-zinc-100">{ticket.title}</h1>
            {parent && (
              <p className="mt-1 text-xs text-zinc-500">
                Parent:{" "}
                <a href={`/tickets/${parent.id}`} className="text-zinc-400 hover:text-zinc-200">
                  {parent.ticket_number} - {parent.title}
                </a>
              </p>
            )}
          </div>

          {/* Description */}
          {ticket.description && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Description</h3>
              <p className="text-sm text-zinc-300 whitespace-pre-wrap">{ticket.description}</p>
            </div>
          )}

          {/* Plan */}
          {ticket.plan_text && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Plan</h3>
              <pre className="rounded-lg bg-zinc-900 p-3 text-sm text-zinc-300 whitespace-pre-wrap">
                {ticket.plan_text}
              </pre>
            </div>
          )}

          {/* Acceptance Criteria */}
          {ticket.acceptance_criteria?.length > 0 && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Acceptance Criteria</h3>
              <ul className="space-y-1">
                {ticket.acceptance_criteria.map((ac, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="text-zinc-500">-</span> {ac}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Agent Instructions */}
          {ticket.agent_instructions && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Agent Instructions</h3>
              <pre className="rounded-lg bg-zinc-900 p-3 text-sm text-zinc-300 whitespace-pre-wrap">
                {ticket.agent_instructions}
              </pre>
            </div>
          )}

          {/* Context Refs */}
          {ticket.context_refs?.length > 0 && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Context References</h3>
              <ul className="space-y-1">
                {ticket.context_refs.map((ref, i) => (
                  <li key={i} className="text-sm text-zinc-300">
                    <span className="text-zinc-500 font-mono text-xs">[{ref.type}]</span>{" "}
                    <code className="text-zinc-400">{ref.path}</code>
                    {ref.hint && <span className="text-zinc-500"> - {ref.hint}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Scope */}
          {(ticket.file_scope?.length > 0 || ticket.do_not_touch?.length > 0) && (
            <div className="grid grid-cols-2 gap-4">
              {ticket.file_scope?.length > 0 && (
                <div>
                  <h3 className="mb-1 text-sm font-medium text-emerald-400">File Scope</h3>
                  <ul className="space-y-0.5">
                    {ticket.file_scope.map((f, i) => (
                      <li key={i} className="text-xs font-mono text-zinc-400">{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              {ticket.do_not_touch?.length > 0 && (
                <div>
                  <h3 className="mb-1 text-sm font-medium text-red-400">Do Not Touch</h3>
                  <ul className="space-y-0.5">
                    {ticket.do_not_touch.map((f, i) => (
                      <li key={i} className="text-xs font-mono text-zinc-400">{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Separator className="bg-zinc-800" />

          {/* Checklist */}
          <TicketChecklist ticketId={ticket.id} checklist={ticket.implementation_checklist ?? []} />

          {/* Children */}
          {childTickets.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-zinc-300">
                Sub-tickets ({ticket.children_done}/{ticket.child_count})
              </h3>
              <div className="space-y-1">
                {childTickets.map((child) => (
                  <a
                    key={child.id}
                    href={`/tickets/${child.id}`}
                    className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-sm hover:border-zinc-700"
                  >
                    <PriorityBadge priority={child.priority} />
                    <span className="text-zinc-500 font-mono text-xs">{child.ticket_number}</span>
                    <span className="flex-1 text-zinc-300">{child.title}</span>
                    <StatusBadge status={child.status} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies */}
          {blockedBy.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-red-400">Blocked By</h3>
              <div className="space-y-1">
                {blockedBy.map((dep) => (
                  <a
                    key={dep.id}
                    href={`/tickets/${dep.ticket.id}`}
                    className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-sm hover:border-zinc-700"
                  >
                    <span className="text-zinc-500 font-mono text-xs">{dep.ticket.ticket_number}</span>
                    <span className="flex-1 text-zinc-300">{dep.ticket.title}</span>
                    <StatusBadge status={dep.ticket.status} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {blocks.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-amber-400">Blocks</h3>
              <div className="space-y-1">
                {blocks.map((dep) => (
                  <a
                    key={dep.id}
                    href={`/tickets/${dep.ticket.id}`}
                    className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-sm hover:border-zinc-700"
                  >
                    <span className="text-zinc-500 font-mono text-xs">{dep.ticket.ticket_number}</span>
                    <span className="flex-1 text-zinc-300">{dep.ticket.title}</span>
                    <StatusBadge status={dep.ticket.status} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Handoff */}
          {ticket.handoff_summary && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Handoff Summary</h3>
              <pre className="rounded-lg bg-zinc-900 p-3 text-sm text-zinc-300 whitespace-pre-wrap">
                {ticket.handoff_summary}
              </pre>
            </div>
          )}

          <Separator className="bg-zinc-800" />

          {/* Comments */}
          <TicketComments ticketId={ticket.id} comments={comments} />

          <Separator className="bg-zinc-800" />

          {/* History */}
          <TicketHistoryLog history={history} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-4">
            {/* Status */}
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Status</label>
              <Select value={ticket.status} onValueChange={(v) => updateField("status", v)}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TICKET_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{STATUS_CONFIG[s].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assignee */}
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Assignee</label>
              <Select
                value={ticket.assignee || "unassigned"}
                onValueChange={(v) => updateField("assignee", v === "unassigned" ? null : v)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {ACTORS.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Category</label>
              <CategoryBadge category={ticket.system_category} />
            </div>

            {/* Output Type */}
            {ticket.output_type && (
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Output Type</label>
                <span className={`text-sm ${OUTPUT_TYPE_CONFIG[ticket.output_type]?.color ?? "text-zinc-400"}`}>
                  {OUTPUT_TYPE_CONFIG[ticket.output_type]?.label ?? ticket.output_type}
                </span>
              </div>
            )}

            {/* Token Budget */}
            {(ticket.token_budget || ticket.tokens_used > 0) && (
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Token Budget</label>
                <div className="text-sm text-zinc-300">
                  {ticket.tokens_used.toLocaleString()} / {(ticket.token_budget ?? 0).toLocaleString()}
                </div>
                {ticket.token_budget && (
                  <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-800">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        ticket.token_budget_exceeded
                          ? "bg-red-500"
                          : ticket.tokens_used / ticket.token_budget > 0.7
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${Math.min(100, (ticket.tokens_used / ticket.token_budget) * 100)}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack */}
            {ticket.tech_stack?.length > 0 && (
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Tech Stack</label>
                <div className="flex flex-wrap gap-1">
                  {ticket.tech_stack.map((t, i) => (
                    <span key={i} className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="space-y-1 pt-2 border-t border-zinc-800">
              <p className="text-xs text-zinc-600">
                Created: {new Date(ticket.created_at).toLocaleDateString("de-AT")}
              </p>
              <p className="text-xs text-zinc-600">
                Updated: {new Date(ticket.updated_at).toLocaleDateString("de-AT")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
