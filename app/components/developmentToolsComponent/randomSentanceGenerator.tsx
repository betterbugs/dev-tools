"use client";
import React, { useMemo, useState, useRef, useCallback } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type Separator = "newline" | "paragraph";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const VOWELS = "aeiou";
const COMMON_PUNCT: any = [".", "!", "?"];

const RandomSentanceGenerator = () => {
  const [count, setCount] = useState<number>(5);
  const [minWords, setMinWords] = useState<number>(6);
  const [maxWords, setMaxWords] = useState<number>(14);
  const [capitalize, setCapitalize] = useState<boolean>(true);
  const [separator, setSeparator] = useState<Separator>("newline");
  const [output, setOutput] = useState<string>("");
  const [useAI, setUseAI] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Add ref for abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const consonants = useMemo(
    () =>
      LETTERS.split("")
        .filter((c) => !VOWELS.includes(c))
        .join(""),
    []
  );

  const pick = (s: string) => s[Math.floor(Math.random() * s.length)];

  const randomWord = (len: number) => {
    let word = "";
    let useConsonant = Math.random() > 0.5;
    for (let i = 0; i < len; i++) {
      word += useConsonant ? pick(consonants) : pick(VOWELS);
      useConsonant = !useConsonant;
    }
    return word;
  };

  const randomSentence = (minW: number, maxW: number) => {
    const numWords = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
    const words: string[] = [];
    for (let i = 0; i < numWords; i++) {
      const len = Math.floor(Math.random() * 7) + 2; // word length 2-8
      words.push(randomWord(len));
    }
    if (capitalize && words.length) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    return words.join(" ") + pick(COMMON_PUNCT);
  };

  const generate = () => {
    const minW = Math.max(1, Math.min(minWords, maxWords));
    const maxW = Math.max(minW, maxWords);
    const n = Math.min(200, Math.max(1, count));
    const sentences: string[] = [];
    for (let i = 0; i < n; i++) sentences.push(randomSentence(minW, maxW));
    setOutput(sentences.join("\n"));
  };

  const clearAll = () => {
    setOutput("");
    setAiOutput("");
    setErrorMessage(null);
  };

  const copyAll = async () => {
    const textToCopy = useAI ? aiOutput : output;
    if (!textToCopy) return;
    const items = textToCopy.split(/\r?\n/).filter(Boolean);
    const sep = separator === "paragraph" ? "\n\n" : "\n";
    const text = items.join(sep);
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {}
  };

  const handleGenerateAI = useCallback(async () => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsLoading(true);
    setErrorMessage(null);
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    try {
      // Apply the same validation logic as random generation
      const validatedCount = Math.min(100, Math.max(1, count));
      const validatedMinWords = Math.max(2, Math.min(30, minWords));
      const validatedMaxWords = Math.max(validatedMinWords, Math.min(30, maxWords));
      
      // Add client-side randomization for maximum variety
      const clientRandomSeed = Math.random().toString(36).substring(7);
      const timestamp = Date.now();
      
      const res = await fetch("/api/generate-paragraphs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sentences",
          count: validatedCount,
          minWords: validatedMinWords,
          maxWords: validatedMaxWords,
          clientSeed: clientRandomSeed,
          timestamp: timestamp,
        }),
        signal: abortControllerRef.current.signal,
      });
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        throw new Error(err?.error || `Request failed with ${res.status}`);
      }
      
      const data = (await res.json()) as { text?: string };
      let aiText = data.text || "";
      
      // Apply capitalization if enabled
      if (capitalize && aiText) {
        const sentences = aiText.split('\n').map(sentence => {
          const trimmed = sentence.trim();
          if (trimmed.length > 0) {
            return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
          }
          return trimmed;
        });
        aiText = sentences.join('\n');
      }
      
      setAiOutput(aiText);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setErrorMessage("Request cancelled");
      } else {
        setErrorMessage(err?.message || "Failed to generate text");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [count, minWords, maxWords, capitalize]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
                    <label className="block text-sm mb-2">Min words</label>
                    <input
                      type="number"
                      min={1}
                      value={minWords}
                      onChange={(e) =>
                        setMinWords(Math.max(1, Number(e.target.value)))
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Max words</label>
                    <input
                      type="number"
                      min={1}
                      value={maxWords}
                      onChange={(e) =>
                        setMaxWords(Math.max(1, Number(e.target.value)))
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
                      <option value="paragraph">Blank line</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={capitalize}
                      onChange={(e) => setCapitalize(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Capitalize first word</span>
                  </label>

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
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                    disabled={isLoading}
                  >
                    {useAI ? (isLoading ? "Generating..." : "Generate") : "Generate"}
                  </button>
                  {isLoading && (
                    <button
                      onClick={() => abortControllerRef.current?.abort()}
                      className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Sentences</h3>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={useAI ? (isLoading ? "Generating..." : aiOutput) : output}
                      placeholder="Generated sentences will appear here..."
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                    ></textarea>
                    {errorMessage && (
                      <div className="mt-2 text-red-400 text-sm">{errorMessage}</div>
                    )}
                    {(output || aiOutput) && (
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

export default RandomSentanceGenerator;
