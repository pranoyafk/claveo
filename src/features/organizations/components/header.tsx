import { IconBell, IconFolderPlus, IconHelp } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { projectsQueries } from "@/features/projects/queries";
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog";
import { useActiveOrganization } from "@/features/organizations/hooks/use-active-organization";

export function OrgHeader() {
  const activeOrg = useActiveOrganization();
  const { data: projects } = useSuspenseQuery(projectsQueries.byOrganization(activeOrg.slug));
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" />
        <h1 className="font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <IconHelp stroke={1.5} className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <IconBell stroke={1.5} className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        {projects.length > 0 && (
          <CreateProjectDialog>
            <Button size="sm" variant="outline" className="ml-2 h-8">
              <IconFolderPlus /> Add Project
            </Button>
          </CreateProjectDialog>
        )}
      </div>
    </header>
  );
}
