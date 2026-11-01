import type { Comment } from "@/features/challenges/types"
import type { Node } from "acorn"

type AcornNode = Node & { [key: string]: unknown }

function findIdentifiers(node: AcornNode, names: string[]): boolean {
  if (!node || typeof node !== "object") return false
  if (node.type === "Identifier" && names.includes(node.name as string)) return true
  return Object.values(node).some((v) =>
    Array.isArray(v) ? v.some((c) => findIdentifiers(c as AcornNode, names)) : findIdentifiers(v as AcornNode, names)
  )
}

function hasLiteral(node: AcornNode, val: string): boolean {
  if (!node || typeof node !== "object") return false
  if (node.type === "Literal" && node.value === val) return true
  return Object.values(node).some((v) =>
    Array.isArray(v) ? v.some((c) => hasLiteral(c as AcornNode, val)) : hasLiteral(v as AcornNode, val)
  )
}

export function runJwtRules(ast: AcornNode): Comment[] {
  const comments: Comment[] = []
  if (!findIdentifiers(ast, ["exp"])) {
    comments.push({ line: 2, text: "Nothing here stops an expired token. What should happen when exp is behind nowSeconds?" })
  }
  if (!hasLiteral(ast, "none")) {
    comments.push({ line: 2, text: "A token that says alg: none gets through as long as the flag is true. Reject it explicitly." })
  }
  if (!findIdentifiers(ast, ["aud"])) {
    comments.push({ line: 2, text: "Any audience is accepted. A token minted for another service would work here." })
  }
  return comments
}
