import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth/server";
import { AppHeader } from "./_components/layout/header";
import { AppSidebar } from "./_components/layout/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}
export default async function DashboardLayout(props: DashboardLayoutProps) {
  const getSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!getSession) return redirect("/sign-in");

  return (
    <SidebarProvider>
      <AppSidebar user={getSession.user} />
      <SidebarInset>
        <AppHeader />
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
}
