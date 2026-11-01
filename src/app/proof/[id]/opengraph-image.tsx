import { ImageResponse } from "next/og"
import { getProof } from "@/server/db/proofs"
import { formatMs } from "@/lib/time"

type Props = { params: Promise<{ id: string }> }

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage({ params }: Props) {
  const { id } = await params
  const proof = await getProof(id)
  const lab = proof?.lab ?? "BitElevate"
  const duration = proof ? formatMs(proof.durationMs) : ""

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, display: "flex", flexDirection: "column",
          background: "#0a0a0f", color: "#e8e8f0", padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00d4aa" }} />
          <span style={{ color: "#00d4aa", fontSize: 18, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Day Zero Proof</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>{lab}</div>
          {duration && (
            <div style={{ fontSize: 28, color: "#6b6b8a" }}>Completed in {duration}</div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#6b6b8a", fontSize: 20 }}>cynbit.in/bitelevate</span>
          <div style={{ background: "#6c63ff", color: "#fff", padding: "12px 28px", borderRadius: "10px", fontSize: 20, fontWeight: 600 }}>
            BitElevate
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
