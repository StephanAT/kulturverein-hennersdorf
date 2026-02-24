"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  ACTORS,
  TICKET_TEMPLATES,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  TYPE_CONFIG,
  computeReadinessScore,
  readinessColor,
  type Ticket,
} from "@/types/tickets";

export function TicketCreateDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Ticket>>({
    title: "",
    description: "",
    status: "backlog",
    priority: "medium",
    ticket_type: "ticket",
    system_category: SYSTEM_CATEGORIES[0],
    assignee: null,
    output_type: null,
    acceptance_criteria: [],
    agent_instructions: "",
    file_scope: [],
    context_refs: [],
    do_not_touch: [],
    tech_stack: [],
  });

  const [acInput, setAcInput] = useState("");

  const readiness = computeReadinessScore(form as Ticket);

  function applyTemplate(templateId: string) {
    const template = TICKET_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setForm((prev) => ({ ...prev, ...template.defaults }));
    }
  }

  function addAc() {
    if (acInput.trim()) {
      setForm((prev) => ({
        ...prev,
        acceptance_criteria: [...(prev.acceptance_criteria || []), acInput.trim()],
      }));
      setAcInput("");
    }
  }

  function removeAc(index: number) {
    setForm((prev) => ({
      ...prev,
      acceptance_criteria: (prev.acceptance_criteria || []).filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit() {
    if (!form.title?.trim() || !form.system_category) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setOpen(false);
        setForm({
          title: "",
          description: "",
          status: "backlog",
          priority: "medium",
          ticket_type: "ticket",
          system_category: SYSTEM_CATEGORIES[0],
          assignee: null,
          output_type: null,
          acceptance_criteria: [],
          agent_instructions: "",
          file_scope: [],
          context_refs: [],
          do_not_touch: [],
          tech_stack: [],
        });
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Neues Ticket</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Ticket erstellen
            <span className={`text-sm font-normal ${readinessColor(readiness)}`}>
              Readiness: {readiness}%
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Template */}
          <div>
            <Label>Vorlage</Label>
            <Select onValueChange={applyTemplate}>
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Vorlage wählen..." />
              </SelectTrigger>
              <SelectContent>
                {TICKET_TEMPLATES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label} - {t.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label>Titel *</Label>
            <Input
              value={form.title || ""}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Kurze Zusammenfassung"
              className="bg-white border-gray-200"
            />
          </div>

          {/* Description */}
          <div>
            <Label>Beschreibung</Label>
            <Textarea
              value={form.description || ""}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Ausführliche Beschreibung..."
              className="bg-white border-gray-200"
              rows={3}
            />
          </div>

          {/* Classification row */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((prev) => ({ ...prev, status: v as Ticket["status"] }))}
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TICKET_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{STATUS_CONFIG[s].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priorität</Label>
              <Select
                value={form.priority}
                onValueChange={(v) => setForm((prev) => ({ ...prev, priority: v as Ticket["priority"] }))}
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TICKET_PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>{PRIORITY_CONFIG[p].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Typ</Label>
              <Select
                value={form.ticket_type}
                onValueChange={(v) => setForm((prev) => ({ ...prev, ticket_type: v as Ticket["ticket_type"] }))}
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TICKET_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{TYPE_CONFIG[t].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Zugewiesen</Label>
              <Select
                value={form.assignee || "unassigned"}
                onValueChange={(v) => setForm((prev) => ({ ...prev, assignee: v === "unassigned" ? null : v }))}
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Nicht zugewiesen</SelectItem>
                  {ACTORS.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div>
            <Label>Kategorie *</Label>
            <Select
              value={form.system_category}
              onValueChange={(v) => setForm((prev) => ({ ...prev, system_category: v }))}
            >
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SYSTEM_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Acceptance Criteria */}
          <div>
            <Label>Akzeptanzkriterien</Label>
            <div className="flex gap-2">
              <Input
                value={acInput}
                onChange={(e) => setAcInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAc())}
                placeholder="Kriterium hinzufügen..."
                className="bg-white border-gray-200"
              />
              <Button type="button" variant="outline" size="sm" onClick={addAc}>
                +
              </Button>
            </div>
            {(form.acceptance_criteria || []).length > 0 && (
              <ul className="mt-2 space-y-1">
                {(form.acceptance_criteria || []).map((ac, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="flex-1">- {ac}</span>
                    <button
                      onClick={() => removeAc(i)}
                      className="text-xs text-gray-400 hover:text-red-500"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Agent Instructions */}
          <div>
            <Label>Agent-Anweisungen</Label>
            <Textarea
              value={form.agent_instructions || ""}
              onChange={(e) => setForm((prev) => ({ ...prev, agent_instructions: e.target.value }))}
              placeholder="Schritt-für-Schritt Anweisungen..."
              className="bg-white border-gray-200"
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSubmit} disabled={loading || !form.title?.trim()}>
              {loading ? "Erstelle..." : "Ticket erstellen"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
