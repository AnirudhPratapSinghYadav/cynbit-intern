import type { Comment } from "@/features/challenges/types"
import type { Node } from "acorn"

type AcornNode = Node & { [key: string]: unknown }

function hasCallNamed(node: AcornNode, name: string): boolean {
  if (!node || typeof node !== "object") return false
  if (
    node.type === "CallExpression" &&
    (node.callee as AcornNode)?.type === "MemberExpression" &&
    ((node.callee as AcornNode).property as AcornNode)?.name === name
  ) return true
  return Object.values(node).some((v) =>
    Array.isArray(v) ? v.some((c) => hasCallNamed(c as AcornNode, name)) : hasCallNamed(v as AcornNode, name)
  )
}

function addListenerArgIsIdentifier(node: AcornNode): boolean {
  if (!node || typeof node !== "object") return false
  if (
    node.type === "CallExpression" &&
    (node.callee as AcornNode)?.type === "MemberExpression" &&
    ((node.callee as AcornNode).property as AcornNode)?.name === "addEventListener"
  ) {
    const args = node.arguments as AcornNode[]
    return args[1]?.type === "Identifier"
  }
  return Object.values(node).some((v) =>
    Array.isArray(v) ? v.some((c) => addListenerArgIsIdentifier(c as AcornNode)) : addListenerArgIsIdentifier(v as AcornNode)
  )
}

export function runListenerLeakRules(ast: AcornNode): Comment[] {
  const comments: Comment[] = []
  if (!hasCallNamed(ast, "removeEventListener")) {
    comments.push({ line: 5, text: "stop is empty. This is how a tab ends up leaking until it crashes." })
  }
  if (!addListenerArgIsIdentifier(ast)) {
    comments.push({ line: 3, text: "An inline arrow cannot be removed later. Keep a reference to the handler." })
  }
  return comments
}
