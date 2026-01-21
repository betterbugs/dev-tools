"use client";
import React, { useMemo, useRef, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

const CHAR_TO_MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....",
  6: "-....", 7: "--...", 8: "---..", 9: "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "$": "...-..-", "@": ".--.-.",
};

const MORSE_TO_CHAR: Record<string, string> = Object.fromEntries(Object.entries(CHAR_TO_MORSE).map(([k, v]) => [v, k]));

type Mode = "text-to-morse" | "morse-to-text";

const translateToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split(/\s+/)
    .map((word) =>
      word
        .split("")
        .map((ch) => CHAR_TO_MORSE[ch] || "")
        .filter(Boolean)
        .join(" ")
    )
    .join(" / ");
};

const translateToText = (morse: string): string => {
  return morse
    .trim()
    .split(/\s*\/\s*/)
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((seq) => MORSE_TO_CHAR[seq] || "")
        .join("")
    )
    .join(" ");
};

const playMorse = async (sequence: string, abortRef: React.MutableRefObject<boolean>) => {
  const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 600;
  gain.gain.value = 0;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();

  const unit = 0.08; // seconds per dot
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const beep = async (dur: number) => {
    gain.gain.setTargetAtTime(0.2, ctx.currentTime, 0.001);
    await sleep(dur * 1000);
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.001);
    await sleep(unit * 1000); // intra-symbol gap
  };

  for (const ch of sequence) {
    if (abortRef.current) break;
    if (ch === ".") await beep(unit);
    else if (ch === "-") await beep(3 * unit);
    else if (ch === " ") await sleep(2 * unit * 1000); // between letters (already had 1 unit)
    else if (ch === "/") await sleep(6 * unit * 1000); // between words
  }
  osc.stop();
  ctx.close();
};

const MorseCodeTranslator = () => {
  const [mode, setMode] = useState<Mode>("text-to-morse");
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const abortRef = useRef(false);

  const output = useMemo(() => {
    return mode === "text-to-morse" ? translateToMorse(input) : translateToText(input);
  }, [input, mode]);

  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} };
  const clear = () => setInput("");
  const swap = () => {
    setMode((m) => (m === "text-to-morse" ? "morse-to-text" : "text-to-morse"));
    setInput(output);
  };
  const play = async () => {
    if (mode === "morse-to-text" || !output) return;
    abortRef.current = false;
    setIsPlaying(true);
    do {
      await playMorse(output, abortRef);
      if (abortRef.current) break;
    } while (isRepeat);
    setIsPlaying(false);
  };
  const pause = () => { abortRef.current = true; setIsPlaying(false); };
  const stop = () => { abortRef.current = true; setIsPlaying(false); };

  const samples = [
    { label: "SOS", text: "SOS" },
    { label: "HELLO", text: "HELLO" },
    { label: "HELLO WORLD", text: "HELLO WORLD" },
    { label: "BETTERBUGS", text: "BETTERBUGS" },
  ];

  const Chart = () => (
    <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-xs">
      <div className="font-semibold mb-3">Morse Code Chart</div>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {Object.entries(CHAR_TO_MORSE).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between bg-black/30 border border-white/10 rounded px-2 py-1">
            <span className="text-white/80">{k}</span>
            <span className="font-mono text-white/90">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Morse Code Translator</h1>
              <div className="flex items-center bg-black/30 border border-white/10 rounded overflow-hidden">
                <button onClick={() => setMode("text-to-morse")} className={`px-3 py-1 text-sm ${mode === "text-to-morse" ? "bg-primary text-black font-semibold" : "text-white/80"}`}>Text → Morse</button>
                <button onClick={() => setMode("morse-to-text")} className={`px-3 py-1 text-sm ${mode === "morse-to-text" ? "bg-primary text-black font-semibold" : "text-white/80"}`}>Morse → Text</button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">Input</h3>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-60 p-4 bg-black/40 border border-white/10 rounded font-mono text-sm" placeholder={mode === "text-to-morse" ? "Type text..." : "Type Morse (., -, space between letters, / between words)"} spellCheck={false} />
                <div className="flex items-center gap-2 flex-wrap">
                  {mode === "text-to-morse" && samples.map((s) => (
                    <button key={s.label} onClick={() => setInput(s.text)} className="px-2 py-1 bg-black/30 border border-white/10 rounded text-xs hover:bg-black/40">{s.label}</button>
                  ))}
                  <div className="flex-1"></div>
                  <button onClick={() => copy(input)} className="px-3 py-1 bg-primary border border-white/10 rounded text-sm text-black font-bold">Copy</button>
                  <button onClick={clear} className="px-3 py-1 bg-red border border-white/10 text-black font-semibold rounded text-sm hover:bg-red/80 hover:border-black/20">Clear</button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Output</h3>
                <div className="bg-black/30 border border-white/10 rounded p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Output</span>
                    <div className="flex items-center gap-2">
                      {mode === "text-to-morse" && (
                        <>
                          <button onClick={isPlaying ? pause : play} aria-label={isPlaying ? "Pause" : "Play"} className={`p-2 rounded bg-black/30 border border-white/10 hover:bg-black/40 ${isPlaying ? "ring-1 ring-primary/60" : ""}`}>
                            {isPlaying ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/90"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/90"><path d="M8 5v14l11-7z"/></svg>
                            )}
                          </button>
                          <button onClick={() => setIsRepeat((r) => !r)} aria-label="Repeat" className={`p-2 rounded bg-black/30 border border-white/10 hover:bg-black/40 ${isRepeat ? "bg-primary text-black" : ""}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={isRepeat ? "text-black" : "text-white/90"}><path d="M17 1l4 4-4 4V6H7a3 3 0 000 6h2v2H7a5 5 0 110-10h10V1zm0 11h-2v2h2a3 3 0 010 6H7l4 4 4-4h-2a1 1 0 110-2h4a5 5 0 000-10z"/></svg>
                          </button>
                          <button onClick={stop} aria-label="Stop" className="p-2 rounded bg-black/30 border border-white/10 hover:bg-black/40">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/90"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
                          </button>
                        </>
                      )}
                      <button onClick={() => copy(output)} className="px-3 py-1 bg-primary text-black rounded text-sm font-bold hover:bg-primary/80">Copy</button>
                    </div>
                  </div>
                  <textarea value={output} readOnly className="w-full h-52 p-3 bg-black/40 border border-white/10 rounded font-mono text-sm" placeholder="Output will appear here..." />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
                <h3 className="font-semibold">Tips</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li>Separate letters with a space; separate words with <Cmd>/</Cmd></li>
                  <li>Unsupported characters are skipped during translation</li>
                  <li>Playback dot = short beep, dash = long beep</li>
                </ul>
              </div>
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseCodeTranslator;


