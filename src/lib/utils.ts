import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function greetingForHour(h: number) {
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function formatKes(n: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(n);
}

export function normalizeGuess(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const NOTE_ALIAS: Record<string, string> = {
  Db: "C#",
  Dsharp: "D#",
  Gb: "F#",
  "G#": "Ab",
  "A#": "Bb",
  "D#": "Eb",
};

export function transposeChord(chord: string, semitones: number) {
  const m = chord.match(/^([A-G](?:#|b)?)(.*)$/);
  if (!m) return chord;
  const root = NOTE_ALIAS[m[1]] ?? m[1];
  const idx = NOTES.indexOf(root);
  if (idx < 0) return chord;
  const next = NOTES[(idx + semitones + 60) % 12];
  return `${next}${m[2]}`;
}

export function transposeLine(line: string, semitones: number) {
  if (!semitones) return line;
  return line.replace(/\[([^\]]+)\]/g, (_, c: string) => {
    const parts = String(c).split("/");
    return `[${parts.map((p) => transposeChord(p, semitones)).join("/")}]`;
  });
}

export function levelFromXp(xp: number) {
  return Math.floor(xp / 100) + 1;
}

export function xpIntoLevel(xp: number) {
  return xp % 100;
}
