export type FileKind = 'image' | 'video' | 'audio' | 'pdf' | 'text' | 'code' | 'markdown' | 'office' | 'archive' | 'unknown';

export interface LabFile {
  id: string;
  name: string;
  path: string;
  size: number;
  mime: string;
  kind: FileKind;
  url?: string;
  createdAt: string;
  source?: 'puter' | 'local';
}

export interface UploadResult {
  file: LabFile;
  raw?: unknown;
}
