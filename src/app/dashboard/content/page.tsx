"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import ImageUpload from "@/components/dashboard/image-upload";

const RichTextEditor = lazy(() => import("@/components/dashboard/rich-text-editor"));

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
  const [slugVal, setSlugVal] = useState(item?.slug?.current || "");
  const [date, setDate] = useState(item?.date?.slice(0, 16) || "");
  const [endDate, setEndDate] = useState(item?.endDate?.slice(0, 16) || "");
  const [location, setLocation] = useState(item?.location || "");
  const [address, setAddress] = useState(item?.address || "");
  const [description, setDescription] = useState(item?.description || "");
  const [price, setPrice] = useState(item?.price || "");
  const [organizer, setOrganizer] = useState(item?.organizer || "Kulturverein Hennersdorf");
  const [contact, setContact] = useState(item?.contact || "office@kulturverein-hennersdorf.at");
  const [externalLink, setExternalLink] = useState(item?.externalLink || "");
  const [image, setImage] = useState(item?.image || null);
  const [galleryImages, setGalleryImages] = useState<(typeof image)[]>(item?.gallery || []);
  const [bodyHtml, setBodyHtml] = useState(item?.bodyHtml || "");

  const autoSlug = (n: string) =>
    n.toLowerCase().replace(/\u00E4/g, "ae").replace(/\u00F6/g, "oe").replace(/\u00FC/g, "ue").replace(/\u00DF/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "").replace(/^-+/, "");

  const addGalleryImage = (ref: typeof image) => {
    if (ref) setGalleryImages((prev) => [...prev, ref]);
  };

  const removeGalleryImage = (idx: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Titel *" value={title} onChange={(e) => { setTitle(e.target.value); if (!item?._id) setSlugVal(autoSlug(e.target.value)); }} />
      <div>
        <label className="mb-1 block text-xs text-gray-500">Slug (URL-Pfad)</label>
        <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm font-mono" placeholder="z-b-event-name" value={slugVal} onChange={(e) => setSlugVal(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-500">Datum & Uhrzeit *</label>
          <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">Enddatum (optional)</label>
          <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-500">Veranstaltungsort</label>
          <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. Kulturzentrum 9er Haus" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">Adresse (f&uuml;r Karte)</label>
          <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. Bachgasse 9, 2332 Hennersdorf" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>

      <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm" rows={2} placeholder="Kurzbeschreibung" value={description} onChange={(e) => setDescription(e.target.value)} />

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-500">Eintritt / Preis</label>
          <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. Freier Eintritt" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">Veranstalter</label>
          <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Kulturverein Hennersdorf" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">Kontakt</label>
          <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="E-Mail oder Telefon" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">Externer Link (Ticket-Shop, Website, ...)</label>
        <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="https://..." value={externalLink} onChange={(e) => setExternalLink(e.target.value)} />
      </div>

      <ImageUpload label="Hauptbild" value={image} onChange={setImage} />

      {/* Gallery */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">Bildergalerie</label>
        {galleryImages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative">
                <div className="h-16 w-16 rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                  Bild {i + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-white hover:bg-red-600"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
        <ImageUpload
          label="Bild zur Galerie hinzuf\u00FCgen"
          value={null}
          onChange={addGalleryImage}
        />
      </div>

      <Suspense fallback={<div className="h-32 rounded border border-gray-200 bg-gray-50 animate-pulse" />}>
        <RichTextEditor label="Detailbeschreibung (Rich Text)" value={bodyHtml} onChange={setBodyHtml} />
      </Suspense>

      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!title || !date) return alert("Titel und Datum sind Pflichtfelder.");
            const slug = slugVal || autoSlug(title);
            onSave({
              ...(item?._id ? { _id: item._id } : {}),
              _type: "event",
              title,
              slug: { _type: "slug", current: slug },
              date: new Date(date).toISOString(),
              endDate: endDate ? new Date(endDate).toISOString() : undefined,
              location: location || undefined,
              address: address || undefined,
              description: description || undefined,
              price: price || undefined,
              organizer: organizer || undefined,
              contact: contact || undefined,
              externalLink: externalLink || undefined,
              image: image || undefined,
              gallery: galleryImages.length > 0 ? galleryImages : undefined,
              bodyHtml: bodyHtml || undefined,
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
  const [photo, setPhoto] = useState(item?.photo || null);

  return (
    <div className="space-y-3">
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Rolle (z.B. Obmann)" value={role} onChange={(e) => setRole(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="E-Mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-24 rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Reihenfolge" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <ImageUpload label="Portraitfoto" value={photo} onChange={setPhoto} />
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
              photo: photo || undefined,
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
  const [slugVal, setSlugVal] = useState(item?.slug?.current || "");
  const [website, setWebsite] = useState(item?.website || "");
  const [tier, setTier] = useState(item?.tier || "partner");
  const [description, setDescription] = useState(item?.description || "");
  const [order, setOrder] = useState(item?.order || 100);
  const [logo, setLogo] = useState(item?.logo || null);
  const [bodyHtml, setBodyHtml] = useState(item?.bodyHtml || "");

  const autoSlug = (n: string) =>
    n.toLowerCase().replace(/\u00E4/g, "ae").replace(/\u00F6/g, "oe").replace(/\u00FC/g, "ue").replace(/\u00DF/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "").replace(/^-+/, "");

  return (
    <div className="space-y-3">
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Name *" value={name} onChange={(e) => { setName(e.target.value); if (!item?._id) setSlugVal(autoSlug(e.target.value)); }} />
      <div>
        <label className="mb-1 block text-xs text-gray-500">Slug (URL-Pfad)</label>
        <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm font-mono" placeholder="z-b-firmenname" value={slugVal} onChange={(e) => setSlugVal(e.target.value)} />
      </div>
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Website URL" value={website} onChange={(e) => setWebsite(e.target.value)} />
      <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm" value={tier} onChange={(e) => setTier(e.target.value)}>
        <option value="hauptsponsor">Hauptsponsor</option>
        <option value="sponsor">Sponsor</option>
        <option value="foerderer">F\u00F6rderer</option>
        <option value="partner">Partner</option>
      </select>
      <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm" rows={2} placeholder="Kurzbeschreibung (f\u00FCr \u00DCbersichtsseite)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="w-24 rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Reihenfolge" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <ImageUpload label="Logo" value={logo} onChange={setLogo} />
      <Suspense fallback={<div className="h-32 rounded border border-gray-200 bg-gray-50 animate-pulse" />}>
        <RichTextEditor label="Ausf\u00FChrliche Beschreibung (Detailseite)" value={bodyHtml} onChange={setBodyHtml} />
      </Suspense>
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!name) return alert("Name ist ein Pflichtfeld.");
            const slug = slugVal || autoSlug(name);
            onSave({
              ...(item?._id ? { _id: item._id } : {}),
              _type: "sponsor",
              name,
              slug: { _type: "slug", current: slug },
              website: website || undefined,
              tier,
              description: description || undefined,
              order,
              logo: logo || undefined,
              bodyHtml: bodyHtml || undefined,
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
  const [mainImage, setMainImage] = useState(item?.mainImage || null);
  const [bodyHtml, setBodyHtml] = useState(item?.bodyHtml || "");

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
      <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm" rows={2} placeholder="Kurzbeschreibung" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Externe URL" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} />
      <input className="w-24 rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Reihenfolge" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <ImageUpload label="Projektbild" value={mainImage} onChange={setMainImage} />
      <Suspense fallback={<div className="h-32 rounded border border-gray-200 bg-gray-50 animate-pulse" />}>
        <RichTextEditor label="Artikel (Rich Text)" value={bodyHtml} onChange={setBodyHtml} />
      </Suspense>
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
              mainImage: mainImage || undefined,
              bodyHtml: bodyHtml || undefined,
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
            {tab === "event" && item.price && ` · ${item.price}`}
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
