export type RunRequest = { type: "run"; code: string; tests: string }

export type TestResult = { name: string; passed: boolean }

export type RunResponse =
  | { type: "results"; results: TestResult[] }
  | { type: "timeout" }
  | { type: "error"; message: string }
