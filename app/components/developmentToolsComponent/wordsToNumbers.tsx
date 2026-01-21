"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// Basic English words-to-number conversion supporting negatives and decimals.
// Converts number words found anywhere in the text to their numeric forms.

type Token = string;

const SMALL_NUMBERS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

const SCALE_NUMBERS: Record<string, number> = {
  hundred: 100,
  thousand: 1_000,
  million: 1_000_000,
  billion: 1_000_000_000,
  trillion: 1_000_000_000_000,
};

const DECIMAL_MARKERS = new Set(["point", "dot", "decimal"]);

const NORMALIZE_MAP: Record<string, string> = {
  oh: "zero",
};

const isWordBoundary = (ch: string) => /[^a-zA-Z]/.test(ch);

function tokenize(text: string): Token[] {
  // Split into words while keeping punctuation as separate tokens
  const tokens: Token[] = [];
  let current = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/^[a-zA-Z]$/.test(ch)) {
      current += ch;
    } else {
      if (current) tokens.push(current);
      tokens.push(ch);
      current = "";
    }
  }
  if (current) tokens.push(current);
  return tokens;
}

function normalizeWord(w: string): string {
  const lc = w.toLowerCase();
  // keep hyphenated tokens as a single word so we parse "forty-five" correctly
  const cleaned = lc.trim();
  return NORMALIZE_MAP[cleaned] ?? cleaned;
}

function parseIntegerWords(words: string[]): {
  value: number | null;
  used: number;
} {
  // Parses sequences like "two hundred thirty five thousand six hundred and seven"
  let total = 0;
  let current = 0;
  let used = 0;
  let consumedAny = false;

  while (used < words.length) {
    const w = words[used];
    if (w === "and") {
      used++;
      continue;
    }

    // Support hyphenated tens like "forty-five"
    if (
      /^(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-([a-z]+)$/.test(
        w
      )
    ) {
      const [_, tensWord, onesWord] = w.match(
        /^(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-([a-z]+)$/
      )!;
      const tens = SMALL_NUMBERS[tensWord];
      const ones = SMALL_NUMBERS[onesWord] ?? 0;
      current += (tens || 0) + (ones || 0);
      used++;
      consumedAny = true;
      continue;
    }

    if (SMALL_NUMBERS[w] !== undefined) {
      current += SMALL_NUMBERS[w];
      used++;
      consumedAny = true;
      continue;
    }

    if (w in SCALE_NUMBERS) {
      const scale = SCALE_NUMBERS[w];
      if (current === 0) current = 1; // "hundred" as 100, e.g., "one hundred" vs "hundred"
      current *= scale;
      total += current;
      current = 0;
      used++;
      consumedAny = true;
      continue;
    }

    break;
  }

  if (!consumedAny) return { value: null, used: 0 };
  return { value: total + current, used };
}

function parseNumberWordsAt(
  words: string[],
  startIdx: number
): { value: number | null; used: number } {
  const slice = words.slice(startIdx);
  if (slice.length === 0) return { value: null, used: 0 };

  let sign = 1;
  let idx = 0;
  if (slice[idx] === "minus" || slice[idx] === "negative") {
    sign = -1;
    idx++;
  }

  const intPart = parseIntegerWords(slice.slice(idx));
  if (intPart.value === null) return { value: null, used: 0 };
  idx += intPart.used;

  let value = intPart.value;

  // If next word is a plain number token (e.g., '123') or signed float, stop here to avoid accidental addition
  if (idx < slice.length && /^-?\d+(?:\.\d+)?$/.test(slice[idx])) {
    return { value: sign * value, used: idx };
  }

  if (idx < slice.length && DECIMAL_MARKERS.has(slice[idx])) {
    idx++;
    // parse decimal digits as sequence of small numbers (zero..nine)
    let decimalStr = "";
    let consumed = 0;
    while (idx + consumed < slice.length) {
      const w = slice[idx + consumed];
      if (SMALL_NUMBERS[w] !== undefined && SMALL_NUMBERS[w] < 10) {
        decimalStr += String(SMALL_NUMBERS[w]);
        consumed++;
        continue;
      }
      break;
    }
    if (decimalStr.length > 0) {
      value = Number(`${value}.${decimalStr}`);
      idx += consumed;
    }
  }

  return { value: sign * value, used: idx };
}

function convertWordsToNumbersInText(
  text: string,
  opts?: { thousandsSeparator?: boolean }
): string {
  const convertLine = (line: string): string => {
    const tokens = tokenize(line);
    // Build word-only view with indices mapping to token positions
    const words: string[] = [];
    const wordTokenIdx: number[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (/^[a-zA-Z]+$/.test(t)) {
        words.push(normalizeWord(t));
        wordTokenIdx.push(i);
      }
    }

    const replacements: Array<{
      startToken: number;
      endToken: number;
      text: string;
    }> = [];

    let i = 0;
    while (i < words.length) {
      const word = words[i];
      const looksNumericWord =
        SMALL_NUMBERS[word] !== undefined ||
        word in SCALE_NUMBERS ||
        word === "and" ||
        word === "minus" ||
        word === "negative" ||
        DECIMAL_MARKERS.has(word);
      if (!looksNumericWord) {
        i++;
        continue;
      }

      const { value, used } = parseNumberWordsAt(words, i);
      if (value === null || used === 0) {
        i++;
        continue;
      }

      const startToken = wordTokenIdx[i];
      const endToken = wordTokenIdx[i + used - 1];
      // Replace continuous run of tokens from startToken to endToken with numeric string
      const formatted = opts?.thousandsSeparator
        ? Number.isInteger(value)
          ? Math.trunc(value).toLocaleString("en-US")
          : value.toLocaleString("en-US")
        : String(value);
      replacements.push({ startToken, endToken, text: formatted });
      i += used;
    }

    if (replacements.length === 0) return line;

    // Apply replacements on tokens array
    let result = "";
    let tokenIdx = 0;
    let repIdx = 0;
    while (tokenIdx < tokens.length) {
      if (
        repIdx < replacements.length &&
        tokenIdx === replacements[repIdx].startToken
      ) {
        result += replacements[repIdx].text;
        tokenIdx = replacements[repIdx].endToken + 1;
        repIdx++;
        continue;
      }
      result += tokens[tokenIdx];
      tokenIdx++;
    }
    return result;
  };

  // Process each line independently to avoid summing across lines
  const lines = text.split(/\r?\n/);
  return lines.map(convertLine).join("\n");
}

const WordsToNumbers: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoConvert, setAutoConvert] = useState(false);
  const [thousandsSep, setThousandsSep] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoConvert) return;
    const converted = convertWordsToNumbersInText(input, {
      thousandsSeparator: thousandsSep,
    });
    if (removeDuplicates) {
      const nums = extractNumbersFromText(converted);
      const unique = Array.from(new Set(nums));
      setOutput(unique.join("\n"));
    } else {
      setOutput(converted);
    }
  }, [input, autoConvert, thousandsSep, removeDuplicates]);
  const extractNumbersFromText = (text: string): string[] => {
    const matches =
      text.match(/-?\d{1,3}(?:,\d{3})*(?:\.\d+)?|-?\d+(?:\.\d+)?/g) || [];
    return matches;
  };

  const onConvert = () => {
    const converted = convertWordsToNumbersInText(input, {
      thousandsSeparator: thousandsSep,
    });
    if (removeDuplicates) {
      const nums = extractNumbersFromText(converted);
      const unique = Array.from(new Set(nums));
      setOutput(unique.join("\n"));
    } else {
      setOutput(converted);
    }
  };
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "words-to-numbers.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const onClear = () => {
    setInput("");
    setOutput("");
  };
  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            {/* Top Options */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={autoConvert}
                  onChange={(e) => setAutoConvert(e.target.checked)}
                />
                Auto Update
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={thousandsSep}
                  onChange={(e) => setThousandsSep(e.target.checked)}
                />
                Add Thousands Separator
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={removeDuplicates}
                  onChange={(e) => setRemoveDuplicates(e.target.checked)}
                />
                Remove Duplicates (numbers only output)
              </label>
              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input</label>
                  <button
                    onClick={onConvert}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Convert
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type or paste number words here (e.g., 'One thousand two hundred and thirty-four point five six')."
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-start justify-between md:gap-0 gap-4">
                  <label className="font-medium">Output</label>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end justify-start">
                    <button
                      onClick={onCopy}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Copy
                    </button>
                    <button
                      onClick={onUploadClick}
                      className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors"
                    >
                      Upload
                    </button>
                    <button
                      onClick={onDownload}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Download
                    </button>
                    <button
                      onClick={onClear}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordsToNumbers;
