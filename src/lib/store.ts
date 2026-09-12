import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_PRAYERS, type CommunityPrayer } from "./content";
import { todayKey } from "./utils";

export type UserPrayer = {
  id: string;
  body: string;
  createdAt: string;
  private: boolean;
};

export type Reflection = {
  date: string;
  text: string;
};

type State = {
  name: string;
  campusId: string;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedDevotions: string[];
  prayedDate: string;
  questDate: string;
  solvedRiddles: string[];
  revealedRiddles: string[];
  favoriteHymns: string[];
  amens: string[];
  communityPrayers: CommunityPrayer[];
  myPrayers: UserPrayer[];
  reflections: Reflection[];
};

type Actions = {
  setName: (name: string) => void;
  setCampus: (id: string) => void;
  addXp: (n: number) => void;
  touchStreak: () => void;
  completeDevotion: (id: string) => void;
  markPrayed: () => void;
  completeQuest: () => void;
  solveRiddle: (id: string, xp: number) => void;
  revealRiddle: (id: string) => void;
  toggleHymn: (id: string) => void;
  amen: (id: string) => void;
  addPrayer: (body: string, isPrivate: boolean) => void;
  saveReflection: (text: string) => void;
};

const initial: State = {
  name: "Disciple",
  campusId: "embu",
  xp: 450,
  streak: 7,
  lastActiveDate: todayKey(),
  completedDevotions: ["psalm", "gospel", "intercede", "silence"],
  prayedDate: "",
  questDate: "",
  solvedRiddles: [],
  revealedRiddles: [],
  favoriteHymns: ["amazing-grace"],
  amens: [],
  communityPrayers: SEED_PRAYERS,
  myPrayers: [],
  reflections: [],
};

export const useAppStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initial,
      setName: (name) => set({ name: name.trim() || "Disciple" }),
      setCampus: (campusId) => set({ campusId }),
      addXp: (n) => set({ xp: get().xp + n }),
      touchStreak: () => {
        const today = todayKey();
        const { lastActiveDate, streak } = get();
        if (lastActiveDate === today) return;
        const y = new Date();
        y.setDate(y.getDate() - 1);
        const yesterday = todayKey(y);
        set({
          lastActiveDate: today,
          streak: lastActiveDate === yesterday ? streak + 1 : 1,
        });
      },
      completeDevotion: (id) => {
        const { completedDevotions } = get();
        if (completedDevotions.includes(id)) return;
        set({
          completedDevotions: [...completedDevotions, id],
          xp: get().xp + 10,
        });
      },
      markPrayed: () => {
        const today = todayKey();
        if (get().prayedDate === today) return;
        set({ prayedDate: today, xp: get().xp + 10 });
      },
      completeQuest: () => {
        const today = todayKey();
        if (get().questDate === today) return;
        set({ questDate: today, xp: get().xp + 50 });
      },
      solveRiddle: (id, xp) => {
        if (get().solvedRiddles.includes(id)) return;
        set({
          solvedRiddles: [...get().solvedRiddles, id],
          xp: get().xp + xp,
        });
      },
      revealRiddle: (id) => {
        if (get().revealedRiddles.includes(id) || get().solvedRiddles.includes(id))
          return;
        set({ revealedRiddles: [...get().revealedRiddles, id] });
      },
      toggleHymn: (id) => {
        const fav = get().favoriteHymns;
        set({
          favoriteHymns: fav.includes(id)
            ? fav.filter((x) => x !== id)
            : [...fav, id],
        });
      },
      amen: (id) => {
        if (get().amens.includes(id)) return;
        set({
          amens: [...get().amens, id],
          communityPrayers: get().communityPrayers.map((p) =>
            p.id === id ? { ...p, amens: p.amens + 1 } : p,
          ),
        });
      },
      addPrayer: (body, isPrivate) => {
        const prayer: UserPrayer = {
          id: `mine-${Date.now()}`,
          body: body.trim(),
          createdAt: new Date().toISOString(),
          private: isPrivate,
        };
        if (isPrivate) {
          set({ myPrayers: [prayer, ...get().myPrayers] });
          return;
        }
        set({
          myPrayers: [prayer, ...get().myPrayers],
          communityPrayers: [
            {
              id: prayer.id,
              name: get().name,
              body: prayer.body,
              amens: 1,
            },
            ...get().communityPrayers,
          ],
          amens: [...get().amens, prayer.id],
        });
      },
      saveReflection: (text) => {
        const date = todayKey();
        const rest = get().reflections.filter((r) => r.date !== date);
        set({ reflections: [{ date, text }, ...rest] });
      },
    }),
    { name: "perazim-v1" },
  ),
);
