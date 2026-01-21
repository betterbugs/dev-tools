"use client";
import React, { useMemo, useState, useRef } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type OutputFormat = "iso" | "locale" | "unix";

const RandomDateGenerator = () => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  const [startDate, setStartDate] = useState<string>(
    lastYear.toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState<string>(
    today.toISOString().slice(0, 10)
  );
  const [count, setCount] = useState<number>(1);
  const [includeTime, setIncludeTime] = useState<boolean>(false);
  const [format, setFormat] = useState<OutputFormat>("iso");
  const [output, setOutput] = useState<string>("");

  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
    const el = ref.current;
    if (!el) return;
    // @ts-ignore - showPicker is supported in modern Chromium
    if (typeof el.showPicker === "function") {
      // @ts-ignore
      el.showPicker();
    } else {
      el.focus();
      el.click();
    }
  };

  const isRangeValid = useMemo(
    () => new Date(startDate) <= new Date(endDate),
    [startDate, endDate]
  );

  const generate = () => {
    if (!isRangeValid || count <= 0) {
      setOutput("");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMs = start.getTime();
    const endMs = includeTime
      ? end.getTime() + (24 * 60 * 60 * 1000 - 1)
      : end.getTime();

    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      const rnd = Math.floor(Math.random() * (endMs - startMs + 1)) + startMs;
      const d = new Date(rnd);
      if (!includeTime) {
        d.setHours(0, 0, 0, 0);
      }
      let s = "";
      if (format === "iso") {
        s = includeTime ? d.toISOString() : d.toISOString().slice(0, 10);
      } else if (format === "locale") {
        s = includeTime ? d.toLocaleString() : d.toLocaleDateString();
      } else {
        s = Math.floor(d.getTime() / 1000).toString();
      }
      results.push(s);
    }
    setOutput(results.join("\n"));
  };

  const clearAll = () => {
    setOutput("");
  };

  const copyAll = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[900px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Start date</label>
                    <div className="relative">
                      <input
                        ref={startInputRef}
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 pr-12 rounded-xl`}
                      />
                      <button
                        type="button"
                        onClick={() => openPicker(startInputRef)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                        title="Open calendar"
                        aria-label="Open calendar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                          <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm12 7H5v9h14V9z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">End date</label>
                    <div className="relative">
                      <input
                        ref={endInputRef}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 pr-12 rounded-xl`}
                      />
                      <button
                        type="button"
                        onClick={() => openPicker(endInputRef)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                        title="Open calendar"
                        aria-label="Open calendar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                          <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm12 7H5v9h14V9z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Count</label>
                    <input
                      type="number"
                      min={1}
                      value={count}
                      onChange={(e) =>
                        setCount(Math.max(1, Number(e.target.value)))
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Format</label>
                    <select
                      value={format}
                      onChange={(e) =>
                        setFormat(e.target.value as OutputFormat)
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    >
                      <option value="iso">ISO 8601</option>
                      <option value="locale">Locale</option>
                      <option value="unix">Unix (seconds)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Include time</label>
                    <div className="flex items-center h-[54px]">
                      <label className="inline-flex items-center text-white/80">
                        <input
                          type="checkbox"
                          checked={includeTime}
                          onChange={(e) => setIncludeTime(e.target.checked)}
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
                  <h3 className="text-lg font-medium mb-2">Output</h3>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated dates will appear here..."
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

export default RandomDateGenerator;
