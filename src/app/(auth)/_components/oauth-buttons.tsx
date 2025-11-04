import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AuthPageButtonGroup } from "./auth-page";

export function OauthButtons() {
  return (
    <AuthPageButtonGroup>
      <Button variant="outline" className="w-full flex-1 items-center justify-center space-x-2 py-2 sm:w-fit">
        <IconBrandGithub />
        Continue with Github
      </Button>
      <Button variant="outline" className="w-full flex-1 items-center justify-center space-x-2 py-2 sm:w-fit">
        <IconBrandGoogleFilled />
        Continue with Google
      </Button>
    </AuthPageButtonGroup>
  );
}
