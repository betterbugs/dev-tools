"use client";
import React, { useCallback, useMemo, useState } from 'react';
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type MinifyOptions = {
  removeLineComments: boolean;
  removeBlockComments: boolean;
  collapseWhitespace: boolean;
  preserveNewlines: boolean;
};

function minifySql(inputSql: string, options: MinifyOptions): string {
  const { removeLineComments, removeBlockComments, collapseWhitespace, preserveNewlines } = options;

  const sql = inputSql.replace(/\r\n?|\r/g, '\n');

  let result = '';
  let i = 0;
  const n = sql.length;

  let inSingle = false; // '...'
  let inDouble = false; // "..."
  let inBracketId = false; // [identifier]
  let inLineComment = false; // -- comment
  let inBlockComment = false; // /* comment */

  const pushChar = (ch: string) => {
    result += ch;
  };

  while (i < n) {
    const ch = sql[i];
    const next = i + 1 < n ? sql[i + 1] : '';

    // Handle end of comments
    if (inLineComment) {
      if (ch === '\n') {
        inLineComment = false;
        if (preserveNewlines) result += '\n';
      }
      i += 1;
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i += 2;
      } else {
        i += 1;
      }
      continue;
    }

    // Enter comments (only when not inside any string/bracket)
    if (!inSingle && !inDouble && !inBracketId) {
      if (ch === '-' && next === '-') {
        if (removeLineComments) {
          inLineComment = true;
          i += 2;
          continue;
        }
      }
      if (ch === '/' && next === '*') {
        if (removeBlockComments) {
          inBlockComment = true;
          i += 2;
          continue;
        }
      }
    }

    // Enter/exit bracket identifiers [ ... ] (SQL Server)
    if (!inSingle && !inDouble) {
      if (!inBracketId && ch === '[') {
        inBracketId = true;
        pushChar(ch);
        i += 1;
        continue;
      }
      if (inBracketId) {
        pushChar(ch);
        if (ch === ']') inBracketId = false;
        i += 1;
        continue;
      }
    }

    // Enter/exit string literals
    if (!inDouble && ch === "'" && !inBracketId) {
      // toggle single-quoted string; handle escaped '' inside
      pushChar(ch);
      i += 1;
      inSingle = !inSingle;
      // If inside string, just copy until end handling doubled quotes
      while (inSingle && i < n) {
        const c = sql[i];
        pushChar(c);
        i += 1;
        if (c === "'") {
          if (i < n && sql[i] === "'") {
            // escaped single quote, keep inside string
            pushChar(sql[i]);
            i += 1;
          } else {
            inSingle = false;
            break;
          }
        }
      }
      continue;
    }
    if (!inSingle && ch === '"' && !inBracketId) {
      // toggle double-quoted string (identifiers or strings depending on dialect)
      pushChar(ch);
      i += 1;
      inDouble = !inDouble;
      while (inDouble && i < n) {
        const c = sql[i];
        pushChar(c);
        i += 1;
        if (c === '"') {
          if (i < n && sql[i] === '"') {
            pushChar(sql[i]);
            i += 1;
          } else {
            inDouble = false;
            break;
          }
        }
      }
      continue;
    }

    // Whitespace handling (outside strings/comments)
    if (!inSingle && !inDouble && !inBracketId) {
      if (ch === '\n') {
        if (preserveNewlines) result += '\n';
        else if (!collapseWhitespace) result += ' ';
        i += 1;
        continue;
      }
      if (/\s/.test(ch)) {
        // collapse any run of whitespace to a single space
        if (collapseWhitespace) {
          // only add a single space if last char in result isn't a space or punctuation
          const last = result[result.length - 1] || '';
          const nextNonWs = sql.slice(i).match(/\S/);
          const nextChar = nextNonWs ? nextNonWs[0] : '';
          const avoidSpaceBefore = [',', ')', ';'];
          const avoidSpaceAfter = ['(', ','];
          const shouldAddSpace = last && !avoidSpaceAfter.includes(last) && nextChar && !avoidSpaceBefore.includes(nextChar);
          if (shouldAddSpace) result += ' ';
          // skip all whitespace
          while (i < n && /\s/.test(sql[i])) i += 1;
          continue;
        } else {
          // keep as a single space
          result += ' ';
          while (i < n && /\s/.test(sql[i])) i += 1;
          continue;
        }
      }
    }

    // Default: copy character
    pushChar(ch);
    i += 1;
  }

  // Final trim for extra spaces/newlines
  result = result.replace(/\s+$/g, '');
  return result;
}

const SqlMinify: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState<MinifyOptions>({
    removeLineComments: true,
    removeBlockComments: true,
    collapseWhitespace: true,
    preserveNewlines: false,
  });

  const handleMinify = useCallback(() => {
    try {
      setError('');
      const result = minifySql(input, options);
      setOutput(result);
    } catch (e: unknown) {
      setError('Failed to minify SQL. Please check your input.');
    }
  }, [input, options]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const canCopy = useMemo(() => Boolean(output?.length), [output]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (e) {
      // ignore
    }
  }, [output]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.removeLineComments && options.removeBlockComments}
                      onChange={(e) =>
                        setOptions((o) => ({
                          ...o,
                          removeLineComments: e.target.checked,
                          removeBlockComments: e.target.checked,
                        }))
                      }
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Remove comments</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.collapseWhitespace}
                      onChange={(e) => setOptions((o) => ({ ...o, collapseWhitespace: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Collapse between tokens</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.preserveNewlines}
                      onChange={(e) => setOptions((o) => ({ ...o, preserveNewlines: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Preserve newlines</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input SQL</h3>
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your SQL here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Minified SQL</h3>
                    {error && (
                      <div className="mb-2 text-sm text-red-400">{error}</div>
                    )}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={output}
                        placeholder="Minified SQL will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {output && (
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
                    onClick={handleMinify}
                    disabled={!input}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-60`}
                  >
                    Minify
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

export default SqlMinify;