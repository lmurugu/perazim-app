import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Youtube } from "lucide-react";
import { useContent } from "@/lib/feed/use-content";

export const Route = createFileRoute("/sermons/")({
  component: Sermons,
});

const thumb = (id: string | null) =>
  id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "/images/sanctuary.jpg";

function Sermons() {
  const { sermons, config } = useContent();
  const channel = config.youtube_url;

  return (
    <div className="stagger-in mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-4xl font-medium tracking-tight">Sermons</h1>
        <p className="mt-1 text-sm text-muted">
          Messages from Perazim Mission Church. Listen again, take notes, linger.
        </p>
      </header>

      {channel && (
        <a
          href={channel}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex items-center gap-3 rounded-3xl bg-surface p-4 shadow-card"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
            <Youtube className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">Watch services on YouTube</span>
            <span className="block text-sm text-muted">
              Live broadcasts and every recorded message
            </span>
          </span>
        </a>
      )}

      <section>
        <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
          Recent messages
        </h2>
        {sermons.length === 0 ? (
          <p className="mt-3 text-sm text-muted">New messages are on their way.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {sermons.map((s) => (
              <li key={s.id}>
                <Link
                  to="/sermons/$id"
                  params={{ id: s.id }}
                  className="press flex gap-3 rounded-2xl bg-surface p-2.5 shadow-card"
                >
                  <span className="relative shrink-0">
                    <img
                      src={thumb(s.youtubeId)}
                      alt=""
                      className="h-20 w-28 rounded-xl object-cover"
                    />
                    <Play className="absolute inset-0 m-auto size-6 text-white drop-shadow" />
                  </span>
                  <div className="min-w-0 flex-1 py-1 pr-2">
                    {s.series && (
                      <p className="text-xs uppercase tracking-wider text-subtle">
                        {s.series}
                      </p>
                    )}
                    <h3 className="mt-0.5 font-medium leading-snug">{s.title}</h3>
                    <p className="mt-1 text-xs text-muted">
                      {s.speaker} · {s.date}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
