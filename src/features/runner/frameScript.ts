import { workerSource } from "./workerSource"
import type { RunResponse } from "./messages"

const TIMEOUT_MS = 2000

export function runInWorker(
  code: string,
  tests: string,
  onResult: (r: RunResponse) => void
): void {
  const blob = new Blob([workerSource], { type: "application/javascript" })
  const url = URL.createObjectURL(blob)
  const worker = new Worker(url)
  const timer = setTimeout(() => {
    worker.terminate()
    URL.revokeObjectURL(url)
    onResult({ type: "timeout" })
  }, TIMEOUT_MS)

  worker.onmessage = (e) => {
    clearTimeout(timer)
    worker.terminate()
    URL.revokeObjectURL(url)
    onResult(e.data as RunResponse)
  }

  worker.onerror = () => {
    clearTimeout(timer)
    worker.terminate()
    URL.revokeObjectURL(url)
    onResult({ type: "error", message: "Worker crashed" })
  }

  worker.postMessage({ code, tests })
}
