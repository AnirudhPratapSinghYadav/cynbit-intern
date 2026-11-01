import type { Challenge } from "@/features/challenges/types"

type Props = { challenge: Challenge; hintsOpen: boolean; onToggleHints: () => void }

export function LabTicketBar({ challenge, hintsOpen, onToggleHints }: Props) {
  return (
    <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "0.625rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <span style={{ background: "rgba(108,99,255,0.15)", color: "var(--primary)", fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "4px", letterSpacing: "0.1em" }}>DAY 0</span>
        <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>{challenge.title}</span>
        <code style={{ fontSize: "0.7rem", color: "var(--muted)", background: "var(--surface-2)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{challenge.branch}</code>
      </div>
      <button id="hints-toggle-btn" onClick={onToggleHints} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--muted)", fontSize: "0.8rem", padding: "0.25rem 0.75rem", cursor: "pointer" }}>{hintsOpen ? "Hide hints" : "Hints"}</button>
    </div>
  )
}
