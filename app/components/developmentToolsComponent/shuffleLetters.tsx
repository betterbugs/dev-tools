"use client";

import React, { useMemo, useState } from "react";

type Mode = "letters-in-words" | "all-characters" | "word-order";

function createSeededRng(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleArray<T>(arr: T[], rng: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ShuffleLetters = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("letters-in-words");
  const [preservePunct, setPreservePunct] = useState(true);
  const [seed, setSeed] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>("\n");
  const [trim, setTrim] = useState<boolean>(true);

  const rng = useMemo(() => (seed ? createSeededRng(seed) : Math.random), [seed]);

  const shuffleWordLetters = (word: string): string => {
    if (!preservePunct) {
      return shuffleArray(word.split(""), rng).join("");
    }
    // Preserve non-letters in place, shuffle only letters
    const isLetter = (ch: string) => /[A-Za-z]/.test(ch);
    const letters: string[] = [];
    const positions: number[] = [];
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (isLetter(ch)) {
        letters.push(ch);
        positions.push(i);
      }
    }
    const shuffled = shuffleArray(letters, rng);
    const result = word.split("");
    positions.forEach((pos, idx) => {
      result[pos] = shuffled[idx];
    });
    return result.join("");
  };

  const output = useMemo(() => {
    let text = input;
    if (trim) text = text.trim();
    let delim = delimiter;
    if (delim === "\\n") delim = "\n";
    if (delim === "\\t") delim = "\t";

    if (mode === "word-order") {
      // Shuffle words per line
      return text
        .split("\n")
        .map((line) => {
          const words = line.split(/(\s+)/); // keep spaces
          const onlyWords = words.filter((w) => !/\s+/.test(w));
          const shuffledWords = shuffleArray(onlyWords, rng);
          let wi = 0;
          return words
            .map((token) => (/\s+/.test(token) ? token : shuffledWords[wi++]))
            .join("");
        })
        .join("\n");
    }

    if (mode === "all-characters") {
      const chars = text.split("");
      return shuffleArray(chars, rng).join("");
    }

    // letters-in-words
    return text
      .split(delim)
      .map((segment) =>
        segment
          .split(/(\b)/) // split by word boundaries but keep them
          .map((token) => (/^\w+$/.test(token) ? shuffleWordLetters(token) : token))
          .join("")
      )
      .join(delim);
  }, [input, mode, preservePunct, seed, delimiter, trim, rng]);

  const stats = useMemo(() => ({ lines: output ? output.split(/\r?\n/).length : 0, chars: output.length }), [output]);

  const copy = () => navigator.clipboard.writeText(output);
  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shuffled.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result || ""));
    reader.readAsText(file);
  };

  const clearAll = () => {
    setInput("");
    setMode("letters-in-words");
    setPreservePunct(true);
    setSeed("");
    setDelimiter("\n");
    setTrim(true);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Text</h2>
                  <div className="flex gap-2">
                    <input id="shuffle-upload" type="file" accept=".txt,.md,.log" className="hidden" onChange={handleUpload} />
                    <label htmlFor="shuffle-upload" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Options</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm">Mode</label>
                    <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm">
                      <option value="letters-in-words">Shuffle letters in words</option>
                      <option value="all-characters">Shuffle all characters</option>
                      <option value="word-order">Shuffle word order</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Delimiter</label>
                    <input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} placeholder="\n, , |, \t" className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Seed (optional)</label>
                    <input value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Repeatable results" className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input id="punct" type="checkbox" className="accent-primary" checked={preservePunct} onChange={(e) => setPreservePunct(e.target.checked)} />
                    <label htmlFor="punct" className="text-sm">Preserve punctuation</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="trim" type="checkbox" className="accent-primary" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
                    <label htmlFor="trim" className="text-sm">Trim</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-white/10 pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Preview</h2>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-black/20 px-3 py-1 rounded">
                    <span className="text-blue-400 font-semibold">{stats.lines}</span>
                    <span className="ml-1 text-gray-300">lines</span>
                  </div>
                  <div className="bg-black/20 px-3 py-1 rounded">
                    <span className="text-purple-400 font-semibold">{stats.chars}</span>
                    <span className="ml-1 text-gray-300">chars</span>
                  </div>
                </div>
              </div>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">{output}</pre>
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-center gap-3">
                <button onClick={copy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
                <button onClick={download} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
                <button onClick={clearAll} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShuffleLetters;