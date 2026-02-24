"use client";

import { useRouter } from "next/navigation";
import { ChecklistItem } from "@/types/tickets";

export function TicketChecklist({
  ticketId,
  checklist,
}: {
  ticketId: string;
  checklist: ChecklistItem[];
}) {
  const router = useRouter();

  if (checklist.length === 0) return null;

  const done = checklist.filter((item) => item.done).length;
  const total = checklist.length;
  const pct = Math.round((done / total) * 100);

  async function toggle(index: number, currentDone: boolean) {
    await fetch(`/api/tickets/${ticketId}/checklist`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, done: !currentDone }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-gray-700">Checkliste</h3>
        <span className="text-xs text-gray-400">
          {done}/{total} ({pct}%)
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-emerald-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-1">
        {checklist.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <button
              onClick={() => toggle(i, item.done)}
              className={`h-4 w-4 rounded border text-xs flex items-center justify-center transition-colors ${
                item.done
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border-gray-300 text-transparent hover:border-gray-400"
              }`}
            >
              {item.done ? "v" : ""}
            </button>
            <span
              className={`text-sm ${
                item.done ? "text-gray-400 line-through" : "text-gray-700"
              }`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
