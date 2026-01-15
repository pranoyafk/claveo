import { IconCalendarEvent, IconFlag3, IconListCheck } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { ProjectCardAction } from "./project-card-action";
import type { Project } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useActiveOrganization } from "@/features/organizations/hooks/use-active-organization";

type ProjectCardProps = { project: Project };

export function ProjectCard(props: ProjectCardProps) {
  const activeOrg = useActiveOrganization();
  return (
    <Card className="relative">
      <Link
        to="/app/$organizationSlug/$projectSlug"
        params={{
          organizationSlug: activeOrg.slug,
          projectSlug: "hehe",
        }}
        className="absolute z-10 inset-0"
      />
      <CardHeader>
        <CardTitle className="line-clamp-1" title={props.project.name}>
          {props.project.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10 mt-1.5">
          {props.project.description || "Add a short project description"}
        </CardDescription>
        <CardAction className="relative z-20">
          <ProjectCardAction projectSlug={props.project.slug} />
        </CardAction>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline">Completed</Badge>
          <Badge variant="secondary">72%</Badge>
        </div>
        <Progress value={72} />
      </CardContent>
      <CardFooter className="justify-between mt-auto">
        <Badge variant="secondary">
          <IconFlag3 /> High
        </Badge>
        <Badge variant="ghost">
          <IconListCheck /> 7/10
        </Badge>
        <Badge variant="secondary">
          <IconCalendarEvent />
          13 Jan
        </Badge>
      </CardFooter>
    </Card>
  );
}
