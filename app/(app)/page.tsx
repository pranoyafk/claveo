import { SignInDialog } from "@/components/auth-dialogs/sign-in";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <SignInDialog>
      <Button variant="default">Sign In</Button>
    </SignInDialog>
  );
}
