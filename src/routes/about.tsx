import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { AppShell, PageHeader, DISCLAIMER } from "@/components/AppShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About – SkillsDesk AI" },
      { name: "description", content: "About SkillsDesk AI and responsible AI use." },
      { property: "og:title", content: "About – SkillsDesk AI" },
      { property: "og:description", content: "About SkillsDesk AI and responsible AI use." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <AppShell>
      <PageHeader title="About SkillsDesk AI" subtitle="An AI assistant for training and skills-development administrators." />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">What it does</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            SkillsDesk AI helps admins managing projects, contracts, deadlines and follow-ups to write emails, summarise
            meetings and plan their work. Every output is generated live by an AI model from your input, and you can edit
            and copy it. No account is needed and nothing is stored.
          </p>
        </div>
        <div className="rounded-2xl border bg-secondary p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ShieldCheck className="h-5 w-5 text-primary" /> Responsible AI
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-secondary-foreground">{DISCLAIMER}</p>
        </div>
      </div>
    </AppShell>
  );
}
