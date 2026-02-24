import { Suspense } from "react";
import { getTickets, getStats } from "@/lib/tickets";
import { TicketList } from "@/components/tickets/ticket-list";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketStatsCards } from "@/components/tickets/ticket-stats";
import { TicketCreateDialog } from "@/components/tickets/ticket-create-dialog";

export const dynamic = "force-dynamic";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const filters = {
    status: params.status || undefined,
    priority: params.priority || undefined,
    type: params.type || undefined,
    category: params.category || undefined,
    search: params.search || undefined,
  };

  const [tickets, stats] = [getTickets(filters), getStats()];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Actions */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Tickets</h1>
        <TicketCreateDialog />
      </div>

      {/* Stats */}
      <div className="mb-6">
        <TicketStatsCards stats={stats.overall} />
      </div>

      {/* Filters */}
      <div className="mb-4">
        <Suspense>
          <TicketFilters />
        </Suspense>
      </div>

      {/* Ticket List */}
      <TicketList tickets={tickets} />
    </div>
  );
}
