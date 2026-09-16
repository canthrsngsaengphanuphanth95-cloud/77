import type { FileKind } from './types';

const codeExt = new Set(['ts','tsx','js','jsx','mjs','cjs','py','java','go','rs','cpp','c','h','hpp','css','scss','html','vue','svelte','sql','sh','bash','yml','yaml','xml','toml','ini','env','json']);
const textExt = new Set(['txt','log','csv','tsv','rtf']);
const markdownExt = new Set(['md','mdx','markdown']);
const officeExt = new Set(['doc','docx','xls','xlsx','ppt','pptx']);
const archiveExt = new Set(['zip','rar','7z','tar','gz','bz2']);

export function extensionOf(name: string): string {
  return name.toLowerCase().split('.').pop() ?? '';
}

export function detectKind(name: string, mime = ''): FileKind {
  const ext = extensionOf(name);
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  if (mime === 'application/pdf' || ext === 'pdf') return 'pdf';
  if (markdownExt.has(ext) || mime.includes('markdown')) return 'markdown';
  if (officeExt.has(ext) || mime.includes('word') || mime.includes('spreadsheet') || mime.includes('presentation')) return 'office';
  if (archiveExt.has(ext) || mime.includes('zip') || mime.includes('compressed')) return 'archive';
  if (codeExt.has(ext) || mime.startsWith('text/javascript') || mime.includes('json')) return 'code';
  if (textExt.has(ext) || mime.startsWith('text/')) return 'text';
  return 'unknown';
}

export function isPreviewable(kind: FileKind): boolean {
  return kind !== 'archive' && kind !== 'unknown';
}
