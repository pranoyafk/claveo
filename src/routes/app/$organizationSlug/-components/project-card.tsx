import React from "react";
import {
  IconCalendarEvent,
  IconDots,
  IconEdit,
  IconFlag3,
  IconListCheck,
  IconPlayerPause,
  IconTrash,
  IconTrendingUp,
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

// --- Types ---
type ProjectStatus = "active" | "completed" | "on-hold" | "planning";
type ProjectPriority = "high" | "medium" | "low";

export interface Project {
  status: ProjectStatus;
  name: string;
  description: string;
  progress: number;
  deadline: string;
  priority: ProjectPriority;
  taskStats: { total: number; completed: number };
}

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

export function ProjectCard({ project }: { project: Project }) {
  // Format Date
  const deadlineDate = new Date(project.deadline);
  const formattedDate = deadlineDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Calculate if overdue
  const isOverdue = new Date() > deadlineDate && project.status !== "completed";

  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:ring-foreground/20">
      {/* 1. HEADER: Title, Description, and Action Menu */}
      <CardHeader>
        <CardTitle className="line-clamp-1" title={project.name}>
          {project.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1.5">
          {project.description}
        </CardDescription>

        {/* The CardAction slot places this automatically to the top-right */}
        <CardAction>
          <DropdownMenu>
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
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <IconTrash className="mr-2 size-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      {/* 2. CONTENT: Status and Progress */}
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5 h-6 text-[11px] font-medium border uppercase tracking-wider",
              getStatusStyles(project.status),
            )}
          >
            {project.status}
          </Badge>

          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>{project.progress}%</span>
          </div>
        </div>

        <Progress
          value={project.progress}
          className="h-1.5 bg-muted"
          // Note: Add indicatorClassName if your Progress component supports it for specific status colors
        />
      </CardContent>

      {/* 3. FOOTER: Metadata (Gray Background Area) */}
      <CardFooter>
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          {/* Priority */}
          <div className="flex items-center gap-1.5" title="Priority">
            <IconFlag3
              className={cn(
                "size-3.5 fill-current opacity-80",
                getPriorityColor(project.priority),
              )}
            />
            <span className="capitalize font-medium">{project.priority}</span>
          </div>

          {/* Tasks */}
          <div className="flex items-center gap-1.5" title="Tasks Completed">
            <IconListCheck className="size-3.5 opacity-70" />
            <span>
              {project.taskStats.completed}/{project.taskStats.total}
            </span>
          </div>

          {/* Deadline */}
          <div
            className={cn(
              "flex items-center gap-1.5",
              isOverdue ? "text-red-500 font-medium" : "",
            )}
          >
            <IconCalendarEvent className="size-3.5 opacity-70" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
