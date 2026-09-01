"use client";

import React, { useMemo, useRef, useState } from "react";
import { trackEvent, PAGE_TYPE, getRuntimePlatform } from "@/app/libs/analytics";

type Mode = "characters" | "words" | "lines";

const reverseByMode = (text: string, mode: Mode): string => {
  if (mode === "characters") return Array.from(text).reverse().join("");
  if (mode === "words") return text.split(/(\s+)/).reverse().join("");
  // lines
  return text.split(/\r?\n/).reverse().join("\n");
};

const swapCase = (s: string) => s.replace(/[a-zA-Z]/g, (ch) => ch === ch.toLowerCase() ? ch.toUpperCase() : ch.toLowerCase());

const mirrorWordLetters = (text: string) => text.split(/(\s+)/).map((part) => /\s+/.test(part) ? part : Array.from(part).reverse().join("")).join("");

const upsideDownMap: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ɓ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "ʃ", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "ᗺ", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  0: "0", 1: "Ɩ", 2: "ᄅ", 3: "Ɛ", 4: "ㄣ", 5: "ϛ", 6: "9", 7: "ㄥ", 8: "8", 9: "6",
  '.': "˙", ',': "'", '"': ",", "'": ",", "?": "¿", "!": "¡", "[": "]", "]": "[", "(": ")", ")": "(", "{": "}", "}": "{"
};

const toUpsideDown = (s: string) => Array.from(s).reverse().map((ch) => upsideDownMap[ch] ?? ch).join("");

const mirroredLetterMap: Record<string, string> = {
  'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
  'A': 'A', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'Ꭾ', 'H': 'H', 'I': 'I', 'J': 'Ⴑ', 'K': '⋊', 'L': '⅃', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ọ', 'R': 'Я', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
};

const toMirroredLetters = (s: string) => Array.from(s).map((ch) => mirroredLetterMap[ch] ?? ch).join("");

const ReverseTextGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("characters");
  const [output, setOutput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const count = useMemo(() => ({
    characters: input.length,
    charactersNoSpace: input.replace(/\s/g, "").length,
    words: (input.trim().match(/\S+/g) || []).length,
    lines: input.split(/\r?\n/).filter(() => true).length,
    paragraphs: input.split(/\n{2,}/).filter((p) => p.trim().length > 0).length || (input.trim() ? 1 : 0),
    sentences: (input.match(/[^.!?]+[.!?]+/g) || (input.trim() ? [input] : [])).length,
  }), [input]);

  const onReverse = () => {
    setOutput(reverseByMode(input, mode));
    trackEvent("dev_tool_used", {
      page_type: PAGE_TYPE,
      platform: getRuntimePlatform(),
      tool_name: "Reverse Text Generator",
      tool_action: "Reverse Text",
    });
  };
  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "reversed.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setInput(""); setOutput(""); };
  const onUploadClick = () => fileRef.current?.click();
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
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div>Characters with space:<span className="font-semibold">{count.characters}</span></div>
              <div>Characters without space:<span className="font-semibold">{count.charactersNoSpace}</span></div>
              <div>Total Words:<span className="font-semibold">{count.words}</span></div>
              <div>Total Paragraphs:<span className="font-semibold">{count.paragraphs}</span></div>
              <div>Total Sentences:<span className="font-semibold">{count.sentences}</span></div>
            </div>

            {/* Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Input</label>
                <div className="flex items-center gap-2">
                  <input type="file" accept=".txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                  <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                  <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                </div>
              </div>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={"Paste text here..."} className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <button onClick={onReverse} className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 text-sm">⇄ Reverse Text</button>
              <button onClick={() => { setOutput(mirrorWordLetters(input)); trackEvent("dev_tool_used", { page_type: PAGE_TYPE, platform: getRuntimePlatform(), tool_name: "Reverse Text Generator", tool_action: "Mirrored Text" }); }} className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 text-sm">⟫⟫ Mirrored Text</button>
              <button onClick={() => { setOutput(swapCase(input)); trackEvent("dev_tool_used", { page_type: PAGE_TYPE, platform: getRuntimePlatform(), tool_name: "Reverse Text Generator", tool_action: "Letter Flip" }); }} className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 text-sm">⇄ Letter Flip</button>
              <button onClick={() => { setOutput(input.split(/\s+/).reverse().join(" ")); trackEvent("dev_tool_used", { page_type: PAGE_TYPE, platform: getRuntimePlatform(), tool_name: "Reverse Text Generator", tool_action: "Reverse Wording" }); }} className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 text-sm">⇆ Reverse Wording</button>
              <button onClick={() => { setOutput(toMirroredLetters(input)); trackEvent("dev_tool_used", { page_type: PAGE_TYPE, platform: getRuntimePlatform(), tool_name: "Reverse Text Generator", tool_action: "Mirrored Letters" }); }} className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 text-sm">🄂 Mirrored Letters</button>
              <button onClick={() => { setOutput(toUpsideDown(input)); trackEvent("dev_tool_used", { page_type: PAGE_TYPE, platform: getRuntimePlatform(), tool_name: "Reverse Text Generator", tool_action: "Upside Down" }); }} className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 text-sm">⇵ Upside Down</button>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <label className="font-medium">Output</label>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-56">{output}</pre>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={onCopy} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Copy</button>
              <button onClick={onDownload} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Download</button>
              <button onClick={onClear} className="px-3 py-1 bg-red hover:bg-red/80 rounded transition-colors text-black font-bold text-sm">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReverseTextGenerator;


