import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { AiTool, fieldCls, labelCls } from "@/components/AiTool";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner – SkillsDesk AI" },
      { name: "description", content: "Generate a prioritised daily or weekly schedule from your tasks and deadlines." },
      { property: "og:title", content: "AI Task Planner – SkillsDesk AI" },
      { property: "og:description", content: "Plan your day or week with AI." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [period, setPeriod] = useState("daily");
  return (
    <AppShell>
      <PageHeader title="AI Task Planner" subtitle="List your tasks — AI prioritises and schedules them." />
      <AiTool
        tool="planner"
        buttonLabel="Generate schedule"
        emptyText="Your prioritised schedule will appear here."
        validate={() => (!tasks.trim() ? "Please enter at least one task." : null)}
        getInput={() => ({ tasks, period })}
        form={
          <>
            <div>
              <span className={labelCls}>Schedule type</span>
              <div className="grid grid-cols-2 gap-2">
                {["daily", "weekly"].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium capitalize transition ${period === p ? "border-primary bg-secondary text-secondary-foreground" : "hover:bg-muted"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Tasks, priorities & deadlines</label>
              <textarea
                rows={12}
                className={fieldCls}
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                placeholder="- Submit SETA report – high – due Friday&#10;- Call employer re: placements – medium – tomorrow"
              />
            </div>
          </>
        }
      />
    </AppShell>
  );
}
