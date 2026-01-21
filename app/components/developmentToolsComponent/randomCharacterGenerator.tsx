"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type CharacterType = "letters" | "numbers" | "symbols" | "mixed" | "custom";
type CaseType = "lowercase" | "uppercase" | "mixed" | "title";
type Separator = "newline" | "comma" | "space" | "tab" | "none";

const RandomCharacterGenerator = () => {
  const [characterType, setCharacterType] = useState<CharacterType>("mixed");
  const [caseType, setCaseType] = useState<CaseType>("mixed");
  const [customChars, setCustomChars] = useState<string>("");
  const [excludeChars, setExcludeChars] = useState<string>("");
  const [output, setOutput] = useState<string>("S");
  const [error, setError] = useState<string>("");

  // Character sets
  const characterSets = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`",
    letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  };

  const getCharacterSet = (type: CharacterType): string => {
    switch (type) {
      case "letters":
        return characterSets.letters;
      case "numbers":
        return characterSets.numbers;
      case "symbols":
        return characterSets.symbols;
      case "mixed":
        return (
          characterSets.letters + characterSets.numbers + characterSets.symbols
        );
      case "custom":
        return customChars || characterSets.letters + characterSets.numbers;
      default:
        return characterSets.letters + characterSets.numbers;
    }
  };

  const applyCase = (str: string, caseStyle: CaseType): string => {
    switch (caseStyle) {
      case "lowercase":
        return str.toLowerCase();
      case "uppercase":
        return str.toUpperCase();
      case "title":
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      case "mixed":
        return str
          .split("")
          .map((char) =>
            Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
          )
          .join("");
      default:
        return str;
    }
  };

  const generateRandomCharacter = (charSet: string): string => {
    const filteredSet = charSet
      .split("")
      .filter((char) => !excludeChars.includes(char))
      .join("");
    if (filteredSet.length === 0) return "";
    return filteredSet[Math.floor(Math.random() * filteredSet.length)];
  };

  const generate = () => {
    setError("");

    if (characterType === "custom" && !customChars.trim()) {
      setError("Please enter custom characters");
      return;
    }

    const charSet = getCharacterSet(characterType);
    if (charSet.length === 0) {
      setError("No characters available after exclusions");
      return;
    }

    const randomChar = generateRandomCharacter(charSet);
    if (randomChar) {
      const result = applyCase(randomChar, caseType);
      setOutput(result);
    } else {
      setError("No characters available after exclusions");
    }
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
    <>
      <section>
        <div className="md:mt-8 mt-4">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
              <div className="md:w-[850px] mx-auto">
                <div className="flex flex-col gap-6 md:my-5 mt-2">
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-4 text-white">
                      Random Character
                    </h1>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-black rounded-xl flex items-center justify-center border-2 border-black">
                      <span className="text-6xl font-bold text-white">
                        {output}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Character Type
                      </label>
                      <select
                        value={characterType}
                        onChange={(e) =>
                          setCharacterType(e.target.value as CharacterType)
                        }
                        className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      >
                        <option value="mixed">
                          Letters + Numbers + Symbols
                        </option>
                        <option value="letters">Letters Only</option>
                        <option value="numbers">Numbers Only</option>
                        <option value="symbols">Symbols Only</option>
                        <option value="custom">Custom Characters</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Case Style
                      </label>
                      <select
                        value={caseType}
                        onChange={(e) =>
                          setCaseType(e.target.value as CaseType)
                        }
                        className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      >
                        <option value="mixed">Mixed Case</option>
                        <option value="lowercase">Lowercase</option>
                        <option value="uppercase">Uppercase</option>
                        <option value="title">Title Case</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Exclude Characters (optional)
                      </label>
                      <input
                        type="text"
                        value={excludeChars}
                        onChange={(e) => setExcludeChars(e.target.value)}
                        className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                        placeholder="01lIO"
                      />
                    </div>
                  </div>

                  {characterType === "custom" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Custom Characters
                        </label>
                        <input
                          type="text"
                          value={customChars}
                          onChange={(e) => setCustomChars(e.target.value)}
                          className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                          placeholder="abcdef123!@#"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={generate}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-4 px-8 rounded-lg text-lg`}
                    >
                      Generate Character
                    </button>
                  </div>

                  {error && (
                    <div className="text-center">
                      <div className="text-sm text-red-400">{error}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RandomCharacterGenerator;
