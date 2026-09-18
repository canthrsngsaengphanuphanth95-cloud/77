import { TaskEngine } from "./task-engine.js";
export class Orchestrator {
  constructor(options = {}) { this.engine = new TaskEngine(options); }
  async run(request = {}) {
    if (!request?.input?.trim()) throw new Error("ต้องมีข้อความ");
    return this.chat(request.messages ?? [{ role: "user", content: request.input.trim() }], request.options ?? {});
  }
  chat(messages, options = {}) {
    if (!Array.isArray(messages) || !messages.length) throw new Error("ต้องมีข้อความ");
    return this.engine.execute({ type: "chat", messages, options });
  }
}