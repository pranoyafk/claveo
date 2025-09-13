import { IconBrandGithub, IconLoader } from "@tabler/icons-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

interface GithubSignInButtonProps {
  disabled: boolean;
  onStart: () => void;
  onEnd: () => void;
}

export function GithubButton(props: GithubSignInButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await authClient.signIn.social({
            provider: "github",
            fetchOptions: {
              onRequest: props.onStart,
              onResponse: props.onEnd,
            },
          });
        })
      }
      disabled={props.disabled || isPending}
      variant="outline"
      className="w-full"
    >
      {isPending ? <IconLoader className="animate-spin" /> : <IconBrandGithub />}
      Login with Github
    </Button>
  );
}
