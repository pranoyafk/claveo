import { createFileRoute } from "@tanstack/react-router";
import { ProjectsEmptyState } from "./-components/empty-state";

export const Route = createFileRoute("/app/$organizationSlug/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90dvh] w-full">
      <ProjectsEmptyState />
    </div>
  );
}
