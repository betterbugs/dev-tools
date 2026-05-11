"use client";

import React, { useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type HarNameValue = { name: string; value: string };

type HarEntry = {
  startedDateTime?: string;
  time?: number;
  request?: {
    method?: string;
    url?: string;
    httpVersion?: string;
    headers?: HarNameValue[];
    queryString?: HarNameValue[];
    postData?: { mimeType?: string; text?: string };
    headersSize?: number;
    bodySize?: number;
  };
  response?: {
    status?: number;
    statusText?: string;
    httpVersion?: string;
    headers?: HarNameValue[];
    content?: { size?: number; mimeType?: string; text?: string; encoding?: string };
    headersSize?: number;
    bodySize?: number;
    redirectURL?: string;
  };
  cache?: any;
  timings?: Record<string, number>;
  serverIPAddress?: string;
  connection?: string;
  _error?: string;
};

type ParsedHar = {
  entries: HarEntry[];
  pageTitle?: string;
  creator?: string;
  browser?: string;
};

type EntryType = "all" | "xhr" | "js" | "css" | "img" | "media" | "other" | "errors";

const isObject = (v: unknown): v is Record<string, any> => typeof v === "object" && v !== null;

const safeJsonParse = (text: string): { data: unknown; error: string } => {
  try {
    return { data: JSON.parse(text), error: "" };
  } catch {
    return { data: null, error: "Invalid JSON. Please upload a valid .har/.json file." };
  }
};

const parseHarLike = (raw: unknown): { har: ParsedHar | null; error: string } => {
  if (!raw) return { har: null, error: "No data found in file." };

  // Standard HAR shape
  if (isObject(raw) && isObject(raw.log) && Array.isArray(raw.log.entries)) {
    const log = raw.log as any;
    const entries = (log.entries as any[]).filter(Boolean) as HarEntry[];
    const pageTitle =
      Array.isArray(log.pages) && log.pages[0]?.title ? String(log.pages[0].title) : undefined;
    const creator = log.creator?.name ? String(log.creator.name) : undefined;
    const browser = log.browser?.name ? String(log.browser.name) : undefined;
    return { har: { entries, pageTitle, creator, browser }, error: "" };
  }

  // Some exports are just { entries: [...] }
  if (isObject(raw) && Array.isArray((raw as any).entries)) {
    return { har: { entries: (raw as any).entries as HarEntry[] }, error: "" };
  }

  // Or an array of entries
  if (Array.isArray(raw)) {
    return { har: { entries: raw as HarEntry[] }, error: "" };
  }

  return { har: null, error: "Unsupported HAR format. Expected { log: { entries: [...] } }." };
};

const hostFromUrl = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
};

const pathFromUrl = (url: string) => {
  try {
    const u = new URL(url);
    return `${u.pathname}${u.search}`;
  } catch {
    return url;
  }
};

const formatBytes = (n?: number) => {
  if (!Number.isFinite(n)) return "—";
  const v = Number(n);
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let x = Math.abs(v);
  while (x >= 1024 && i < units.length - 1) {
    x /= 1024;
    i += 1;
  }
  const sign = v < 0 ? "-" : "";
  return `${sign}${x.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
};

const normalizeHeaders = (h?: HarNameValue[]) =>
  Array.isArray(h) ? h.map((x) => ({ name: String(x.name ?? ""), value: String(x.value ?? "") })) : [];

const guessEntryType = (en: HarEntry): Exclude<EntryType, "all" | "errors"> => {
  const mime =
    String(en.response?.content?.mimeType ?? en.request?.postData?.mimeType ?? "").toLowerCase();
  const url = String(en.request?.url ?? "").toLowerCase();

  if (mime.includes("javascript") || url.endsWith(".js") || url.includes(".js?")) return "js";
  if (mime.includes("css") || url.endsWith(".css") || url.includes(".css?")) return "css";
  if (
    mime.startsWith("image/") ||
    /\.(png|jpe?g|gif|webp|svg|ico)(\?|#|$)/.test(url)
  )
    return "img";
  if (
    mime.startsWith("video/") ||
    mime.startsWith("audio/") ||
    /\.(mp4|webm|mp3|wav|m4a|mov)(\?|#|$)/.test(url)
  )
    return "media";

  // Heuristic: XHR/fetch often has JSON or is not a static file
  if (mime.includes("json") || mime.includes("xml") || mime.includes("graphql")) return "xhr";
  return "other";
};

const clampTiming = (n: unknown) => {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 0) return 0;
  return v;
};

const timingSegments = (en: HarEntry) => {
  const t = en.timings ?? {};
  const dns = clampTiming(t.dns);
  const connect = clampTiming(t.connect);
  const ssl = clampTiming(t.ssl);
  const wait = clampTiming(t.wait);
  const receive = clampTiming(t.receive);
  const send = clampTiming(t.send);
  const blocked = clampTiming(t.blocked);
  return [
    { key: "blocked", label: "Blocked", ms: blocked, color: "#6b7280" },
    { key: "dns", label: "DNS", ms: dns, color: "#60a5fa" },
    { key: "connect", label: "Connect", ms: connect, color: "#34d399" },
    { key: "ssl", label: "SSL", ms: ssl, color: "#c084fc" },
    { key: "send", label: "Send", ms: send, color: "#93c5fd" },
    { key: "wait", label: "Waiting", ms: wait, color: "#fbbf24" },
    { key: "receive", label: "Content Download", ms: receive, color: "#22c55e" },
  ].filter((s) => s.ms > 0);
};

const HarFileViewer = () => {
  const [rawText, setRawText] = useState<string>("");
  const [har, setHar] = useState<ParsedHar | null>(null);
  const [error, setError] = useState<string>("");
  const [activeId, setActiveId] = useState<number>(-1);
  const [search, setSearch] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<EntryType>("all");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const reset = () => {
    setRawText("");
    setHar(null);
    setError("");
    setActiveId(-1);
    setSearch("");
    setTypeFilter("all");
  };

  const loadText = (text: string) => {
    setRawText(text);
    const parsed = safeJsonParse(text);
    if (parsed.error) {
      setHar(null);
      setError(parsed.error);
      return;
    }
    const res = parseHarLike(parsed.data);
    setHar(res.har);
    setError(res.error);
    setActiveId(-1);
  };

  const onPickFile = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      loadText(text);
    } finally {
      e.target.value = "";
    }
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const text = await file.text();
    loadText(text);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const entries = useMemo(() => har?.entries ?? [], [har]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries
      .map((en, idx) => ({ en, idx }))
      .filter(({ en }) => {
        const url = String(en.request?.url ?? "");
        const status = Number(en.response?.status ?? 0);
        const host = hostFromUrl(url);
        const path = pathFromUrl(url);

        const matchesText =
          !q ||
          url.toLowerCase().includes(q) ||
          host.toLowerCase().includes(q) ||
          path.toLowerCase().includes(q) ||
          String(en.response?.statusText ?? "").toLowerCase().includes(q);

        const isError = status >= 400;
        const type = guessEntryType(en);
        const matchesType =
          typeFilter === "all"
            ? true
            : typeFilter === "errors"
              ? isError
              : type === typeFilter;

        return matchesText && matchesType;
      });
  }, [entries, search, typeFilter]);

  const summary = useMemo(() => {
    const total = entries.length;
    let success = 0;
    let redirect = 0;
    let err = 0;
    let totalTime = 0;
    for (const e of entries) {
      const st = Number(e.response?.status ?? 0);
      if (st >= 200 && st < 300) success += 1;
      else if (st >= 300 && st < 400) redirect += 1;
      else if (st >= 400) err += 1;
      totalTime += Number(e.time ?? 0) || 0;
    }
    const avgTime = total ? totalTime / total : 0;
    return { total, success, redirect, err, avgTime };
  }, [entries]);

  const timelineMaxMs = useMemo(() => {
    let max = 0;
    for (const { en } of filtered) {
      const t = Number(en.time ?? 0) || 0;
      if (t > max) max = t;
    }
    return Math.max(100, Math.ceil(max / 100) * 100);
  }, [filtered]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  const downloadJson = () => {
    if (!rawText) return;
    const blob = new Blob([rawText], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "network.har.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const formatJson = (v: any) => {
    try {
      return JSON.stringify(v, null, 2);
    } catch {
      return String(v ?? "");
    }
  };

  return (
    <section className="w-full">
      <div className="md:mt-8 mt-4">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-5 md:p-8">
          <div className="md:w-[1100px] mx-auto">
            <div className="flex flex-col gap-4">
              <div
                ref={dropRef}
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="rounded-xl border border-[#222222] bg-black/20 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white/90 text-sm font-semibold">Drop your .har or .json file here</div>
                    <div className="text-white/50 text-xs mt-1">
                      Runs locally in your browser — nothing is uploaded.
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".har,.json,application/json"
                      className="hidden"
                      onChange={onFileChange}
                    />
                    <button
                      type="button"
                      onClick={onPickFile}
                      className="px-4 py-2 rounded-lg bg-primary hover:opacity-90 text-black text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Upload HAR
                    </button>
                    <button
                      type="button"
                      onClick={downloadJson}
                      disabled={!rawText}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Download JSON
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                {error && <div className="text-red-400 text-sm mt-3">{error}</div>}
                {har && (
                  <div className="text-white/60 text-xs mt-3">
                    Loaded <span className="text-white/80">{summary.total}</span> entries ·{" "}
                    <span className="text-white/80">{summary.success}</span> success ·{" "}
                    <span className="text-white/80">{summary.redirect}</span> redirects ·{" "}
                    <span className="text-white/80">{summary.err}</span> errors · avg{" "}
                    <span className="text-white/80">{Math.round(summary.avgTime)}ms</span>
                    {har.pageTitle ? (
                      <>
                        {" "}
                        · page <span className="text-white/80">{har.pageTitle}</span>
                      </>
                    ) : null}
                    {har.creator ? (
                      <>
                        {" "}
                        · creator <span className="text-white/80">{har.creator}</span>
                      </>
                    ) : null}
                    {har.browser ? (
                      <>
                        {" "}
                        · browser <span className="text-white/80">{har.browser}</span>
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Search + type chips */}
              <div className="rounded-xl border border-[#222222] bg-black/20 p-4">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search in URL, headers, requests, and responses…"
                  className="w-full bg-black/40 border border-[#222222] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  aria-label="Search entries"
                />

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {(
                    [
                      ["all", "All"],
                      ["xhr", "XHR"],
                      ["js", "JS"],
                      ["css", "CSS"],
                      ["img", "Img"],
                      ["media", "Media"],
                      ["other", "Other"],
                      ["errors", "Errors"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTypeFilter(key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                        typeFilter === key
                          ? "bg-white/10 border-white/10 text-white"
                          : "bg-transparent border-white/10 text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {label}
                    </button>
                  ))}

                  <div className="ml-auto text-white/50 text-xs">
                    Showing <span className="text-white/80">{filtered.length}</span> /{" "}
                    <span className="text-white/80">{entries.length}</span>
                  </div>
                </div>
              </div>

              {/* Table + details */}
              <div className="rounded-xl border border-[#222222] bg-black/25 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-[80px_70px_1fr_360px] gap-2 px-4 py-3 border-b border-[#222222] text-xs text-white/60">
                  <div>Status</div>
                  <div>Type</div>
                  <div>Request</div>
                  <div className="text-right">Timeline range: {timelineMaxMs}ms</div>
                </div>

                {/* Rows */}
                <div className="hide-scrollbar overflow-auto max-h-[360px]">
                  {filtered.length === 0 ? (
                    <div className="p-4 text-white/60 text-sm">No matching entries.</div>
                  ) : (
                    <ul className="divide-y divide-[#222222]">
                      {filtered.slice(0, 2000).map(({ en, idx }) => {
                        const method = String(en.request?.method ?? "").toUpperCase() || "—";
                        const url = String(en.request?.url ?? "");
                        const status = Number(en.response?.status ?? 0) || 0;
                        const totalMs = Math.max(0, Number(en.time ?? 0) || 0);
                        const selected = idx === activeId;
                        const statusColor =
                          status >= 200 && status < 300
                            ? "text-green-300"
                            : status >= 300 && status < 400
                              ? "text-yellow-300"
                              : status >= 400
                                ? "text-red-300"
                                : "text-white/60";

                        const typ = guessEntryType(en);
                        const typeLabel =
                          typ === "xhr" ? "XHR" : typ === "js" ? "JS" : typ === "css" ? "CSS" : typ === "img" ? "Img" : typ === "media" ? "Media" : "Other";

                        const segs = timingSegments(en);
                        const segTotal = segs.reduce((a, s) => a + s.ms, 0) || totalMs || 1;
                        const max = timelineMaxMs || 1;
                        const barW = Math.max(2, Math.min(100, (totalMs / max) * 100));

                        const reqHeaders = normalizeHeaders(en.request?.headers);
                        const resHeaders = normalizeHeaders(en.response?.headers);

                        return (
                          <li key={idx}>
                            <button
                              type="button"
                              onClick={() => setActiveId((prev) => (prev === idx ? -1 : idx))}
                              className={`w-full text-left px-4 py-3 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                                selected ? "bg-white/5" : ""
                              }`}
                            >
                              <div className="grid grid-cols-[80px_70px_1fr_360px] gap-2 items-center">
                                <div className={`text-xs font-semibold ${statusColor}`}>
                                  {status ? status : "—"} <span className="text-white/50">{method}</span>
                                </div>
                                <div className="text-xs text-white/70 font-semibold">{typeLabel}</div>
                                <div className="min-w-0">
                                  <div className="text-sm text-white/90 break-words">{pathFromUrl(url)}</div>
                                  <div className="text-xs text-white/50 truncate">{hostFromUrl(url) || "—"}</div>
                                </div>
                                <div className="w-full">
                                  <div className="flex items-center justify-end text-[11px] text-white/50 mb-1">
                                    {Math.round(totalMs)}ms
                                  </div>
                                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-2 flex" style={{ width: `${barW}%` }}>
                                      {segs.length === 0 ? (
                                        <div className="h-2 w-full" style={{ background: "#fbbf24" }} />
                                      ) : (
                                        segs.map((s) => (
                                          <div
                                            key={s.key}
                                            className="h-2"
                                            style={{ width: `${(s.ms / segTotal) * 100}%`, background: s.color }}
                                            title={`${s.label}: ${Math.round(s.ms)}ms`}
                                          />
                                        ))
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>

                            {selected && (
                              <div className="px-4 pb-4 pt-2 bg-white/5 border-t border-[#222222]">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                  <div className="lg:col-span-5 rounded-lg border border-[#222222] bg-black/30 p-4">
                                    <div className="text-white/90 text-sm font-semibold break-words">
                                      {method} {pathFromUrl(url)}
                                    </div>
                                    <div className="text-white/50 text-xs mt-1">
                                      <span className="text-white/70">{hostFromUrl(url) || "—"}</span>
                                      {" · "}Status <span className="text-white/80">{status || "—"}</span>
                                      {" · "}Total <span className="text-white/80">{Math.round(totalMs)}ms</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                                      <div className="rounded-md border border-[#222222] bg-black/40 p-3">
                                        <div className="text-white/50">Type</div>
                                        <div className="text-white/80 font-semibold mt-1">{typeLabel.toUpperCase()}</div>
                                      </div>
                                      <div className="rounded-md border border-[#222222] bg-black/40 p-3">
                                        <div className="text-white/50">Started</div>
                                        <div className="text-white/80 font-semibold mt-1">
                                          {en.startedDateTime ? new Date(en.startedDateTime).toLocaleString() : "—"}
                                        </div>
                                      </div>
                                      <div className="rounded-md border border-[#222222] bg-black/40 p-3">
                                        <div className="text-white/50">MIME</div>
                                        <div className="text-white/80 font-semibold mt-1 break-words">
                                          {en.response?.content?.mimeType ?? "—"}
                                        </div>
                                      </div>
                                      <div className="rounded-md border border-[#222222] bg-black/40 p-3">
                                        <div className="text-white/50">Size</div>
                                        <div className="text-white/80 font-semibold mt-1">
                                          {formatBytes(Number(en.response?.content?.size ?? en.response?.bodySize ?? 0) || 0)}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-4">
                                      <div className="text-white/80 text-xs font-semibold mb-2">Timing breakdown</div>
                                      <div className="space-y-2">
                                        {timingSegments(en).length === 0 ? (
                                          <div className="text-white/50 text-sm">—</div>
                                        ) : (
                                          timingSegments(en).map((s) => (
                                            <div key={s.key} className="flex items-center gap-2 text-xs">
                                              <span className="inline-block w-2 h-2 rounded-full" style={{ background: s.color }} />
                                              <span className="text-white/70 w-32">{s.label}</span>
                                              <span className="text-white/80 font-semibold">{Math.round(s.ms)}ms</span>
                                            </div>
                                          ))
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="lg:col-span-7 rounded-lg border border-[#222222] bg-black/30 p-4">
                                    <div className="flex items-center justify-end">
                                      <button
                                        type="button"
                                        onClick={() => copy(formatJson(en))}
                                        className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-2.5 !px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/60`}
                                      >
                                        Copy entry
                                      </button>
                                    </div>

                                    <details className="mt-3" open>
                                      <summary className="cursor-pointer text-sm text-white/80 select-none px-3 py-2 rounded-lg border border-[#222222] bg-black/40">
                                        Response headers
                                      </summary>
                                      <div className="mt-2 rounded-lg border border-[#222222] bg-black/40 p-3">
                                        {resHeaders.length === 0 ? (
                                          <div className="text-white/50 text-sm">—</div>
                                        ) : (
                                          <pre className="text-xs text-white/80 whitespace-pre-wrap break-words">
                                            {resHeaders.map((h) => `${h.name}: ${h.value}`).join("\n")}
                                          </pre>
                                        )}
                                      </div>
                                    </details>

                                    <details className="mt-3">
                                      <summary className="cursor-pointer text-sm text-white/80 select-none px-3 py-2 rounded-lg border border-[#222222] bg-black/40">
                                        Response content
                                      </summary>
                                      <div className="mt-2 rounded-lg border border-[#222222] bg-black/40 p-3">
                                        <div className="text-white/50 text-xs mb-2">
                                          MIME:{" "}
                                          <span className="text-white/70">{en.response?.content?.mimeType ?? "—"}</span>
                                          {" · "}
                                          Encoding:{" "}
                                          <span className="text-white/70">{en.response?.content?.encoding ?? "—"}</span>
                                        </div>
                                        <pre className="text-xs text-white/80 whitespace-pre-wrap break-words">
                                          {en.response?.content?.text ? String(en.response.content.text) : "—"}
                                        </pre>
                                      </div>
                                    </details>

                                    {reqHeaders.length > 0 && (
                                      <details className="mt-3">
                                        <summary className="cursor-pointer text-sm text-white/70 select-none">
                                          Request headers
                                        </summary>
                                        <div className="mt-2 rounded-lg border border-[#222222] bg-black/40 p-3">
                                          <pre className="text-xs text-white/80 whitespace-pre-wrap break-words">
                                            {reqHeaders.map((h) => `${h.name}: ${h.value}`).join("\n")}
                                          </pre>
                                        </div>
                                      </details>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HarFileViewer;

