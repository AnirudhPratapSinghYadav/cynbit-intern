"use client"

type Props = { url: string }

export function CopyLink({ url }: Props) {
  function copy() {
    navigator.clipboard.writeText(url).catch(() => {})
  }
  return (
    <button
      onClick={copy}
      id="copy-link-btn"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        color: "var(--accent)",
        fontSize: "0.875rem",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontWeight: 500,
        transition: "all 0.15s",
      }}
    >
      Copy link
    </button>
  )
}
