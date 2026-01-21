"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type BrowserInfo = {
  browserName: string;
  browserVersion?: string;
  engine?: string;
  platform: string;
  osName?: string;
  osVersion?: string;
  userAgent: string;
  brands?: Array<{ brand: string; version: string }>;
  language: string;
  languages?: string[];
  online: boolean;
  cookieEnabled: boolean;
  doNotTrack?: string | null;
  javascriptEnabled: boolean;
  ipAddress?: string;
  flashInstalled?: boolean;
  javaInstalled?: boolean;
  adBlockEnabled?: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  colorDepth?: number;
  pixelRatio?: number;
  viewport?: { width: number; height: number };
  screen?: { width: number; height: number };
  timezone?: string;
  features: Record<string, boolean | string>;
};

function parseBrowserFromUA(ua: string): { name: string; version?: string; engine?: string } {
  const U = ua;
  // Order matters to avoid false positives
  const rules: Array<{ re: RegExp; name: string } & { verRe?: RegExp; engine?: string }> = [
    { re: /Edg\/(\d+[\.\d+]*)/i, name: "Microsoft Edge", verRe: /Edg\/(\d+[\.\d+]*)/i, engine: "Blink" },
    { re: /OPR\/(\d+[\.\d+]*)/i, name: "Opera", verRe: /OPR\/(\d+[\.\d+]*)/i, engine: "Blink" },
    { re: /Chrome\/(\d+[\.\d+]*)/i, name: "Chrome", verRe: /Chrome\/(\d+[\.\d+]*)/i, engine: "Blink" },
    { re: /CriOS\/(\d+[\.\d+]*)/i, name: "Chrome iOS", verRe: /CriOS\/(\d+[\.\d+]*)/i, engine: "WebKit" },
    { re: /Firefox\/(\d+[\.\d+]*)/i, name: "Firefox", verRe: /Firefox\/(\d+[\.\d+]*)/i, engine: "Gecko" },
    { re: /FxiOS\/(\d+[\.\d+]*)/i, name: "Firefox iOS", verRe: /FxiOS\/(\d+[\.\d+]*)/i, engine: "WebKit" },
    { re: /Version\/(\d+[\.\d+]*)\s+Safari/i, name: "Safari", verRe: /Version\/(\d+[\.\d+]*)/i, engine: "WebKit" },
    { re: /Safari\/(\d+[\.\d+]*)/i, name: "Safari", verRe: /Safari\/(\d+[\.\d+]*)/i, engine: "WebKit" },
    { re: /MSIE\s(\d+[\.\d+]*)/i, name: "Internet Explorer", verRe: /MSIE\s(\d+[\.\d+]*)/i, engine: "Trident" },
    { re: /Trident\/7\.0;.*rv:(\d+[\.\d+]*)/i, name: "Internet Explorer", verRe: /rv:(\d+[\.\d+]*)/i, engine: "Trident" },
  ];
  for (const rule of rules) {
    if (rule.re.test(U)) {
      const version = rule.verRe ? (U.match(rule.verRe)?.[1] ?? undefined) : undefined;
      return { name: rule.name, version, engine: rule.engine };
    }
  }
  return { name: "Unknown" };
}

function parseOsFromUA(ua: string): { osName?: string; osVersion?: string } {
  const U = ua;
  // Windows (UA string uses Windows NT x.y)
  const win = U.match(/Windows NT ([0-9]+\.[0-9]+)/i);
  if (win) {
    const nt = win[1];
    const map: Record<string, string> = {
      "10.0": "Windows 10/11",
      "6.3": "Windows 8.1",
      "6.2": "Windows 8",
      "6.1": "Windows 7",
      "6.0": "Windows Vista",
      "5.1": "Windows XP",
    };
    return { osName: map[nt] || `Windows NT ${nt}`, osVersion: nt };
  }
  // macOS
  const mac = U.match(/Mac OS X ([0-9_\.]+)/i);
  if (mac) {
    const v = mac[1].replace(/_/g, ".");
    return { osName: "macOS", osVersion: v };
  }
  // iOS
  const ios = U.match(/(iPhone|iPad|iPod).*OS ([0-9_]+)/i);
  if (ios) {
    const v = ios[2].replace(/_/g, ".");
    return { osName: "iOS", osVersion: v };
  }
  // Android
  const android = U.match(/Android\s([0-9\.]+)/i);
  if (android) {
    return { osName: "Android", osVersion: android[1] };
  }
  // Linux and others (version often not in UA)
  if (/Linux/i.test(U)) return { osName: "Linux" };
  if (/CrOS/i.test(U)) return { osName: "ChromeOS" };
  return {};
}

function collectBrowserInfo(): BrowserInfo {
  const nav = typeof navigator !== "undefined" ? navigator : ({} as Navigator);
  const uaData = (nav as any).userAgentData as
    | { brands?: Array<{ brand: string; version: string }>; platform?: string }
    | undefined;
  const ua = nav.userAgent || "";
  const parsed = parseBrowserFromUA(ua);
  const platform = (uaData?.platform as string) || (nav as any).platform || "";
  const osParsed = parseOsFromUA(ua);
  const language = nav.language || (nav as any).userLanguage || "";
  const languages = nav.languages ? Array.from(nav.languages) as string[] : undefined;
  const online = typeof navigator.onLine === "boolean" ? navigator.onLine : true;
  const cookieEnabled = !!nav.cookieEnabled;
  const doNotTrack = (nav as any).doNotTrack ?? (window as any).doNotTrack ?? null;
  const javascriptEnabled = true;
  const hardwareConcurrency = (nav as any).hardwareConcurrency;
  const deviceMemory = (nav as any).deviceMemory;
  const colorDepth = typeof screen !== "undefined" ? screen.colorDepth : undefined;
  const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : undefined;
  const viewport = typeof window !== "undefined" ? { width: window.innerWidth, height: window.innerHeight } : undefined;
  const scr = typeof screen !== "undefined" ? { width: screen.width, height: screen.height } : undefined;
  const timezone = (Intl && (Intl as any).DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined;

  const features: Record<string, boolean | string> = {
    localStorage: (() => { try { return !!window.localStorage; } catch { return false; } })(),
    sessionStorage: (() => { try { return !!window.sessionStorage; } catch { return false; } })(),
    serviceWorker: "serviceWorker" in navigator,
    clipboard: !!(navigator as any).clipboard,
    geolocation: "geolocation" in navigator,
    notifications: "Notification" in window ? (Notification as any).permission : false,
    webgl: (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl") || (canvas.getContext as any)("experimental-webgl"));
      } catch {
        return false;
      }
    })(),
    wasm: typeof WebAssembly === "object",
    touch: !!("ontouchstart" in window) || (navigator as any).maxTouchPoints > 0,
  };

  return {
    browserName: parsed.name,
    browserVersion: parsed.version,
    engine: parsed.engine,
    platform,
    osName: osParsed.osName,
    osVersion: osParsed.osVersion,
    userAgent: ua,
    brands: uaData?.brands,
    language,
    languages,
    online,
    cookieEnabled,
    doNotTrack,
    javascriptEnabled,
    hardwareConcurrency,
    deviceMemory,
    colorDepth,
    pixelRatio,
    viewport,
    screen: scr,
    timezone,
    features,
  };
}

const WhatIsMyBrowser: React.FC = () => {
  const [info, setInfo] = useState<BrowserInfo | null>(null);
  const [error, setError] = useState<string>("");
  const [ipError, setIpError] = useState<string>("");

  const refresh = useCallback(() => {
    try {
      setError("");
      const data = collectBrowserInfo();
      setInfo(data);
    } catch (_e) {
      setError("Failed to read browser information.");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Refine Windows 10 vs 11 using UA-CH platformVersion (Chromium only)
  useEffect(() => {
    const uaData = (navigator as any).userAgentData;
    if (!uaData || !uaData.getHighEntropyValues) return;
    (async () => {
      try {
        const { platform, platformVersion } = await uaData.getHighEntropyValues(["platform", "platformVersion"]);
        if (platform === "Windows" && platformVersion) {
          const major = Number(String(platformVersion).split(".")[0]);
          const osName = major >= 13 ? "Windows 11" : "Windows 10";
          setInfo((prev) => (prev ? { ...prev, osName, osVersion: platformVersion } : prev));
        }
      } catch {}
    })();
  }, []);

  // Fetch public IP (best-effort)
  useEffect(() => {
    let aborted = false;
    async function fetchIP() {
      try {
        setIpError("");
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        if (!aborted) setInfo((prev) => (prev ? { ...prev, ipAddress: data.ip } : prev));
      } catch (_e) {
        if (!aborted) setIpError("Could not fetch IP address.");
      }
    }
    fetchIP();
    return () => {
      aborted = true;
    };
  }, []);

  // Detect Flash/Java (legacy) and AdBlock (heuristic)
  useEffect(() => {
    const nav = typeof navigator !== "undefined" ? navigator : ({} as Navigator);
    const hasFlash = (() => {
      try {
        // Modern browsers no longer support Flash; check plugins list for legacy
        const plugins = (nav as any).plugins;
        if (!plugins) return false;
        for (let i = 0; i < plugins.length; i++) {
          const p = plugins[i];
          if (p && /shockwave flash/i.test(p.name)) return true;
        }
      } catch {}
      return false;
    })();

    const hasJava = (() => {
      try {
        if (typeof (nav as any).javaEnabled === "function") return !!(nav as any).javaEnabled();
      } catch {}
      return false;
    })();

    const detectAdBlock = (): boolean => {
      try {
        const bait = document.createElement("div");
        bait.className = "adsbox ad-banner ad adsbygoogle pub_300x250";
        bait.style.position = "absolute";
        bait.style.left = "-9999px";
        bait.style.width = "300px";
        bait.style.height = "250px";
        document.body.appendChild(bait);
        const blocked = bait.offsetParent === null || bait.clientHeight === 0;
        document.body.removeChild(bait);
        return blocked;
      } catch {
        return false;
      }
    };

    setInfo((prev) => (prev ? { ...prev, flashInstalled: hasFlash, javaInstalled: hasJava, adBlockEnabled: detectAdBlock() } : prev));
  }, []);

  const json = useMemo(() => (info ? JSON.stringify(info, null, 2) : ""), [info]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(json);
    } catch (_) {}
  }, [json]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Summary</h3>
                    <div className="rounded-xl bg-black border border-[#222] p-4 text-white/90 text-sm leading-7">
                      <div><span className="text-white/60">Browser:</span> {info?.browserName || "-"} {info?.browserVersion ? `(${info.browserVersion})` : ""}</div>
                      <div><span className="text-white/60">Engine:</span> {info?.engine || "-"}</div>
                      <div><span className="text-white/60">Platform:</span> {info?.platform || "-"}</div>
                      <div><span className="text-white/60">Operating System:</span> {info?.osName || "-"} {info?.osVersion ? `(${info.osVersion})` : ""}</div>
                      <div><span className="text-white/60">Language:</span> {info?.language || "-"}</div>
                      <div><span className="text-white/60">JavaScript enabled:</span> {String(info?.javascriptEnabled) || "-"}</div>
                      <div><span className="text-white/60">Cookies:</span> {info?.cookieEnabled ? "ON" : "OFF"}</div>
                      <div><span className="text-white/60">IP Address:</span> {info?.ipAddress || (ipError ? "Unavailable" : "Loading...")}</div>
                      <div><span className="text-white/60">Flash installed:</span> {info?.flashInstalled ? "Yes" : "No"}</div>
                      <div><span className="text-white/60">Java installed:</span> {info?.javaInstalled ? "Yes" : "No"}</div>
                      <div><span className="text-white/60">AdBlock enabled:</span> {info?.adBlockEnabled ? "Yes" : "No/Unknown"}</div>
                      <div><span className="text-white/60">Online:</span> {String(info?.online)}</div>
                      <div><span className="text-white/60">UA Brands:</span> {info?.brands?.map(b => `${b.brand} ${b.version}`).join(", ") || "-"}</div>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">User Agent</h3>
                    <div className="rounded-xl bg-black border border-[#222] p-4 text-white/80 text-xs break-words">
                      {info?.userAgent || "-"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-black border border-[#222] p-4">
                    <h4 className="text-white font-medium mb-2">Environment</h4>
                    <div className="text-white/80 text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>Browser size: {info?.viewport ? `${info.viewport.width}×${info.viewport.height}` : "-"}</div>
                      <div>Screen size: {info?.screen ? `${info.screen.width}×${info.screen.height}` : "-"}</div>
                      <div>Color depth: {info?.colorDepth ? `${info.colorDepth} bit` : "-"}</div>
                      <div>Pixel ratio: {info?.pixelRatio ?? "-"}</div>
                      <div>CPUs: {info?.hardwareConcurrency ?? "-"}</div>
                      <div>Memory: {info?.deviceMemory ? `${info.deviceMemory} GB` : "-"}</div>
                      <div>Timezone: {info?.timezone ?? "-"}</div>
                      <div>Do Not Track: {info?.doNotTrack ?? "-"}</div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-black border border-[#222] p-4">
                    <h4 className="text-white font-medium mb-2">Features</h4>
                    <div className="text-white/80 text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                      {info && Object.entries(info.features).map(([k, v]) => (
                        <div key={k}>{k}: {typeof v === "string" ? v : String(v)}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">All Details (JSON)</h3>
                    {error && <div className="mb-2 text-sm text-red-400">{error}</div>}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={json}
                        placeholder="Details will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {json && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          title="Copy"
                          className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                            <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                            <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={refresh}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Refresh
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

export default WhatIsMyBrowser;
