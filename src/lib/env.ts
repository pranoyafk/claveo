import z from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
})

export const env = envSchema.parse(Bun.env)
