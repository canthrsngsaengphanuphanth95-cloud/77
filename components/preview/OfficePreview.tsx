"use client";
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import JSZip from 'jszip';
import DOMPurify from 'dompurify';

export default function OfficePreview({ src, name }: { src: string; name: string }) {
  const [html,setHtml]=useState('<p>กำลังอ่านไฟล์…</p>');
  useEffect(()=>{(async()=>{try{const ext=name.toLowerCase().split('.').pop(); const buf=await fetch(src).then(r=>r.arrayBuffer());
    if(ext==='docx'||ext==='doc'){const out=await mammoth.convertToHtml({arrayBuffer:buf}); setHtml(DOMPurify.sanitize(out.value)); return;}
    if(ext==='xlsx'||ext==='xls'){const wb=XLSX.read(buf,{type:'array'}); const htmlSheets=wb.SheetNames.map(s=>`<h3>${s}</h3>${XLSX.utils.sheet_to_html(wb.Sheets[s])}`).join(''); setHtml(DOMPurify.sanitize(htmlSheets)); return;}
    if(ext==='pptx'||ext==='ppt'){const zip=await JSZip.loadAsync(buf); const slides=Object.keys(zip.files).filter(x=>/^ppt\/slides\/slide\d+\.xml$/.test(x)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})); let out='<h3>Slides</h3>'; for(const p of slides){const xml=await zip.files[p].async('text'); const texts=[...xml.matchAll(/<a:t>(.*?)<\/a:t>/g)].map(m=>m[1]).join(' '); out+=`<section style="padding:16px;margin:10px 0;border:1px solid #333;border-radius:10px">${texts||'(ไม่มีข้อความ)'}</section>`;} setHtml(DOMPurify.sanitize(out)); return;}
    setHtml('<p>รูปแบบ Office นี้ยังไม่สามารถอ่านตัวอย่างได้โดยตรง</p>');
  }catch{setHtml('<p>พรีวิวไฟล์ Office ไม่สำเร็จ — ดาวน์โหลดไฟล์เพื่อเปิดด้วยโปรแกรมต้นฉบับ</p>');}})()},[src,name]);
  return <div style={{overflow:'auto',maxHeight:'70vh'}} dangerouslySetInnerHTML={{__html:html}} />;
}
