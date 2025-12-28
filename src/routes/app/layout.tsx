import { authClient } from "@/lib/auth/client";
import { authQueries } from "@/lib/queries/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const sessionData = await context.queryClient.ensureQueryData(
      authQueries.user(),
    );
    if (!sessionData?.session) {
      throw redirect({
        to: "/sign-in",
      });
    }

    const orgs = await context.queryClient.ensureQueryData(
      authQueries.organizations(),
    );

    return {
      session: sessionData.session,
      user: sessionData.user,
      organizations: orgs,
    };
  },
});

function RouteComponent() {
  return <Outlet />;
}
