import { NextRequest, NextResponse } from "next/server";
import { sanityFetch, sanityMutate } from "@/lib/sanity";

export const dynamic = "force-dynamic";

const ORDER_MAP: Record<string, string> = {
  event: "date desc",
  teamMember: "order asc",
  sponsor: "order asc",
  project: "order asc",
};

// GET: fetch all documents of a given type
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  if (!type) return NextResponse.json({ error: "Missing type" }, { status: 400 });

  const docs = await sanityFetch(
    `*[_type == "${type}"] | order(${ORDER_MAP[type] || "_createdAt desc"}){ ... }`
  );
  return NextResponse.json(docs);
}

// POST: create or update a document
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { _id, ...rest } = body;

  if (!rest._type) return NextResponse.json({ error: "Missing _type" }, { status: 400 });

  const mutation = _id
    ? { createOrReplace: { _id, ...rest } }
    : { create: rest };

  const result = await sanityMutate([mutation]);
  if (!result) return NextResponse.json({ error: "Sanity write failed" }, { status: 500 });

  return NextResponse.json(result);
}

// DELETE: remove a document
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const result = await sanityMutate([{ delete: { id } }]);
  if (!result) return NextResponse.json({ error: "Sanity delete failed" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
