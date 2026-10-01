import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, Check, Loader2, Sparkles, AlertCircle, Wand2 } from "lucide-react";
import { generateAI } from "@/lib/ai.functions";
import { DISCLAIMER } from "./AppShell";

export const fieldCls =
  "w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";
export const labelCls = "mb-1.5 block text-sm font-medium";

export function AiTool({
  tool,
  form,
  getInput,
  validate,
  buttonLabel,
  emptyText,
}: {
  tool: "email" | "summary" | "planner";
  form: ReactNode;
  getInput: () => Record<string, string>;
  validate: () => string | null;
  buttonLabel: string;
  emptyText: string;
}) {
  const run = useServerFn(generateAI);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    setError(null);
    setLoading(true);
    try {
      const r = await run({ data: { tool, input: getInput() } });
      if (r.ok) setOutput(r.text);
      else setError(r.error);
    } catch {
      setError("Couldn't reach the AI service. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-5 shadow-soft sm:p-6">
        {form}
        {error && (
          <div role="alert" className="flex gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        <button
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-lift disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          {loading ? "Generating…" : buttonLabel}
        </button>
      </form>

      <section className="flex min-h-[420px] flex-col rounded-2xl border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" /> AI Output {output && <span className="font-normal text-muted-foreground">· editable</span>}
          </span>
          <button
            type="button"
            onClick={copy}
            disabled={!output}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-40"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="relative flex-1">
          {loading ? (
            <div className="space-y-3 p-5">
              {[90, 75, 85, 60, 80, 50].map((w, i) => (
                <div key={i} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
              ))}
              <p className="pt-2 text-xs text-muted-foreground">SkillsDesk AI is working on it…</p>
            </div>
          ) : output ? (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="h-full min-h-[360px] w-full resize-none bg-transparent p-5 text-sm leading-relaxed outline-none"
            />
          ) : (
            <div className="grid h-full min-h-[360px] place-items-center p-8 text-center">
              <div>
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-secondary">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{emptyText}</p>
              </div>
            </div>
          )}
        </div>
        <p className="border-t px-5 py-3 text-xs text-muted-foreground">{DISCLAIMER}</p>
      </section>
    </div>
  );
}
