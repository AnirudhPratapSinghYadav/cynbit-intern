export async function startAttempt(challengeId: string) {
  const res = await fetch("/api/attempt/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId }),
  })
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After") ?? "60"
    throw Object.assign(new Error("RATE_LIMITED"), { retryAfter: Number(retryAfter) })
  }
  if (!res.ok) throw new Error("START_FAILED")
  return res.json() as Promise<{ token: string; round: number; expiresAt: string }>
}
