"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  color?: string;
  opacity?: number;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      color = "#000",
      opacity = 100,
      style,
      ...props
    },
    ref
  ) => {
    // Compute final backgroundColor with opacity
    const normalizedOpacity = Math.max(0, Math.min(opacity, 100)) / 100;

    // Helper: convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      let c = hex;
      if (c.startsWith("#")) {
        c = c.slice(1);
      }
      if (c.length === 3) {
        c = c
          .split("")
          .map((char) => char + char)
          .join("");
      }
      const bigint = parseInt(c, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const backgroundColor = color.startsWith("#")
      ? hexToRgba(color, normalizedOpacity)
      : color;

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        style={{
          backgroundColor,
          ...style,
        }}
        className={cn(
          "shrink-0",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
