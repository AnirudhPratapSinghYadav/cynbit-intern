import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { challenges, testSuites } from "@/features/challenges"
import { LabClient } from "./LabClient"

type Props = { params: Promise<{ lab: string }> }
export const instant = false

export async function generateStaticParams() {
  return challenges.map((c) => ({ lab: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lab } = await params
  const challenge = challenges.find((c) => c.id === lab)
  if (!challenge) return {}
  return {
    title: `${challenge.title} — Day Zero`,
    description: `Fix the ${challenge.title} bug in the browser. Get mentor-style feedback. Try BitElevate before you pay.`,
  }
}

export default async function LabPage({ params }: Props) {
  const { lab } = await params
  const challenge = challenges.find((c) => c.id === lab)
  if (!challenge) notFound()
  const tests = testSuites[lab]
  if (!tests) notFound()
  return <LabClient challenge={challenge} tests={tests} />
}
