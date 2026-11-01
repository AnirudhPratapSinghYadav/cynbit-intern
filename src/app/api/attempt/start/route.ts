import { NextRequest, NextResponse } from "next/server"
import { startSchema } from "@/server/security/schemas"
import { issueToken } from "@/server/attempt/issueToken"
import { limitRequest } from "@/server/security/limiter"
import { clientIp } from "@/server/security/clientIp"

export async function POST(req: NextRequest) {
  const ip = await clientIp()
  const { success, reset } = await limitRequest(`start:${ip}`, 60_000, 20)
  if (!success) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429, headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) } })
  }
  const body = await req.json().catch(() => null)
  const parsed = startSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ code: "BAD_INPUT" }, { status: 400 })
  return NextResponse.json(issueToken(parsed.data.challengeId))
}
