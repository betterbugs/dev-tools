"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Charset = {
  upper: boolean;
  lower: boolean;
  digits: boolean;
  symbols: boolean;
};

function buildAlphabet(cs: Charset): string {
  let a = "";
  if (cs.upper) a += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (cs.lower) a += "abcdefghijklmnopqrstuvwxyz";
  if (cs.digits) a += "0123456789";
  if (cs.symbols) a += "!@#$%^&*()-_=+[]{}:,.?/";
  return a;
}

function getCrypto(): Crypto | null {
  try {
    return crypto as unknown as Crypto;
  } catch {
    return null;
  }
}

function randomInt(maxExclusive: number): number {
  const c = getCrypto();
  if (c && typeof (c as any).getRandomValues === "function") {
    const arr = new Uint32Array(1);
    (c as any).getRandomValues(arr);
    return arr[0] % maxExclusive;
  }
  return Math.floor(Math.random() * maxExclusive);
}

function generateKey(
  length: number,
  cs: Charset,
  opts: { groupSize: number | null; prefix?: string; suffix?: string }
): string {
  const alphabet = buildAlphabet(cs);
  if (!alphabet) return "";
  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    const idx = randomInt(alphabet.length);
    chars.push(alphabet[idx]);
  }
  let core = chars.join("");
  if (opts.groupSize && opts.groupSize > 0) {
    const g = opts.groupSize;
    const out: string[] = [];
    for (let i = 0; i < core.length; i += g) out.push(core.slice(i, i + g));
    core = out.join("-");
  }
  if (opts.prefix) core = `${opts.prefix}${core}`;
  if (opts.suffix) core = `${core}${opts.suffix}`;
  return core;
}

const ApiKeyGenerator: React.FC = () => {
  const [length, setLength] = useState(32);
  const [count, setCount] = useState(1);
  const [groupSize, setGroupSize] = useState<number | null>(4);
  const [charset, setCharset] = useState<Charset>({ upper: true, lower: true, digits: true, symbols: false });
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [keys, setKeys] = useState<string[]>([]);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const run = useCallback(() => {
    const clampedLen = Math.max(4, Math.min(256, Number(length) || 32));
    const clampedCount = Math.max(1, Math.min(100, Number(count) || 1));
    const gSize = groupSize && groupSize > 0 ? Math.max(1, Math.min(32, Number(groupSize) || 0)) : null;
    const out: string[] = [];
    for (let i = 0; i < clampedCount; i++) out.push(generateKey(clampedLen, charset, { groupSize: gSize, prefix, suffix }));
    setKeys(out);
  }, [length, count, groupSize, charset, prefix, suffix]);

  useEffect(() => {
    if (!autoUpdate) return;
    run();
  }, [run, autoUpdate]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(keys.join("\n"));
    } catch {}
  };

  const onDownload = () => {
    const blob = new Blob([keys.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "api-keys.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onClear = () => setKeys([]);
  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = String(ev.target?.result ?? "").split(/\r?\n/).filter(Boolean);
      setKeys(lines);
    };
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
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                />
                Auto Update
              </label>

              <div className="flex items-center gap-2">
                <span>Length:</span>
                <input
                  type="number"
                  min={4}
                  max={256}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value) || 32)}
                  className="w-24 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>Count:</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value) || 1)}
                  className="w-20 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>Group:</span>
                <input
                  type="number"
                  min={0}
                  max={32}
                  value={groupSize ?? 0}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    setGroupSize(v > 0 ? v : null);
                  }}
                  className="w-20 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={charset.upper}
                  onChange={(e) => setCharset({ ...charset, upper: e.target.checked })}
                />
                A–Z
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={charset.lower}
                  onChange={(e) => setCharset({ ...charset, lower: e.target.checked })}
                />
                a–z
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={charset.digits}
                  onChange={(e) => setCharset({ ...charset, digits: e.target.checked })}
                />
                0–9
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={charset.symbols}
                  onChange={(e) => setCharset({ ...charset, symbols: e.target.checked })}
                />
                Symbols
              </label>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="Prefix (optional)"
                  className="flex-1 md:w-48 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
                <input
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder="Suffix (optional)"
                  className="flex-1 md:w-48 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

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
                  <label className="font-medium">Generator</label>
                  <button
                    onClick={run}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Generate
                  </button>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/20 text-xs md:text-sm whitespace-pre-wrap">
                  <div className="text-white/70">Preview</div>
                  <div className="mt-2 font-mono break-all">
                    {keys[0] || "(no keys yet)"}
                  </div>
                </div>
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
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-48 sm:h-56 md:h-64">
                  {keys.join("\n")}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyGenerator;


