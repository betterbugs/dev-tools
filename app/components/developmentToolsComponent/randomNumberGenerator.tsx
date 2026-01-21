"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type NumberType = "integer" | "decimal" | "percentage" | "currency";
type Separator = "newline" | "comma" | "space" | "tab";

const RandomNumberGenerator = () => {
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [count, setCount] = useState<number>(10);
  const [numberType, setNumberType] = useState<NumberType>("integer");
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);
  const [separator, setSeparator] = useState<Separator>("newline");
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [sortNumbers, setSortNumbers] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const generateRandomNumber = (
    min: number,
    max: number,
    type: NumberType,
    decimals: number
  ): number => {
    const random = Math.random() * (max - min) + min;

    switch (type) {
      case "integer":
        return Math.floor(random);
      case "decimal":
        return parseFloat(random.toFixed(decimals));
      case "percentage":
        return parseFloat((random * 100).toFixed(decimals));
      case "currency":
        return parseFloat(random.toFixed(2));
      default:
        return random;
    }
  };

  const formatNumber = (num: number, type: NumberType): string => {
    switch (type) {
      case "percentage":
        return `${num}%`;
      case "currency":
        return `$${num.toFixed(2)}`;
      default:
        return num.toString();
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

    if (decimalPlaces < 0 || decimalPlaces > 10) {
      setError("Decimal places must be between 0 and 10");
      return;
    }

    const numbers: number[] = [];
    const separatorChar = getSeparatorChar(separator);

    if (allowDuplicates) {
      // Generate with duplicates allowed
      for (let i = 0; i < count; i++) {
        numbers.push(
          generateRandomNumber(minValue, maxValue, numberType, decimalPlaces)
        );
      }
    } else {
      // Generate without duplicates
      if (numberType === "integer") {
        const range = maxValue - minValue + 1;
        if (count > range) {
          setError(
            `Cannot generate ${count} unique integers in range ${minValue}-${maxValue} (only ${range} possible values)`
          );
          return;
        }

        const allPossible = Array.from(
          { length: range },
          (_, i) => minValue + i
        );
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * allPossible.length);
          numbers.push(allPossible.splice(randomIndex, 1)[0]);
        }
      } else {
        // For non-integers, we'll use a different approach to avoid duplicates
        const used = new Set<number>();
        let attempts = 0;
        const maxAttempts = count * 100; // Prevent infinite loops

        while (numbers.length < count && attempts < maxAttempts) {
          const num = generateRandomNumber(
            minValue,
            maxValue,
            numberType,
            decimalPlaces
          );
          const rounded = parseFloat(num.toFixed(decimalPlaces));

          if (!used.has(rounded)) {
            used.add(rounded);
            numbers.push(num);
          }
          attempts++;
        }

        if (numbers.length < count) {
          setError(
            `Could not generate ${count} unique numbers. Try increasing the range or allowing duplicates.`
          );
          return;
        }
      }
    }

    // Sort if requested
    if (sortNumbers) {
      numbers.sort((a, b) => a - b);
    }

    // Format and join numbers
    const formattedNumbers = numbers.map((num) =>
      formatNumber(num, numberType)
    );
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
                       value={minValue}
                       onChange={(e) => setMinValue(Number(e.target.value))}
                       className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                       placeholder="1"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium mb-2 text-white/80">
                       Maximum Value
                     </label>
                     <input
                       type="number"
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
                       Number Type
                     </label>
                     <select
                       value={numberType}
                       onChange={(e) =>
                         setNumberType(e.target.value as NumberType)
                       }
                       className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                     >
                       <option value="integer">Integer</option>
                       <option value="decimal">Decimal</option>
                       <option value="percentage">Percentage</option>
                       <option value="currency">Currency</option>
                     </select>
                   </div>

                   <div>
                     <label className="block text-sm font-medium mb-2 text-white/80">
                       Separator
                     </label>
                     <select
                       value={separator}
                       onChange={(e) =>
                         setSeparator(e.target.value as Separator)
                       }
                       className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                     >
                       <option value="newline">New line</option>
                       <option value="comma">Comma</option>
                       <option value="space">Space</option>
                       <option value="tab">Tab</option>
                     </select>
                   </div>
                 </div>

                 {numberType === "decimal" && (
                   <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                     <div>
                       <label className="block text-sm font-medium mb-2 text-white/80">
                         Decimal Places
                       </label>
                       <input
                         type="number"
                         value={decimalPlaces}
                         onChange={(e) => setDecimalPlaces(Number(e.target.value))}
                         min="0"
                         max="10"
                         className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                         placeholder="2"
                       />
                     </div>
                   </div>
                 )}

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
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={generate}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Generate Numbers
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">
                    Generated Numbers
                  </h3>
                  {error && (
                    <div className="mb-2 text-sm text-red-400">{error}</div>
                  )}
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated numbers will appear here..."
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

export default RandomNumberGenerator;
