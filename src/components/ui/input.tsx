import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  overrideDisabled?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, overrideDisabled = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none ${
            overrideDisabled
              ? "disabled:cursor-default"
              : "disabled:cursor-not-allowed disabled:opacity-50"
          } md:text-sm`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
