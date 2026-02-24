import { NextRequest, NextResponse } from "next/server";
import { getNextTicket } from "@/lib/tickets";
import { computeReadinessScore } from "@/types/tickets";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assignee = searchParams.get("assignee");

    if (!assignee) {
      return NextResponse.json(
        { error: "assignee parameter is required" },
        { status: 400 }
      );
    }

    const ticket = getNextTicket(assignee);

    if (!ticket) {
      return NextResponse.json({
        message: "No workable tickets found",
        ticket: null,
      });
    }

    return NextResponse.json({
      ticket: {
        id: ticket.id,
        ticket_number: ticket.ticket_number,
        title: ticket.title,
        priority: ticket.priority,
        system_category: ticket.system_category,
        output_type: ticket.output_type,
        readiness: computeReadinessScore(ticket),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
