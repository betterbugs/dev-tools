"use client";
import React, { useEffect, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ActiveField = "rem" | "px" | "em" | "percent" | "pt";

const PX_PER_POINT = 96 / 72;

const RemToPxConverter = () => {
  const [basePx, setBasePx] = useState<number>(16);
  const [rem, setRem] = useState<number>(1);
  const [px, setPx] = useState<number>(16);
  const [em, setEm] = useState<number>(1);
  const [percent, setPercent] = useState<number>(100);
  const [pt, setPt] = useState<number>(12);
  const [active, setActive] = useState<ActiveField>("rem");

  const clampBase = (v: number) => (v > 0 ? v : 16);

  const recalcFrom = (source: ActiveField, base: number, value: number) => {
    const b = clampBase(base);
    let computedPx = px;
    if (source === "px") {
      computedPx = value;
    } else if (source === "rem" || source === "em") {
      computedPx = value * b;
    } else if (source === "percent") {
      computedPx = (value / 100) * b;
    } else if (source === "pt") {
      computedPx = value * PX_PER_POINT;
    }

    const nextRem = computedPx / b;
    const nextEm = computedPx / b;
    const nextPercent = (computedPx / b) * 100;
    const nextPt = computedPx / PX_PER_POINT;

    setPx(Number.isFinite(computedPx) ? Number(computedPx.toFixed(4)) : 0);
    setRem(Number.isFinite(nextRem) ? Number(nextRem.toFixed(4)) : 0);
    setEm(Number.isFinite(nextEm) ? Number(nextEm.toFixed(4)) : 0);
    setPercent(Number.isFinite(nextPercent) ? Number(nextPercent.toFixed(2)) : 0);
    setPt(Number.isFinite(nextPt) ? Number(nextPt.toFixed(2)) : 0);
  };

  useEffect(() => {
    recalcFrom(active, basePx, active === "px" ? px : active === "rem" ? rem : active === "em" ? em : active === "percent" ? percent : pt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePx]);

  const handleBaseChange = (v: string) => {
    const num = Number(v);
    setBasePx(!isNaN(num) && num > 0 ? num : 16);
  };

  const reset = () => {
    setBasePx(16);
    setRem(1);
    setPx(16);
    setEm(1);
    setPercent(100);
    setPt(12);
    setActive("rem");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="flex items-center gap-4">
                  <label className="text-lg">Base size in px. Default</label>
                  <input
                    type="number"
                    className={`${DevelopmentToolsStyles.scrollbar} w-24 bg-black !border !border-[#222222] p-3 rounded-xl`}
                    value={basePx}
                    min={1}
                    onChange={(e) => handleBaseChange(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-lg mb-2">REM</label>
                    <input
                      type="number"
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      value={rem}
                      onFocus={() => setActive("rem")}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        setRem(n);
                        recalcFrom("rem", basePx, n);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-lg mb-2">Pixel</label>
                    <input
                      type="number"
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      value={px}
                      onFocus={() => setActive("px")}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        setPx(n);
                        recalcFrom("px", basePx, n);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-lg mb-2">EM</label>
                    <input
                      type="number"
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      value={em}
                      onFocus={() => setActive("em")}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        setEm(n);
                        recalcFrom("em", basePx, n);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-lg mb-2">Percent</label>
                    <input
                      type="number"
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      value={percent}
                      onFocus={() => setActive("percent")}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        setPercent(n);
                        recalcFrom("percent", basePx, n);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-lg mb-2">Point</label>
                    <input
                      type="number"
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                      value={pt}
                      onFocus={() => setActive("pt")}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        setPt(n);
                        recalcFrom("pt", basePx, n);
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => recalcFrom(active, basePx, active === "px" ? px : active === "rem" ? rem : active === "em" ? em : active === "percent" ? percent : pt)}
                    className={`bg-white text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Convert
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Reset
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

export default RemToPxConverter;
