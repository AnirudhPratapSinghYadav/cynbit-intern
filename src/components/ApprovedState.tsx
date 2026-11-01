type Props = { proofId: string }

export function ApprovedState({ proofId }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1.5rem", padding: "2rem", textAlign: "center" }}>
      <div style={{ fontSize: "3.5rem" }}>🎉</div>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent)" }}>PR Approved</h2>
      <p style={{ color: "var(--muted)", maxWidth: "28rem", lineHeight: 1.6 }}>Your Day Zero proof is ready. View it, share it, then decide if BitElevate is right for you.</p>
      <a id="view-proof-btn" href={`/proof/${proofId}`} style={{ background: "var(--primary)", color: "#fff", padding: "0.75rem 2rem", borderRadius: "var(--radius-sm)", fontWeight: 600, fontSize: "1rem" }}>
        View your proof →
      </a>
    </div>
  )
}
