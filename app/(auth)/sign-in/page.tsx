"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GithubButton } from "@/components/auth/github-button";
import { Separator } from "@/components/auth/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { SignInSchema, type SignInSchemaType } from "@/lib/zod-schemas/auth";
import { toast } from "sonner";

export default function SignInPage() {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isGithubSignInPending, setGithubSignInPending] = useState<boolean>(false);
  const isDisable = form.formState.isSubmitting || isGithubSignInPending;

  async function onSubmit(values: SignInSchemaType) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => router.replace("/dashboard"),
        onError: ({ error }) => {
          toast.error(error.message);
        },
      },
    });
  }
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <GithubButton
                onStart={() => setGithubSignInPending(true)}
                onEnd={() => {
                  setGithubSignInPending(false);
                  router.replace("/dashboard");
                }}
                disabled={isDisable}
              />
              <Separator />
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled={isDisable} placeholder="john@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input disabled={isDisable} placeholder="••••••••" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isDisable} className="w-full">
                  {form.formState.isSubmitting && <IconLoader className="animate-spin" />}
                  Sign In
                </Button>
              </div>
              <div className="text-center text-sm space-x-1">
                <span>Don&apos;t have an account?</span>
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
