"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { ClaveoLogo } from "../logo";
import { MaxWidthWrapper } from "../max-width";
import { Button } from "../ui/button";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blogs", href: "/blogs" },
  { name: "About", href: "/about" },
  { name: "Privacy", href: "/privacy" },
];
export function HeaderSection() {
  const { data: getSession } = authClient.useSession();
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
          {getSession?.user ? (
            <Button size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
