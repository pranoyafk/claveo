import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { OrgHeader } from "./-components/header";
import { OrgSidebar } from "./-components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { projectsQueries } from "@/lib/queries/projects";

export const Route = createFileRoute("/app/$organizationSlug")({
  component: RouteComponent,
  beforeLoad: ({ context, params }) => {
    const activeOrg = context.organizations.find((o) => o.slug === params.organizationSlug);

    if (!activeOrg) {
      throw redirect({ to: "/app" });
    }

    return { activeOrg };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(projectsQueries.byOrganization(context.activeOrg.slug));
  },
});

function RouteComponent() {
  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <OrgSidebar />
      <SidebarInset className="max-h-svh overflow-hidden">
        <OrgHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
