import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "./schema/auth";
import * as projectsSchema from "./schema/projects";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...authSchema,
    ...projectsSchema
  },
});
