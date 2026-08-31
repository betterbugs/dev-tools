"use client";

import React, { useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { trackEvent, PAGE_TYPE, getRuntimePlatform } from "@/app/libs/analytics";

const DEFAULT_HTML =
  "<h1>Hello, HTML Viewer</h1>\n<p>Edit the HTML to see updates here.</p>";
const DEFAULT_CSS =
  "body{font-family:system-ui;padding:16px}\niframe, img{max-width:100%}";
const DEFAULT_JS = "console.log('Viewer ready');";

const HtmlViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [html, setHtml] = useState<string>(DEFAULT_HTML);
  const [css, setCss] = useState<string>(DEFAULT_CSS);
  const [js, setJs] = useState<string>(DEFAULT_JS);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editorValue =
    activeTab === "html" ? html : activeTab === "css" ? css : js;
  const setEditorValue =
    activeTab === "html" ? setHtml : activeTab === "css" ? setCss : setJs;

  const tabLabel =
    activeTab === "html"
      ? "HTML"
      : activeTab === "css"
        ? "CSS"
        : "JavaScript";

  const fileAccept =
    activeTab === "html" ? ".html,.htm,.txt,text/html" : "text/plain,.css,.js";

  const buildDocument = () => {
    return `<!doctype html>\n<html><head><meta charset='utf-8'><title>Preview</title><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      trackEvent("dev_tool_used", {
        page_type: PAGE_TYPE,
        platform: getRuntimePlatform(),
        tool_name: "HTML Viewer Online",
        tool_action: "Copy",
      });
    } catch {
      // ignore
    }
  };

  const clearCurrent = () => {
    setEditorValue("");
  };

  const loadSample = () => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
    setActiveTab("html");
  };

  const download = () => {
    const doc = buildDocument();
    const blob = new Blob([doc], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "html-viewer.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePickFile = () => fileInputRef.current?.click();

  const onUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      if (activeTab === "html") setHtml(text);
      if (activeTab === "css") setCss(text);
      if (activeTab === "js") setJs(text);
    };
    reader.readAsText(file);
    e.currentTarget.value = "";
  };

  const tabBtn = (tab: "html" | "css" | "js", label: string) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`px-1 pb-2 -mb-px text-sm font-semibold bg-transparent transition-colors focus:outline-none focus-visible:outline-none ${
        activeTab === tab
          ? "border-b-2 border-primary text-white"
          : "border-b-2 border-transparent text-white/60 hover:text-white/90"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className="w-full">
      <div className="md:mt-8 mt-4">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-5 md:p-8">
          <div className="md:w-[1000px] mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                    onClick={clearCurrent}
                    className="px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Editor */}
                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <div className="flex flex-wrap items-center gap-6 border-b border-white/10 mb-3">
                    {tabBtn("html", "HTML")}
                    {tabBtn("css", "CSS")}
                    {tabBtn("js", "JS")}
                  </div>

                  <label
                    htmlFor="bb-html-viewer-editor"
                    className="block text-white/80 text-sm font-medium mb-2"
                  >
                    {tabLabel} editor
                  </label>

                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={fileAccept}
                      className="hidden"
                      onChange={onUpload}
                    />
                    <textarea
                      id="bb-html-viewer-editor"
                      value={editorValue}
                      onChange={(e) => setEditorValue(e.target.value)}
                      spellCheck={false}
                      rows={16}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[360px] bg-black/40 border border-[#222222] rounded-lg px-3 py-3 pr-12 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/60`}
                      placeholder={
                        activeTab === "html"
                          ? "Type or paste HTML here"
                          : activeTab === "css"
                            ? "Type or paste CSS here"
                            : "Type or paste JavaScript here"
                      }
                      aria-label={`${tabLabel} editor`}
                    />
                    {editorValue && (
                      <button
                        type="button"
                        onClick={clearCurrent}
                        title="Clear"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition disabled:opacity-60"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-white"
                          aria-hidden
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={copy}
                      disabled={!editorValue}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-2.5 !px-4 rounded-xl w-full text-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={handlePickFile}
                      className="!py-3 !px-4 rounded-xl w-full text-sm font-bold bg-primary hover:opacity-90 text-black focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={download}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-3 !px-4 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    >
                      Download
                    </button>
                  </div>

                  <p className="text-xs text-white/50 mt-3">
                    Preview runs HTML, CSS, and JS together in a sandboxed iframe.
                    User scripts cannot access the parent page.
                  </p>
                </div>

                {/* Live preview */}
                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <div className="mb-3">
                    <div className="text-white/90 text-sm font-medium">
                      Live preview
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">
                      Sandboxed iframe (same-origin scripts only)
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#222222] overflow-hidden bg-white">
                    <iframe
                      title="Live preview"
                      className="w-full min-h-[420px] h-[min(70vh,520px)] bg-white"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      srcDoc={buildDocument()}
                    />
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

export default HtmlViewer;
