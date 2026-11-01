import { env } from "@/server/env"
import { redis } from "@/server/security/limiter"

const TTL_SECONDS = 3 * 60 * 60

export async function consumeNonce(nonce: string): Promise<boolean> {
  if (env.isDemoMode) return true
  const key = `nonce:${nonce}`
  const result = await redis.set(key, "1", { nx: true, ex: TTL_SECONDS })
  return result === "OK"
}
