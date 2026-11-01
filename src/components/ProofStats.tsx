type Props = {
  challengeId: string
  rounds: string
  duration: string
}

export function ProofStats({ challengeId, rounds, duration }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
      <Stat label="Challenge" value={challengeId} />
      <Stat label="Rounds" value={rounds} />
      <Stat label="Time taken" value={duration} />
      <Stat label="Status" value="Approved" color="var(--accent)" />
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ background: "var(--surface-2)", borderRadius: "var(--radius-sm)", padding: "0.875rem" }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.25rem" }}>{label}</p>
      <p style={{ fontSize: "0.95rem", fontWeight: 600, color: color ?? "var(--text)" }}>{value}</p>
    </div>
  )
}
