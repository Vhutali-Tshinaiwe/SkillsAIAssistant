import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  tool: z.enum(["email", "summary", "planner"]),
  input: z.record(z.string(), z.string().max(20000)),
});

function buildPrompt(tool: string, i: Record<string, string>): { system: string; user: string } {
  const base =
    "You are SkillsDesk AI, a workplace assistant for administrators at training and skills-development providers (projects, contracts, deadlines, follow-ups). Output clean plain text with simple markdown-style headings (## ) and bullet points (- ). No preamble.";
  if (tool === "email")
    return {
      system: `${base} Write a complete professional email with a 'Subject:' line, greeting, body and sign-off placeholder [Your Name]. Tone: ${i.tone ?? "Formal"}.`,
      user: `Purpose: ${i.purpose}\nRecipient/context: ${i.recipient}\nKey points:\n${i.points}`,
    };
  if (tool === "summary")
    return {
      system: `${base} Summarise meeting notes. Use exactly these sections: ## Summary, ## Key Points, ## Decisions, ## Action Items (include owner if known), ## Deadlines. Write 'None identified' if a section is empty. Only use information in the notes.`,
      user: `Meeting notes:\n${i.notes}`,
    };
  return {
    system: `${base} Create a ${i.period === "weekly" ? "weekly (Mon–Fri)" : "daily (hour-by-hour, 08:00–17:00)"} schedule. Prioritise by urgency, importance and deadlines. Start with ## Priority Ranking (with a one-line reason each), then ## Schedule, then ## Tips. Today is ${new Date().toDateString()}.`,
    user: `Tasks, priorities and deadlines:\n${i.tasks}`,
  };
}

export const generateAI = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false as const, error: "AI is not configured." };
    const { system, user } = buildPrompt(data.tool, data.input);
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: system,
        input: user,
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        include: ["reasoning.encrypted_content"],
      }),
    });
    if (!res.ok || !res.body) {
      let msg = `AI request failed (${res.status}).`;
      try {
        const j = await res.json();
        msg = j?.error?.message ?? j?.message ?? msg;
      } catch {}
      if (res.status === 429) msg = "Too many requests right now. Please wait a moment and try again.";
      if (res.status === 402) msg = "AI credits have run out for this workspace.";
      return { ok: false as const, error: msg };
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let text = "";
    let err: string | null = null;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const ev = JSON.parse(payload);
          if (ev.type === "response.output_text.delta") text += ev.delta;
          else if (ev.type === "error" || ev.type === "response.failed")
            err = ev.error?.message ?? ev.response?.error?.message ?? "AI generation failed.";
        } catch {}
      }
    }
    if (err) return { ok: false as const, error: err };
    if (!text.trim()) return { ok: false as const, error: "The AI returned no content. Please adjust your input." };
    return { ok: true as const, text: text.trim() };
  });
