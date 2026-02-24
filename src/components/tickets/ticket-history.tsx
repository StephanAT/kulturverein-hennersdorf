"use client";

import { TicketHistory, getActor } from "@/types/tickets";

export function TicketHistoryLog({ history }: { history: TicketHistory[] }) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Verlauf</h3>
      <div className="space-y-1">
        {history.map((entry) => {
          const actor = getActor(entry.actor);
          return (
            <div key={entry.id} className="flex items-start gap-2 text-xs text-gray-400">
              <span className="shrink-0 text-gray-400">
                {new Date(entry.created_at).toLocaleDateString("de-AT")}
              </span>
              <span>{actor?.name ?? entry.actor}</span>
              <span>
                hat <code className="text-gray-600">{entry.field}</code> geändert
                {entry.old_value && (
                  <>
                    {" "}von <span className="line-through text-gray-400">{entry.old_value}</span>
                  </>
                )}
                {entry.new_value && (
                  <>
                    {" "}zu <span className="text-gray-700">{entry.new_value}</span>
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
