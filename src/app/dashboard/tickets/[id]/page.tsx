import { notFound } from "next/navigation";
import {
  getTicketById,
  getTickets,
  getComments,
  getDependencies,
  getHistory,
} from "@/lib/tickets";
import { TicketDetail } from "@/components/tickets/ticket-detail";

export const dynamic = "force-dynamic";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ticket = getTicketById(id);
  if (!ticket) notFound();

  const children = getTickets({ parent_id: id });
  const comments = getComments(id);
  const blockedBy = getDependencies(id, "blocked_by");
  const blocks = getDependencies(id, "blocks");
  const parent = ticket.parent_id ? getTicketById(ticket.parent_id) : null;
  const history = getHistory(id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <TicketDetail
        ticket={ticket}
        children={children}
        comments={comments}
        blockedBy={blockedBy}
        blocks={blocks}
        parent={parent}
        history={history}
      />
    </div>
  );
}
