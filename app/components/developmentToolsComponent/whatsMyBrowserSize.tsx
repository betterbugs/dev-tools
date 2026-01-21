"use client";
import React, { useEffect, useMemo, useState } from "react";

const WhatsMyBrowserSize = () => {
  const [inner, setInner] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [outer, setOuter] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [dpr, setDpr] = useState<number>(1);

  useEffect(() => {
    const update = () => {
      setInner({ w: window.innerWidth, h: window.innerHeight });
      setOuter({ w: window.outerWidth, h: window.outerHeight });
      setDpr(window.devicePixelRatio || 1);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const summary = useMemo(
    () =>
      `Inner: ${inner.w}x${inner.h} | Outer: ${outer.w}x${outer.h} | DPR: ${dpr}`,
    [inner, outer, dpr]
  );

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="bg-primary/15 border border-primary/30 text-white/90 rounded-lg p-6 flex items-center justify-between">
              <div className="text-center w-full font-mono">{summary}</div>
              <button
                onClick={() => copy(summary)}
                className="ml-4 shrink-0 px-2 py-1 rounded bg-primary hover:bg-primary/80 border border-black/20 text-xs text-black font-bold"
                title="Copy"
              >
                Copy
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-1">
                <div className="font-semibold">Inner (viewport)</div>
                <div className="font-mono">
                  {inner.w} × {inner.h}px
                </div>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-1">
                <div className="font-semibold">Outer (window)</div>
                <div className="font-mono">
                  {outer.w} × {outer.h}px
                </div>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-1">
                <div className="font-semibold">Device pixel ratio</div>
                <div className="font-mono">{dpr}</div>
              </div>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Notes</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>
                  Resize the window or rotate your device to update values.
                </li>
                <li>
                  Viewport excludes browser UI; window size includes window
                  frame.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsMyBrowserSize;
