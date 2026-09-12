import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  Gift,
  HandHeart,
  Mountain,
  Share2,
} from "lucide-react";
import { GiveSheet, PassageSheet, PrayerSheet, ReflectSheet } from "@/components/overlays";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DEVOTIONS, EVENTS, QUEST, VERSE } from "@/lib/content";
import { useAppStore } from "@/lib/store";
import { greetingForHour, todayKey } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const name = useAppStore((s) => s.name);
  const streak = useAppStore((s) => s.streak);
  const completed = useAppStore((s) => s.completedDevotions);
  const completeDevotion = useAppStore((s) => s.completeDevotion);
  const prayedDate = useAppStore((s) => s.prayedDate);
  const markPrayed = useAppStore((s) => s.markPrayed);
  const questDate = useAppStore((s) => s.questDate);
  const completeQuest = useAppStore((s) => s.completeQuest);

  const [hour, setHour] = useState(12);
  const [reflect, setReflect] = useState(false);
  const [prayer, setPrayer] = useState(false);
  const [give, setGive] = useState(false);
  const [passage, setPassage] = useState(false);

  useEffect(() => {
    setHour(new Date().getHours());
  }, []);

  const doneCount = completed.length;
  const prayed = prayedDate === todayKey();
  const quested = questDate === todayKey();

  return (
    <div className="stagger-in mx-auto max-w-3xl space-y-5">
      <header>
        <p className="text-sm text-muted">{greetingForHour(hour)}</p>
        <h1 className="font-display text-4xl font-medium tracking-tight text-fg">
          Welcome back, {name}
        </h1>
        <p className="mt-1 text-sm text-muted">
          A faithful walk with Perazim Mission Church
        </p>
      </header>

      <section className="rounded-3xl bg-primary p-5 text-primary-fg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <Flame className="size-4" />
              {streak}-day streak
            </p>
            <p className="mt-1 text-sm text-primary-fg/75">
              Daily prayer and scripture keep the fire tended. Bonus XP on day seven.
            </p>
          </div>
          <span className="font-display text-2xl font-medium tabular-nums">
            {streak}
          </span>
        </div>
      </section>

      <section className="rounded-3xl bg-surface p-5 shadow-card">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
            Daily devotion
          </h2>
          <p className="text-xs tabular-nums text-subtle">
            {doneCount} of {DEVOTIONS.length}
          </p>
        </div>
        <Progress className="mt-3" value={(doneCount / DEVOTIONS.length) * 100} />
        <ul className="mt-4 space-y-2">
          {DEVOTIONS.map((d) => {
            const done = completed.includes(d.id);
            return (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (done) return;
                    completeDevotion(d.id);
                    toast(`+10 XP · ${d.title}`);
                  }}
                  className="press flex w-full items-start gap-3 rounded-2xl bg-bg px-3.5 py-3 text-left"
                >
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                      done ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {done ? <Check className="size-3.5" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-medium">{d.title}</span>
                      <span className="text-xs text-subtle">{d.duration}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{d.prompt}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="overflow-hidden rounded-3xl bg-ink text-ink-fg shadow-card">
        <div className="relative">
          <img
            src="/images/waters.jpg"
            alt=""
            className="h-44 w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
          <Badge className="absolute left-4 top-4 bg-ink/70 text-ink-fg">
            <BookOpen className="size-3" />
            Verse of the day · {VERSE.ref}
          </Badge>
        </div>
        <div className="p-5 pt-2">
          <blockquote className="font-display text-2xl font-medium italic leading-snug">
            “{VERSE.text}”
          </blockquote>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Button
              variant="secondary"
              className="bg-ink-fg/8 text-ink-fg shadow-none hover:bg-ink-fg/14"
              onClick={() => setReflect(true)}
            >
              Reflect
            </Button>
            <Button
              variant="secondary"
              className="bg-ink-fg text-ink shadow-none hover:bg-ink-fg/90"
              disabled={prayed}
              onClick={() => {
                markPrayed();
                toast("+10 XP · prayed");
              }}
            >
              {prayed ? "Prayed" : "Pray · +10"}
            </Button>
            <Button
              variant="secondary"
              className="bg-ink-fg/8 text-ink-fg shadow-none hover:bg-ink-fg/14"
              onClick={async () => {
                const payload = `“${VERSE.text}” — ${VERSE.ref}`;
                try {
                  await navigator.clipboard.writeText(payload);
                  toast("Verse copied");
                } catch {
                  toast("Copy the verse from the card");
                }
              }}
            >
              <Share2 className="size-4" />
              Share
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setPassage(true)}
            className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-ink-muted"
          >
            Read the full passage
            <ChevronRight className="size-4" />
          </button>
        </div>
      </section>

      <section className="rounded-3xl bg-surface p-5 shadow-card">
        <div className="flex items-center gap-2 text-primary">
          <Mountain className="size-4" />
          <h2 className="text-xs font-medium uppercase tracking-caps">
            {QUEST.title}
          </h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{QUEST.body}</p>
        <Button
          className="mt-4 w-full"
          size="lg"
          disabled={quested}
          onClick={() => {
            completeQuest();
            toast(`+${QUEST.xp} XP · quest complete`);
          }}
        >
          {quested ? "Quest complete" : `Complete quest · +${QUEST.xp} XP`}
        </Button>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          variant="ink"
          size="xl"
          className="w-full rounded-2xl"
          onClick={() => setPrayer(true)}
        >
          <HandHeart className="size-4" />
          Submit a prayer request
        </Button>
        <Button
          variant="secondary"
          size="xl"
          className="w-full rounded-2xl"
          onClick={() => setGive(true)}
        >
          <Gift className="size-4" />
          Give
        </Button>
      </div>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xs font-medium uppercase tracking-caps text-muted">
            This week
          </h2>
          <Link to="/fellowship" className="text-sm text-primary">
            All gatherings
          </Link>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {EVENTS.slice(0, 4).map((e) => (
            <li key={e.id} className="rounded-2xl bg-surface px-4 py-3.5 shadow-card">
              <p className="font-medium">{e.title}</p>
              <p className="mt-0.5 text-sm text-muted">
                {e.when} · {e.where}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ReflectSheet open={reflect} onOpenChange={setReflect} />
      <PrayerSheet open={prayer} onOpenChange={setPrayer} />
      <GiveSheet open={give} onOpenChange={setGive} />
      <PassageSheet open={passage} onOpenChange={setPassage} />
    </div>
  );
}
