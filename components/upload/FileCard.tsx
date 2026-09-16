"use client";
import type { LabFile } from '../../lib/files/types';

export default function FileCard({ file, onPreview, onRemove }: { file: LabFile; onPreview: () => void; onRemove: () => void }) {
  return <div className="file-card" onClick={onPreview}><div className="file-icon">{file.kind === 'image' ? '🖼️' : file.kind === 'video' ? '🎬' : file.kind === 'audio' ? '🎵' : file.kind === 'pdf' ? '📕' : file.kind === 'office' ? '📄' : '📎'}</div><div className="file-meta"><strong>{file.name}</strong><small>{file.kind} · {(file.size / 1024 / 1024).toFixed(2)} MB</small></div><button onClick={(e) => { e.stopPropagation(); onRemove(); }}>×</button></div>;
}
