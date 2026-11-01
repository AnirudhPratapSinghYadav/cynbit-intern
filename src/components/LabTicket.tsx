import type { Challenge } from "@/features/challenges/types"

type Props = { challenge: Challenge; hintsOpen: boolean }

export function LabTicket({ challenge, hintsOpen }: Props) {
  return (
    <div style={{ overflow: "auto", borderRight: "1px solid var(--border)", padding: "1.5rem", fontSize: "0.875rem" }}>
      <TicketField label="File"><code style={{ color: "var(--accent)" }}>{challenge.fileTarget}</code></TicketField>
      <TicketField label="Problem"><p style={{ color: "var(--text)", lineHeight: 1.6 }}>{challenge.description}</p></TicketField>
      <TicketField label="Steps">
        <ol style={{ paddingLeft: "1.1rem", color: "var(--muted)", lineHeight: 1.8 }}>
          <li>Read the starter code</li><li>Find and fix the bug</li><li>Run tests to verify</li><li>Open PR when tests pass</li>
        </ol>
      </TicketField>
      {hintsOpen ? <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}><p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Hints</p>{challenge.hints.map((hint, index) => <p key={index} style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.5rem" }}>{index + 1}. {hint}</p>)}</div> : null}
    </div>
  )
}

function TicketField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: "1.25rem" }}><p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>{label}</p>{children}</div>
}
