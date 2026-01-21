"use client";
import React from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">
    {children}
  </code>
);

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {}
};

const WhatVersionOfJavaDoIHave = () => {
  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Detection banner (browsers cannot read local Java) */}
            <div className="bg-primary/15 border border-primary/30 text-white/90 rounded-lg p-6 flex items-center justify-between">
              <div className="text-center w-full">
                Java is disabled or not installed in this browser
              </div>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    "Java is disabled or not installed in this browser"
                  )
                }
                className="ml-4 shrink-0 px-2 py-1 rounded bg-primary hover:bg-primary/80 border border-black/20 text-xs text-black font-bold"
                title="Copy message"
              >
                Copy
              </button>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3 text-sm">
              <div className="text-white/80">
                Run one of the following commands to check your Java version:
              </div>
              <div className="flex items-center gap-2">
                <Cmd>java -version</Cmd>
                <button
                  onClick={() => copy("java -version")}
                  className="px-2 py-1 bg-primary text-black rounded text-xs"
                >
                  Copy
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Cmd>javac -version</Cmd>
                <button
                  onClick={() => copy("javac -version")}
                  className="px-2 py-1 bg-primary text-black rounded text-xs"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                <h2 className="font-semibold">Windows</h2>
                <ol className="list-decimal pl-5 text-white/80 space-y-1">
                  <li>
                    Open Command Prompt (Win + R, type <Cmd>cmd</Cmd>)
                  </li>
                  <li>
                    Run <Cmd>java -version</Cmd> or <Cmd>javac -version</Cmd>
                  </li>
                </ol>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                <h2 className="font-semibold">macOS / Linux</h2>
                <ol className="list-decimal pl-5 text-white/80 space-y-1">
                  <li>Open Terminal</li>
                  <li>
                    Run <Cmd>java -version</Cmd> or <Cmd>javac -version</Cmd>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Troubleshooting</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>
                  If you get &#34;command not found&#34;, Java may not be installed or
                  PATH is not configured.
                </li>
                <li>
                  On Windows, ensure JAVA_HOME and PATH include the JDK bin
                  directory.
                </li>
                <li>
                  On macOS with Homebrew: <Cmd>brew install openjdk</Cmd>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatVersionOfJavaDoIHave;
