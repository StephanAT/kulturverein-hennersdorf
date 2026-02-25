"use client";

import { useEditor, EditorContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import { useRef, useCallback } from "react";

const LAYOUT_OPTIONS = [
  { value: "full", label: "Volle Breite" },
  { value: "left", label: "½ Links" },
  { value: "right", label: "½ Rechts" },
];

// --- Image Node View (interactive in editor) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ImageNodeView({ node, updateAttributes, selected }: any) {
  return (
    <NodeViewWrapper
      className={`my-3 ${
        node.attrs.layout === "left"
          ? "max-w-[50%]"
          : node.attrs.layout === "right"
            ? "max-w-[50%] ml-auto"
            : ""
      }`}
    >
      <div className="group relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          className={`w-full rounded ${selected ? "ring-2 ring-brand" : ""}`}
          draggable={false}
        />
        <div
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 rounded-lg bg-white/95 p-1 shadow-lg transition-opacity ${
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {LAYOUT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => updateAttributes({ layout: opt.value })}
              className={`rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${
                node.attrs.layout === opt.value
                  ? "bg-brand text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

// --- Custom Image Extension with layout attribute ---
const ImageWithLayout = ImageExt.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      layout: {
        default: "full",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-layout") || "full",
        renderHTML: (attributes: Record<string, string>) => ({
          "data-layout": attributes.layout,
        }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

// --- Toolbar Button ---
function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-brand text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

// --- Main Component ---
interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ label, value, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      LinkExt.configure({ openOnClick: false }),
      ImageWithLayout.configure({ inline: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none px-3 py-2 min-h-[120px] focus:outline-none text-gray-800 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_p]:text-sm [&_ul]:text-sm [&_ol]:text-sm [&_blockquote]:text-sm [&_a]:text-brand",
      },
    },
  });

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor) return;
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/cms/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Upload fehlgeschlagen");
        const data = await res.json();
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (e) {
        alert(e instanceof Error ? e.message : "Upload-Fehler");
      }
    },
    [editor]
  );

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("URL eingeben:");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-600">{label}</label>
      <div className="rounded border border-gray-300 bg-white">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-0.5 border-b border-gray-200 px-1.5 py-1">
          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            B
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            I
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            H3
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            Liste
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1. 2.
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            Zitat
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("link")}
            onClick={addLink}
          >
            Link
          </ToolbarButton>
          <div className="mx-1 w-px self-stretch bg-gray-200" />
          <ToolbarButton onClick={() => fileInputRef.current?.click()}>
            Bild
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
