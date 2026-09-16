'use client';
import type { Settings } from '@/lib/settings';

export function PersonaSection({ s, setS }: { s: Settings; setS: (s: Settings) => void }) {
  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => setS({ ...s, [key]: value });
  const input = 'w-full border rounded-lg px-3 py-2 bg-background';
  return <div className="space-y-4">
    <div><label className="block text-sm mb-1">ชื่อ Assistant</label><input value={s.assistantName} onChange={e => update('assistantName', e.target.value)} className={input} /></div>
    <div><label className="block text-sm mb-1">โทนการตอบ</label><select value={s.tone} onChange={e => update('tone', e.target.value as Settings['tone'])} className={input}><option value="polite">สุภาพ</option><option value="casual">กันเอง</option><option value="concise">กระชับ</option><option value="academic">วิชาการ</option></select></div>
    <div><label className="block text-sm mb-1">กฎพิเศษ</label><textarea value={s.customRules} onChange={e => update('customRules', e.target.value)} rows={4} className={input} placeholder="เช่น ตอบเป็นไทยเสมอ, ห้ามเดา" /></div>
  </div>;
}
