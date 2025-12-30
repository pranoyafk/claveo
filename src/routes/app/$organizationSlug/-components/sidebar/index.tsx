import {
  IconMoneybag,
  IconPackage,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { OrgSwitcher } from "./org-switcher";
import { UserMenu } from "./user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Projects", icon: IconPackage, href: "/" },
  { label: "People", icon: IconUsers, href: "/" },
  { label: "Billing", icon: IconMoneybag, href: "/" },
  { label: "Settings", icon: IconSettings, href: "/" },
];

export function OrgSidebar() {
  const { state } = useSidebar();
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <OrgSwitcher />
        <Button
          variant="outline"
          className={cn({ "justify-between": state === "expanded" })}
        >
          {state === "expanded" ? (
            <>
              <div className="flex gap-1.5 items-center">
                <IconSearch />
                Search
              </div>
              <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                <span className="text-xs">⌘</span>J
              </kbd>
            </>
          ) : (
            <IconSearch />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.label}>
                  <SidebarMenuButton tooltip={link.label}>
                    <link.icon />
                    {link.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
