import { Page, PageAction, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useActiveOrganization } from "@/features/organizations/hooks/use-active-organization";
import { ProjectActionButton } from "@/features/projects/components/action-button";
import { useProject } from "@/features/projects/hooks/use-project";
import { projectsQueries } from "@/features/projects/queries";
import {
  IconBrandFigma,
  IconBrandGithub,
  IconBuilding,
  IconCalendar,
  IconClock,
  IconCopy,
  IconExternalLink,
  IconFlag,
  IconLink,
  IconProgress,
  IconUser,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

// Mock data for updates with more variety
const updates = [
  {
    id: 1,
    content:
      "Deployed the new landing page to staging. I've updated the hero section copy as requested. Please review the mobile responsiveness when you have a chance.",
    date: "Today, 10:23 AM",
    author: "You",
    authorInitials: "PM",
    tags: ["Staging", "Design"],
    isPublic: true,
    type: "deployment",
  },
  {
    id: 2,
    content:
      "Database schema finalized and migration scripts are ready. All tables have been tested in development environment.",
    date: "Jan 17, 4:00 PM",
    author: "You",
    authorInitials: "PM",
    tags: ["Backend", "Database"],
    isPublic: true,
    type: "backend",
  },
  {
    id: 3,
    content:
      "Completed the API integration for user authentication. OAuth flow is now working with Google and GitHub providers.",
    date: "Jan 16, 2:30 PM",
    author: "You",
    authorInitials: "PM",
    tags: ["API", "Auth"],
    isPublic: true,
    type: "integration",
  },
  {
    id: 4,
    content:
      "Internal note: Client requested changes to the color scheme. Need to update the primary palette from blue to purple.",
    date: "Jan 15, 11:00 AM",
    author: "You",
    authorInitials: "PM",
    tags: ["Design"],
    isPublic: false,
    type: "note",
  },
  {
    id: 5,
    content: "Finished responsive testing across all major breakpoints. Fixed layout issues on tablet view.",
    date: "Jan 14, 5:45 PM",
    author: "You",
    authorInitials: "PM",
    tags: ["Testing", "UI"],
    isPublic: true,
    type: "testing",
  },
];

// Mock project details
const projectDetails = {
  client: "Acme Corp",
  dueDate: "Jan 30, 2024",
  startDate: "Dec 15, 2023",
  progress: 73,
  links: [
    { name: "Figma", url: "#", icon: IconBrandFigma },
    { name: "GitHub", url: "#", icon: IconBrandGithub },
  ],
  portalUrl: "localhost:3000/pranoy/mobile-app",
};

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

  return (
    <Page>
      <PageHeader>
        <div className="flex flex-col gap-3">
          <div className="space-y-1.5">
            <PageTitle className="text-xl md:text-2xl font-semibold tracking-tight">{project.name}</PageTitle>
            {project.description && (
              <PageDescription className="text-muted-foreground/80 max-w-2xl text-sm leading-relaxed hidden sm:block">
                {project.description}
              </PageDescription>
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="rounded-lg gap-1.5 px-2.5 py-1.5 h-auto font-normal bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <IconBuilding className="size-3.5 text-muted-foreground" />
                  <span className="text-foreground/90">{activeOrg.name}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">Organization</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Badge variant="destructive" className="rounded-lg gap-1.5 px-2.5 py-1.5 h-auto font-medium">
                  <IconFlag className="size-3.5" />
                  High Priority
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">Project priority</TooltipContent>
            </Tooltip>

            <div className="hidden sm:block h-4 w-px bg-border/60" />

            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="rounded-lg gap-1.5 px-2.5 py-1.5 h-auto font-medium">
                  <IconProgress className="size-3.5" />
                  {projectDetails.progress}% Completed
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">Project completition</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <PageAction>
          <ProjectActionButton />
        </PageAction>
      </PageHeader>

      {/* Main Content */}
      <PageContent className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        {/* Updates Timeline */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Latest updates and progress on this project</CardDescription>
              <CardAction>
                <Badge variant="secondary" className="rounded-lg text-xs font-normal">
                  {updates.length} updates
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {updates.map((update, index) => (
                  <div key={update.id} className="relative p-4 md:p-5">
                    <div className="flex gap-3 md:gap-4">
                      {/* Avatar with timeline connector */}
                      <div className="relative shrink-0">
                        <Avatar className="size-9 md:size-10 ring-2 ring-background shadow-sm">
                          <AvatarImage src={undefined} />
                          <AvatarFallback className="text-xs font-medium bg-linear-to-br from-muted to-muted/50 text-muted-foreground">
                            {update.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        {/* Timeline connector line */}
                        {index < updates.length - 1 && (
                          <div className="absolute left-1/2 top-10 md:top-11 -translate-x-1/2 w-px h-[calc(100%+0.5rem)] bg-linear-to-b from-border/60 to-transparent" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-medium text-sm text-foreground">{update.author}</span>
                          <span className="text-muted-foreground/60 text-xs flex items-center gap-1">
                            <IconClock className="size-3" />
                            {update.date}
                          </span>
                        </div>

                        {/* Message */}
                        <p className="text-sm leading-relaxed text-muted-foreground/90">{update.content}</p>

                        {/* Tags */}
                        {update.tags && update.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {update.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-[10px] font-normal px-2 py-0.5 h-auto rounded-md bg-muted/30 text-muted-foreground/80 border-border/50 hover:bg-muted/50 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:sticky lg:top-6 order-1 lg:order-2">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={projectDetails.progress} className="w-full">
                <div className="flex items-center justify-between w-full mb-2">
                  <ProgressLabel className="text-xs text-muted-foreground">Completion</ProgressLabel>
                  <ProgressValue className="text-xs font-semibold" />
                </div>
              </Progress>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="text-xs text-muted-foreground mb-1">Started</div>
                  <div className="text-sm font-medium">{projectDetails.startDate}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="text-xs text-muted-foreground mb-1">Due Date</div>
                  <div className="text-sm font-medium">{projectDetails.dueDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Portal Card */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Client Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <div className="rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5 text-xs font-mono text-muted-foreground/80 pr-10 truncate">
                  {projectDetails.portalUrl}
                </div>
                <Tooltip>
                  <TooltipTrigger className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                    <IconCopy className="size-3.5" />
                  </TooltipTrigger>
                  <TooltipContent>Copy link</TooltipContent>
                </Tooltip>
              </div>
              <Button className="w-full gap-2" variant="outline" size="sm">
                <IconExternalLink className="size-3.5" />
                View as Client
              </Button>
            </CardContent>
          </Card>

          {/* Project Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Client */}
              <div className="flex items-center justify-between py-3 border-b border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconUser className="size-4" />
                  <span className="text-sm">Client</span>
                </div>
                <span className="text-sm font-medium">{projectDetails.client}</span>
              </div>

              {/* Due Date */}
              <div className="flex items-center justify-between py-3 border-b border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconCalendar className="size-4" />
                  <span className="text-sm">Due Date</span>
                </div>
                <span className="text-sm font-medium">{projectDetails.dueDate}</span>
              </div>

              {/* Links */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconLink className="size-4" />
                  <span className="text-sm">Links</span>
                </div>
                <div className="flex gap-2">
                  {projectDetails.links.map((link) => (
                    <Tooltip key={link.name}>
                      <TooltipTrigger className="inline-flex items-center justify-center size-8 rounded-lg border border-border/50 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all hover:scale-105">
                        <link.icon className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>{link.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </Page>
  );
}
