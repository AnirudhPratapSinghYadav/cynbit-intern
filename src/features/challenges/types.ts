export type Comment = { line: number; text: string }

export type Challenge = {
  id: string
  lab: string
  branch: string
  fileTarget: string
  title: string
  description: string
  starter: string
  hints: [string, string]
}
