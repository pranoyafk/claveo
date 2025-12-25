import { Logo } from "@/components/logo";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserMenu } from "./-components/user-menu";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/projects")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return (
    <main>
      <header className="h-14 border-b sticky top-0">
        <div className="flex items-center justify-between h-full max-w-5xl mx-auto ">
          <Link to="/">
            <Logo size={35} />
          </Link>
          <UserMenu user={user} />
        </div>
      </header>
      <Outlet />
    </main>
  );
}
