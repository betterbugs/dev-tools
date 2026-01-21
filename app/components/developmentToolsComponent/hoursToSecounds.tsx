"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const HoursToSecounds = () => {
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");

  const normalized = (value: string) => {
    if (!value) return 0;
    const n = Number(value);
    return isNaN(n) || n < 0 ? 0 : Math.floor(n);
  };

  const totalSeconds = useMemo(() => {
    const h = normalized(hours);
    const m = normalized(minutes);
    const s = normalized(seconds);
    return h * 3600 + m * 60 + s;
  }, [hours, minutes, seconds]);

  const handleClear = () => {
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(totalSeconds));
    } catch (_) {}
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Hours</label>
                    <input
                      type="number"
                      min={0}
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Minutes</label>
                    <input
                      type="number"
                      min={0}
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Seconds</label>
                    <input
                      type="number"
                      min={0}
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Total seconds</h3>
                  <div className="relative">
                    <input
                      readOnly
                      value={totalSeconds}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 pr-14 rounded-xl`}
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
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
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={handleClear}
                    className={`${DevelopmentToolsStyles.clearButton} w-[200px] text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)]`}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoursToSecounds;
