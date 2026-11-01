import { z } from "zod"

const schema = z.object({
  DATABASE_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  SIGNING_SECRET: z.string().min(32).optional(),
  SITE_URL: z.string().url().default("http://localhost:3000"),
  ENROLL_URL: z.string().url().default("https://www.cynbit.in/bitelevate"),
})

const parsed = schema.parse(process.env)

export const env = {
  ...parsed,
  DATABASE_URL: parsed.DATABASE_URL ?? "postgresql://demo:demo@localhost/demo",
  SIGNING_SECRET: parsed.SIGNING_SECRET ?? "day-zero-demo-signing-secret-change-me",
  isDemoMode: !parsed.DATABASE_URL || !parsed.UPSTASH_REDIS_REST_URL || !parsed.UPSTASH_REDIS_REST_TOKEN,
}
