import { createAccessControl } from 'better-auth/plugins/access';

const organizationStatement = {
  project: ['create', 'share', 'update', 'delete']
} as const;

export const organizationAccessControl = createAccessControl(organizationStatement);

const adminStatement = {} as const;

export const adminAccessControl = createAccessControl(adminStatement);
