import type { UserType } from "@/lib/auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { IconUser } from "@tabler/icons-react";

interface UserAvatarProps {
  user: UserType;
  className?: string;
}
export function UserAvatar(props: UserAvatarProps) {
  return (
    <Avatar className={cn(props.className)}>
      {props.user.image ? (
        <AvatarImage src={props.user.image} alt={props.user.name} />
      ) : (
        <AvatarFallback className="rounded-lg">
          <IconUser />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
