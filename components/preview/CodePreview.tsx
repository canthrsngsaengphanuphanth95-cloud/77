"use client";
import { useEffect, useState } from 'react';
export default function CodePreview({ src }: { src: string }) { const [text,setText]=useState('Loading…'); useEffect(()=>{ fetch(src).then(r=>r.text()).then(setText).catch(()=>setText('อ่านโค้ดไม่สำเร็จ')); },[src]); return <pre style={{whiteSpace:'pre',overflow:'auto',maxHeight:'70vh',margin:0,fontFamily:'ui-monospace,SFMono-Regular,monospace',fontSize:13,lineHeight:1.6}}>{text}</pre>; }
