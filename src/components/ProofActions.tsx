import { CopyLink } from "@/features/proof/CopyLink"

type Props = { proofUrl: string; enrollUrl: string; lab: string }

export function ProofActions({ proofUrl, enrollUrl, lab }: Props) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "1.5rem" }}>
      <CopyLink url={proofUrl} />
      <a id="enroll-btn" href={enrollUrl} style={{ background: "var(--primary)", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "var(--radius-sm)", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
        Enroll in {lab} →
      </a>
    </div>
  )
}
