"use client";
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function MarkdownPreview({ src }: { src: string }) { const [text,setText]=useState('Loading…'); useEffect(()=>{fetch(src).then(r=>r.text()).then(setText).catch(()=>setText('อ่าน Markdown ไม่สำเร็จ'));},[src]); return <article style={{overflow:'auto',maxHeight:'70vh'}}><ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown></article>; }
