import { projectsQueries } from "@/features/projects/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationSlug/$projectSlug")({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(
      projectsQueries.bySlug({
        organizationSlug: context.activeOrg.slug,
        projectSlug: params.projectSlug,
      }),
    );

    return {
      project,
    };
  },

  staticData: {
    breadcrumb: (match) => {
      const projectName = match.context?.project?.name;
      return projectName;
    },
  },
});

function RouteComponent() {
  return <div>Hello "/app/$organizationSlug/$projectSlug"!</div>;
}
