import type { Comment } from "@/features/challenges/types"
import type { Node } from "acorn"

type AcornNode = Node & { [key: string]: unknown }

function hasDeleteCall(node: AcornNode): boolean {
  if (!node || typeof node !== "object") return false
  if (
    node.type === "CallExpression" &&
    (node.callee as AcornNode)?.type === "MemberExpression" &&
    ((node.callee as AcornNode).property as AcornNode)?.name === "delete"
  ) return true
  return Object.values(node).some((v) =>
    Array.isArray(v) ? v.some((c) => hasDeleteCall(c as AcornNode)) : hasDeleteCall(v as AcornNode)
  )
}

function hasStringSeparator(node: AcornNode): boolean {
  if (!node || typeof node !== "object") return false
  if (node.type === "TemplateLiteral") {
    const quasis = node.quasis as Array<{ value: { raw: string } }>
    return quasis.some((q) => q.value.raw.includes(":") || q.value.raw.length > 0)
  }
  return Object.values(node).some((v) =>
    Array.isArray(v) ? v.some((c) => hasStringSeparator(c as AcornNode)) : hasStringSeparator(v as AcornNode)
  )
}

export function runCacheKeyRules(ast: AcornNode): Comment[] {
  const comments: Comment[] = []
  if (!hasStringSeparator(ast)) {
    comments.push({ line: 4, text: "'1' + '11' and '11' + '1' build the same key. Add a separator character." })
  }
  if (!hasDeleteCall(ast)) {
    comments.push({ line: 11, text: "invalidate does nothing, so stale data lives forever." })
  }
  return comments
}
