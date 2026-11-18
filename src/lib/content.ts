/**
 * App-only content: devotion steps, the daily quest, giving presets and the
 * passage reader text.
 *
 * Sermons, hymns, riddles, jokes, events, announcements, verse of the day,
 * campuses and church contact details come from the shared content feed
 * (see src/lib/feed), which the website and the Android app also read.
 */
export const CHURCH = {
  name: "Perazim",
  fullName: "Perazim Mission Church",
  tagline: "God of the Breakthrough",
  verseRef: "2 Samuel 5:20",
};

export const VERSE = {
  ref: "2 Samuel 5:20",
  text: "As waters break out, the LORD has broken out against my enemies before me — therefore he named that place Baal Perazim.",
  context:
    "David inquired of the Lord, then waited for the sound of marching in the balsam trees. Breakthrough was not haste. It was obedience, then overflow.",
  passage: [
    {
      n: 17,
      t: "When the Philistines heard that David had been anointed king over Israel, they went up in full force to search for him, but David heard about it and went down to the stronghold.",
    },
    {
      n: 18,
      t: "Now the Philistines had come and spread out in the Valley of Rephaim.",
    },
    {
      n: 19,
      t: "so David inquired of the LORD, “Shall I go and attack the Philistines? Will you deliver them into my hands?” The LORD answered him, “Go, for I will surely deliver the Philistines into your hands.”",
    },
    {
      n: 20,
      t: "So David went to Baal Perazim, and there he defeated them. He said, “As waters break out, the LORD has broken out against my enemies before me.” So that place was called Baal Perazim.",
    },
    {
      n: 21,
      t: "The Philistines abandoned their idols there, and David and his men carried them off.",
    },
  ],
};

export type Devotion = {
  id: string;
  title: string;
  duration: string;
  prompt: string;
};

export const DEVOTIONS: Devotion[] = [
  {
    id: "psalm",
    title: "Morning Psalm",
    duration: "6 min",
    prompt: "Read Psalm 18:1–19. Notice the water imagery — God as flood, not as fuss.",
  },
  {
    id: "gospel",
    title: "Gospel reading",
    duration: "8 min",
    prompt: "John 16:25–33. Courage is not the absence of trouble; it is peace inside it.",
  },
  {
    id: "intercede",
    title: "Intercession",
    duration: "5 min",
    prompt: "Name three people. Ask for breakthrough that looks like water, not spectacle.",
  },
  {
    id: "silence",
    title: "Silence",
    duration: "4 min",
    prompt: "Sit without a list. If a thought arrives, hand it over and return to breathing.",
  },
  {
    id: "examen",
    title: "Evening examen",
    duration: "7 min",
    prompt: "Where did you resist the Spirit today? Where did waters already break out?",
  },
];

export const QUEST = {
  title: "Today’s breakthrough quest",
  body: "Read 2 Samuel 5:17–25. Wait for the sound in the trees before you move. Then write one place you will obey without rushing.",
  xp: 50,
};

export type CommunityPrayer = {
  id: string;
  name: string;
  body: string;
  amens: number;
};

export const SEED_PRAYERS: CommunityPrayer[] = [
  {
    id: "p1",
    name: "Intercessors",
    body: "Healing and steady hands for Mama Njeri’s surgery on Monday.",
    amens: 24,
  },
  {
    id: "p2",
    name: "Campus students",
    body: "Provision and wise friends for those travelling to university this month.",
    amens: 18,
  },
  {
    id: "p3",
    name: "City",
    body: "Peace over Embu and clean water in the estates still waiting on pipes.",
    amens: 31,
  },
];

export const GIVE_PRESETS = [200, 500, 1000, 2500];

export const GIVE_FUNDS = [
  { id: "tithe", label: "Tithe" },
  { id: "offering", label: "Offering" },
  { id: "missions", label: "Missions" },
  { id: "mercy", label: "Mercy fund" },
];
