import { IconBell, IconHelp } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function OrgHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" />
        <h1 className="font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
        >
          <IconHelp stroke={1.5} className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
        >
          <IconBell stroke={1.5} className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button size="sm" variant="outline" className="ml-2 h-8">
          Feedback
        </Button>
      </div>
    </header>
  );
}
