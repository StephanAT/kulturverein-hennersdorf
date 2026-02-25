/**
 * Pure fetch()-based Sanity helper — no next-sanity imports, no build-time evaluation.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T = any>(
  query: string,
  params?: Record<string, string>
): Promise<T[]> {
  if (!projectId) return [];
  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
  );
  url.searchParams.set("query", query);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.result ?? [];
  } catch {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityMutate(mutations: any[]): Promise<any> {
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !token) return null;
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    }
  );
  if (!res.ok) return null;
  return res.json();
}

/**
 * Build a Sanity image CDN URL from an image reference.
 * ref.asset._ref format: "image-{id}-{WxH}-{format}"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanityImageUrl(ref: any, width?: number): string | null {
  if (!ref?.asset?._ref || !projectId) return null;
  const parts = ref.asset._ref.replace("image-", "").split("-");
  const format = parts.pop();
  const id = parts.join("-");
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${format}`;
  if (width) url += `?w=${width}&fit=max`;
  return url;
}
