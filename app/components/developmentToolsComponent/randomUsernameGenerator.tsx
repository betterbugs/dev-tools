"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const EXTRA = "._"; // dot and underscore commonly allowed

// Algorithmic pronounceable word generator (no static word lists)
const VOWELS = "aeiou";
const CONSONANTS = "bcdfghjklmnpqrstvwxyz";
const COMMON_CLUSTERS = [
  "br",
  "cr",
  "dr",
  "fr",
  "gr",
  "pr",
  "tr",
  "bl",
  "cl",
  "fl",
  "gl",
  "pl",
  "sl",
  "sc",
  "sk",
  "sm",
  "sn",
  "sp",
  "st",
  "sw",
];
const COMMON_ENDINGS = ["on", "en", "er", "or", "an", "us", "ia", "ix", "um", "ix", "ox"];

// Embedded word lists as reliable fallback
const FALLBACK_ADJECTIVES = [
  "quick", "brave", "calm", "bright", "swift", "bold", "wise", "cool", "sharp", "smart",
  "fast", "deep", "pure", "wild", "free", "clear", "dark", "light", "soft", "hard",
  "warm", "cold", "hot", "new", "old", "young", "big", "small", "tall", "short",
  "strong", "weak", "thick", "thin", "wide", "narrow", "high", "low", "long", "round",
  "smooth", "rough", "clean", "dirty", "fresh", "stale", "sweet", "sour", "loud", "quiet",
  "happy", "sad", "angry", "kind", "cruel", "gentle", "harsh", "mild", "fierce", "tame",
  "silent", "noisy", "still", "active", "lazy", "busy", "calm", "stormy", "peaceful", "chaotic",
  "simple", "complex", "easy", "hard", "soft", "firm", "solid", "liquid", "hollow", "full",
  "empty", "crowded", "sparse", "dense", "loose", "tight", "open", "closed", "public", "private",
  "safe", "dangerous", "secure", "risky", "stable", "unstable", "steady", "shaky", "firm", "wobbly",
  "sharp", "dull", "keen", "blunt", "bright", "dim", "shiny", "dull", "glossy", "matte"
];

const FALLBACK_NOUNS = [
  "fox", "wolf", "eagle", "hawk", "lion", "tiger", "bear", "deer", "elk", "moose",
  "bird", "fish", "shark", "whale", "dolphin", "seal", "otter", "beaver", "rabbit", "hare",
  "cat", "dog", "horse", "cow", "sheep", "goat", "pig", "chicken", "duck", "goose",
  "storm", "wind", "rain", "snow", "ice", "fire", "water", "earth", "rock", "stone",
  "tree", "leaf", "flower", "grass", "moss", "fern", "bush", "vine", "root", "branch",
  "mountain", "hill", "valley", "river", "lake", "ocean", "sea", "island", "beach", "shore",
  "star", "moon", "sun", "planet", "comet", "galaxy", "nebula", "cosmos", "space", "void",
  "sword", "shield", "bow", "arrow", "spear", "axe", "hammer", "knife", "blade", "dagger",
  "knight", "warrior", "ranger", "hunter", "scout", "guard", "paladin", "rogue", "mage", "wizard",
  "dragon", "phoenix", "griffin", "unicorn", "serpent", "basilisk", "kraken", "titan", "giant", "dwarf",
  "shadow", "light", "dark", "dawn", "dusk", "night", "day", "morning", "evening", "noon",
  "forest", "woods", "jungle", "desert", "tundra", "plains", "meadow", "field", "grove", "glade",
  "cave", "tunnel", "canyon", "gorge", "cliff", "peak", "ridge", "summit", "base", "foothill"
];

const RandomUsernameGenerator = () => {
  const [length, setLength] = useState<number>(12);
  const [count, setCount] = useState<number>(5);
  const [allowNumbers, setAllowNumbers] = useState<boolean>(true);
  const [allowExtra, setAllowExtra] = useState<boolean>(true);
  const [startWithLetter, setStartWithLetter] = useState<boolean>(true);
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [meaningful, setMeaningful] = useState<boolean>(true);
  const [caseStyle, setCaseStyle] = useState<"lower" | "camel" | "kebab" | "snake">("lower");
  const [output, setOutput] = useState<string>("");
  const [dictAdj, setDictAdj] = useState<string[]>(FALLBACK_ADJECTIVES);
  const [dictNouns, setDictNouns] = useState<string[]>(FALLBACK_NOUNS);
  const [loadingDict, setLoadingDict] = useState<boolean>(false);

  const allowedChars = useMemo(() => {
    let s = LETTERS;
    s += LETTERS.toUpperCase();
    if (allowNumbers) s += NUMBERS;
    if (allowExtra) s += EXTRA;
    return s;
  }, [allowNumbers, allowExtra]);

  function pick(source: string): string;
  function pick<T>(source: T[]): T;
  function pick(source: any) {
    return source[Math.floor(Math.random() * source.length)];
  }

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateSyllable = () => {
    const useCluster = Math.random() < 0.35;
    const onset = useCluster ? pick(COMMON_CLUSTERS) : pick(CONSONANTS);
    const nucleus = pick(VOWELS);
    const coda = Math.random() < 0.4 ? pick(CONSONANTS) : "";
    return onset + nucleus + coda;
  };

  const generateWord = (minSyll = 1, maxSyll = 3) => {
    const syllables = rand(minSyll, maxSyll);
    let w = "";
    for (let i = 0; i < syllables; i++) w += generateSyllable();
    if (Math.random() < 0.3) w += pick(COMMON_ENDINGS);
    return w;
  };

  const toStyle = (a: string, b: string) => {
    switch (caseStyle) {
      case "camel":
        return (
          a.toLowerCase() + b.charAt(0).toUpperCase() + b.slice(1).toLowerCase()
        );
      case "kebab":
        return `${a.toLowerCase()}-${b.toLowerCase()}`;
      case "snake":
        return `${a.toLowerCase()}_${b.toLowerCase()}`;
      default:
        return `${a.toLowerCase()}${allowExtra ? "_" : ""}${b.toLowerCase()}`;
    }
  };

  const buildMeaningful = () => {
    // Always use real words - never pseudo-words
    const adjList = dictAdj.length > 0 ? dictAdj : FALLBACK_ADJECTIVES;
    const nounList = dictNouns.length > 0 ? dictNouns : FALLBACK_NOUNS;
    
    const first = pick(adjList);
    const second = pick(nounList);
    let base = toStyle(first, second);
    
    if (allowNumbers) {
      // 50% chance to append a short number suffix
      if (Math.random() < 0.5) base += String(Math.floor(Math.random() * 90) + 10);
    }
    
    let candidate = `${prefix}${base}${suffix}`;
    
    // Enforce length by trimming from the end (keeps meaning mostly intact)
    if (candidate.length > length) candidate = candidate.slice(0, length);
    
    if (startWithLetter) {
      const firstChar = candidate.charAt(0);
      if (!/[a-zA-Z]/.test(firstChar)) {
        candidate = `a${candidate}`.slice(0, length);
      }
    }
    
    return candidate;
  };

  const buildOne = () => {
    if (meaningful) return buildMeaningful();
    const minCore = Math.max(1, length - (prefix.length + suffix.length));
    let result = "";
    if (startWithLetter) {
      const letters = LETTERS + LETTERS.toUpperCase();
      result += pick(letters);
    } else {
      result += pick(allowedChars);
    }
    while (result.length < minCore) {
      result += pick(allowedChars);
    }
    return `${prefix}${result}${suffix}`.slice(0, length);
  };

  const ensureDictionary = async () => {
    // If we already have words (from fallback or previous API call), try to enrich with API
    if (dictAdj.length > 0 && dictNouns.length > 0 && dictAdj.length > FALLBACK_ADJECTIVES.length) return;
    
    setLoadingDict(true);
    
    try {
      // Try to fetch more words from API to enrich the dictionary
      const [adjRes, nounRes] = await Promise.all([
        fetch("https://random-word-form.herokuapp.com/random/adjective?count=200", { cache: "no-store" }).catch(() => null),
        fetch("https://random-word-form.herokuapp.com/random/noun?count=200", { cache: "no-store" }).catch(() => null),
      ]);
      
      if (adjRes?.ok) {
        const a = (await adjRes.json()) as string[];
        if (Array.isArray(a) && a.length > 0) {
          const filtered = a.filter((w) => /^[a-z]+$/i.test(w));
          if (filtered.length > 0) {
            // Merge with existing, removing duplicates
            const combined = Array.from(new Set([...dictAdj, ...filtered]));
            setDictAdj(combined);
          }
        }
      }
      
      if (nounRes?.ok) {
        const n = (await nounRes.json()) as string[];
        if (Array.isArray(n) && n.length > 0) {
          const filtered = n.filter((w) => /^[a-z]+$/i.test(w));
          if (filtered.length > 0) {
            // Merge with existing, removing duplicates
            const combined = Array.from(new Set([...dictNouns, ...filtered]));
            setDictNouns(combined);
          }
        }
      }
    } catch (error) {
      // Fallback lists are already initialized, so we can continue
      console.log("API fetch failed, using fallback word lists");
    }
    
    setLoadingDict(false);
  };

  const generate = async () => {
    if (meaningful) {
      // Try to enrich dictionary from API (fallback lists are already loaded)
      await ensureDictionary();
    }
    const list: string[] = [];
    const n = Math.min(200, Math.max(1, count));
    for (let i = 0; i < n; i++) list.push(buildOne());
    setOutput(list.join("\n"));
  };

  const clearAll = () => setOutput("");

  const copyAll = async () => {
    if (!output) return;
    const items = output.split(/\r?\n/).filter(Boolean);
    const text = items.length > 1 ? items.join(", ") : output;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {}
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Username length
                    </label>
                    <input
                      type="number"
                      min={3}
                      max={40}
                      value={length}
                      onChange={(e) =>
                        setLength(
                          Math.min(40, Math.max(3, Number(e.target.value)))
                        )
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Count</label>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={count}
                      onChange={(e) =>
                        setCount(
                          Math.min(200, Math.max(1, Number(e.target.value)))
                        )
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Case style</label>
                    <select
                      value={caseStyle}
                      onChange={(e) => setCaseStyle(e.target.value as any)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    >
                      <option value="lower">lower + sep</option>
                      <option value="camel">camelCase</option>
                      <option value="kebab">kebab-case</option>
                      <option value="snake">snake_case</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Start with letter
                    </label>
                    <div className="flex items-center h-[54px]">
                      <label className="inline-flex items-center text-white/80">
                        <input
                          type="checkbox"
                          checked={startWithLetter}
                          onChange={(e) => setStartWithLetter(e.target.checked)}
                          className="peer hidden"
                        />
                        <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                            ✔
                          </span>
                        </div>
                        <span className="ml-2">Enable</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Prefix (optional)
                    </label>
                    <input
                      type="text"
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      placeholder="dev_"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Suffix (optional)
                    </label>
                    <input
                      type="text"
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      placeholder="_01"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-4 md:flex-row flex-col">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={meaningful}
                      onChange={(e) => setMeaningful(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Meaningful (adjective + noun)</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={allowNumbers}
                      onChange={(e) => setAllowNumbers(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Allow numbers (0-9)</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={allowExtra}
                      onChange={(e) => setAllowExtra(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Allow dot/underscore (._)</span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={generate}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 text-sm rounded-lg`}
                  >
                    Generate
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 text-sm rounded-lg`}
                  >
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Usernames</h3>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated usernames will appear here..."
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                    ></textarea>
                    {output && (
                      <button
                        type="button"
                        onClick={copyAll}
                        title="Copy"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-white"
                        >
                          <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                          <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomUsernameGenerator;
