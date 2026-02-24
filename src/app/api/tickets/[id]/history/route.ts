import { NextRequest, NextResponse } from "next/server";
import { getHistory } from "@/lib/tickets";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const history = getHistory(id);
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
