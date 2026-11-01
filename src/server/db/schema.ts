import { pgTable, uuid, text, smallint, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const proofs = pgTable("proofs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  challengeId: text("challenge_id").notNull(),
  lab: text("lab").notNull(),
  rounds: smallint("rounds").notNull(),
  durationMs: integer("duration_ms").notNull(),
  nonce: text("nonce").notNull().unique(),
  enrollClickedAt: timestamp("enroll_clicked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export type Proof = typeof proofs.$inferSelect
