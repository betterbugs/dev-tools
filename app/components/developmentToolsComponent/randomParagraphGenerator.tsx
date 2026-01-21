"use client";
import React, { useMemo, useState, useRef, useCallback } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const CONSONANTS = "bcdfghjklmnpqrstvwxyz".split("");
const VOWELS = "aeiou".split("");

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWord(minLen = 2, maxLen = 10): string {
  const length = randomInt(minLen, maxLen);
  const letters: string[] = [];
  let useVowel = Math.random() < 0.4; // start with vowel sometimes
  for (let i = 0; i < length; i++) {
    if (useVowel) {
      letters.push(VOWELS[randomInt(0, VOWELS.length - 1)]);
    } else {
      letters.push(CONSONANTS[randomInt(0, CONSONANTS.length - 1)]);
    }
    // Avoid long runs of same type
    useVowel = !useVowel || Math.random() < 0.3;
  }
  // Ensure at least one vowel for pronounceability
  if (!letters.some((l) => VOWELS.includes(l))) {
    letters[randomInt(0, letters.length - 1)] = VOWELS[randomInt(0, VOWELS.length - 1)];
  }
  return letters.join("");
}

function generateSentence(minWords: number, maxWords: number): string {
  const length = randomInt(minWords, maxWords);
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(generateWord(2, 10));
  }
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(
  sentencesPerParagraph: number,
  minWords: number,
  maxWords: number,
  startWithLorem: boolean
): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentencesPerParagraph; i++) {
    sentences.push(generateSentence(minWords, maxWords));
  }
  let paragraph = sentences.join(" ");
  if (startWithLorem && !paragraph.toLowerCase().startsWith("lorem ipsum")) {
    // Optionally prepend two generated words to mimic a leading phrase without static words
    const lead = `${generateWord(4, 6)} ${generateWord(4, 6)}`;
    paragraph =
      lead.charAt(0).toUpperCase() +
      lead.slice(1) +
      ". " +
      paragraph.charAt(0).toLowerCase() +
      paragraph.slice(1);
  }
  return paragraph;
}

const RandomParagraphGenerator = () => {
  const [paragraphs, setParagraphs] = useState<string>("3");
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState<string>("4");
  const [minWords, setMinWords] = useState<string>("6");
  const [maxWords, setMaxWords] = useState<string>("14");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [useAI, setUseAI] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Add ref for abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const output = useMemo(() => {
    const p = Math.max(1, Math.min(20, parseInt(paragraphs || "0", 10)));
    const s = Math.max(1, Math.min(15, parseInt(sentencesPerParagraph || "0", 10)));
    const minW = Math.max(2, Math.min(30, parseInt(minWords || "0", 10)));
    const maxW = Math.max(minW, Math.min(30, parseInt(maxWords || String(minW), 10)));
    return Array.from({ length: p })
      .map(() => generateParagraph(s, minW, maxW, startWithLorem))
      .join("\n\n");
  }, [paragraphs, sentencesPerParagraph, minWords, maxWords, startWithLorem]);

  const handleCopy = async () => {
    const textToCopy = useAI ? aiOutput : output;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (_) {}
  };

  const handleClear = () => {
    setParagraphs("3");
    setSentencesPerParagraph("4");
    setMinWords("6");
    setMaxWords("14");
    setStartWithLorem(true);
    setUseAI(false);
    setAiOutput("");
    setErrorMessage(null);
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
      const res = await fetch("/api/generate-paragraphs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "paragraphs",
          paragraphs: Math.max(1, Math.min(20, parseInt(paragraphs || "0", 10))),
          sentencesPerParagraph: Math.max(1, Math.min(15, parseInt(sentencesPerParagraph || "0", 10))),
          minWords: Math.max(2, Math.min(30, parseInt(minWords || "0", 10))),
          maxWords: Math.max(
            Math.max(2, Math.min(30, parseInt(minWords || "0", 10))),
            Math.min(30, parseInt(maxWords || String(minWords), 10))
          ),
          startWithLorem: startWithLorem,
          clientSeed: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
        }),
        signal: abortControllerRef.current.signal,
      });
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        throw new Error(err?.error || `Request failed with ${res.status}`);
      }
      
      const data = (await res.json()) as { text?: string };
      setAiOutput(data.text || "");
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
  }, [paragraphs, sentencesPerParagraph, minWords, maxWords, startWithLorem]);

  const handleStartWithLoremChange = (checked: boolean) => {
    if (checked) {
      setStartWithLorem(true);
      setUseAI(false); // Disable AI when Lorem ipsum is selected
    } else {
      // If unchecking Lorem ipsum, automatically select AI
      setStartWithLorem(false);
      setUseAI(true);
    }
  };

  const handleAIChange = (checked: boolean) => {
    if (checked) {
      setUseAI(true);
      setStartWithLorem(false); // Disable Lorem ipsum when AI is selected
    } else {
      // If unchecking AI, automatically select Lorem ipsum
      setUseAI(false);
      setStartWithLorem(true);
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <section className="md:py-[30px] py-[50px]">
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-16 md:my-5 mt-2">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                  <h3 className="text-lg font-medium mb-2">Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Paragraphs</label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={paragraphs}
                        onChange={(e) => setParagraphs(e.target.value)}
                        className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-3 rounded-xl`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Sentences / paragraph</label>
                      <input
                        type="number"
                        min={1}
                        max={15}
                        value={sentencesPerParagraph}
                        onChange={(e) => setSentencesPerParagraph(e.target.value)}
                        className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-3 rounded-xl`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Min words / sentence</label>
                      <input
                        type="number"
                        min={2}
                        max={30}
                        value={minWords}
                        onChange={(e) => setMinWords(e.target.value)}
                        className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-3 rounded-xl`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Max words / sentence</label>
                      <input
                        type="number"
                        min={2}
                        max={30}
                        value={maxWords}
                        onChange={(e) => setMaxWords(e.target.value)}
                        className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-3 rounded-xl`}
                      />
                                          </div>
                    <div className="col-span-2 mb-2">
                      <p className="text-xs text-white/60 text-center">Choose one generation mode:</p>
                    </div>
                    <label className="inline-flex items-center col-span-2 text-white/80 mt-1">
                      <input
                        type="checkbox"
                        checked={startWithLorem}
                        onChange={(e) => handleStartWithLoremChange(e.target.checked)}
                        className="peer hidden"

                      />
                      <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-1">
                          ✔
                        </span>
                      </div>
                      <span className="ml-2">
                        Start with &#34;Lorem ipsum&#34; (Random mode only)
                      </span>
                    </label>
                    <label className="inline-flex items-center col-span-2 text-white/80 mt-1">
                      <input
                        type="checkbox"
                        checked={useAI}
                        onChange={(e) => handleAIChange(e.target.checked)}
                        className="peer hidden"
                      />
                      <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-1">
                          ✔
                        </span>
                      </div>
                      <span className="ml-2">Use AI (Meaningful English)</span>
                    </label>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 mt-2 lg:mt-0">
                  <h3 className="text-lg font-medium mb-2">Output</h3>
                  <div className="relative">
                    <textarea
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      value={useAI ? (isLoading ? "Generating..." : aiOutput) : output}
                      readOnly
                      placeholder="Generated paragraphs will appear here..."
                    ></textarea>
                    {errorMessage && (
                      <div className="mt-2 text-red-400 text-sm">{errorMessage}</div>
                    )}
                    {(output || aiOutput) && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        title="Copy"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
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

              <div className="mt-6 flex justify-center items-center gap-4">
                <button
                  onClick={() => {
                    if (useAI) {
                      handleGenerateAI();
                    } else {
                      // trigger recompute by touching state (noop pattern)
                      setParagraphs((v) => v);
                    }
                  }}
                  className={`${DevelopmentToolsStyles.converterButton} w-[180px] text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)]`}
                  disabled={isLoading}
                >
                  {useAI ? (isLoading ? "Generating..." : "Generate") : "Generate"}
                </button>
                {isLoading && (
                  <button
                    onClick={() => abortControllerRef.current?.abort()}
                    className={`${DevelopmentToolsStyles.clearButton} w-[180px] text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)]`}
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleClear}
                  className={`${DevelopmentToolsStyles.clearButton} w-[180px] text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)]`}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomParagraphGenerator;
