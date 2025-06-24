import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { User } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/utils/styleUtils";

interface GeneratedAvatarProps {
  seed: string | undefined;
  size?: "sm" | "base" | "lg";
  variant: "botttsNeutral" | "initials";
  className?: string;
}

const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #28c76f 0%, #00bfa5 100%)",
  "linear-gradient(135deg, #f86aa0 0%, #fbc531 100%)",
  "linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)",
  "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
  "linear-gradient(135deg, #00c896 0%, #00aa88 100%)",
  "linear-gradient(135deg, #ff8a80 0%, #ea4c89 100%)",
  "linear-gradient(135deg, #4a90e2 0%, #8ac926 100%)",
  "linear-gradient(135deg, #ffc371 0%, #ff6f61 100%)",
  "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
  "linear-gradient(135deg, #00b894 0%, #00cec9 100%)",
  "linear-gradient(135deg, #e17055 0%, #fdcb6e 100%)",
  "linear-gradient(135deg, #a29bfe 0%, #fd79a8 100%)",
  "linear-gradient(135deg, #00c3ff 0%, #4481eb 100%)",
  "linear-gradient(135deg, #ff7675 0%, #74b9ff 100%)",
];

export const GeneratedAvatar = ({
  seed,
  size = "base",
  variant,
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
    toast.warning("Failed to fetch user avatar");
  }

  // Create a simple hash function to consistently select gradient based on seed
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash;
    }
    return Math.abs(hash);
  };

  const selectedGradient = seed && gradients[hashCode(seed) % gradients.length];

  const sizeClassName =
    size === "sm" ? "size-8" : size === "base" ? "size-10" : "size-12";
  const fontClassName =
    size === "sm" ? "text-sm" : size === "base" ? "text-base" : "text-lg";

  return (
    <Avatar
      className={cn(className, sizeClassName)}
      style={variant === "initials" ? { background: selectedGradient } : {}}
    >
      {seed ? (
        <>
          <AvatarImage src={avatar?.toDataUri()} alt="User avatar" />
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
