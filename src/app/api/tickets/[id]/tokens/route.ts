import { NextRequest, NextResponse } from "next/server";
import { reportTokenUsage, setTokenBudget } from "@/lib/tickets";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.tokens_used) {
      return NextResponse.json(
        { error: "tokens_used is required" },
        { status: 400 }
      );
    }

    const result = reportTokenUsage(id, body.tokens_used);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.token_budget) {
      return NextResponse.json(
        { error: "token_budget is required" },
        { status: 400 }
      );
    }

    const result = setTokenBudget(id, body.token_budget);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
