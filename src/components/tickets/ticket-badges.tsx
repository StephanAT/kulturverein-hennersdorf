"use client";

import { Badge } from "@/components/ui/badge";
import {
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  TYPE_CONFIG,
  CATEGORY_CONFIG,
  ACTORS,
  type TicketStatus,
  type TicketPriority,
  type TicketType,
} from "@/types/tickets";

// Light-theme color maps
const STATUS_LIGHT: Record<TicketStatus, { bg: string; text: string }> = {
  backlog: { bg: "bg-gray-100", text: "text-gray-500" },
  todo: { bg: "bg-blue-50", text: "text-blue-700" },
  planning: { bg: "bg-violet-50", text: "text-violet-700" },
  in_progress: { bg: "bg-amber-50", text: "text-amber-700" },
  review: { bg: "bg-orange-50", text: "text-orange-700" },
  done: { bg: "bg-emerald-50", text: "text-emerald-700" },
  cancelled: { bg: "bg-red-50", text: "text-red-600" },
};

const PRIORITY_LIGHT: Record<TicketPriority, { text: string }> = {
  critical: { text: "text-red-600" },
  high: { text: "text-orange-600" },
  medium: { text: "text-amber-600" },
  low: { text: "text-blue-500" },
  none: { text: "text-gray-400" },
};

const TYPE_LIGHT: Record<TicketType, { bg: string; text: string }> = {
  epic: { bg: "bg-purple-50", text: "text-purple-700" },
  ticket: { bg: "bg-blue-50", text: "text-blue-700" },
  subtask: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  const config = STATUS_CONFIG[status];
  const light = STATUS_LIGHT[status];
  return (
    <Badge variant="outline" className={`${light.text} ${light.bg} border-0 text-xs font-medium`}>
      {config.label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = PRIORITY_CONFIG[priority];
  const light = PRIORITY_LIGHT[priority];
  return (
    <span className={`${light.text} text-xs font-mono font-bold`} title={config.label}>
      {config.icon}
    </span>
  );
}

export function TypeBadge({ type }: { type: TicketType }) {
  const config = TYPE_CONFIG[type];
  const light = TYPE_LIGHT[type];
  return (
    <Badge variant="outline" className={`${light.text} ${light.bg} border-0 text-xs font-medium`}>
      {config.label}
    </Badge>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category];
  return (
    <Badge
      variant="outline"
      className="border-0 text-xs font-medium bg-brand-light/50 text-brand-dark"
    >
      {config?.label ?? category}
    </Badge>
  );
}

export function ActorAvatar({ actorId }: { actorId: string }) {
  const actor = ACTORS.find((a) => a.id === actorId);
  if (!actor) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-medium text-gray-500">
        ?
      </span>
    );
  }
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${actor.color} text-[10px] font-medium text-white`}
      title={actor.name}
    >
      {actor.initials}
    </span>
  );
}
