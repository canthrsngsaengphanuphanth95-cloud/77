import { Orchestrator } from "./js/core/orchestrator.js";
const orchestrator=new Orchestrator();
const chat=document.querySelector("#chat"),form=document.querySelector("#composer"),input=document.querySelector("#input"),status=document.querySelector("#status");
function add(role,text){const el=document.createElement("div");el.className="message "+role;el.textContent=text;chat.appendChild(el);chat.scrollTop=chat.scrollHeight;return el}
form.addEventListener("submit",async e=>{e.preventDefault();const text=input.value.trim();if(!text)return;input.value="";add("user",text);status.textContent="กำลังประมวลผล…";const pending=add("assistant","กำลังประมวลผล…");try{pending.textContent=await orchestrator.run({input:text})}catch(err){pending.textContent="เกิดข้อผิดพลาด: "+err.message}finally{status.textContent="พร้อมใช้งาน"}});
