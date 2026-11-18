import { useMemo } from "react";
import { useFeed } from "./index";
import {
  forCampus,
  toAnnouncement,
  toCampus,
  toEvent,
  toHymn,
  toJoke,
  toRiddle,
  toSermon,
  upcoming,
  verseForToday,
} from "./adapt";

/**
 * Feed content in the shapes the screens use. Pass the member's campus to
 * get that campus's events and announcements plus the church-wide ones.
 */
export function useContent(campusId?: string) {
  const feed = useFeed();
  return useMemo(() => {
    const events = upcoming(feed.events);
    const announcements = feed.announcements;
    return {
      sermons: [...feed.sermons].sort((a, b) => b.date.localeCompare(a.date)).map(toSermon),
      hymns: feed.hymns.map(toHymn),
      riddles: feed.riddles.map(toRiddle),
      jokes: feed.jokes.map(toJoke),
      events: (campusId ? forCampus(events, campusId) : events).map(toEvent),
      announcements: (campusId ? forCampus(announcements, campusId) : announcements).map(
        toAnnouncement,
      ),
      verse: verseForToday(feed.verses),
      campuses: feed.campuses.map(toCampus),
      config: feed.config,
    };
  }, [feed, campusId]);
}

export type Content = ReturnType<typeof useContent>;
