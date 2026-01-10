import {
  IconCalendarEvent,
  IconDots,
  IconEdit,
  IconFlag3,
  IconListCheck,
  IconPlayerPause,
  IconTrash,
} from "@tabler/icons-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Ensure this points to your custom card file
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectMutations, projectsQueries } from "@/lib/queries/projects";
import { useRouteContext } from "@tanstack/react-router";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

// --- Types ---
type ProjectStatus = "active" | "completed" | "on-hold" | "planning";
type ProjectPriority = "high" | "medium" | "low";

// --- Styles Helper ---
const getStatusStyles = (status: ProjectStatus) => {
  switch (status) {
    case "active":
      return "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20";
    case "completed":
      return "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20";
    case "on-hold":
      return "border-orange-500/20 text-orange-600 dark:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20";
    case "planning":
      return "border-zinc-500/20 text-zinc-500 dark:text-zinc-400 bg-zinc-500/10 hover:bg-zinc-500/20";
  }
};

const getPriorityColor = (priority: ProjectPriority) => {
  switch (priority) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-amber-500";
    case "low":
      return "text-blue-500";
  }
};

const ProjectCardAction = ({ projectSlug }: { projectSlug: string }) => {
  const queryClient = useQueryClient();
  const { activeOrg } = useRouteContext({
    from: "/app/$organizationSlug/",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteProjectMutation = useMutation({
    ...projectMutations.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectsQueries.byOrganization(activeOrg.slug).queryKey,
      });
      setIsOpen(false);
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground/50 hover:text-foreground -mt-1 -mr-2"
          />
        }
      >
        <IconDots className="size-4" />
        <span className="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <IconEdit className="mr-2 size-3.5" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlayerPause className="mr-2 size-3.5" /> Pause
        </DropdownMenuItem>
        <DropdownMenuItem
          closeOnClick={false}
          onClick={() => {
            deleteProjectMutation.mutateAsync({
              data: {
                organizationSlug: activeOrg.slug,
                projectSlug,
              },
            });
          }}
          className="text-destructive focus:text-destructive"
        >
          {deleteProjectMutation.isPending ? (
            <Spinner className="mr-2 size-3.5" />
          ) : (
            <IconTrash className="mr-2 size-3.5" />
          )}{" "}
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function ProjectCard({ project }: { project: Project }) {
  // Format Date
  const deadlineDate = new Date(project.createdAt);
  const formattedDate = deadlineDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Calculate if overdue
  const isOverdue = true;

  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:ring-foreground/20">
      {/* 1. HEADER: Title, Description, and Action Menu */}
      <CardHeader>
        <CardTitle className="line-clamp-1" title={project.name}>
          {project.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1.5">{project.description}</CardDescription>

        {/* The CardAction slot places this automatically to the top-right */}
        <CardAction>
          <ProjectCardAction projectSlug={project.slug} />
        </CardAction>
      </CardHeader>

      {/* 2. CONTENT: Status and Progress */}
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5 h-6 text-[11px] font-medium border uppercase tracking-wider",
              getStatusStyles("completed"),
            )}
          >
            Completed
          </Badge>

          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>100%</span>
          </div>
        </div>

        <Progress value={100} className="h-1.5 bg-muted" />
      </CardContent>

      {/* 3. FOOTER: Metadata (Gray Background Area) */}
      <CardFooter>
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          {/* Priority */}
          <div className="flex items-center gap-1.5" title="Priority">
            <IconFlag3 className={cn("size-3.5 fill-current opacity-80", getPriorityColor("high"))} />
            <span className="capitalize font-medium">High</span>
          </div>

          {/* Tasks */}
          <div className="flex items-center gap-1.5" title="Tasks Completed">
            <IconListCheck className="size-3.5 opacity-70" />
            <span>10/10</span>
          </div>

          {/* Deadline */}
          <div className={cn("flex items-center gap-1.5", isOverdue ? "text-red-500 font-medium" : "")}>
            <IconCalendarEvent className="size-3.5 opacity-70" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
