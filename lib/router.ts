export type AgentId = 'general' | 'coder' | 'researcher';

export interface RouteDecision {
  agent: AgentId;
  reason: string;
}

const coderSignals = /\b(code|coding|debug|bug|typescript|javascript|react|next\.js|api|git|github|mcp)\b/i;
const researchSignals = /\b(research|ค้นคว้า|แหล่งข้อมูล|อ้างอิง|latest|ล่าสุด|compare|เปรียบเทียบ)\b/i;

export function routeMessage(message: string): RouteDecision {
  if (coderSignals.test(message)) {
    return { agent: 'coder', reason: 'Detected software-development or repository task.' };
  }
  if (researchSignals.test(message)) {
    return { agent: 'researcher', reason: 'Detected research, freshness, or source-comparison task.' };
  }
  return { agent: 'general', reason: 'No specialist signal detected; using the general agent.' };
}

export function agentLabel(agent: AgentId): string {
  return { general: 'General', coder: 'Coder', researcher: 'Researcher' }[agent];
}
