import { describe, expect, it } from "vitest"
import { parse } from "acorn"
import type { Node } from "acorn"
import { runJwtRules } from "../challenges/jwt-expiry/rules"

type ParsedNode = Node & { [key: string]: unknown }

describe("reviewCode", () => {
  it("finds missing JWT safeguards", () => {
    const ast: Node = parse("function acceptToken(token) { return token.payload }", { ecmaVersion: 2022 })
    const comments = runJwtRules(ast as ParsedNode)

    expect(comments).toHaveLength(3)
    expect(comments.map((comment) => comment.text)).toEqual([
      "Nothing here stops an expired token. What should happen when exp is behind nowSeconds?",
      "A token that says alg: none gets through as long as the flag is true. Reject it explicitly.",
      "Any audience is accepted. A token minted for another service would work here.",
    ])
  })

  it("returns no comments for a guarded token", () => {
    const ast: Node = parse("token.exp && token.aud && token.header.alg !== 'none'", { ecmaVersion: 2022 })

    expect(runJwtRules(ast as ParsedNode)).toEqual([])
  })
})
