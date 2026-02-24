import Image from "next/image";
import { getTickets } from "@/lib/tickets";
import { TicketBoardCard } from "@/components/tickets/ticket-card";
import { STATUS_CONFIG, type TicketStatus } from "@/types/tickets";
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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Kulturverein Hennersdorf" width={48} height={48} className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Board</h1>
              <p className="text-sm text-gray-500">Kulturverein Hennersdorf</p>
            </div>
          </div>
          <Link
            href="/tickets"
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-500 shadow-[2px_4px_3px_rgba(0,0,0,0.06)] hover:text-brand hover:border-brand/30"
          >
            Listenansicht
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
      </div>
    </div>
  );
}
