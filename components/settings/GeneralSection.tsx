'use client';
import type { Settings } from '@/lib/settings';

export function GeneralSection({ s, setS }: { s: Settings; setS: (s: Settings) => void }) {
  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => setS({ ...s, [key]: value });
  const field = 'w-full border rounded-lg px-3 py-2 bg-background';
  return <div className="space-y-4">
    <Field label="ภาษา"><select value={s.language} onChange={e => update('language', e.target.value as Settings['language'])} className={field}><option value="th">ไทย</option><option value="en">English</option><option value="auto">อัตโนมัติ</option></select></Field>
    <Field label="ธีม"><select value={s.theme} onChange={e => update('theme', e.target.value as Settings['theme'])} className={field}><option value="light">สว่าง</option><option value="dark">มืด</option><option value="system">ตามระบบ</option></select></Field>
    <Field label="ขนาดตัวอักษร"><select value={s.fontSize} onChange={e => update('fontSize', e.target.value as Settings['fontSize'])} className={field}><option value="sm">เล็ก</option><option value="md">กลาง</option><option value="lg">ใหญ่</option></select></Field>
  </div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div><label className="block text-sm mb-1">{label}</label>{children}</div>; }
