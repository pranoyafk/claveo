import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { verifySession } from "@/lib/dal/verify-session";
import { Header } from "./header";
import { SidebarMainNav } from "./nav-main";
import { NavUser } from "./nav-user";

export async function AppSidebar() {
  const { user } = await verifySession();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainNav />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
