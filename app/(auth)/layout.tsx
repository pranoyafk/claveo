import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth/server";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout(props: AuthLayoutProps) {
  const getSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (getSession) {
    throw notFound();
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          {props.children}
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
