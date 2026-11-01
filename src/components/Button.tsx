import type { ButtonHTMLAttributes } from "react"

type Variant = "primary" | "ghost" | "danger"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  loading?: boolean
}

const styles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  ghost: "bg-transparent border border-border text-text hover:border-border-strong",
  danger: "bg-fail text-white hover:opacity-90",
}

export function Button({ variant = "primary", loading, children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className ?? ""}`}
    >
      {loading ? <span className="animate-spin">⟳</span> : null}
      {children}
    </button>
  )
}
