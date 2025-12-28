import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const activeOrganizationId = context.session.activeOrganizationId;
    const org =
      context.organizations.find(
        (organization) => organization.id === activeOrganizationId,
      ) || context.organizations[0];

    throw redirect({
      to: "/app/$organizationSlug",
      params: {
        organizationSlug: org.slug,
      },
    });
  },
});

function RouteComponent() {
  return <div>Redirecting...</div>;
}
