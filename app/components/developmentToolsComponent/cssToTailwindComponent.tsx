"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { lorem } from "@/app/libs/constants";

const CssToTailwindComponent = () => {
  const [count, setCount] = useState<any>(1);
  const [type, setType] = useState("paragraph");
  const [loremText, setLoremText] = useState<any>([]);

  const generateLorem = () => {
    const sentences = lorem
      .split(". ")
      .map((sentence) => sentence.trim() + ".");
    const words = lorem.split(" ");
    let output = [];

    if (type === "paragraph") {
      for (let i = 0; i < count; i++) {
        const shuffled = [...sentences].sort(() => Math.random() - 0.5); // Shuffle sentences
        const paragraph = shuffled
          .slice(0, Math.min(5, shuffled.length))
          .join(" "); // Create a paragraph with up to 5 sentences
        output.push({ id: i, text: paragraph });
      }
    } else if (type === "character") {
      const randomWords = [...words].sort(() => Math.random() - 0.5); // Shuffle words
      let characters = "";
      let totalLength = 0;
      let wordIndex = 0;

      while (totalLength < count) {
        const nextWord = randomWords[wordIndex % randomWords.length];

        // If adding a word exceeds the count, truncate it
        if (totalLength + nextWord.length > count) {
          characters += nextWord.slice(0, count - totalLength);
          totalLength = count; // Terminate the loop
        } else {
          // Add the full word with a space if space is allowed
          if (totalLength > 0 && totalLength + nextWord.length + 1 <= count) {
            characters += " ";
            totalLength += 1; // Account for the space
          }

          characters += nextWord;
          totalLength += nextWord.length;
        }

        wordIndex++;
      }

      output.push({ id: 0, text: characters });
    } else if (type === "word") {
      const randomWords = [...words].sort(() => Math.random() - 0.5); // Shuffle words
      for (let i = 0; i < count; i++) {
        output.push({ id: i, text: randomWords[i % randomWords.length] });
      }
    }

    setLoremText(output);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copied to clipboard:", text);
    });
  };

  const handleCountChange = (e: any) => {
    const value: any = e.target.value;
    if ((/^\d+$/.test(value) || value === "") && Number(value) <= 99) {
      setCount(value === "" ? "" : Number(value));
    }
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
    setLoremText([]); // Clear the previously generated text when type changes
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                Generate Lorem Ipsum:
              </h2>

              <div className="flex justify-center md:items-center flex-col">
                <div className="flex gap-6 mb-6 w-full">
                  {/* Type Selection */}
                  <div className="md:w-1/2 w-full mt-6">
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Generate By:
                    </label>
                    <select
                      value={type}
                      onChange={handleTypeChange}
                      className="w-full p-3 border border-white/50 rounded-lg bg-black"
                    >
                      <option value="paragraph">Paragraph</option>
                      <option value="character">Character</option>
                      <option value="word">Word</option>
                    </select>
                  </div>
                  {/* Count Input */}
                  <div className="md:w-1/2 w-full mt-6">
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Number (Max 99):
                    </label>
                    <input
                      type="text"
                      value={count}
                      onChange={handleCountChange}
                      className="w-full p-3 border border-white/50 rounded-lg bg-black"
                      placeholder="1-99"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateLorem}
                  className={`${DevelopmentToolsStyles.converterButton} md:w-[600px] text-black py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] font-bold`}
                >
                  Generate
                </button>
              </div>

              {/* Generated Text Section */}
              {loremText.length > 0 && (
                <div className="w-full bg-black rounded-lg shadow-md p-6 mt-6">
                  <div className="flex flex-col md:flex-row md:justify-between justify-start mb-4">
                    <h4 className="text-lg font-medium text-white/70">
                      Generated Lorem Ipsum
                    </h4>
                    <button
                      onClick={() => {
                        const textToCopy = Array.isArray(loremText)
                          ? loremText
                              .map((item) => item.text || "")
                              .join(type === "word" ? " " : "\n\n")
                          : typeof loremText === "object"
                          ? loremText.text || "" // Handle a single object case
                          : String(loremText); // Handle strings

                        copyToClipboard(textToCopy); // Copy the extracted text
                      }}
                      className="bg-light-blue text-white py-2 px-3 rounded-lg transition-all hover:bg-light-grey hover:text-black md:mt-0 mt-2"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                  <div className="space-y-4">
                    {type === "word" ? (
                      <div className="text-white/90">
                        {loremText.map(({ id, text }: any) => text).join(" ")}
                      </div>
                    ) : (
                      loremText.map(({ id, text }: any) => (
                        <div key={id} className="text-white/70">
                          <p>{text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CssToTailwindComponent;
