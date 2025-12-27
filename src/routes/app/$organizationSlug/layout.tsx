import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { OrgHeader } from "./-components/header";
import { OrgSidebar } from "./-components/sidebar";

export const Route = createFileRoute("/app/$organizationSlug")({
  component: RouteComponent,
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
