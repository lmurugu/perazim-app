/**
 * Row types for the shared Perazim content feed.
 *
 * The feed is published by the church website repo
 * (lmurugu/perazim-mission-church, folder data/). Column names match the
 * Android app's Google Sheet tabs, so the website, this app and the Android
 * app all read the same content. Do not rename fields here without changing
 * data/csv/*.csv and scripts/build_data.py in the website repo.
 */

export const FEED_SCHEMA_VERSION = 1;

export type FeedSermon = {
  id: string;
  title: string;
  speaker: string;
  date: string; // YYYY-MM-DD
  series: string;
  scripture: string;
  youtube_url: string;
  audio_url: string;
  active: boolean;
};

export type FeedHymn = {
  id: string;
  title: string;
  writer: string;
  year: number | string;
  key: string; // e.g. "D Major"
  bpm: number | string;
  tags: string; // comma separated
  lyrics: string; // blocks separated by blank lines, "Verse 1:" / "Chorus:" headers
  chords: string; // progression, e.g. "D - Bm - G - A"
  active: boolean;
};

export type FeedRiddle = {
  id: string;
  category: string; // EASY | MEDIUM | HARD
  question: string;
  answer: string;
  xp: number | string;
  active: boolean;
};

export type FeedJoke = { id: string; text: string; active: boolean };

export type FeedEvent = {
  id: string;
  title: string;
  start: string; // YYYY-MM-DD HH:mm, Nairobi time
  end: string;
  venue: string;
  campus: string;
  description: string;
  active: boolean;
};

export type FeedAnnouncement = {
  id: string;
  title: string;
  body: string;
  date: string;
  priority: string;
  campus: string;
  active: boolean;
};

export type FeedVerse = { date: string; reference: string; text: string };

export type FeedCampus = {
  id: string;
  name: string;
  area: string;
  service_times: string;
  photo: string;
  active: boolean;
};

export type FeedConfig = Record<string, string>;

export type FeedTabs = {
  sermons: FeedSermon[];
  hymns: FeedHymn[];
  riddles: FeedRiddle[];
  jokes: FeedJoke[];
  events: FeedEvent[];
  announcements: FeedAnnouncement[];
  verses: FeedVerse[];
  campuses: FeedCampus[];
  config: FeedConfig;
};

export type FeedTab = keyof FeedTabs;

export const FEED_TABS: FeedTab[] = [
  "sermons",
  "hymns",
  "riddles",
  "jokes",
  "events",
  "announcements",
  "verses",
  "campuses",
  "config",
];
