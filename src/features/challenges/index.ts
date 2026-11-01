import { jwtExpiry } from "./jwt-expiry"
import { listenerLeak } from "./listener-leak"
import { cacheKey } from "./cache-key"
import { jwtTests } from "./jwt-expiry/tests"
import { listenerLeakTests } from "./listener-leak/tests"
import { cacheKeyTests } from "./cache-key/tests"
import { runJwtRules } from "./jwt-expiry/rules"
import { runListenerLeakRules } from "./listener-leak/rules"
import { runCacheKeyRules } from "./cache-key/rules"
import type { Comment } from "./types"
import type { Node } from "acorn"

type AcornNode = Node & { [key: string]: unknown }

export const challenges = [jwtExpiry, listenerLeak, cacheKey]

export const testSuites: Record<string, string> = {
  "jwt-expiry": jwtTests,
  "listener-leak": listenerLeakTests,
  "cache-key": cacheKeyTests,
}

export function runRules(challengeId: string, ast: AcornNode): Comment[] {
  if (challengeId === "jwt-expiry") return runJwtRules(ast)
  if (challengeId === "listener-leak") return runListenerLeakRules(ast)
  if (challengeId === "cache-key") return runCacheKeyRules(ast)
  return []
}
