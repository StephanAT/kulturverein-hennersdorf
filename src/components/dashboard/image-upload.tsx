"use client";

import { useState, useRef, useCallback } from "react";

interface SanityImageRef {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
}

interface ImageUploadProps {
  label: string;
  value?: SanityImageRef | null;
  onChange: (ref: SanityImageRef | null) => void;
}

function imagePreviewUrl(ref: SanityImageRef | null | undefined): string | null {
  if (!ref?.asset?._ref) return null;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId) return null;
  const parts = ref.asset._ref.replace("image-", "").split("-");
  const format = parts.pop();
  const id = parts.join("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${format}?w=300&fit=max`;
}

export default function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/cms/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Upload fehlgeschlagen");
        const ref: SanityImageRef = await res.json();
        onChange(ref);
      } catch (e) {
        alert(e instanceof Error ? e.message : "Upload-Fehler");
      }
      setUploading(false);
    },
    [onChange]
  );

  const handleFile = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Bitte nur Bilddateien hochladen.");
      return;
    }
    upload(file);
  };

  const previewUrl = imagePreviewUrl(value);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600">{label}</label>

      {previewUrl && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Vorschau"
            className="h-24 rounded border border-gray-200 object-contain"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white hover:bg-red-600"
          >
            x
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded border-2 border-dashed px-4 py-3 text-center text-xs transition-colors ${
          dragOver
            ? "border-brand bg-brand/5 text-brand"
            : "border-gray-300 text-gray-400 hover:border-gray-400"
        }`}
      >
        {uploading ? (
          "Wird hochgeladen..."
        ) : (
          <>Bild hierher ziehen oder <span className="underline">auswählen</span></>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />
    </div>
  );
}
