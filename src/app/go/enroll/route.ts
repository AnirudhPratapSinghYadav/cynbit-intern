import { NextRequest, NextResponse } from "next/server"
import { getProof, markEnrollClick } from "@/server/db/proofs"
import { env } from "@/server/env"
import { limitRequest } from "@/server/security/limiter"
import { clientIp } from "@/server/security/clientIp"

export async function GET(req: NextRequest) {
  const ip = await clientIp()
  const { success } = await limitRequest(`enroll:${ip}`, 60_000, 60)
  if (!success) return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429 })

  const proofId = req.nextUrl.searchParams.get("proof") ?? ""
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!UUID_RE.test(proofId)) return NextResponse.json({ code: "BAD_INPUT" }, { status: 400 })
  if (env.isDemoMode) return NextResponse.redirect(env.ENROLL_URL, 302)

  const proof = await getProof(proofId)
  if (!proof) return NextResponse.json({ code: "NOT_FOUND" }, { status: 404 })

  if (!proof.enrollClickedAt) {
    await markEnrollClick(proofId)
  }

  return NextResponse.redirect(env.ENROLL_URL, 302)
}
