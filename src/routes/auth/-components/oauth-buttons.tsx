import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/client";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function OauthButtons() {
  const [isGithubSignInPending, startGithubSignIn] = useTransition();

  const disabled = isGithubSignInPending;

  async function handleGithubSignIn() {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/app",
    });
    if (error) {
      toast.error(error.message || "Internal Server Error");
      return;
    }
  }
  return (
    <Field className="grid gap-4 sm:grid-cols-2">
      <Button
        disabled={disabled}
        onClick={() => startGithubSignIn(handleGithubSignIn)}
        variant="outline"
        type="button"
      >
        {isGithubSignInPending ? <Spinner /> : <IconBrandGithub />}
        Continue with Github
      </Button>
      <Button disabled={disabled} variant="outline" type="button">
        <IconBrandGoogle />
        Continue with Google
      </Button>
    </Field>
  );
}
