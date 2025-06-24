import { initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { User } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AVATAR_GRADIENTS } from "@/constants/colors";
import { TEXTS } from "@/constants/texts";

import { cn, hashCode } from "@/utils/styleUtils";

interface GeneratedAvatarProps {
  seed: string | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const GeneratedAvatar = ({
  seed,
  size = "md",
  className,
}: GeneratedAvatarProps) => {
  let avatar;

  try {
    // Use transparent background for initials variant
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 600,
      fontSize: 42,
      backgroundColor: ["transparent"],
    });
  } catch (error) {
    console.warn("Failed to generate avatar:", error);
    toast.warning(TEXTS.avatarError);
    avatar = null;
  }

  const selectedGradient = seed
    ? AVATAR_GRADIENTS[hashCode(seed) % AVATAR_GRADIENTS.length]
    : AVATAR_GRADIENTS[0];

  const sizeClassName =
    size === "sm" ? "size-8" : size === "md" ? "size-10" : "size-12";
  const fontClassName =
    size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg";

  return (
    <Avatar
      className={cn(className, sizeClassName)}
      style={{ background: selectedGradient }}
    >
      {seed ? (
        <>
          {avatar && <AvatarImage src={avatar.toDataUri()} alt="User avatar" />}
          <AvatarFallback className={cn("font-semibold", fontClassName)}>
            {seed?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </>
      ) : (
        <AvatarFallback className="text-white bg-gradient-to-br from-gray-400 to-gray-600">
          <User className="w-5 h-5" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};
