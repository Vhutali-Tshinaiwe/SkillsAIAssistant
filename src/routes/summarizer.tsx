import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AiTool, fieldCls, labelCls } from "@/components/AiTool";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer – SkillsDesk AI" },
      { name: "description", content: "Summarise meeting notes into key points, decisions, action items and deadlines." },
      { property: "og:title", content: "Meeting Notes Summarizer – SkillsDesk AI" },
      { property: "og:description", content: "Summarise meeting notes with AI." },
    ],
  }),
  component: SummaryPage,
});

function SummaryPage() {
  const [notes, setNotes] = useState("");
  return (
    <AppShell>
      <PageHeader title="Meeting Notes Summarizer" subtitle="Paste your notes — get key points, decisions, actions and deadlines." />
      <AiTool
        tool="summary"
        buttonLabel="Summarise notes"
        emptyText="Your structured summary will appear here."
        validate={() => (notes.trim().length < 40 ? "Please paste more detailed meeting notes (at least a few sentences)." : null)}
        getInput={() => ({ notes })}
        form={
          <div>
            <label className={labelCls}>Meeting notes</label>
            <textarea rows={16} className={fieldCls} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste meeting notes here…" />
            <p className="mt-1 text-xs text-muted-foreground">{notes.length.toLocaleString()} / 20,000 characters</p>
          </div>
        }
      />
    </AppShell>
  );
}
