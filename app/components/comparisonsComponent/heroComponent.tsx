"use client";

import React, { useEffect, useState } from "react";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Extension_URL } from "@/app/libs/constants";
import { Button } from "antd";
import PlayIcon from "../theme/Icon/playIcon";
import { detectBrowser } from "@/app/libs/helpers";
import EdgeIcon from "../theme/Icon/edgeIcon";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const HeroComponent = () => {
  const [browser, setBrowser] = useState("chrome");

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  return (
    <div className="relative">
      <div className="absolute md:top-0 md:right-0 bg-black rounded-lg p-4">
        <Image
          src="/images/comparesions/hero-section-image.png"
          alt="Browser Mockup"
          className="rounded-lg md:!w-[600px] md:!h-[500px] w-full h-full"
          width={400}
          height={400}
        />
      </div>

      <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center md:py-10 pt-[350px]">
        <div className="w-full md:w-1/2 px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[50px] md:leading-[60px]">
            BetterBugs.io
            <span className={`${pacifico.className} text-primary px-2`}>
              vs
            </span>
            <br />
            BugHerd
          </h1>
          <p className="text-base md:text-lg mb-6 w-full md:w-[410px] mt-5 font-normal">
            BetterBugs.io helps any software team fix bugs async with full bug
            reporting + AI features, and a free plan—
            <span className="font-bold">all at half the cost of BugHerd</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center md:gap-4 space-y-4 md:space-y-0 md:my-8 my-4">
            <div className="text-sm comparisonGradientBorder py-4 px-4 w-full md:w-[200px]">
              <p className="textEffect font-normal">
                ⭐ <strong>4.8/5</strong>
                <br />
                Rated on Google Chrome Web Store
              </p>
            </div>
            <div className="text-sm comparisonGradientBorder py-4 px-4 w-full md:w-[210px]">
              <p className="textEffect font-normal">
                More than
                <strong className="mx-1">↑ 50,000 bugs</strong>logged since
                recent launch
              </p>
            </div>
            <div className="text-sm comparisonGradientBorder py-4 px-4 w-full md:w-[200px]">
              <p className="textEffect font-normal">
                Our<strong className="mx-1">AI ✨</strong>helps you reproduce
                the bug in no time
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3">
            <Link target="_blank" href={Extension_URL}>
              <Button className="btn-primary flex items-center justify-center gap-3 rounded-full px-4">
                {browser === "edge" ? (
                  <EdgeIcon className="w-7 h-7" />
                ) : (
                  <Image
                    src="/images/chrome.svg"
                    width={30}
                    height={20}
                    alt="chrome-img"
                    title="chrome"
                  />
                )}
                {browser === "edge" ? "Add to Edge" : "Add to Chrome"}
                <span className="bg-black font-body text-sm font-normal py-2 px-3.5 text-white rounded-[30px]">
                  FREE
                </span>
              </Button>
            </Link>
            <Link
              href={
                "https://www.loom.com/share/beb5310bed634e4783d10becd4a291f2?sid=7bcb9a6f-0290-4d5b-9eb0-12ed04e9167e"
              }
            >
              <PlayIcon />
            </Link>
          </div>
          <p className="text-sm md:mt-2 mt-4 text-primary md:text-left text-center">
            Free Forever. No Credit Card Required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
