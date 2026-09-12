import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { m as SERMONS, n as Button, u as LIVE } from "./_ssr/button-CFmOdYI2.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowLeft, T as BookOpen, c as Pause, s as Play } from "./_libs/lucide-react.mjs";
import { n as Route } from "./_ssr/router-BGhEN8hm.mjs";
import { t as Badge } from "./_ssr/badge-ByKQxtDK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-CVZw7nBm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function findSermon(id) {
	if (id === LIVE.id) return LIVE;
	return SERMONS.find((s) => s.id === id);
}
function SermonDetail() {
	const { id } = Route.useParams();
	const sermon = findSermon(id);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(8);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const t = setInterval(() => {
			setProgress((p) => p >= 100 ? 0 : p + .4);
		}, 400);
		return () => clearInterval(t);
	}, [playing]);
	if (!sermon) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "This message is not in the archive."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/sermons",
			className: "mt-4 inline-block text-sm text-primary",
			children: "Back to sermons"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in mx-auto max-w-3xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/sermons",
				className: "inline-flex min-h-11 items-center gap-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Archive"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-3xl bg-ink text-ink-fg shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sermon.image,
							alt: "",
							className: "h-56 w-full object-cover opacity-80 sm:h-72"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" }),
						sermon.live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "absolute left-4 top-4 bg-live text-primary-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-primary-fg" }), "Live"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 pb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-caps text-ink-muted",
							children: [
								sermon.series,
								" · ",
								sermon.campus
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-3xl font-medium leading-snug",
							children: sermon.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-ink-muted",
							children: [
								sermon.speaker,
								" · ",
								sermon.when,
								" · ",
								sermon.duration
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "icon",
								className: "size-12 rounded-full bg-ink-fg text-ink",
								onClick: () => setPlaying((p) => !p),
								"aria-label": playing ? "Pause" : "Play",
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1 overflow-hidden rounded-full bg-ink-muted/25",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-ink-fg transition-[width] duration-300",
										style: { width: `${progress}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs tabular-nums text-ink-muted",
									children: sermon.live ? "Streaming" : "Preview player"
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-surface p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-caps text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), sermon.scripture]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 leading-relaxed text-fg",
					children: sermon.summary
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-caps text-muted",
				children: "Takeaways"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-2",
				children: sermon.takeaways.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl text-primary tabular-nums",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-0.5 text-sm leading-relaxed",
						children: t
					})]
				}, t))
			})] })
		]
	});
}
//#endregion
export { SermonDetail as component };
