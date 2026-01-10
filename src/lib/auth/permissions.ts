import { createAccessControl } from "better-auth/plugins/access";

const organizationStatement = {
  project: ["create", "delete"],
} as const;

export const organizationAccessControl = createAccessControl(organizationStatement);

export const ownerRole = organizationAccessControl.newRole({
  project: ["create", "delete"],
});

const adminStatement = {} as const;

export const adminAccessControl = createAccessControl(adminStatement);
