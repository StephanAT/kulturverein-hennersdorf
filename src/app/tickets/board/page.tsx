import { getTickets } from "@/lib/tickets";
import { TicketBoardCard } from "@/components/tickets/ticket-card";
import { TICKET_STATUSES, STATUS_CONFIG, type TicketStatus } from "@/types/tickets";
import Link from "next/link";

export const dynamic = "force-dynamic";

const BOARD_STATUSES: TicketStatus[] = [
  "backlog",
  "todo",
  "planning",
  "in_progress",
  "review",
  "done",
];

export default async function BoardPage() {
  const tickets = getTickets();

  const byStatus = BOARD_STATUSES.reduce(
    (acc, status) => {
      acc[status] = tickets.filter((t) => t.status === status);
      return acc;
    },
    {} as Record<TicketStatus, typeof tickets>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Board</h1>
            <p className="text-sm text-zinc-500">Kulturverein Hennersdorf</p>
          </div>
          <Link
            href="/tickets"
            className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          >
            List View
          </Link>
        </div>

        {/* Kanban columns */}
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
                  <span className="text-xs text-zinc-600">
                    {columnTickets.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {columnTickets.map((ticket) => (
                    <TicketBoardCard key={ticket.id} ticket={ticket} />
                  ))}
                  {columnTickets.length === 0 && (
                    <div className="rounded-lg border border-dashed border-zinc-800 py-8 text-center text-xs text-zinc-600">
                      No tickets
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
