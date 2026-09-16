"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type Agent = "General" | "Coder" | "Researcher";
type Attachment = { name: string; url: string; type: string };
type Message = { role: "user" | "assistant"; text: string; attachment?: Attachment };

declare global {
  interface Window {
    puter?: {
      auth?: {
        signIn?: () => Promise<unknown>;
        signOut?: () => Promise<unknown>;
        isSignedIn?: () => Promise<boolean>;
        getUser?: () => Promise<unknown>;
      };
      ai?: { chat?: (prompt: string) => Promise<unknown> };
    };
  }
}

const agents: { name: Agent; icon: string; desc: string }[] = [
  { name: "General", icon: "🤖", desc: "ถามตอบ วิเคราะห์ และงานทั่วไป" },
  { name: "Coder", icon: "</>", desc: "เขียนโค้ด แก้บั๊ก GitHub และ Deploy" },
  { name: "Researcher", icon: "⌕", desc: "ค้นคว้า วิเคราะห์ข้อมูล และสรุป" },
];

export default function Home() {
  const [puterReady, setPuterReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [agent, setAgent] = useState<Agent>("General");
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<Attachment>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = async () => {
      setPuterReady(true);
      try {
        if (window.puter?.auth?.isSignedIn) setSignedIn(await window.puter.auth.isSignedIn());
      } catch {}
    };
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const login = async () => {
    if (!window.puter?.auth?.signIn) return;
    try {
      await window.puter.auth.signIn();
      setSignedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") && !file.type.startsWith("text/")) return;
    if (file.size > 10 * 1024 * 1024) return alert("ไฟล์ต้องมีขนาดไม่เกิน 10 MB");
    const reader = new FileReader();
    reader.onload = () => setAttachment({ name: file.name, url: String(reader.result), type: file.type });
    reader.readAsDataURL(file);
  };

  const send = async () => {
    const text = input.trim();
    if (!text && !attachment) return;
    const currentAttachment = attachment;
    setMessages((m) => [...m, { role: "user", text: text || "วิเคราะห์ไฟล์นี้ให้หน่อย", attachment: currentAttachment }]);
    setInput("");
    setAttachment(undefined);
    setBusy(true);

    try {
      if (window.puter?.ai?.chat) {
        const result = await window.puter.ai.chat(`[${agent} Agent] ${text || "วิเคราะห์ไฟล์ที่แนบมา"}`);
        const reply = typeof result === "string" ? result : JSON.stringify(result);
        setMessages((m) => [...m, { role: "assistant", text: reply }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", text: signedIn ? "Puter พร้อมใช้งานแล้ว — เชื่อม AI ของคุณผ่าน Tools/MCP ได้เลยครับ" : "กรุณาเข้าสู่ระบบ Puter.com ก่อน แล้วเริ่มใช้งาน AI Lab ได้เลยครับ" }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "เชื่อมต่อ AI ไม่สำเร็จ ลองใหม่อีกครั้งได้ครับ" }]);
    } finally {
      setBusy(false);
    }
  };

  const nav = ["หน้าหลัก", "AI Chat", "Agents", "Tools", "MCP Servers", "Workspace", "GitHub", "Puter Cloud", "การตั้งค่า"];

  return (
    <main className="lab-shell">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)}>☰</button>
        <div className="brand"><span className="brand-mark">AI</span><span><b>AI Lab</b><small>Your AI Workspace</small></span></div>
        <div className="search">⌕ <span>ค้นหาเครื่องมือ, Agent, หรือคำสั่ง...</span><kbd>Ctrl K</kbd></div>
        <div className="top-status"><span>◉ GitHub <b>77</b></span><span className={signedIn ? "ok" : ""}>● Puter {signedIn ? "Connected" : "Login"}</span></div>
      </header>

      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <nav>{nav.map((item, i) => <button key={item} className={i === 0 ? "active" : ""} onClick={() => setMobileNav(false)}><span>{["⌂", "▣", "♙", "⚒", "⌘", "▣", "●", "☁", "⚙"][i]}</span>{item}</button>)}</nav>
        <div className="quick"><small>QUICK ACTIONS</small><button onClick={login}>☁️ <b>เปิด Puter Login</b><em>เชื่อมบัญชี Puter.com</em></button><button>● <b>GitHub MCP</b><em>Repository 77</em></button><button>＋ <b>สร้าง Agent ใหม่</b><em>ปรับแต่ง Agent ของคุณ</em></button></div>
        <div className="version"><span>∞</span><div><b>AI Lab v1.0</b><small>Build · Deploy · Create</small></div></div>
      </aside>

      <section className="content">
        <div className="hero"><div className="hero-glow">∞</div><div><p>AI LAB WORKSPACE 🚀</p><h1>ยินดีต้อนรับสู่ AI Lab</h1><span>พื้นที่ทำงาน AI ที่รวมเครื่องมือไว้ในที่เดียว — เชื่อม GitHub · Puter Cloud · Agents · MCP</span></div><div className="repo-pill">● GitHub MCP<br/><b>77 · Connected</b></div></div>

        <section className="panel"><div className="section-head"><h2>🤖 เลือก Agent ที่ต้องการใช้งาน</h2><span>ดูทั้งหมด →</span></div><div className="agents">{agents.map((a) => <button key={a.name} className={`agent ${agent === a.name ? "selected" : ""}`} onClick={() => setAgent(a.name)}><div className="agent-icon">{a.icon}</div><div><strong>{a.name} Agent</strong><i>พร้อมใช้งาน</i><p>{a.desc}</p><label>{a.name === "Coder" ? "Code · GitHub · Deploy" : a.name === "Researcher" ? "Research · Web · Analysis" : "Chat · Analysis · Productivity"}</label></div></button>)}</div></section>

        <section className="workspace panel"><div className="section-head"><h2>AI Lab Workspace</h2><span className="live">● LIVE</span></div><div className="chat-window">{messages.length === 0 ? <div className="welcome"><div className="big-ai">AI</div><h2>สวัสดีครับ! 👋</h2><p>ผมคือ AI Lab ผู้ช่วยอัจฉริยะของคุณ<br/>เลือก Agent ด้านบน หรือแนบรูป/ไฟล์เพื่อเริ่มต้นได้เลย</p><div className="quick-grid"><button onClick={() => setInput("สร้างโค้ดเว็บให้ผม")}>⌘ สร้างโค้ดเว็บ</button><button onClick={() => setAgent("Researcher")}>⌕ ค้นคว้าข้อมูลล่าสุด</button><button onClick={() => setInput("ช่วยวิเคราะห์ปัญหานี้")}>🧠 ช่วยวิเคราะห์ปัญหา</button><button onClick={() => setInput("เชื่อมต่อ GitHub 77")}>● เชื่อมต่อ GitHub</button></div></div> : messages.map((m, i) => <div key={i} className={`message ${m.role}`}><div className="bubble"><b>{m.role === "user" ? "คุณ" : `${agent} Agent`}</b>{m.attachment && <img src={m.attachment.url} alt={m.attachment.name}/>}<p>{m.text}</p></div></div>)}</div><div className="composer">{attachment && <div className="attachment"><img src={attachment.url} alt="preview"/><span>{attachment.name}</span><button onClick={() => setAttachment(undefined)}>×</button></div>}<div className="input-row"><button className="icon-btn" title="แนบรูป/ไฟล์" onClick={() => fileRef.current?.click()}>＋</button><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={`ถาม ${agent} Agent ได้ที่นี่...`} /><button className="send" onClick={send} disabled={busy}>{busy ? "…" : "➤"}</button></div><input ref={fileRef} hidden type="file" accept="image/png,image/jpeg,image/webp,image/gif,text/plain,.md,.json,.csv" onChange={chooseFile}/><div className="composer-tools"><span>Agent</span><span>⚒ Tools</span><span>♢ MCP</span><small>รูปภาพสูงสุด 10 MB · Enter เพื่อส่ง</small></div></div></section>
      </section>

      <aside className="rightbar"><section className="side-card login-card"><h3>☁️ Puter.com Login</h3><p>เข้าสู่ระบบเพื่อใช้ Cloud Storage และบริการต่างๆ</p><button onClick={login} disabled={!puterReady}>🔒 {signedIn ? "Puter Connected" : "เข้าสู่ระบบ Puter.com"}</button><span className={signedIn ? "status ok" : "status"}>● {signedIn ? "Connected" : puterReady ? "พร้อมเข้าสู่ระบบ" : "กำลังโหลด..."}</span></section><section className="side-card"><h3>● GitHub MCP</h3><p>เชื่อมต่อกับ Repository ของคุณ</p><div className="repo">● canthrsngsaengphanuphanth95-cloud/77 <b>Connected</b></div><hr/><strong>Tools Available</strong>{["repo:read","repo:write","issues","pull_requests","contents"].map(x => <div className="tool" key={x}>✓ {x}</div>)}</section><section className="side-card"><h3>⌘ MCP Servers <span className="enabled">● ใช้งานได้</span></h3>{["GitHub","Puter","Vercel","Web Search","File System"].map((x) => <div className="mcp" key={x}><span>{x}</span><b>● พร้อมใช้งาน</b></div>)}</section></aside>
    </main>
  );
}
