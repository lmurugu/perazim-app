/**
 * Turns shared-feed rows into the shapes the app's screens render.
 * Pure functions, so they are easy to test and safe on the server.
 */
import type {
  FeedAnnouncement,
  FeedCampus,
  FeedEvent,
  FeedHymn,
  FeedJoke,
  FeedRiddle,
  FeedSermon,
  FeedVerse,
} from "./types";

export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  scripture: string;
  youtubeId: string | null;
  watchUrl: string;
  audioUrl: string;
};

export type Hymn = {
  id: string;
  title: string;
  authors: string;
  key: string;
  bpm: number;
  tags: string[];
  publicDomain: boolean;
  verses: string[];
  chorus?: string;
  progression: string;
};

export type Riddle = {
  id: string;
  category: string;
  xp: number;
  prompt: string;
  answers: string[];
  reveal: string;
};

export type Joke = { id: string; text: string };

export type EventItem = {
  id: string;
  title: string;
  when: string;
  where: string;
  campus: string;
  description: string;
};

export type Announcement = { id: string; title: string; body: string; campus: string };

export type Campus = {
  id: string;
  name: string;
  area: string;
  gathering: string;
  photo: string;
};

export type Verse = { ref: string; text: string };

const toInt = (v: number | string, fallback: number) => {
  const n = typeof v === "number" ? v : parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
};

export function youtubeId(url: string): string | null {
  const m = /(?:v=|youtu\.be\/|embed\/)([\w-]{11})/.exec(url || "");
  return m ? m[1] : null;
}

export function toSermon(s: FeedSermon): Sermon {
  return {
    id: s.id,
    title: s.title,
    speaker: s.speaker,
    date: s.date,
    series: s.series,
    scripture: s.scripture,
    youtubeId: youtubeId(s.youtube_url),
    watchUrl: s.youtube_url || s.audio_url,
    audioUrl: s.audio_url,
  };
}

/** Works in an earlier year than this are treated as public domain. */
const PUBLIC_DOMAIN_BEFORE = new Date().getFullYear() - 95;

export function toHymn(h: FeedHymn): Hymn {
  const blocks = h.lyrics
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const verses: string[] = [];
  let chorus: string | undefined;
  for (const block of blocks) {
    const [first, ...rest] = block.split("\n");
    const header = /^(verse\s*\d*|chorus|refrain)\s*:?\s*$/i.exec(first.trim());
    const body = header ? rest.join("\n") : block;
    if (header && /chorus|refrain/i.test(header[1])) chorus ??= body;
    else verses.push(body);
  }
  const year = toInt(h.year, 0);
  return {
    id: h.id,
    title: h.title,
    authors: h.writer,
    key: h.key.replace(/\s*major$/i, "").replace(/\s*minor$/i, "m"),
    bpm: toInt(h.bpm, 80),
    tags: h.tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
    publicDomain: year > 0 && year < PUBLIC_DOMAIN_BEFORE,
    verses,
    chorus,
    progression: h.chords,
  };
}

/** Same normalisation as normalizeGuess in lib/utils, so guesses compare cleanly. */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Accept the full answer or its first word ("Balaam's donkey" -> "balaams donkey", "balaams", "balaam"). */
export function answerVariants(answer: string): string[] {
  const full = normalize(answer.split(/[—(.;,]/)[0].replace(/-/g, " "));
  const variants = new Set([full]);
  const first = full.split(" ")[0];
  if (first.length > 2) variants.add(first);
  if (first.endsWith("s") && first.length > 4) variants.add(first.slice(0, -1));
  return [...variants].filter(Boolean);
}

const RIDDLE_LABEL: Record<string, string> = { EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" };

export function toRiddle(r: FeedRiddle): Riddle {
  return {
    id: r.id,
    category: RIDDLE_LABEL[r.category?.toUpperCase()] ?? r.category,
    xp: toInt(r.xp, 20),
    prompt: r.question,
    answers: answerVariants(r.answer),
    reveal: r.answer,
  };
}

export const toJoke = (j: FeedJoke): Joke => ({ id: j.id, text: j.text });

const WHEN_FORMAT = new Intl.DateTimeFormat("en-KE", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Africa/Nairobi",
});

/** Feed times are Nairobi local time (UTC+3, no daylight saving). */
export function parseNairobi(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/.exec(value || "");
  if (!m) return null;
  const [, y, mo, d, h = "00", mi = "00"] = m;
  return new Date(Date.UTC(+y, +mo - 1, +d, +h - 3, +mi));
}

export function toEvent(e: FeedEvent): EventItem {
  const start = parseNairobi(e.start);
  return {
    id: e.id,
    title: e.title,
    when: start ? WHEN_FORMAT.format(start) : e.start,
    where: e.venue,
    campus: e.campus,
    description: e.description,
  };
}

export const toAnnouncement = (a: FeedAnnouncement): Announcement => ({
  id: a.id,
  title: a.title,
  body: a.body,
  campus: a.campus,
});

export const toCampus = (c: FeedCampus): Campus => ({
  id: c.id,
  name: c.name,
  area: c.area,
  gathering: c.service_times || "Service times to be confirmed",
  photo: c.photo,
});

/** Today's verse in Nairobi, else the most recent earlier one, else the first. */
export function verseForToday(verses: FeedVerse[], now = new Date()): Verse | null {
  if (!verses.length) return null;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(now);
  const sorted = [...verses].sort((a, b) => a.date.localeCompare(b.date));
  const pick = sorted.filter((v) => v.date <= today).pop() ?? sorted[0];
  return { ref: pick.reference, text: pick.text };
}

/** Events that have not ended yet, soonest first. */
export function upcoming(events: FeedEvent[], now = new Date()): FeedEvent[] {
  return events
    .filter((e) => {
      const end = parseNairobi(e.end) ?? parseNairobi(e.start);
      return !end || end >= now;
    })
    .sort((a, b) => a.start.localeCompare(b.start));
}

/** Rows for one campus plus church-wide rows ("all" or blank). */
export function forCampus<T extends { campus: string }>(rows: T[], campusId: string): T[] {
  return rows.filter((r) => !r.campus || r.campus === "all" || r.campus === campusId);
}
