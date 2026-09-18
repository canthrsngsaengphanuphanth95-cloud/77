import { strict as assert } from "node:assert";
import { Orchestrator } from "../js/core/orchestrator.js";
const o=new Orchestrator();
assert.equal(await o.run({input:"  hello  "}),"ยังไม่ได้เชื่อมต่อ Puter AI: กรุณาโหลด Puter SDK ก่อนใช้งาน");
await assert.rejects(()=>o.run({input:""}));
console.log("core tests: ok");
