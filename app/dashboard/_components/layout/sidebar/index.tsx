import { ClaveoLogo } from "@/components/common/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { UserType } from "@/lib/auth/client";
import { PrimaryNav } from "./primary-nav";
import { SecondaryNav } from "./secondary-nav";
import { UserMenu } from "./user-menu";

interface AppSidebarProps {
  user: UserType;
}

export function AppSidebar(props: AppSidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <ClaveoLogo href="/dashboard" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <PrimaryNav />
        <SecondaryNav />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={props.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
