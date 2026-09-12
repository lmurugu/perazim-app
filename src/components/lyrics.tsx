import { transposeLine } from "@/lib/utils";

export function Lyrics({
  lines,
  showChords,
  shift,
}: {
  lines: string[];
  showChords: boolean;
  shift: number;
}) {
  return (
    <div className="space-y-3">
      {lines.map((line, i) => (
        <LyricBlock
          key={`${i}-${line}`}
          line={transposeLine(line, shift)}
          showChords={showChords}
        />
      ))}
    </div>
  );
}

function parseLyric(line: string) {
  const tokens: { chord?: string; text: string }[] = [];
  let rest = line;
  while (rest.length) {
    const chordMatch = rest.match(/^\[([^\]]+)\]/);
    if (chordMatch) {
      rest = rest.slice(chordMatch[0].length);
      const next = rest.search(/\[/);
      const text = next === -1 ? rest : rest.slice(0, next);
      tokens.push({ chord: chordMatch[1], text });
      rest = next === -1 ? "" : rest.slice(next);
      continue;
    }
    const next = rest.search(/\[/);
    const text = next === -1 ? rest : rest.slice(0, next);
    tokens.push({ text });
    rest = next === -1 ? "" : rest.slice(next);
  }
  return tokens;
}

function LyricBlock({ line, showChords }: { line: string; showChords: boolean }) {
  const rows = line.split("\n");
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <p
          key={i}
          className={showChords ? "pt-4 text-15 leading-7" : "text-15 leading-7"}
        >
          {parseLyric(row).map((tok, j) => (
            <span key={j} className="relative inline">
              {showChords && tok.chord ? (
                <span className="absolute -top-4 left-0 whitespace-nowrap font-sans text-xs font-medium tracking-wide text-primary">
                  {tok.chord}
                </span>
              ) : null}
              {tok.text || (showChords ? " " : "")}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
