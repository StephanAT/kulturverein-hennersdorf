"use client";

import { TicketHistory, getActor } from "@/types/tickets";

export function TicketHistoryLog({ history }: { history: TicketHistory[] }) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-zinc-300">History</h3>
      <div className="space-y-1">
        {history.map((entry) => {
          const actor = getActor(entry.actor);
          return (
            <div key={entry.id} className="flex items-start gap-2 text-xs text-zinc-500">
              <span className="shrink-0 text-zinc-600">
                {new Date(entry.created_at).toLocaleDateString("de-AT")}
              </span>
              <span>{actor?.name ?? entry.actor}</span>
              <span>
                changed <code className="text-zinc-400">{entry.field}</code>
                {entry.old_value && (
                  <>
                    {" "}from <span className="line-through text-zinc-600">{entry.old_value}</span>
                  </>
                )}
                {entry.new_value && (
                  <>
                    {" "}to <span className="text-zinc-300">{entry.new_value}</span>
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
