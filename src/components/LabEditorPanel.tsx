"use client"

import { CodeEditor } from "@/features/editor/CodeEditor"
import { TestList } from "@/components/TestList"
import { ReviewThread } from "@/components/ReviewThread"
import { Button } from "@/components/Button"
import type { TestResult } from "@/features/runner/messages"
import type { useAttempt } from "@/features/attempt/useAttempt"

type Props = {
  code: string
  setCode: (value: string) => void
  jumpLine: number | undefined
  testResults: TestResult[]
  runStatus: "idle" | "running" | "done" | "timeout" | "error"
  runError: string | undefined
  attempt: ReturnType<typeof useAttempt>
  onRun: () => void
  onOpenPr: () => Promise<void>
  onJump: (line: number) => void
}

export function LabEditorPanel({ code, setCode, jumpLine, testResults, runStatus, runError, attempt, onRun, onOpenPr, onJump }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}><CodeEditor value={code} onChange={setCode} jumpLine={jumpLine} /></div>
      <div style={{ borderTop: "1px solid var(--border)", padding: "1rem 1.5rem", background: "var(--surface)", maxHeight: "42vh", overflow: "auto" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          <Button id="run-tests-btn" onClick={onRun} variant="ghost" loading={runStatus === "running"} disabled={runStatus === "running"}>Run tests</Button>
          <Button id="open-pr-btn" onClick={onOpenPr} loading={attempt.phase === "submitting"} disabled={attempt.phase === "closed" || attempt.phase === "submitting"}>{attempt.phase === "idle" ? "Start & Open PR" : "Open PR"}</Button>
        </div>
        {attempt.phase === "error" ? <p style={{ color: "var(--fail)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{attempt.errorMsg === "RATE_LIMITED" ? `Rate limited. Retry in ${attempt.retryAfter}s.` : (attempt.errorMsg ?? "Something went wrong.")}</p> : null}
        {attempt.phase === "closed" ? <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{attempt.errorMsg ?? "Round limit reached. Refresh to try a new ticket."}</p> : null}
        <TestList results={testResults} status={runStatus} errorMsg={runError} />
        {attempt.comments.length > 0 ? <ReviewThread comments={attempt.comments} round={attempt.round} onJump={onJump} /> : null}
      </div>
    </div>
  )
}
