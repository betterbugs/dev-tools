"use client";
import React, { useMemo, useState } from "react";

type IssueType = "error" | "warning";
interface Issue { line: number; column: number; message: string; type: IssueType }

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

// Very lightweight JS syntax check using Function constructor
const checkSyntax = (code: string): Issue[] => {
  try {
    // Wrap in function to avoid executing top-level code
    // eslint-disable-next-line no-new-func
    new Function(code);
    return [];
  } catch (e: any) {
    const msg: string = e?.message || "Syntax error";
    // Try extract line/column if present "line X" or ":X:Y"
    let line = 1, column = 1;
    const m1 = msg.match(/<anonymous>:(\d+):(\d+)/);
    if (m1) { line = parseInt(m1[1], 10); column = parseInt(m1[2], 10); }
    return [{ line, column, message: msg, type: "error" }];
  }
};

// Simple heuristics (not full ESLint) for common pitfalls
const basicLint = (code: string): Issue[] => {
  const issues: Issue[] = [];
  const lines = code.replace(/\r\n?/g, "\n").split("\n");
  lines.forEach((lineText, idx) => {
    const line = idx + 1;
    if (/==[^=]/.test(lineText) || /[^!]==[^=]/.test(lineText)) {
      issues.push({ line, column: Math.max(1, lineText.indexOf("==") + 1), message: "Use strict equality (===) instead of ==.", type: "warning" });
    }
    if (/console\.log\(/.test(lineText)) {
      issues.push({ line, column: Math.max(1, lineText.indexOf("console.log(") + 1), message: "console.log found. Remove in production.", type: "warning" });
    }
    if (/var\s+/.test(lineText)) {
      issues.push({ line, column: Math.max(1, lineText.indexOf("var ") + 1), message: "Prefer let/const over var.", type: "warning" });
    }
    if (/function\s*\([^)]+\)\s*\{/.test(lineText) && !/use strict/.test(code)) {
      // hint once
    }
  });
  // No semicolon heuristic (light): warn for lines ending with identifiers/strings/paren
  lines.forEach((lineText, idx) => {
    const trimmed = lineText.trim();
    if (!trimmed) return;
    if (/[a-zA-Z0-9_'"\)\]]$/.test(trimmed) && !/[;{]$/.test(trimmed)) {
      issues.push({ line: idx + 1, column: Math.max(1, trimmed.length), message: "Consider adding semicolons consistently.", type: "warning" });
    }
  });
  return issues;
};

const Badge = ({ type }: { type: IssueType }) => (
  <span className={`px-2 py-0.5 rounded text-xs ${type === "error" ? "bg-red/20 text-red border border-red/30" : "bg-[#FFFF00]/20 text-[#FFFF00] border border-[#FFFF00]/30"}`}>{type}</span>
);

const JavaScriptValidatorLinter = () => {
  const [code, setCode] = useState<string>("const add = (a, b) => a + b\nconsole.log(add(2,3))");
  const [autoLint, setAutoLint] = useState(true);

  const syntaxIssues = useMemo(() => checkSyntax(code), [code]);
  const lintIssues = useMemo(() => (autoLint ? basicLint(code) : []), [code, autoLint]);
  const hasErrors = syntaxIssues.length > 0;

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto space-y-6">
            <div className="flex items-center justify-end">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={autoLint} onChange={(e) => setAutoLint(e.target.checked)} className="rounded" /> Auto Lint
              </label>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">Code</h3>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-80 p-4 bg-black/40 border border-white/10 rounded font-mono text-sm" spellCheck={false} />
                <div className={`px-3 py-2 rounded border ${hasErrors ? "bg-red/20 border-red/30" : "bg-primary/20 border-primary/30"}`}>
                  {hasErrors ? "Syntax errors detected." : "No syntax errors."}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Issues</h3>
                <div className="bg-black/20 border border-white/10 rounded p-3 max-h-80 overflow-y-auto text-sm">
                  {[...syntaxIssues, ...lintIssues].length === 0 ? (
                    <div className="text-white/60">No issues found.</div>
                  ) : (
                    [...syntaxIssues, ...lintIssues].map((issue, idx) => (
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
                    <li>Use <Cmd>===</Cmd> and <Cmd>!==</Cmd> for comparisons</li>
                    <li>Prefer <Cmd>const</Cmd>/<Cmd>let</Cmd> over <Cmd>var</Cmd></li>
                    <li>Remove <Cmd>console.log</Cmd> in production code</li>
                    <li>Consider consistent semicolons and trailing commas</li>
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

export default JavaScriptValidatorLinter;


