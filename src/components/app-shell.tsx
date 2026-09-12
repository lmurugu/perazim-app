import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Video, Music2, Users, Zap } from "lucide-react";
import { CAMPUSES } from "@/lib/content";
import { useAppStore } from "@/lib/store";
import { cn, levelFromXp } from "@/lib/utils";
import { Mark } from "./mark";
import { CampusSheet, ProfileSheet } from "./overlays";

const TABS = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    to: "/sermons",
    label: "Sermons",
    icon: Video,
    match: (p: string) => p.startsWith("/sermons"),
  },
  {
    to: "/worship",
    label: "Worship",
    icon: Music2,
    match: (p: string) => p.startsWith("/worship"),
  },
  {
    to: "/fellowship",
    label: "Fellowship",
    icon: Users,
    match: (p: string) => p.startsWith("/fellowship"),
  },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const xp = useAppStore((s) => s.xp);
  const campusId = useAppStore((s) => s.campusId);
  const campus = CAMPUSES.find((c) => c.id === campusId) ?? CAMPUSES[0];
  const [campusOpen, setCampusOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border px-4 py-6 lg:flex">
          <Brand />
          <nav className="mt-10 flex flex-col gap-1">
            {TABS.map((tab) => {
              const active = tab.match(pathname);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-primary text-primary-fg"
                      : "text-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
          <p className="mt-auto text-xs leading-relaxed text-subtle">
            Perazim Mission Church
            <br />
            God of the Breakthrough
          </p>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg px-4 py-3 lg:px-8">
            <div className="lg:hidden">
              <Brand compact />
            </div>
            <button
              type="button"
              onClick={() => setCampusOpen(true)}
              className="press min-h-11 min-w-0 flex-1 rounded-full bg-surface px-4 text-left text-sm text-fg shadow-card"
            >
              <span className="block truncate">
                {campus.name}
                <span className="text-muted"> · {campus.city}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="press inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-surface px-3.5 text-sm font-medium text-fg shadow-card"
              aria-label={`${xp} experience points, level ${levelFromXp(xp)}`}
            >
              <Zap className="size-3.5 text-primary" strokeWidth={2.25} />
              <span className="tabular-nums">{xp}</span>
              <span className="text-subtle">XP</span>
            </button>
          </header>

          <main className="flex-1 px-4 pb-28 pt-5 lg:px-8 lg:pb-10">
            {children}
          </main>
        </div>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
        aria-label="Primary"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-4 px-2 pt-1.5 pb-1.5">
          {TABS.map((tab) => {
            const active = tab.match(pathname);
            const Icon = tab.icon;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-2xs font-medium transition-colors duration-150",
                    active ? "bg-primary/8 text-primary" : "text-muted",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2 : 1.6} />
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <CampusSheet open={campusOpen} onOpenChange={setCampusOpen} />
      <ProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 text-primary">
      <Mark className={compact ? "size-9" : "size-10"} />
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-xl font-medium tracking-tight text-fg">
            Perazim
          </p>
          <p className="text-2xs uppercase tracking-caps text-muted">
            Mission Church
          </p>
        </div>
      )}
    </div>
  );
}
