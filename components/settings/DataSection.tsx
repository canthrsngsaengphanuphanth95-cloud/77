'use client';
import { resetSettings } from '@/lib/settings';

export function DataSection({ userId }: { userId: string }) {
  async function exportData() {
    const puter = (window as any).puter;
    const settings = await puter?.kv?.get?.(`settings:${userId}`);
    const chat = await puter?.kv?.get?.(`chat:${userId}`);
    const blob = new Blob([JSON.stringify({ settings, chat }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `ai-lab-${userId}-export.json`; a.click(); URL.revokeObjectURL(url);
  }

  return <div className="space-y-4">
    <button type="button" onClick={exportData} className="w-full border rounded-lg px-4 py-2.5">📤 Export ข้อมูล</button>
    <button type="button" onClick={async () => { if (confirm('ล้างประวัติแชททั้งหมด?')) { await (window as any).puter?.kv?.del?.(`chat:${userId}`); alert('ล้างประวัติแล้ว'); } }} className="w-full border rounded-lg px-4 py-2.5 text-red-500">🗑️ ล้างประวัติแชท</button>
    <button type="button" onClick={async () => { if (confirm('รีเซ็ตการตั้งค่าทั้งหมด?')) { await resetSettings(userId); location.reload(); } }} className="w-full border rounded-lg px-4 py-2.5 text-red-500">♻️ รีเซ็ตการตั้งค่า</button>
  </div>;
}
