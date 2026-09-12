import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M16 7.5v17M11 13.5c3.2 3.4 4 6.4 5 11M21 13.5c-3.2 3.4-4 6.4-5 11"
        stroke="#F4EFE6"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
