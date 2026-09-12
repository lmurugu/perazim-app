import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CFmOdYI2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CAMPUSES = [
	{
		id: "embu",
		name: "Central Campus",
		city: "Embu",
		gathering: "Sundays 9:00 & 11:00",
		address: "Kenyatta Road, Embu"
	},
	{
		id: "nairobi",
		name: "Valley Campus",
		city: "Nairobi",
		gathering: "Sundays 8:30 & 10:30",
		address: "Ngong Road, Kilimani"
	},
	{
		id: "kisumu",
		name: "Lakeside Campus",
		city: "Kisumu",
		gathering: "Sundays 9:30",
		address: "Oginga Odinga Street"
	},
	{
		id: "online",
		name: "Online Gathering",
		city: "Wherever you are",
		gathering: "Sundays 11:00 live",
		address: "Watch from home"
	}
];
var VERSE = {
	ref: "2 Samuel 5:20",
	text: "As waters break out, the LORD has broken out against my enemies before me — therefore he named that place Baal Perazim.",
	context: "David inquired of the Lord, then waited for the sound of marching in the balsam trees. Breakthrough was not haste. It was obedience, then overflow.",
	passage: [
		{
			n: 17,
			t: "When the Philistines heard that David had been anointed king over Israel, they went up in full force to search for him, but David heard about it and went down to the stronghold."
		},
		{
			n: 18,
			t: "Now the Philistines had come and spread out in the Valley of Rephaim."
		},
		{
			n: 19,
			t: "so David inquired of the LORD, “Shall I go and attack the Philistines? Will you deliver them into my hands?” The LORD answered him, “Go, for I will surely deliver the Philistines into your hands.”"
		},
		{
			n: 20,
			t: "So David went to Baal Perazim, and there he defeated them. He said, “As waters break out, the LORD has broken out against my enemies before me.” So that place was called Baal Perazim."
		},
		{
			n: 21,
			t: "The Philistines abandoned their idols there, and David and his men carried them off."
		}
	]
};
var DEVOTIONS = [
	{
		id: "psalm",
		title: "Morning Psalm",
		duration: "6 min",
		prompt: "Read Psalm 18:1–19. Notice the water imagery — God as flood, not as fuss."
	},
	{
		id: "gospel",
		title: "Gospel reading",
		duration: "8 min",
		prompt: "John 16:25–33. Courage is not the absence of trouble; it is peace inside it."
	},
	{
		id: "intercede",
		title: "Intercession",
		duration: "5 min",
		prompt: "Name three people. Ask for breakthrough that looks like water, not spectacle."
	},
	{
		id: "silence",
		title: "Silence",
		duration: "4 min",
		prompt: "Sit without a list. If a thought arrives, hand it over and return to breathing."
	},
	{
		id: "examen",
		title: "Evening examen",
		duration: "7 min",
		prompt: "Where did you resist the Spirit today? Where did waters already break out?"
	}
];
var QUEST = {
	title: "Today’s breakthrough quest",
	body: "Read 2 Samuel 5:17–25. Wait for the sound in the trees before you move. Then write one place you will obey without rushing.",
	xp: 50
};
var LIVE = {
	id: "live",
	title: "Walking in Faith: Overcoming Fear in Difficult Times",
	speaker: "Bishop Dr. David Mutweri",
	campus: "Central Campus",
	when: "Live now",
	duration: "In progress",
	image: "/images/sanctuary.jpg",
	series: "Unshaken",
	scripture: "Isaiah 41:10",
	summary: "Fear is loud, but it is not lord. A word for anyone standing in the Valley of Rephaim, waiting for the sound of marching.",
	takeaways: [
		"Inquire of the Lord before you move.",
		"Courage is obedience with trembling hands.",
		"Breakthrough has a name: the Lord who breaks out."
	],
	live: true
};
var SERMONS = [
	{
		id: "prevailing-prayer",
		title: "The Power of Prevailing Prayer",
		speaker: "Bishop Dr. David Mutweri",
		campus: "Central Campus",
		when: "Last Sunday",
		duration: "48 min",
		image: "/images/candle.jpg",
		series: "Unshaken",
		scripture: "Luke 18:1–8",
		summary: "Prayer that stays is not stubbornness. It is friendship with a God who is not late, only unhurried.",
		takeaways: [
			"Ask again without shame.",
			"The widow’s persistence is a picture of faith, not volume.",
			"Heaven is not a vending machine. It is a father."
		]
	},
	{
		id: "generations",
		title: "Grace That Transcends Generations",
		speaker: "Bishop Dr. David Mutweri",
		campus: "Central Campus",
		when: "2 weeks ago",
		duration: "52 min",
		image: "/images/fellowship.jpg",
		series: "Households",
		scripture: "Psalm 78:4–7",
		summary: "Faith is not inherited like a surname. It is handed like bread — still warm, still broken.",
		takeaways: [
			"Tell the coming generation the praiseworthy deeds of the Lord.",
			"Houses change when altars are rebuilt.",
			"Grace outlives our reputations."
		]
	},
	{
		id: "inner-spirit",
		title: "Renewing the Inner Spirit",
		speaker: "Pastor Hannah Wambui",
		campus: "Valley Campus",
		when: "3 weeks ago",
		duration: "44 min",
		image: "/images/stage.jpg",
		series: "Inner Work",
		scripture: "Ephesians 3:16–19",
		summary: "The inner person is not a mood. It is a temple, and temples are tended, not wished into beauty.",
		takeaways: [
			"Strength in the inner being is a gift, not a grind.",
			"You cannot microwave rootedness.",
			"Love is the soil. Everything else is fruit."
		]
	},
	{
		id: "balsam-trees",
		title: "The Sound in the Balsam Trees",
		speaker: "Rev. James Kariuki",
		campus: "Lakeside Campus",
		when: "1 month ago",
		duration: "41 min",
		image: "/images/waters.jpg",
		series: "Baal Perazim",
		scripture: "2 Samuel 5:22–25",
		summary: "The second battle was not a copy of the first. God told David to wait for a sound. Strategy without listening is just noise.",
		takeaways: [
			"Last week’s method is not this week’s word.",
			"Wait until you hear Him in the trees.",
			"Obedience is a better weapon than memory."
		]
	}
];
var HYMNS = [
	{
		id: "how-great",
		title: "How Great Thou Art",
		authors: "Carl Boberg / Stuart K. Hine",
		key: "G",
		bpm: 72,
		tags: ["praise", "creation"],
		publicDomain: false,
		verses: [
			"[G]O Lord my God, when [C]I in awesome [G]wonder",
			"Consider [C]all the [G]worlds Thy [D]hands have [G]made",
			"I see the stars, I [C]hear the rolling [G]thunder",
			"Thy power [C]throughout the [G]universe [D]dis[G]played"
		],
		chorus: "Then sings my [C]soul, my [G]Saviour God, to [D]Thee\nHow great Thou [G]art, how [C]great Thou [G]art\nThen sings my [C]soul, my [G]Saviour God, to [D]Thee\nHow great Thou [G]art, how [C]great Thou [G]art"
	},
	{
		id: "amazing-grace",
		title: "Amazing Grace",
		authors: "John Newton, 1779",
		key: "D",
		bpm: 68,
		tags: ["grace", "classic"],
		publicDomain: true,
		verses: [
			"[D]Amazing [G]grace, how [D]sweet the sound\nThat saved a [A]wretch like [D]me",
			"I [D]once was [G]lost, but [D]now am found\nWas blind, but [A]now I [D]see",
			"[D]’Twas grace that [G]taught my [D]heart to fear\nAnd grace my [A]fears re[D]lieved",
			"How [D]precious [G]did that [D]grace appear\nThe hour I [A]first be[D]lieved"
		]
	},
	{
		id: "way-maker",
		title: "Way Maker",
		authors: "Osinachi Kalu Okoro Egbu",
		key: "E",
		bpm: 66,
		tags: ["contemporary", "faith"],
		publicDomain: false,
		verses: ["[E]You are here, moving in our [B]midst\nI worship [C#m]You, I worship [A]You", "[E]You are here, working in this [B]place\nI worship [C#m]You, I worship [A]You"],
		chorus: "[E]Way maker, [B]miracle worker\n[C#m]Promise keeper, [A]light in the darkness\nMy God, that is who You are"
	},
	{
		id: "faithfulness",
		title: "Great Is Thy Faithfulness",
		authors: "Thomas Chisholm",
		key: "C",
		bpm: 80,
		tags: ["classic", "trust"],
		publicDomain: false,
		verses: ["[C]Great is Thy [F]faithfulness, [G]O God my [C]Father\nThere is no [F]shadow of [D]turning with [G]Thee", "Thou changest [C]not, Thy com[F]passions, they [C]fail not\nAs Thou hast [F]been, Thou for[G]ever wilt [C]be"],
		chorus: "Great is Thy [F]faithfulness\nGreat is Thy [C]faithfulness\n[G]Morning by morning new [C]mercies I [G]see\nAll I have [C]needed Thy [F]hand hath pro[C]vided\nGreat is Thy [F]faithfulness, [G]Lord, unto [C]me"
	},
	{
		id: "be-thou",
		title: "Be Thou My Vision",
		authors: "Ancient Irish, tr. Mary Byrne",
		key: "D",
		bpm: 76,
		tags: ["classic", "devotion"],
		publicDomain: true,
		verses: [
			"[D]Be Thou my [G]vision, O [D]Lord of my [A]heart\nNaught be all [G]else to me, [D]save that Thou [A]art",
			"[D]Thou my best [G]thought, by [D]day or by [A]night\nWaking or [G]sleeping, Thy [D]presence my [A]light",
			"[D]Be Thou my [G]wisdom, and [D]Thou my true [A]word\nI ever [G]with Thee and [D]Thou with me, [A]Lord"
		]
	},
	{
		id: "it-is-well",
		title: "It Is Well With My Soul",
		authors: "Horatio Spafford",
		key: "C",
		bpm: 70,
		tags: ["peace", "classic"],
		publicDomain: true,
		verses: ["[C]When peace like a [F]river at[C]tendeth my [G]way\nWhen sorrows like [C]sea billows [G]roll", "Whatever my [C]lot, Thou hast [F]taught me to [C]say\nIt is well, it is [G]well with my [C]soul"],
		chorus: "It is [F]well  (it is well)\nWith my [C]soul  (with my soul)\nIt is [C]well, it is [G]well with my [C]soul"
	}
];
var RIDDLES = [
	{
		id: "adam",
		category: "Old Testament",
		xp: 15,
		prompt: "I was not born, yet I had a wife. I never had a mother, yet I walked in the garden of life. Who am I?",
		answers: ["adam"],
		reveal: "Adam — formed from the dust, given Eve, walking with God in Eden.",
		verse: "Genesis 2:7–22"
	},
	{
		id: "jonah",
		category: "Prophets",
		xp: 20,
		prompt: "I ran away on a ship to escape God’s calling, only to end up in a three-day dark submarine ride. Who am I?",
		answers: ["jonah", "jonas"],
		reveal: "Jonah — three days in the great fish before Nineveh.",
		verse: "Jonah 1–2"
	},
	{
		id: "zacchaeus",
		category: "Gospels",
		xp: 10,
		prompt: "I climbed up a sycamore tree just to catch a glimpse of Jesus passing by. Who was I?",
		answers: [
			"zacchaeus",
			"zacheus",
			"zaccheus"
		],
		reveal: "Zacchaeus — a tax collector who came down and hosted the Lord.",
		verse: "Luke 19:1–10"
	},
	{
		id: "lion-honey",
		category: "Judges",
		xp: 25,
		prompt: "Out of the eater came something to eat, and out of the strong came something sweet. What was it?",
		answers: [
			"honey",
			"lion",
			"samson",
			"honey from the lion",
			"honey in the lion"
		],
		reveal: "Honey in the carcass of the lion Samson had killed — his wedding riddle.",
		verse: "Judges 14:14"
	}
];
var HUMOR = {
	q: "Who was the greatest financier in the Bible?",
	a: "Noah. He was floating his stock while everyone else was in liquidation."
};
var EVENTS = [
	{
		id: "food-drive",
		title: "Community Food Drive",
		when: "Today · 10:00",
		where: "Central Campus courtyard",
		kind: "serve"
	},
	{
		id: "sunday",
		title: "Sunday Gathering",
		when: "Tomorrow · 9:00 & 11:00",
		where: "Sanctuary",
		kind: "gathering"
	},
	{
		id: "youth",
		title: "Youth Fellowship",
		when: "Fri 18 Sep · 19:00",
		where: "Main Hall",
		kind: "youth"
	},
	{
		id: "midweek",
		title: "Midweek Prayer",
		when: "Wed 16 Sep · 18:00",
		where: "Upper room",
		kind: "prayer"
	}
];
var ANNOUNCEMENTS = [
	{
		id: "a1",
		title: "Youth Fellowship",
		body: "Friday 19:00 in the Main Hall. Bring a friend; supper is served after worship."
	},
	{
		id: "a2",
		title: "Community Food Drive",
		body: "Saturday 10:00 at Central Campus. Staples, oil, and soap are the current need."
	},
	{
		id: "a3",
		title: "Baptism Sunday",
		body: "On 27 September we baptise. Speak with a pastor after the gathering if you are ready."
	}
];
var SEED_PRAYERS = [
	{
		id: "p1",
		name: "Intercessors",
		body: "Healing and steady hands for Mama Njeri’s surgery on Monday.",
		amens: 24
	},
	{
		id: "p2",
		name: "Campus students",
		body: "Provision and wise friends for those travelling to university this month.",
		amens: 18
	},
	{
		id: "p3",
		name: "City",
		body: "Peace over Embu and clean water in the estates still waiting on pipes.",
		amens: 31
	}
];
var GIVE_PRESETS = [
	200,
	500,
	1e3,
	2500
];
var GIVE_FUNDS = [
	{
		id: "tithe",
		label: "Tithe"
	},
	{
		id: "offering",
		label: "Offering"
	},
	{
		id: "missions",
		label: "Missions"
	},
	{
		id: "mercy",
		label: "Mercy fund"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function greetingForHour(h) {
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function formatKes(n) {
	return new Intl.NumberFormat("en-KE", {
		style: "currency",
		currency: "KES",
		maximumFractionDigits: 0
	}).format(n);
}
function normalizeGuess(s) {
	return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}
var NOTES = [
	"C",
	"C#",
	"D",
	"Eb",
	"E",
	"F",
	"F#",
	"G",
	"Ab",
	"A",
	"Bb",
	"B"
];
var NOTE_ALIAS = {
	Db: "C#",
	Dsharp: "D#",
	Gb: "F#",
	"G#": "Ab",
	"A#": "Bb",
	"D#": "Eb"
};
function transposeChord(chord, semitones) {
	const m = chord.match(/^([A-G](?:#|b)?)(.*)$/);
	if (!m) return chord;
	const root = NOTE_ALIAS[m[1]] ?? m[1];
	const idx = NOTES.indexOf(root);
	if (idx < 0) return chord;
	return `${NOTES[(idx + semitones + 60) % 12]}${m[2]}`;
}
function transposeLine(line, semitones) {
	if (!semitones) return line;
	return line.replace(/\[([^\]]+)\]/g, (_, c) => {
		return `[${String(c).split("/").map((p) => transposeChord(p, semitones)).join("/")}]`;
	});
}
function levelFromXp(xp) {
	return Math.floor(xp / 100) + 1;
}
function xpIntoLevel(xp) {
	return xp % 100;
}
var buttonVariants = cva("press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[background-color,color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg shadow-card hover:bg-sage",
			secondary: "bg-surface text-fg shadow-card hover:shadow-card-hover",
			ink: "bg-ink text-ink-fg hover:bg-fg",
			ghost: "bg-transparent text-fg hover:bg-surface-2/70",
			soft: "bg-primary/10 text-primary hover:bg-primary/16",
			live: "bg-live text-primary-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 px-3 text-xs",
			md: "h-11 px-4",
			lg: "h-12 px-5",
			xl: "h-14 px-6 text-[0.9375rem]",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { xpIntoLevel as C, transposeLine as S, formatKes as _, EVENTS as a, normalizeGuess as b, HUMOR as c, QUEST as d, RIDDLES as f, cn as g, VERSE as h, DEVOTIONS as i, HYMNS as l, SERMONS as m, Button as n, GIVE_FUNDS as o, SEED_PRAYERS as p, CAMPUSES as r, GIVE_PRESETS as s, ANNOUNCEMENTS as t, LIVE as u, greetingForHour as v, todayKey as x, levelFromXp as y };
