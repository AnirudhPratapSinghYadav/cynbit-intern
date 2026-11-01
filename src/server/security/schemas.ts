import { z } from "zod"

export const CHALLENGE_IDS = ["jwt-expiry", "listener-leak", "cache-key"] as const
export type ChallengeId = (typeof CHALLENGE_IDS)[number]

export const startSchema = z.object({
  challengeId: z.enum(CHALLENGE_IDS),
})

const resultItem = z.object({
  name: z.string().max(80),
  passed: z.boolean(),
})

export const submitSchema = z.object({
  token: z.string().max(600),
  code: z.string().max(8000),
  results: z.array(resultItem).max(20),
})
