import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as EVENTS, b as normalizeGuess, c as HUMOR, f as RIDDLES, n as Button, t as ANNOUNCEMENTS } from "./button-CFmOdYI2.mjs";
import { n as useAppStore, t as Input } from "./input-CJ9SCehA.mjs";
import { C as Check, b as CircleHelp, f as Megaphone, g as HandHeart, w as Calendar } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as PrayerSheet } from "./router-BGhEN8hm.mjs";
import { t as Badge } from "./badge-ByKQxtDK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fellowship-bC-pd0TD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Fellowship() {
	const prayers = useAppStore((s) => s.communityPrayers);
	const amens = useAppStore((s) => s.amens);
	const amen = useAppStore((s) => s.amen);
	const [prayerOpen, setPrayerOpen] = (0, import_react.useState)(false);
	const [joke, setJoke] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in mx-auto max-w-3xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-medium tracking-tight",
				children: "Fellowship"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Riddles, the week’s humour, and the life of the house."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/fellowship.jpg",
				alt: "A long table set for community",
				className: "h-44 w-full rounded-3xl object-cover sm:h-56"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-caps text-muted",
				children: "Daily biblical riddles"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: RIDDLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiddleCard, { riddle: r }, r.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-surface p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-caps text-muted",
						children: "Christian humour of the week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-medium",
						children: ["Q: ", HUMOR.q]
					}),
					joke ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl italic text-primary",
						children: HUMOR.a
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "soft",
						onClick: () => setJoke(true),
						children: "Reveal the punchline"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-caps text-muted",
					children: "Announcements"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: ANNOUNCEMENTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl bg-surface px-4 py-3.5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: a.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: a.body
					})]
				}, a.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-caps text-muted",
					children: "Gatherings"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: EVENTS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl bg-surface px-4 py-3.5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: e.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: [
							e.when,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							e.where
						]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-medium uppercase tracking-caps text-muted",
						children: "The house is praying"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "soft",
					onClick: () => setPrayerOpen(true),
					children: "Add yours"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: prayers.map((p) => {
					const said = amens.includes(p.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed",
								children: p.body
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: said ? "soft" : "secondary",
							size: "sm",
							disabled: said,
							onClick: () => amen(p.id),
							children: ["Amen", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-subtle",
								children: p.amens
							})]
						})]
					}, p.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrayerSheet, {
				open: prayerOpen,
				onOpenChange: setPrayerOpen
			})
		]
	});
}
function RiddleCard({ riddle }) {
	const solved = useAppStore((s) => s.solvedRiddles.includes(riddle.id));
	const revealed = useAppStore((s) => s.revealedRiddles.includes(riddle.id));
	const solve = useAppStore((s) => s.solveRiddle);
	const reveal = useAppStore((s) => s.revealRiddle);
	const [guess, setGuess] = (0, import_react.useState)("");
	const open = solved || revealed;
	function submit() {
		const g = normalizeGuess(guess);
		if (riddle.answers.some((a) => g === a || g.includes(a) || a.includes(g)) && g.length >= 3) {
			solve(riddle.id, riddle.xp);
			toast(`+${riddle.xp} XP · ${riddle.reveal}`);
		} else toast("Not yet — try another angle");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-3xl bg-surface p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-3" }), riddle.category] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tabular-nums text-subtle",
					children: [
						"+",
						riddle.xp,
						" XP"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-relaxed",
				children: riddle.prompt
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 rounded-xl bg-bg px-3 py-2.5 text-sm text-primary",
				children: [
					solved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1.5 inline size-3.5 -translate-y-px" }),
					riddle.reveal,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1 text-subtle",
						children: [
							"(",
							riddle.verse,
							")"
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: guess,
						onChange: (e) => setGuess(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") submit();
						},
						placeholder: "Your guess",
						"aria-label": `Guess for ${riddle.category} riddle`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submit,
						disabled: !guess.trim(),
						children: "Guess"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							reveal(riddle.id);
						},
						children: "Reveal"
					})
				]
			})
		]
	});
}
//#endregion
export { Fellowship as component };
