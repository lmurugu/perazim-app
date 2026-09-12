import { useState } from "react";
import { toast } from "sonner";
import { Check, Flame, HandHeart, MapPin, Zap } from "lucide-react";
import {
  CAMPUSES,
  GIVE_FUNDS,
  GIVE_PRESETS,
  VERSE,
} from "@/lib/content";
import { useAppStore } from "@/lib/store";
import { formatKes, levelFromXp, todayKey, xpIntoLevel } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "./ui/sheet";
import { Textarea } from "./ui/textarea";

export function CampusSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const campusId = useAppStore((s) => s.campusId);
  const setCampus = useAppStore((s) => s.setCampus);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle className="font-display text-2xl font-medium">
          Choose a campus
        </SheetTitle>
        <SheetDescription className="mt-1 text-sm text-muted">
          Gatherings, sermons, and events follow the house you pick.
        </SheetDescription>
        <ul className="mt-5 space-y-2">
          {CAMPUSES.map((c) => {
            const active = c.id === campusId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCampus(c.id);
                    onOpenChange(false);
                    toast(`Now walking with ${c.name}`);
                  }}
                  className="press flex w-full items-start gap-3 rounded-2xl bg-surface p-4 text-left shadow-card"
                >
                  <span className="mt-0.5 flex size-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">
                      {c.name}
                      <span className="text-muted"> · {c.city}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {c.gathering}
                    </span>
                    <span className="block text-xs text-subtle">{c.address}</span>
                  </span>
                  {active && <Check className="size-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export function ProfileSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const name = useAppStore((s) => s.name);
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const setName = useAppStore((s) => s.setName);
  const [draft, setDraft] = useState(name);
  const level = levelFromXp(xp);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle className="font-display text-2xl font-medium">
          Your walk
        </SheetTitle>
        <SheetDescription className="mt-1 text-sm text-muted">
          Progress stays on this device.
        </SheetDescription>

        <div className="mt-5 rounded-3xl bg-ink p-5 text-ink-fg">
          <p className="text-xs uppercase tracking-caps text-ink-muted">
            Level {level}
          </p>
          <p className="mt-1 font-display text-3xl font-medium">{name}</p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="size-3.5" />
              <span className="tabular-nums">{xp} XP</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame className="size-3.5" />
              <span className="tabular-nums">{streak} day streak</span>
            </span>
          </div>
          <Progress
            value={xpIntoLevel(xp)}
            className="mt-4 bg-ink-muted/20 [&_div]:bg-ink-fg"
          />
          <p className="mt-2 text-xs text-ink-muted">
            {100 - xpIntoLevel(xp)} XP to level {level + 1}
          </p>
        </div>

        <label className="mt-6 block text-xs font-medium uppercase tracking-wider text-muted">
          Display name
        </label>
        <Input
          className="mt-2"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={24}
        />
        <Button
          className="mt-3 w-full"
          onClick={() => {
            setName(draft);
            toast("Name saved");
            onOpenChange(false);
          }}
        >
          Save
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export function ReflectSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const existing = useAppStore((s) =>
    s.reflections.find((r) => r.date === todayKey()),
  );
  const save = useAppStore((s) => s.saveReflection);
  const [text, setText] = useState(existing?.text ?? "");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle className="font-display text-2xl font-medium">
          Reflect
        </SheetTitle>
        <SheetDescription className="mt-1 text-sm text-muted">
          {VERSE.ref} · {VERSE.context}
        </SheetDescription>
        <Textarea
          className="mt-5 min-h-40"
          placeholder="Where is the Lord asking you to wait for the sound in the trees?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          className="mt-4 w-full"
          disabled={!text.trim()}
          onClick={() => {
            save(text.trim());
            toast("Reflection kept");
            onOpenChange(false);
          }}
        >
          Keep this
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export function PrayerSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const add = useAppStore((s) => s.addPrayer);
  const [body, setBody] = useState("");
  const [isPrivate, setPrivate] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle className="font-display text-2xl font-medium">
          Ask the intercessors
        </SheetTitle>
        <SheetDescription className="mt-1 text-sm text-muted">
          Shared requests appear in Fellowship. Private ones stay on this device.
        </SheetDescription>
        <Textarea
          className="mt-5 min-h-36"
          placeholder="What should we carry with you?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label className="mt-3 flex min-h-11 items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setPrivate(e.target.checked)}
            className="size-4 accent-primary"
          />
          Keep this request private
        </label>
        <Button
          className="mt-3 w-full"
          disabled={body.trim().length < 8}
          onClick={() => {
            add(body, isPrivate);
            setBody("");
            toast(isPrivate ? "Kept privately" : "Sent to the house");
            onOpenChange(false);
          }}
        >
          <HandHeart className="size-4" />
          Submit request
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export function GiveSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [fund, setFund] = useState("tithe");
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [done, setDone] = useState(false);
  const value = custom ? Number(custom) || 0 : amount;

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(() => setDone(false), 200);
      }}
    >
      <SheetContent>
        <SheetTitle className="font-display text-2xl font-medium">
          Give
        </SheetTitle>
        <SheetDescription className="mt-1 text-sm text-muted">
          A preview of our giving flow — no charge is taken here.
        </SheetDescription>

        {done ? (
          <div className="mt-8 text-center">
            <p className="font-display text-3xl font-medium">Thank you.</p>
            <p className="mt-2 text-sm text-muted">
              {formatKes(value)} toward {GIVE_FUNDS.find((f) => f.id === fund)?.label}.
              In the house, this would go to M-Pesa.
            </p>
            <Button className="mt-6" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {GIVE_FUNDS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFund(f.id)}
                  className={`press h-11 rounded-lg text-xs font-medium ${
                    fund === f.id
                      ? "bg-primary text-primary-fg"
                      : "bg-surface text-fg shadow-card"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {GIVE_PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setAmount(n);
                    setCustom("");
                  }}
                  className={`press h-11 rounded-lg text-sm font-medium tabular-nums ${
                    !custom && amount === n
                      ? "bg-primary text-primary-fg"
                      : "bg-surface text-fg shadow-card"
                  }`}
                >
                  {n.toLocaleString()}
                </button>
              ))}
            </div>
            <Input
              className="mt-3"
              inputMode="numeric"
              placeholder="Another amount (KES)"
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
            />
            <Button
              className="mt-4 w-full"
              size="lg"
              disabled={value < 50}
              onClick={() => setDone(true)}
            >
              Continue with {formatKes(value)}
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function PassageSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle className="font-display text-2xl font-medium">
          {VERSE.ref}
        </SheetTitle>
        <SheetDescription className="mt-1 text-sm text-muted">
          The naming of Baal Perazim.
        </SheetDescription>
        <ol className="mt-5 space-y-4">
          {VERSE.passage.map((p) => (
            <li key={p.n} className="flex gap-3">
              <span className="w-6 shrink-0 pt-0.5 text-right text-xs tabular-nums text-subtle">
                {p.n}
              </span>
              <p className="font-display text-lg leading-snug text-fg">{p.t}</p>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
