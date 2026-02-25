import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

// GET: fetch all documents of a given type
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  if (!type) return NextResponse.json({ error: "Missing type" }, { status: 400 });

  const readClient = client || writeClient;
  if (!readClient) return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });

  const orderMap: Record<string, string> = {
    event: "date desc",
    teamMember: "order asc",
    sponsor: "order asc",
    project: "order asc",
  };

  const docs = await readClient.fetch(
    `*[_type == $type] | order(${orderMap[type] || "_createdAt desc"}){ ... }`,
    { type }
  );
  return NextResponse.json(docs);
}

// POST: create or update a document
export async function POST(req: NextRequest) {
  if (!writeClient) {
    return NextResponse.json({ error: "Sanity write token not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { _id, _type, ...fields } = body;

  if (!_type) return NextResponse.json({ error: "Missing _type" }, { status: 400 });

  let doc;
  if (_id) {
    doc = await writeClient.createOrReplace({ _id, _type, ...fields });
  } else {
    doc = await writeClient.create({ _type, ...fields });
  }

  return NextResponse.json(doc);
}

// DELETE: remove a document
export async function DELETE(req: NextRequest) {
  if (!writeClient) {
    return NextResponse.json({ error: "Sanity write token not configured" }, { status: 500 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await writeClient.delete(id);
  return NextResponse.json({ ok: true });
}
