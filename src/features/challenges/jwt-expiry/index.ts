import type { Challenge } from "./types"

export const jwtExpiry: Challenge = {
  id: "jwt-expiry",
  lab: "Full Stack SaaS Lab",
  branch: "task/day-0-jwt-expiry",
  fileTarget: "auth/acceptToken.js",
  title: "JWT Expiry & Algorithm Check",
  description:
    "This token validator lets expired and algorithm-none tokens through. Fix it.",
  starter: `function acceptToken(token, nowSeconds) {
  if (!token.signatureValid) return false
  return Boolean(token.payload.sub)
}`,
  hints: [
    "Check token.payload.exp against nowSeconds.",
    "Reject tokens where header.alg === 'none' regardless of signatureValid.",
  ],
}
