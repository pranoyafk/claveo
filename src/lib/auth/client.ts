import { createAuthClient } from "better-auth/react";
import { organizationClient, adminClient } from "better-auth/client/plugins";
import { adminAccessControl, organizationAccessControl } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac: adminAccessControl,
    }),
    organizationClient({
      ac: organizationAccessControl,
      dynamicAccessControl: {
        enabled: true,
      },
    }),
  ],
});
