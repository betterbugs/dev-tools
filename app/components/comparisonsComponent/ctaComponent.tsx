"use client";
import React, { useEffect, useState } from "react";
import ComparisonsStyles from "./comparisonsStyles.module.scss";
import Image from "next/image";
import QuoteIcon from "../theme/Icon/quoteIcon";
import SaleshandyLogoIcon from "../theme/Icon/saleshandyLogoIcon";
import Link from "next/link";
import { Extension_URL, integrationTools } from "@/app/libs/constants";
import { Button } from "antd";
import PlayIcon from "../theme/Icon/playIcon";
import StarGardientIcon from "../theme/Icon/starGradientIcon";
import RecorderGardientIcon from "../theme/Icon/recorderGradientIcon";
import LogsGradientIcon from "../theme/Icon/logsGradientIcon";
import ShareGradientIcon from "../theme/Icon/shareGradientIcon";
import PowerCircleIcon from "../theme/Icon/powerCircleIcon";
import CollapseFAQComponent from "../collapseFAQComponent/collapseFAQComponent";
import { detectBrowser } from "@/app/libs/helpers";
import EdgeIcon from "../theme/Icon/edgeIcon";

const FAQs = [
  {
    key: "1",
    title: "Is there a free trial available for BetterBugs?",
    des: "Yes. We offer a 30-day free trial of the BetterBugs Pro for all new users.",
  },
  {
    key: "2",
    title: "What pricing plans do you offer at BetterBugs?",
    des: "BetterBugs has two pricing plans: BetterBugs Pro starting at $4 /user/month and BetterBugs Enterprise with custom pricing based on your requirements. Also, there’s a free forever version for BetterBugs that comes with powerful features at no cost.",
  },
  {
    key: "3",
    title: "Can I manage multiple projects within a single BetterBugs account?",
    des: "Yes. You can manage multiple projects within a single BetterBugs account. You can do this from your BetterBugs Workspace.",
  },
  {
    key: "4",
    title: "Is there a limit to the number of bugs I can report?",
    des: "No. There’s no limit to creating bug reports with BetterBugs. You can create unlimited report sessions across all BetterBugs versions, including the free one.",
  },
  {
    key: "5",
    title: "Is there a way to categorize or prioritize bugs?",
    des: "Yes. Whenever you capture a bug using BetterBugs, you can instantly add severity levels of the bugs right from the report screen. Besides this, you can categorize your bug reports using custom filters from within your BetterBugs workspace.",
  },
  {
    key: "6",
    title: "Can I control who sees certain bug reports?",
    des: "Yes. With the BetterBugs Pro and Enterprise plans, you can control who can access and view bug report sessions.",
  },
  {
    key: "7",
    title: "Can I search for specific bugs or filter reports?",
    des: "Yes. You can search for specific bug reports using the 'search for sessions' search box from your project workspace. For filtering, you can apply custom filter options, such as date range, severity, status, and tags for your project reports.",
  },
  {
    key: "8",
    title: "Does BetterBugs integrate with popular project management tools?",
    des: "Yes. BetterBugs seamlessly integrates with several project management tools and issue trackers, such as Jira, Linear, ClickUp, GitHub, and others. Moreover, you can integrate BetterBugs with communications tools (Slack and MS Teams) and backend loggers (Sentry, LogRocket, and Fullstory).",
  },
  {
    key: "9",
    title: "How does BetterBugs ensure data security?",
    des: "BetterBugs is GDPR and SOC 1 security compliant, with SOC 2 compliance currently underway and expected to be implemented shortly. Additionally, BetterBugs offers custom features that allow you to block data capturing for sensitive websites, enhancing both privacy and security.",
  },
  {
    key: "10",
    title: "What kind of support does BetterBugs provide?",
    des: (
      <p>
        At BetterBugs, we offer round-the-clock chat support on our website.
        Additionally, you can reach out to us at{" "}
        <Link href="mailto:support@betterbugs.io" target="_blank">
          {" "}
          <span className="text-primary">support@betterbugs.io</span>{" "}
        </Link>{" "}
        if needed, and we&#39;ll respond as soon as possible. For our Enterprise
        users, we provide a priority support service.
      </p>
    ),
  },
  {
    key: "11",
    title: "Is onboarding assistance available for new teams?",
    des: (
      <p>
        If you need help using BetterBugs, you can read the official
        documentation—it’s easy to follow with detailed steps. For further
        assistance, please contact our support team at{" "}
        <Link href="mailto:support@betterbugs.io" target="_blank">
          {" "}
          <span className="text-primary">support@betterbugs.io</span>{" "}
        </Link>{" "}
        .
      </p>
    ),
  },
];

const CtaComponent = () => {
  const [browser, setBrowser] = useState("chrome");

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  return (
    <div className="md:container mx-auto py-12 px-4">
      <div
        className={`${ComparisonsStyles.ctaBackground} flex justify-center items-center h-screen md:h-auto`}
      >
        <div className="md:w-[665px] w-full md:m-20 m-8">
          <p className="flex justify-center items-center text-center flex-col md:text-2xl text-lg italic">
            <QuoteIcon className="w-10 h-10 mb-3" />
            BetterBugs is shockingly good. I used to dread reporting bugs. This
            tool makes it almost enjoyable. It handles all the complicated
            stuff. I feel like a rockstar.
          </p>
          <div
            className={`${ComparisonsStyles.testimonialCard} flex flex-col items-center gap-4 p-6`}
          >
            <div className="flex items-center gap-4">
              <Image
                src="/use-case/dhruv-patel.svg"
                alt="Dhruv Patel"
                width={60}
                height={60}
              />
              <div>
                <p className="text-base font-semibold">Dhruv Patel</p>
                <p className="flex gap-2 text-base font-semibold">
                  <SaleshandyLogoIcon className="!w-5 !h-5" />
                  Saleshandy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#090B0B] text-white flex flex-col items-center justify-center pl-6 pr-4 mt-10">
        <div className="w-full flex md:flex-row flex-col md:items-center items-start md:justify-between justify-start gap-8 md:py-4 py-8 md:px-7">
          {/* Left Section */}
          <div className="text-left flex-1">
            <Image
              src="/images/bb-logo.svg"
              alt="BetterBugs Logo"
              className="mb-8"
              width={200}
              height={200}
            />
            <div className="relative">
              <h4 className="text-2xl font-extrabold mb-4">
                The essential <span className="text-primary">AI</span> companion
                every QA needs
              </h4>
              <span className="absolute top-[-17px] left-[50%]">
                <StarGardientIcon />
              </span>
            </div>

            <p className="text-white/90 text-[13px] my-6">
              Swiftly document and share bugs like never before
            </p>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <Link target="_blank" href={Extension_URL}>
                <Button className="btn-primary flex items-center z-20 justify-center gap-3 rounded-full px-4">
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
                <PlayIcon className="hover:text-primary" />
              </Link>
            </div>
            <p className="text-sm mt-2 text-white">
              Free Forever. No Credit Card Required.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col gap-6 md:py-12 py-4 md:px-8 relative">
            <div className="md:block hidden absolute top-[50px] bottom-[50px] right-0 w-[2px] border-r-[2px] border-[#FFFFFF33] border-dashed"></div>

            {/* Features Section */}
            <div className="grid grid-cols-2 gap-6 relative">
              <div
                className={`flex flex-col p-4 rounded-lg items-start gap-3 ${ComparisonsStyles.ctaCardGridBg}`}
              >
                <StarGardientIcon />
                <p className="text-sm">
                  Use <span className="font-bold text-white">AI</span> to
                  reproduce and fix bugs
                </p>
              </div>
              <div
                className={`flex flex-col p-4 rounded-lg items-start gap-3 ${ComparisonsStyles.ctaCardGridBg}`}
              >
                <RecorderGardientIcon />
                <p className="text-sm">
                  <span className="font-bold text-white">Screen Recording</span>{" "}
                  with{" "}
                  <span className="font-bold text-white">
                    Rewind (Upto 2-min)
                  </span>
                </p>
              </div>
              <div
                className={`flex flex-col p-4 rounded-lg items-start gap-3 ${ComparisonsStyles.ctaCardGridBg}`}
              >
                <LogsGradientIcon />
                <p className="text-sm">
                  Capture{" "}
                  <span className="font-bold text-white"> backend logs</span>
                  with every bug report
                </p>
              </div>
              <div
                className={`flex flex-col p-4 rounded-lg items-start gap-3 ${ComparisonsStyles.ctaCardGridBg}`}
              >
                <ShareGradientIcon />
                <p className="text-sm">
                  Assign bugs and{" "}
                  <span className="font-bold text-white">share</span> at single
                  click
                </p>
              </div>
              <div className="absolute top-[43%] left-[40%]">
                <PowerCircleIcon />
              </div>
            </div>
          </div>

          {/* Integrations Section */}
          <div>
            <h3 className="font-semibold text-base text-white mb-4">
              Integrations
            </h3>
            <p className="text-white/70 mb-2 text-sm font-normal my-4">
              Two-way sync with
              <br /> popular tools
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4">
              {integrationTools?.map((tool, index) => (
                <Link key={index} href={tool?.url}>
                  <div className="flex items-center justify-start gap-5">
                    <span
                      className={`!w-2 !h-2 ml-[-2px] ${
                        tool?.name === "Azure Boards" && "md:ml-[-7px]"
                      }`}
                    >
                      {tool?.icon}
                    </span>
                    <p
                      className={`text-sm mt-2 ${
                        tool?.name === "Azure Boards" && "md:ml-1"
                      }`}
                    >
                      {tool?.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="md:max-w-[770px] mx-auto md:my-[100px] my-20 px-4">
        <h2 className="md:text-4xl text-[32px] font-bold">
          Frequently asked questions - FAQs
        </h2>
        <CollapseFAQComponent FAQs={FAQs} />
      </section>
    </div>
  );
};

export default CtaComponent;
