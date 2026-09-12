import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as EVENTS, d as QUEST, h as VERSE, i as DEVOTIONS, n as Button, v as greetingForHour, x as todayKey } from "./button-CFmOdYI2.mjs";
import { n as useAppStore } from "./input-CJ9SCehA.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Check, T as BookOpen, _ as Gift, a as Share2, g as HandHeart, u as Mountain, v as Flame, x as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as PrayerSheet, i as PassageSheet, o as ReflectSheet, r as GiveSheet, s as Progress } from "./router-BGhEN8hm.mjs";
import { t as Badge } from "./badge-ByKQxtDK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_lEwwdw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const name = useAppStore((s) => s.name);
	const streak = useAppStore((s) => s.streak);
	const completed = useAppStore((s) => s.completedDevotions);
	const completeDevotion = useAppStore((s) => s.completeDevotion);
	const prayedDate = useAppStore((s) => s.prayedDate);
	const markPrayed = useAppStore((s) => s.markPrayed);
	const questDate = useAppStore((s) => s.questDate);
	const completeQuest = useAppStore((s) => s.completeQuest);
	const [hour, setHour] = (0, import_react.useState)(12);
	const [reflect, setReflect] = (0, import_react.useState)(false);
	const [prayer, setPrayer] = (0, import_react.useState)(false);
	const [give, setGive] = (0, import_react.useState)(false);
	const [passage, setPassage] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHour((/* @__PURE__ */ new Date()).getHours());
	}, []);
	const doneCount = completed.length;
	const prayed = prayedDate === todayKey();
	const quested = questDate === todayKey();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in mx-auto max-w-3xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: greetingForHour(hour)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-4xl font-medium tracking-tight text-fg",
					children: ["Welcome back, ", name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "A faithful walk with Perazim Mission Church"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-3xl bg-primary p-5 text-primary-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 text-sm font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }),
							streak,
							"-day streak"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-primary-fg/75",
						children: "Daily prayer and scripture keep the fire tended. Bonus XP on day seven."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-medium tabular-nums",
						children: streak
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-surface p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-caps text-muted",
							children: "Daily devotion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs tabular-nums text-subtle",
							children: [
								doneCount,
								" of ",
								DEVOTIONS.length
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-3",
						value: doneCount / DEVOTIONS.length * 100
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: DEVOTIONS.map((d) => {
							const done = completed.includes(d.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (done) return;
									completeDevotion(d.id);
									toast(`+10 XP · ${d.title}`);
								},
								className: "press flex w-full items-start gap-3 rounded-2xl bg-bg px-3.5 py-3 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${done ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted"}`,
									children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: d.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-subtle",
											children: d.duration
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-sm text-muted",
										children: d.prompt
									})]
								})]
							}) }, d.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-3xl bg-ink text-ink-fg shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/waters.jpg",
							alt: "",
							className: "h-44 w-full object-cover opacity-70"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "absolute left-4 top-4 bg-ink/70 text-ink-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3" }),
								"Verse of the day · ",
								VERSE.ref
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "font-display text-2xl font-medium italic leading-snug",
							children: [
								"“",
								VERSE.text,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									className: "bg-ink-fg/8 text-ink-fg shadow-none hover:bg-ink-fg/14",
									onClick: () => setReflect(true),
									children: "Reflect"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									className: "bg-ink-fg text-ink shadow-none hover:bg-ink-fg/90",
									disabled: prayed,
									onClick: () => {
										markPrayed();
										toast("+10 XP · prayed");
									},
									children: prayed ? "Prayed" : "Pray · +10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "secondary",
									className: "bg-ink-fg/8 text-ink-fg shadow-none hover:bg-ink-fg/14",
									onClick: async () => {
										const payload = `“${VERSE.text}” — ${VERSE.ref}`;
										try {
											await navigator.clipboard.writeText(payload);
											toast("Verse copied");
										} catch {
											toast(payload);
										}
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPassage(true),
							className: "mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-ink-muted",
							children: ["Read the full passage", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-surface p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-caps",
							children: QUEST.title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: QUEST.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						size: "lg",
						disabled: quested,
						onClick: () => {
							completeQuest();
							toast(`+${QUEST.xp} XP · quest complete`);
						},
						children: quested ? "Quest complete" : `Complete quest · +${QUEST.xp} XP`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ink",
					size: "xl",
					className: "w-full rounded-2xl",
					onClick: () => setPrayer(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, { className: "size-4" }), "Submit a prayer request"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "xl",
					className: "w-full rounded-2xl",
					onClick: () => setGive(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4" }), "Give"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-caps text-muted",
					children: "This week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/fellowship",
					className: "text-sm text-primary",
					children: "All gatherings"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: EVENTS.slice(0, 4).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl bg-surface px-4 py-3.5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: e.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: [
							e.when,
							" · ",
							e.where
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReflectSheet, {
				open: reflect,
				onOpenChange: setReflect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrayerSheet, {
				open: prayer,
				onOpenChange: setPrayer
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiveSheet, {
				open: give,
				onOpenChange: setGive
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassageSheet, {
				open: passage,
				onOpenChange: setPassage
			})
		]
	});
}
//#endregion
export { Home as component };
