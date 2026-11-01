import { z } from "zod"

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  SIGNING_SECRET: z.string().min(32),
  SITE_URL: z.string().url(),
  ENROLL_URL: z.string().url(),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  console.error("Missing env vars:", parsed.error.flatten().fieldErrors)
  throw new Error("Invalid environment configuration")
}

export const env = parsed.data
