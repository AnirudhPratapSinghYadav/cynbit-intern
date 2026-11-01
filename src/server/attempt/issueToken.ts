import { signToken, freshNonce } from "@/server/security/signToken"
import type { ChallengeId } from "@/server/security/schemas"

const TWO_HOURS = 2 * 60 * 60 * 1000

export function issueToken(challengeId: ChallengeId) {
  const now = Date.now()
  const nonce = freshNonce()
  const payload = {
    c: challengeId,
    n: nonce,
    s: now,
    r: 1,
    e: now + TWO_HOURS,
  }
  return {
    token: signToken(payload),
    round: 1,
    expiresAt: new Date(payload.e).toISOString(),
  }
}
