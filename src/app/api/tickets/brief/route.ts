import { NextRequest, NextResponse } from "next/server";
import { getTicketBrief } from "@/lib/tickets";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get("status") || undefined,
      assignee: searchParams.get("assignee") || undefined,
      category: searchParams.get("category") || undefined,
    };

    const tickets = getTicketBrief(filters);
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
