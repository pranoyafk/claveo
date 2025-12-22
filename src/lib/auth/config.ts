import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '@/lib/env'
import { db } from '@/lib/db'
import * as authSchema from '@/lib/db/schema/auth'
import { adminAccessControl, organizationAccessControl } from './permissions'
import { admin, organization } from 'better-auth/plugins'

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: '',
      clientSecret: '',
    },
    github: {
      clientId: '',
      clientSecret: '',
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [
    admin({
      ac: adminAccessControl,
      defaultRole: 'user',
    }),
    organization({
      ac: organizationAccessControl,
      dynamicAccessControl: {
        enabled: true,
        maximumRolesPerOrganization: 10,
      },
    }),
  ],
})
