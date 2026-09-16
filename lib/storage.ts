export type StorageValue = string | number | boolean | null | Record<string, unknown> | unknown[];

declare global {
  interface Window {
    puter?: {
      kv?: {
        get: (key: string) => Promise<unknown>;
        set: (key: string, value: string) => Promise<unknown>;
        del?: (key: string) => Promise<unknown>;
      };
    };
  }
}

function requirePuterKV() {
  if (typeof window === 'undefined' || !window.puter?.kv) {
    throw new Error('Puter KV is not available. Sign in with Puter first.');
  }
  return window.puter.kv;
}

export async function getStorage<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await requirePuterKV().get(key);
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'string') {
      try { return JSON.parse(value) as T; } catch { return value as T; }
    }
    return value as T;
  } catch {
    return fallback;
  }
}

export async function setStorage<T extends StorageValue>(key: string, value: T): Promise<void> {
  const encoded = typeof value === 'string' ? value : JSON.stringify(value);
  await requirePuterKV().set(key, encoded);
}

export async function removeStorage(key: string): Promise<void> {
  const kv = requirePuterKV();
  if (kv.del) await kv.del(key);
  else await kv.set(key, '');
}

export async function hasStorage(key: string): Promise<boolean> {
  const value = await getStorage<unknown>(key, null);
  return value !== null && value !== undefined && value !== '';
}
