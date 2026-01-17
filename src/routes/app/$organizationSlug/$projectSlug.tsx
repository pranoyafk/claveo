import { Page, PageAction, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useActiveOrganization } from "@/features/organizations/hooks/use-active-organization";
import { ProjectActionButton } from "@/features/projects/components/action-button";
import { useProject } from "@/features/projects/hooks/use-project";
import { projectsQueries } from "@/features/projects/queries";
import { IconBuilding, IconExternalLink, IconFlag, IconProgress } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

const updates = [
  {
    id: 1,
    content:
      "Deployed the new landing page to staging. I've updated the hero section copy as requested. Please review the mobile responsiveness when you have a chance.",
    date: "Today, 10:23 AM",
    author: "You",
    tags: ["Staging", "Design"],
    isPublic: true,
  },
  {
    id: 2,
    content: "Database schema finalized and migration scripts are ready.",
    date: "Jan 12, 4:00 PM",
    author: "You",
    tags: ["Backend"],
    isPublic: true,
  },
  {
    id: 3,
    content:
      "Deployed the new landing page to staging. I've updated the hero section copy as requested. Please review the mobile responsiveness when you have a chance.",
    date: "Today, 10:23 AM",
    author: "You",
    tags: ["Staging", "Design"],
    isPublic: true,
  },
  {
    id: 4,
    content:
      "Deployed the new landing page to staging. I've updated the hero section copy as requested. Please review the mobile responsiveness when you have a chance.",
    date: "Today, 10:23 AM",
    author: "You",
    tags: ["Staging", "Design"],
    isPublic: true,
  },
  {
    id: 5,
    content:
      "Deployed the new landing page to staging. I've updated the hero section copy as requested. Please review the mobile responsiveness when you have a chance.",
    date: "Today, 10:23 AM",
    author: "You",
    tags: ["Staging", "Design"],
    isPublic: true,
  },
  {
    id: 6,
    content:
      "Deployed the new landing page to staging. I've updated the hero section copy as requested. Please review the mobile responsiveness when you have a chance.",
    date: "Today, 10:23 AM",
    author: "You",
    tags: ["Staging", "Design"],
    isPublic: true,
  },
];

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

            <Separator orientation="vertical" className="h-4" />

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
          <ProjectActionButton />
        </PageAction>
      </PageHeader>

      <PageContent className="grid grid-cols-1 gap-10 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2 space-y-10">
          <div className="relative space-y-8">
            <div className="absolute left-4.75 top-2 bottom-0 w-px bg-border/60" />

            {updates.map((update) => (
              <div key={update.id} className="relative pl-12">
                <div className="absolute left-0 top-0 z-10">
                  <Avatar className="size-10 border-4 border-background ring-1 ring-border bg-background">
                    <AvatarFallback className="text-xs text-muted-foreground bg-muted">PM</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-foreground">{update.author}</span>
                    <span className="text-muted-foreground text-xs">• {update.date}</span>
                    {!update.isPublic && (
                      <Badge
                        variant="secondary"
                        className="h-5 px-1.5 text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20"
                      >
                        Internal Note
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm leading-relaxed text-muted-foreground/90 whitespace-pre-wrap">
                    {update.content}
                  </div>

                  {update.tags && (
                    <div className="flex gap-2 mt-1">
                      {update.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-normal text-muted-foreground bg-muted/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 sticky top-6">
          <Card className="bg-muted/30 border-dashed shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Client Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border bg-background/50 px-3 py-2 text-xs font-mono text-muted-foreground break-all">
                localhost:3000/{activeOrg.slug}/{project.slug.slice(0, 5)}...
              </div>
              <Button className="w-full gap-2" variant="outline" size="sm">
                <IconExternalLink className="size-3.5" />
                View as Client
              </Button>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Client</span>
                <span className="font-medium">Acme Corp</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Due Date</span>
                <span>Jan 30, 2024</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Links</span>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-xs font-medium border border-border px-2 py-1 rounded-md bg-muted/30"
                  >
                    Figma
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-xs font-medium border border-border px-2 py-1 rounded-md bg-muted/30"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </Page>
  );
}
``;
