"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type Separator = "newline" | "comma" | "space";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const VOWELS = "aeiou";
const NUMBERS = "0123456789";

const RandomWordGenerator = () => {
  const [count, setCount] = useState<number>(10);
  const [minLen, setMinLen] = useState<number>(3);
  const [maxLen, setMaxLen] = useState<number>(8);
  const [allowUppercase, setAllowUppercase] = useState<boolean>(false);
  const [allowNumbers, setAllowNumbers] = useState<boolean>(false);
  const [separator, setSeparator] = useState<Separator>("newline");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [useAI, setUseAI] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const consonants = useMemo(
    () =>
      LETTERS.split("")
        .filter((c) => !VOWELS.includes(c))
        .join(""),
    []
  );

  const pick = (s: string) => s[Math.floor(Math.random() * s.length)];

  const randomWord = (len: number) => {
    // simple alternating consonant/vowel pattern for pronounceable words
    let word = "";
    let useConsonant = Math.random() > 0.5;
    for (let i = 0; i < len; i++) {
      if (allowNumbers && Math.random() < 0.08 && i !== 0) {
        word += pick(NUMBERS);
        continue;
      }
      word += useConsonant ? pick(consonants) : pick(VOWELS);
      useConsonant = !useConsonant;
    }
    if (allowUppercase && Math.random() < 0.5) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  };

  const generate = async () => {
    const minL = Math.max(1, Math.min(minLen, maxLen));
    const maxL = Math.max(minL, maxLen);
    const n = Math.min(500, Math.max(1, count));

    // Pseudo-word mode
    const items: string[] = [];
    for (let i = 0; i < n; i++) {
      const len = Math.floor(Math.random() * (maxL - minL + 1)) + minL;
      items.push(randomWord(len));
    }
    setOutput(items.join("\n"));
  };

  const clearAll = () => setOutput("");

  const copyAll = async () => {
    if (!output) return;
    const items = output.split(/\r?\n/).filter(Boolean);
    const sep =
      separator === "comma" ? ", " : separator === "space" ? " " : "\n";
    const text = items.join(sep);
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {}
  };

  const handleGenerateAI = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generate-paragraphs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "words",
          count: Math.min(500, Math.max(1, count)),
          minLen: Math.max(1, Math.min(minLen, maxLen)),
          maxLen: Math.max(minLen, maxLen),
          allowUppercase: allowUppercase,
          allowNumbers: allowNumbers,
          useDictionary: false, // Always false for AI generation
          clientSeed: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const words = data.text
        .split("\n")
        .map((line: string) => line.trim())
        .filter(Boolean);

      setOutput(words.join("\n"));
    } catch (error) {
      setError("Failed to generate AI words. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                    <label className="block text-sm mb-2">Count</label>
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={count}
                      onChange={(e) =>
                        setCount(
                          Math.min(500, Math.max(1, Number(e.target.value)))
                        )
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Min length</label>
                    <input
                      type="number"
                      min={1}
                      value={minLen}
                      onChange={(e) =>
                        setMinLen(Math.max(1, Number(e.target.value)))
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Max length</label>
                    <input
                      type="number"
                      min={1}
                      value={maxLen}
                      onChange={(e) =>
                        setMaxLen(Math.max(1, Number(e.target.value)))
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Copy separator</label>
                    <select
                      value={separator}
                      onChange={(e) =>
                        setSeparator(e.target.value as Separator)
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    >
                      <option value="newline">New line</option>
                      <option value="comma">Comma</option>
                      <option value="space">Space</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={allowUppercase}
                      onChange={(e) => setAllowUppercase(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Start with uppercase sometimes</span>
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
                    <span className="ml-2">Allow digits</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={useAI}
                      onChange={(e) => setUseAI(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Use AI (Meaningful English)</span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (useAI) {
                        handleGenerateAI();
                      } else {
                        generate();
                      }
                    }}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 text-sm rounded-lg`}
                    disabled={isLoading}
                  >
                    {useAI ? (isLoading ? "Generating..." : "Generate") : "Generate"}
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
                  <h3 className="text-lg font-medium mb-2">Words</h3>
                  {error && (
                    <div className="mb-2 text-sm text-red-400">{error}</div>
                  )}
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated words will appear here..."
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

export default RandomWordGenerator;
