"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActorAvatar } from "./ticket-badges";
import {
  ACTORS,
  COMMENT_TYPE_CONFIG,
  type TicketComment,
  type CommentType,
} from "@/types/tickets";

export function TicketComments({
  ticketId,
  comments,
}: {
  ticketId: string;
  comments: TicketComment[];
}) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("stephan");
  const [commentType, setCommentType] = useState<CommentType>("comment");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await fetch(`/api/tickets/${ticketId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, author, comment_type: commentType }),
      });
      setContent("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Kommentare</h3>

      {comments.length === 0 && (
        <p className="text-xs text-gray-400">Noch keine Kommentare</p>
      )}

      <div className="space-y-3">
        {comments.map((comment) => {
          const typeConfig = COMMENT_TYPE_CONFIG[comment.comment_type];
          return (
            <div
              key={comment.id}
              className={`rounded-lg border border-gray-200 bg-white p-3 shadow-[2px_4px_3px_rgba(0,0,0,0.06)] ${
                comment.is_deleted ? "opacity-50 line-through" : ""
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <ActorAvatar actorId={comment.author} />
                <span className="text-xs text-gray-500">{comment.author}</span>
                {typeConfig.icon && (
                  <span className={`text-xs font-mono ${typeConfig.color}`}>
                    {typeConfig.icon} {typeConfig.label}
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleDateString("de-AT")}
                </span>
                {comment.is_deleted && (
                  <span className="text-xs text-red-500">(entfernt)</span>
                )}
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            </div>
          );
        })}
      </div>

      {/* New comment form */}
      <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Kommentar hinzufügen..."
          className="bg-white border-gray-200"
          rows={2}
        />
        <div className="flex items-center gap-2">
          <Select value={author} onValueChange={setAuthor}>
            <SelectTrigger className="w-[130px] bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACTORS.map((a) => (
                <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={commentType} onValueChange={(v) => setCommentType(v as CommentType)}>
            <SelectTrigger className="w-[130px] bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(COMMENT_TYPE_CONFIG) as CommentType[]).map((ct) => (
                <SelectItem key={ct} value={ct}>{COMMENT_TYPE_CONFIG[ct].label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <Button size="sm" onClick={handleSubmit} disabled={loading || !content.trim()}>
            {loading ? "Sende..." : "Senden"}
          </Button>
        </div>
      </div>
    </div>
  );
}
