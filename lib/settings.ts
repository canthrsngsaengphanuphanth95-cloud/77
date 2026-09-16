import { getStorage, setStorage, removeStorage } from './storage';

export type Settings = {
  language: 'th' | 'en' | 'auto';
  theme: 'light' | 'dark' | 'system';
  fontSize: 'sm' | 'md' | 'lg';
  defaultModel: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  assistantName: string;
  tone: 'polite' | 'casual' | 'concise' | 'academic';
  customRules: string;
  mcpEnabled: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  language: 'th',
  theme: 'system',
  fontSize: 'md',
  defaultModel: 'gpt-5-nano',
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: '',
  assistantName: 'AI Lab',
  tone: 'polite',
  customRules: '',
  mcpEnabled: true,
};

const key = (userId: string) => `settings:${userId}`;

export async function loadSettings(userId: string): Promise<Settings> {
  const saved = await getStorage<Partial<Settings> | null>(key(userId), null);
  return { ...DEFAULT_SETTINGS, ...(saved ?? {}) };
}

export async function saveSettings(userId: string, settings: Settings): Promise<void> {
  await setStorage(key(userId), settings);
}

export async function resetSettings(userId: string): Promise<void> {
  await removeStorage(key(userId));
}
