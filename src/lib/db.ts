import fs from "fs";
import path from "path";

export interface StoreData {
  tickets: Record<string, unknown>[];
  comments: Record<string, unknown>[];
  history: Record<string, unknown>[];
  dependencies: Record<string, unknown>[];
}

const isVercel = process.env.VERCEL === "1";

// On Vercel: read/write in /tmp, seed from bundled data/tickets.json on cold start
// Locally: read/write directly in data/
const BUNDLED_PATH = path.join(process.cwd(), "data", "tickets.json");
const RUNTIME_PATH = isVercel
  ? "/tmp/tickets.json"
  : path.join(process.cwd(), "data", "tickets.json");

let _cache: StoreData | null = null;

function defaultData(): StoreData {
  return { tickets: [], comments: [], history: [], dependencies: [] };
}

export function loadData(): StoreData {
  if (_cache) return _cache;

  // On Vercel cold start: copy bundled data to /tmp if not already there
  if (isVercel && !fs.existsSync(RUNTIME_PATH) && fs.existsSync(BUNDLED_PATH)) {
    fs.copyFileSync(BUNDLED_PATH, RUNTIME_PATH);
  }

  try {
    if (fs.existsSync(RUNTIME_PATH)) {
      const raw = fs.readFileSync(RUNTIME_PATH, "utf-8");
      _cache = JSON.parse(raw) as StoreData;
      return _cache;
    }
  } catch {
    // corrupt file, start fresh
  }

  _cache = defaultData();
  return _cache;
}

export function saveData(data: StoreData): void {
  _cache = data;
  const dir = path.dirname(RUNTIME_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(RUNTIME_PATH, JSON.stringify(data, null, 2));
}
