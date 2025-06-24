"use client";

import * as React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/utils/styleUtils";

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: "sm" | "md" | "lg" | "xl";
}

const avatarSizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
  xl: "size-16",
};

function Avatar({ className, size = "md", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "flex overflow-hidden relative rounded-full shrink-0",
        avatarSizes[size],
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex justify-center items-center rounded-full bg-muted size-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
