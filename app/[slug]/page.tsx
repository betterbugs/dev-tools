"use client";
import React, { useEffect, useState } from "react";
import { DEVELOPMENTTOOLS } from "@/app/libs/developmentToolsConstant";
import Link from "next/link";
import { Button } from "antd";
import Image from "next/image";
import StarGardientIcon from "@/app/components/theme/Icon/starGradientIcon";
import {
  developmentToolsRoutes,
  Extension_URL,
  integrationTools,
} from "@/app/libs/constants";
import PlayIcon from "@/app/components/theme/Icon/playIcon";
import LogsGradientIcon from "@/app/components/theme/Icon/logsGradientIcon";
import ShareGradientIcon from "@/app/components/theme/Icon/shareGradientIcon";
import PowerCircleIcon from "@/app/components/theme/Icon/powerCircleIcon";
import ComparisonsStyles from "../components/comparisonsComponent/comparisonsStyles.module.scss";
import DevelopmentToolsStyles from "../developmentToolsStyles.module.scss";
import { usePathname } from "next/navigation";
import RecorderGradientIcon from "@/app/components/theme/Icon/recorderGradientIcon";
import SEOComponent from "@/app/components/theme/SEOComponent/SEOComponent";
import { detectBrowser } from "@/app/libs/helpers";
import EdgeIcon from "@/app/components/theme/Icon/edgeIcon";

const Page = ({ params: { slug } }: { params: { slug: string } }) => {
  const [browser, setBrowser] = useState("chrome");

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);
  const toolsData = DEVELOPMENTTOOLS[slug];
  const {
    hero_section,
    development_tools_list,
    development_tools_about_details,
    development_tools_what,
    development_tools_user_agent_info,
    development_tools_steps_guide,
    development_tools_how_use,
    development_tools_Comparison,
    development_tool_example,
    meta_data,
  } = toolsData;
  const pathname = usePathname();

  const currentTool = developmentToolsRoutes.find(
    (tool: any) => tool.path === pathname
  );

  return (
    <>
      <SEOComponent
        title={meta_data?.meta_title}
        description={meta_data?.meta_description}
        ogTitle={meta_data?.og_title}
        ogDescription={meta_data?.og_description}
        ogImage={meta_data?.og_image}
      />
      <div className="md:max-w-[1170px] mx-auto">
        <div className="px-3 md:px-auto mx-auto">
          {/*Hero cta section */}
          <section className="md:pt-0 pt-9">
            <div className="bg-[#090B0B] text-white flex flex-col items-center justify-center pl-6 pr-4 mt-10 rounded-lg">
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
                      The essential <span className="text-primary">AI</span>{" "}
                      companion every QA needs
                    </h4>
                    <span className="absolute top-[-17px] left-[38%]">
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
                  </div>
                  <p className="text-sm mt-2 text-white">
                    Free Forever. No Credit Card Required.
                  </p>
                </div>

                {/* Right Section */}
                <div className="flex-1 flex flex-col gap-6 md:py-12 py-4 md:px-8 relative">
                  {/* Features Section */}
                  <div className="grid grid-cols-2 gap-6 relative">
                    <div
                      className={`flex flex-col p-4 rounded-lg items-start gap-3 md:min-h-[110px] ${ComparisonsStyles.ctaCardGridBg}`}
                    >
                      <StarGardientIcon />
                      <p className="text-sm">
                        Use <span className="font-bold text-white">AI</span> to
                        reproduce and fix bugs
                      </p>
                    </div>
                    <div
                      className={`flex flex-col p-4 rounded-lg items-start gap-3 md:min-h-[110px] ${ComparisonsStyles.ctaCardGridBg}`}
                    >
                      <RecorderGradientIcon />
                      <p className="text-sm">
                        <span className="font-bold text-white">
                          Screen Recording
                        </span>{" "}
                        with{" "}
                        <span className="font-bold text-white">
                          Rewind (Upto 2-min)
                        </span>
                      </p>
                    </div>
                    <div
                      className={`flex flex-col p-4 rounded-lg items-start gap-3 md:min-h-[110px] ${ComparisonsStyles.ctaCardGridBg}`}
                    >
                      <LogsGradientIcon />
                      <p className="text-sm">
                        Capture{" "}
                        <span className="font-bold text-white">
                          {" "}
                          backend logs
                        </span>
                        with every bug report
                      </p>
                    </div>
                    <div
                      className={`flex flex-col p-4 rounded-lg items-start gap-3 md:min-h-[110px] ${ComparisonsStyles.ctaCardGridBg}`}
                    >
                      <ShareGradientIcon />
                      <p className="text-sm">
                        Assign bugs and{" "}
                        <span className="font-bold text-white">share</span> at
                        single click
                      </p>
                    </div>
                    <div className="absolute top-[40%] left-[43%]">
                      <PowerCircleIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="md:pb-[70px] md:pt-[30px] py-[50px]">
            {/* Heading section */}
            {hero_section && (
              <section>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="md:text-[62px] text-[32px] font-black text-white text-center pb-4 md:leading-[70px] leading-[50px] md:pt-5">
                    {hero_section?.title}
                  </h1>
                  <p className="text-lg font-normal text-white/70 md:mt-1 mt-[26px] md:w-[50%] text-center">
                    {hero_section?.description
                      ?.split("BetterBugs.io")
                      .map((part: any, index: any, arr: any) => (
                        <React.Fragment key={index}>
                          {part}
                          {index !== arr.length - 1 && (
                            <a
                              href="https://BetterBugs.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              BetterBugs.io
                            </a>
                          )}
                        </React.Fragment>
                      ))}
                  </p>
                </div>
              </section>
            )}

            {/* Integrated Tool section */}
            {currentTool ? currentTool?.component : null}

            {/* Tool description section */}
            <section className="mt-8">
              <div className="md:flex justify-center">
                {/* Tools Panel - 20% width, fixed */}
                {development_tools_list?.length > 0 && (
                  <div className="md:w-1/4 md:sticky left-0 md:top-8 top-2 h-full overflow-y-auto flex flex-col">
                    <div className="bg-[#FFFFFF1A] p-4 rounded-xl">
                      <div className="flex items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                          Other Tools
                        </h2>
                      </div>
                      {development_tools_list?.map((tool: any, index: any) => (
                        <Link key={index} href={tool?.url}>
                          <div
                            className={`p-3 mb-2 cursor-pointer rounded-xl border-[1px] border-transparent hover:border-1 hover:border-primary bg-black text-white hover:text-primary`}
                          >
                            {tool?.tool}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q&A Panel - 80% width, scrollable */}
                <div className="md:w-4/5 md:ml-5 md:px-8 px-4 overflow-y-auto md:mt-0 mt-6">
                  {/* about section */}
                  <div>
                    {development_tools_about_details?.about_title && (
                      <h4 className="text-2xl font-semibold text-white mb-2">
                        {development_tools_about_details?.about_title}
                      </h4>
                    )}
                    {development_tools_about_details?.about_description?.map(
                      (desc: any, index: number) => {
                        // Check if this description item has a list
                        if (desc?.list && Array.isArray(desc?.list)) {
                          return (
                            <ul
                              className="pl-6 list-disc mt-3 text-white/70"
                              key={`about_description_list_${index}`}
                            >
                              {desc?.list?.map(
                                (listItem: any, listIndex: number) => (
                                  <li
                                    key={`list_item_${index}_${listIndex}`}
                                    className="text-base font-semibold text-white"
                                  >
                                    {listItem?.title}
                                    {listItem?.description && (
                                      <span className="text-white/70 text-base font-normal">
                                        {listItem?.description}
                                      </span>
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          );
                        }

                        // Check if this description item has examples
                        if (desc?.example && Array.isArray(desc?.example)) {
                          return (
                            <div
                              key={`about_description_example_${index}`}
                              className="mt-3"
                            >
                              {/* Render description if it exists */}
                              {desc?.description && (
                                <p className="text-base text-white/70 mb-4">
                                  {desc.description}
                                </p>
                              )}
                              {/* Render examples */}
                              {desc.example.map(
                                (exampleItem: any, exampleIndex: number) => {
                                  const isExampleHeading =
                                    exampleItem?.example_input?.startsWith(
                                      "Example"
                                    );
                                  const isInputOrOutput =
                                    exampleItem?.example_input === "Input" ||
                                    exampleItem?.example_input === "Output";
                                  const isStringOutput =
                                    typeof exampleItem?.example_output ===
                                    "string";
                                  const isArrayOutput = Array.isArray(
                                    exampleItem?.example_output
                                  );

                                  return (
                                    <div
                                      key={`example_item_${index}_${exampleIndex}`}
                                      className={exampleIndex > 0 ? "mt-3" : ""}
                                    >
                                      {isExampleHeading && (
                                        <>
                                          <p className="text-base font-semibold text-white mb-1">
                                            {exampleItem.example_input}
                                          </p>
                                          {isStringOutput && (
                                            <p className="text-base text-white/70 ml-0">
                                              {exampleItem.example_output}
                                            </p>
                                          )}
                                        </>
                                      )}
                                      {isInputOrOutput && (
                                        <>
                                          <p className="text-base font-semibold text-white mb-1">
                                            {exampleItem.example_input}
                                          </p>
                                          {isArrayOutput && (
                                            <div className="ml-0">
                                              {exampleItem.example_output.map(
                                                (
                                                  outputItem: any,
                                                  outputIndex: number
                                                ) => (
                                                  <p
                                                    key={`output_${index}_${exampleIndex}_${outputIndex}`}
                                                    className="text-base text-white/70"
                                                  >
                                                    {outputItem?.value}
                                                  </p>
                                                )
                                              )}
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          );
                        }

                        // Handle regular description text
                        const descriptions = desc?.description || "";
                        const splitDescriptions = descriptions.split(/(".*?")/); // Split quoted and unquoted text

                        return (
                          <p
                            className="text-base mt-3 text-white/70"
                            key={`about_description_${index}`}
                          >
                            {splitDescriptions.map(
                              (text: any, subIndex: any) => {
                                const isQuoted =
                                  text.startsWith("") && text.endsWith("");
                                const containsBetterBugs =
                                  text.includes("BetterBugs.io");

                                if (containsBetterBugs) {
                                  // Split the text around 'BetterBugs.io' to wrap it in a link
                                  const parts = text.split("BetterBugs.io");
                                  return (
                                    <React.Fragment
                                      key={`about_description_part_${index}_${subIndex}`}
                                    >
                                      {parts[0]}
                                      <a
                                        href="https://BetterBugs.io"
                                        target="_blank"
                                        className="text-primary hover:underline"
                                      >
                                        BetterBugs.io
                                      </a>
                                      {parts[1]}
                                    </React.Fragment>
                                  );
                                }

                                return (
                                  <span
                                    key={`about_description_part_${index}_${subIndex}`}
                                    className={isQuoted ? "text-white" : ""}
                                  >
                                    {text}
                                  </span>
                                );
                              }
                            )}
                          </p>
                        );
                      }
                    )}

                    {development_tools_about_details?.placeholder && (
                      <ul className="pl-12 list-disc mt-2">
                        {development_tools_about_details?.placeholder?.map(
                          (placeholder: any, index: any) => (
                            <li key={`placeholder_${index}`}>
                              <span className="text-base text-white/70">
                                {placeholder?.title}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>

                  {/* user agent info section */}
                  {development_tools_user_agent_info && (
                    <div className="mt-8">
                      {development_tools_user_agent_info?.info_title && (
                        <h4 className="text-2xl font-semibold text-white mb-2">
                          {development_tools_user_agent_info?.info_title}
                        </h4>
                      )}
                      {development_tools_user_agent_info?.intro_text && (
                        <p className="text-white/90 text-base mt-2 mb-2">
                          {development_tools_user_agent_info?.intro_text}
                        </p>
                      )}
                      {development_tools_user_agent_info?.example_string && (
                        <p className="text-white/70 text-sm whitespace-pre">
                          {development_tools_user_agent_info?.example_string}
                        </p>
                      )}
                      {development_tools_user_agent_info?.example_string_description && (
                        <p className="text-white/90 text-sm whitespace-pre !mb-4">
                          {development_tools_user_agent_info?.example_string_description}
                        </p>
                      )}
                      {development_tools_user_agent_info?.info_items && (
                        <div className="mt-4">
                          <ul className="list-disc space-y-3 pl-6">
                            {development_tools_user_agent_info?.info_items?.map(
                              (item: any, index: number) => (
                                <li
                                  key={`user_agent_info_${index}`}
                                  className="text-base"
                                >
                                  <span className="text-white font-semibold">
                                    {item?.part}{" "}
                                  </span>
                                  <span className="text-white/70">
                                    {item?.description}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* example section */}
                  {development_tool_example && (
                    <div className="mt-8">
                      {development_tool_example?.example_title && (
                        <h4 className="text-2xl font-semibold text-white mb-2">
                          {development_tool_example?.example_title}
                        </h4>
                      )}
                      {development_tool_example?.example_description && (
                        <p className="text-white/70 text-base mt-2">
                          {development_tool_example?.example_description}
                        </p>
                      )}

                      {development_tool_example?.example_input && (
                        <div className="mt-4">
                          {development_tool_example?.example_input?.title && (
                            <p className="text-white text-base font-medium mb-2">
                              {development_tool_example?.example_input?.title}
                            </p>
                          )}
                          {development_tool_example?.example_input?.json_data && (
                            <pre className={`${DevelopmentToolsStyles.modernScrollbar} bg-[#1a1a1a] border border-white/10 rounded-lg p-4 mt-2`}>
                              <code className="text-white/90 text-sm whitespace-pre">
                                {development_tool_example?.example_input?.json_data}
                              </code>
                            </pre>
                          )}
                        </div>
                      )}

                      {development_tool_example?.example_outputs && (
                        <div className="mt-6">
                          {development_tool_example?.example_outputs?.intro && (
                            <p className="text-white/70 text-base mb-4">
                              {development_tool_example?.example_outputs?.intro}
                            </p>
                          )}
                          {development_tool_example?.example_outputs?.outputs?.map(
                            (output: any, index: number) => (
                              <div key={`example_output_${index}`} className="mt-4">
                                {output?.mode && (
                                  <p className="text-white text-base font-medium mb-2">
                                    {output?.mode}
                                  </p>
                                )}
                                {output?.title && (
                                  <p className="text-white/70 text-base mb-2">
                                    {output?.title}
                                  </p>
                                )}
                                {output?.content && (
                                  <pre className={`${DevelopmentToolsStyles.modernScrollbar} bg-[#1a1a1a] border border-white/10 rounded-lg p-4 mt-2`}>
                                    <code className="text-white/90 text-sm whitespace-pre">
                                      {output?.content}
                                    </code>
                                  </pre>
                                )}
                                {output?.note && (
                                  <p className="text-white/60 text-sm mt-2 italic">
                                    {output?.note}
                                  </p>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* what section */}
                  {development_tools_what && (
                    <div className="mt-8">
                      {development_tools_what?.about_title && (
                        <h4 className="text-2xl font-semibold text-white mb-2">
                          {development_tools_what?.about_title}
                        </h4>
                      )}
                      {development_tools_what?.what_description?.map(
                        (desc: any, index: number) => {
                          const descriptions = desc?.descriptions;
                          const splitDescriptions =
                            descriptions.split(/(".*?")/); // Split quoted and unquoted text

                          return (
                            <p
                              className="text-white/70 text-base mt-2"
                              key={`what_description_${index}`}
                            >
                              {splitDescriptions.map(
                                (text: any, subIndex: any) => {
                                  const isQuoted =
                                    text.startsWith("") && text.endsWith("");

                                  return (
                                    <span
                                      key={`what_description_part_${index}_${subIndex}`}
                                      className={
                                        isQuoted
                                          ? "text-white"
                                          : "text-white/70"
                                      }
                                    >
                                      {text}
                                    </span>
                                  );
                                }
                              )}
                            </p>
                          );
                        }
                      )}
                    </div>
                  )}

                  {/* step-by-step guide */}
                  <div className="my-10">
                    {development_tools_steps_guide?.guide_title && (
                      <>
                        <h5 className="text-2xl font-semibold text-white mb-2">
                          {development_tools_steps_guide?.guide_title}
                        </h5>
                        <p className="text-white/70 text-base mt-4">
                          {development_tools_steps_guide?.guide_description
                            ?.split(/(".*?")/g)
                            ?.map((parts: any, i: any) =>
                              parts?.startsWith("") && parts?.endsWith("") ? (
                                <span key={i} className="font-bold text-white">
                                  {parts}
                                </span>
                              ) : (
                                <span key={i}>{parts}</span>
                              )
                            )}
                        </p>
                      </>
                    )}
                    {development_tools_steps_guide?.steps?.length > 0 && (
                      <div className="mt-5">
                        {development_tools_steps_guide?.steps?.map(
                          (guide: any, index: any) => {
                            const description = guide?.step_description;
                            const description2 = guide?.step_description2;

                            // Split quoted and unquoted text
                            const parts = description?.split(/(".*?")/);
                            const desParts = description2?.split(/(".*?")/);

                            return (
                              <div key={index} className="mt-3">
                                {/* Primary Flex Layout for Step Key, Title, and Description */}
                                <div className="flex items-start flex-wrap">
                                  <span
                                    className={`text-white/90 font-semibold text-base${guide?.step_key?.includes("Step")
                                      ? " pr-1"
                                      : ""
                                      }`}
                                  >
                                    {guide?.step_key}
                                  </span>
                                  <span className="text-white/90 font-semibold text-base">
                                    {guide?.step_title}
                                  </span>
                                  {guide?.steps_points?.length > 0 && (
                                    <ul className="pl-12 list-disc">
                                      {guide?.steps_points?.map(
                                        (p: any, index: number) => (
                                          <li key={index}>
                                            {p?.steps_points_title && (
                                              <span className="text-white/90 font-semibold text-base">
                                                {p?.steps_points_title}
                                              </span>
                                            )}
                                            {p?.steps_points_description && (
                                              <p className="text-base text-white/70">
                                                {p?.steps_points_description
                                                  ?.split(/(".*?")/)
                                                  .map(
                                                    (part: string, i: number) =>
                                                      part.startsWith("") &&
                                                        part.endsWith("") ? (
                                                        <span
                                                          key={i}
                                                          className="font-semibold text-white/90"
                                                        >
                                                          {part}
                                                        </span>
                                                      ) : (
                                                        <React.Fragment key={i}>
                                                          {part
                                                            .split(
                                                              /(\/\/.*?\/\/)/
                                                            )
                                                            .map(
                                                              (
                                                                sub: string,
                                                                j: number
                                                              ) =>
                                                                sub.startsWith(
                                                                  "//"
                                                                ) &&
                                                                  sub.endsWith(
                                                                    "//"
                                                                  ) ? (
                                                                  <span
                                                                    key={`${i}-${j}`}
                                                                    className="font-semibold text-white/90"
                                                                  >
                                                                    {sub.slice(
                                                                      2,
                                                                      -2
                                                                    )}
                                                                  </span>
                                                                ) : (
                                                                  sub
                                                                )
                                                            )}
                                                        </React.Fragment>
                                                      )
                                                  )}
                                              </p>
                                            )}
                                            {Array.isArray(p?.steps_subpoint) &&
                                              p?.steps_subpoint?.length > 0 && (
                                                <ul className="pl-12 list-disc">
                                                  {p?.steps_subpoint?.map(
                                                    (
                                                      sub_p: any,
                                                      subIndex: number
                                                    ) => (
                                                      <li key={subIndex}>
                                                        {sub_p?.title && (
                                                          <span className="text-white/90 font-semibold text-base">
                                                            {sub_p?.title}
                                                          </span>
                                                        )}
                                                        {sub_p?.description && (
                                                          <span className="text-base text-white/70">
                                                            {sub_p?.description
                                                              ?.split(/(".*?")/)
                                                              .map(
                                                                (
                                                                  part: string,
                                                                  i: number
                                                                ) =>
                                                                  part.startsWith(
                                                                    ""
                                                                  ) &&
                                                                    part.endsWith(
                                                                      ""
                                                                    ) ? (
                                                                    <span
                                                                      key={i}
                                                                      className="font-semibold text-white/90"
                                                                    >
                                                                      {part}
                                                                    </span>
                                                                  ) : (
                                                                    <React.Fragment
                                                                      key={i}
                                                                    >
                                                                      {part
                                                                        .split(
                                                                          /(\/\/.*?\/\/)/
                                                                        )
                                                                        .map(
                                                                          (
                                                                            sub: string,
                                                                            j: number
                                                                          ) =>
                                                                            sub.startsWith(
                                                                              "//"
                                                                            ) &&
                                                                              sub.endsWith(
                                                                                "//"
                                                                              ) ? (
                                                                              <span
                                                                                key={`${i}-${j}`}
                                                                                className="font-semibold text-white/90"
                                                                              >
                                                                                {sub.slice(
                                                                                  2,
                                                                                  -2
                                                                                )}
                                                                              </span>
                                                                            ) : (
                                                                              sub
                                                                            )
                                                                        )}
                                                                    </React.Fragment>
                                                                  )
                                                              )}
                                                          </span>
                                                        )}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              )}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                  <span className="text-base text-white/70">
                                    {parts?.map((part: any, i: any) =>
                                      part.startsWith("") &&
                                        part.endsWith("") ? (
                                        <>
                                          <span
                                            key={`description_${i}`}
                                            className="text-white"
                                          >
                                            {part}
                                          </span>
                                        </>
                                      ) : (
                                        part
                                      )
                                    )}
                                  </span>
                                </div>
                                {/* Step Description2 on a New Line, Only If Present */}
                                {description2 && desParts?.length > 0 && (
                                  <div className="mt-2 text-base text-white/70">
                                    {desParts?.map((part: any, i: any) =>
                                      part.startsWith("") &&
                                        part.endsWith("") ? (
                                        <span
                                          key={`description2_${i}`}
                                          className="text-white"
                                        >
                                          {part}
                                        </span>
                                      ) : (
                                        part
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>

                  {/* how to use */}
                  <div className="my-10">
                    {development_tools_how_use?.how_use_title && (
                      <>
                        <h5 className="text-2xl font-semibold text-white mb-2">
                          {development_tools_how_use?.how_use_title}
                        </h5>
                        <p className="text-white/70 text-base mt-4">
                          {development_tools_how_use?.how_use_description}
                        </p>
                      </>
                    )}
                    {development_tools_how_use?.point?.length > 0 && (
                      <div className="mt-5">
                        <ul className="list-disc ml-5">
                          {development_tools_how_use?.point?.map(
                            (how: any, index: any) =>
                              how?.heading ? (
                                <p
                                  key={index}
                                  className={`${""} ${how?.heading
                                    ? "!mb-6 !ml-[-20px]"
                                    : "block text-white font-semibold text-base"
                                    }`}
                                >
                                  {how?.heading}
                                </p>
                              ) : (
                                <li
                                  key={index}
                                  className={`${""} ${how?.heading ? "my-6 list-none" : "mb-4"
                                    }`}
                                >
                                  <>
                                    <span className="block text-white/90 font-semibold text-base">
                                      {how?.title}
                                    </span>
                                    <span className="block text-base text-white/70">
                                      {how?.description}
                                    </span>
                                  </>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Comparison section */}
                  {development_tools_Comparison && (
                    <div className="mt-8">
                      {development_tools_Comparison?.title && (
                        <h4 className="text-2xl font-semibold text-white mb-2">
                          {development_tools_Comparison?.title}
                        </h4>
                      )}
                      {Array.isArray(
                        development_tools_Comparison?.description
                      ) &&
                        development_tools_Comparison?.description.map(
                          (d: any, index: any) => (
                            <p
                              className="text-white/70 text-base mt-4"
                              key={`description_${index}`}
                            >
                              {d?.desc}
                            </p>
                          )
                        )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* cta section */}
            <section>
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
                        The essential <span className="text-primary">AI</span>{" "}
                        companion every QA needs
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
                          Use <span className="font-bold text-white">AI</span>{" "}
                          to reproduce and fix bugs
                        </p>
                      </div>
                      <div
                        className={`flex flex-col p-4 rounded-lg items-start gap-3 ${ComparisonsStyles.ctaCardGridBg}`}
                      >
                        <RecorderGradientIcon />
                        <p className="text-sm">
                          <span className="font-bold text-white">
                            Screen Recording
                          </span>{" "}
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
                          <span className="font-bold text-white">
                            {" "}
                            backend logs
                          </span>
                          with every bug report
                        </p>
                      </div>
                      <div
                        className={`flex flex-col p-4 rounded-lg items-start gap-3 ${ComparisonsStyles.ctaCardGridBg}`}
                      >
                        <ShareGradientIcon />
                        <p className="text-sm">
                          Assign bugs and{" "}
                          <span className="font-bold text-white">share</span> at
                          single click
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
                              className={`!w-2 !h-2 ml-[-2px] ${tool?.name === "Azure Boards" && "md:ml-[-7px]"
                                }`}
                            >
                              {tool?.icon}
                            </span>
                            <p
                              className={`text-sm mt-2 ${tool?.name === "Azure Boards" && "md:ml-1"
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
