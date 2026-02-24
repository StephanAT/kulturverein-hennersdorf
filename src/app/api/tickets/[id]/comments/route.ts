import { NextRequest, NextResponse } from "next/server";
import { getComments, addComment } from "@/lib/tickets";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = getComments(id);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 }
      );
    }

    const comment = addComment({
      ticket_id: id,
      content: body.content,
      author: body.author || "system",
      comment_type: body.comment_type || "comment",
      parent_comment_id: body.parent_comment_id || null,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
