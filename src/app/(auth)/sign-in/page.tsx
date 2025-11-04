import { auth } from "@/lib/auth/server";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AuthPage,
  AuthPageContent,
  AuthPageDescription,
  AuthPageDivider,
  AuthPageFooter,
  AuthPageHeader,
  AuthPageTitle,
} from "../_components/auth-page";
import { SignInForm } from "../_components/forms/sign-in";
import { OauthButtons } from "../_components/oauth-buttons";

export const metadata: Metadata = {
  title: "Sign In | Claveo",
};

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/dashboard");
  }
  return (
    <AuthPage>
      <AuthPageHeader>
        <AuthPageTitle>Sign in to your account</AuthPageTitle>
        <AuthPageDescription>
          Don&apos;t have an account?{" "}
          <Link className="font-semibold text-foreground" href="/sign-up">
            Sign Up
          </Link>
        </AuthPageDescription>
      </AuthPageHeader>
      <OauthButtons />
      <AuthPageDivider />
      <AuthPageContent>
        <SignInForm />
      </AuthPageContent>
      <AuthPageFooter>
        <p className="text-muted-foreground text-sm dark:text-muted-foreground">
          Forgot your password?{" "}
          <Link href="#" className="font-medium text-foreground">
            Reset Password
          </Link>
        </p>
      </AuthPageFooter>
    </AuthPage>
  );
}
