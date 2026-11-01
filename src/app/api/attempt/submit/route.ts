import { NextRequest, NextResponse } from "next/server"
import { submitSchema } from "@/server/security/schemas"
import { verifyToken, signToken, freshNonce } from "@/server/security/signToken"
import { reviewCode } from "@/features/reviewer/reviewCode"
import { finishAttempt } from "@/server/attempt/finishAttempt"
import { checkElapsed } from "@/server/attempt/checkElapsed"
import { limitRequest } from "@/server/security/limiter"
import { clientIp } from "@/server/security/clientIp"

const MAX_ROUNDS = 3

export async function POST(req: NextRequest) {
  const ip = await clientIp()
  const { success, reset } = await limitRequest(`submit:${ip}`, 60_000, 30)
  if (!success) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429, headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) } })
  }

  const body = await req.json().catch(() => null)
  const parsed = submitSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ code: "BAD_INPUT" }, { status: 400 })

  const { token, code, results } = parsed.data
  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ code: "BAD_TOKEN" }, { status: 401 })

  const { c, n, s, r, e } = payload as { c: string; n: string; s: number; r: number; e: number }
  if (Date.now() > e) return NextResponse.json({ code: "EXPIRED" }, { status: 401 })
  if (!checkElapsed(s)) return NextResponse.json({ code: "TOO_FAST" }, { status: 400 })

  const comments = reviewCode(c, code)
  const allTestsPassed = results.every((r) => r.passed)

  if (comments.length > 0 || !allTestsPassed) {
    const round = (r as number)
    if (round >= MAX_ROUNDS) {
      return NextResponse.json({ verdict: "closed", hint: "Round limit reached. Try refreshing for a new ticket." })
    }
    const nextToken = signToken({ c, n: freshNonce(), s, r: round + 1, e })
    return NextResponse.json({ verdict: "changes_requested", round: round + 1, token: nextToken, comments })
  }

  const proofId = await finishAttempt({ challengeId: c, nonce: n, startedAtMs: s, rounds: r as number })
  if (!proofId) return NextResponse.json({ code: "REPLAY" }, { status: 409 })
  return NextResponse.json({ verdict: "approved", proofId })
}
