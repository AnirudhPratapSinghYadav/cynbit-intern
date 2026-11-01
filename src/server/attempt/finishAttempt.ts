import { consumeNonce } from "./consumeNonce"
import { insertProof } from "@/server/db/proofs"
import { challenges } from "@/features/challenges"

export async function finishAttempt(params: {
  challengeId: string
  nonce: string
  startedAtMs: number
  rounds: number
}): Promise<string | null> {
  const ok = await consumeNonce(params.nonce)
  if (!ok) return null
  const challenge = challenges.find((c) => c.id === params.challengeId)
  const lab = challenge?.lab ?? params.challengeId
  const durationMs = Date.now() - params.startedAtMs
  return insertProof({
    challengeId: params.challengeId,
    lab,
    rounds: params.rounds,
    durationMs,
    nonce: params.nonce,
  })
}
