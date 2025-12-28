import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { OrgHeader } from "./-components/header";
import { OrgSidebar } from "./-components/sidebar";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/app/$organizationSlug")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { organizations } = context;
    const activeOrg = organizations.find(
      (organization) => organization.slug === params.organizationSlug,
    );
    if (!activeOrg) {
      throw notFound();
    }

    return { activeOrg };
  },
});

function RouteComponent() {
  const { activeOrg } = Route.useLoaderData();
  useEffect(() => {
    authClient.organization.setActive({
      organizationId: activeOrg.id,
      organizationSlug: activeOrg.slug,
    });
  }, [activeOrg]);
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
