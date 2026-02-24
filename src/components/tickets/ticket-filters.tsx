"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TICKET_STATUSES,
  TICKET_PRIORITIES,
  TICKET_TYPES,
  SYSTEM_CATEGORIES,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  TYPE_CONFIG,
} from "@/types/tickets";

export function TicketFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "";
  const currentPriority = searchParams.get("priority") || "";
  const currentType = searchParams.get("type") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";

  const hasFilters =
    currentStatus || currentPriority || currentType || currentCategory || currentSearch;

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/tickets?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/tickets");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={currentStatus} onValueChange={(v) => updateFilter("status", v)}>
        <SelectTrigger className="w-[140px] bg-white border-gray-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {TICKET_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {STATUS_CONFIG[s].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentPriority} onValueChange={(v) => updateFilter("priority", v)}>
        <SelectTrigger className="w-[140px] bg-white border-gray-200">
          <SelectValue placeholder="Priorit&auml;t" />
        </SelectTrigger>
        <SelectContent>
          {TICKET_PRIORITIES.map((p) => (
            <SelectItem key={p} value={p}>
              {PRIORITY_CONFIG[p].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentType} onValueChange={(v) => updateFilter("type", v)}>
        <SelectTrigger className="w-[130px] bg-white border-gray-200">
          <SelectValue placeholder="Typ" />
        </SelectTrigger>
        <SelectContent>
          {TICKET_TYPES.map((t) => (
            <SelectItem key={t} value={t}>
              {TYPE_CONFIG[t].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentCategory} onValueChange={(v) => updateFilter("category", v)}>
        <SelectTrigger className="w-[180px] bg-white border-gray-200">
          <SelectValue placeholder="Kategorie" />
        </SelectTrigger>
        <SelectContent>
          {SYSTEM_CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Suchen..."
        value={currentSearch}
        onChange={(e) => updateFilter("search", e.target.value)}
        className="w-[200px] bg-white border-gray-200"
      />

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-brand">
          Zurucksetzen
        </Button>
      )}
    </div>
  );
}
