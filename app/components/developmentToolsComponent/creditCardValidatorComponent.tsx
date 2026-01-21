"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const cardConfigs = {
  Visa: { bin: /^4/, length: [16] },
  AmericanExpress: { bin: /^(34|37)/, length: [15] },
  ChinaUnionPay: { bin: /^62/, length: [16] },
  "DinersClub International": { bin: /^36/, length: [14] },
  Discover: { bin: /^(6011|65|64[4-9])/, length: [16] },
  JCB: { bin: /^35[2-8]/, length: [16] },
  MasterCard: { bin: /^(5[1-5]|22[2-9][1-9]|2[3-7]\d{2})/, length: [16] },
};

const CreditCardValidatorComponent = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [cardType, setCardType] = useState("");

  const luhnCheck = (number: string) => {
    let sum = 0;
    let alternate = false;
    const digits = number.replace(/\D/g, "").split("").reverse().map(Number);

    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if (alternate) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      alternate = !alternate;
    }
    return sum % 10 === 0;
  };

  const getCardType = (number: string) => {
    for (const [type, { bin, length }] of Object.entries(cardConfigs)) {
      if (bin.test(number) && length.includes(number.length)) {
        return type;
      }
    }
    return "Unknown";
  };

  const handleValidation = () => {
    const sanitizedNumber = cardNumber.replace(/\D/g, "");

    // First check for length
    if (sanitizedNumber.length < 12) {
      setIsValid(false);
      setCardType("");
      toast.error("Card number must be at least 12 digits!");
      return;
    }

    // Then validate the card
    const isValidCard = luhnCheck(sanitizedNumber);
    setIsValid(isValidCard);
    setCardType(getCardType(sanitizedNumber));

    // Show appropriate toast message
    if (!isValidCard) {
      toast.error("Invalid card number!");
    } else {
      toast.success("Valid card number!");
    }
  };

  const handleClear = () => {
    setCardNumber("");
    setIsValid(null);
    setCardType("");
  };
  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center mx-auto">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                Validate Credit Card:
              </h2>
              <p className="text-sm text-white/70 md:ml-[-55px] mt-1">
                Enter your card number to check its validity -
              </p>

              <div className="flex justify-center md:items-center flex-col">
                <div className="p-8">
                  <input
                    type="text"
                    maxLength={19}
                    inputMode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autoComplete="cc-number"
                    placeholder="Card Number"
                    className="md:w-[300px] p-[13px] border border-white/50 rounded-lg bg-black text-center"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>

                {/* Generate Button */}
                <div className="flex justify-center gap-6">
                  <button
                    disabled={cardNumber.length < 12}
                    onClick={handleValidation}
                    className={`bg-primary text-black md:w-[200px] w-[150px]  py-3 md:px-8 px-4 rounded-lg transition-transform transform  hover:shadow-lg shadow-md font-bold  ${
                      !cardNumber
                        ? "opacity-70 cursor-not-allowed"
                        : " cursor-pointer"
                    }`}
                  >
                    Validate Card
                  </button>
                  <button
                    onClick={handleClear}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    }  md:w-[200px] w-[150px] text-black py-3 md:px-8 px-4 rounded-lg font-bold ${
                      !cardNumber
                        ? "opacity-70 cursor-not-allowed"
                        : " cursor-pointer"
                    }`}
                  >
                    Clear
                  </button>
                </div>

                {cardType && (
                  <p className="text-center font-semibold mt-5 text-white/70">
                    Card Type:{" "}
                    <span className="text-white mx-2">{cardType}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Toast container to display the toaster message */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </div>
    </section>
  );
};

export default CreditCardValidatorComponent;
