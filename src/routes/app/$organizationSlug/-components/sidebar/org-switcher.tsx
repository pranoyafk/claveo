import {
  IconChevronDown,
  IconPackageExport,
  IconPlus,
} from "@tabler/icons-react";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import { CreateOrganizationDialog } from "../create-org-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// function OrgSwitcherSkeleton() {
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <SidebarMenuButton size="lg" className="pointer-events-none">
//           <Skeleton className="aspect-square size-8 rounded-lg" />
//           <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
//             <Skeleton className="h-3.5 w-20" />
//             <Skeleton className="h-3 w-12" />
//           </div>
//           <Skeleton className="ml-auto size-4" />
//         </SidebarMenuButton>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

export function OrgSwitcher() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const [openOrganizationCreateDialog, setOrganizationCreateDialog] =
    useState<boolean>(false);
  const { organizations } = useRouteContext({
    from: "/app",
  });
  const { activeOrg } = useRouteContext({
    from: "/app/$organizationSlug/",
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconPackageExport className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeOrg.name}</span>
              <span className="truncate text-xs">Free</span>
            </div>
            <IconChevronDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Organizations
              </DropdownMenuLabel>
              {organizations.map((org, index) => (
                <DropdownMenuItem
                  key={org.slug}
                  className="gap-2 p-2"
                  onClick={() =>
                    navigate({
                      to: "/app/$organizationSlug",
                      params: {
                        organizationSlug: org.slug,
                      },
                    })
                  }
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <IconPackageExport className="size-3.5 shrink-0" />
                  </div>
                  {org.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />

              <DropdownMenuItem
                closeOnClick={false}
                className="gap-2 p-2"
                onClick={() => setOrganizationCreateDialog(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <IconPlus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Create</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateOrganizationDialog
          open={openOrganizationCreateDialog}
          onOpenChange={setOrganizationCreateDialog}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
