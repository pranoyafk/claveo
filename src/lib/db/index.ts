import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "./schema";
import { relations } from "./relations";
import { env } from "@/lib/env";

export const db = drizzle(env.DATABASE_URL, {
  schema: {
    ...schema,
    ...relations,
  },
});
