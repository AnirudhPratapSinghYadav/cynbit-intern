"use client"
import type { TestResult } from "@/features/runner/messages"

type Props = {
  results: TestResult[]
  status: "idle" | "running" | "done" | "timeout" | "error"
  errorMsg?: string
}

export function TestList({ results, status, errorMsg }: Props) {
  if (status === "idle") return null
  if (status === "running") return <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "1rem" }}>Running tests…</p>
  if (status === "timeout") return <p style={{ color: "var(--fail)", fontSize: "0.875rem", marginTop: "1rem" }}>Tests timed out. Check for infinite loops.</p>
  if (status === "error") return <p style={{ color: "var(--fail)", fontSize: "0.875rem", marginTop: "1rem" }}>Error: {errorMsg}</p>
  return (
    <ul aria-live="polite" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
      {results.map((r, i) => (
        <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
          <span style={{ color: r.passed ? "var(--pass)" : "var(--fail)", fontSize: "1rem" }}>{r.passed ? "✓" : "✗"}</span>
          <span style={{ color: r.passed ? "var(--text)" : "var(--fail)" }}>{r.name}</span>
        </li>
      ))}
    </ul>
  )
}
