import { Page, PageAction, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/page";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useActiveOrganization } from "@/features/organizations/hooks/use-active-organization";
import { ProjectActionButton } from "@/features/projects/components/action-button";
import { useProject } from "@/features/projects/hooks/use-project";
import { projectsQueries } from "@/features/projects/queries";
import { IconBuilding, IconFlag, IconProgress } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationSlug/$projectSlug")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      projectsQueries.bySlug({
        organizationSlug: params.organizationSlug,
        projectSlug: params.projectSlug,
      }),
    );
  },
});

function RouteComponent() {
  const activeOrg = useActiveOrganization();
  const project = useProject();
  const progressValue = 73;

  return (
    <Page>
      <PageHeader>
        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <PageTitle className="text-xl tracking-tight">{project.name}</PageTitle>
            {project.description && (
              <PageDescription className="text-muted-foreground/80 max-w-xl sm:block hidden">
                {project.description}
              </PageDescription>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5 items-center">
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="rounded-md gap-1.5 px-2.5 py-1 h-auto font-normal">
                  <IconBuilding className="size-3.5 text-muted-foreground" />
                  <span className="text-foreground/90">{activeOrg.name}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Organization</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Badge variant="destructive" className="rounded-md gap-1.5 px-2.5 py-1 h-auto font-medium shadow-sm">
                  <IconFlag className="size-3.5" />
                  High Priority
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Project priority</TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" />

            <Tooltip>
              <TooltipTrigger className="cursor-default">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <IconProgress className="size-4" />
                  <span className="font-medium tabular-nums">{progressValue}%</span>
                </span>
              </TooltipTrigger>
              <TooltipContent>Project completion</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <PageAction>
          {/*<Button className="gap-2 shadow-sm" size={isMobile ? "icon-lg" : "lg"}>
            <IconSparkles className="size-4" />
            {!isMobile && "Update"}
          </Button>*/}
          <ProjectActionButton />
        </PageAction>
      </PageHeader>
      <PageContent></PageContent>
    </Page>
  );
}
