"use client";

import React, { useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { trackEvent, PAGE_TYPE, getRuntimePlatform } from "@/app/libs/analytics";

const SAMPLE_SVG = `<svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7c3aed"/>
      <stop offset="1" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect x="14" y="14" width="132" height="132" rx="26" fill="url(#g)" opacity="0.9"/>
  <path d="M46 92c12 22 56 22 68 0" fill="none" stroke="white" stroke-width="10" stroke-linecap="round"/>
  <circle cx="58" cy="66" r="8" fill="white"/>
  <circle cx="102" cy="66" r="8" fill="white"/>
</svg>`;

type SvgInfo = {
  width: string | null;
  height: string | null;
  viewBox: string | null;
};

const extractSvgInfo = (svgMarkup: string): SvgInfo => {
  const width = svgMarkup.match(/\bwidth="([^"]+)"/i)?.[1] ?? null;
  const height = svgMarkup.match(/\bheight="([^"]+)"/i)?.[1] ?? null;
  const viewBox = svgMarkup.match(/\bviewBox="([^"]+)"/i)?.[1] ?? null;
  return { width, height, viewBox };
};

const formatXml = (xml: string) => {
  const normalized = xml
    .replace(/\r\n/g, "\n")
    .replace(/>\s+</g, ">\n<")
    .trim();

  let indent = 0;
  const lines = normalized.split("\n");
  const out: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (/^<\/.+>/.test(trimmed)) indent = Math.max(0, indent - 1);
    out.push(`${"  ".repeat(indent)}${trimmed}`);
    if (/^<[^!?/][^>]*[^/]>$/.test(trimmed)) indent += 1;
  }

  return out.join("\n");
};

const prettifySvgMarkup = (raw: string): { pretty: string; error: string } => {
  const trimmed = raw.trim();
  if (!trimmed) return { pretty: "", error: "" };
  if (!trimmed.includes("<svg")) return { pretty: raw, error: "Invalid SVG: must include an <svg> tag." };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(trimmed, "image/svg+xml");
    const parseError = doc.getElementsByTagName("parsererror")[0];
    if (parseError) return { pretty: raw, error: "Invalid SVG: could not parse markup." };
    const svgEl = doc.querySelector("svg") || (doc.documentElement?.tagName?.toLowerCase() === "svg" ? doc.documentElement : null);
    if (!svgEl) return { pretty: raw, error: "Invalid SVG: root element is not <svg>." };

    const serializer = new XMLSerializer();
    const serialized = serializer.serializeToString(svgEl);
    return { pretty: formatXml(serialized), error: "" };
  } catch {
    return { pretty: raw, error: "Invalid SVG: could not parse markup." };
  }
};

const sanitizeSvg = (raw: string): { svg: string; error: string } => {
  const trimmed = raw.trim();
  if (!trimmed) return { svg: "", error: "" };
  if (!trimmed.includes("<svg")) return { svg: "", error: "Invalid SVG: must include an <svg> tag." };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(trimmed, "image/svg+xml");
    const parseError = doc.getElementsByTagName("parsererror")[0];
    if (parseError) {
      return { svg: "", error: "Invalid SVG: could not parse markup." };
    }

    const svgEl = (doc.documentElement?.tagName?.toLowerCase() === "svg" ? doc.documentElement : doc.querySelector("svg")) as
      | SVGSVGElement
      | null;
    if (!svgEl) return { svg: "", error: "Invalid SVG: root element is not <svg>." };

    // Remove dangerous nodes
    doc.querySelectorAll("script, foreignObject").forEach((n) => n.remove());

    // Remove inline event handlers + javascript: links
    doc.querySelectorAll("*").forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = String(attr.value ?? "");
        if (name.startsWith("on")) el.removeAttribute(attr.name);

        if (name === "href" || name === "xlink:href") {
          if (/^\s*javascript:/i.test(value) || /^\s*data:text\/html/i.test(value)) {
            el.removeAttribute(attr.name);
          }
        }
      });
    });

    // Force preview-friendly sizing: contain-fit in preview box
    if (!svgEl.getAttribute("preserveAspectRatio")) {
      svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }
    svgEl.setAttribute("width", "100%");
    svgEl.setAttribute("height", "100%");
    const prevStyle = svgEl.getAttribute("style") || "";
    const nextStyle = [prevStyle, "display:block", "max-width:100%", "max-height:100%"]
      .filter(Boolean)
      .join(";");
    svgEl.setAttribute("style", nextStyle);

    const serializer = new XMLSerializer();
    const svg = serializer.serializeToString(svgEl);
    return { svg, error: "" };
  } catch {
    return { svg: "", error: "Invalid SVG: could not parse markup." };
  }
};

const SvgViewer = () => {
  const [svgInput, setSvgInput] = useState<string>(SAMPLE_SVG);
  const [transparentBg, setTransparentBg] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sanitized = useMemo(() => {
    const res = sanitizeSvg(svgInput);
    setError(res.error);
    return res.svg;
  }, [svgInput]);

  const info = useMemo(() => (sanitized ? extractSvgInfo(sanitized) : { width: null, height: null, viewBox: null }), [
    sanitized,
  ]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent("dev_tool_used", {
        page_type: PAGE_TYPE,
        platform: getRuntimePlatform(),
        tool_name: "SVG Viewer Online",
        tool_action: "Copy",
      });
    } catch {
      // ignore
    }
  };

  const downloadSvg = () => {
    if (!sanitized) return;
    const blob = new Blob([sanitized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const onPickFile = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const res = prettifySvgMarkup(text);
      setSvgInput(res.pretty);
      setError(res.error);
    } finally {
      e.target.value = "";
    }
  };

  const onPastePrettify: React.ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
    const pasted = e.clipboardData?.getData("text/plain") ?? "";
    if (!pasted) return;
    if (!pasted.includes("<svg")) return;
    e.preventDefault();
    const res = prettifySvgMarkup(pasted);
    setSvgInput(res.pretty);
    setError(res.error);
  };

  return (
    <section className="w-full">
      <div className="md:mt-8 mt-4">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-5 md:p-8">
          <div className="md:w-[1000px] mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSvgInput(SAMPLE_SVG)}
                    className="px-3 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                  >
                    Sample
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg,image/svg+xml"
                    className="hidden"
                    onChange={onFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => setSvgInput("")}
                    className="px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Editor */}
                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <label htmlFor="bb-svg-input" className="block text-white/80 text-sm font-medium mb-2">
                    SVG markup
                  </label>
                  <textarea
                    id="bb-svg-input"
                    value={svgInput}
                    onChange={(e) => setSvgInput(e.target.value)}
                    onPaste={onPastePrettify}
                    rows={12}
                    spellCheck={false}
                    className="w-full bg-black/40 border border-[#222222] rounded-lg px-3 py-3 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/60 hide-scrollbar"
                    placeholder="<svg ...>...</svg>"
                    aria-label="SVG markup input"
                  />
                  {error && <div className="text-sm text-red-400 mt-2">{error}</div>}

                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-white/70 select-none">Options</summary>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-2 text-sm text-white/80">
                        <input
                          type="checkbox"
                          checked={transparentBg}
                          onChange={(e) => setTransparentBg(e.target.checked)}
                        />
                        Transparent background
                      </label>
                    </div>
                  </details>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => copy(sanitized || "")}
                      disabled={!sanitized}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-2.5 !px-4 rounded-xl w-full text-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    >
                      Copy SVG
                    </button>
                    <button
                      type="button"
                      onClick={onPickFile}
                      className="!py-3 !px-4 rounded-xl w-full text-sm font-bold bg-primary hover:opacity-90 text-black disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={downloadSvg}
                      disabled={!sanitized}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-3 !px-4 rounded-xl w-full text-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    >
                      Download
                    </button>
                  </div>

                  {sanitized && (
                    <div className="text-xs text-white/60 mt-3 break-words">
                      <span className="text-white/80">Detected:</span>{" "}
                      {info.width ? `width=${info.width}` : "width=—"} ·{" "}
                      {info.height ? `height=${info.height}` : "height=—"} ·{" "}
                      {info.viewBox ? `viewBox="${info.viewBox}"` : "viewBox=—"}
                    </div>
                  )}
                </div>

                {/* Preview */}
                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-white/90 text-sm font-medium">Preview</div>
                      <div className="text-white/50 text-xs">Sanitized before render (scripts/foreignObject removed)</div>
                    </div>
                  </div>

                  <div
                    className="rounded-lg border border-[#222222] overflow-hidden"
                    style={{
                      minHeight: 360,
                      background: transparentBg
                        ? "linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.06) 75%)"
                        : "rgba(0,0,0,0.45)",
                      backgroundSize: transparentBg ? "22px 22px" : undefined,
                      backgroundPosition: transparentBg ? "0 0, 0 11px, 11px -11px, -11px 0px" : undefined,
                    }}
                    aria-label="SVG preview"
                  >
                    <div
                      className="w-full h-full p-4"
                      style={{
                        minHeight: 360,
                        height: 360,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {sanitized && !error ? (
                        <div
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                          dangerouslySetInnerHTML={{ __html: sanitized }}
                        />
                      ) : (
                        <div className="text-white/60 text-sm">Paste a valid SVG to see a preview.</div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-white/50 mt-3">
                    Need React/CSS output? Use the <span className="text-white/70">SVG to React/CSS Utility</span> tool.
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

export default SvgViewer;