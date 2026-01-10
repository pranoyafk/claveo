import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { adminAccessControl, organizationAccessControl, ownerRole } from "./permissions";
import { env } from "@/lib/env";
import { db } from "@/lib/db";
import * as authSchema from "@/lib/db/schema/auth";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: "",
      clientSecret: "",
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    admin({
      ac: adminAccessControl,
      defaultRole: "user",
    }),
    organization({
      ac: organizationAccessControl,
      roles: {
        owner: ownerRole,
      },
      dynamicAccessControl: {
        enabled: true,
        maximumRolesPerOrganization: 10,
      },
    }),
    tanstackStartCookies(),
  ],
});

export type User = (typeof auth.$Infer)["Session"]["user"];
export type Organisation = (typeof auth.$Infer)["Organization"];
export type Member = (typeof auth.$Infer)["Member"];
export type Invitation = (typeof auth.$Infer)["Invitation"];
export type Team = (typeof auth.$Infer)["Team"];
export type TeamMember = (typeof auth.$Infer)["TeamMember"];
