/**
 * Shared content feed: the same sermons, hymns, riddles, jokes, events,
 * announcements, verses, campuses and church details that the website and
 * the Android app show.
 *
 * Screens call useFeed(). It returns the bundled snapshot straight away (so
 * the server render and offline use work), then refreshes from the published
 * feed in the browser. Set VITE_CONTENT_FEED_URL to the website's data/ URL;
 * run `npm run feed:sync` to refresh the bundled snapshot.
 */
import { useSyncExternalStore } from "react";
import { FEED_SCHEMA_VERSION, FEED_TABS, type FeedTab, type FeedTabs } from "./types";

import sermons from "./snapshot/sermons.json";
import hymns from "./snapshot/hymns.json";
import riddles from "./snapshot/riddles.json";
import jokes from "./snapshot/jokes.json";
import events from "./snapshot/events.json";
import announcements from "./snapshot/announcements.json";
import verses from "./snapshot/verses.json";
import campuses from "./snapshot/campuses.json";
import config from "./snapshot/config.json";

export * from "./adapt";
export * from "./types";

export const DEFAULT_FEED_URL = "https://lmurugu.github.io/perazim-mission-church/data";

export const FEED_URL = String(
  import.meta.env?.VITE_CONTENT_FEED_URL || DEFAULT_FEED_URL,
).replace(/\/+$/, "");

export const SNAPSHOT: FeedTabs = {
  sermons: sermons.sermons,
  hymns: hymns.hymns,
  riddles: riddles.riddles,
  jokes: jokes.jokes,
  events: events.events,
  announcements: announcements.announcements,
  verses: verses.verses,
  campuses: campuses.campuses,
  config: config.config,
} as FeedTabs;

const CACHE_KEY = "perazim-feed-v1";
const REFRESH_MS = 30 * 60 * 1000;

let state: FeedTabs = SNAPSHOT;
let lastFetch = 0;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function readCache(): Partial<FeedTabs> | null {
  try {
    const raw = globalThis.localStorage?.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Partial<FeedTabs>) : null;
  } catch {
    return null;
  }
}

function writeCache(value: FeedTabs) {
  try {
    globalThis.localStorage?.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the snapshot still works.
  }
}

/** Parses one published tab; returns null if the payload is not usable. */
export function parseTab<T extends FeedTab>(tab: T, json: unknown): FeedTabs[T] | null {
  if (!json || typeof json !== "object") return null;
  const body = json as Record<string, unknown>;
  if (body.schema_version !== FEED_SCHEMA_VERSION) return null;
  const value = body[tab];
  if (tab === "config") return value && typeof value === "object" ? (value as FeedTabs[T]) : null;
  return Array.isArray(value) ? (value as FeedTabs[T]) : null;
}

async function fetchTab<T extends FeedTab>(tab: T): Promise<FeedTabs[T] | null> {
  try {
    const res = await fetch(`${FEED_URL}/${tab}.json`, { cache: "no-cache" });
    if (!res.ok) return null;
    return parseTab(tab, await res.json());
  } catch {
    return null;
  }
}

/** Refreshes from the published feed. Failed tabs keep what we already have. */
export function refreshFeed(force = false): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (inflight) return inflight;
  if (!force && Date.now() - lastFetch < REFRESH_MS) return Promise.resolve();
  inflight = (async () => {
    const results = await Promise.all(FEED_TABS.map((t) => fetchTab(t)));
    const next = { ...state } as Record<FeedTab, unknown>;
    let changed = false;
    FEED_TABS.forEach((tab, i) => {
      const value = results[i];
      if (value !== null) {
        next[tab] = value;
        changed = true;
      }
    });
    lastFetch = Date.now();
    if (changed) {
      state = next as FeedTabs;
      writeCache(state);
      emit();
    }
  })().finally(() => {
    inflight = null;
  });
  return inflight;
}

let hydrated = false;
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    const cached = readCache();
    if (cached) {
      state = { ...state, ...cached };
      queueMicrotask(emit);
    }
    void refreshFeed();
  }
  return () => listeners.delete(listener);
}

const getSnapshot = () => state;
const getServerSnapshot = () => SNAPSHOT;

/** All feed tabs. Re-renders when a newer feed arrives. */
export function useFeed(): FeedTabs {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
