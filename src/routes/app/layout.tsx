import { ConfirmDialogProvider } from "@/components/confirm-dialog";
import { authQueries } from "@/features/auth/queries";
import { organizationQueries } from "@/features/organizations/queries";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const authState = await context.queryClient.ensureQueryData(authQueries.user());
    if (!authState?.session) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return {
      authState,
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(organizationQueries.list());
  },
});

function RouteComponent() {
  return (
    <ConfirmDialogProvider>
      <Outlet />
    </ConfirmDialogProvider>
  );
}
