import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  loader: ({ context }) => {
    const org = context.organizations[0];

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
