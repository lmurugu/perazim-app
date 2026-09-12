import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as cn, p as SEED_PRAYERS, x as todayKey } from "./button-CFmOdYI2.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-CJ9SCehA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = {
	name: "Disciple",
	campusId: "embu",
	xp: 450,
	streak: 7,
	lastActiveDate: todayKey(),
	completedDevotions: [
		"psalm",
		"gospel",
		"intercede",
		"silence"
	],
	prayedDate: "",
	questDate: "",
	solvedRiddles: [],
	revealedRiddles: [],
	favoriteHymns: ["amazing-grace"],
	amens: [],
	communityPrayers: SEED_PRAYERS,
	myPrayers: [],
	reflections: []
};
var useAppStore = create()(persist((set, get) => ({
	...initial,
	setName: (name) => set({ name: name.trim() || "Disciple" }),
	setCampus: (campusId) => set({ campusId }),
	addXp: (n) => set({ xp: get().xp + n }),
	touchStreak: () => {
		const today = todayKey();
		const { lastActiveDate, streak } = get();
		if (lastActiveDate === today) return;
		const y = /* @__PURE__ */ new Date();
		y.setDate(y.getDate() - 1);
		set({
			lastActiveDate: today,
			streak: lastActiveDate === todayKey(y) ? streak + 1 : 1
		});
	},
	completeDevotion: (id) => {
		const { completedDevotions } = get();
		if (completedDevotions.includes(id)) return;
		set({
			completedDevotions: [...completedDevotions, id],
			xp: get().xp + 10
		});
	},
	markPrayed: () => {
		const today = todayKey();
		if (get().prayedDate === today) return;
		set({
			prayedDate: today,
			xp: get().xp + 10
		});
	},
	completeQuest: () => {
		const today = todayKey();
		if (get().questDate === today) return;
		set({
			questDate: today,
			xp: get().xp + 50
		});
	},
	solveRiddle: (id, xp) => {
		if (get().solvedRiddles.includes(id)) return;
		set({
			solvedRiddles: [...get().solvedRiddles, id],
			xp: get().xp + xp
		});
	},
	revealRiddle: (id) => {
		if (get().revealedRiddles.includes(id) || get().solvedRiddles.includes(id)) return;
		set({ revealedRiddles: [...get().revealedRiddles, id] });
	},
	toggleHymn: (id) => {
		const fav = get().favoriteHymns;
		set({ favoriteHymns: fav.includes(id) ? fav.filter((x) => x !== id) : [...fav, id] });
	},
	amen: (id) => {
		if (get().amens.includes(id)) return;
		set({
			amens: [...get().amens, id],
			communityPrayers: get().communityPrayers.map((p) => p.id === id ? {
				...p,
				amens: p.amens + 1
			} : p)
		});
	},
	addPrayer: (body, isPrivate) => {
		const prayer = {
			id: `mine-${Date.now()}`,
			body: body.trim(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			private: isPrivate
		};
		if (isPrivate) {
			set({ myPrayers: [prayer, ...get().myPrayers] });
			return;
		}
		set({
			myPrayers: [prayer, ...get().myPrayers],
			communityPrayers: [{
				id: prayer.id,
				name: get().name,
				body: prayer.body,
				amens: 1
			}, ...get().communityPrayers],
			amens: [...get().amens, prayer.id]
		});
	},
	saveReflection: (text) => {
		const date = todayKey();
		const rest = get().reflections.filter((r) => r.date !== date);
		set({ reflections: [{
			date,
			text
		}, ...rest] });
	}
}), { name: "perazim-v1" }));
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-11 w-full rounded-lg bg-surface px-3.5 text-sm text-fg shadow-card", "placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35", "disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
//#endregion
export { useAppStore as n, Input as t };
