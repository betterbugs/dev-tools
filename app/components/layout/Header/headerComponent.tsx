"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Extension_URL } from "@/app/libs/constants";
import { detectBrowser } from "@/app/libs/helpers";
import EdgeIcon from "../../theme/Icon/edgeIcon";

const HeaderComponent = () => {
  const searchParams = useSearchParams();
  const utmSource = searchParams.get("utm_source");
  const [browser, setBrowser] = useState("chrome");

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  return (
    <>
      <header className="hidden lg:block top-0 w-full z-[50] bg-black border-b border-light-primary">
        <div className="relative">
          <div className="container mx-auto flex items-center justify-between py-3">
            <Link href="https://betterbugs.io" className="flex items-center">
              <Image
                src="/images/bb-logo.svg"
                width={190}
                height={32}
                alt="Logo"
                title="betterbugs-logo"
                priority
              />
            </Link>
            <div className="w-full flex items-center ml-8 justify-end gap-6">
              <Link
                href={`https://app.betterbugs.io/login${
                  utmSource ? `?utm_source=${utmSource}` : ""
                }`}
                target="_blank"
              >
                <div className="flex font-medium items-center text-white/80 hover:text-white py-4 px-6 text-sm transition-colors">
                  Login
                </div>
              </Link>
              <Link target="_blank" href={Extension_URL}>
                <button className="group relative flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#16fca9] hover:to-[#00d1ff] hover:text-black transition-all duration-300 shadow-lg hover:shadow-[#16fca9]/50">
                  {browser === "edge" ? (
                    <EdgeIcon className="w-5 h-5" />
                  ) : (
                    <Image
                      src="/images/chrome.svg"
                      width={20}
                      height={20}
                      alt="chrome-img"
                      title="chrome"
                    />
                  )}
                  <span className="text-sm">
                    {browser === "edge" ? "Add to Edge" : "Add to Chrome"}
                  </span>
                  <span className="ml-1.5 bg-black text-white text-xs font-normal py-1 px-2.5 rounded-full">
                    FREE
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* responsive header menu */}
      <div className="xl:hidden lg:hidden">
        <div className="flex md:container mx-3 items-center py-4 relative border-b border-light-primary">
          <div className="flex justify-between items-center w-full">
            <Link href="https://betterbugs.io">
              <Image
                src="/images/bb-logo.svg"
                width={150}
                height={32}
                alt="Logo"
                title="betterbugs-logo"
                priority
              />
            </Link>
            <div className="ml-auto flex items-center gap-3">
              <Link
                href={`https://app.betterbugs.io/login${
                  utmSource ? `?utm_source=${utmSource}` : ""
                }`}
                target="_blank"
              >
                <div className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Login
                </div>
              </Link>
              <Link target="_blank" href={Extension_URL}>
                <button className="group flex items-center gap-1.5 px-3 py-2 bg-white text-black font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#16fca9] hover:to-[#00d1ff] hover:text-black transition-all duration-300 text-xs">
                  {browser === "edge" ? (
                    <EdgeIcon className="w-4 h-4" />
                  ) : (
                    <Image
                      src="/images/chrome.svg"
                      width={16}
                      height={16}
                      alt="chrome-img"
                      title="chrome"
                    />
                  )}
                  <span>Add</span>
                  <span className="bg-black text-white text-[10px] font-normal py-0.5 px-1.5 rounded-full">
                    FREE
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
