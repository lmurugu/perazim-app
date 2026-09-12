import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LIVE, SERMONS } from "@/lib/content";

export const Route = createFileRoute("/sermons/")({
  component: Sermons,
});

function Sermons() {
  return (
    <div className="stagger-in mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-4xl font-medium tracking-tight">Sermons</h1>
        <p className="mt-1 text-sm text-muted">
          Live gathering and the archive — listen again, take notes, linger.
        </p>
      </header>

      <Link
        to="/sermons/$id"
        params={{ id: LIVE.id }}
        className="press block overflow-hidden rounded-3xl bg-surface shadow-card"
      >
        <div className="relative">
          <img
            src={LIVE.image}
            alt=""
            className="h-52 w-full object-cover sm:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <Badge className="absolute left-4 top-4 bg-live text-primary-fg">
            <span className="live-dot size-1.5 rounded-full bg-primary-fg" />
            Live broadcast
          </Badge>
          <div className="absolute inset-x-0 bottom-0 p-5 text-ink-fg">
            <p className="text-xs uppercase tracking-caps text-ink-muted">
              {LIVE.series} · {LIVE.campus}
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium leading-snug">
              {LIVE.title}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">{LIVE.speaker}</p>
          </div>
        </div>
        <div className="p-4">
          <span className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-fg">
            <Play className="size-4" />
            Watch live broadcast
          </span>
        </div>
      </Link>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
          Recent messages
        </h2>
        <ul className="mt-3 space-y-2">
          {SERMONS.map((s) => (
            <li key={s.id}>
              <Link
                to="/sermons/$id"
                params={{ id: s.id }}
                className="press flex gap-3 rounded-2xl bg-surface p-2.5 shadow-card"
              >
                <img
                  src={s.image}
                  alt=""
                  className="size-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1 py-1 pr-2">
                  <p className="text-xs uppercase tracking-wider text-subtle">
                    {s.series}
                  </p>
                  <h3 className="mt-0.5 font-medium leading-snug">{s.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                    <span>{s.when}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {s.duration}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
