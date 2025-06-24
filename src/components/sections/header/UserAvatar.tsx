import { ClientOptions, InferUserFromClient } from "better-auth";

import { GeneratedAvatar } from "@/components/sections/header/GeneratedAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/utils/styleUtils";

interface UserAvatarProps {
  user: InferUserFromClient<ClientOptions> | null;
  size?: "sm" | "base" | "lg";
  className?: string;
}

const baseClassName = "transition-transform duration-200 select-none";

export const UserAvatar = ({
  user,
  size = "base",
  className,
}: UserAvatarProps) => {
  const sizeClassName =
    size === "sm" ? "size-8" : size === "base" ? "size-10" : "size-12";

  return (
    <>
      {user && user.image ? (
        <Avatar className={cn(baseClassName, className, sizeClassName)}>
          <AvatarImage src={user.image} alt={user.name} />
        </Avatar>
      ) : (
        <GeneratedAvatar
          seed={user?.name || user?.email}
          variant="initials"
          size={size}
          className={cn(baseClassName, className)}
        />
      )}
    </>
  );
};
