import { getStorage, setStorage } from '../storage';
import { detectKind } from './detect';
import type { LabFile, UploadResult } from './types';

type PuterFS = { upload: (items: FileList | File[] | File, dir?: string, options?: Record<string, unknown>) => Promise<unknown>; getReadURL?: (path: string) => Promise<string>; delete?: (path: string) => Promise<void> };
function fs(): PuterFS { if (typeof window === 'undefined') throw new Error('Puter FS is browser-only.'); const puter = (window as Window & { puter?: { fs?: PuterFS } }).puter; if (!puter?.fs) throw new Error('Puter FS is not available. Sign in with Puter first.'); return puter.fs; }
const INDEX_KEY = 'ai-lab:files:v1';
const uuid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export async function listUploadedFiles(): Promise<LabFile[]> { return getStorage<LabFile[]>(INDEX_KEY, []); }
async function saveIndex(file: LabFile) { const current = await listUploadedFiles(); await setStorage(INDEX_KEY, [file, ...current.filter((x) => x.id !== file.id)]); }
export async function uploadFile(file: File, dir = 'AI-Lab/uploads'): Promise<UploadResult> { const api = fs(); const raw = await api.upload([file], dir, { createMissingParents: true, dedupeName: true }); const item = (Array.isArray(raw) ? raw[0] : raw) as Record<string, unknown>; const path = String(item?.path ?? `${dir}/${file.name}`); const url = api.getReadURL ? await api.getReadURL(path) : undefined; const labFile: LabFile = { id: uuid(), name: file.name, path, size: file.size, mime: file.type || 'application/octet-stream', kind: detectKind(file.name, file.type), url, createdAt: new Date().toISOString(), source: 'puter' }; await saveIndex(labFile); return { file: labFile, raw }; }
export async function removeUploadedFile(file: LabFile): Promise<void> { const api = fs(); if (api.delete) await api.delete(file.path); const current = await listUploadedFiles(); await setStorage(INDEX_KEY, current.filter((x) => x.id !== file.id)); }
