"use client";
import React, { useMemo, useState } from "react";
import ReloadIcon from "../theme/Icon/reload";
import CopyIcon from "../theme/Icon/copyIcon";
import { CheckIcon } from "../theme/Icon/checkIcon";

type SupportedCountry = "US" | "UK" | "CA" | "AU" | "IN";

// Expanded street names for realism
const streetNames = [
  "Main", "Broadway", "Highland", "Park", "Cedar", "Maple", "Pine", "Elm", "River", "Hillcrest", "Lakeside",
];
const streetTypes = ["St", "Ave", "Blvd", "Rd", "Dr", "Ln", "Way", "Ct", "Pl"];

const citiesByCountry: Record<SupportedCountry, string[]> = {
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Denver", "Seattle", "Boston"],
  UK: ["London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Leeds"],
  CA: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary", "Edmonton"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"],
  IN: ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
};

const statesByCountry: Record<SupportedCountry, string[]> = {
  US: ["NY", "CA", "IL", "TX", "AZ", "CO", "WA", "MA"],
  UK: ["Greater London", "Greater Manchester", "West Midlands", "Merseyside", "West Yorkshire", "Bristol"],
  CA: ["ON", "BC", "QC", "AB", "ON", "NS"],
  AU: ["NSW", "VIC", "QLD", "WA", "SA", "ACT"],
  IN: ["MH", "DL", "KA", "TS", "TN", "WB"],
};

// helpers
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Better postal code generators
function generatePostalCode(country: SupportedCountry): string {
  switch (country) {
    case "US":
      return `${randomInt(10000, 99999)}`;
    case "UK": {
      // Example formats: SW1A 1AA, M1 1AE
      const letters = "ABCDEFGHJKLMNOPRSTUWYZ";
      const l = () => letters[randomInt(0, letters.length - 1)];
      return `${l()}${randomInt(1, 9)}${randomInt(0, 9)} ${randomInt(1, 9)}${l()}${l()}`;
    }
    case "CA": {
      // A1A 1A1 format
      const letters = "ABCEGHJKLMNPRSTVXY";
      const L = () => letters[randomInt(0, letters.length - 1)];
      return `${L()}${randomInt(0, 9)}${L()} ${randomInt(0, 9)}${L()}${randomInt(0, 9)}`;
    }
    case "AU":
      return `${randomInt(200, 9999)}`;
    case "IN":
      return `${randomInt(100000, 999999)}`;
  }
}

function formatAddress(country: SupportedCountry, includeApt: boolean): string {
  const number = randomInt(10, 9999);
  const street = `${getRandom(streetNames)} ${getRandom(streetTypes)}`;
  const city = getRandom(citiesByCountry[country]);
  const state = getRandom(statesByCountry[country]);
  const postal = generatePostalCode(country);

  const apt = includeApt
    ? randomInt(0, 1) === 0
      ? ` Apt ${randomInt(1, 99)}${String.fromCharCode(65 + randomInt(0, 5))}`
      : ` Suite ${randomInt(100, 999)}`
    : "";

  switch (country) {
    case "US":
    case "CA":
    case "AU":
      return `${number}${apt ? "," + apt : ""} ${street}, ${city}, ${state} ${postal}`;
    case "UK":
      return `${number}${apt ? "," + apt : ""} ${street}, ${city}, ${postal}`;
    case "IN":
      return `${number}${apt ? "," + apt : ""} ${street}, ${city}, ${state} ${postal}`;
  }
}

// Main component
const RandomAddressGenerator: React.FC = () => {
  const [country, setCountry] = useState<SupportedCountry>("US");
  const [count] = useState<number>(1);
  const [includeApartment, setIncludeApartment] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const countryOptions = useMemo<SupportedCountry[]>(() => ["US", "UK", "CA", "AU", "IN"], []);

  type GeneratedAddress = {
    buildingNumber: string;
    streetName: string;
    streetType: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  function generateOne(): GeneratedAddress {
    const number = `${randomInt(10, 9999)}`;
    const name = getRandom(streetNames);
    const type = getRandom(streetTypes);
    const city = getRandom(citiesByCountry[country]);
    const state = getRandom(statesByCountry[country]);
    const postal = generatePostalCode(country);
    return {
      buildingNumber: includeApartment ? `${number}${randomInt(0,1)?` Apt ${randomInt(1,99)}`:` Suite ${randomInt(100,999)}`}` : number,
      streetName: name,
      streetType: type,
      city,
      state,
      postalCode: postal,
      country,
    };
  }

  const generate = () => {
    const a = generateOne();
    const full = `${a.buildingNumber} ${a.streetName} ${a.streetType}, ${a.city}, ${a.state} ${a.postalCode}, ${a.country}`;
    setAddresses([full]);
  };

  const copySingle = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {}
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(addresses.join("\n"));
      setCopiedIndex(-1);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="bg-white/5 rounded-xl p-6 space-y-8">
        {/* Configuration */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Random Address Generator</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as SupportedCountry)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                {countryOptions.map((c) => (
                  <option key={c} value={c} className="bg-black text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            

            {/* Apartment */}
            <div className="flex items-end">
              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeApartment}
                  onChange={(e) => setIncludeApartment(e.target.checked)}
                  className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary"
                />
                <span>Include apartment/suite</span>
              </label>
            </div>
          </div>

          {/* Removed original address template UI */}

          <div className="flex justify-center">
            <button
              onClick={generate}
              className="px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 flex items-center gap-2"
            >
              <ReloadIcon className="w-5 h-5" />
              Generate Addresses
            </button>
          </div>
        </div>

        {/* Result - Single Address */}
        {addresses.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Generated Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Building Number */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                <p className="text-xs text-white/60 mb-1">Building Number</p>
                <p className="font-mono text-white break-all">{addresses[0].split(",")[0].split(" ")[0]}</p>
              </div>
              {/* Street */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                <p className="text-xs text-white/60 mb-1">Street</p>
                <p className="font-mono text-white break-all">{addresses[0].split(",")[0].split(" ").slice(1).join(" ")}</p>
              </div>
              {/* City */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                <p className="text-xs text-white/60 mb-1">City</p>
                <p className="font-mono text-white break-all">{addresses[0].split(",")[1]?.trim()}</p>
              </div>
              {/* State & Postal */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                <p className="text-xs text-white/60 mb-1">State & Postal Code</p>
                <p className="font-mono text-white break-all">{addresses[0].split(",")[2]?.trim()}</p>
              </div>
              {/* Country */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/10 md:col-span-2">
                <p className="text-xs text-white/60 mb-1">Country</p>
                <p className="font-mono text-white break-all">{addresses[0].split(",")[3]?.trim()}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => copySingle(addresses[0], 0)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center gap-2"
              >
                {copiedIndex === 0 ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                {copiedIndex === 0 ? "Copied!" : "Copy Full Address"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomAddressGenerator;
