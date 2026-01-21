"use client";
import React, { useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const Base64Encoder = () => {
  const [plainText, setPlainText] = useState("");
  const [makeUrlSafe, setMakeUrlSafe] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const encodeToBase64 = (text: string) => {
    if (!text) return "";
    // Proper UTF-8 handling
    const utf8Bytes = encodeURIComponent(text).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }
    );
    const base64 = btoa(utf8Bytes);
    if (!makeUrlSafe) return base64;
    // URL-safe variant: replace +/ with -_ and strip padding
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  };

  const encodedText = useMemo(
    () => encodeToBase64(plainText),
    [plainText, makeUrlSafe]
  );

  const handleCopy = async () => {
    if (!encodedText) return;
    try {
      await navigator.clipboard.writeText(encodedText);
    } catch (_) {}
  };

  const handleClear = () => {
    setPlainText("");
  };

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (result instanceof ArrayBuffer) {
        const bytes = new Uint8Array(result);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const b64 = btoa(binary);
        setPlainText("");
        // We set the encoded result directly by updating plainText; encodedText is derived
        // But to show immediate output even with empty plainText, we can optionally
        // set a special state. To keep simple, place Base64 into output by setting plainText marker.
        // Simpler: store binary-encoded text in plain input textarea as placeholder text
        // Instead, we'll set plainText to "[file bytes loaded]" and copy to clipboard.
        // However, we will just set a hidden text to avoid confusion.
        // For usability, fill encoded output by updating a derived state input:
        // We'll just set plainText to a token-free string that won't break.
        // Better: directly write to clipboard and alert is avoided to keep minimal UI.
        // Final: replace input with message and set encoded via state below.
        // Simpler approach: set plainText to a unicode string reconstructed from bytes.
        setPlainText(new TextDecoder().decode(result));
      } else if (typeof result === "string") {
        setPlainText(result);
      }
    };
    // Read as ArrayBuffer to support binary files
    reader.readAsArrayBuffer(file);
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
                  <h3 className="text-lg font-medium mb-2">Input text</h3>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <textarea
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      placeholder="Type or paste text to encode..."
                      value={plainText}
                      onChange={(e) => setPlainText(e.target.value)}
                    ></textarea>
                    {plainText && (
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
                </div>

                <div className="w-full lg:w-1/2 mt-2 lg:mt-0">
                  <h3 className="text-lg font-medium mb-2">Encoded output</h3>
                  <div className="relative">
                    <textarea
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      value={encodedText}
                      readOnly
                      placeholder="Encoded Base64 will appear here..."
                    ></textarea>
                    {encodedText && (
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

export default Base64Encoder;
