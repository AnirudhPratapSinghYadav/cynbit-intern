import { parse } from "acorn"
import { runRules } from "@/features/challenges"
import type { Comment } from "@/features/challenges/types"
import type { Node } from "acorn"

const MAX_CODE = 8000

export function reviewCode(challengeId: string, code: string): Comment[] {
  if (code.length > MAX_CODE) return []
  let ast: Node
  try {
    ast = parse(code, { ecmaVersion: 2022, sourceType: "script" })
  } catch {
    return []
  }
  return runRules(challengeId, ast as Node & { [key: string]: unknown })
}
