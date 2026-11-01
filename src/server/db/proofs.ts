import { db } from "./client"
import { proofs } from "./schema"
import { eq } from "drizzle-orm"

export async function insertProof(data: {
  challengeId: string
  lab: string
  rounds: number
  durationMs: number
  nonce: string
}) {
  const [row] = await db.insert(proofs).values(data).returning({ id: proofs.id })
  return row.id
}

export async function getProof(id: string) {
  const [row] = await db.select().from(proofs).where(eq(proofs.id, id))
  return row ?? null
}

export async function markEnrollClick(id: string) {
  await db
    .update(proofs)
    .set({ enrollClickedAt: new Date() })
    .where(eq(proofs.id, id))
}
