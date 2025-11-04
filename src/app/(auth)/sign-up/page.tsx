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
import { SignUpForm } from "../_components/forms/sign-up";
import { OauthButtons } from "../_components/oauth-buttons";

export const metadata: Metadata = {
  title: "Sign Up | Claveo",
};

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/dashboard");
  }
  return (
    <AuthPage>
      <AuthPageHeader>
        <AuthPageTitle>Create your Claveo account</AuthPageTitle>
        <AuthPageDescription>
          Already have an account?{" "}
          <Link className="font-semibold text-foreground" href="/sign-in">
            Sign In
          </Link>
        </AuthPageDescription>
      </AuthPageHeader>
      <OauthButtons />
      <AuthPageDivider />
      <AuthPageContent>
        <SignUpForm />
      </AuthPageContent>
      <AuthPageFooter>
        <p className="mt-6 text-muted-foreground text-sm dark:text-muted-foreground">
          By proceeding, you agree to our{" "}
          <Link href="/terms" className="font-medium text-foreground">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </AuthPageFooter>
    </AuthPage>
  );
}
