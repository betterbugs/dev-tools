import React from "react";
import { comparisonTableData } from "@/app/libs/constants";
import ComparisonsStyles from "./comparisonsStyles.module.scss";

const ComparisonTableComponent = () => {
  return (
    <div>
      <div className="md:container mx-auto">
        <div className="md:overflow-x-auto md:h-[500px] hide-scrollbar">
          <div className="w-full relative">
            {/* Header */}
            <div className=" text-white text-sm flex sticky top-0 z-20 shadow-md bg-[#0d0d0d]">
              {comparisonTableData?.headers?.map((header, index) => (
                <div
                  key={index}
                  className={`flex-1 p-4 md:py-4 md:px-8 md:text-xl font-semibold text-base text-left  ${
                    index === 1
                      ? "camparisionTableColor !rounded-t-xl border-x border-primary border-t text-white"
                      : ""
                  }`}
                >
                  {header}
                </div>
              ))}
            </div>

            {/* Body */}
            <div
              className={`text-sm md:relative z-[5] ${
                comparisonTableData?.rows?.length > 0 ? "tableClass" : ""
              }`}
            >
              {comparisonTableData?.rows?.map((row: any, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex h-[120px] border-b border-[#FFFFFF1A] last:border-b-transparent w-full ${
                    row?.feature === "For"
                      ? "md:h-[230px] h-[450px]"
                      : row?.bugHerd?.tagText
                      ? "md:h-[140px] h-[240px]"
                      : "md:h-[100px] h-[240px]"
                  } hover:bg-[#FFFFFF1A] `}
                >
                  {/* Feature Column */}
                  <div className="w-1/3 text-start md:py-4 md:px-14 p-4 align-top relative">
                    <p className="flex align-top font-bold text-base">
                      {row.feature}
                    </p>
                  </div>

                  {/* BetterBugs.io Column */}
                  <div
                    className={`w-1/3 p-4 md:py-4 ${
                      row?.feature === "For" ? "md:px-4" : "md:px-14"
                    } align-top ${
                      2 === 2
                        ? "camparisionTableColor text-white border-x border-primary"
                        : ""
                    } ${ComparisonsStyles.borderBottom}`}
                  >
                    {row?.feature === "For" && (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 justify-center">
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-r-full w-[60px] flex-shrink-0 ml-[-12%]" />
                          <p className="bg-[#00DA92] py-1.5 text-center gap-2 px-3 rounded-full w-max">
                            <span>Engineering Teams</span>
                          </p>
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-l-full w-[140px] flex-shrink-0 mr-[-40px]" />
                        </div>
                        <div className="flex items-center gap-2 justify-center mt-2">
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-r-full w-[138px] flex-shrink-0 ml-[-40px]" />
                          <p className="bg-[#00DA92] py-1.5 px-3 text-center rounded-full w-max">
                            Software QA Teams
                          </p>
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-l-full w-[60px] flex-shrink-0 mr-[-12%]" />
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 justify-center mt-2">
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-r-full w-[92px] flex-shrink-0 ml-[-20%]" />
                          <p className="bg-[#00DA92] py-1.5 px-3 text-center rounded-full w-max">
                            Product Design Teams
                          </p>
                          <p className="bg-[#00DA92] text-center py-1.5 px-1 rounded-full w-max flex-shrink-0">
                            PMs
                          </p>
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-l-full w-[40px] flex-shrink-0 mr-[-20%]" />
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap  items-center gap-2 justify-center mt-2">
                          {/* <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-r-full w-[130px] flex-shrink-0 ml-[-5%]" /> */}
                          <p className="bg-[#00DA92] py-1.5 px-3 text-center rounded-full w-max">
                            Marketing Teams
                          </p>
                          <p className="bg-[#00DA92] text-center py-1.5 px-3 rounded-full w-max flex-shrink-0">
                            CSMs
                          </p>
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-l-full w-[130px] flex-shrink-0 mr-[-6%]" />
                        </div>
                        <div className="flex items-center gap-2 justify-center mt-2">
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-r-full w-[135px] flex-shrink-0 ml-[-33px]" />

                          {/* Middle Section */}
                          <p className="bg-[#00DA92] py-1.5 px-3 text-center rounded-full w-max">
                            Customer Support Teams
                          </p>

                          {/* Right Rounded Section */}
                          <p className="md:block hidden bg-[#00DA9252] py-4 px-3 rounded-l-full w-[20px] flex-shrink-0 mr-[-10%]" />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 md:flex-nowrap flex-wrap">
                      {row?.betterBugs?.text && (
                        <span>{row?.betterBugs?.icon}</span>
                      )}
                      <div className="mb-2">
                        {row?.betterBugs?.text}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {row?.betterBugs?.tagText?.map(
                            (tags: any, index: any) => (
                              <p
                                key={index}
                                className={`flex justify-center items-center gap-2 px-3 py-1 rounded-full w-max ${
                                  row.betterBugs.status === "green"
                                    ? "bg-primary text-white"
                                    : "bg-gray-600 text-white"
                                }`}
                              >
                                {tags?.tag}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BugHerd Column */}
                  <div className="w-1/3 p-4 md:py-4 md:px-14 align-top">
                    <div className="flex justify-center flex-col gap-2">
                      {row?.bugHerd?.text && (
                        <p
                          className={`flex md:flex-nowrap flex-wrap mb-2 ${
                            row?.bugHerd?.icon ? "gap-2" : "gap-0"
                          }`}
                        >
                          <span>{row?.bugHerd?.icon}</span>
                          {row?.bugHerd?.text}
                        </p>
                      )}
                      {row?.bugHerd?.negativeText && (
                        <p className="flex gap-2 md:flex-nowrap flex-wrap mb-2">
                          <span>{row?.bugHerd?.negativeIcon}</span>
                          {row?.bugHerd?.negativeText}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {row?.bugHerd?.tagText
                          ?.filter((tS: any) => tS?.status === "purple")
                          ?.map((tags: any, index: any) => (
                            <p
                              key={`bugHerd_${index}`}
                              className="bg-[#5C68B1] text-white px-3 py-1 rounded-full w-max"
                            >
                              {tags?.tag}
                            </p>
                          ))}
                        {row?.bugHerd?.tagText
                          ?.filter((tS: any) => tS?.status === "red")
                          ?.map((tags: any, index: any) => (
                            <p
                              key={`bugHerd_${index}`}
                              className="bg-[#FA6A54] text-white px-3 py-1 rounded-full w-max"
                            >
                              {tags?.tag}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTableComponent;
