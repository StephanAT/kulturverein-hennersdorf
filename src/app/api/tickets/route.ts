import { NextRequest, NextResponse } from "next/server";
import { getTickets, createTicket } from "@/lib/tickets";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get("status") || undefined,
      priority: searchParams.get("priority") || undefined,
      type: searchParams.get("type") || undefined,
      category: searchParams.get("category") || undefined,
      assignee: searchParams.get("assignee") || undefined,
      parent_id: searchParams.get("parent_id") || undefined,
      top_level: searchParams.has("top_level") || undefined,
      search: searchParams.get("search") || undefined,
    };

    const tickets = getTickets(filters);
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.system_category) {
      return NextResponse.json(
        { error: "title and system_category are required" },
        { status: 400 }
      );
    }

    const ticket = createTicket(body);
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
