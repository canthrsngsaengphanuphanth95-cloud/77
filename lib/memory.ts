import { getStorage, removeStorage, setStorage } from './storage';

export interface MemoryItem {
  id: string;
  content: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

const MEMORY_KEY = 'ai-lab:memory:v1';

export async function getMemories(): Promise<MemoryItem[]> {
  return getStorage<MemoryItem[]>(MEMORY_KEY, []);
}

export async function addMemory(content: string, source = 'chat'): Promise<MemoryItem> {
  const memories = await getMemories();
  const now = new Date().toISOString();
  const item: MemoryItem = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    content: content.trim(),
    source,
    createdAt: now,
    updatedAt: now
  };
  if (!item.content) throw new Error('Memory content cannot be empty.');
  await setStorage(MEMORY_KEY, [...memories, item]);
  return item;
}

export async function removeMemory(id: string): Promise<void> {
  const memories = await getMemories();
  await setStorage(MEMORY_KEY, memories.filter((item) => item.id !== id));
}

export async function clearMemories(): Promise<void> {
  await removeStorage(MEMORY_KEY);
}

export function buildMemoryContext(memories: MemoryItem[], maxItems = 12): string {
  return memories.slice(-maxItems).map((item) => `- ${item.content}`).join('\n');
}
