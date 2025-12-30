import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { OrgHeader } from "./-components/header";
import { OrgSidebar } from "./-components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/app/$organizationSlug")({
  component: RouteComponent,
  beforeLoad: ({ context, params }) => {
    const activeOrg = context.organizations.find(
      (o) => o.slug === params.organizationSlug,
    );

    if (!activeOrg) {
      throw redirect({ to: "/app" });
    }

    return { activeOrg };
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <OrgSidebar />
      <SidebarInset>
        <OrgHeader />
        <div className="flex-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
