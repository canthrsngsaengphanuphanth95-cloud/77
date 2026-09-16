"use client";

import { useEffect, useState } from "react";

const WORKSPACE_URL = "https://panuss09-br0npxbrw-mvp-5685.vercel.app/";

declare global {
  interface Window {
    puter?: {
      auth?: {
        signIn?: () => Promise<unknown>;
        signOut?: () => Promise<unknown>;
        isSignedIn?: () => Promise<boolean>;
        getUser?: () => Promise<unknown>;
      };
    };
  }
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const login = async () => {
    if (!window.puter?.auth?.signIn) {
      alert("Puter กำลังโหลด กรุณาลองอีกครั้ง");
      return;
    }
    try {
      await window.puter.auth.signIn();
      setSignedIn(true);
    } catch (err) {
      console.error("Puter sign-in failed", err);
    }
  };

  return (
    <main style={mainStyle}>
      <iframe
        title="AI Lab Workspace"
        src={WORKSPACE_URL}
        style={iframeStyle}
        allow="clipboard-read; clipboard-write; microphone; camera; fullscreen"
      />
      <div style={panelStyle}>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>
          AI LAB
        </div>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 10 }}>
          {signedIn ? "🟢 Puter Connected" : "🔐 Puter Login"}
        </div>
        <button type="button" onClick={login} disabled={!ready} style={loginButtonStyle}>
          {ready ? "เข้าสู่ระบบด้วย Puter.com" : "กำลังโหลด Puter…"}
        </button>
      </div>
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "#09090b",
};

const iframeStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  border: 0,
  display: "block",
};

const panelStyle: React.CSSProperties = {
  position: "fixed",
  right: 18,
  bottom: 18,
  zIndex: 20,
  padding: "12px 14px",
  color: "#fff",
  background: "rgba(18,18,22,.94)",
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,.35)",
  backdropFilter: "blur(14px)",
};

const loginButtonStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: 12,
  padding: "10px 14px",
  color: "#fff",
  background: "#18181b",
  cursor: "pointer",
  fontWeight: 700,
};
