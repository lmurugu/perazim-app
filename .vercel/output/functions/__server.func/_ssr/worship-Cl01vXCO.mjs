import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as transposeLine, g as cn, l as HYMNS, n as Button } from "./button-CFmOdYI2.mjs";
import { n as useAppStore, t as Input } from "./input-CJ9SCehA.mjs";
import { S as ChevronDown, d as Minus, h as Heart, o as Plus } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-ByKQxtDK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/worship-Cl01vXCO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Lyrics({ lines, showChords, shift }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LyricLine, {
			line: transposeLine(line, shift),
			showChords
		}, `${i}-${line}`))
	});
}
function LyricLine({ line, showChords }) {
	const rows = line.split("\n");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: rows.map((row, i) => {
			const parts = row.split(/(\[[^\]]+\])/g).filter(Boolean);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: showChords ? "pt-4 text-15 leading-7" : "text-15 leading-7",
				children: parts.map((part, j) => {
					const chord = part.match(/^\[([^\]]+)\]$/);
					if (chord) {
						if (!showChords) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative inline-block min-w-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-4 left-0 font-sans text-xs font-medium tracking-wide text-primary",
								children: chord[1]
							})
						}, j);
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, j);
				})
			}, i);
		})
	});
}
function Worship() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [openId, setOpenId] = (0, import_react.useState)("amazing-grace");
	const favorites = useAppStore((s) => s.favoriteHymns);
	const list = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return [...q ? HYMNS.filter((h) => h.title.toLowerCase().includes(q) || h.authors.toLowerCase().includes(q) || h.tags.some((t) => t.includes(q))) : HYMNS].sort((a, b) => {
			return (favorites.includes(a.id) ? 0 : 1) - (favorites.includes(b.id) ? 0 : 1);
		});
	}, [query, favorites]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in mx-auto max-w-3xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-medium tracking-tight",
				children: "Worship"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Hymns and a chord browser for the house. Transpose to your key."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hymnals.jpg",
					alt: "Leather hymnals on a pew",
					className: "h-32 w-full rounded-2xl object-cover sm:h-40"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/bookshelf.jpg",
					alt: "Theological library",
					className: "h-32 w-full rounded-2xl object-cover sm:h-40"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search titles, writers, themes",
				"aria-label": "Search hymns"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-caps text-muted",
				children: "Hymns & chords"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: list.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HymnCard, {
					hymn: h,
					open: openId === h.id,
					onToggle: () => setOpenId(openId === h.id ? null : h.id)
				}, h.id))
			})] })
		]
	});
}
function HymnCard({ hymn, open, onToggle }) {
	const fav = useAppStore((s) => s.favoriteHymns.includes(hymn.id));
	const toggle = useAppStore((s) => s.toggleHymn);
	const [shift, setShift] = (0, import_react.useState)(0);
	const [chords, setChords] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-3xl bg-surface shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onToggle,
				className: "press min-w-0 flex-1 text-left",
				"aria-expanded": open,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: hymn.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: [
							"Key of ",
							hymn.key,
							" · ",
							hymn.bpm,
							" BPM · ",
							hymn.authors
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-2 inline-flex items-center gap-1 text-sm text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform duration-200", open && "rotate-180") }), open ? "Hide lyrics" : "View lyrics & chords"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => toggle(hymn.id),
				className: "press flex size-11 shrink-0 items-center justify-center rounded-lg text-muted",
				"aria-label": fav ? "Remove from setlist" : "Save to setlist",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
					className: cn("size-5", fav && "fill-primary text-primary"),
					strokeWidth: 1.75
				})
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-4 pb-5 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: hymn.publicDomain ? "Public domain" : "CCLI excerpt" }), hymn.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-surface-2 text-muted",
						children: t
					}, t))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center rounded-lg bg-bg p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-9",
								onClick: () => setShift((s) => s - 1),
								"aria-label": "Transpose down",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-16 text-center text-xs font-medium tabular-nums text-muted",
								children: shift === 0 ? "Original" : shift > 0 ? `+${shift}` : shift
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-9",
								onClick: () => setShift((s) => s + 1),
								"aria-label": "Transpose up",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: chords ? "soft" : "ghost",
						size: "sm",
						onClick: () => setChords((c) => !c),
						children: chords ? "Chords on" : "Chords off"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-5",
					children: [hymn.verses.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 text-2xs uppercase tracking-caps text-subtle",
						children: ["Verse ", i + 1]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lyrics, {
						lines: [v],
						showChords: chords,
						shift
					})] }, i)), hymn.chorus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-2xs uppercase tracking-caps text-subtle",
						children: "Chorus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lyrics, {
						lines: [hymn.chorus],
						showChords: chords,
						shift
					})] })]
				})
			]
		})]
	});
}
//#endregion
export { Worship as component };
