import { IconBrandGithub } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface SignInDialogProps {
  children: ReactNode;
}
export function SignInDialog(props: SignInDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>

        <div className="max-w-sm w-full mx-auto">
          <Button className="w-full" variant="secondary">
            <IconBrandGithub size={16} aria-hidden="true" />
            Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
