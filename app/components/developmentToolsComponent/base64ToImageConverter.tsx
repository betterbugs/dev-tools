"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const MAX_DECODED_BYTES = 10 * 1024 * 1024;

/** 1×1 PNG — valid sample for “Sample” button */
const SAMPLE_RAW_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

const MIME_OPTIONS: { value: string; label: string }[] = [
  { value: "image/png", label: "PNG (image/png)" },
  { value: "image/jpeg", label: "JPEG (image/jpeg)" },
  { value: "image/webp", label: "WebP (image/webp)" },
  { value: "image/gif", label: "GIF (image/gif)" },
  { value: "image/svg+xml", label: "SVG (image/svg+xml)" },
  { value: "image/bmp", label: "BMP (image/bmp)" },
  { value: "image/x-icon", label: "ICO (image/x-icon)" },
];

const mimeToExtension = (mime: string): string => {
  const m = mime.toLowerCase();
  if (m.includes("jpeg")) return "jpg";
  if (m.includes("png")) return "png";
  if (m.includes("webp")) return "webp";
  if (m.includes("gif")) return "gif";
  if (m.includes("svg")) return "svg";
  if (m.includes("bmp")) return "bmp";
  if (m.includes("icon")) return "ico";
  return "img";
};

const tryBuildDataUrl = (
  raw: string,
  fallbackMime: string
): { dataUrl: string | null; parseError: string | null } => {
  const trimmed = raw.trim();
  if (!trimmed) return { dataUrl: null, parseError: null };

  let mime = fallbackMime.toLowerCase();
  let b64 = "";

  const dataUri = trimmed.match(
    /^data:(image\/[a-z0-9.+-]+);base64,([\s\S]*)$/i
  );
  if (dataUri) {
    mime = dataUri[1].toLowerCase();
    b64 = dataUri[2].replace(/\s/g, "");
  } else {
    b64 = trimmed.replace(/\s/g, "");
    // URL-safe Base64 → standard
    if (!b64.includes("+") && !b64.includes("/") && /[-_]/.test(b64)) {
      b64 = b64.replace(/-/g, "+").replace(/_/g, "/");
    }
  }

  if (!b64) return { dataUrl: null, parseError: "No Base64 payload found." };

  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);

  let binaryLength = 0;
  try {
    const bin = atob(b64);
    binaryLength = bin.length;
  } catch {
    return {
      dataUrl: null,
      parseError:
        "Could not decode Base64. Remove extra text, fix padding, or paste a full data:image/...;base64,... URI.",
    };
  }

  if (binaryLength > MAX_DECODED_BYTES) {
    return {
      dataUrl: null,
      parseError: `Decoded size would exceed ${MAX_DECODED_BYTES / (1024 * 1024)} MB.`,
    };
  }

  return { dataUrl: `data:${mime};base64,${b64}`, parseError: null };
};

const Base64ToImageConverter: React.FC = () => {
  const [input, setInput] = useState("");
  const [mimeFallback, setMimeFallback] = useState("image/png");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [validDataUrl, setValidDataUrl] = useState<string | null>(null);
  const [resolvedMime, setResolvedMime] = useState<string>("image/png");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const built = useMemo(
    () => tryBuildDataUrl(input, mimeFallback),
    [input, mimeFallback]
  );

  useEffect(() => {
    if (built.parseError || !built.dataUrl) {
      setValidDataUrl(null);
      setLoadError(null);
      return;
    }

    let cancelled = false;
    const dataUrl = built.dataUrl;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setValidDataUrl(dataUrl);
      setLoadError(null);
      const mimeMatch = dataUrl.match(/^data:(image\/[^;]+);/i);
      setResolvedMime(mimeMatch?.[1]?.toLowerCase() ?? mimeFallback);
    };
    img.onerror = () => {
      if (cancelled) return;
      setValidDataUrl(null);
      setLoadError(
        "Decoded bytes are not a displayable image. Try another MIME type if you pasted raw Base64 without a Data URI."
      );
    };
    img.src = dataUrl;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
      img.src = "";
    };
  }, [built.dataUrl, built.parseError, mimeFallback]);

  const clearAll = () => {
    setInput("");
    setLoadError(null);
    setValidDataUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const loadSample = () => {
    setMimeFallback("image/png");
    setInput(SAMPLE_RAW_BASE64);
  };

  const onPickFile = () => fileRef.current?.click();

  const onFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      setInput(text);
    } finally {
      e.target.value = "";
    }
  };

  const download = () => {
    if (!validDataUrl) return;
    const ext = mimeToExtension(resolvedMime);
    const a = document.createElement("a");
    a.href = validDataUrl;
    a.download = `decoded-image.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const copyInput = async () => {
    if (!input.trim()) return;
    try {
      await navigator.clipboard.writeText(input);
    } catch {
      // ignore
    }
  };

  const displayError = built.parseError || loadError;

  return (
    <section className="w-full">
      <div className="md:mt-8 mt-4">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-5 md:p-8">
          <div className="md:w-[1000px] mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={loadSample}
                  className="px-3 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                >
                  Sample
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                >
                  Clear
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <label
                    htmlFor="bb-b64-to-img-input"
                    className="block text-white/80 text-sm font-medium mb-2"
                  >
                    Base64 or Data URI
                  </label>
                  <p className="text-white/50 text-xs mb-2">
                    Paste a full{" "}
                    <span className="text-white/70">data:image/...;base64,...</span> string,
                    or raw Base64 and choose the image type below.
                  </p>

                  <textarea
                    id="bb-b64-to-img-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    spellCheck={false}
                    rows={14}
                    placeholder='e.g. data:image/png;base64,iVBORw0KGgo...  or paste raw Base64'
                    className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[280px] bg-black/40 border border-[#222222] rounded-lg px-3 py-3 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    aria-label="Base64 or Data URI input"
                  />

                  <div className="mt-3">
                    <label
                      htmlFor="bb-b64-mime"
                      className="block text-white/80 text-sm font-medium mb-1"
                    >
                      MIME type (for raw Base64 only)
                    </label>
                    <select
                      id="bb-b64-mime"
                      value={mimeFallback}
                      onChange={(e) => setMimeFallback(e.target.value)}
                      className="w-full bg-black/40 border border-[#222222] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      {MIME_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept=".txt,text/plain"
                    className="hidden"
                    onChange={onFile}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={onPickFile}
                      className="!py-3 !px-4 rounded-xl w-full text-sm font-bold bg-primary hover:opacity-90 text-black focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Load .txt file
                    </button>
                    <button
                      type="button"
                      onClick={copyInput}
                      disabled={!input.trim()}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-2.5 !px-4 rounded-xl w-full text-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    >
                      Copy input
                    </button>
                  </div>

                  {displayError && (
                    <p className="text-sm text-red-400 mt-3" role="alert">
                      {displayError}
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <div className="text-white/80 text-sm font-medium mb-2">
                    Preview
                  </div>
                  <div className="rounded-lg border border-[#222222] bg-black/40 p-3 flex items-center justify-center min-h-[280px] max-h-[420px] overflow-hidden">
                    {validDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- user-generated data URL
                      <img
                        src={validDataUrl}
                        alt="Decoded from Base64"
                        className="max-w-full max-h-[380px] object-contain"
                      />
                    ) : (
                      <p className="text-white/50 text-sm text-center px-4">
                        {input.trim()
                          ? "Fix errors above or adjust MIME type to see a preview."
                          : "Paste Base64 or a Data URI to preview the image here."}
                      </p>
                    )}
                  </div>

                  {validDataUrl && (
                    <p className="text-xs text-white/50 mt-2 break-all">
                      Detected: <span className="text-white/70">{resolvedMime}</span>
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={download}
                      disabled={!validDataUrl}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-3 !px-4 rounded-xl w-full text-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    >
                      Download image
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white text-sm font-semibold w-full focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Clear all
                    </button>
                  </div>

                  <p className="text-xs text-white/50 mt-3">
                    Decoding runs in your browser; nothing is sent to a server. Very large
                    strings may slow the tab briefly while decoding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Base64ToImageConverter;
