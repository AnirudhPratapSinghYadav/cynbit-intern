"use client"
import type { Comment } from "@/features/challenges/types"

type Props = {
  comments: Comment[]
  round: number
  onJump?: (line: number) => void
}

export function ReviewThread({ comments, round, onJump }: Props) {
  if (comments.length === 0) return null
  return (
    <section aria-label="Mentor review" style={{ marginTop: "1rem" }}>
      <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.75rem" }}>
        Round {round} of 3 · Automated review preview. Real BitElevate pull requests get reviewed by senior mentors.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {comments.map((c, i) => (
          <div
            key={i}
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--primary)",
              borderRadius: "var(--radius-sm)",
              padding: "0.75rem 1rem",
            }}
          >
            <button
              onClick={() => onJump?.(c.line)}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent)",
                fontSize: "0.75rem",
                cursor: "pointer",
                marginBottom: "0.25rem",
                padding: 0,
              }}
            >
              Line {c.line}
            </button>
            <p style={{ fontSize: "0.875rem", color: "var(--text)", lineHeight: 1.5 }}>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
