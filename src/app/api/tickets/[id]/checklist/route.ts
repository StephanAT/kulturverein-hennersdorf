import { NextRequest, NextResponse } from "next/server";
import { toggleChecklistItem } from "@/lib/tickets";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.index === undefined || body.done === undefined) {
      return NextResponse.json(
        { error: "index and done are required" },
        { status: 400 }
      );
    }

    const ticket = toggleChecklistItem(id, body.index, body.done);
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
