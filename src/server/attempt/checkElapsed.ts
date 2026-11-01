const MIN_MS = 15_000

export function checkElapsed(startedAtMs: number): boolean {
  return Date.now() - startedAtMs >= MIN_MS
}
