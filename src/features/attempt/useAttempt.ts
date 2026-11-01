"use client"
import { useState, useCallback } from "react"
import { startAttempt } from "./startAttempt"
import { submitAttempt } from "./submitAttempt"
import type { TestResult } from "@/features/runner/messages"
import type { Comment } from "@/features/challenges/types"

type Phase = "idle" | "started" | "submitting" | "approved" | "closed" | "error"

type State = {
  phase: Phase
  token: string | null
  round: number
  comments: Comment[]
  proofId: string | null
  errorMsg: string | null
  retryAfter: number | null
}

export function useAttempt(challengeId: string) {
  const [state, setState] = useState<State>({
    phase: "idle", token: null, round: 1, comments: [], proofId: null, errorMsg: null, retryAfter: null,
  })

  const start = useCallback(async () => {
    try {
      const { token, round } = await startAttempt(challengeId)
      setState(s => ({ ...s, phase: "started", token, round, comments: [], errorMsg: null }))
    } catch (e: unknown) {
      const err = e as Error & { retryAfter?: number }
      setState(s => ({ ...s, phase: "error", errorMsg: err.message, retryAfter: err.retryAfter ?? null }))
    }
  }, [challengeId])

  const submit = useCallback(async (code: string, results: TestResult[]) => {
    if (!state.token) return
    setState(s => ({ ...s, phase: "submitting" }))
    try {
      const data = await submitAttempt({ token: state.token, code, results })
      if (data.verdict === "approved") {
        setState(s => ({ ...s, phase: "approved", proofId: data.proofId }))
      } else if (data.verdict === "changes_requested") {
        setState(s => ({ ...s, phase: "started", token: data.token, round: data.round, comments: data.comments }))
      } else {
        setState(s => ({ ...s, phase: "closed", errorMsg: data.hint ?? null }))
      }
    } catch (e: unknown) {
      const err = e as Error & { retryAfter?: number }
      setState(s => ({ ...s, phase: "error", errorMsg: err.message, retryAfter: err.retryAfter ?? null }))
    }
  }, [state.token])

  return { ...state, start, submit }
}
