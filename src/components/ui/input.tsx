import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-lg bg-surface px-3.5 text-sm text-fg shadow-card",
      "placeholder:text-subtle",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
      "disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
