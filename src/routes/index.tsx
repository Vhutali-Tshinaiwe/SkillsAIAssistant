import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, CalendarCheck, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillsDesk AI – Workplace Productivity Assistant" },
      { name: "description", content: "AI emails, meeting summaries and task plans for training and skills-development administrators." },
      { property: "og:title", content: "SkillsDesk AI – Workplace Productivity Assistant" },
      { property: "og:description", content: "AI emails, meeting summaries and task plans for skills-development admins." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { to: "/email", icon: Mail, title: "Smart Email Generator", desc: "Draft complete professional emails in formal, friendly or persuasive tone." },
  { to: "/summarizer", icon: NotebookPen, title: "Meeting Notes Summarizer", desc: "Turn long notes into key points, decisions, action items and deadlines." },
  { to: "/planner", icon: CalendarCheck, title: "AI Task Planner", desc: "Get a prioritised daily or weekly schedule from your task list." },
] as const;

function Dashboard() {
  return (
    <AppShell>
      <section className="mb-8 rounded-3xl border bg-soft p-6 sm:p-10">
        <p className="text-sm font-semibold text-primary">Welcome back</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">Less admin. More time for the people you train.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          SkillsDesk AI helps you handle projects, contracts, deadlines and follow-ups — faster.
        </p>
      </section>
      <div className="grid gap-5 md:grid-cols-3">
        {tools.map(({ to, icon: Icon, title, desc }) => (
          <Link key={to} to={to} className="group flex flex-col rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-secondary">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{desc}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
