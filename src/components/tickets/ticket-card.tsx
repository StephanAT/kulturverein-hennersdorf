"use client";

import Link from "next/link";
import { TicketOverview } from "@/types/tickets";
import { StatusBadge, PriorityBadge, TypeBadge, CategoryBadge, ActorAvatar } from "./ticket-badges";

export function TicketCard({ ticket }: { ticket: TicketOverview }) {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-[2px_4px_3px_rgba(0,0,0,0.06)] transition-all hover:border-brand/30 hover:shadow-[2px_4px_6px_rgba(0,0,0,0.1)]"
    >
      <PriorityBadge priority={ticket.priority} />
      <span className="text-xs text-gray-400 font-mono">{ticket.ticket_number}</span>
      <TypeBadge type={ticket.ticket_type} />
      <span className="flex-1 truncate text-sm font-normal text-gray-800">{ticket.title}</span>
      <CategoryBadge category={ticket.system_category} />
      {ticket.child_count > 0 && (
        <span className="text-xs text-gray-400">
          {ticket.children_done}/{ticket.child_count}
        </span>
      )}
      {ticket.blocked_by_count > 0 && (
        <span className="text-xs font-medium text-red-500">blocked</span>
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
      className="block rounded-lg border border-gray-200 bg-white p-3 shadow-[2px_4px_3px_rgba(0,0,0,0.06)] transition-all hover:border-brand/30 hover:shadow-[2px_4px_6px_rgba(0,0,0,0.1)]"
    >
      <div className="mb-2 flex items-center gap-2">
        <PriorityBadge priority={ticket.priority} />
        <span className="text-xs text-gray-400 font-mono">{ticket.ticket_number}</span>
        <div className="flex-1" />
        {ticket.assignee && <ActorAvatar actorId={ticket.assignee} />}
      </div>
      <p className="mb-2 text-sm font-normal text-gray-800 line-clamp-2">{ticket.title}</p>
      <div className="flex items-center gap-2">
        <CategoryBadge category={ticket.system_category} />
        {ticket.child_count > 0 && (
          <span className="text-xs text-gray-400">
            {ticket.children_done}/{ticket.child_count}
          </span>
        )}
      </div>
    </Link>
  );
}
