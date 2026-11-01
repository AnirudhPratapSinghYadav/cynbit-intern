import { NextRequest, NextResponse } from "next/server"

const SANDBOX_CSP =
  "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob: data:; worker-src blob: data:; connect-src 'none'; frame-ancestors 'self'"

function buildMainCsp(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self'",
    "frame-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ")
}

function createNonce() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...bytes))
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const isSandbox = req.nextUrl.pathname.startsWith("/sandbox")
  const nonce = createNonce()

  res.headers.set(
    "Content-Security-Policy",
    isSandbox ? SANDBOX_CSP : buildMainCsp(nonce)
  )
  res.headers.set("X-Nonce", nonce)
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains")
  res.headers.set("X-Content-Type-Options", "nosniff")
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  res.headers.set("X-Frame-Options", "DENY")

  return res
}

export const config = { matcher: "/((?!_next/static|_next/image|favicon.ico).*)" }
