"use client";
import React, { useMemo, useState } from "react";

type IssueType = "error" | "warning";
interface Issue { line: number; column: number; message: string; type: IssueType }

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

// Naive CSS validator: parses with browser by injecting into a stylesheet and reading rules length
const validateCss = (css: string): Issue[] => {
  const issues: Issue[] = [];
  const style = document.createElement("style");
  style.type = "text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch {
    // Fallback for old IE; not relevant but keep for completeness
    (style as any).styleSheet.cssText = css;
  }
  document.head.appendChild(style);
  try {
    const sheet = style.sheet as CSSStyleSheet | null;
    if (!sheet) return issues;
    // Walk rules and detect empty/invalid blocks heuristically
    // Browsers drop invalid rules; track lines that failed by comparing braces counts
    const lines = css.replace(/\r\n?/g, "\n").split("\n");
    const openBraces: number[] = [];
    lines.forEach((line, idx) => {
      const l = idx + 1;
      let diff = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (diff > 0) openBraces.push(l);
      while (diff < 0 && openBraces.length > 0) { openBraces.pop(); diff++; }
      if (/:[^;\}]*$/.test(line.trim())) {
        issues.push({ line: l, column: 1, message: "Missing semicolon at end of declaration.", type: "warning" });
      }
    });
    if (openBraces.length > 0) {
      openBraces.forEach((l) => issues.push({ line: l, column: 1, message: "Unclosed block (missing }).", type: "error" }));
    }
  } catch (e: any) {
    issues.push({ line: 1, column: 1, message: e?.message || "Invalid CSS", type: "error" });
  } finally {
    document.head.removeChild(style);
  }
  return issues;
};

const Badge = ({ type }: { type: IssueType }) => (
  <span className={`px-2 py-0.5 rounded text-xs ${type === "error" ? "bg-red/20 text-red border border-red/30" : "bg-[#FFFF00]/20 text-[#FFFF00] border border-[#FFFF00]/30"}`}>{type}</span>
);

const CssValidator = () => {
  const [css, setCss] = useState<string>(`/* Paste CSS here */\nbody {\n  font-family: system-ui\n  color: #222;\n}`);
  const issues = useMemo(() => validateCss(css), [css]);
  const hasErrors = issues.some((i) => i.type === "error");

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">CSS</h3>
                <textarea value={css} onChange={(e) => setCss(e.target.value)} className="w-full h-80 p-4 bg-black/40 border border-white/10 rounded font-mono text-sm" spellCheck={false} />
                <div className={`px-3 py-2 rounded border ${hasErrors ? "bg-red/20 border-red/30" : "bg-primary/20 border-primary/30"}`}>
                  {hasErrors ? "Errors found." : "No blocking errors found."}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Issues</h3>
                <div className="bg-black/20 border border-white/10 rounded p-3 max-h-80 overflow-y-auto text-sm">
                  {issues.length === 0 ? (
                    <div className="text-white/60">No issues found.</div>
                  ) : (
                    issues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-b-0">
                        <Badge type={issue.type} />
                        <div className="flex-1">
                          <div className="text-white/90">Line {issue.line}, Col {issue.column}</div>
                          <div className="text-white/70">{issue.message}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-black/20 border border-white/10 rounded p-3 text-sm space-y-2">
                  <h3 className="font-semibold">Tips</h3>
                  <ul className="list-disc pl-5 text-white/80 space-y-1">
                    <li>End each declaration with a semicolon <Cmd>;</Cmd></li>
                    <li>Balance braces <Cmd>{"{"}</Cmd> and <Cmd>{"}"}</Cmd></li>
                    <li>Use valid property names and values</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssValidator;


