"use client"
import { forwardRef, useEffect, useCallback } from "react"
import type { RunResponse } from "./messages"

type Props = {
  tests: string
  onResult: (r: RunResponse) => void
}

export const SandboxFrame = forwardRef<HTMLIFrameElement, Props>(function SandboxFrame({ onResult }, ref) {
  useEffect(() => {
    function handler(e: MessageEvent) {
      const iframe = (ref as React.RefObject<HTMLIFrameElement | null>)?.current
      if (e.source !== iframe?.contentWindow) return
      onResult(e.data as RunResponse)
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [onResult, ref])

  return (
    <iframe
      ref={ref}
      src="/sandbox/frame"
      sandbox="allow-scripts"
      style={{ display: "none" }}
      title="code runner"
    />
  )
})

export function useSandboxRun(frameRef: React.RefObject<HTMLIFrameElement | null>) {
  return useCallback(
    (code: string, tests: string) => {
      frameRef.current?.contentWindow?.postMessage({ type: "run", code, tests }, "*")
    },
    [frameRef]
  )
}
