"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TicketStatsOverall } from "@/types/tickets";

const STAT_CARDS: {
  key: keyof TicketStatsOverall;
  label: string;
  color: string;
}[] = [
  { key: "total", label: "Total", color: "text-zinc-200" },
  { key: "backlog", label: "Backlog", color: "text-zinc-400" },
  { key: "todo", label: "Todo", color: "text-blue-400" },
  { key: "planning", label: "Planning", color: "text-violet-400" },
  { key: "in_progress", label: "In Progress", color: "text-amber-400" },
  { key: "review", label: "Review", color: "text-orange-400" },
  { key: "done", label: "Done", color: "text-emerald-400" },
];

export function TicketStatsCards({ stats }: { stats: TicketStatsOverall }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {STAT_CARDS.map((card) => (
        <Card key={card.key} className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="p-3">
            <p className="text-xs text-zinc-500">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>
              {stats[card.key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
