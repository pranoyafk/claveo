import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationSlug/settings")({
  component: RouteComponent,
  beforeLoad: () => ({ crumb: "Settings" }),
});

function RouteComponent() {
  return <div>Hello "/app/$organizationSlug/settings"!</div>;
}
