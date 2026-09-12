import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Heart, Minus, Plus } from "lucide-react";
import { Lyrics } from "@/components/lyrics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HYMNS, type Hymn } from "@/lib/content";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/worship")({
  component: Worship,
});

function Worship() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("amazing-grace");
  const favorites = useAppStore((s) => s.favoriteHymns);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? HYMNS.filter(
          (h) =>
            h.title.toLowerCase().includes(q) ||
            h.authors.toLowerCase().includes(q) ||
            h.tags.some((t) => t.includes(q)),
        )
      : HYMNS;
    return [...filtered].sort((a, b) => {
      const af = favorites.includes(a.id) ? 0 : 1;
      const bf = favorites.includes(b.id) ? 0 : 1;
      return af - bf;
    });
  }, [query, favorites]);

  return (
    <div className="stagger-in mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="font-display text-4xl font-medium tracking-tight">Worship</h1>
        <p className="mt-1 text-sm text-muted">
          Hymns and a chord browser for the house. Transpose to your key.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2">
        <img
          src="/images/hymnals.jpg"
          alt="Leather hymnals on a pew"
          className="h-32 w-full rounded-2xl object-cover sm:h-40"
        />
        <img
          src="/images/bookshelf.jpg"
          alt="Theological library"
          className="h-32 w-full rounded-2xl object-cover sm:h-40"
        />
      </div>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search titles, writers, themes"
        aria-label="Search hymns"
      />

      <section>
        <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
          Hymns & chords
        </h2>
        <ul className="mt-3 space-y-2">
          {list.map((h) => (
            <HymnCard
              key={h.id}
              hymn={h}
              open={openId === h.id}
              onToggle={() => setOpenId(openId === h.id ? null : h.id)}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

function HymnCard({
  hymn,
  open,
  onToggle,
}: {
  hymn: Hymn;
  open: boolean;
  onToggle: () => void;
}) {
  const fav = useAppStore((s) => s.favoriteHymns.includes(hymn.id));
  const toggle = useAppStore((s) => s.toggleHymn);
  const [shift, setShift] = useState(0);
  const [chords, setChords] = useState(true);

  return (
    <li className="rounded-3xl bg-surface shadow-card">
      <div className="flex items-start gap-2 p-4">
        <button
          type="button"
          onClick={onToggle}
          className="press min-w-0 flex-1 text-left"
          aria-expanded={open}
        >
          <p className="font-medium">{hymn.title}</p>
          <p className="mt-0.5 text-sm text-muted">
            Key of {hymn.key} · {hymn.bpm} BPM · {hymn.authors}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm text-primary">
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
            {open ? "Hide lyrics" : "View lyrics & chords"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => toggle(hymn.id)}
          className="press flex size-11 shrink-0 items-center justify-center rounded-lg text-muted"
          aria-label={fav ? "Remove from setlist" : "Save to setlist"}
        >
          <Heart
            className={cn("size-5", fav && "fill-primary text-primary")}
            strokeWidth={1.75}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-4 pb-5 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{hymn.publicDomain ? "Public domain" : "CCLI excerpt"}</Badge>
            {hymn.tags.map((t) => (
              <Badge key={t} className="bg-surface-2 text-muted">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-lg bg-bg p-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                onClick={() => setShift((s) => s - 1)}
                aria-label="Transpose down"
              >
                <Minus className="size-4" />
              </Button>
              <span className="min-w-16 text-center text-xs font-medium tabular-nums text-muted">
                {shift === 0 ? "Original" : shift > 0 ? `+${shift}` : shift}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                onClick={() => setShift((s) => s + 1)}
                aria-label="Transpose up"
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button
              variant={chords ? "soft" : "ghost"}
              size="sm"
              onClick={() => setChords((c) => !c)}
            >
              {chords ? "Chords on" : "Chords off"}
            </Button>
          </div>

          <div className="mt-5 space-y-5">
            {hymn.verses.map((v, i) => (
              <div key={i}>
                <p className="mb-2 text-2xs uppercase tracking-caps text-subtle">
                  Verse {i + 1}
                </p>
                <Lyrics lines={[v]} showChords={chords} shift={shift} />
              </div>
            ))}
            {hymn.chorus && (
              <div>
                <p className="mb-2 text-2xs uppercase tracking-caps text-subtle">
                  Chorus
                </p>
                <Lyrics lines={[hymn.chorus]} showChords={chords} shift={shift} />
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
