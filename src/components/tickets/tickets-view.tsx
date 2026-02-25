"use client";

import { useState } from "react";
import { TicketOverview, TicketStatsOverall } from "@/types/tickets";
import { TicketList } from "./ticket-list";
import { TicketBoard } from "./ticket-board";
import { TicketStatsCards } from "./ticket-stats";
import { TicketFilters } from "./ticket-filters";
import { TicketCreateDialog } from "./ticket-create-dialog";
import { Suspense } from "react";

type ViewMode = "list" | "board";

export function TicketsView({
  tickets,
  stats,
}: {
  tickets: TicketOverview[];
  stats: TicketStatsOverall;
}) {
  const [view, setView] = useState<ViewMode>("list");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Tickets</h1>
        <TicketCreateDialog />
      </div>

      {/* Stats */}
      <div className="mb-6">
        <TicketStatsCards stats={stats} />
      </div>

      {/* View Toggle */}
      <div className="mb-4 flex items-center gap-4">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5">
          <button
            onClick={() => setView("list")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-gray-100 text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Liste
          </button>
          <button
            onClick={() => setView("board")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "board"
                ? "bg-gray-100 text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Board
          </button>
        </div>

        {/* Filters only in list view */}
        {view === "list" && (
          <Suspense>
            <TicketFilters />
          </Suspense>
        )}
      </div>

      {/* Content */}
      {view === "list" ? (
        <TicketList tickets={tickets} />
      ) : (
        <TicketBoard tickets={tickets} />
      )}
    </div>
  );
}
