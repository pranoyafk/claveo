import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import type { Icon } from "@tabler/icons-react";
import { IconMoneybag, IconPackage, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react";
import type { LinkOptions } from "@tanstack/react-router";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useActiveOrganization } from "../../hooks/use-active-organization";
import { OrgSwitcher } from "./org-switcher";
import { UserMenu } from "./user-menu";

type NavLink = {
  label: string;
  icon: Icon;
  opts: LinkOptions;
  active: boolean;
};

export function OrgSidebar() {
  const { state } = useSidebar();
  const activeOrg = useActiveOrganization();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navLinks: Array<NavLink> = [
    {
      label: "Projects",
      icon: IconPackage,
      opts: { to: "/app/$organizationSlug", params: { organizationSlug: activeOrg.slug } },
      active: pathname === `/app/${activeOrg.slug}`,
    },
    {
      label: "Members",
      icon: IconUsers,
      opts: { to: "/app/$organizationSlug/members", params: { organizationSlug: activeOrg.slug } },
      active: false,
    },
    { label: "Billing", icon: IconMoneybag, opts: { to: "/404" }, active: false },
    {
      label: "Settings",
      icon: IconSettings,
      opts: { to: "/app/$organizationSlug/settings", params: { organizationSlug: activeOrg.slug } },
      active: false,
    },
  ];

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <OrgSwitcher />
        <Button variant="outline" className={cn({ "justify-between": state === "expanded" })}>
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
                  <SidebarMenuButton isActive={link.active} tooltip={link.label} onClick={() => navigate(link.opts)}>
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
