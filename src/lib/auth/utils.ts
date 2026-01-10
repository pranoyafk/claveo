import { auth } from "./config";

export const canDeleteProject = async ({ headers, organizationId }: { headers: Headers; organizationId: string }) => {
  const hasPerms = await auth.api.hasPermission({
    headers,
    body: {
      permissions: {
        project: ["delete"],
      },
      organizationId,
    },
  });

  return hasPerms.success;
};
