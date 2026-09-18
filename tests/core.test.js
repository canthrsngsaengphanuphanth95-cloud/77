import { strict as assert } from "node:assert";
import { Orchestrator } from "../js/core/orchestrator.js";
globalThis.puter={ai:{chat:async()=> "mock ok"}};
const o=new Orchestrator();
assert.equal(await o.run({input:"  hello  "}),"mock ok");
await assert.rejects(()=>o.run({input:""}));
assert.equal(await o.chat([{role:"user",content:"hi"}],{model:"x-ai/grok-4.6"}),"mock ok");
console.log("core tests: ok");