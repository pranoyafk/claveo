"use client";
import Link from "next/link";
import { ClaveoLogo } from "@/components/common/logo";
import { MaxWidthWrapper } from "@/components/common/max-width";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/client";

const navLinks: { name: string; href: __next_route_internal_types__.RouteImpl<string> }[] = [
  { name: "Blogs", href: "/blogs" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Privacy", href: "/privacy" },
];
export function HeaderSection() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-dashed bg-background/80 backdrop-blur">
      <MaxWidthWrapper className="flex px-4 items-center justify-between h-full gap-3">
        <div className="flex items-center gap-12">
          <ClaveoLogo />
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                key={link.href}
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="md:flex items-center gap-3 hidden">
          <ActionButton />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}

function ActionButton() {
  const { data: getSession, isPending } = authClient.useSession();
  if (isPending) {
    return <Skeleton className="w-20 h-8" />;
  }
  return getSession?.user ? (
    <Button size="sm" asChild>
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  ) : (
    <Button asChild size="sm">
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
}
