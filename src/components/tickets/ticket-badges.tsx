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

export function StatusBadge({ status }: { status: TicketStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge variant="outline" className={`${config.color} ${config.bgColor} border-0 text-xs`}>
      {config.label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <span className={`${config.color} text-xs font-mono font-bold`} title={config.label}>
      {config.icon}
    </span>
  );
}

export function TypeBadge({ type }: { type: TicketType }) {
  const config = TYPE_CONFIG[type];
  return (
    <Badge variant="outline" className={`${config.color} ${config.bgColor} border-0 text-xs`}>
      {config.label}
    </Badge>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category] ?? {
    label: category,
    color: "text-zinc-400",
    bgColor: "bg-zinc-400/10",
  };
  return (
    <Badge variant="outline" className={`${config.color} ${config.bgColor} border-0 text-xs`}>
      {config.label}
    </Badge>
  );
}

export function ActorAvatar({ actorId }: { actorId: string }) {
  const actor = ACTORS.find((a) => a.id === actorId);
  if (!actor) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-medium text-zinc-300">
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
