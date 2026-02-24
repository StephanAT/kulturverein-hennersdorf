import { Suspense } from "react";
import Image from "next/image";
import { getTickets, getStats } from "@/lib/tickets";
import { TicketList } from "@/components/tickets/ticket-list";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketStatsCards } from "@/components/tickets/ticket-stats";
import { TicketCreateDialog } from "@/components/tickets/ticket-create-dialog";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Kulturverein Hennersdorf" width={640} height={126} unoptimized className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Kulturverein Hennersdorf</h1>
              <p className="text-sm text-gray-500">Projekt-Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/tickets/board"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-500 shadow-[2px_4px_3px_rgba(0,0,0,0.06)] hover:text-brand hover:border-brand/30"
            >
              Board
            </Link>
            <TicketCreateDialog />
          </div>
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
    </div>
  );
}
