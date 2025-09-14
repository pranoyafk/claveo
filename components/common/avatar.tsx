import { IconUser } from "@tabler/icons-react";
import type { UserType } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
