"use client";
import React, { useState, useCallback } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import CopyIcon from "../theme/Icon/copyIcon";
import ReloadIcon from "../theme/Icon/reload";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
  auth: { user: string; password: string } | null;
  isFormData: boolean;
  isJson: boolean;
}

type Language =
  | "js-fetch"
  | "js-axios"
  | "python-requests"
  | "go"
  | "nodejs";

// ─── Parser ──────────────────────────────────────────────────────────────────

function tokenizeCurl(input: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const s = input.trim().replace(/\\\n/g, " ").replace(/\\\r\n/g, " ");

  while (i < s.length) {
    // Skip whitespace
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;

    if (s[i] === "'") {
      // Single-quoted string
      i++;
      let tok = "";
      while (i < s.length && s[i] !== "'") {
        tok += s[i++];
      }
      i++; // closing quote
      tokens.push(tok);
    } else if (s[i] === '"') {
      // Double-quoted string (handle basic escapes)
      i++;
      let tok = "";
      while (i < s.length && s[i] !== '"') {
        if (s[i] === "\\" && i + 1 < s.length) {
          i++;
          const c = s[i];
          if (c === "n") tok += "\n";
          else if (c === "t") tok += "\t";
          else if (c === "r") tok += "\r";
          else tok += c;
        } else {
          tok += s[i];
        }
        i++;
      }
      i++; // closing quote
      tokens.push(tok);
    } else {
      // Unquoted token
      let tok = "";
      while (i < s.length && !/\s/.test(s[i])) {
        tok += s[i++];
      }
      tokens.push(tok);
    }
  }
  return tokens;
}

function parseCurl(raw: string): ParsedCurl | null {
  const tokens = tokenizeCurl(raw);
  if (!tokens.length) return null;

  // Must start with 'curl'
  if (tokens[0].toLowerCase() !== "curl") return null;

  let url = "";
  let method = "";
  const headers: Record<string, string> = {};
  let body: string | null = null;
  let auth: { user: string; password: string } | null = null;

  for (let i = 1; i < tokens.length; i++) {
    const tok = tokens[i];

    if (tok === "-X" || tok === "--request") {
      method = tokens[++i]?.toUpperCase() ?? "";
    } else if (tok === "-H" || tok === "--header") {
      const hdr = tokens[++i] ?? "";
      const colon = hdr.indexOf(":");
      if (colon !== -1) {
        const key = hdr.slice(0, colon).trim();
        const val = hdr.slice(colon + 1).trim();
        headers[key] = val;
      }
    } else if (
      tok === "-d" ||
      tok === "--data" ||
      tok === "--data-raw" ||
      tok === "--data-binary" ||
      tok === "--data-ascii"
    ) {
      body = tokens[++i] ?? "";
    } else if (tok === "-u" || tok === "--user") {
      const creds = tokens[++i] ?? "";
      const idx = creds.indexOf(":");
      if (idx !== -1) {
        auth = {
          user: creds.slice(0, idx),
          password: creds.slice(idx + 1),
        };
      } else {
        auth = { user: creds, password: "" };
      }
    } else if (tok === "--json") {
      body = tokens[++i] ?? "";
      headers["Content-Type"] = "application/json";
      headers["Accept"] = "application/json";
    } else if (tok === "--form" || tok === "-F") {
      // Basic form data support - collect first occurrence
      if (!body) body = tokens[++i] ?? "";
      else i++; // skip but don't overwrite
    } else if (
      tok === "--compressed" ||
      tok === "-L" ||
      tok === "--location" ||
      tok === "-k" ||
      tok === "--insecure" ||
      tok === "-s" ||
      tok === "--silent" ||
      tok === "-v" ||
      tok === "--verbose" ||
      tok === "-i" ||
      tok === "--include"
    ) {
      // Silently ignore these flags
    } else if (tok === "-b" || tok === "--cookie") {
      const cookie = tokens[++i] ?? "";
      headers["Cookie"] = cookie;
    } else if (tok === "-A" || tok === "--user-agent") {
      headers["User-Agent"] = tokens[++i] ?? "";
    } else if (tok === "-e" || tok === "--referer") {
      headers["Referer"] = tokens[++i] ?? "";
    } else if (!tok.startsWith("-")) {
      // Positional arg = URL
      if (!url) url = tok;
    }
  }

  if (!url) return null;

  // Detect method
  if (!method) {
    method = body ? "POST" : "GET";
  }

  // Detect content type
  const contentType = headers["Content-Type"] || headers["content-type"] || "";
  const isJson =
    contentType.includes("application/json") ||
    (body !== null && body.trimStart().startsWith("{")) ||
    (body !== null && body.trimStart().startsWith("["));
  const isFormData = contentType.includes("application/x-www-form-urlencoded");

  return { url, method, headers, body, auth, isFormData, isJson };
}

// ─── Code Generators ─────────────────────────────────────────────────────────

function indent(n: number): string {
  return "  ".repeat(n);
}

function jsStringify(val: string): string {
  return JSON.stringify(val);
}

function generateJsFetch(p: ParsedCurl): string {
  const lines: string[] = [];
  const options: string[] = [];

  if (p.method !== "GET") {
    options.push(`${indent(1)}method: ${jsStringify(p.method)},`);
  }

  const headerEntries = Object.entries(p.headers);
  if (p.auth) {
    const encoded = Buffer.from(
      `${p.auth.user}:${p.auth.password}`
    ).toString("base64");
    headerEntries.push(["Authorization", `Basic ${encoded}`]);
  }

  if (headerEntries.length) {
    options.push(`${indent(1)}headers: {`);
    for (const [k, v] of headerEntries) {
      options.push(`${indent(2)}${jsStringify(k)}: ${jsStringify(v)},`);
    }
    options.push(`${indent(1)}},`);
  }

  if (p.body !== null) {
    if (p.isJson) {
      try {
        const parsed = JSON.parse(p.body);
        options.push(
          `${indent(1)}body: JSON.stringify(${JSON.stringify(parsed, null, 2)
            .split("\n")
            .join("\n" + indent(1))}),`
        );
      } catch {
        options.push(`${indent(1)}body: ${jsStringify(p.body)},`);
      }
    } else {
      options.push(`${indent(1)}body: ${jsStringify(p.body)},`);
    }
  }

  lines.push(`const response = await fetch(${jsStringify(p.url)}, {`);
  lines.push(...options);
  lines.push(`});`);
  lines.push(`const data = await response.json();`);
  lines.push(`console.log(data);`);

  return lines.join("\n");
}

function generateJsAxios(p: ParsedCurl): string {
  const lines: string[] = [];

  const configParts: string[] = [];
  configParts.push(`${indent(1)}method: ${jsStringify(p.method.toLowerCase())},`);
  configParts.push(`${indent(1)}url: ${jsStringify(p.url)},`);

  const headerEntries = Object.entries(p.headers);
  if (p.auth) {
    lines.unshift(`// Axios handles basic auth natively:`);
    configParts.push(`${indent(1)}auth: {`);
    configParts.push(`${indent(2)}username: ${jsStringify(p.auth.user)},`);
    configParts.push(`${indent(2)}password: ${jsStringify(p.auth.password)},`);
    configParts.push(`${indent(1)}},`);
  }

  if (headerEntries.length) {
    configParts.push(`${indent(1)}headers: {`);
    for (const [k, v] of headerEntries) {
      configParts.push(`${indent(2)}${jsStringify(k)}: ${jsStringify(v)},`);
    }
    configParts.push(`${indent(1)}},`);
  }

  if (p.body !== null) {
    if (p.isJson) {
      try {
        const parsed = JSON.parse(p.body);
        const jsonStr = JSON.stringify(parsed, null, 2)
          .split("\n")
          .join("\n" + indent(1));
        configParts.push(`${indent(1)}data: ${jsonStr},`);
      } catch {
        configParts.push(`${indent(1)}data: ${jsStringify(p.body)},`);
      }
    } else {
      configParts.push(`${indent(1)}data: ${jsStringify(p.body)},`);
    }
  }

  lines.push(`import axios from 'axios';`);
  lines.push(``);
  lines.push(`const response = await axios({`);
  lines.push(...configParts);
  lines.push(`});`);
  lines.push(`console.log(response.data);`);

  return lines.join("\n");
}

function generatePythonRequests(p: ParsedCurl): string {
  const lines: string[] = [];
  lines.push(`import requests`);
  lines.push(``);

  const args: string[] = ["url"];

  // Headers
  const headerEntries = Object.entries(p.headers);
  if (headerEntries.length) {
    lines.push(`headers = {`);
    for (const [k, v] of headerEntries) {
      lines.push(`    ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
    }
    lines.push(`}`);
    lines.push(``);
    args.push(`headers=headers`);
  }

  // Auth
  if (p.auth) {
    args.push(
      `auth=(${JSON.stringify(p.auth.user)}, ${JSON.stringify(p.auth.password)})`
    );
  }

  // Body
  if (p.body !== null) {
    if (p.isJson) {
      try {
        const parsed = JSON.parse(p.body);
        const pyJson = JSON.stringify(parsed, null, 4)
          .replace(/: null/g, ": None")
          .replace(/: true/g, ": True")
          .replace(/: false/g, ": False");
        lines.push(`payload = ${pyJson}`);
      } catch {
        lines.push(`payload = ${JSON.stringify(p.body)}`);
      }
      lines.push(``);
      args.push(`json=payload`);
    } else if (p.isFormData) {
      lines.push(`data = ${JSON.stringify(p.body)}`);
      lines.push(``);
      args.push(`data=data`);
    } else {
      lines.push(`data = ${JSON.stringify(p.body)}`);
      lines.push(``);
      args.push(`data=data`);
    }
  }

  const methodLower = p.method.toLowerCase();
  lines.push(`url = ${JSON.stringify(p.url)}`);
  lines.push(``);
  lines.push(`response = requests.${methodLower}(${args.join(", ")})`);
  lines.push(`print(response.json())`);

  return lines.join("\n");
}

function generateGo(p: ParsedCurl): string {
  const lines: string[] = [];

  lines.push(`package main`);
  lines.push(``);
  lines.push(`import (`);
  lines.push(`\t"fmt"`);
  if (p.body) lines.push(`\t"strings"`);
  lines.push(`\t"net/http"`);
  lines.push(`\t"io"`);
  lines.push(`)`);
  lines.push(``);
  lines.push(`func main() {`);
  lines.push(`\turl := ${JSON.stringify(p.url)}`);
  lines.push(``);

  if (p.body) {
    const bodyStr = p.isJson
      ? (() => {
          try {
            return JSON.stringify(JSON.parse(p.body), null, 2);
          } catch {
            return p.body;
          }
        })()
      : p.body;
    lines.push(`\tbody := strings.NewReader(${JSON.stringify(bodyStr)})`);
    lines.push(
      `\treq, err := http.NewRequest(${JSON.stringify(p.method)}, url, body)`
    );
  } else {
    lines.push(
      `\treq, err := http.NewRequest(${JSON.stringify(p.method)}, url, nil)`
    );
  }

  lines.push(`\tif err != nil {`);
  lines.push(`\t\tpanic(err)`);
  lines.push(`\t}`);
  lines.push(``);

  for (const [k, v] of Object.entries(p.headers)) {
    lines.push(`\treq.Header.Set(${JSON.stringify(k)}, ${JSON.stringify(v)})`);
  }

  if (p.auth) {
    lines.push(
      `\treq.SetBasicAuth(${JSON.stringify(p.auth.user)}, ${JSON.stringify(p.auth.password)})`
    );
  }

  lines.push(``);
  lines.push(`\tclient := &http.Client{}`);
  lines.push(`\tresp, err := client.Do(req)`);
  lines.push(`\tif err != nil {`);
  lines.push(`\t\tpanic(err)`);
  lines.push(`\t}`);
  lines.push(`\tdefer resp.Body.Close()`);
  lines.push(``);
  lines.push(`\tbody2, _ := io.ReadAll(resp.Body)`);
  lines.push(`\tfmt.Println(string(body2))`);
  lines.push(`}`);

  return lines.join("\n");
}

function generateNodeJs(p: ParsedCurl): string {
  const lines: string[] = [];

  try {
    const urlObj = new URL(p.url);
    const protocol = urlObj.protocol.replace(":", "");
    const hostname = urlObj.hostname;
    const port =
      urlObj.port || (protocol === "https" ? "443" : "80");
    const path = urlObj.pathname + (urlObj.search || "");

    lines.push(`const ${protocol} = require('${protocol}');`);
    lines.push(``);

    if (p.body) {
      const bodyStr = p.isJson
        ? (() => {
            try {
              return JSON.stringify(JSON.parse(p.body), null, 2);
            } catch {
              return p.body;
            }
          })()
        : p.body;
      lines.push(`const postData = ${JSON.stringify(bodyStr)};`);
      lines.push(``);
    }

    lines.push(`const options = {`);
    lines.push(`  hostname: ${JSON.stringify(hostname)},`);
    if (
      (protocol === "https" && port !== "443") ||
      (protocol === "http" && port !== "80")
    ) {
      lines.push(`  port: ${port},`);
    }
    lines.push(`  path: ${JSON.stringify(path || "/")},`);
    lines.push(`  method: ${JSON.stringify(p.method)},`);

    const headerEntries = Object.entries(p.headers);
    if (p.body) {
      headerEntries.push(["Content-Length", "Buffer.byteLength(postData)"]);
    }
    if (p.auth) {
      const creds = `${p.auth.user}:${p.auth.password}`;
      const encoded = Buffer.from(creds).toString("base64");
      headerEntries.push(["Authorization", `Basic ${encoded}`]);
    }

    if (headerEntries.length) {
      lines.push(`  headers: {`);
      for (const [k, v] of headerEntries) {
        if (k === "Content-Length") {
          lines.push(`    ${JSON.stringify(k)}: ${v},`);
        } else {
          lines.push(`    ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
        }
      }
      lines.push(`  },`);
    }

    lines.push(`};`);
    lines.push(``);
    lines.push(`const req = ${protocol}.request(options, (res) => {`);
    lines.push(`  let data = '';`);
    lines.push(`  res.on('data', (chunk) => { data += chunk; });`);
    lines.push(`  res.on('end', () => { console.log(JSON.parse(data)); });`);
    lines.push(`});`);
    lines.push(``);
    lines.push(`req.on('error', (e) => { console.error(e); });`);

    if (p.body) {
      lines.push(`req.write(postData);`);
    }

    lines.push(`req.end();`);
  } catch {
    // Fallback if URL parsing fails
    lines.push(`// Could not fully parse the URL: ${p.url}`);
    lines.push(
      `// Please adjust hostname, path and port below.`
    );
    lines.push(`const https = require('https');`);
    lines.push(`// ... (manual setup required)`);
  }

  return lines.join("\n");
}

function generateCode(parsed: ParsedCurl, lang: Language): string {
  switch (lang) {
    case "js-fetch":
      return generateJsFetch(parsed);
    case "js-axios":
      return generateJsAxios(parsed);
    case "python-requests":
      return generatePythonRequests(parsed);
    case "go":
      return generateGo(parsed);
    case "nodejs":
      return generateNodeJs(parsed);
    default:
      return "";
  }
}

// ─── Sample cURL commands ────────────────────────────────────────────────────

const SAMPLES: Record<string, string> = {
  "GET with headers": `curl https://api.example.com/users \\\n  -H 'Authorization: Bearer YOUR_TOKEN' \\\n  -H 'Accept: application/json'`,
  "POST JSON": `curl -X POST https://api.example.com/users \\\n  -H 'Content-Type: application/json' \\\n  -H 'Authorization: Bearer YOUR_TOKEN' \\\n  -d '{"name":"John Doe","email":"john@example.com"}'`,
  "PUT with body": `curl -X PUT https://api.example.com/users/42 \\\n  -H 'Content-Type: application/json' \\\n  -d '{"name":"Jane Doe"}'`,
  "Basic auth": `curl https://api.example.com/secure \\\n  -u username:password`,
  "Form data": `curl -X POST https://api.example.com/login \\\n  -H 'Content-Type: application/x-www-form-urlencoded' \\\n  -d 'username=john&password=secret'`,
};

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "js-fetch", label: "JavaScript (Fetch)" },
  { value: "js-axios", label: "JavaScript (Axios)" },
  { value: "python-requests", label: "Python (Requests)" },
  { value: "go", label: "Go" },
  { value: "nodejs", label: "Node.js" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const CurlToCodeConverter = () => {
  const [curlInput, setCurlInput] = useState("");
  const [language, setLanguage] = useState<Language>("js-fetch");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const convert = useCallback(
    (raw: string, lang: Language) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = parseCurl(trimmed);
      if (!parsed) {
        setOutput("");
        setError(
          "Could not parse the cURL command. Make sure it starts with 'curl' and includes a URL."
        );
        return;
      }
      setError("");
      setOutput(generateCode(parsed, lang));
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCurlInput(val);
    convert(val, language);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
    convert(curlInput, lang);
  };

  const handleLoadSample = (sampleKey: string) => {
    const sample = SAMPLES[sampleKey];
    if (sample) {
      setCurlInput(sample);
      convert(sample, language);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError("Failed to copy to clipboard.");
    }
  };

  const handleClear = () => {
    setCurlInput("");
    setOutput("");
    setError("");
    setCopySuccess(false);
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="w-full max-w-[1100px] mx-auto">
              {/* Controls row */}
              <div className="flex flex-wrap gap-3 items-center mb-4">
                {/* Language selector */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Target Language
                  </label>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full bg-black border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Samples */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Load Sample
                  </label>
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) handleLoadSample(e.target.value);
                      e.target.value = "";
                    }}
                    className="w-full bg-black border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="" disabled>
                      — pick a sample —
                    </option>
                    {Object.keys(SAMPLES).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 items-end mt-auto pt-5">
                  <button
                    onClick={handleCopy}
                    disabled={!output}
                    title="Copy output"
                    aria-label="Copy output"
                    className="h-10 px-4 bg-primary text-black rounded-lg font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-opacity"
                  >
                    <CopyIcon />
                    {copySuccess ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleClear}
                    title="Clear"
                    aria-label="Clear"
                    className={`${DevelopmentToolsStyles.clearButton} h-10 w-10 text-black rounded-lg flex items-center justify-center`}
                  >
                    <ReloadIcon />
                  </button>
                </div>
              </div>

              {/* Editor area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    cURL Command
                  </label>
                  <textarea
                    value={curlInput}
                    onChange={handleInputChange}
                    rows={18}
                    spellCheck={false}
                    placeholder={`curl https://api.example.com/users \\\n  -H 'Authorization: Bearer token' \\\n  -H 'Accept: application/json'`}
                    className="flex-1 w-full bg-black border border-[#333333] rounded-lg p-4 text-white text-sm font-mono resize-y focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Output */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Generated Code
                  </label>
                  <pre className="flex-1 w-full bg-black border border-[#333333] rounded-lg p-4 text-white text-sm font-mono overflow-auto whitespace-pre-wrap min-h-[340px]">
                    {output ||
                      (error ? (
                        <span className="text-red-400">{error}</span>
                      ) : (
                        <span className="text-white/30">
                          Generated code will appear here…
                        </span>
                      ))}
                  </pre>
                </div>
              </div>

              {/* Error banner */}
              {error && (
                <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
              )}

              {/* Info strip */}
              <div className="mt-4 text-xs text-white/40 text-center">
                Supports{" "}
                <code className="text-white/60">-X</code>,{" "}
                <code className="text-white/60">-H</code>,{" "}
                <code className="text-white/60">-d / --data-raw</code>,{" "}
                <code className="text-white/60">-u</code>,{" "}
                <code className="text-white/60">--json</code>,{" "}
                <code className="text-white/60">-b</code>,{" "}
                <code className="text-white/60">-A</code> and more.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurlToCodeConverter;
