"use client";

import { useState, useEffect, useCallback } from "react";

type Tab = "event" | "teamMember" | "sponsor" | "project";

const TABS: { key: Tab; label: string }[] = [
  { key: "event", label: "Events" },
  { key: "teamMember", label: "Team" },
  { key: "sponsor", label: "Sponsoren" },
  { key: "project", label: "Projekte" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EventForm({ item, onSave, onCancel }: { item?: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(item?.title || "");
  const [date, setDate] = useState(item?.date?.slice(0, 16) || "");
  const [location, setLocation] = useState(item?.location || "");
  const [description, setDescription] = useState(item?.description || "");

  return (
    <div className="space-y-3">
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Titel *" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Ort" value={location} onChange={(e) => setLocation(e.target.value)} />
      <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm" rows={3} placeholder="Beschreibung" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!title || !date) return alert("Titel und Datum sind Pflichtfelder.");
            onSave({
              ...(item?._id ? { _id: item._id } : {}),
              _type: "event",
              title,
              slug: { _type: "slug", current: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") },
              date: new Date(date).toISOString(),
              location: location || undefined,
              description: description || undefined,
            });
          }}
          className="rounded bg-brand px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Speichern
        </button>
        <button onClick={onCancel} className="rounded border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          Abbrechen
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TeamForm({ item, onSave, onCancel }: { item?: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [name, setName] = useState(item?.name || "");
  const [role, setRole] = useState(item?.role || "");
  const [email, setEmail] = useState(item?.email || "");
  const [order, setOrder] = useState(item?.order || 100);

  return (
    <div className="space-y-3">
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Rolle (z.B. Obmann)" value={role} onChange={(e) => setRole(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="E-Mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-24 rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Reihenfolge" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!name) return alert("Name ist ein Pflichtfeld.");
            onSave({
              ...(item?._id ? { _id: item._id } : {}),
              _type: "teamMember",
              name,
              role: role || undefined,
              email: email || undefined,
              order,
            });
          }}
          className="rounded bg-brand px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Speichern
        </button>
        <button onClick={onCancel} className="rounded border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          Abbrechen
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SponsorForm({ item, onSave, onCancel }: { item?: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [name, setName] = useState(item?.name || "");
  const [website, setWebsite] = useState(item?.website || "");
  const [tier, setTier] = useState(item?.tier || "partner");
  const [order, setOrder] = useState(item?.order || 100);

  return (
    <div className="space-y-3">
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Website URL" value={website} onChange={(e) => setWebsite(e.target.value)} />
      <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm" value={tier} onChange={(e) => setTier(e.target.value)}>
        <option value="hauptsponsor">Hauptsponsor</option>
        <option value="sponsor">Sponsor</option>
        <option value="partner">Partner</option>
        <option value="foerderer">Förderer</option>
      </select>
      <input className="w-24 rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Reihenfolge" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!name) return alert("Name ist ein Pflichtfeld.");
            onSave({
              ...(item?._id ? { _id: item._id } : {}),
              _type: "sponsor",
              name,
              website: website || undefined,
              tier,
              order,
            });
          }}
          className="rounded bg-brand px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Speichern
        </button>
        <button onClick={onCancel} className="rounded border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          Abbrechen
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectForm({ item, onSave, onCancel }: { item?: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(item?.title || "");
  const [category, setCategory] = useState(item?.category || "Sonstiges");
  const [description, setDescription] = useState(item?.description || "");
  const [externalUrl, setExternalUrl] = useState(item?.externalUrl || "");
  const [order, setOrder] = useState(item?.order || 100);

  return (
    <div className="space-y-3">
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Titel *" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Martha Theater">Martha Theater</option>
        <option value="Kasperltheater">Kasperltheater</option>
        <option value="Dorferneuerung">Dorferneuerung</option>
        <option value="Schulprojekt">Schulprojekt</option>
        <option value="Sonstiges">Sonstiges</option>
      </select>
      <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm" rows={3} placeholder="Beschreibung" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Externe URL" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} />
      <input className="w-24 rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Reihenfolge" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!title) return alert("Titel ist ein Pflichtfeld.");
            onSave({
              ...(item?._id ? { _id: item._id } : {}),
              _type: "project",
              title,
              slug: { _type: "slug", current: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") },
              category,
              description: description || undefined,
              externalUrl: externalUrl || undefined,
              isActive: true,
              order,
            });
          }}
          className="rounded bg-brand px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Speichern
        </button>
        <button onClick={onCancel} className="rounded border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          Abbrechen
        </button>
      </div>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("de-AT", { day: "numeric", month: "short", year: "numeric" });
}

const TIER_LABELS: Record<string, string> = {
  hauptsponsor: "Hauptsponsor",
  sponsor: "Sponsor",
  partner: "Partner",
  foerderer: "Förderer",
};

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>("event");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms?type=${tab}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, [tab]);

  useEffect(() => {
    setEditing(null);
    setCreating(false);
    load();
  }, [load]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (data: any) => {
    await fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setEditing(null);
    setCreating(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Wirklich löschen?")) return;
    await fetch(`/api/cms?id=${id}`, { method: "DELETE" });
    load();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderForm = (item?: any) => {
    const props = { item, onSave: handleSave, onCancel: () => { setEditing(null); setCreating(false); } };
    switch (tab) {
      case "event": return <EventForm {...props} />;
      case "teamMember": return <TeamForm {...props} />;
      case "sponsor": return <SponsorForm {...props} />;
      case "project": return <ProjectForm {...props} />;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderItem = (item: any) => {
    if (editing?._id === item._id) {
      return <div key={item._id} className="rounded-lg border border-brand/30 bg-brand/5 p-4">{renderForm(item)}</div>;
    }

    return (
      <div key={item._id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-800 truncate">
            {item.title || item.name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {tab === "event" && item.date && formatDate(item.date)}
            {tab === "event" && item.location && ` · ${item.location}`}
            {tab === "teamMember" && item.role}
            {tab === "sponsor" && TIER_LABELS[item.tier]}
            {tab === "project" && item.category}
          </p>
        </div>
        <div className="flex gap-1 ml-4 flex-shrink-0">
          <button
            onClick={() => setEditing(item)}
            className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            Bearbeiten
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            Löschen
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Inhalte verwalten</h1>
        {!creating && !editing && (
          <button
            onClick={() => setCreating(true)}
            className="rounded bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
          >
            + Neu
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-gray-100 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
              tab === t.key
                ? "bg-white font-medium text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Create form */}
      {creating && (
        <div className="mb-4 rounded-lg border border-brand/30 bg-brand/5 p-4">
          <p className="mb-3 text-sm font-medium text-gray-800">Neuer Eintrag</p>
          {renderForm()}
        </div>
      )}

      {/* Items */}
      {loading ? (
        <p className="py-8 text-center text-sm text-gray-400">Laden…</p>
      ) : items.length === 0 && !creating ? (
        <p className="py-8 text-center text-sm text-gray-400">Keine Einträge vorhanden.</p>
      ) : (
        <div className="space-y-2">{items.map(renderItem)}</div>
      )}
    </div>
  );
}
