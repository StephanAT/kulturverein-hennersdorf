"use client";

import { TicketOverview, STATUS_CONFIG, type TicketStatus } from "@/types/tickets";
import { TicketBoardCard } from "./ticket-card";

const BOARD_STATUSES: TicketStatus[] = [
  "backlog",
  "todo",
  "planning",
  "in_progress",
  "review",
  "done",
];

export function TicketBoard({ tickets }: { tickets: TicketOverview[] }) {
  const byStatus = BOARD_STATUSES.reduce(
    (acc, status) => {
      acc[status] = tickets.filter((t) => t.status === status);
      return acc;
    },
    {} as Record<TicketStatus, TicketOverview[]>
  );

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {BOARD_STATUSES.map((status) => {
        const config = STATUS_CONFIG[status];
        const columnTickets = byStatus[status];
        return (
          <div key={status} className="w-[280px] shrink-0">
            <div className="mb-3 flex items-center gap-2">
              <span className={`text-sm font-medium ${config.color}`}>
                {config.label}
              </span>
              <span className="text-xs text-gray-400">
                {columnTickets.length}
              </span>
            </div>
            <div className="space-y-2">
              {columnTickets.map((ticket) => (
                <TicketBoardCard key={ticket.id} ticket={ticket} />
              ))}
              {columnTickets.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center text-xs text-gray-400">
                  Keine Tickets
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
