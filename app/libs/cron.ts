export const CRON_ALIASES: Record<string, string> = {
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

export type CronFieldType = "minute" | "hour" | "dom" | "month" | "dow";

export const CRON_FIELD_SPECS: Record<CronFieldType, { min: number; max: number; names?: Record<string, number> }> = {
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

export type FieldPartSpec = {
  start: number;
  end: number;
  step: number;
};

export type CronHumanizeFieldState = {
  mode: "every" | "specific" | "range" | "interval";
  values: string;
  start?: string;
  endOrStep?: string;
};

export const resolveCronAlias = (cronExpr: string): string => {
  const trimmed = cronExpr.trim().toLowerCase();
  return CRON_ALIASES[trimmed] || cronExpr.trim();
};

const formatValue = (value: string, type: CronFieldType): string => {
  const num = parseInt(value, 10);
  if (Number.isNaN(num)) {
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

const parseField = (field: string, type: CronFieldType): string => {
  if (field === "*") {
    if (type === "minute") return "every minute";
    if (type === "hour") return "every hour";
    if (type === "dom") return "every day";
    if (type === "month") return "every month";
    return "every day of week";
  }

  if (field.includes("/")) {
    const [base, step] = field.split("/");
    const stepNum = parseInt(step, 10);
    if (base === "*") {
      if (type === "minute") return `every ${stepNum} minute${stepNum > 1 ? "s" : ""}`;
      if (type === "hour") return `every ${stepNum} hour${stepNum > 1 ? "s" : ""}`;
      if (type === "dom") return `every ${stepNum} day${stepNum > 1 ? "s" : ""}`;
      if (type === "month") return `every ${stepNum} month${stepNum > 1 ? "s" : ""}`;
      return `every ${stepNum} day${stepNum > 1 ? "s" : ""} of week`;
    }
    return `every ${stepNum} starting from ${base}`;
  }

  if (field.includes("-") && !field.includes(",")) {
    const [start, end] = field.split("-");
    return `from ${formatValue(start, type)} to ${formatValue(end, type)}`;
  }

  if (field.includes(",")) {
    const values = field.split(",").map((v) => formatValue(v.trim(), type));
    if (values.length > 3) {
      return `at ${values.slice(0, 3).join(", ")}, and ${values.length - 3} more`;
    }
    return `at ${values.join(", ")}`;
  }

  return `at ${formatValue(field, type)}`;
};

export const parseFieldValue = (raw: string, type: CronFieldType): number | null => {
  const token = raw.trim().toLowerCase();
  const spec = CRON_FIELD_SPECS[type];

  if (spec.names && token in spec.names) return spec.names[token];
  if (!/^\d+$/.test(token)) return null;

  const value = parseInt(token, 10);
  if (value < spec.min || value > spec.max) return null;
  return value;
};

export const parseFieldPartSpec = (part: string, type: CronFieldType): FieldPartSpec | null => {
  const [base, step] = part.split("/");
  if (!base || part.split("/").length > 2) return null;

  let stepValue = 1;
  if (step !== undefined) {
    if (!/^\d+$/.test(step)) return null;
    stepValue = parseInt(step, 10);
    if (stepValue <= 0) return null;
  }

  const spec = CRON_FIELD_SPECS[type];
  if (base === "*") return { start: spec.min, end: spec.max, step: stepValue };

  if (base.includes("-")) {
    const [startRaw, endRaw] = base.split("-");
    if (!startRaw || !endRaw || base.split("-").length > 2) return null;
    const start = parseFieldValue(startRaw, type);
    const end = parseFieldValue(endRaw, type);
    if (start === null || end === null || start > end) return null;
    return { start, end, step: stepValue };
  }

  const start = parseFieldValue(base, type);
  if (start === null) return null;
  return { start, end: spec.max, step: stepValue };
};

export const isValidField = (field: string, type: CronFieldType): boolean => {
  if (!field || field.trim() === "") return false;
  const parts = field.split(",");
  if (parts.some((part) => part.trim() === "")) return false;
  return parts.every((part) => parseFieldPartSpec(part.trim(), type) !== null);
};

export const isValidCronExpression = (parts: string[]): boolean => {
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

export const explainCronExpression = (cronExpr: string): string => {
  const trimmed = cronExpr.trim().toLowerCase();
  if (CRON_ALIASES[trimmed]) {
    return `Runs ${trimmed.substring(1)} (${CRON_ALIASES[trimmed]})`;
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

  let explanation = "Runs ";

  if (minute === "*" && hour === "*") {
    explanation += "every minute";
  } else if (minute !== "*" && hour === "*") {
    explanation += `${minuteText} of every hour`;
  } else if (minute === "*" && hour !== "*") {
    explanation += `every minute ${hourText}`;
  } else {
    explanation += `at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }

  const hasDom = dom !== "*";
  const hasDow = dow !== "*";

  if (hasDom && hasDow) explanation += `, ${domText} of the month OR ${dowText}`;
  else if (hasDom) explanation += `, ${domText} of the month`;
  else if (hasDow) explanation += `, ${dowText}`;

  if (month !== "*") explanation += `, ${monthText}`;
  return explanation;
};

export const humanizeCronFields = (
  m: CronHumanizeFieldState,
  h: CronHumanizeFieldState,
  dom: CronHumanizeFieldState,
  mo: CronHumanizeFieldState,
  dow: CronHumanizeFieldState
): string => {
  const map = (f: CronHumanizeFieldState, name: string) => {
    if (f.mode === "every") return `every ${name}`;
    if (f.mode === "specific") return `${name} ${f.values}`;
    if (f.mode === "range") return `${name} ${f.start}-${f.endOrStep}`;
    return `${name} every ${f.endOrStep || 1} starting at ${f.start || 0}`;
  };
  return `Runs at ${map(m, "minute")}, ${map(h, "hour")}, ${map(dom, "day")}, ${map(mo, "month")}, ${map(dow, "weekday")}`;
};

const tokenToHumanizeField = (token: string): CronHumanizeFieldState => {
  if (token === "*") return { mode: "every", values: "", start: "", endOrStep: "" };
  if (token.includes("-")) {
    const [start, endOrStep] = token.split("-");
    return { mode: "range", values: "", start, endOrStep };
  }
  if (token.includes("/")) {
    const [start, endOrStep] = token.split("/");
    return { mode: "interval", values: "", start: start === "*" ? "" : start, endOrStep };
  }
  return { mode: "specific", values: token, start: "", endOrStep: "" };
};

export const humanizeCronExpression = (cronExpr: string): string => {
  const trimmed = cronExpr.trim().toLowerCase();
  if (CRON_ALIASES[trimmed]) {
    const aliasName = trimmed.substring(1);
    return `Runs ${aliasName} (${CRON_ALIASES[trimmed]})`;
  }

  const parts = cronExpr.trim().split(/\s+/);
  if (!isValidCronExpression(parts)) {
    return "Invalid cron expression. Expected 5 fields: minute hour day month weekday";
  }

  const [m, h, dom, mo, dow] = parts;
  return humanizeCronFields(
    tokenToHumanizeField(m),
    tokenToHumanizeField(h),
    tokenToHumanizeField(dom),
    tokenToHumanizeField(mo),
    tokenToHumanizeField(dow)
  );
};
