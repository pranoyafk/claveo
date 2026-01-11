import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { authQueries } from "@/features/auth/queries";
import { organizationQueries } from "@/features/organizations/queries";
import { ConfirmDialogProvider } from "@/components/confirm-dialog";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const authState = await context.queryClient.ensureQueryData(authQueries.user());
    if (!authState?.session) {
      throw redirect({
        to: "/sign-in",
      });
    }

    const organizations = await context.queryClient.ensureQueryData(organizationQueries.list());

    return {
      authState,
      organizations,
    };
  },
});

function RouteComponent() {
  return (
    <ConfirmDialogProvider>
      <Outlet />
    </ConfirmDialogProvider>
  );
}
