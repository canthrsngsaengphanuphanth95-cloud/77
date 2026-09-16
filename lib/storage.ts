export type StorageValue = string | number | boolean | null | Record<string, unknown> | unknown[];

type PuterKV = { get: (key: string) => Promise<unknown>; set: (key: string, value: unknown) => Promise<unknown>; del?: (key: string) => Promise<unknown> };

function requirePuterKV(): PuterKV {
  if (typeof window === 'undefined') throw new Error('Puter KV is not available outside the browser.');
  const puter = (window as Window & { puter?: { kv?: PuterKV } }).puter;
  if (!puter?.kv) throw new Error('Puter KV is not available. Sign in with Puter first.');
  return puter.kv;
}

export async function getStorage<T>(key: string, fallback: T): Promise<T> {
  try { const value = await requirePuterKV().get(key); return value === undefined || value === null || value === '' ? fallback : value as T; } catch { return fallback; }
}
export async function setStorage<T extends StorageValue>(key: string, value: T): Promise<void> { await requirePuterKV().set(key, value); }
export async function removeStorage(key: string): Promise<void> { const kv = requirePuterKV(); if (kv.del) await kv.del(key); else await kv.set(key, ''); }
export async function hasStorage(key: string): Promise<boolean> { const value = await getStorage<unknown>(key, null); return value !== null && value !== undefined && value !== ''; }
