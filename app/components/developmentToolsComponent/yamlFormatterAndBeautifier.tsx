"use client";
import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type FormatOptions = {
  indentSize: number; // spaces per level
  convertTabsToSpaces: boolean;
  ensureSpaceAfterColon: boolean;
  ensureDashSpace: boolean;
  collapseMultipleBlankLines: boolean;
  trimTrailingWhitespace: boolean;
};

function repeatSpace(n: number): string {
  return n > 0 ? " ".repeat(n) : "";
}

function formatYamlBestEffort(input: string, options: FormatOptions): string {
  if (!input.trim()) return "";
  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];

  let lastWasBlank = false;
  let currentIndentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Convert tabs at start
    if (options.convertTabsToSpaces) {
      line = line.replace(/^\t+/g, (tabs) => repeatSpace(tabs.length * options.indentSize));
    }

    // Trim trailing whitespace
    if (options.trimTrailingWhitespace) {
      line = line.replace(/\s+$/g, "");
    }

    const isBlank = /^\s*$/.test(line);
    if (isBlank && options.collapseMultipleBlankLines) {
      if (lastWasBlank) continue;
      lastWasBlank = true;
      out.push("");
      continue;
    }
    lastWasBlank = isBlank;

    const commentOnly = /^\s*#/.test(line);

    // Heuristic indent normalization for list and mapping nodes
    const leading = line.match(/^\s*/)?.[0] ?? "";
    const content = line.slice(leading.length);

    let newContent = content;

    // Ensure "- " for list items
    if (options.ensureDashSpace) {
      newContent = newContent.replace(/^-(\S)/, (_m, p1: string) => `- ${p1}`);
    }

    // Ensure space after colon for simple key: value forms (not for `: |` or `:>` etc.)
    if (options.ensureSpaceAfterColon) {
      newContent = newContent.replace(/(^|\S):(\S)/, (_m, p1: string, p2: string) => `${p1}: ${p2}`);
    }

    // Adjust indentation heuristically:
    // - If previous line ended with ':' or ':-' structures, increase indent
    // - If current line closes a block indicator (", ', ], } ) at start), reduce
    // We keep it conservative to avoid breaking content.
    if (!commentOnly) {
      const prev = out.length > 0 ? out[out.length - 1] : "";
      const prevTrim = prev.trimEnd();
      const prevOpensBlock = /(:|\|\s*$|>\s*$)$/.test(prevTrim) || /^-\s+\S[^:]*:$/.test(prevTrim);
      const currentLooksLikeLessIndent = /^\s*(\]|\}|\)|-\s)/.test(line) && leading.length > 0;

      if (prevOpensBlock) currentIndentLevel = Math.max(0, currentIndentLevel + 1);
      if (currentLooksLikeLessIndent) currentIndentLevel = Math.max(0, currentIndentLevel - 1);

      // For explicit leading levels, try to infer from spaces
      const explicitLevels = Math.floor(leading.replace(/\t/g, repeatSpace(options.indentSize)).length / options.indentSize);
      // Use the larger between inferred and explicit to avoid oscillation
      currentIndentLevel = Math.max(currentIndentLevel, explicitLevels);
    }

    const rebuilt = `${repeatSpace(currentIndentLevel * options.indentSize)}${newContent}`;
    out.push(rebuilt);
  }

  return out.join("\n");
}

const YAMLFormatterAndBeautifier: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<FormatOptions>({
    indentSize: 2,
    convertTabsToSpaces: true,
    ensureSpaceAfterColon: true,
    ensureDashSpace: true,
    collapseMultipleBlankLines: true,
    trimTrailingWhitespace: true,
  });

  const handleFormat = useCallback(() => {
    try {
      setError("");
      const formatted = formatYamlBestEffort(input, options);
      setOutput(formatted);
    } catch (_e: unknown) {
      setError("Failed to format. Please check your input.");
    }
  }, [input, options]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const canCopy = useMemo(() => Boolean(output?.length), [output]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  }, [output]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-white/80">
                    <label className="mr-3">Indent size</label>
                    <select
                      value={options.indentSize}
                      onChange={(e) => setOptions((o) => ({ ...o, indentSize: Number(e.target.value) }))}
                      className="bg-black border border-[#222222] rounded-md px-2 py-1"
                    >
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                    </select>
                  </div>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.convertTabsToSpaces}
                      onChange={(e) => setOptions((o) => ({ ...o, convertTabsToSpaces: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Convert tabs to spaces</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.ensureSpaceAfterColon}
                      onChange={(e) => setOptions((o) => ({ ...o, ensureSpaceAfterColon: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Ensure space after colon</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.ensureDashSpace}
                      onChange={(e) => setOptions((o) => ({ ...o, ensureDashSpace: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Ensure dash has space (&#34;- value&#34;)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.collapseMultipleBlankLines}
                      onChange={(e) => setOptions((o) => ({ ...o, collapseMultipleBlankLines: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Collapse multiple blank lines</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.trimTrailingWhitespace}
                      onChange={(e) => setOptions((o) => ({ ...o, trimTrailingWhitespace: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Trim trailing whitespace</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input YAML</h3>
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Paste YAML here...`}
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Formatted YAML</h3>
                    {error && <div className="mb-2 text-sm text-red-400">{error}</div>}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={output}
                        placeholder="Output will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {canCopy && (
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
                    onClick={handleFormat}
                    disabled={!input}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-60`}
                  >
                    Format
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Clear
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

export default YAMLFormatterAndBeautifier;
