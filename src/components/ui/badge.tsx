import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-2.5 py-1 text-2xs font-medium uppercase tracking-caps text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
