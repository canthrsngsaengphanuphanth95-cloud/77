export function extractText(res: any): string {
  if (typeof res === 'string') return res;

  // OpenAI-style
  if (res?.message?.content) return res.message.content;
  if (res?.choices?.[0]?.message?.content) return res.choices[0].message.content;

  // Anthropic-style
  if (res?.content) {
    if (typeof res.content === 'string') return res.content;
    if (Array.isArray(res.content)) {
      return res.content.map((c: any) => c.text ?? '').join('');
    }
  }

  // fallback
  return String(res);
}
