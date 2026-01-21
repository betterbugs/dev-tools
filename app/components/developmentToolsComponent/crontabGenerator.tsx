"use client";
import React, { useMemo, useState } from "react";

type Field = "minute" | "hour" | "dom" | "month" | "dow";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

const MONTHS = [
  { v: 1, l: "Jan" },
  { v: 2, l: "Feb" },
  { v: 3, l: "Mar" },
  { v: 4, l: "Apr" },
  { v: 5, l: "May" },
  { v: 6, l: "Jun" },
  { v: 7, l: "Jul" },
  { v: 8, l: "Aug" },
  { v: 9, l: "Sep" },
  { v: 10, l: "Oct" },
  { v: 11, l: "Nov" },
  { v: 12, l: "Dec" },
];

const DOW = [
  { v: 0, l: "Sun" },
  { v: 1, l: "Mon" },
  { v: 2, l: "Tue" },
  { v: 3, l: "Wed" },
  { v: 4, l: "Thu" },
  { v: 5, l: "Fri" },
  { v: 6, l: "Sat" },
];

interface FieldState {
  mode: "every" | "specific" | "range" | "interval";
  values: string; // comma separated numbers or names
  start?: string; // for range / interval
  endOrStep?: string; // for range (end) or interval (step)
}

const defaultField = (mode: FieldState["mode"] = "every"): FieldState => ({ mode, values: "", start: "", endOrStep: "" });

const fieldToCron = (f: FieldState): string => {
  switch (f.mode) {
    case "every":
      return "*";
    case "specific":
      return f.values || "*";
    case "range":
      return f.start && f.endOrStep ? `${f.start}-${f.endOrStep}` : "*";
    case "interval":
      return f.start ? `${f.start}/${f.endOrStep || 1}` : `*/${f.endOrStep || 1}`;
    default:
      return "*";
  }
};

const humanize = (m: FieldState, h: FieldState, dom: FieldState, mo: FieldState, dow: FieldState): string => {
  const map = (f: FieldState, name: string) => {
    if (f.mode === "every") return `every ${name}`;
    if (f.mode === "specific") return `${name} ${f.values}`;
    if (f.mode === "range") return `${name} ${f.start}-${f.endOrStep}`;
    return `${name} every ${f.endOrStep || 1} starting at ${f.start || 0}`;
  };
  return `Runs at ${map(m, "minute")}, ${map(h, "hour")}, ${map(dom, "day")}, ${map(mo, "month")}, ${map(dow, "weekday")}`;
};

const Presets: { label: string; cron: string }[] = [
  { label: "Every minute", cron: "* * * * *" },
  { label: "Every 5 minutes", cron: "*/5 * * * *" },
  { label: "Hourly", cron: "0 * * * *" },
  { label: "Daily at 00:00", cron: "0 0 * * *" },
  { label: "Weekly (Sun 00:00)", cron: "0 0 * * 0" },
  { label: "Monthly (1st 00:00)", cron: "0 0 1 * *" },
];

const Chip = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button onClick={onClick} className={`px-2 py-1 rounded text-xs ${active ? "bg-primary text-black" : "bg-black/30 border border-white/10 hover:bg-black/40"}`}>{children}</button>
);

const toggleValueInList = (list: string, value: string): string => {
  const parts = list.split(",").map((s) => s.trim()).filter(Boolean);
  const idx = parts.indexOf(value);
  if (idx >= 0) parts.splice(idx, 1); else parts.push(value);
  return parts.sort((a, b) => Number(a) - Number(b)).join(",");
};

const RangeInputs = ({ state, onChange, placeholders }: { state: FieldState; onChange: (s: FieldState) => void; placeholders: [string, string] }) => (
  <div className="grid grid-cols-2 gap-2">
    <input value={state.start} onChange={(e) => onChange({ ...state, start: e.target.value })} className="px-3 py-2 bg-black/40 border border-white/10 rounded text-sm" placeholder={placeholders[0]} />
    <input value={state.endOrStep} onChange={(e) => onChange({ ...state, endOrStep: e.target.value })} className="px-3 py-2 bg-black/40 border border-white/10 rounded text-sm" placeholder={placeholders[1]} />
  </div>
);

const ValuesGrid = ({
  items,
  state,
  onChange,
}: {
  items: { label: string; value: string }[];
  state: FieldState;
  onChange: (s: FieldState) => void;
}) => {
  const list = state.values;
  const isActive = (v: string) => list.split(",").map((s) => s.trim()).filter(Boolean).includes(v);
  return (
    <div className="grid grid-cols-8 gap-1">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange({ mode: "specific", values: toggleValueInList(list, it.value), start: "", endOrStep: "" })}
          className={`px-2 py-1 rounded text-xs ${isActive(it.value) ? "bg-primary text-black" : "bg-black/30 border border-white/10 hover:bg-black/40"}`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
};

const FieldEditor = ({
  label,
  state,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  state: FieldState;
  onChange: (s: FieldState) => void;
  placeholder?: string;
  type: Field;
}) => {
  const minuteItems = Array.from({ length: 60 }).map((_, i) => ({ label: String(i), value: String(i) }));
  const hourItems = Array.from({ length: 24 }).map((_, i) => ({ label: String(i), value: String(i) }));
  const domItems = Array.from({ length: 31 }).map((_, i) => ({ label: String(i + 1), value: String(i + 1) }));
  const monthItems = MONTHS.map((m) => ({ label: m.l, value: String(m.v) }));
  const dowItems = DOW.map((d) => ({ label: d.l, value: String(d.v) }));

  const items = type === "minute" ? minuteItems : type === "hour" ? hourItems : type === "dom" ? domItems : type === "month" ? monthItems : dowItems;

  const setEveryN = (n: number) => onChange({ mode: "interval", values: "", start: "*", endOrStep: String(n) });
  const setEven = () => onChange({ mode: "specific", values: items.filter((_, idx) => idx % 2 === 0).map((it) => it.value).join(",") });
  const setOdd = () => onChange({ mode: "specific", values: items.filter((_, idx) => idx % 2 === 1).map((it) => it.value).join(",") });

  const quickChips = () => {
    if (type === "minute" || type === "hour") {
      return (
        <div className="flex flex-wrap gap-2">
          <Chip active={state.mode === "every"} onClick={() => onChange(defaultField("every"))}>Every</Chip>
          <Chip active={false} onClick={() => setEven()}>Even</Chip>
          <Chip active={false} onClick={() => setOdd()}>Odd</Chip>
          {[5, 10, 15, 20, 30].map((n) => (
            <Chip key={n} active={state.mode === "interval" && state.endOrStep === String(n)} onClick={() => setEveryN(n)}>Every {n}</Chip>
          ))}
        </div>
      );
    }
    if (type === "dom") {
      return (
        <div className="flex flex-wrap gap-2">
          <Chip active={state.mode === "every"} onClick={() => onChange(defaultField("every"))}>Every Day</Chip>
          <Chip active={false} onClick={() => setEven()}>Even Days</Chip>
          <Chip active={false} onClick={() => setOdd()}>Odd Days</Chip>
          <Chip active={state.mode === "interval" && state.endOrStep === "5"} onClick={() => setEveryN(5)}>Every 5 Days</Chip>
        </div>
      );
    }
    if (type === "month") {
      return (
        <div className="flex flex-wrap gap-2">
          <Chip active={state.mode === "every"} onClick={() => onChange(defaultField("every"))}>Every Month</Chip>
        </div>
      );
    }
    // dow
    return (
      <div className="flex flex-wrap gap-2">
        <Chip active={state.mode === "every"} onClick={() => onChange(defaultField("every"))}>Every Day</Chip>
        <Chip active={false} onClick={() => onChange({ mode: "specific", values: "1,2,3,4,5" })}>Mon-Fri</Chip>
        <Chip active={false} onClick={() => onChange({ mode: "specific", values: "1,2,3,4,5,6" })}>Mon-Sat</Chip>
        <Chip active={false} onClick={() => onChange({ mode: "specific", values: "6,0" })}>Sat-Sun</Chip>
      </div>
    );
  };

  return (
    <div className="bg-black/20 border border-white/10 rounded p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-white/60">{state.mode === "every" ? "*" : state.mode === "specific" ? state.values || "" : state.mode === "range" ? `${state.start}-${state.endOrStep}` : `${state.start || '*'} / ${state.endOrStep || 1}`}</div>
      </div>
      {quickChips()}
      <ValuesGrid items={items} state={state} onChange={onChange} />

      {state.mode === "specific" && (
        <input value={state.values} onChange={(e) => onChange({ ...state, values: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-sm" placeholder={placeholder || "e.g. 0,15,30,45"} />
      )}
      {state.mode === "range" && <RangeInputs state={state} onChange={onChange} placeholders={["Start", "End"]} />}
      {state.mode === "interval" && <RangeInputs state={state} onChange={onChange} placeholders={["Start (optional)", "Step (e.g. 5)"]} />}
    </div>
  );
};

const CrontabGenerator = () => {
  const [minute, setMinute] = useState<FieldState>(defaultField());
  const [hour, setHour] = useState<FieldState>(defaultField());
  const [dom, setDom] = useState<FieldState>(defaultField());
  const [month, setMonth] = useState<FieldState>(defaultField());
  const [dow, setDow] = useState<FieldState>(defaultField());

  const cron = useMemo(() => {
    return [fieldToCron(minute), fieldToCron(hour), fieldToCron(dom), fieldToCron(month), fieldToCron(dow)].join(" ");
  }, [minute, hour, dom, month, dow]);

  const description = useMemo(() => humanize(minute, hour, dom, month, dow), [minute, hour, dom, month, dow]);

  const applyPreset = (expr: string) => {
    const [m, h, d, mo, dw] = expr.split(" ");
    const parse = (token: string): FieldState => {
      if (token === "*") return defaultField("every");
      if (token.includes("-")) {
        const [s, e] = token.split("-");
        return { mode: "range", values: "", start: s, endOrStep: e };
      }
      if (token.includes("/")) {
        const [s, step] = token.split("/");
        return { mode: "interval", values: "", start: s === "*" ? "" : s, endOrStep: step };
      }
      if (token.includes(",")) return { mode: "specific", values: token } as FieldState;
      return { mode: "specific", values: token } as FieldState;
    };
    setMinute(parse(m));
    setHour(parse(h));
    setDom(parse(d));
    setMonth(parse(mo));
    setDow(parse(dw));
  };

  const copy = async () => { try { await navigator.clipboard.writeText(cron); } catch {} };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="hidden md:flex items-center gap-2">
                  {Presets.map((p) => (
                    <button key={p.label} onClick={() => applyPreset(p.cron)} className="px-2 py-1 bg-black/30 border border-white/10 rounded hover:bg-black/40">
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
                <button onClick={copy} className="px-3 py-1 bg-primary text-black rounded font-bold text-sm">Copy</button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FieldEditor type="minute" label="Minute" state={minute} onChange={setMinute} placeholder="0,15,30,45" />
              <FieldEditor type="hour" label="Hour" state={hour} onChange={setHour} placeholder="0,12,18" />
              <FieldEditor type="dom" label="Day of Month" state={dom} onChange={setDom} placeholder="1,15" />
              <FieldEditor type="month" label="Month" state={month} onChange={setMonth} placeholder="1-12 or names" />
              <FieldEditor type="dow" label="Day of Week" state={dow} onChange={setDow} placeholder="0-6 (Sun-Sat)" />
            </div>

            <div className="bg-black/30 border border-white/10 rounded p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-white/70">Cron expression</div>
                <button onClick={copy} className="px-3 py-1 bg-primary text-black rounded font-bold text-sm">Copy</button>
              </div>
              <div className="text-xl font-mono bg-black/40 border border-white/10 rounded p-3 text-white/90">{cron}</div>
              <div className="text-white/80 text-sm">{description}</div>
              <div className="text-xs text-white/60">Format: <Cmd>minute hour day-of-month month day-of-week</Cmd></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
                <h3 className="font-semibold">Hints</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li>Use comma for lists (e.g. <Cmd>1,15,30</Cmd>)</li>
                  <li>Use hyphen for ranges (e.g. <Cmd>9-17</Cmd>)</li>
                  <li>Use slash for intervals (e.g. <Cmd>*/5</Cmd>)</li>
                </ul>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
                <h3 className="font-semibold">Shortcuts</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li><Cmd>@reboot</Cmd> is not representable in 5-field cron; handle separately in crontab</li>
                  <li>Names supported by many cron impl: months (Jan..Dec), weekdays (Sun..Sat)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrontabGenerator;


