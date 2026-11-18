#!/usr/bin/env node
// Refreshes the bundled feed snapshot in src/lib/feed/snapshot/ from the
// published shared content feed (the website repo's data/ folder).
// The app ships this snapshot so it works offline and on first load, then
// fetches the live feed in the browser.
//
//   npm run feed:sync                       # from VITE_CONTENT_FEED_URL or the default
//   npm run feed:sync -- ../perazim-mission-church/data   # from a local checkout
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT = "https://lmurugu.github.io/perazim-mission-church/data";
const TABS = ["manifest", "sermons", "hymns", "riddles", "jokes", "events", "announcements", "verses", "campuses", "config"];
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "..", "src", "lib", "feed", "snapshot");
const source = (process.argv[2] || process.env.VITE_CONTENT_FEED_URL || DEFAULT).replace(/\/+$/, "");
const isUrl = /^https?:\/\//.test(source);

async function load(tab) {
  if (isUrl) {
    const res = await fetch(`${source}/${tab}.json`);
    if (!res.ok) throw new Error(`${tab}.json: HTTP ${res.status}`);
    return res.text();
  }
  return readFile(path.join(source, `${tab}.json`), "utf8");
}

for (const tab of TABS) {
  const text = await load(tab);
  const json = JSON.parse(text);
  if (json.schema_version !== 1) throw new Error(`${tab}.json: unsupported schema_version ${json.schema_version}`);
  await writeFile(path.join(out, `${tab}.json`), text.endsWith("\n") ? text : text + "\n");
  console.log(`synced ${tab}`);
}
