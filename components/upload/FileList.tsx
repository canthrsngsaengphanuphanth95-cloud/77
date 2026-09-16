"use client";
import type { LabFile } from '../../lib/files/types';
import FileCard from './FileCard';

export default function FileList({ files, onPreview, onRemove }: { files: LabFile[]; onPreview: (file: LabFile) => void; onRemove: (file: LabFile) => void }) {
  if (!files.length) return <div className="file-list-empty">ยังไม่มีไฟล์ — ลากไฟล์มาวางเพื่อเริ่มต้น</div>;
  return <div className="file-list">{files.map((file) => <FileCard key={file.id} file={file} onPreview={() => onPreview(file)} onRemove={() => onRemove(file)} />)}</div>;
}
