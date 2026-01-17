import { Page, PageAction, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/page";
import { Button } from "@/components/ui/button";
import { useActiveOrganization } from "@/features/organizations/hooks/use-active-organization";
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog";
import { ProjectsEmptyState } from "@/features/projects/components/empty-state";
import { ProjectCard } from "@/features/projects/components/project-card";
import { projectsQueries } from "@/features/projects/queries";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconFolderPlus } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationSlug/")({
  component: RouteComponent,
});

function RouteComponent() {
  const activeOrg = useActiveOrganization();
  const { data: projects } = useSuspenseQuery(projectsQueries.byOrganization(activeOrg.slug));
  const isMobile = useIsMobile();

  return (
    <Page>
      <PageHeader>
        <PageTitle>Projects</PageTitle>
        <PageDescription>Manage and track your organization&apos;s projects.</PageDescription>
        <PageAction>
          <CreateProjectDialog>
            <Button size={isMobile ? "icon-lg" : "lg"}>
              <IconFolderPlus />
              {!isMobile && "Add Project"}
            </Button>
          </CreateProjectDialog>
        </PageAction>
      </PageHeader>
      <PageContent>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        {projects.length === 0 && <ProjectsEmptyState />}
      </PageContent>
    </Page>
  );
}
