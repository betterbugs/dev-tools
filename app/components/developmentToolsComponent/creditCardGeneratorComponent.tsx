"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";
import VisaCardIcon from "../theme/Icon/visaCardIcon";
import AmericanExpressCardIcon from "../theme/Icon/americanExpressCardIcon";
import MasterCardIcon from "../theme/Icon/masterCardIcon";
import ChainaUnionPayCardIcon from "../theme/Icon/chainaUnionPayCardIcon";
import DinersClubCardIcon from "../theme/Icon/dinersClubCardIcon";
import DiscoverCardIcon from "../theme/Icon/discoverCardIcon";
import JCBCardIcon from "../theme/Icon/JCBCardIcon";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

// Map card types to their respective icons
const cardIcons: any = {
  Visa: <VisaCardIcon />,
  MasterCard: <MasterCardIcon />,
  AmericanExpress: <AmericanExpressCardIcon />,
  ChinaUnionPay: <ChainaUnionPayCardIcon />,
  DinersClub: <DinersClubCardIcon />,
  Discover: <DiscoverCardIcon />,
  JCB: <JCBCardIcon />,
};

// Utility functions for generating random numbers and selecting random items
const random = (min: any, max: any) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const sample = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

const CreditCardGeneratorComponent = () => {
  const [cards, setCards] = useState([]);
  const [copiedField, setCopiedField] = useState(null);

  const cardConfigs: any = {
    Visa: { bin: "4", length: 16 },
    AmericanExpress: { bin: () => sample(["34", "37"]), length: 15 },
    // ChinaUnionPay: { bin: "62", length: () => random(16, 19) },
    ChinaUnionPay: { bin: "62", length: 16 },
    DinersClub: { bin: "36", length: 14 },
    Discover: {
      bin: () => sample(["6011", "65", random(644, 649).toString()]),
      length: 16,
    },
    JCB: { bin: () => random(3528, 3589).toString(), length: 16 },
    MasterCard: {
      bin: () =>
        sample([random(51, 55).toString(), random(2221, 2720).toString()]),
      length: 16,
    },
  };

  // For Formate of the credit card....
  const formatCardNumber = (number: any, type: any) => {
    let formattedNumber = "";
    let groups = [];

    if (type === "AmericanExpress") {
      groups = [4, 4, 4, 3]; // 4-6-5 format
    } else if (type === "DinersClub") {
      groups = [4, 4, 4, 2]; // 4-4-4 format
    } else {
      groups = [4, 4, 4, 4]; // Default 4-4-4-4 format
    }

    let index = 0;
    for (let group of groups) {
      if (index + group <= number.length) {
        formattedNumber += number.slice(index, index + group) + " ";
        index += group;
      }
    }

    return formattedNumber.trim();
  };

  const generateRandomName = () => {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  };
  const generateValidThrough = () => {
    const month = String(random(1, 12)).padStart(2, "0");
    const year = String(new Date().getFullYear() + random(1, 5)).slice(2);
    return `${month}/${year}`;
  };

  const generateCVV = () => String(random(100, 999));

  const generateCardNumber = (type: any) => {
    const config = cardConfigs[type];
    if (!config) throw new Error("Unsupported card type");

    const bin = typeof config.bin === "function" ? config.bin() : config.bin;
    const length =
      typeof config.length === "function" ? config.length() : config.length;

    let card = bin;
    while (card.length < length - 1) {
      card += random(0, 9).toString();
    }

    for (let i = 0; i <= 9; i++) {
      if (luhnCheck(card + i)) {
        card += i.toString();
        break;
      }
    }

    if (card.length !== length) {
      throw new Error(
        "Generated card number does not match the required length"
      );
    }

    return formatCardNumber(card, type); // Apply formatting
  };

  const luhnCheck = (number: any) => {
    let sum = 0;
    let alternate = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let n = parseInt(number[i], 10);

      if (alternate) {
        n *= 2;
        if (n > 9) n -= 9;
      }

      sum += n;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  };

  const handleGenerate = (type: any, quantity: any) => {
    if (!cardConfigs[type]) {
      toast.error("Invalid card type selected.");
      return;
    }

    if (quantity > 10) {
      toast.error("You can generate a maximum of 10 credit cards at a time.");
      return;
    }

    const generatedCards: any = [];
    for (let i = 0; i < quantity; i++) {
      generatedCards.push({
        type,
        number: generateCardNumber(type),
        name: generateRandomName(),
        validThrough: generateValidThrough(),
        cvv: generateCVV(),
      });
    }

    setCards(generatedCards); // ✅ Correctly update the state
  };

  const handleCopy = (fieldId: any, index: any) => {
    const field = document.getElementById(fieldId);
    if (field) {
      (field as HTMLInputElement).select();
      document.execCommand("copy");
      setCopiedField(index);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const cardStyle: any = {
    Visa: { bg: "visaCard", text: "text-white" },
    MasterCard: { bg: "masterCard", text: "text-black" },
    AmericanExpress: { bg: "americanExpress", text: "text-black" },
    RuPay: {
      bg: "bg-gradient-to-r from-purple-500 to-indigo-400",
      text: "text-white",
    },
    JCB: { bg: "jcb", text: "text-white" },
    Discover: { bg: "discover", text: "text-white" },
    DinersClub: { bg: "dinersClubInternational", text: "text-white" },
    ChinaUnionPay: { bg: "chainaUnionPay", text: "text-black" },
  };

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      // Attempt to trigger the dropdown programmatically
      selectRef.current.click();
      selectRef.current.focus();
    }
  }, []); // Run once when component mounts

  // Add this function near your other handlers
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior

      const quantity = parseInt(
        (document.getElementById("quantity") as HTMLInputElement)?.value || "0",
        10
      );

      if (quantity >= 1) {
        const selectedType = (
          document.getElementById("cardType") as HTMLSelectElement
        )?.value;
        handleGenerate(selectedType, quantity);
      } else {
        toast.error("Please enter at least 1 card to generate");
      }
    }
  };

  // Add useEffect to set up the event listener
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const handleCardTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Reset quantity input to 1 when card type changes
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;
    if (quantityInput) {
      quantityInput.value = "1";
    }
    // Clear previously generated cards
    setCards([]);
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center mx-auto">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                Generate Credit Card:
              </h2>

              <div className="flex justify-center md:items-center flex-col">
                <div className="flex gap-6 mb-6 w-full">
                  {/* Type Selection */}
                  <div className="md:w-1/2 w-full mt-6">
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Card Type:
                    </label>
                    <select
                      id="cardType"
                      className="w-full p-3 border border-white/50 rounded-lg bg-black"
                      autoFocus
                      onChange={handleCardTypeChange}
                    >
                      {Object.keys(cardConfigs).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Count Input */}
                  <div className="md:w-1/2 w-full mt-6">
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Number of Cards:
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      max="10"
                      min="1"
                      defaultValue="1"
                      className="w-full p-[13px] border border-white/50 rounded-lg bg-black"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={() => {
                    const selectedType = (
                      document.getElementById("cardType") as HTMLSelectElement
                    )?.value;
                    const quantity = parseInt(
                      (document.getElementById("quantity") as HTMLInputElement)
                        ?.value || "0",
                      10
                    );
                    handleGenerate(selectedType, quantity);
                  }}
                  className="bg-primary text-black md:w-[600px] py-3 md:px-8 px-4 rounded-lg transition-transform transform hover:translate-y-1 hover:shadow-lg shadow-md font-bold"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Display Generated Cards */}
            <div className="mt-10">
              <div
                className={`max-h-[400px] overflow-y-auto ${DevelopmentToolsStyles.scrollbar}`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cards?.map((card: any, index: any) => {
                    const { bg, text } = cardStyle[card.type] || {
                      bg: "bg-gray-500",
                      text: "text-white",
                    };

                    return (
                      <div
                        key={index}
                        className={`w-80 p-6 rounded-lg shadow-lg relative ${bg}`}
                      >
                        <p className={`text-xl font-bold mb-3 ${text}`}>
                          {card?.type}
                        </p>

                        <div className="relative group mt-3">
                          <input
                            type="text"
                            id={`number-${index}`}
                            value={card?.number}
                            readOnly
                            className={`bg-transparent w-full text-xl font-mono border-none focus:outline-none mb-2 cursor-pointer font-bold ${text}`}
                            onClick={() => handleCopy(`number-${index}`, index)}
                          />
                          <div className="absolute bottom-full right-12 mb-1 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100">
                            {copiedField === index
                              ? "Copied!"
                              : "Click to copy"}
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <div className="relative group">
                            <label
                              htmlFor={`cvv-${index}`}
                              className={`text-xs font-bold whitespace-nowrap ${text}`}
                            >
                              CVV: {""}
                            </label>
                            <input
                              type="text"
                              id={`cvv-${index}`}
                              value={card.cvv}
                              readOnly
                              className={`bg-transparent border-none focus:outline-none cursor-pointer w-16 ${text}`}
                              onClick={() => handleCopy(`cvv-${index}`, index)}
                            />
                          </div>

                          <div className="relative group">
                            <label
                              htmlFor={`validThrough-${index}`}
                              className={`text-xs font-bold whitespace-nowrap ${text}`}
                            >
                              Valid Thru: {""}
                            </label>
                            <input
                              type="text"
                              id={`validThrough-${index}`}
                              value={card.validThrough}
                              readOnly
                              className={`bg-transparent border-none focus:outline-none cursor-pointer w-20 ${text}`}
                              onClick={() =>
                                handleCopy(`validThrough-${index}`, index)
                              }
                            />
                          </div>
                        </div>

                        <div className="relative group mt-4">
                          <input
                            type="text"
                            id={`name-${index}`}
                            value={card.name}
                            readOnly
                            className={`bg-transparent w-full text-lg font-medium border-none focus:outline-none cursor-pointer flex flex-wrap ${text}`}
                            onClick={() => handleCopy(`name-${index}`, index)}
                          />
                        </div>

                        {/* Icon Displayed at Bottom Right */}
                        <div className="absolute bottom-1 right-1">
                          {cardIcons[card.type] || null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditCardGeneratorComponent;
