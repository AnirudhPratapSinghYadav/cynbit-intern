import Link from "next/link"
import type { Challenge } from "@/features/challenges/types"

const challengeNumbers: Record<string, string> = {
  "jwt-expiry": "01",
  "listener-leak": "02",
  "cache-key": "03",
}

type Props = { challenge: Challenge }

export function ChallengeCard({ challenge }: Props) {
  return (
    <Link href={`/day-zero/${challenge.id}`} className="challenge-card">
      <div className="challenge-card-top">
        <span>{challengeNumbers[challenge.id] ?? "00"} / LAB</span>
        <span>12 MIN</span>
      </div>
      <div className="challenge-card-body">
        <p className="challenge-lab">{challenge.lab}</p>
        <h3>{challenge.title}</h3>
        <p className="challenge-description">{challenge.description}</p>
      </div>
      <div className="challenge-card-bottom">
        <code>{challenge.branch}</code>
        <span className="challenge-arrow">↗</span>
      </div>
    </Link>
  )
}
