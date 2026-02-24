"use client";

import { TicketOverview } from "@/types/tickets";
import { TicketCard } from "./ticket-card";

export function TicketList({ tickets }: { tickets: TicketOverview[] }) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 py-12 text-zinc-500">
        <p className="text-sm">No tickets found</p>
        <p className="text-xs mt-1">Create a ticket to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
