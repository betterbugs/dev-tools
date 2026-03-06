"use client";
import React, { useCallback, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type FormatOptions = {
  indentSize: number;
  useTabs: boolean;
  binaryNextLine: boolean;
  switchCaseIndent: boolean;
  spaceRedirects: boolean;
  keepPadding: boolean;
  functionNextLine: boolean;
};

// ── Basic lint checks ──
type LintWarning = {
  line: number;
  code: string;
  message: string;
};

function lintShellScript(code: string): LintWarning[] {
  const warnings: LintWarning[] = [];
  const lines = code.split("\n");

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Skip comments and blank lines
    if (!trimmed || trimmed.startsWith("#")) return;

    // SC2086: Double quote to prevent globbing and word splitting
    const varPattern = /(?<!")(\$\w+|\$\{[^}]+\})(?!")/g;
    let match;
    while ((match = varPattern.exec(line)) !== null) {
      // Check if already inside double quotes
      const before = line.slice(0, match.index);
      const dblQuotes = (before.match(/"/g) || []).length;
      if (dblQuotes % 2 === 0) {
        // Not inside quotes
        warnings.push({
          line: lineNum,
          code: "SC2086",
          message: `Double quote to prevent globbing and word splitting: ${match[0]}`,
        });
      }
    }

    // SC2006: Use $(...) instead of backticks
    if (/`[^`]+`/.test(line) && !trimmed.startsWith("#")) {
      warnings.push({
        line: lineNum,
        code: "SC2006",
        message:
          "Use $(...) notation instead of legacy backtick command substitution",
      });
    }

    // SC2046: Quote this to prevent word splitting
    if (/\$\([^)]+\)/.test(line)) {
      const cmdSubst = line.match(/\$\([^)]+\)/g) || [];
      cmdSubst.forEach((sub) => {
        const pos = line.indexOf(sub);
        const before2 = line.slice(0, pos);
        const dblQuotes2 = (before2.match(/"/g) || []).length;
        if (dblQuotes2 % 2 === 0) {
          warnings.push({
            line: lineNum,
            code: "SC2046",
            message: `Quote this to prevent word splitting: ${sub}`,
          });
        }
      });
    }

    // SC2164: Use cd ... || exit in case cd fails
    if (/^\s*cd\s+/.test(line) && !line.includes("||") && !line.includes("&&")) {
      warnings.push({
        line: lineNum,
        code: "SC2164",
        message: "Use 'cd ... || exit' in case cd fails",
      });
    }

    // SC2115: Use "${var:?}" to ensure this doesn't expand to /*
    if (/rm\s+(-rf?|--recursive)\s+.*\/\$\w+/.test(line) || /rm\s+(-rf?|--recursive)\s+\$\w+\//.test(line)) {
      warnings.push({
        line: lineNum,
        code: "SC2115",
        message:
          'Use "${var:?}" to ensure this doesn\'t expand to /* when var is empty',
      });
    }

    // SC2059: Don't use variables in printf format string
    if (/printf\s+\$\w+/.test(line) || /printf\s+"\$\w+/.test(line)) {
      warnings.push({
        line: lineNum,
        code: "SC2059",
        message:
          "Don't use variables in the printf format string. Use printf '...%s...' \"$var\"",
      });
    }
  });

  return warnings;
}

// ── Heuristic formatter (fallback when WASM not available) ──
function formatShellHeuristic(code: string, options: FormatOptions): string {
  if (!code.trim()) return "";

  const indent = options.useTabs ? "\t" : " ".repeat(options.indentSize);
  const lines = code.split("\n");
  let indentLevel = 0;
  const result: string[] = [];

  const INDENT_AFTER = /^(if|elif|else|while|until|for|do|then|case)\b|.*\{\s*$|.*\(\s*$/;
  const DEDENT_BEFORE = /^(fi|done|esac|else|elif)\b|^\}|^\)/;
  const INDENT_AND_DEDENT = /^(else|elif)\b/;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      result.push("");
      continue;
    }

    // Dedent before this line
    if (DEDENT_BEFORE.test(line)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Handle else/elif: dedent then indent
    if (INDENT_AND_DEDENT.test(line) && !DEDENT_BEFORE.test(line)) {
      // Already handled by DEDENT_BEFORE above
    }

    result.push(indent.repeat(indentLevel) + line);

    // Indent after this line
    if (INDENT_AFTER.test(line) && !line.endsWith(";;")) {
      // Check for one-liner: if ...; fi or while ...; done (all on one line)
      if (!(line.includes("; fi") || line.includes("; done") || line.includes("; esac"))) {
        indentLevel++;
      }
    }

    // Handle 'do' on same line as for/while
    if (/;\s*do\s*$/.test(line)) {
      // already incremented from 'for' or 'while'
    }

    // Case patterns: ·) increment for body
    if (/^\S+\)/.test(line) && !line.startsWith("esac")) {
      indentLevel++;
    }

    // ;; ends a case block
    if (line.endsWith(";;")) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
  }

  return result.join("\n");
}

const ShellFormatter: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [lintWarnings, setLintWarnings] = useState<LintWarning[]>([]);
  const [isFormatting, setIsFormatting] = useState(false);
  const [copyText, setCopyText] = useState("Copy");
  const [options, setOptions] = useState<FormatOptions>({
    indentSize: 2,
    useTabs: false,
    binaryNextLine: true,
    switchCaseIndent: true,
    spaceRedirects: false,
    keepPadding: false,
    functionNextLine: false,
  });

  const handleFormat = useCallback(async () => {
    if (!input.trim()) return;
    setIsFormatting(true);
    setError("");
    setLintWarnings([]);

    try {
      let formatted: string;
      try {
        // Try WASM formatter first
        const shfmt = await import("@wasm-fmt/shfmt");
        formatted = shfmt.format(input);
      } catch {
        // Fallback to heuristic formatter
        formatted = formatShellHeuristic(input, options);
      }
      setOutput(formatted);

      // Run linting
      const warnings = lintShellScript(input);
      setLintWarnings(warnings);
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Failed to format. Check your input.";
      setError(msg);
    } finally {
      setIsFormatting(false);
    }
  }, [input, options]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
    setLintWarnings([]);
  }, []);

  const canCopy = useMemo(() => Boolean(output?.length), [output]);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 2000);
    } catch (_) {}
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-shellscript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.sh";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-white/80">
                    <label className="mr-3">Indent size</label>
                    <select
                      value={options.indentSize}
                      onChange={(e) =>
                        setOptions((o) => ({
                          ...o,
                          indentSize: Number(e.target.value),
                        }))
                      }
                      className="bg-black border border-[#222222] rounded-md px-2 py-1"
                    >
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                      <option value={8}>8 spaces</option>
                    </select>
                  </div>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.useTabs}
                      onChange={(e) =>
                        setOptions((o) => ({
                          ...o,
                          useTabs: e.target.checked,
                        }))
                      }
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Use tabs</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.binaryNextLine}
                      onChange={(e) =>
                        setOptions((o) => ({
                          ...o,
                          binaryNextLine: e.target.checked,
                        }))
                      }
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Binary ops next line</span>
                  </label>
                </div>

                {/* Editors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">
                      Input Shell Script
                    </h3>
                    <Editor
                      height="300px"
                      defaultLanguage="shell"
                      value={input}
                      onChange={(v) => setInput(v || "")}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        scrollbar: { vertical: "auto" },
                        wordWrap: "on",
                        fontSize: 13,
                        lineNumbers: "on",
                      }}
                      className="monaco-background w-full"
                    />
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">
                      Formatted Output
                    </h3>
                    {error && (
                      <div className="mb-2 text-sm text-red-400">{error}</div>
                    )}
                    <Editor
                      height="300px"
                      defaultLanguage="shell"
                      value={output}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollbar: { vertical: "auto" },
                        wordWrap: "on",
                        fontSize: 13,
                        lineNumbers: "on",
                      }}
                      className="monaco-background w-full"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={handleFormat}
                    disabled={!input || isFormatting}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-60`}
                  >
                    {isFormatting ? "Formatting..." : "Format"}
                  </button>

                  {canCopy && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`${DevelopmentToolsStyles.copyButton} text-white font-bold py-3 px-6 rounded-lg`}
                    >
                      {copyText}
                    </button>
                  )}

                  {canCopy && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                    >
                      Download .sh
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleClear}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Clear
                  </button>
                </div>

                {/* Lint Warnings */}
                {lintWarnings.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-2 text-yellow-400">
                      ⚠ Lint Warnings ({lintWarnings.length})
                    </h3>
                    <div
                      className={`${DevelopmentToolsStyles.scrollbar} bg-black border border-[#222222] rounded-xl p-4 max-h-[200px] overflow-y-auto`}
                    >
                      {lintWarnings.map((w, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 py-1.5 text-sm border-b border-white/5 last:border-b-0"
                        >
                          <span className="text-white/40 font-mono shrink-0">
                            L{w.line}
                          </span>
                          <span className="text-yellow-300 font-mono shrink-0">
                            {w.code}
                          </span>
                          <span className="text-white/70">{w.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShellFormatter;
