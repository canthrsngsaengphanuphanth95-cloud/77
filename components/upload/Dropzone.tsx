"use client";
import { useRef, useState } from 'react';

export default function Dropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const accept = (files: FileList | File[]) => onFiles(Array.from(files));
  return <div className={`dropzone ${over ? 'dragging' : ''}`} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); accept(e.dataTransfer.files); }} onPaste={(e) => { const files = Array.from(e.clipboardData.files); if (files.length) accept(files); }} onClick={() => ref.current?.click()} role="button" tabIndex={0}>
    <input ref={ref} hidden type="file" multiple onChange={(e) => e.target.files && accept(e.target.files)} />
    <strong>＋ วางไฟล์ที่นี่</strong><span>ลากวาง · เลือกไฟล์ · Ctrl/Cmd+V</span><small>รูป · วิดีโอ · เสียง · PDF · Office · โค้ด · Markdown · อื่นๆ</small>
  </div>;
}
