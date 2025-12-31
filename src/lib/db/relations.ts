import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId,
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId,
    }),
    members: r.many.members({
      from: r.users.id,
      to: r.members.userId,
    }),
    invitations: r.many.invitations({
      from: r.users.id,
      to: r.invitations.inviterId,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
  organizations: {
    roles: r.many.organizationRoles({
      from: r.organizations.id,
      to: r.organizationRoles.organizationId,
    }),
    members: r.many.members({
      from: r.organizations.id,
      to: r.members.organizationId,
    }),
    invitations: r.many.invitations({
      from: r.organizations.id,
      to: r.invitations.organizationId,
    }),
    projects: r.many.projects({
      from: r.organizations.id,
      to: r.projects.organizationId,
    }),
  },
  organizationRoles: {
    organization: r.one.organizations({
      from: r.organizationRoles.organizationId,
      to: r.organizations.id,
    }),
  },
  members: {
    organization: r.one.organizations({
      from: r.members.organizationId,
      to: r.organizations.id,
    }),
    user: r.one.users({
      from: r.members.userId,
      to: r.users.id,
    }),
  },
  invitations: {
    organization: r.one.organizations({
      from: r.invitations.organizationId,
      to: r.organizations.id,
    }),
    inviter: r.one.users({
      from: r.invitations.inviterId,
      to: r.users.id,
    }),
  },
  projects: {
    organization: r.one.organizations({
      from: r.projects.organizationId,
      to: r.organizations.id,
    }),
  },
}));
