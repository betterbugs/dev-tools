"use client";

import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type AngleUnit = "deg" | "rad" | "turn" | "grad";

const unitToDeg = (value: number, unit: AngleUnit): number => {
  switch (unit) {
    case "deg": return value;
    case "rad": return (value * 180) / Math.PI;
    case "turn": return value * 360;
    case "grad": return value * 0.9; // 400 grad = 360 deg
  }
};

const degToUnit = (deg: number, unit: AngleUnit): number => {
  switch (unit) {
    case "deg": return deg;
    case "rad": return (deg * Math.PI) / 180;
    case "turn": return deg / 360;
    case "grad": return deg / 0.9;
  }
};

const normalizeDeg = (deg: number): number => {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
};

const RotationCalculatorComponent: React.FC = () => {
  const [inputAngle, setInputAngle] = useState<number>(45);
  const [inputUnit, setInputUnit] = useState<AngleUnit>("deg");
  const [rotationDelta, setRotationDelta] = useState<number>(90);
  const [deltaUnit, setDeltaUnit] = useState<AngleUnit>("deg");

  const baseDeg = useMemo(() => unitToDeg(inputAngle, inputUnit), [inputAngle, inputUnit]);
  const deltaDeg = useMemo(() => unitToDeg(rotationDelta, deltaUnit), [rotationDelta, deltaUnit]);
  const resultDeg = useMemo(() => normalizeDeg(baseDeg + deltaDeg), [baseDeg, deltaDeg]);

  const result = useMemo(() => ({
    deg: resultDeg,
    rad: degToUnit(resultDeg, "rad"),
    turn: degToUnit(resultDeg, "turn"),
    grad: degToUnit(resultDeg, "grad"),
  }), [resultDeg]);

  const copy = useCallback(async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch (_) {}
  }, []);

  const clear = useCallback(() => {
    setInputAngle(0);
    setInputUnit("deg");
    setRotationDelta(0);
    setDeltaUnit("deg");
  }, []);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div>
                {/* Inputs */}
                <div className="mb-6 space-y-4">
                  <div>
                    <div className="text-sm text-white/80 mb-2">Base Angle</div>
                    <div className="grid grid-cols-[1fr_auto] gap-3">
                      <input type="number" value={inputAngle} onChange={(e) => setInputAngle(Number(e.target.value))} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white" />
                      <select value={inputUnit} onChange={(e) => setInputUnit(e.target.value as AngleUnit)} className="h-10 bg-black rounded px-3 text-sm border border-white/20 text-white">
                        <option value="deg">deg</option>
                        <option value="rad">rad</option>
                        <option value="turn">turn</option>
                        <option value="grad">grad</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/80 mb-2">Rotation Delta</div>
                    <div className="grid grid-cols-[1fr_auto] gap-3">
                      <input type="number" value={rotationDelta} onChange={(e) => setRotationDelta(Number(e.target.value))} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white" />
                      <select value={deltaUnit} onChange={(e) => setDeltaUnit(e.target.value as AngleUnit)} className="h-10 bg-black rounded px-3 text-sm border border-white/20 text-white">
                        <option value="deg">deg</option>
                        <option value="rad">rad</option>
                        <option value="turn">turn</option>
                        <option value="grad">grad</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button type="button" onClick={clear} className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}>
                    Clear
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="text-sm text-white/80 mb-2">Resulting Angle</div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/70">Degrees</div>
                    <button onClick={() => copy(result.deg.toFixed(6))} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <input readOnly value={result.deg} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white" />

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/70">Radians</div>
                    <button onClick={() => copy(result.rad.toFixed(6))} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <input readOnly value={result.rad} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white" />

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/70">Turns</div>
                    <button onClick={() => copy(result.turn.toFixed(6))} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <input readOnly value={result.turn} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white" />

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/70">Gradians</div>
                    <button onClick={() => copy(result.grad.toFixed(6))} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <input readOnly value={result.grad} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotationCalculatorComponent;


