import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as xpIntoLevel, _ as formatKes, g as cn, h as VERSE, n as Button, o as GIVE_FUNDS, r as CAMPUSES, s as GIVE_PRESETS, x as todayKey, y as levelFromXp } from "./button-CFmOdYI2.mjs";
import { n as useAppStore, t as Input } from "./input-CJ9SCehA.mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Check, g as HandHeart, i as TriangleAlert, l as Music2, m as House, n as Video, p as MapPin, r as Users, t as Zap, v as Flame } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BGhEN8hm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "9",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 7.5v17M11 13.5c3.2 3.4 4 6.4 5 11M21 13.5c-3.2 3.4-4 6.4-5 11",
			stroke: "#F4EFE6",
			strokeWidth: "1.7",
			strokeLinecap: "round",
			fill: "none"
		})]
	});
}
function Progress({ value, className }) {
	const v = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className),
		role: "progressbar",
		"aria-valuenow": Math.round(v),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-primary transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
			style: { width: `${v}%` }
		})
	});
}
function Sheet({ open, onOpenChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		shouldScaleBackground: true,
		children
	});
}
function SheetContent({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/45" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92vh] max-w-lg flex-col rounded-t-3xl bg-bg outline-none", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4",
			children
		})]
	})] });
}
var SheetTitle = Drawer.Title;
var SheetDescription = Drawer.Description;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-28 w-full rounded-xl bg-surface px-3.5 py-3 text-sm text-fg shadow-card", "placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35", className),
	...props
}));
Textarea.displayName = "Textarea";
function CampusSheet({ open, onOpenChange }) {
	const campusId = useAppStore((s) => s.campusId);
	const setCampus = useAppStore((s) => s.setCampus);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display text-2xl font-medium",
				children: "Choose a campus"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
				className: "mt-1 text-sm text-muted",
				children: "Gatherings, sermons, and events follow the house you pick."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: CAMPUSES.map((c) => {
					const active = c.id === campusId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setCampus(c.id);
							onOpenChange(false);
							toast(`Now walking with ${c.name}`);
						},
						className: "press flex w-full items-start gap-3 rounded-2xl bg-surface p-4 text-left shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex size-9 items-center justify-center rounded-lg bg-primary/8 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block font-medium",
										children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" · ", c.city]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-sm text-muted",
										children: c.gathering
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-subtle",
										children: c.address
									})
								]
							}),
							active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" })
						]
					}) }, c.id);
				})
			})
		] })
	});
}
function ProfileSheet({ open, onOpenChange }) {
	const name = useAppStore((s) => s.name);
	const xp = useAppStore((s) => s.xp);
	const streak = useAppStore((s) => s.streak);
	const setName = useAppStore((s) => s.setName);
	const [draft, setDraft] = (0, import_react.useState)(name);
	const level = levelFromXp(xp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display text-2xl font-medium",
				children: "Your walk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
				className: "mt-1 text-sm text-muted",
				children: "Progress stays on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-3xl bg-ink p-5 text-ink-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-caps text-ink-muted",
						children: ["Level ", level]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl font-medium",
						children: name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [xp, " XP"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [streak, " day streak"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: xpIntoLevel(xp),
						className: "mt-4 bg-ink-muted/20 [&_div]:bg-ink-fg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-ink-muted",
						children: [
							100 - xpIntoLevel(xp),
							" XP to level ",
							level + 1
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-6 block text-xs font-medium uppercase tracking-wider text-muted",
				children: "Display name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-2",
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				maxLength: 24
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-3 w-full",
				onClick: () => {
					setName(draft);
					toast("Name saved");
					onOpenChange(false);
				},
				children: "Save"
			})
		] })
	});
}
function ReflectSheet({ open, onOpenChange }) {
	const existing = useAppStore((s) => s.reflections.find((r) => r.date === todayKey()));
	const save = useAppStore((s) => s.saveReflection);
	const [text, setText] = (0, import_react.useState)(existing?.text ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display text-2xl font-medium",
				children: "Reflect"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, {
				className: "mt-1 text-sm text-muted",
				children: [
					VERSE.ref,
					" · ",
					VERSE.context
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-5 min-h-40",
				placeholder: "Where is the Lord asking you to wait for the sound in the trees?",
				value: text,
				onChange: (e) => setText(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				disabled: !text.trim(),
				onClick: () => {
					save(text.trim());
					toast("Reflection kept");
					onOpenChange(false);
				},
				children: "Keep this"
			})
		] })
	});
}
function PrayerSheet({ open, onOpenChange }) {
	const add = useAppStore((s) => s.addPrayer);
	const [body, setBody] = (0, import_react.useState)("");
	const [isPrivate, setPrivate] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display text-2xl font-medium",
				children: "Ask the intercessors"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
				className: "mt-1 text-sm text-muted",
				children: "Shared requests appear in Fellowship. Private ones stay on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-5 min-h-36",
				placeholder: "What should we carry with you?",
				value: body,
				onChange: (e) => setBody(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex min-h-11 items-center gap-2.5 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: isPrivate,
					onChange: (e) => setPrivate(e.target.checked),
					className: "size-4 accent-primary"
				}), "Keep this request private"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-3 w-full",
				disabled: body.trim().length < 8,
				onClick: () => {
					add(body, isPrivate);
					setBody("");
					toast(isPrivate ? "Kept privately" : "Sent to the house");
					onOpenChange(false);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, { className: "size-4" }), "Submit request"]
			})
		] })
	});
}
function GiveSheet({ open, onOpenChange }) {
	const [fund, setFund] = (0, import_react.useState)("tithe");
	const [amount, setAmount] = (0, import_react.useState)(1e3);
	const [custom, setCustom] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const value = custom ? Number(custom) || 0 : amount;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (v) => {
			onOpenChange(v);
			if (!v) setTimeout(() => setDone(false), 200);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display text-2xl font-medium",
				children: "Give"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
				className: "mt-1 text-sm text-muted",
				children: "A preview of our giving flow — no charge is taken here."
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-medium",
						children: "Thank you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							formatKes(value),
							" toward ",
							GIVE_FUNDS.find((f) => f.id === fund)?.label,
							". In the house, this would go to M-Pesa."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						onClick: () => onOpenChange(false),
						children: "Close"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid grid-cols-4 gap-2",
					children: GIVE_FUNDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFund(f.id),
						className: `press h-11 rounded-lg text-xs font-medium ${fund === f.id ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-card"}`,
						children: f.label
					}, f.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-4 gap-2",
					children: GIVE_PRESETS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setAmount(n);
							setCustom("");
						},
						className: `press h-11 rounded-lg text-sm font-medium tabular-nums ${!custom && amount === n ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-card"}`,
						children: n.toLocaleString()
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-3",
					inputMode: "numeric",
					placeholder: "Another amount (KES)",
					value: custom,
					onChange: (e) => setCustom(e.target.value.replace(/[^\d]/g, ""))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-4 w-full",
					size: "lg",
					disabled: value < 50,
					onClick: () => setDone(true),
					children: ["Continue with ", formatKes(value)]
				})
			] })
		] })
	});
}
function PassageSheet({ open, onOpenChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display text-2xl font-medium",
				children: VERSE.ref
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
				className: "mt-1 text-sm text-muted",
				children: "The naming of Baal Perazim."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 space-y-4",
				children: VERSE.passage.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-6 shrink-0 pt-0.5 text-right text-xs tabular-nums text-subtle",
						children: p.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-snug text-fg",
						children: p.t
					})]
				}, p.n))
			})
		] })
	});
}
var TABS = [
	{
		to: "/",
		label: "Home",
		icon: House,
		match: (p) => p === "/"
	},
	{
		to: "/sermons",
		label: "Sermons",
		icon: Video,
		match: (p) => p.startsWith("/sermons")
	},
	{
		to: "/worship",
		label: "Worship",
		icon: Music2,
		match: (p) => p.startsWith("/worship")
	},
	{
		to: "/fellowship",
		label: "Fellowship",
		icon: Users,
		match: (p) => p.startsWith("/fellowship")
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const xp = useAppStore((s) => s.xp);
	const campusId = useAppStore((s) => s.campusId);
	const campus = CAMPUSES.find((c) => c.id === campusId) ?? CAMPUSES[0];
	const [campusOpen, setCampusOpen] = (0, import_react.useState)(false);
	const [profileOpen, setProfileOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border px-4 py-6 lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-10 flex flex-col gap-1",
							children: TABS.map((tab) => {
								const active = tab.match(pathname);
								const Icon = tab.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: tab.to,
									className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-fg" : "text-muted hover:bg-surface-2 hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4",
										strokeWidth: 1.75
									}), tab.label]
								}, tab.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-auto text-xs leading-relaxed text-subtle",
							children: [
								"Perazim Mission Church",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"God of the Breakthrough"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg px-4 py-3 lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCampusOpen(true),
								className: "press min-h-11 min-w-0 flex-1 rounded-full bg-surface px-4 text-left text-sm text-fg shadow-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate",
									children: [campus.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [" · ", campus.city]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setProfileOpen(true),
								className: "press inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-surface px-3.5 text-sm font-medium text-fg shadow-card",
								"aria-label": `${xp} experience points, level ${levelFromXp(xp)}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
										className: "size-3.5 text-primary",
										strokeWidth: 2.25
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: xp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-subtle",
										children: "XP"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 px-4 pb-28 pt-5 lg:px-8 lg:pb-10",
						children
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden",
				"aria-label": "Primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto grid max-w-lg grid-cols-4 px-2 pt-1.5 pb-1.5",
					children: TABS.map((tab) => {
						const active = tab.match(pathname);
						const Icon = tab.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: tab.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-2xs font-medium transition-colors duration-150", active ? "bg-primary/8 text-primary" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2 : 1.6
							}), tab.label]
						}) }, tab.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampusSheet, {
				open: campusOpen,
				onOpenChange: setCampusOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSheet, {
				open: profileOpen,
				onOpenChange: setProfileOpen
			})
		]
	});
}
function Brand({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5 text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: compact ? "size-9" : "size-10" }), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-medium tracking-tight text-fg",
				children: "Perazim"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs uppercase tracking-caps text-muted",
				children: "Mission Church"
			})]
		})]
	});
}
var styles_default = "/assets/styles-DcJX19TA.css";
var APP_NAME = "Perazim";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#2A3D34"
			},
			{
				name: "description",
				content: "Perazim Mission Church — daily devotion, sermons, worship, and fellowship. God of the Breakthrough."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				toastOptions: { className: "!bg-ink !text-ink-fg !border-0 !shadow-card !rounded-xl !font-sans" }
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function Shell({ children }) {
	const touchStreak = useAppStore((s) => s.touchStreak);
	(0, import_react.useEffect)(() => {
		touchStreak();
	}, [touchStreak]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children });
}
var $$splitComponentImporter$4 = () => import("./routes-D_lEwwdw.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./fellowship-bC-pd0TD.mjs");
var Route$3 = createFileRoute("/fellowship")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./worship-Cl01vXCO.mjs");
var Route$2 = createFileRoute("/worship")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./sermons-BI0kd5qA.mjs");
var Route$1 = createFileRoute("/sermons/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_id-CVZw7nBm.mjs");
var Route = createFileRoute("/sermons/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var FellowshipRoute = Route$3.update({
	id: "/fellowship",
	path: "/fellowship",
	getParentRoute: () => Route$5
});
var WorshipRoute = Route$2.update({
	id: "/worship",
	path: "/worship",
	getParentRoute: () => Route$5
});
var SermonsIndexRoute = Route$1.update({
	id: "/sermons/",
	path: "/sermons/",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute,
	FellowshipRoute,
	WorshipRoute,
	SermonsIdRoute: Route.update({
		id: "/sermons/$id",
		path: "/sermons/$id",
		getParentRoute: () => Route$5
	}),
	SermonsIndexRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { PrayerSheet as a, PassageSheet as i, Route as n, ReflectSheet as o, GiveSheet as r, Progress as s, router_exports as t };
