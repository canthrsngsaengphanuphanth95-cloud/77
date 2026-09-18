export class PuterBackend {
  constructor(options = {}) { this.options = options; }
  chat(messages, options = {}) {
    const puter = globalThis.puter;
    const native = globalThis.__puterNativeChat || puter?.ai?.chat;
    if (typeof native !== "function") throw new Error("Puter AI ยังไม่พร้อมใช้งาน");
    return native(messages, { ...this.options, ...options });
  }
}