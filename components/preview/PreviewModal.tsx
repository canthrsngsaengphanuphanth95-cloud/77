"use client";
import type { LabFile } from '../../lib/files/types';
import { getPreviewDescriptor } from '../../lib/files/preview';
import ImagePreview from './ImagePreview';
import TextPreview from './TextPreview';
import CodePreview from './CodePreview';
import MarkdownPreview from './MarkdownPreview';
import PdfPreview from './PdfPreview';
import VideoPreview from './VideoPreview';
import AudioPreview from './AudioPreview';
import OfficePreview from './OfficePreview';
import FallbackPreview from './FallbackPreview';

export default function PreviewModal({ file, onClose }: { file?: LabFile; onClose: () => void }) {
  if (!file || !file.url) return null;
  const { kind } = getPreviewDescriptor(file);
  const body = kind==='image' ? <ImagePreview src={file.url} alt={file.name}/> : kind==='video' ? <VideoPreview src={file.url}/> : kind==='audio' ? <AudioPreview src={file.url}/> : kind==='pdf' ? <PdfPreview src={file.url}/> : kind==='markdown' ? <MarkdownPreview src={file.url}/> : kind==='code' ? <CodePreview src={file.url}/> : kind==='text' ? <TextPreview src={file.url}/> : kind==='office' ? <OfficePreview src={file.url} name={file.name}/> : <FallbackPreview src={file.url} name={file.name}/>;
  return <div className="preview-backdrop" role="dialog" aria-modal="true" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><div className="preview-modal"><header><strong>{file.name}</strong><div><a href={file.url} download={file.name} target="_blank" rel="noreferrer">⬇</a><button onClick={onClose}>×</button></div></header><div className="preview-body">{body}</div></div></div>;
}
