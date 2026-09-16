import { detectKind } from './detect';
import type { FileKind, LabFile } from './types';

export interface PreviewDescriptor { kind: FileKind; component: string; downloadable: boolean; }

export function getPreviewDescriptor(file: Pick<LabFile, 'name' | 'mime' | 'kind'>): PreviewDescriptor {
  const kind = file.kind || detectKind(file.name, file.mime);
  const component: Record<FileKind, string> = {
    image: 'ImagePreview', video: 'VideoPreview', audio: 'AudioPreview', pdf: 'PdfPreview', text: 'TextPreview', code: 'CodePreview', markdown: 'MarkdownPreview', office: 'OfficePreview', archive: 'FallbackPreview', unknown: 'FallbackPreview'
  };
  return { kind, component: component[kind], downloadable: true };
}
