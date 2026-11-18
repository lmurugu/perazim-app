import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Check, HandHeart, HelpCircle, Megaphone } from "lucide-react";
import { PrayerSheet } from "@/components/overlays";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Joke, Riddle } from "@/lib/feed";
import { useContent } from "@/lib/feed/use-content";
import { useAppStore } from "@/lib/store";
import { normalizeGuess } from "@/lib/utils";

export const Route = createFileRoute("/fellowship")({
  component: Fellowship,
});

function Fellowship() {
  const prayers = useAppStore((s) => s.communityPrayers);
  const amens = useAppStore((s) => s.amens);
  const amen = useAppStore((s) => s.amen);
  const [prayerOpen, setPrayerOpen] = useState(false);
  const [joke, setJoke] = useState(false);
  const campusId = useAppStore((s) => s.campusId);
  const { riddles, jokes, announcements, events } = useContent(campusId);
  const humor = jokeOfTheWeek(jokes);

  return (
    <div className="stagger-in mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-4xl font-medium tracking-tight">
          Fellowship
        </h1>
        <p className="mt-1 text-sm text-muted">
          Riddles, the week’s humour, and the life of the house.
        </p>
      </header>

      <img
        src="/images/fellowship.jpg"
        alt="A long table set for community"
        className="h-44 w-full rounded-3xl object-cover sm:h-56"
      />

      <section>
        <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
          Daily biblical riddles
        </h2>
        <ul className="mt-3 space-y-2">
          {riddles.map((r) => (
            <RiddleCard key={r.id} riddle={r} />
          ))}
        </ul>
      </section>

{humor && (
        <section className="rounded-3xl bg-surface p-5 shadow-card">
          <p className="text-xs font-medium uppercase tracking-caps text-muted">
            Christian humour of the week
          </p>
          <p className="mt-3 font-medium">{humor.answer ? `Q: ${humor.question}` : humor.question}</p>
          {humor.answer &&
            (joke ? (
              <p className="mt-2 font-display text-xl italic text-primary">{humor.answer}</p>
            ) : (
              <Button className="mt-4" variant="soft" onClick={() => setJoke(true)}>
                Reveal the punchline
              </Button>
            ))}
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Megaphone className="size-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
            Announcements
          </h2>
        </div>
        <ul className="space-y-2">
          {announcements.length === 0 && (
            <li className="rounded-2xl bg-surface px-4 py-3.5 text-sm text-muted shadow-card">
              No announcements right now.
            </li>
          )}
          {announcements.map((a) => (
            <li key={a.id} className="rounded-2xl bg-surface px-4 py-3.5 shadow-card">
              <p className="font-medium">{a.title}</p>
              <p className="mt-1 text-sm text-muted">{a.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
            Gatherings
          </h2>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {events.length === 0 && (
            <li className="rounded-2xl bg-surface px-4 py-3.5 text-sm text-muted shadow-card">
              Upcoming gatherings will be listed here.
            </li>
          )}
          {events.map((e) => (
            <li key={e.id} className="rounded-2xl bg-surface px-4 py-3.5 shadow-card">
              <p className="font-medium">{e.title}</p>
              <p className="mt-0.5 text-sm text-muted">
                {e.when}
                <br />
                {e.where}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HandHeart className="size-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
              The house is praying
            </h2>
          </div>
          <Button size="sm" variant="soft" onClick={() => setPrayerOpen(true)}>
            Add yours
          </Button>
        </div>
        <ul className="space-y-2">
          {prayers.map((p) => {
            const said = amens.includes(p.id);
            return (
              <li
                key={p.id}
                className="flex items-start gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-card"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-subtle">{p.name}</p>
                  <p className="mt-1 text-sm leading-relaxed">{p.body}</p>
                </div>
                <Button
                  variant={said ? "soft" : "secondary"}
                  size="sm"
                  disabled={said}
                  onClick={() => amen(p.id)}
                >
                  Amen
                  <span className="tabular-nums text-subtle">{p.amens}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </section>

      <PrayerSheet open={prayerOpen} onOpenChange={setPrayerOpen} />
    </div>
  );
}

function RiddleCard({ riddle }: { riddle: Riddle }) {
  const solved = useAppStore((s) => s.solvedRiddles.includes(riddle.id));
  const revealed = useAppStore((s) => s.revealedRiddles.includes(riddle.id));
  const solve = useAppStore((s) => s.solveRiddle);
  const reveal = useAppStore((s) => s.revealRiddle);
  const [guess, setGuess] = useState("");
  const open = solved || revealed;

  function submit() {
    const g = normalizeGuess(guess);
    const ok = riddle.answers.some(
      (a) => g === a || g.includes(a) || a.includes(g),
    );
    if (ok && g.length >= 3) {
      solve(riddle.id, riddle.xp);
      toast(`+${riddle.xp} XP`);
    } else {
      toast("Not yet — try another angle");
    }
  }

  return (
    <li className="rounded-3xl bg-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <Badge>
          <HelpCircle className="size-3" />
          {riddle.category}
        </Badge>
        <span className="text-xs tabular-nums text-subtle">+{riddle.xp} XP</span>
      </div>
      <p className="mt-3 leading-relaxed">{riddle.prompt}</p>

      {open ? (
        <p className="mt-3 rounded-xl bg-bg px-3 py-2.5 text-sm text-primary">
          {solved && (
            <Check className="mr-1.5 inline size-3.5 -translate-y-px" />
          )}
          {riddle.reveal}
        </p>
      ) : (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="Your guess"
            aria-label={`Guess for ${riddle.category} riddle`}
          />
          <Button onClick={submit} disabled={!guess.trim()}>
            Guess
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              reveal(riddle.id);
            }}
          >
            Reveal
          </Button>
        </div>
      )}
    </li>
  );
}

/** Splits "Question? Punchline" and picks one joke per calendar week. */
function jokeOfTheWeek(jokes: Joke[], now = new Date()) {
  if (!jokes.length) return null;
  const week = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
  const text = jokes[week % jokes.length].text;
  const i = text.indexOf("?");
  if (i === -1 || i === text.length - 1) return { question: text, answer: "" };
  return { question: text.slice(0, i + 1), answer: text.slice(i + 1).trim() };
}
