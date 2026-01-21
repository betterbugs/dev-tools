"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type Separator = "newline" | "comma" | "space" | "tab";
type DecimalFormat = "standard" | "scientific" | "engineering";

const RandomDecimalNumberGenerator = () => {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [count, setCount] = useState<number>(10);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);
  const [separator, setSeparator] = useState<Separator>("newline");
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [sortNumbers, setSortNumbers] = useState<boolean>(false);
  const [decimalFormat, setDecimalFormat] = useState<DecimalFormat>("standard");
  const [includeNegative, setIncludeNegative] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const generateRandomDecimal = (
    min: number,
    max: number,
    decimals: number,
    allowNegative: boolean
  ): number => {
    let random = Math.random() * (max - min) + min;
    
    if (allowNegative && Math.random() < 0.5) {
      random = -random;
    }
    
    return parseFloat(random.toFixed(decimals));
  };

  const formatDecimal = (num: number, format: DecimalFormat, decimals: number): string => {
    switch (format) {
      case "scientific":
        return num.toExponential(decimals);
      case "engineering":
        const exp = Math.floor(Math.log10(Math.abs(num)));
        const engExp = Math.floor(exp / 3) * 3;
        const mantissa = num / Math.pow(10, engExp);
        return `${mantissa.toFixed(decimals)}e${engExp}`;
      default:
        return num.toFixed(decimals);
    }
  };

  const getSeparatorChar = (sep: Separator): string => {
    switch (sep) {
      case "newline":
        return "\n";
      case "comma":
        return ", ";
      case "space":
        return " ";
      case "tab":
        return "\t";
      default:
        return "\n";
    }
  };

  const generate = () => {
    setError("");
    
    if (minValue >= maxValue) {
      setError("Minimum value must be less than maximum value");
      return;
    }

    if (count <= 0 || count > 10000) {
      setError("Count must be between 1 and 10,000");
      return;
    }

    if (decimalPlaces < 0 || decimalPlaces > 15) {
      setError("Decimal places must be between 0 and 15");
      return;
    }

    const numbers: number[] = [];
    const separatorChar = getSeparatorChar(separator);

    if (allowDuplicates) {
      // Generate with duplicates allowed
      for (let i = 0; i < count; i++) {
        numbers.push(generateRandomDecimal(minValue, maxValue, decimalPlaces, includeNegative));
      }
    } else {
      // Generate without duplicates
      const used = new Set<number>();
      let attempts = 0;
      const maxAttempts = count * 1000; // Prevent infinite loops

      while (numbers.length < count && attempts < maxAttempts) {
        const num = generateRandomDecimal(minValue, maxValue, decimalPlaces, includeNegative);
        const rounded = parseFloat(num.toFixed(decimalPlaces));

        if (!used.has(rounded)) {
          used.add(rounded);
          numbers.push(num);
        }
        attempts++;
      }

      if (numbers.length < count) {
        setError(`Could not generate ${count} unique decimal numbers. Try increasing the range or allowing duplicates.`);
        return;
      }
    }

    // Sort if requested
    if (sortNumbers) {
      numbers.sort((a, b) => a - b);
    }

    // Format and join numbers
    const formattedNumbers = numbers.map((num) => formatDecimal(num, decimalFormat, decimalPlaces));
    const result = formattedNumbers.join(separatorChar);
    
    setOutput(result);
  };

  const clearAll = () => {
    setOutput("");
    setError("");
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Minimum Value
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={minValue}
                      onChange={(e) => setMinValue(Number(e.target.value))}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Maximum Value
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={maxValue}
                      onChange={(e) => setMaxValue(Number(e.target.value))}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Number Count
                    </label>
                    <input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      min="1"
                      max="10000"
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Decimal Places
                    </label>
                    <input
                      type="number"
                      value={decimalPlaces}
                      onChange={(e) => setDecimalPlaces(Number(e.target.value))}
                      min="0"
                      max="15"
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Separator
                    </label>
                    <select
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value as Separator)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="newline">New line</option>
                      <option value="comma">Comma</option>
                      <option value="space">Space</option>
                      <option value="tab">Tab</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Number Format
                    </label>
                    <select
                      value={decimalFormat}
                      onChange={(e) => setDecimalFormat(e.target.value as DecimalFormat)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="standard">Standard (1.23)</option>
                      <option value="scientific">Scientific (1.23e+2)</option>
                      <option value="engineering">Engineering (123e+0)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={allowDuplicates}
                      onChange={(e) => setAllowDuplicates(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Allow duplicates</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={sortNumbers}
                      onChange={(e) => setSortNumbers(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Sort numbers</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={includeNegative}
                      onChange={(e) => setIncludeNegative(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Include negative numbers</span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={generate}
                    className={`text-black font-bold py-2 px-4 rounded-lg bg-primary text-sm hover:bg-opacity-80`}
                  >
                    Generate Decimal Numbers
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`text-black font-bold py-2 px-6 rounded-lg bg-red text-sm hover:bg-opacity-80`}
                  >
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Generated Decimal Numbers</h3>
                  {error && (
                    <div className="mb-2 text-sm text-red-400">{error}</div>
                  )}
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated decimal numbers will appear here..."
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                    ></textarea>
                    {output && (
                      <button
                        type="button"
                        onClick={copyAll}
                        title="Copy"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
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

export default RandomDecimalNumberGenerator;
