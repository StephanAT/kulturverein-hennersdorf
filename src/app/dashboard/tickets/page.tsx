import { getTickets, getStats } from "@/lib/tickets";
import { TicketsView } from "@/components/tickets/tickets-view";

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

  const hasFilters = Object.values(filters).some(Boolean);
  const tickets = getTickets(hasFilters ? filters : undefined);
  const stats = getStats();

  return <TicketsView tickets={tickets} stats={stats.overall} />;
}
