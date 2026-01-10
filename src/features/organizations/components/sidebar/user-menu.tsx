import { IconChevronDown, IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/client";
import { authQueries } from "@/features/auth/queries";

export function UserMenu() {
  const router = useRouter();
  const context = useRouteContext({ from: "/app" });

  const { isMobile } = useSidebar();
  const [isSigningOutPending, startSigningOut] = useTransition();

  const handleSignOut = () => {
    startSigningOut(async () => {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Internal Server Error");
        return;
      }

      context.queryClient.removeQueries({ queryKey: authQueries.all });
      router.invalidate();
    });
  };

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
            <Avatar className="h-8 w-8 rounded-lg">
              {context.authState.user.image ? (
                <AvatarImage src={context.authState.user.image} alt={context.authState.user.name} />
              ) : (
                <AvatarFallback className="rounded-lg">{context.authState.user.name.slice(0, 1)}</AvatarFallback>
              )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{context.authState.user.name}</span>
              <span className="truncate text-xs">{context.authState.user.email}</span>
            </div>
            <IconChevronDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DropdownMenuItem>
              <IconUserCircle />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" closeOnClick={false} onClick={() => startSigningOut(handleSignOut)}>
              {isSigningOutPending ? <Spinner /> : <IconLogout />}
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
