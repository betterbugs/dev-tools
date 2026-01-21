'use client';

import React, { 
  useCallback,
  useEffect, 
  useMemo,
  useRef,
  useState,
} from "react";

type InputMode = "percent" | "hex" | "base64" | "raw" | "unicode";

interface Options {
  mode: InputMode;
  showInvalidAs: "replacement" | "ignore" | "escape";
}

function decodeUtf8(
  input: string,
  mode: InputMode,
  onError: Options["showInvalidAs"]
): string {
  try {
    let bytes: Uint8Array;
    switch (mode) {
      case "unicode": {
        // Interpret \uXXXX sequences and standard escapes
        try {
          const decoded = JSON.parse(
            `"${input.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")}"`
          );
          return decoded;
        } catch (_e) {
          const manual = input.replace(/\\u([0-9a-fA-F]{4})/g, (_m, h) =>
            String.fromCharCode(parseInt(h, 16))
          );
          return manual;
        }
      }
      case "percent": {
        // Percent-encoding like %E2%9C%93 or mixed text
        // Replace + with space and decode percent sequences
        const replaced = input.replace(/\+/g, "%20");
        const binString = decodeURIComponent(replaced);
        const encoder = new TextEncoder();
        bytes = encoder.encode(binString);
        break;
      }
      case "hex": {
        // Allow spaces, commas, 0x prefixes
        const clean = input.replace(/0x/gi, "").replace(/[^0-9a-fA-F]/g, "");
        if (clean.length % 2 !== 0) throw new Error("Odd hex length");
        const arr = new Uint8Array(clean.length / 2);
        for (let i = 0; i < clean.length; i += 2)
          arr[i / 2] = parseInt(clean.slice(i, i + 2), 16);
        bytes = arr;
        break;
      }
      case "base64": {
        // atob handles base64; support URL-safe variants
        const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
        const bin = atob(normalized);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        bytes = arr;
        break;
      }
      case "raw": {
        const encoder = new TextEncoder();
        bytes = encoder.encode(input);
        break;
      }
    }

    const decoder = new TextDecoder("utf-8", {
      fatal:
        onError === "escape" ? false : onError === "ignore" ? false : false,
    });
    // TextDecoder with fatal would throw; we emulate handling below
    let out = "";
    try {
      out = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch (_) {
      if (onError === "ignore") {
        // Try soft decode replacing invalid with empty by manual walk
        const soft = new TextDecoder("utf-8").decode(bytes);
        out = soft.replace(/�/g, "");
      } else if (onError === "escape") {
        out = new TextDecoder("utf-8").decode(bytes).replace(/�/g, (m, idx) => {
          const b = bytes[idx]?.toString(16).padStart(2, "0");
          return `\\x${b ?? "??"}`;
        });
      } else {
        out = new TextDecoder("utf-8").decode(bytes); // default with U+FFFD
      }
    }
    return out;
  } catch (_) {
    return "";
  }
}

const Utf8Decode: React.FC = () => {
  const [input, setInput] = useState<string>("%E2%9C%93%20Hello%20%E2%98%83");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    mode: "percent",
    showInvalidAs: "replacement",
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(
    () => setOutput(decodeUtf8(input, options.mode, options.showInvalidAs)),
    [input, options]
  );
  useEffect(() => {
    if (autoUpdate) convert();
  }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "utf8-decoded.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={autoUpdate}
                    onChange={(e) => setAutoUpdate(e.target.checked)}
                  />
                  Auto-update
                </label>
                <button
                  onClick={convert}
                  className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm"
                >
                  Decode
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onCopy}
                  className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold"
                >
                  Copy
                </button>
                <button
                  onClick={onDownload}
                  className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold"
                >
                  Download
                </button>
                <button
                  onClick={onClear}
                  className="border border-black/30 px-3 py-1 rounded text-sm bg-red hover:bg-red/90 text-black font-bold"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:mt-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Input</span>
                  <div className="flex gap-2">
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".txt"
                      className="hidden"
                      onChange={onFileChange}
                    />
                    <button
                      onClick={onUploadClick}
                      className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="%E2%9C%93 or 68 65 6C 6C 6F or SGVsbG8= or raw"
                  className="w-full h-72 bg-black rounded p-3 font-mono border border-white/20 text-sm"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">
                    Output (UTF-8 text)
                  </span>
                </div>
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>Mode:</span>
                  <select
                    value={options.mode}
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        mode: e.target.value as InputMode,
                      }))
                    }
                    className="bg-black border border-white/20 rounded px-2 py-1 text-sm"
                  >
                    <option value="percent">Percent-encoded</option>
                    <option value="hex">Hex bytes</option>
                    <option value="base64">Base64</option>
                    <option value="raw">Raw text</option>
                    <option value="unicode">Unicode escapes (\\uXXXX)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>On invalid:</span>
                  <select
                    value={options.showInvalidAs}
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        showInvalidAs: e.target.value as Options["showInvalidAs"],
                      }))
                    }
                    className="bg-black border border-white/20 rounded px-2 py-1"
                  >
                    <option value="replacement">Replace (�)</option>
                    <option value="ignore">Ignore</option>
                    <option value="escape">Escape (\\xNN)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utf8Decode;
