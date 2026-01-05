import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { authQueries } from "@/lib/queries/auth";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const userSession = await context.queryClient.ensureQueryData(authQueries.user());
    if (userSession?.user) {
      throw redirect({
        to: "/app",
      });
    }
  },
});
function RouteComponent() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
