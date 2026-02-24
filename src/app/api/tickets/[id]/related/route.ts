import { NextRequest, NextResponse } from "next/server";
import { getRelatedTickets } from "@/lib/tickets";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const related = getRelatedTickets(id);
    return NextResponse.json(related);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
