import type { TestResult } from "@/features/runner/messages"

type SubmitPayload = { token: string; code: string; results: TestResult[] }

export async function submitAttempt(payload: SubmitPayload) {
  const res = await fetch("/api/attempt/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After") ?? "60"
    throw Object.assign(new Error("RATE_LIMITED"), { retryAfter: Number(retryAfter) })
  }
  if (res.status === 409) throw new Error("REPLAY")
  if (!res.ok) throw new Error("SUBMIT_FAILED")
  return res.json()
}
