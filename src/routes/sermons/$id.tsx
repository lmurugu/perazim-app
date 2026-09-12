import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LIVE, SERMONS, type Sermon } from "@/lib/content";

export const Route = createFileRoute("/sermons/$id")({
  component: SermonDetail,
});

function findSermon(id: string): Sermon | undefined {
  if (id === LIVE.id) return LIVE;
  return SERMONS.find((s) => s.id === id);
}

function SermonDetail() {
  const { id } = Route.useParams();
  const sermon = findSermon(id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.4));
    }, 400);
    return () => clearInterval(t);
  }, [playing]);

  if (!sermon) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="font-display text-2xl">This message is not in the archive.</p>
        <Link to="/sermons" className="mt-4 inline-block text-sm text-primary">
          Back to sermons
        </Link>
      </div>
    );
  }

  return (
    <div className="stagger-in mx-auto max-w-3xl space-y-5">
      <Link
        to="/sermons"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted"
      >
        <ArrowLeft className="size-4" />
        Archive
      </Link>

      <div className="overflow-hidden rounded-3xl bg-ink text-ink-fg shadow-card">
        <div className="relative">
          <img
            src={sermon.image}
            alt=""
            className="h-56 w-full object-cover opacity-80 sm:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          {sermon.live && (
            <Badge className="absolute left-4 top-4 bg-live text-primary-fg">
              <span className="live-dot size-1.5 rounded-full bg-primary-fg" />
              Live
            </Badge>
          )}
        </div>
        <div className="px-5 pb-5">
          <p className="text-xs uppercase tracking-caps text-ink-muted">
            {sermon.series} · {sermon.campus}
          </p>
          <h1 className="mt-1 font-display text-3xl font-medium leading-snug">
            {sermon.title}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {sermon.speaker} · {sermon.when} · {sermon.duration}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <Button
              variant="secondary"
              size="icon"
              className="size-12 rounded-full bg-ink-fg text-ink"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="size-5" />
              ) : (
                <Play className="ml-0.5 size-5" />
              )}
            </Button>
            <div className="min-w-0 flex-1">
              <div className="h-1 overflow-hidden rounded-full bg-ink-muted/25">
                <div
                  className="h-full bg-ink-fg transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs tabular-nums text-ink-muted">
                {sermon.live ? "Streaming" : "Preview player"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-3xl bg-surface p-5 shadow-card">
        <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-caps text-muted">
          <BookOpen className="size-3.5" />
          {sermon.scripture}
        </p>
        <p className="mt-3 leading-relaxed text-fg">{sermon.summary}</p>
      </section>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
          Takeaways
        </h2>
        <ol className="mt-3 space-y-2">
          {sermon.takeaways.map((t, i) => (
            <li
              key={t}
              className="flex gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-card"
            >
              <span className="font-display text-xl text-primary tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed">{t}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
