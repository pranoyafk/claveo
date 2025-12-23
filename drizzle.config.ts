import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: Bun.env.DATABASE_URL!,
  },
})
