"use client";
import React, { useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const Base64Decoder = () => {
  const [encodedText, setEncodedText] = useState("");
  const [isUrlSafe, setIsUrlSafe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const normalizedBase64 = useMemo(() => {
    let text = encodedText.trim();
    if (!isUrlSafe) return text;
    text = text.replace(/-/g, "+").replace(/_/g, "/");
    const paddingNeeded = (4 - (text.length % 4)) % 4;
    return text + "=".repeat(paddingNeeded);
  }, [encodedText, isUrlSafe]);

  const decodeBase64 = () => {
    setError(null);
    try {
      const binaryString = atob(normalizedBase64);
      const percentEncoded = Array.prototype.map
        .call(binaryString, (char: string) => {
          const code = char.charCodeAt(0).toString(16).padStart(2, "0");
          return `%${code}`;
        })
        .join("");
      return decodeURIComponent(percentEncoded);
    } catch (e: any) {
      setError("Invalid Base64 input. Please check your text and try again.");
      return "";
    }
  };

  const decodedText = useMemo(() => decodeBase64(), [normalizedBase64]);

  const handleCopy = async () => {
    if (!decodedText) return;
    try {
      await navigator.clipboard.writeText(decodedText);
    } catch (_) {}
  };

  const handleClear = () => {
    setEncodedText("");
    setError(null);
  };

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setEncodedText(text);
    };
    reader.readAsText(file);
    // reset for picking same file again
    e.target.value = "";
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-16 md:my-5 mt-2">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                  <h3 className="text-lg font-medium mb-2">Encoded input</h3>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.b64,text/plain"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <textarea
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      placeholder="Paste Base64 (or URL-safe Base64) here..."
                      value={encodedText}
                      onChange={(e) => setEncodedText(e.target.value)}
                    ></textarea>
                    {encodedText && (
                      <button
                        type="button"
                        onClick={handleClear}
                        title="Clear"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handlePickFile}
                      title="Choose file"
                      className="absolute right-12 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-white"
                      >
                        <path d="M4 12a6 6 0 016-6h5a3 3 0 110 6H9a1 1 0 100 2h6a5 5 0 100-10H10a8 8 0 100 16h7a1 1 0 100-2h-7a6 6 0 01-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {error && (
                    <div className="w-full text-red-400 text-sm mt-2">{error}</div>
                  )}
                </div>

                <div className="w-full lg:w-1/2 mt-2 lg:mt-0">
                  <h3 className="text-lg font-medium mb-2">Decoded output</h3>
                  <div className="relative">
                    <textarea
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      value={decodedText}
                      readOnly
                      placeholder="Decoded text will appear here..."
                    ></textarea>
                    {decodedText && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        title="Copy"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Base64Decoder;
