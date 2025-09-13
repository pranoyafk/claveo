import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '../env';
import {account, session, user, verification} from './schema/auth'

export const db = drizzle(env.DATABASE_URL, {schema: {
    user,
    account, 
    verification,
    session
}});
