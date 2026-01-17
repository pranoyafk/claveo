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
import { useAuth } from "@/features/auth/hooks/use-auth";
import { authQueries } from "@/features/auth/queries";
import { authClient } from "@/lib/auth/client";
import { IconChevronDown, IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useTransition } from "react";
import { toast } from "sonner";

export function UserMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { authState } = useAuth();
  const { isMobile } = useSidebar();
  const [isSigningOutPending, startSigningOut] = useTransition();

  const handleSignOut = () => {
    startSigningOut(async () => {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Internal Server Error");
        return;
      }

      queryClient.removeQueries({ queryKey: authQueries.all });
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
              {authState.user.image ? (
                <AvatarImage src={authState.user.image} alt={authState.user.name} />
              ) : (
                <AvatarFallback className="rounded-lg">{authState.user.name.slice(0, 1)}</AvatarFallback>
              )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{authState.user.name}</span>
              <span className="truncate text-xs">{authState.user.email}</span>
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
