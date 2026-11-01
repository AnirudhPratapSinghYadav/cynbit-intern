import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProof } from "@/server/db/proofs"
import { buildQr } from "@/features/proof/buildQr"
import { formatMs, formatDate } from "@/lib/time"
import { env } from "@/server/env"
import { Card } from "@/components/Card"
import { ProofActions } from "@/components/ProofActions"
import { ProofStats } from "@/components/ProofStats"

type Props = { params: Promise<{ id: string }> }
export const instant = false
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: "Day Zero Proof — BitElevate",
    description: "A verified Day Zero exercise for Cynbit's BitElevate internship.",
    openGraph: { images: [`/proof/${id}/opengraph-image`] },
  }
}

export default async function ProofPage({ params }: Props) {
  const { id } = await params
  if (!UUID_RE.test(id)) notFound()
  const proof = await getProof(id)
  if (!proof) notFound()
  const proofUrl = `${env.SITE_URL}/proof/${id}`
  const qrSvg = await buildQr(proofUrl)
  const enrollUrl = `/go/enroll?proof=${id}`
  return (
    <div style={{ maxWidth: "36rem", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <Card style={{ padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Day Zero Proof
          </p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.5rem" }}>{proof.lab}</h1>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{proof.createdAt ? formatDate(proof.createdAt) : "Verified Day Zero"}</p>
        </div>
        <ProofStats challengeId={proof.challengeId} rounds={`${proof.rounds} of 3`} duration={formatMs(proof.durationMs)} />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div
            dangerouslySetInnerHTML={{ __html: qrSvg }}
            style={{ width: 140, height: 140 }}
            aria-label={`QR code linking to ${proofUrl}`}
          />
        </div>

        <ProofActions proofUrl={proofUrl} enrollUrl={enrollUrl} lab={proof.lab} />

        <p style={{ color: "var(--muted)", fontSize: "0.75rem", textAlign: "center", lineHeight: 1.5 }}>
          Day Zero is a trial exercise. It is not a BitElevate certificate.
        </p>
      </Card>
    </div>
  )
}
