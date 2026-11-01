import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { env } from "@/server/env"

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL ?? "https://demo.invalid",
  token: env.UPSTASH_REDIS_REST_TOKEN ?? "demo",
})

export const startLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  prefix: "rl:start",
})

export const submitLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  prefix: "rl:submit",
})

export const enrollLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  prefix: "rl:enroll",
})

export { redis }

const localHits = new Map<string, number[]>()

export async function limitRequest(key: string, windowMs: number, max: number) {
  if (!env.isDemoMode) {
    const limiter = key.startsWith("start:") ? startLimiter : key.startsWith("submit:") ? submitLimiter : enrollLimiter
    return limiter.limit(key)
  }
  const now = Date.now()
  const hits = (localHits.get(key) ?? []).filter((hit) => hit > now - windowMs)
  if (hits.length >= max) return { success: false, reset: hits[0] + windowMs }
  localHits.set(key, [...hits, now])
  return { success: true, reset: now + windowMs }
}
