import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_TOKEN;

export async function POST(req: NextRequest) {
  if (!projectId || !token) {
    return NextResponse.json(
      { error: "Sanity nicht konfiguriert" },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Keine Datei" }, { status: 400 });
  }

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/assets/images/${dataset}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": file.type,
      },
      body: file,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "Upload fehlgeschlagen", details: text },
      { status: 500 }
    );
  }

  const data = await res.json();
  const assetId = data.document?._id;

  if (!assetId) {
    return NextResponse.json(
      { error: "Kein Asset-ID erhalten" },
      { status: 500 }
    );
  }

  // Build CDN URL from asset ID (format: "image-{hash}-{WxH}-{ext}")
  const parts = assetId.replace("image-", "").split("-");
  const format = parts.pop();
  const id = parts.join("-");
  const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${format}`;

  return NextResponse.json({
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    url,
  });
}
