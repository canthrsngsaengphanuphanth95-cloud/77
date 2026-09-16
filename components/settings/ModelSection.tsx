'use client';
import type { Settings } from '@/lib/settings';

export function ModelSection({ s, setS }: { s: Settings; setS: (s: Settings) => void }) {
  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => setS({ ...s, [key]: value });
  const input = 'w-full border rounded-lg px-3 py-2 bg-background';
  return <div className="space-y-4">
    <div><label className="block text-sm mb-1">โมเดลเริ่มต้น</label><input value={s.defaultModel} onChange={e => update('defaultModel', e.target.value)} className={input} /></div>
    <div><label className="block text-sm mb-1">Temperature: {s.temperature.toFixed(1)}</label><input type="range" min="0" max="2" step="0.1" value={s.temperature} onChange={e => update('temperature', Number(e.target.value))} className="w-full" /></div>
    <div><label className="block text-sm mb-1">Max Tokens</label><input type="number" min="1" value={s.maxTokens} onChange={e => update('maxTokens', Math.max(1, Number(e.target.value)))} className={input} /></div>
    <div><label className="block text-sm mb-1">System Prompt</label><textarea value={s.systemPrompt} onChange={e => update('systemPrompt', e.target.value)} rows={5} className={input} placeholder="กำหนดคำสั่งระบบสำหรับ AI" /></div>
  </div>;
}
