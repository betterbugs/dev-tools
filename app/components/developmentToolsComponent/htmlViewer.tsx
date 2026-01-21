"use client";
import React, { useState } from "react";

const HtmlViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [html, setHtml] = useState<string>("<h1>Hello, Html Viewer</h1>\n<p>Edit the HTML to see updates here.</p>");
  const [css, setCss] = useState<string>("body{font-family:system-ui;padding:16px}\niframe, img{max-width:100%}");
  const [js, setJs] = useState<string>("console.log('Viewer ready');");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {}
  };

  const clear = () => {
    if (activeTab === "html") setHtml("");
    if (activeTab === "css") setCss("");
    if (activeTab === "js") setJs("");
  };

  const download = () => {
    const doc = buildDocument();
    const blob = new Blob([doc], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "html-viewer.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // reset
    e.currentTarget.value = "";
  };

  const buildDocument = () => {
    return `<!doctype html>\n<html><head><meta charset='utf-8'><title>Preview</title><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">HTML Viewer</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-white/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-4 text-white/80">
              <button onClick={() => setActiveTab("html")} className={`${activeTab==='html' ? 'border-b-2 border-primary text-white' : ''}`}>HTML</button>
              <button onClick={() => setActiveTab("css")} className={`${activeTab==='css' ? 'border-b-2 border-primary text-white' : ''}`}>CSS</button>
              <button onClick={() => setActiveTab("js")} className={`${activeTab==='js' ? 'border-b-2 border-primary text-white' : ''}`}>JS</button>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <input type="file" accept={activeTab==='html'?'.html,.htm,.txt':'text/plain,.css,.js'} onChange={onUpload} className="hidden" id="upload-file" />
              <label htmlFor="upload-file" className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer">Upload</label>
              <button onClick={copy} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20">Copy</button>
              <button onClick={clear} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20">Clear</button>
              <button onClick={download} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20">Download</button>
            </div>
          </div>
          {activeTab === 'html' && (
            <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="w-full h-[440px] px-3 py-2 bg-black/60 border border-white/20 rounded-lg font-mono text-sm text-white" placeholder="Type or paste HTML here" />
          )}
          {activeTab === 'css' && (
            <textarea value={css} onChange={(e) => setCss(e.target.value)} className="w-full h-[440px] px-3 py-2 bg-black/60 border border-white/20 rounded-lg font-mono text-sm text-white" placeholder="Type or paste CSS here" />
          )}
          {activeTab === 'js' && (
            <textarea value={js} onChange={(e) => setJs(e.target.value)} className="w-full h-[440px] px-3 py-2 bg-black/60 border border-white/20 rounded-lg font-mono text-sm text-white" placeholder="Type or paste JS here" />
          )}
        </div>

        {/* Live Preview */}
        <div className="bg-white/5 rounded-xl p-4">
          <iframe
            title="Live Preview"
            className="w-full h-[500px] rounded-lg border border-white/10 bg-white"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            srcDoc={buildDocument()}
          />
        </div>
      </div>
    </div>
  );
};

export default HtmlViewer;