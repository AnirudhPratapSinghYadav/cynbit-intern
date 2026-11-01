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
    <div style={{ width: 1200, height: 630, display: "flex", flexDirection: "column", background: "#f3f1eb", color: "#11120f", padding: "72px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#6f7169", fontSize: 18, fontWeight: 700, letterSpacing: "0.12em" }}>
        <div style={{ width: 12, height: 12, background: "#c9f31d" }} />
        CYNBIT / DAY ZERO
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.06em" }}>{lab}</div>
        <div style={{ marginTop: 24, color: "#6f7169", fontSize: 30 }}>Verified engineering proof{duration ? ` · ${duration}` : ""}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", borderTop: "1px solid #c9c8c0", paddingTop: 22, fontSize: 20 }}>
        <span>PROVE YOU CAN SHIP.</span>
        <div style={{ background: "#11120f", color: "#c9f31d", padding: "14px 22px", fontWeight: 700 }}>BIT ELEVATE ↗</div>
      </div>
    </div>,
    { ...size }
  )
}
