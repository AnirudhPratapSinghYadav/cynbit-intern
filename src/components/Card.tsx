import type { ReactNode, HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  glass?: boolean
}

export function Card({ children, glass, className, style, ...rest }: Props) {
  return (
    <div
      {...rest}
      style={{
        background: glass ? "rgba(255,253,248,0.86)" : "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: glass ? "var(--shadow)" : undefined,
        backdropFilter: glass ? "blur(16px)" : undefined,
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  )
}
