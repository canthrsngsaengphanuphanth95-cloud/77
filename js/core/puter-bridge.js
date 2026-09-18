import { Orchestrator } from "./orchestrator.js";

const nativeChat = globalThis.puter?.ai?.chat;
if (typeof nativeChat === "function") {
  globalThis.__puterNativeChat = nativeChat.bind(globalThis.puter.ai);
  globalThis.xbossOrchestrator = new Orchestrator();
  globalThis.puter.ai.chat = (messages, options = {}) =>
    globalThis.xbossOrchestrator.chat(messages, options);
}