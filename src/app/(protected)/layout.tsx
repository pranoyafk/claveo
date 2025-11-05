import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./_components/header";

type ProtectedProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: ProtectedProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
