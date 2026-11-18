import { test } from "node:test";
import assert from "node:assert/strict";
import {
  answerVariants,
  forCampus,
  parseNairobi,
  toHymn,
  toRiddle,
  toSermon,
  upcoming,
  verseForToday,
  youtubeId,
} from "./adapt.ts";
import type { FeedEvent } from "./types.ts";

test("youtubeId reads watch, short and embed links", () => {
  assert.equal(youtubeId("https://www.youtube.com/watch?v=3O6meSzCl3I"), "3O6meSzCl3I");
  assert.equal(youtubeId("https://youtu.be/3O6meSzCl3I"), "3O6meSzCl3I");
  assert.equal(youtubeId("https://www.youtube.com/embed/3O6meSzCl3I"), "3O6meSzCl3I");
  assert.equal(youtubeId("https://example.org/a.mp3"), null);
});

test("toSermon keeps the watch link", () => {
  const s = toSermon({
    id: "x",
    title: "T",
    speaker: "S",
    date: "2025-07-03",
    series: "",
    scripture: "",
    youtube_url: "https://www.youtube.com/watch?v=3O6meSzCl3I",
    audio_url: "",
    active: true,
  });
  assert.equal(s.youtubeId, "3O6meSzCl3I");
  assert.equal(s.watchUrl, "https://www.youtube.com/watch?v=3O6meSzCl3I");
});

test("toHymn splits verses and chorus and tidies the key", () => {
  const h = toHymn({
    id: "h",
    title: "Blessed Assurance",
    writer: "Fanny Crosby",
    year: 1873,
    key: "D Major",
    bpm: "76",
    tags: "Faith, Praise",
    lyrics: "Verse 1:\nline a\nline b\n\nChorus:\nthis is my story\n\nVerse 2:\nline c",
    chords: "D - G - A",
    active: true,
  });
  assert.deepEqual(h.verses, ["line a\nline b", "line c"]);
  assert.equal(h.chorus, "this is my story");
  assert.equal(h.key, "D");
  assert.equal(h.bpm, 76);
  assert.deepEqual(h.tags, ["faith", "praise"]);
  assert.equal(h.publicDomain, true);
});

test("riddle answers accept the name or the full phrase", () => {
  assert.deepEqual(answerVariants("Methuselah"), ["methuselah"]);
  assert.ok(answerVariants("Balaam's Donkey").includes("balaam"));
  assert.ok(answerVariants("Baal-Perazim").includes("baal perazim"));
  const r = toRiddle({ id: "r", category: "HARD", question: "q", answer: "Adam", xp: "20", active: true });
  assert.equal(r.category, "Hard");
  assert.equal(r.xp, 20);
});

test("feed times are read as Nairobi time", () => {
  assert.equal(parseNairobi("2026-11-08 09:00")?.toISOString(), "2026-11-08T06:00:00.000Z");
  assert.equal(parseNairobi("not a date"), null);
});

const ev = (id: string, start: string, end: string, campus = "all"): FeedEvent => ({
  id,
  title: id,
  start,
  end,
  venue: "",
  campus,
  description: "",
  active: true,
});

test("upcoming drops finished events and sorts the rest", () => {
  const now = new Date("2026-11-10T12:00:00Z");
  const list = upcoming(
    [ev("later", "2026-11-20 09:00", "2026-11-20 12:00"), ev("past", "2026-11-01 09:00", "2026-11-01 12:00"), ev("soon", "2026-11-11 09:00", "")],
    now,
  );
  assert.deepEqual(
    list.map((e) => e.id),
    ["soon", "later"],
  );
});

test("forCampus keeps church-wide rows", () => {
  const rows = [ev("a", "", "", "campus_embu"), ev("b", "", "", "campus_mwea"), ev("c", "", "", "all"), ev("d", "", "", "")];
  assert.deepEqual(
    forCampus(rows, "campus_embu").map((r) => r.id),
    ["a", "c", "d"],
  );
});

test("verseForToday picks today, else the latest earlier verse", () => {
  const verses = [
    { date: "2026-11-03", reference: "A", text: "a" },
    { date: "2026-11-05", reference: "B", text: "b" },
  ];
  assert.equal(verseForToday(verses, new Date("2026-11-05T08:00:00Z"))?.ref, "B");
  assert.equal(verseForToday(verses, new Date("2026-11-04T08:00:00Z"))?.ref, "A");
  assert.equal(verseForToday(verses, new Date("2026-10-01T08:00:00Z"))?.ref, "A");
  assert.equal(verseForToday([], new Date()), null);
});
