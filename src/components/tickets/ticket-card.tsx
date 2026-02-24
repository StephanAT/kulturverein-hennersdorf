"use client";

import Link from "next/link";
import { TicketOverview } from "@/types/tickets";
import { StatusBadge, PriorityBadge, TypeBadge, CategoryBadge, ActorAvatar } from "./ticket-badges";

export function TicketCard({ ticket }: { ticket: TicketOverview }) {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
    >
      <PriorityBadge priority={ticket.priority} />
      <span className="text-xs text-zinc-500 font-mono">{ticket.ticket_number}</span>
      <TypeBadge type={ticket.ticket_type} />
      <span className="flex-1 truncate text-sm text-zinc-200">{ticket.title}</span>
      <CategoryBadge category={ticket.system_category} />
      {ticket.child_count > 0 && (
        <span className="text-xs text-zinc-500">
          {ticket.children_done}/{ticket.child_count}
        </span>
      )}
      {ticket.blocked_by_count > 0 && (
        <span className="text-xs text-red-400">blocked</span>
      )}
      <StatusBadge status={ticket.status} />
      {ticket.assignee && <ActorAvatar actorId={ticket.assignee} />}
    </Link>
  );
}

export function TicketBoardCard({ ticket }: { ticket: TicketOverview }) {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:border-zinc-700"
    >
      <div className="mb-2 flex items-center gap-2">
        <PriorityBadge priority={ticket.priority} />
        <span className="text-xs text-zinc-500 font-mono">{ticket.ticket_number}</span>
        {ticket.assignee && <ActorAvatar actorId={ticket.assignee} />}
      </div>
      <p className="mb-2 text-sm text-zinc-200 line-clamp-2">{ticket.title}</p>
      <div className="flex items-center gap-2">
        <CategoryBadge category={ticket.system_category} />
        {ticket.child_count > 0 && (
          <span className="text-xs text-zinc-500">
            {ticket.children_done}/{ticket.child_count}
          </span>
        )}
      </div>
    </Link>
  );
}
