'use client';
import type { Settings } from '@/lib/settings';

export function ConnectionsSection({ s, setS }: { s: Settings; setS: (s: Settings) => void }) {
  return <div className="space-y-4">
    <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer"><input type="checkbox" checked={s.mcpEnabled} onChange={e => setS({ ...s, mcpEnabled: e.target.checked })} /><span><span className="block text-sm">เปิดใช้ MCP Servers</span><span className="block text-xs opacity-60">ควบคุมการใช้งาน MCP จาก workspace</span></span></label>
    <div className="border rounded-lg p-3"><p className="text-sm">🐙 GitHub MCP</p><p className="text-xs opacity-60">สถานะ: {s.mcpEnabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</p></div>
    <div className="border rounded-lg p-3"><p className="text-sm">🔐 Puter Login</p><p className="text-xs opacity-60">สถานะการเชื่อมต่อจะตรวจจาก Puter session ใน workspace</p></div>
  </div>;
}
