"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TicketStatsOverall } from "@/types/tickets";

const STAT_CARDS: {
  key: keyof TicketStatsOverall;
  label: string;
  color: string;
}[] = [
  { key: "total", label: "Gesamt", color: "text-gray-800" },
  { key: "backlog", label: "Backlog", color: "text-gray-400" },
  { key: "todo", label: "Todo", color: "text-blue-600" },
  { key: "planning", label: "Planung", color: "text-violet-600" },
  { key: "in_progress", label: "In Arbeit", color: "text-amber-600" },
  { key: "review", label: "Review", color: "text-orange-600" },
  { key: "done", label: "Fertig", color: "text-emerald-600" },
];

export function TicketStatsCards({ stats }: { stats: TicketStatsOverall }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {STAT_CARDS.map((card) => (
        <Card key={card.key} className="border-gray-200 bg-white shadow-[2px_4px_3px_rgba(0,0,0,0.06)]">
          <CardContent className="p-3">
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>
              {stats[card.key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
