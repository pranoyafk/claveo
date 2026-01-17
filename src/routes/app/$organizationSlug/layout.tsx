import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { OrgHeader } from "@/features/organizations/components/header";
import { OrgSidebar } from "@/features/organizations/components/sidebar";
import { projectsQueries } from "@/features/projects/queries";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationSlug")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(projectsQueries.byOrganization(params.organizationSlug));
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
