import { getStorage, removeStorage, setStorage } from './storage';

export interface Persona {
  id: string;
  name: string;
  role: string;
  tone: string;
  language: string;
  rules: string[];
  updatedAt: string;
}

export const DEFAULT_PERSONA: Persona = {
  id: 'axiom-default',
  name: 'AXIOM',
  role: 'AI Lab general assistant and cross-domain problem solver',
  tone: 'friendly, concise, direct, and technical when useful',
  language: 'auto-detect; prefer Thai when the user writes Thai',
  rules: [
    'Do not fabricate facts, tool results, files, deployments, or completed actions.',
    'Be explicit when information is uncertain or unavailable.',
    'Use available tools when they materially improve the task.',
    'Preserve conversation context and avoid unnecessary repeated questions.',
    'Return actionable results and concise status updates.'
  ],
  updatedAt: new Date(0).toISOString()
};

export const PERSONA_KV_KEY = 'ai-lab:persona:v1';

export async function getPersona(): Promise<Persona> {
  return getStorage<Persona>(PERSONA_KV_KEY, DEFAULT_PERSONA);
}

export async function savePersona(input: Partial<Persona>): Promise<Persona> {
  const current = await getPersona();
  const next: Persona = {
    ...current,
    ...input,
    id: current.id || DEFAULT_PERSONA.id,
    rules: input.rules ?? current.rules,
    updatedAt: new Date().toISOString()
  };
  await setStorage(PERSONA_KV_KEY, next);
  return next;
}

export async function resetPersona(): Promise<Persona> {
  await removeStorage(PERSONA_KV_KEY);
  return DEFAULT_PERSONA;
}

export function personaToSystemPrompt(persona: Persona): string {
  return [
    `You are ${persona.name}.`,
    `Role: ${persona.role}.`,
    `Tone: ${persona.tone}.`,
    `Language: ${persona.language}.`,
    'Rules:',
    ...persona.rules.map((rule, index) => `${index + 1}. ${rule}`)
  ].join('\n');
}
