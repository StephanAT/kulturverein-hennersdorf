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
  const [hideDone, setHideDone] = useState(true);

  const doneCount = tickets.filter((t) => t.status === "done").length;
  const filteredTickets = hideDone
    ? tickets.filter((t) => t.status !== "done")
    : tickets;

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

      {/* View Toggle + Hide Done */}
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

        {/* Hide Done Toggle */}
        {doneCount > 0 && (
          <button
            onClick={() => setHideDone((h) => !h)}
            className={`ml-auto flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              hideDone
                ? "border-gray-200 bg-white text-gray-500 hover:text-gray-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              {hideDone ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
            {hideDone ? `Done (${doneCount})` : `Done (${doneCount})`}
          </button>
        )}
      </div>

      {/* Content */}
      {view === "list" ? (
        <TicketList tickets={filteredTickets} />
      ) : (
        <TicketBoard tickets={filteredTickets} />
      )}
    </div>
  );
}
