import type { Metadata } from "next"
import "@/styles/globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Day Zero — Try BitElevate Before You Enroll",
  description: "Fix a real bug in the browser and get your Day Zero proof before paying for BitElevate. A try-before-you-pay experience for Cynbit's remote internship.",
  openGraph: {
    title: "Day Zero — Try BitElevate Before You Enroll",
    description: "Fix a real bug. Get a proof. Then decide.",
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
