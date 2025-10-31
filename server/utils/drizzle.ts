import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../db/schemas';

export const tables = schema;

export function useDrizzle() {
	const sql = neon(process.env.DATABASE_URL!);

	return drizzle(sql, { schema });
}

export type User = typeof schema.usersTable.$inferSelect;
