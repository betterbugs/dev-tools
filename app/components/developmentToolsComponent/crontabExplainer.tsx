"use client";
import React, { useMemo, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

// Cron aliases mapping
const ALIASES: Record<string, string> = {
  "@yearly": "0 0 1 1 *",
  "@annually": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@midnight": "0 0 * * *",
  "@hourly": "0 * * * *",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
type CronFieldType = "minute" | "hour" | "dom" | "month" | "dow";

const FIELD_SPECS: Record<CronFieldType, { min: number; max: number; names?: Record<string, number> }> = {
  minute: { min: 0, max: 59 },
  hour: { min: 0, max: 23 },
  dom: { min: 1, max: 31 },
  month: {
    min: 1,
    max: 12,
    names: {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
    },
  },
  dow: {
    min: 0,
    max: 6,
    names: { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 },
  },
};

// Parse a cron field into human-readable text
const parseField = (field: string, type: "minute" | "hour" | "dom" | "month" | "dow"): string => {
  if (field === "*") {
    if (type === "minute") return "every minute";
    if (type === "hour") return "every hour";
    if (type === "dom") return "every day";
    if (type === "month") return "every month";
    return "every day of week";
  }

  // Handle step values (*/n or x/n)
  if (field.includes("/")) {
    const [base, step] = field.split("/");
    const stepNum = parseInt(step);
    if (base === "*") {
      if (type === "minute") return `every ${stepNum} minute${stepNum > 1 ? "s" : ""}`;
      if (type === "hour") return `every ${stepNum} hour${stepNum > 1 ? "s" : ""}`;
      if (type === "dom") return `every ${stepNum} day${stepNum > 1 ? "s" : ""}`;
      if (type === "month") return `every ${stepNum} month${stepNum > 1 ? "s" : ""}`;
      return `every ${stepNum} day${stepNum > 1 ? "s" : ""} of week`;
    }
    return `every ${stepNum} starting from ${base}`;
  }

  // Handle ranges (x-y)
  if (field.includes("-") && !field.includes(",")) {
    const [start, end] = field.split("-");
    const startLabel = formatValue(start, type);
    const endLabel = formatValue(end, type);
    return `from ${startLabel} to ${endLabel}`;
  }

  // Handle lists (x,y,z)
  if (field.includes(",")) {
    const values = field.split(",").map((v) => formatValue(v.trim(), type));
    if (values.length > 3) {
      return `at ${values.slice(0, 3).join(", ")}, and ${values.length - 3} more`;
    }
    return `at ${values.join(", ")}`;
  }

  // Single value
  return `at ${formatValue(field, type)}`;
};

const formatValue = (value: string, type: "minute" | "hour" | "dom" | "month" | "dow"): string => {
  const num = parseInt(value);
  if (isNaN(num)) {
    // Handle month/day names
    if (type === "month") {
      const monthIndex = MONTHS.findIndex((m) => m.toLowerCase() === value.toLowerCase());
      return monthIndex >= 0 ? MONTHS[monthIndex] : value;
    }
    if (type === "dow") {
      const dowIndex = DOW.findIndex((d) => d.toLowerCase() === value.toLowerCase());
      return dowIndex >= 0 ? DOW[dowIndex] : value;
    }
    return value;
  }

  if (type === "month" && num >= 1 && num <= 12) return MONTHS[num - 1];
  if (type === "dow" && num >= 0 && num <= 6) return DOW[num];
  if (type === "hour") return `${num.toString().padStart(2, "0")}:00`;
  if (type === "minute") return `minute ${num}`;
  return value;
};

// Generate human-readable explanation
const explainCron = (cronExpr: string): string => {
  const trimmed = cronExpr.trim().toLowerCase();
  
  // Check for aliases
  if (ALIASES[trimmed]) {
    const aliasName = trimmed.substring(1); // Remove @
    return `Runs ${aliasName} (${ALIASES[trimmed]})`;
  }

  const parts = cronExpr.trim().split(/\s+/);
  if (!isValidCronExpression(parts)) {
    return "Invalid cron expression. Expected 5 fields: minute hour day month weekday";
  }

  const [minute, hour, dom, month, dow] = parts;

  const minuteText = parseField(minute, "minute");
  const hourText = parseField(hour, "hour");
  const domText = parseField(dom, "dom");
  const monthText = parseField(month, "month");
  const dowText = parseField(dow, "dow");

  // Build natural sentence
  let explanation = "Runs ";

  // Time part
  if (minute === "*" && hour === "*") {
    explanation += "every minute";
  } else if (minute !== "*" && hour === "*") {
    explanation += `${minuteText} of every hour`;
  } else if (minute === "*" && hour !== "*") {
    explanation += `every minute ${hourText}`;
  } else {
    explanation += `at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }

  // Day constraints
  const hasDom = dom !== "*";
  const hasDow = dow !== "*";

  if (hasDom && hasDow) {
    explanation += `, ${domText} of the month OR ${dowText}`;
  } else if (hasDom) {
    explanation += `, ${domText} of the month`;
  } else if (hasDow) {
    explanation += `, ${dowText}`;
  }

  // Month constraint
  if (month !== "*") {
    explanation += `, ${monthText}`;
  }

  return explanation;
};

// Calculate next N executions
const getNextExecutions = (cronExpr: string, count: number = 5): string[] => {
  try {
    const trimmed = cronExpr.trim().toLowerCase();
    const expr = ALIASES[trimmed] || cronExpr.trim();
    
    const parts = expr.split(/\s+/);
    if (!isValidCronExpression(parts)) return [];

    const [minuteField, hourField, domField, monthField, dowField] = parts;

    const now = new Date();
    const executions: string[] = [];

    const minuteValues = getMatchingValues(minuteField, "minute");
    const hourValues = getMatchingValues(hourField, "hour");
    if (minuteValues.length === 0 || hourValues.length === 0) return [];

    const hasDomConstraint = domField !== "*";
    const hasDowConstraint = dowField !== "*";

    // 30 years covers sparse valid schedules (e.g. leap-day based) for at least 5 occurrences.
    const maxLookaheadDays = 366 * 30;
    const dayCursor = new Date(now);
    dayCursor.setHours(0, 0, 0, 0);

    for (let dayOffset = 0; dayOffset <= maxLookaheadDays && executions.length < count; dayOffset++) {
      if (dayOffset > 0) {
        dayCursor.setDate(dayCursor.getDate() + 1);
      }

      const dom = dayCursor.getDate();
      const month = dayCursor.getMonth() + 1;
      const dow = dayCursor.getDay();

      const monthMatch = matchField(month, monthField, "month");
      if (!monthMatch) continue;

      const domMatch = matchField(dom, domField, "dom");
      const dowMatch = matchField(dow, dowField, "dow");
      const dayMatch =
        hasDomConstraint && hasDowConstraint ? domMatch || dowMatch : domMatch && dowMatch;

      if (!dayMatch) continue;

      for (const hour of hourValues) {
        for (const minute of minuteValues) {
          const candidate = new Date(
            dayCursor.getFullYear(),
            dayCursor.getMonth(),
            dayCursor.getDate(),
            hour,
            minute,
            0,
            0
          );

          if (candidate <= now) continue;

          executions.push(candidate.toLocaleString());
          if (executions.length >= count) break;
        }
        if (executions.length >= count) break;
      }
    }

    return executions;
  } catch {
    return [];
  }
};

const getMatchingValues = (field: string, type: CronFieldType): number[] => {
  const { min, max } = FIELD_SPECS[type];
  const values: number[] = [];
  for (let value = min; value <= max; value++) {
    if (matchField(value, field, type)) {
      values.push(value);
    }
  }
  return values;
};

const isValidCronExpression = (parts: string[]): boolean => {
  if (parts.length !== 5) return false;
  const [minute, hour, dom, month, dow] = parts;
  return (
    isValidField(minute, "minute") &&
    isValidField(hour, "hour") &&
    isValidField(dom, "dom") &&
    isValidField(month, "month") &&
    isValidField(dow, "dow")
  );
};

const isValidField = (field: string, type: CronFieldType): boolean => {
  if (!field || field.trim() === "") return false;
  const parts = field.split(",");
  if (parts.some((part) => part.trim() === "")) return false;
  return parts.every((part) => isValidFieldPart(part.trim(), type));
};

const isValidFieldPart = (part: string, type: CronFieldType): boolean => {
  return parseFieldPartSpec(part, type) !== null;
};

type FieldPartSpec = {
  start: number;
  end: number;
  step: number;
};

const parseFieldPartSpec = (part: string, type: CronFieldType): FieldPartSpec | null => {
  const [base, step] = part.split("/");
  if (!base || part.split("/").length > 2) return null;

  let stepValue = 1;
  if (step !== undefined) {
    if (!/^\d+$/.test(step)) return null;
    stepValue = parseInt(step, 10);
    if (stepValue <= 0) return null;
  }

  const spec = FIELD_SPECS[type];

  if (base === "*") {
    return { start: spec.min, end: spec.max, step: stepValue };
  }

  if (base.includes("-")) {
    const [startRaw, endRaw] = base.split("-");
    if (!startRaw || !endRaw || base.split("-").length > 2) return null;
    const start = parseFieldValue(startRaw, type);
    const end = parseFieldValue(endRaw, type);
    if (start === null || end === null) return null;
    if (start > end) return null;
    return { start, end, step: stepValue };
  }

  const start = parseFieldValue(base, type);
  if (start === null) return null;

  // x/n means from x through field max, stepping by n.
  return { start, end: spec.max, step: stepValue };
};

const parseFieldValue = (raw: string, type: CronFieldType): number | null => {
  const token = raw.trim().toLowerCase();
  const spec = FIELD_SPECS[type];

  if (spec.names && token in spec.names) {
    return spec.names[token];
  }

  if (!/^\d+$/.test(token)) return null;
  const value = parseInt(token, 10);
  if (value < spec.min || value > spec.max) return null;
  return value;
};

const matchField = (value: number, field: string, type: CronFieldType): boolean => {
  if (!isValidField(field, type)) return false;
  return field.split(",").some((part) => matchFieldPart(value, part.trim(), type));
};

const matchFieldPart = (value: number, part: string, type: CronFieldType): boolean => {
  const spec = parseFieldPartSpec(part, type);
  if (!spec) return false;
  if (value < spec.start || value > spec.end) return false;
  return (value - spec.start) % spec.step === 0;
};

const CrontabExplainer = () => {
  const [cronInput, setCronInput] = useState("");
  const [showExecutions, setShowExecutions] = useState(true);

  const explanation = useMemo(() => {
    if (!cronInput.trim()) return "";
    return explainCron(cronInput);
  }, [cronInput]);

  const nextExecutions = useMemo(() => {
    if (!cronInput.trim() || !showExecutions) return [];
    return getNextExecutions(cronInput, 5);
  }, [cronInput, showExecutions]);

  const isValid = useMemo(() => {
    if (!cronInput.trim()) return true;
    const trimmed = cronInput.trim().toLowerCase();
    if (ALIASES[trimmed]) return true;
    const parts = cronInput.trim().split(/\s+/);
    return isValidCronExpression(parts);
  }, [cronInput]);

  const examples = [
    { label: "Every 5 minutes", cron: "*/5 * * * *" },
    { label: "Daily at 2:30 AM", cron: "30 2 * * *" },
    { label: "Weekdays at 9 AM", cron: "0 9 * * 1-5" },
    { label: "First day of month", cron: "0 0 1 * *" },
    { label: "@hourly", cron: "@hourly" },
    { label: "@daily", cron: "@daily" },
  ];

  const handleCopy = async () => {
    if (!explanation) return;
    try {
      await navigator.clipboard.writeText(explanation);
    } catch {}
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            {/* Input Section */}
            <div className="bg-black/20 border border-white/10 rounded p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold">Cron Expression</label>
                <div className="text-xs text-white/60">
                  Format: <Cmd>minute hour day month weekday</Cmd>
                </div>
              </div>
              <input
                type="text"
                value={cronInput}
                onChange={(e) => setCronInput(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded text-lg font-mono"
                placeholder="e.g., */5 * * * * or @hourly"
              />
              {!isValid && (
                <div className="text-red-400 text-sm">
                  Invalid format. Please enter a 5-field cron expression or use an alias like @hourly, @daily, @weekly, @monthly, @yearly
                </div>
              )}
            </div>

            {/* Examples */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-white/70">Examples:</span>
              {examples.map((ex) => (
                <button
                  key={ex.cron}
                  onClick={() => setCronInput(ex.cron)}
                  className="px-3 py-1 bg-black/30 border border-white/10 rounded hover:bg-black/40 text-sm"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            {/* Explanation Output */}
            {explanation && (
              <div className="bg-black/30 border border-white/10 rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Human-Readable Explanation</div>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-primary text-black rounded font-bold text-sm"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-lg text-white/90 bg-black/40 border border-white/10 rounded p-4">
                  {explanation}
                </div>
              </div>
            )}

            {/* Next Executions */}
            {nextExecutions.length > 0 && (
              <div className="bg-black/20 border border-white/10 rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Next 5 Executions</div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showExecutions}
                      onChange={(e) => setShowExecutions(e.target.checked)}
                      className="rounded"
                    />
                    Show preview
                  </label>
                </div>
                <ul className="space-y-2">
                  {nextExecutions.map((exec, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 bg-black/40 border border-white/10 rounded text-sm font-mono text-white/80"
                    >
                      {idx + 1}. {exec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Help Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
                <h3 className="font-semibold">Special Characters</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li><Cmd>*</Cmd> - Any value (every)</li>
                  <li><Cmd>,</Cmd> - List of values (e.g., <Cmd>1,15,30</Cmd>)</li>
                  <li><Cmd>-</Cmd> - Range of values (e.g., <Cmd>9-17</Cmd>)</li>
                  <li><Cmd>/</Cmd> - Step values (e.g., <Cmd>*/5</Cmd>)</li>
                </ul>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
                <h3 className="font-semibold">Supported Aliases</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li><Cmd>@yearly</Cmd> or <Cmd>@annually</Cmd> - Once a year (Jan 1, 00:00)</li>
                  <li><Cmd>@monthly</Cmd> - Once a month (1st, 00:00)</li>
                  <li><Cmd>@weekly</Cmd> - Once a week (Sunday, 00:00)</li>
                  <li><Cmd>@daily</Cmd> or <Cmd>@midnight</Cmd> - Once a day (00:00)</li>
                  <li><Cmd>@hourly</Cmd> - Once an hour (minute 0)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrontabExplainer;
