import Link from "next/link"

export function Header() {
  return (
    <header className="site-header">
      <Link href="/day-zero" className="brand" aria-label="Cynbit Day Zero home">
        <span className="brand-mark">C</span>
        <span>CYNBIT / DAY ZERO</span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/day-zero">The brief</Link>
        <a href="https://cynbit.in/bitelevate" target="_blank" rel="noreferrer">BitElevate</a>
        <a href="https://www.cynbit.in" target="_blank" rel="noreferrer" className="nav-cta">Cynbit.in ↗</a>
      </nav>
    </header>
  )
}
