"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ScaleTuple = [value: number, name: string];

const SCALES: ScaleTuple[] = [
  [1_000_000_000_000, "trillion"],
  [1_000_000_000, "billion"],
  [1_000_000, "million"],
  [1_000, "thousand"],
  [100, "hundred"],
];

const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function chunkToWords(
  n: number,
  opts: { hyphenate: boolean; useAnd: boolean }
): string {
  const parts: string[] = [];
  if (n >= 100) {
    const hundreds = Math.floor(n / 100);
    parts.push(`${ONES[hundreds]} hundred`);
    n = n % 100;
    if (n > 0 && opts.useAnd) parts.push("and");
  }
  if (n >= 20) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    if (ones > 0 && opts.hyphenate) {
      parts.push(`${TENS[tens]}-${ONES[ones]}`);
    } else if (ones > 0) {
      parts.push(`${TENS[tens]} ${ONES[ones]}`.trim());
    } else {
      parts.push(TENS[tens]);
    }
  } else if (n > 0 || parts.length === 0) {
    // parts.length === 0 handles n in [0..19] when there were no hundreds
    parts.push(ONES[n]);
  }
  return parts.filter(Boolean).join(" ");
}

function integerToWords(
  n: number,
  opts: { hyphenate: boolean; useAnd: boolean }
): string {
  if (n === 0) return ONES[0];
  const words: string[] = [];
  for (const [value, name] of SCALES) {
    if (n >= value) {
      if (value === 100) {
        // 100s handled in chunkToWords within thousands chunks below.
        // For n >= 100 and < 1000 this path won't trigger due to ordering.
      }
      const count = Math.floor(n / value);
      if (value >= 1000) {
        words.push(
          `${chunkToWords(count, opts)} ${name}`.trim()
        );
        n = n % value;
      } else if (value === 100) {
        // not used due to ordering
      }
    }
  }
  // Handle remainder under 1000
  const remainder = n % 1000;
  if (remainder > 0) words.push(chunkToWords(remainder, opts));
  return words.join(" ").replace(/\s+/g, " ").trim();
}

function numberToWords(
  input: string,
  opts: { hyphenate: boolean; useAnd: boolean; capitalize: boolean }
): string {
  // Normalize: remove commas from numeric strings for parsing
  const num = Number(input.replace(/,/g, ""));
  if (!isFinite(num)) return input; // fallback: not a number

  let signPrefix = "";
  let abs = Math.abs(num);

  if (num < 0) signPrefix = "minus ";

  const integerPart = Math.trunc(abs);
  const decimalPart = abs - integerPart;

  let words = integerToWords(integerPart, {
    hyphenate: opts.hyphenate,
    useAnd: opts.useAnd,
  });

  if (decimalPart > 0) {
    const decimals = String(abs.toFixed(20))
      .replace(/^(\d+)\./, "")
      .replace(/0+$/, "");
    if (decimals.length > 0) {
      const decimalWords = decimals
        .split("")
        .map((d) => ONES[Number(d)])
        .join(" ");
      words = `${words} point ${decimalWords}`;
    }
  }

  words = `${signPrefix}${words}`.trim();
  if (opts.capitalize) {
    words = words
      .split(/\s+/)
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
  }
  return words;
}

function convertNumbersToWordsInText(
  text: string,
  opts: { hyphenate: boolean; useAnd: boolean; capitalize: boolean }
): string {
  // Prefer matching full plain numbers first to avoid partial chunk matches like 100|000|000
  const numberRegex = /-?\d+(?:\.\d+)?|-?\d{1,3}(?:,\d{3})*(?:\.\d+)?/g;
  return text.replace(numberRegex, (match) => numberToWords(match, opts));
}

const NumbersToWordsConverter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoConvert, setAutoConvert] = useState(false);
  const [hyphenate, setHyphenate] = useState(true);
  const [useAnd, setUseAnd] = useState(true);
  const [capitalize, setCapitalize] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoConvert) return;
    const converted = convertNumbersToWordsInText(input, {
      hyphenate,
      useAnd,
      capitalize,
    });
    setOutput(converted);
  }, [input, autoConvert, hyphenate, useAnd, capitalize]);

  const onConvert = () => {
    const converted = convertNumbersToWordsInText(input, {
      hyphenate,
      useAnd,
      capitalize,
    });
    setOutput(converted);
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
    a.download = "numbers-to-words.txt";
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
                  checked={hyphenate}
                  onChange={(e) => setHyphenate(e.target.checked)}
                />
                Hyphenate Tens (e.g., twenty-one)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={useAnd}
                  onChange={(e) => setUseAnd(e.target.checked)}
                />
                Use &#34;and&#34; in hundreds
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={capitalize}
                  onChange={(e) => setCapitalize(e.target.checked)}
                />
                Capitalize Words
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

            <div className="grid md:grid-cols-2 gap-6">
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
                  placeholder="Type or paste numbers here (e.g., '-1,234.56 and 42')."
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

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

export default NumbersToWordsConverter;