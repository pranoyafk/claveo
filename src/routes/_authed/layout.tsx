import { authQueries } from "@/lib/queries/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const userSession = await context.queryClient.fetchQuery(
      authQueries.user(),
    );
    if (!userSession) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
    return {
      user: userSession.user,
    };
  },
});

function RouteComponent() {
  return <Outlet />;
}
