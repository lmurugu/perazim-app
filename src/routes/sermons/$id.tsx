import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { useContent } from "@/lib/feed/use-content";

export const Route = createFileRoute("/sermons/$id")({
  component: SermonDetail,
});

function SermonDetail() {
  const { id } = Route.useParams();
  const { sermons } = useContent();
  const sermon = sermons.find((s) => s.id === id);

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
        {sermon.youtubeId ? (
          <div className="aspect-video w-full">
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${sermon.youtubeId}`}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : sermon.audioUrl ? (
          <div className="px-5 pt-5">
            <audio controls preload="none" src={sermon.audioUrl} className="w-full" />
          </div>
        ) : null}
        <div className="px-5 py-5">
          {sermon.series && (
            <p className="text-xs uppercase tracking-caps text-ink-muted">{sermon.series}</p>
          )}
          <h1 className="mt-1 font-display text-3xl font-medium leading-snug">
            {sermon.title}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {sermon.speaker} · {sermon.date}
          </p>
          {sermon.watchUrl && (
            <a
              href={sermon.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink-fg underline underline-offset-4"
            >
              Open on YouTube
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>

      {sermon.scripture && (
        <section className="rounded-3xl bg-surface p-5 shadow-card">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-caps text-muted">
            <BookOpen className="size-3.5" />
            {sermon.scripture}
          </p>
        </section>
      )}
    </div>
  );
}
