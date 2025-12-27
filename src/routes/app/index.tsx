import { authQueries } from "@/lib/queries/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    let orgs = await context.queryClient.ensureQueryData(
      authQueries.organizations(),
    );

    const activeOrgId = context.session.activeOrganizationId;
    const targetOrg = orgs.find((org) => org.id === activeOrgId) || orgs[0];

    throw redirect({
      to: "/app/$organizationSlug",
      params: {
        organizationSlug: targetOrg.slug,
      },
    });
  },
});

function RouteComponent() {
  return <div>Redirecting...</div>;
}
