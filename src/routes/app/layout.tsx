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
        to: "/auth/sign-in",
      });
    }

    return sessionData;
  },
});

function RouteComponent() {
  return <Outlet />;
}
