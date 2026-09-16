'use client';

import { useEffect, useState } from 'react';
import { loadSettings, saveSettings, type Settings } from '@/lib/settings';
import { GeneralSection } from './GeneralSection';
import { ModelSection } from './ModelSection';
import { PersonaSection } from './PersonaSection';
import { ConnectionsSection } from './ConnectionsSection';
import { DataSection } from './DataSection';

export function SettingsPanel({ userId }: { userId: string }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('general');

  useEffect(() => { loadSettings(userId).then(setSettings); }, [userId]);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try { await saveSettings(userId, settings); }
    finally { setSaving(false); }
  }

  if (!settings) return <div className="p-6 text-sm opacity-70">กำลังโหลด...</div>;

  const tabs = [
    ['general', 'ทั่วไป'], ['model', 'โมเดล AI'], ['persona', 'Persona'],
    ['connections', 'การเชื่อมต่อ'], ['data', 'ข้อมูล'],
  ];

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">การตั้งค่า</h2>
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" onClick={() => setTab(id)}
            className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap ${tab === id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {tab === 'general' && <GeneralSection s={settings} setS={setSettings} />}
        {tab === 'model' && <ModelSection s={settings} setS={setSettings} />}
        {tab === 'persona' && <PersonaSection s={settings} setS={setSettings} />}
        {tab === 'connections' && <ConnectionsSection s={settings} setS={setSettings} />}
        {tab === 'data' && <DataSection userId={userId} />}
      </div>
      <button type="button" onClick={handleSave} disabled={saving}
        className="mt-6 w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 disabled:opacity-50">
        {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
      </button>
    </div>
  );
}
