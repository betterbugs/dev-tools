"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type Separator = "newline" | "comma" | "space";

const toTwo = (n: number) => String(n).padStart(2, "0");

const RandomClockTimeGenerator = () => {
  const [count, setCount] = useState<number>(10);
  const [use24h, setUse24h] = useState<boolean>(true);
  const [includeSeconds, setIncludeSeconds] = useState<boolean>(false);
  const [separator, setSeparator] = useState<Separator>("newline");
  const [output, setOutput] = useState<string>("");

  const randomTime = () => {
    if (use24h) {
      const h = Math.floor(Math.random() * 24);
      const m = Math.floor(Math.random() * 60);
      const s = Math.floor(Math.random() * 60);
      const core = `${toTwo(h)}:${toTwo(m)}`;
      return includeSeconds ? `${core}:${toTwo(s)}` : core;
    }
    // 12h with AM/PM
    let h = Math.floor(Math.random() * 12) + 1; // 1-12
    const m = Math.floor(Math.random() * 60);
    const s = Math.floor(Math.random() * 60);
    const period = Math.random() < 0.5 ? "AM" : "PM";
    const core = `${toTwo(h)}:${toTwo(m)} ${period}`;
    return includeSeconds
      ? `${toTwo(h)}:${toTwo(m)}:${toTwo(s)} ${period}`
      : core;
  };

  const generate = () => {
    const n = Math.min(500, Math.max(1, count));
    const items: string[] = [];
    for (let i = 0; i < n; i++) items.push(randomTime());
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
                  <div>
                    <label className="block text-sm mb-2">Clock format</label>
                    <div className="flex items-center h-[54px] gap-4">
                      <label className="inline-flex items-center text-white/80">
                        <input
                          type="checkbox"
                          checked={use24h}
                          onChange={(e) => setUse24h(e.target.checked)}
                          className="peer hidden"
                        />
                        <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                            ✔
                          </span>
                        </div>
                        <span className="ml-2">Use 24-hour</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Include seconds
                    </label>
                    <div className="flex items-center h-[54px]">
                      <label className="inline-flex items-center text-white/80">
                        <input
                          type="checkbox"
                          checked={includeSeconds}
                          onChange={(e) => setIncludeSeconds(e.target.checked)}
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

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={generate}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Generate
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Times</h3>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated times will appear here..."
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

export default RandomClockTimeGenerator;
