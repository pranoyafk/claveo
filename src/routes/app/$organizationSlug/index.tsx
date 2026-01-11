import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/features/projects/components/project-card";
import { projectsQueries } from "@/features/projects/queries";
import { ProjectsEmptyState } from "@/features/projects/components/empty-state";

export const Route = createFileRoute("/app/$organizationSlug/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { activeOrg } = Route.useRouteContext();
  const { data: projects } = useSuspenseQuery(projectsQueries.byOrganization(activeOrg.slug));
  return (
    <div className="flex flex-col items-center min-h-full w-full">
      <div className="grid container mx-auto px-4 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      {projects.length === 0 && <ProjectsEmptyState />}
    </div>
  );
}
