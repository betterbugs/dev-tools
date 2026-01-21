"use client";
import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type MinifyOptions = {
  removeComments: boolean;
  collapseBetweenTags: boolean;
  normalizeTextNodes: boolean;
};

const defaultOptions: MinifyOptions = {
  removeComments: true,
  collapseBetweenTags: true,
  normalizeTextNodes: true,
};

const XmlMinify = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [removeComments, setRemoveComments] = useState<boolean>(
    defaultOptions.removeComments
  );
  const [collapseBetweenTags, setCollapseBetweenTags] = useState<boolean>(
    defaultOptions.collapseBetweenTags
  );
  const [normalizeTextNodes, setNormalizeTextNodes] = useState<boolean>(
    defaultOptions.normalizeTextNodes
  );

  const options: MinifyOptions = useMemo(
    () => ({ removeComments, collapseBetweenTags, normalizeTextNodes }),
    [removeComments, collapseBetweenTags, normalizeTextNodes]
  );

  const minifyXml = useCallback((xml: string, opts: MinifyOptions): string => {
    if (!xml) return "";

    // Strip BOM
    let text = xml.replace(/^\uFEFF/, "");

    // Extract XML declaration to preserve
    const declMatch = text.match(/^<\?xml[\s\S]*?\?>/i);
    const declaration = declMatch ? declMatch[0] : "";
    if (declaration) {
      text = text.slice(declaration.length);
    }

    // Optionally remove comments
    if (opts.removeComments) {
      text = text.replace(/<!--[\s\S]*?-->/g, "");
    }

    // Collapse whitespace between tags >   < => ><
    if (opts.collapseBetweenTags) {
      text = text.replace(/>\s+</g, "><");
    }

    // Normalize text nodes: collapse runs of whitespace inside text nodes to single space
    if (opts.normalizeTextNodes) {
      text = text.replace(/>([^<]+)</g, (_, t: string) => {
        const normalized = t.replace(/\s+/g, " ").trim();
        return ">" + normalized + "<";
      });
    }

    // Remove superfluous whitespace around equals inside attributes
    text = text.replace(/\s*=\s*/g, "=");

    // Trim overall
    text = text.trim();

    return (declaration ? declaration : "") + text;
  }, []);

  const handleMinify = useCallback(() => {
    try {
      setError("");
      const result = minifyXml(input, options);
      setOutput(result);
    } catch (e: any) {
      setOutput("");
      setError(e?.message || "Failed to minify XML");
    }
  }, [input, options, minifyXml]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={removeComments}
                      onChange={(e) => setRemoveComments(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Remove comments</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={collapseBetweenTags}
                      onChange={(e) => setCollapseBetweenTags(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Collapse between tags</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={normalizeTextNodes}
                      onChange={(e) => setNormalizeTextNodes(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Normalize text nodes</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input XML</h3>
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your XML here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Minified XML</h3>
                    {error && (
                      <div className="mb-2 text-sm text-red-400">{error}</div>
                    )}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={output}
                        placeholder="Minified XML will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {output && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          title="Copy"
                          className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 text-white"
                          >
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

export default XmlMinify;
