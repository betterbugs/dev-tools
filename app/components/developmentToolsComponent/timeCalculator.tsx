"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type Mode = "add" | "subtract" | "multiply" | "divide" | "between";
type Unit = "ms" | "s" | "min" | "h" | "d" | "w" | "mo" | "y";

const UNIT_OPTIONS: { value: Unit; label: string }[] = [
  { value: "ms", label: "ms" },
  { value: "s", label: "seconds" },
  { value: "min", label: "minutes" },
  { value: "h", label: "hours" },
  { value: "d", label: "days" },
  { value: "w", label: "weeks" },
  { value: "mo", label: "months*" },
  { value: "y", label: "years*" },
];

const UNIT_TO_MS: Record<Unit, number> = {
  ms: 1,
  s: 1000,
  min: 60_000,
  h: 3_600_000,
  d: 86_400_000,
  w: 604_800_000,
  // Omni-style approximations
  mo: 30.5 * 86_400_000,
  y: 365 * 86_400_000,
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const formatPretty = (totalMs: number) => {
  const sign = totalMs < 0 ? "-" : "";
  const ms = Math.abs(Math.trunc(totalMs));
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${sign}${hours} h ${minutes} min ${seconds} sec`;
};

const breakdown = (totalMs: number) => {
  const sign = totalMs < 0 ? -1 : 1;
  let ms = Math.abs(Math.trunc(totalMs));
  const days = Math.floor(ms / UNIT_TO_MS.d);
  ms -= days * UNIT_TO_MS.d;
  const hours = Math.floor(ms / UNIT_TO_MS.h);
  ms -= hours * UNIT_TO_MS.h;
  const minutes = Math.floor(ms / UNIT_TO_MS.min);
  ms -= minutes * UNIT_TO_MS.min;
  const seconds = Math.floor(ms / UNIT_TO_MS.s);
  ms -= seconds * UNIT_TO_MS.s;
  return { sign, days, hours, minutes, seconds, milliseconds: ms };
};

type HMSRow = { h: number; m: number; s: number };

const DEFAULT_HMS_ROWS: HMSRow[] = [
  { h: 0, m: 0, s: 0 },
];

const toMs = (r: HMSRow) => (Number(r.h) * 3600 + Number(r.m) * 60 + Number(r.s)) * 1000;

const calc = (
  mode: Mode,
  rows: HMSRow[],
  multiplier: number,
  divisor: number,
  betweenStart: string,
  betweenEnd: string
) => {
  const total = rows.reduce((acc, r) => acc + toMs(r), 0);

  if (mode === "add") return { ms: total, error: "" };

  if (mode === "subtract") {
    if (rows.length < 2) return { ms: total, error: "" };
    const first = toMs(rows[0] ?? { h: 0, m: 0, s: 0 });
    const rest = rows.slice(1).reduce((acc, r) => acc + toMs(r), 0);
    return { ms: first - rest, error: "" };
  }

  if (mode === "multiply") return { ms: total * Number(multiplier || 0), error: "" };

  if (mode === "divide") {
    const d = Number(divisor || 0);
    if (d === 0) return { ms: 0, error: "Divisor cannot be 0." };
    return { ms: total / d, error: "" };
  }

  // between
  if (!betweenStart || !betweenEnd) return { ms: 0, error: "" };
  const a = new Date(betweenStart).getTime();
  const b = new Date(betweenEnd).getTime();
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return { ms: 0, error: "Please select valid start and end dates." };
  }
  return { ms: b - a, error: "" };
};

const TimeCalculator = () => {
  const [mode, setMode] = useState<Mode>("add");
  const [rows, setRows] = useState<HMSRow[]>(DEFAULT_HMS_ROWS);
  const [resultUnit, setResultUnit] = useState<Unit>("h");
  const [multiplier, setMultiplier] = useState<number>(2);
  const [divisor, setDivisor] = useState<number>(2);
  const [betweenStart, setBetweenStart] = useState<string>("");
  const [betweenEnd, setBetweenEnd] = useState<string>("");
  const rowsContainerRef = useRef<HTMLDivElement | null>(null);

  const computed = useMemo(
    () => calc(mode, rows, multiplier, divisor, betweenStart, betweenEnd),
    [mode, rows, multiplier, divisor, betweenStart, betweenEnd]
  );

  const resultMs = computed.ms;
  const error = computed.error;

  const resultInUnit = useMemo(() => {
    const denom = UNIT_TO_MS[resultUnit];
    if (!denom) return 0;
    return resultMs / denom;
  }, [resultMs, resultUnit]);

  const pretty = useMemo(() => formatPretty(resultMs), [resultMs]);
  const parts = useMemo(() => breakdown(resultMs), [resultMs]);

  const addRow = () => setRows((prev) => [...prev, { h: 0, m: 0, s: 0 }]);
  const removeRow = (idx: number) => setRows((prev) => prev.filter((_, i) => i !== idx));
  const updateRow = (idx: number, patch: Partial<HMSRow>) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));

  useEffect(() => {
    if (mode === "between") return;
    if (rows.length !== 1) return;
    const first = rows[0];
    if (!first) return;
    const hasAny = Boolean(Number(first.h) || Number(first.m) || Number(first.s));
    if (!hasAny) return;
    setRows((prev) => (prev.length === 1 ? [...prev, { h: 0, m: 0, s: 0 }] : prev));
  }, [mode, rows]);

  const focusTimeInput = (rowIdx: number, colIdx: number) => {
    const root = rowsContainerRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLInputElement>(
      `input[data-bb-time-input="1"][data-row="${rowIdx}"][data-col="${colIdx}"]`
    );
    el?.focus();
    el?.select?.();
  };

  const handleEnterAdvance = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const root = rowsContainerRef.current;
    if (!root) return;
    const inputs = Array.from(root.querySelectorAll<HTMLInputElement>(`input[data-bb-time-input="1"]`));
    if (inputs.length === 0) return;

    const current = e.currentTarget;
    const idx = inputs.indexOf(current);
    if (idx < 0) return;

    const next = inputs[idx + 1];
    if (next) {
      next.focus();
      next.select?.();
      return;
    }

    // If we were on the last input, add a row and focus it.
    if (rows.length >= 20) return;
    const nextRowIdx = rows.length;
    setRows((prev) => [...prev, { h: 0, m: 0, s: 0 }]);
    requestAnimationFrame(() => focusTimeInput(nextRowIdx, 0));
  };

  const clearAll = () => {
    setRows(DEFAULT_HMS_ROWS);
    setResultUnit("h");
    setMultiplier(2);
    setDivisor(2);
    setBetweenStart("");
    setBetweenEnd("");
    setMode("add");
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  const modeTitle =
    mode === "add"
      ? "Add time"
      : mode === "subtract"
        ? "Subtract time"
        : mode === "multiply"
          ? "Multiply time"
          : mode === "divide"
            ? "Divide time"
            : "Time between dates";

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-2xl border border-[#222222] bg-black/30 p-5 space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-white font-medium">Calculator</div>
                          <div className="text-xs text-white/50">{modeTitle}</div>
                        </div>
                        <button
                          type="button"
                          onClick={clearAll}
                          className="px-4 py-2 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 text-white whitespace-nowrap font-semibold text-sm"
                        >
                          Reset
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <label className="block text-sm font-medium text-white/80">I want to…</label>
                        <select
                          value={mode}
                          onChange={(e) => setMode(e.target.value as Mode)}
                          className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                        >
                          <option value="add">Add time</option>
                          <option value="subtract">Subtract time</option>
                          <option value="multiply">Multiply time</option>
                          <option value="divide">Divide time</option>
                          <option value="between">Find time between dates</option>
                        </select>
                      </div>

                      {mode === "between" ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Start</label>
                            <input
                              type="datetime-local"
                              value={betweenStart}
                              onChange={(e) => setBetweenStart(e.target.value)}
                              className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">End</label>
                            <input
                              type="datetime-local"
                              value={betweenEnd}
                              onChange={(e) => setBetweenEnd(e.target.value)}
                              className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-sm text-white/80">Enter values (up to 20 rows)</div>
                          <div
                            ref={rowsContainerRef}
                            className={`space-y-3 ${rows.length > 3 ? "bb-thin-scroll max-h-[420px] overflow-auto pr-1" : ""
                              }`}
                            style={rows.length > 3 ? { scrollbarWidth: "thin" } : undefined}
                          >
                            {rows.slice(0, 20).map((r, idx) => (
                              <div key={idx} className="rounded-2xl border border-[#222222] bg-black/40 p-4">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                  <div className="text-sm text-white/70">
                                    {idx === 0 ? "Time 1" : idx === 1 ? "Time 2" : `Time ${idx + 1}`}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeRow(idx)}
                                    disabled={rows.length <= 1}
                                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
                                  >
                                    Remove
                                  </button>
                                </div>

                                <div className="w-full rounded-xl border border-[#222222] bg-black/30 overflow-hidden">
                                  <div className="grid grid-cols-[1fr_1fr_1fr]">
                                    <div className="p-3 border-r border-[#222222]">
                                      <div className="text-[11px] text-white/50 mb-1">hrs</div>
                                      <input
                                        type="number"
                                        value={Number.isFinite(r.h) ? r.h : 0}
                                        onChange={(e) => updateRow(idx, { h: Number(e.target.value) || 0 })}
                                        onKeyDown={handleEnterAdvance}
                                        data-bb-time-input="1"
                                        data-row={idx}
                                        data-col={0}
                                        className="w-full bg-transparent outline-none text-white text-sm"
                                      />
                                    </div>
                                    <div className="p-3 border-r border-[#222222]">
                                      <div className="text-[11px] text-white/50 mb-1">min</div>
                                      <input
                                        type="number"
                                        value={Number.isFinite(r.m) ? r.m : 0}
                                        onChange={(e) => updateRow(idx, { m: Number(e.target.value) || 0 })}
                                        onKeyDown={handleEnterAdvance}
                                        data-bb-time-input="1"
                                        data-row={idx}
                                        data-col={1}
                                        className="w-full bg-transparent outline-none text-white text-sm"
                                      />
                                    </div>
                                    <div className="p-3">
                                      <div className="text-[11px] text-white/50 mb-1">sec</div>
                                      <input
                                        type="number"
                                        value={Number.isFinite(r.s) ? r.s : 0}
                                        onChange={(e) => updateRow(idx, { s: Number(e.target.value) || 0 })}
                                        onKeyDown={handleEnterAdvance}
                                        data-bb-time-input="1"
                                        data-row={idx}
                                        data-col={2}
                                        className="w-full bg-transparent outline-none text-white text-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={addRow}
                              disabled={rows.length >= 20}
                              className="px-4 py-2 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 text-white disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm"
                            >
                              + Add Row
                            </button>

                            {mode === "multiply" && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-white/70">×</span>
                                <input
                                  type="number"
                                  value={multiplier}
                                  onChange={(e) => setMultiplier(Number(e.target.value) || 0)}
                                  className="w-28 bg-black border border-[#222222] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                                />
                              </div>
                            )}

                            {mode === "divide" && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-white/70">÷</span>
                                <input
                                  type="number"
                                  value={divisor}
                                  onChange={(e) => setDivisor(Number(e.target.value) || 0)}
                                  className="w-28 bg-black border border-[#222222] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                                />
                              </div>
                            )}
                          </div>

                          <div className="text-xs text-white/50">
                            Tip: Use multiple rows for add/subtract. Multiply/divide applies to the total.
                          </div>
                        </div>
                      )}

                      {error && <div className="text-sm text-red-400">{error}</div>}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-2xl border border-[#222222] bg-black/30 p-5 space-y-4">
                      <div>
                        <div className="text-white font-medium">Result</div>
                        <div className="text-xs text-white/50">View as formatted time and totals</div>
                      </div>

                      <div className="rounded-xl bg-black/40 border border-[#222222] p-4">
                        <div className="text-sm text-white/70 mb-2">Pretty</div>
                        <div className="text-2xl text-white">{pretty}</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-black/40 border border-[#222222] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm text-white/70">In units</div>
                            <select
                              value={resultUnit}
                              onChange={(e) => setResultUnit(e.target.value as Unit)}
                              className="bg-black border border-[#222222] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                            >
                              {UNIT_OPTIONS.map((u) => (
                                <option key={u.value} value={u.value}>
                                  {u.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mt-3 text-white text-xl break-words">
                            {Number.isFinite(resultInUnit) ? resultInUnit.toFixed(6).replace(/\.?0+$/, "") : "—"}
                          </div>
                        </div>

                        <div className="rounded-xl bg-black/40 border border-[#222222] p-4">
                          <div className="text-sm text-white/70">Breakdown</div>
                          <div className="mt-3 text-white/90">
                            {parts.sign < 0 ? "-" : ""}
                            {parts.days}d {pad2(parts.hours)}h {pad2(parts.minutes)}m {pad2(parts.seconds)}s
                          </div>
                          <div className="mt-1 text-xs text-white/50">{parts.milliseconds} ms</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => copy(pretty)}
                          className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-3 !px-4 rounded-xl w-full text-sm`}
                        >
                          Copy pretty
                        </button>
                        <button
                          type="button"
                          onClick={() => copy(String(resultMs))}
                          className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-3 !px-4 rounded-xl w-full text-sm`}
                        >
                          Copy ms
                        </button>
                        <button
                          type="button"
                          onClick={() => copy(String(Math.floor(resultMs / 1000)))}
                          className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-3 !px-4 rounded-xl w-full text-sm`}
                        >
                          Copy seconds
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .bb-thin-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .bb-thin-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 999px;
        }
        .bb-thin-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.28);
        }
        .bb-thin-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
};

export default TimeCalculator;

