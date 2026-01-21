"use client";
import React, { useMemo, useRef, useState } from "react";

type Issue = { type: "error" | "warning"; message: string; selector?: string };

const runValidation = (html: string): Issue[] => {
  const issues: Issue[] = [];
  if (!html.trim()) return issues;

  // 1) Check doctype
  if (!/^\s*<!doctype\s+html/i.test(html)) {
    issues.push({ type: "warning", message: "Missing <!doctype html> at the top" });
  }

  // 2) Parse using DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // 3) Find images without alt
  doc.querySelectorAll("img").forEach((img, i) => {
    if (!img.hasAttribute("alt")) {
      issues.push({ type: "warning", message: "<img> missing alt attribute", selector: `img:nth-of-type(${i + 1})` });
    }
  });

  // 4) Links with empty href
  doc.querySelectorAll("a").forEach((a, i) => {
    const href = a.getAttribute("href");
    if (!href || href.trim() === "#") {
      issues.push({ type: "warning", message: "<a> has empty or placeholder href", selector: `a:nth-of-type(${i + 1})` });
    }
  });

  // 5) Elements with duplicated IDs
  const ids: Record<string, number> = {};
  doc.querySelectorAll("[id]").forEach((el) => {
    const id = el.getAttribute("id") || "";
    ids[id] = (ids[id] || 0) + 1;
  });
  Object.entries(ids).forEach(([id, count]) => {
    if (count > 1) issues.push({ type: "error", message: `Duplicate id="${id}" found ${count} times` });
  });

  // 6) Deprecated tags
  const deprecated = ["center", "font", "marquee", "bgsound"];
  deprecated.forEach((tag) => {
    const found = doc.getElementsByTagName(tag);
    if (found.length) issues.push({ type: "warning", message: `Deprecated <${tag}> tag used (${found.length} times)` });
  });

  return issues;
};

const HTMLValidator: React.FC = () => {
  const [html, setHtml] = useState<string>("<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><title>Sample</title></head><body><h1>Hello</h1><img src=\"image.png\"><a href=\"#\">Link</a></body></html>");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const summary = useMemo(() => {
    const errors = issues.filter((i) => i.type === "error").length;
    const warnings = issues.filter((i) => i.type === "warning").length;
    return { errors, warnings };
  }, [issues]);

  const onValidate = () => {
    setIssues(runValidation(html));
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setHtml(String(reader.result || ""));
    reader.readAsText(file);
    e.currentTarget.value = "";
  };

  const copyReport = async () => {
    const text = issues.map((i) => `${i.type.toUpperCase()}: ${i.message}${i.selector ? ` (${i.selector})` : ""}`).join("\n");
    await navigator.clipboard.writeText(text || "No issues found");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const downloadReport = () => {
    const text = issues.map((i) => `${i.type.toUpperCase()}: ${i.message}${i.selector ? ` (${i.selector})` : ""}`).join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "html-validation-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <div className="md:w-[950px] mx-auto p-8">
        <div className="bg-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">HTML Validator</h2>

          <div className="flex items-center gap-2">
            <input ref={fileRef} type="file" accept=".html,.htm,.txt" onChange={onUpload} className="hidden" />
            <label htmlFor="html-upload" className="hidden" />
            <button onClick={() => fileRef.current?.click()} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-white text-sm font-bold">Upload HTML</button>
            <button onClick={onValidate} className="px-3 py-2 bg-primary text-black rounded-lg text-sm font-bold">Validate</button>
            <button onClick={copyReport} className={`px-3 py-2 bg-primary rounded-lg hover:bg-primary/80 text-black text-sm font-bold ${copied ? "w-28" : "w-28"}`}>{copied ? "Copied!" : "Copy Report"}</button>
            <button onClick={downloadReport} className="px-3 py-2 bg-primary rounded-lg hover:bg-primary/80 text-black text-sm font-bold">Download Report</button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">HTML</label>
            <textarea value={html} onChange={(e) => setHtml(e.target.value)} rows={12} className="w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm" placeholder="Paste HTML to validate..." />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Results</h3>
            <div className="flex items-center gap-3 text-sm mb-3">
              <span className="px-2 py-1 rounded bg-[#FF5454] text-white">Errors: {summary.errors}</span>
              <span className="px-2 py-1 rounded bg-[#FFD700] text-black">Warnings: {summary.warnings}</span>
            </div>
            {issues.length ? (
              <ul className="space-y-2">
                {issues.map((i, idx) => (
                  <li key={idx} className={`px-3 py-2 rounded-lg border ${i.type === "error" ? "border-[#FF5454] bg-[#FF5454]/20" : "border-[#FFD700] bg-[#FFD700]/20"}`}>
                    <span className="font-semibold mr-2 uppercase text-sm">{i.type}</span>
                    <span>{i.message}</span>
                    {i.selector && <span className="ml-2 text-white/80 text-sm">{i.selector}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/70 text-sm">No issues found yet. Paste HTML and run Validate.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HTMLValidator;