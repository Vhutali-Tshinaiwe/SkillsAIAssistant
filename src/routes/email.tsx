import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AiTool, fieldCls, labelCls } from "@/components/AiTool";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator – SkillsDesk AI" },
      { name: "description", content: "Generate professional emails in formal, friendly or persuasive tone." },
      { property: "og:title", content: "Smart Email Generator – SkillsDesk AI" },
      { property: "og:description", content: "Generate professional emails with AI." },
    ],
  }),
  component: EmailPage,
});

const tones = ["Formal", "Friendly", "Persuasive"];

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState("Formal");
  return (
    <AppShell>
      <PageHeader title="Smart Email Generator" subtitle="Describe what you need — AI writes the full email." />
      <AiTool
        tool="email"
        buttonLabel="Generate email"
        emptyText="Your generated email will appear here."
        validate={() => (!purpose.trim() || !points.trim() ? "Please add the email purpose and at least one key point." : null)}
        getInput={() => ({ purpose, recipient, points, tone })}
        form={
          <>
            <div>
              <label className={labelCls}>Email purpose</label>
              <input className={fieldCls} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Follow up on unsigned learnership contract" />
            </div>
            <div>
              <label className={labelCls}>Recipient / context</label>
              <input className={fieldCls} value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. HR Manager at partner employer" />
            </div>
            <div>
              <label className={labelCls}>Key points</label>
              <textarea rows={6} className={fieldCls} value={points} onChange={(e) => setPoints(e.target.value)} placeholder="- Contract sent 2 weeks ago&#10;- Intake starts 1 Nov" />
            </div>
            <div>
              <span className={labelCls}>Tone</span>
              <div className="grid grid-cols-3 gap-2">
                {tones.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTone(t)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${tone === t ? "border-primary bg-secondary text-secondary-foreground" : "hover:bg-muted"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </>
        }
      />
    </AppShell>
  );
}
