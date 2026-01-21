"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type LogEntry = { type: "log" | "warn" | "error"; message: string };

const defaultCode = `// Write JavaScript here
// Example:
function add(a, b) { return a + b }
console.log('2 + 3 =', add(2, 3))
`;

const JavaScriptTester = () => {
  const [code, setCode] = useState<string>(defaultCode);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [reloadKey, setReloadKey] = useState<number>(0);

  const run = () => {
    setLogs([]);
    const wrap = `<!doctype html><html><head><meta charset=\"utf-8\" /></head><body>
<script>
  const send = (type, args) => {
    try { parent.postMessage({ __bb_js_tester: true, type, message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*') } catch(e) {}
  }
  console.log = (...args) => send('log', args)
  console.warn = (...args) => send('warn', args)
  console.error = (...args) => send('error', args)
  window.onerror = (msg, src, line, col, err) => { send('error', [String(msg)]) }
  try {
    ${code}
  } catch (e) {
    send('error', [String(e && e.message ? e.message : e)])
  }
<\/script></body></html>`;
    setSrcDoc(wrap);
    // bump key to ensure fresh execution
    setReloadKey((k) => k + 1);
  };

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const data: any = e.data;
      if (!data || !data.__bb_js_tester) return;
      const type = data.type as LogEntry["type"];
      const message = String(data.message ?? "");
      setLogs((prev) => [...prev, { type, message }]);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const copyLogs = async () => {
    const text = logs.map((l) => `[${l.type}] ${l.message}`).join("\n");
    try { await navigator.clipboard.writeText(text) } catch {}
  };

  const clear = () => { setCode(""); setLogs([]); };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Editor */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Editor</h2>
                  <div className="flex gap-2">
                    <button onClick={clear} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                    <button onClick={run} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Run ▶</button>
                  </div>
                </div>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Write JavaScript..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
                <iframe ref={iframeRef} key={reloadKey} title="sandbox" sandbox="allow-scripts" srcDoc={srcDoc} className="hidden" />
              </div>

              {/* Console */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Console</h2>
                  <div className="flex gap-2">
                    <button onClick={copyLogs} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Copy</button>
                  </div>
                </div>
                <pre className="h-64 p-4 bg-black/20 border border-white/20 rounded-lg overflow-auto text-sm font-mono">
                  {logs.length === 0 ? <span className="text-white/60">No output yet. Click Run.</span> : logs.map((l, i) => (
                    <div key={i} className={l.type === 'error' ? 'text-red' : l.type === 'warn' ? 'text-yellow-300' : 'text-white'}>{`[${l.type}] ${l.message}`}</div>
                  ))}
                </pre>
              </div>
            </div>

            <div className="text-xs text-white/50">Runs in a sandboxed iframe. Console output is captured and displayed here.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptTester;


