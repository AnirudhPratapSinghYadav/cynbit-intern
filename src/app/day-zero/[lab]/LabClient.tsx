"use client"

import { useState, useRef, useCallback } from "react"
import { useAttempt } from "@/features/attempt/useAttempt"
import { SandboxFrame, useSandboxRun } from "@/features/runner/SandboxFrame"
import { LabEditorPanel } from "@/components/LabEditorPanel"
import { LabTicket } from "@/components/LabTicket"
import { LabTicketBar } from "@/components/LabTicketBar"
import { ApprovedState } from "@/components/ApprovedState"
import type { Challenge } from "@/features/challenges/types"
import type { RunResponse, TestResult } from "@/features/runner/messages"

type RunStatus = "idle" | "running" | "done" | "timeout" | "error"
type Props = { challenge: Challenge; tests: string }

export function LabClient({ challenge, tests }: Props) {
  const [code, setCode] = useState(challenge.starter)
  const [runStatus, setRunStatus] = useState<RunStatus>("idle")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [runError, setRunError] = useState<string>()
  const [jumpLine, setJumpLine] = useState<number>()
  const [hintsOpen, setHintsOpen] = useState(false)
  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const sendRun = useSandboxRun(frameRef)
  const attempt = useAttempt(challenge.id)

  const onRunResult = useCallback((result: RunResponse) => {
    if (result.type === "results") { setTestResults(result.results); setRunStatus("done"); return }
    if (result.type === "timeout") { setRunStatus("timeout"); return }
    setRunError(result.message)
    setRunStatus("error")
  }, [])

  function runTests() {
    setRunStatus("running")
    setTestResults([])
    sendRun(code, tests)
  }

  async function openPr() {
    if (attempt.phase === "idle") { await attempt.start(); return }
    if (runStatus !== "done") { runTests(); return }
    await attempt.submit(code, testResults)
  }

  if (attempt.phase === "approved" && attempt.proofId) return <ApprovedState proofId={attempt.proofId} />
  return (
    <>
      <SandboxFrame ref={frameRef} tests={tests} onResult={onRunResult} />
      <div style={{ height: "calc(100vh - 100px)", display: "flex", flexDirection: "column" }}>
        <LabTicketBar challenge={challenge} hintsOpen={hintsOpen} onToggleHints={() => setHintsOpen(!hintsOpen)} />
        <div style={{ flex: 1, overflow: "hidden", display: "grid", gridTemplateColumns: "minmax(240px, 340px) 1fr" }}>
          <LabTicket challenge={challenge} hintsOpen={hintsOpen} />
          <LabEditorPanel code={code} setCode={setCode} jumpLine={jumpLine} testResults={testResults} runStatus={runStatus} runError={runError} attempt={attempt} onRun={runTests} onOpenPr={openPr} onJump={setJumpLine} />
        </div>
      </div>
    </>
  )
}
