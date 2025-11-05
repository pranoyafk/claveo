import type { AuthUser } from "@/lib/auth/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  name: AuthUser["name"];
  image?: AuthUser["image"];
};

export function UserAvatar({ name, image }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      {image ? (
        <AvatarImage src={image} alt={name} />
      ) : (
        <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
      )}
    </Avatar>
  );
}
