import type { Metadata } from "next"
import { challenges } from "@/features/challenges"
import { ChallengeCard } from "@/components/ChallengeCard"

export const metadata: Metadata = {
  title: "Day Zero / Prove You Can Ship",
  description: "A real engineering brief from BitElevate. Fix one bug, get reviewed, and earn your proof.",
}

export default function DayZeroPage() {
  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">BitElevate / Entry protocol</p>
          <h1>Don&apos;t tell us you can code. <em>Show us.</em></h1>
          <p className="hero-lede">Day Zero is a small, honest version of the work. Pick a production-shaped bug, reason through it, and leave the code better than you found it.</p>
          <div className="hero-actions">
            <a href="#labs" className="button-dark">Choose a brief</a>
            <a href="https://cynbit.in/bitelevate" target="_blank" rel="noreferrer" className="button-link">What is BitElevate?</a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Day Zero protocol summary">
          <div className="panel-top"><span>DAY_ZERO / 001</span><span className="panel-status">● OPEN</span></div>
          <h2 className="panel-title">A better signal than a CV.</h2>
          <div className="panel-grid">
            <div className="panel-stat"><strong>01</strong><span>Real bug</span></div>
            <div className="panel-stat"><strong>12m</strong><span>Timebox</span></div>
            <div className="panel-stat"><strong>03</strong><span>Review rounds</span></div>
            <div className="panel-stat"><strong>1×</strong><span>Shareable proof</span></div>
          </div>
        </aside>
      </section>

      <section id="labs">
        <div className="section-heading">
          <h2>Choose your first hard problem.</h2>
          <p>These are not quiz questions. They are small slices of the decisions engineers make when systems meet reality.</p>
        </div>
        <div className="challenge-grid">
          {challenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
        </div>
      </section>

      <section className="proof-strip">
        <strong>Work like an architect.<br />Leave evidence.</strong>
        <p>You will get automated tests, line-level mentor feedback, and a public proof when your patch is approved. No account. No payment. No theatre before the work.</p>
      </section>
    </div>
  )
}
