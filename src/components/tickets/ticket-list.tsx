"use client";

import { TicketOverview } from "@/types/tickets";
import { TicketCard } from "./ticket-card";

export function TicketList({ tickets }: { tickets: TicketOverview[] }) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 text-gray-400">
        <p className="text-sm">Keine Tickets gefunden</p>
        <p className="text-xs mt-1">Erstelle ein Ticket um loszulegen</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
