import fs from "fs";
import path from "path";

export interface StoreData {
  tickets: Record<string, unknown>[];
  comments: Record<string, unknown>[];
  history: Record<string, unknown>[];
  dependencies: Record<string, unknown>[];
}

const isVercel = process.env.VERCEL === "1";
const DATA_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "tickets.json");

let _cache: StoreData | null = null;

function defaultData(): StoreData {
  return { tickets: [], comments: [], history: [], dependencies: [] };
}

export function loadData(): StoreData {
  if (_cache) return _cache;
  try {
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, "utf-8");
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
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}
