"use client";
import Link from "next/link";
import { SiteLogo } from "@/components/shared/site-logo";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

export function Header() {
  const sidebar = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size="lg">
          <Link href="/dashboard">
            <SiteLogo showText={sidebar.state === "expanded"} />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
