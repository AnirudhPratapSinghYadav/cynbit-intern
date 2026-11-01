import type { Metadata } from "next"
import "@/styles/globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Day Zero / Prove You Can Ship",
  description: "A real engineering brief from BitElevate. Fix one bug, get reviewed, and earn your proof.",
  openGraph: {
    title: "Day Zero / Prove You Can Ship",
    description: "One real bug. Twelve minutes. One honest signal.",
    type: "website",
  },
}

type Props = { children: React.ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
