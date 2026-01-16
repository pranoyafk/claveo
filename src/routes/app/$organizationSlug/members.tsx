import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationSlug/members")({
  component: RouteComponent,
  beforeLoad: () => ({ crumb: "Members" }),
});

function RouteComponent() {
  return <div>Hello "/app/$organizationSlug/members"!</div>;
}
