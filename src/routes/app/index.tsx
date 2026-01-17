import { organizationQueries } from "@/features/organizations/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const orgs = await context.queryClient.ensureQueryData(organizationQueries.list());
    if (orgs.length > 0)
      throw redirect({
        to: "/app/$organizationSlug",
        params: {
          organizationSlug: orgs[0]?.slug,
        },
      });
  },
});

function RouteComponent() {
  return <div>Something went wrong.</div>;
}
