"use client";
import { useEffect, useState } from 'react';
export default function TextPreview({ src }: { src: string }) { const [text,setText]=useState('Loading…'); useEffect(()=>{ fetch(src).then(r=>r.text()).then(setText).catch(()=>setText('อ่านไฟล์ไม่สำเร็จ')); },[src]); return <pre style={{whiteSpace:'pre-wrap',overflow:'auto',maxHeight:'70vh',margin:0}}>{text}</pre>; }
