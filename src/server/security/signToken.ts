import { createHmac, timingSafeEqual, randomBytes } from "crypto"
import { env } from "@/server/env"

export function signToken(payload: object): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const sig = createHmac("sha256", env.SIGNING_SECRET).update(body).digest("base64url")
  return `${body}.${sig}`
}

export function verifyToken(token: string): Record<string, unknown> | null {
  const dot = token.lastIndexOf(".")
  if (dot < 0) return null
  const body = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = createHmac("sha256", env.SIGNING_SECRET).update(body).digest("base64url")
  const safe = timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  if (!safe) return null
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString())
  } catch {
    return null
  }
}

export function freshNonce(): string {
  return randomBytes(16).toString("base64url")
}
